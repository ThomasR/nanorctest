'use strict';

/**
* A painter that acts on each line individually, i.e. one that has been defined
* by one regular expression, and not via start="…"/end="…"
*/
class LinePainter extends Painter {
    /**
     * @override
     */
    getMatcher(re, insensitive) {
        return {
            start: new RegExp(convertRegExp(re), insensitive ? 'gi' : 'g'),
            end: null,
            source: re
        };
    }

    /**
     * @override
     */
    paint(code) {
        let layers = {};
        let re = this.matcher.start;
        code.split('\n').forEach((line, i) => {

            let match;
            let lastIndex = -1;
            while (match = re.exec(line)) {
                if (match.index === lastIndex) {
                    throw new Error(this.matcher.source + ' matched the empty string');
                }
                layers[i] = layers[i] || [];
                layers[i].push(new Layer(match.index, re.lastIndex, this.fg, this.bg));
                lastIndex = match.index;
            }
        });
        return layers;
    }
}
