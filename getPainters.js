'use strict';

let getPainters = (() => {
    const colorRE = /^((bright)?(black|white|red|yellow|green|cyan|blue|magenta))?(,(black|white|red|yellow|green|cyan|blue|magenta))?/;

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
        lines.other.forEach(l => console.warn('ignoring line: ', l));

        // process relevant lines
        lines.color.forEach(line => {
            // determine brushes
            let insensitive = line[0] === 'i';
            line = line.replace(/i?color\s*/, '');
            if (!colorRE.test(line)) {
                console.warn('incomplete line: ', line);
                return;
            }
            let colors = line.match(colorRE)[0].split(',');
            let fg = colors[0];
            let bg = colors[1];
            line = line.replace(colorRE, '').trim();
            if (!/^".*"$|^start=".+"\s+end=".+"/.test(line)) {
                console.warn('incomplete matching definition: ', line);
                return;
            }
            // create painters
            line.split(/\s*(start=".*?" end=".*?")(?=start|\s|$)\s*/g).filter(part => part && part.length).forEach(part => {
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
                    console.error('Could not convert matcher ', line, ': ', e.message);
                    console.log(e.stack);
                }
            });
        });
        return cache;
    };
})();
