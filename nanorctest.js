'use strict';

const colorRE = /^((bright)?(black|white|red|yellow|green|cyan|blue|magenta))?(,(black|white|red|yellow|green|cyan|blue|magenta))?/;

/**
* HTML escaping
*/
let htmlEscape = str => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
* Convert POSIX ERE to JS RegExp as a string
* @param {String} str A POSIX regular expression
* @returns {String} JS regular expression as a string that can be passed to the `RegExp` constructor
*/
let convertRegExp = str => {
    if (!str) {
        throw new Error('Empty regular expression');
    }
    // character classes as per http://www.regular-expressions.info/posixbrackets.html#class
    let replaced = str.replace(/\[:space:]/g, '\\s').replace(/\[:word:]/g, '\\w')
        .replace(/\[:alpha:]/g, 'a-zA-Z').replace(/\[:alnum:]/g, 'a-zA-Z0-9')
        .replace(/\[:lower:]/g, 'a-z').replace(/\[:upper:]/g, 'A-Z')
        .replace(/\[:ascii:]/g, '\\x00-\\x7F').replace(/\[:graph:]/g, '\\x21-\\x7E')
        .replace(/\[:blank:]/g, '\\h').replace(/\[:digit:]/g, '\\d')
        .replace(/\[:cntrl:]/g, '\\x00-\\x1F\\x7F').replace(/\[:print:]/g, '\\x20-\\x7E')
        .replace(/\[:xdigit:]/g, 'a-fA-F0-9').replace(/\[:punct:]/g, '\'!"#$%&()*+,\\-./:;<=>?@[\\]^_`{|}~\\\\')
        // word boundaries
        .replace(/\[\[:>:]]|\\>/g, '\\b(?=\\W|$)').replace(/\[\[:<:]]|\\</g, '\\b(?=\\w)');
    // Allow unescaped ] in character class like []…] or [^]…].
    // This is a bit tricky for things like [][], which must be written as [\][] in JS
    let parts = replaced.split(/(\[\^?\].*?\])/g);
    return parts.reduce((result, part, i) => {
        if (i % 2) {
            part = part.replace(/^(\[\^?)]/, '$1\\]')
        }
        return result + part;
    });
};

