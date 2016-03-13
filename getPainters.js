'use strict';

let getPainters = (() => {
    const colorRE = /^((bright)?(black|white|red|yellow|green|cyan|blue|magenta)\b(,(black|white|red|yellow|green|cyan|blue|magenta)\b)?|,(black|white|red|yellow|green|cyan|blue|magenta)\b)/;

    let cache;
    let lastNanorc;

    /**
    * Given a nanorc file, determines the corresponding painters
    * @param {String} nanorc
    * @return {Array<Painter>}
    */
    return nanorc => {
        if (nanorc == lastNanorc) {
            return cache;
        }
        lastNanorc = nanorc;
        cache = [];

        // scan for relevant lines
        let lines = {color: [], other: []};
        nanorc.split('\n').map(l => l.trim()).forEach(line => {
            if (/^i?color\b/.test(line)) {
                lines.color.push(line);
            } else if (line.length && !/^#/.test(line)) {
                lines.other.push(line)
            }
        });
        lines.other.forEach(l => {
            if ('color'.indexOf(l) && 'icolor'.indexOf(l)) {
                Logger.info('ignoring line:', l);
            } else {
                Logger.warn('incomplete line:', l);
            }
        });

        // process relevant lines
        lines.color.forEach(line => {
            // determine brushes
            let insensitive = line[0] === 'i';
            let trimmedLine = line.replace(/i?color\s*/, '');
            if (!colorRE.test(trimmedLine)) {
                Logger.warn('incomplete line:', line);
                return;
            }
            let colors = trimmedLine.match(colorRE)[0].split(',');
            let fg = colors[0];
            let bg = colors[1];
            trimmedLine = trimmedLine.replace(colorRE, '').trim();
            if (!/^".*"$|^start=".+"\s+end=".+"/.test(trimmedLine)) {
                let logLine = trimmedLine.length ? trimmedLine : line;
                logLine = logLine.substr(0, 100) + (logLine.length > 100 ? '\u2026' : '');
                Logger.warn('incomplete matching definition: ', logLine);
                return;
            }
            // create painters
            trimmedLine.split(/\s*(start=".*?" end=".*?")(?=start|\s|$)\s*/g).filter(part => part && part.length).forEach(part => {
                part = part.trim();
                try {
                    if (/^start=/.test(part)) {
                        cache.push(new GlobalPainter(part, fg, bg, insensitive));
                    } else {
                        part.replace(/^"|"$/g, '').split(/"\s+"/).forEach(re => {
                            cache.push(new LinePainter(re, fg, bg, insensitive));
                        });
                    }
                } catch (e) {
                    let logLine = trimmedLine;
                    if (logLine.length > 70) {
                        logLine = trimmedLine.substr(0, 35) + '\u2009\u2026\u2009' + trimmedLine.substr(-35);
                    }
                    Logger.error('Could not convert matcher ', logLine, ': ', e.message);
                }
            });
        });
        return cache;
    };
})();