/**
* TODO:doc
*/
let getGlobalMatcher = (line, insensitive) => {
    let res = line.replace('start="', '').replace(/"$/, '').split(/"\s+end="/);
    let flag = insensitive ? 'gmi' : 'gm';
    return {
        start: new RegExp(convertRegExp(res[0]), flag),
        end: new RegExp(convertRegExp(res[1]), flag),
        source: res
    };
};

let getLineMatcher = (re, insensitive) => {
    return {
        re: new RegExp(convertRegExp(re), insensitive ? 'gi' : 'g'),
        source: re
    };
};

let getHighlighters = nanorc => {
    let lines = {color: [], other: []};
    nanorc.split('\n').map(l => l.trim()).forEach(line => {
        if (/^i?color\b/.test(line)) {
            lines.color.push(line);
        } else if (line.length && !/^#/.test(line)) {
            lines.other.push(line)
        }
    });
    lines.other.forEach(l => console.warn('ignoring line: ', l));
    let result = [];
    lines.color.forEach(line => {
        let insensitive = line[0] === 'i';
        line = line.replace(/i?color\s*/, '');
        if (!colorRE.test(line)) {
            console.warn('incomplete line: ', line);
            return;
        }
        let colors = line.match(colorRE)[0].split(',');
        let fg = colors[0] || 'default';
        let bg = colors[1] || 'default';
        line = line.replace(colorRE, '').trim();
        if (!/^".*"$|^start=".+"\s+end=".+"/.test(line)) {
            console.warn('incomplete matching definition: ', line);
            return;
        }
        line.split(/\s*(start=".*?" end=".*?")(?=start|\s|$)\s*/g).filter(part => part && part.length).forEach(part => {
            part = part.trim();
            try {
                if (/^start=/.test(part)) {
                    result.push({
                        fg,
                        bg,
                        global: true,
                        matcher: getGlobalMatcher(part, insensitive)
                    });
                } else {
                    part.replace(/^"|"$/g, '').split(/"\s+"/).forEach(re => {
                        result.push({
                            fg,
                            bg,
                            global: false,
                            matcher: getLineMatcher(re, insensitive)
                        });
                    });
                }
            } catch (e) {
                console.error('Could not convert matcher ', line, ': ', e.message);
                console.log(e.stack);
            }
        });
    });
    return result;
};

let analyzeGlobal = (code, highlighter, metas) => {
    let starts = [];
    let start;
    let lastIndex;
    while (start = highlighter.matcher.start.exec(code)) {
        starts.push({
            from: start.index,
            to: highlighter.matcher.start.lastIndex - 1
        });
        if (start.index === lastIndex) {
            throw new Error(highlighter.matcher.source[0] + ' matched the empty string');
        }
        lastIndex = start.index;
    }
    if (!starts.length) {
        return;
    }
    let ends = [];
    let end;
    lastIndex = -1;
    while (end = highlighter.matcher.end.exec(code)) {
        if (end.index > starts[0].to) {
            ends.push({
                from: end.index,
                to: highlighter.matcher.end.lastIndex - 1
            });
        }
        if (end.index === lastIndex) {
            throw new Error(highlighter.matcher.source[0] + ' matched the empty string');
        }
        lastIndex = end.index;
    }
    if (!ends.length) {
        return;
    }
    //console.log('****');
    //console.log('starts,ends:', starts, ends);
    let intervals = [];
    for (let start = starts.shift(); start && ends.length; start = starts.shift()) {
        //console.log('start', start);
        let end;
        do {
            end = ends.shift();
            //console.log('trying end', end);
            while (starts.length && starts[0].from < end.from) {
                //console.log('shifting!', starts[0]);
                starts.shift();
            }
        } while (end.from <= start.to && ends.length);
        //console.log('good!');
        intervals.push([start, end]);
    }
    let charcounts = code.split('\n').map(x => x.length + 1);
    intervals.forEach(interval => {
        let start = interval[0].from;
        let end = interval[1].to;
        let started = false;
        for (let line = 0; line < charcounts.length; line++) {
            //console.log(start, end);
            let length = charcounts[line];
            if (0 <= start && start < length) {
                started = true;
            }
            if (started) {
                metas[line] = metas[line] || [];
                let meta = {
                    start: Math.max(0, start),
                    fg: highlighter.fg,
                    bg: highlighter.bg
                };
                if (0 <= end && end < length) {
                    meta.end = end + 1;
                    metas[line].push(meta);
                } else {
                    meta.end = length - 1;
                    metas[line].push(meta);
                }
            }
            start -= length;
            end -= length;
            if (end < 0) {
                break;
            }
        }
        //console.log(metas);
    });
};

/**
* Adds highlighting metadata for the given highlighter to the given metas object
* @param {String} code
* @param {Object} highlighter
* @param {Object} metas A hash of metadata items, one per line. Will be modified in place.
*/
let addMetaData = (code, highlighter, metas) => {
    if (highlighter.global) {
        analyzeGlobal(code, highlighter, metas);
    } else {
        code.split('\n').forEach((line, i) => {
            let match;
            let lastIndex;
            while (match = highlighter.matcher.re.exec(line)) {
                metas[i] = metas[i] || [];
                metas[i].push({
                    start: match.index,
                    end: highlighter.matcher.re.lastIndex,
                    fg: highlighter.fg,
                    bg: highlighter.bg
                });
                if (match.index === lastIndex) {
                    throw new Error(highlighter.matcher.source + ' matched the empty string');
                }
                lastIndex = match.index;
            }
        });
    }
};

/**
* Get the colorized version of a given line and its respective metadata
* @param {string} line
* @param {Array} meta
* @returns {string} HTML
*/
let colorizeHTML = function (line, meta) {
    let colorful = {};
    meta.forEach(function (meta) {
        for (let i = meta.start; i < meta.end; i++) {
            colorful[i] = {fg: meta.fg, bg: meta.bg};
        }
    });
    let spans = [];
    let span = {text: '', fg: 'default', bg: 'default'};
    for (let i = 0; i < line.length; i++) {
        let fg, bg;
        if (colorful[i]) {
            fg = colorful[i].fg;
            bg = colorful[i].bg;
        } else {
            fg = 'default';
            bg = 'default';
        }
        if (fg === span.fg && bg === span.bg) {
            span.text += line[i];
        } else {
            spans.push(span);
            span = {
                text: line[i],
                fg,
                bg
            }
        }
    }
    spans.push(span);
    return spans.filter(s => s.text.length).map(s => `<span class="${s.fg} bg-${s.bg}">${htmlEscape(s.text)}</span>`).join('');
};

/**
* Create highlighted HTML from source code and a nanorc definition
* @param {String} code Code to be highlighted
* @param {String} nanorc A nanorc syntax definition
* @returns {String} HTML
*/
let highlight = function (code, nanorc) {
    // create metadata
    let highlighters = getHighlighters(nanorc);
    let metas = {};
    highlighters.forEach(highlighter => addMetaData(code, highlighter, metas));

    // colorize output line-by-line
    let result = code.split('\n').map((line, i) => {
        if (metas[i]) {
            return colorizeHTML(line, metas[i]);
        } else {
            return htmlEscape(line);
        }
    });

    return result.join('\n');
};

let codeEl = document.querySelector('#code');
let nanorcEl = document.querySelector('#nanorc');
let resultEl = document.querySelector('#result');

// sync output with input fields
let sync = (() => {
    let code, nanorc;
    return () => {
        let newCode = codeEl.value;
        let newNanorc = nanorcEl.value;
        if (code !== newCode || nanorc !== newNanorc) {
            code = newCode;
            nanorc = newNanorc;
            resultEl.innerHTML = highlight(code, nanorc).replace(/https?:\/\/([\][!#$&-;=?-_a-z~]|%[0-9a-fA-F]{2})+/g, url => `<a href="${url}">${url}</a>`);
        }
    };
})();

// start polling
setInterval(sync, 100);
