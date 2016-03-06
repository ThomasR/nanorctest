'use strict';

/**
* A painter that acts on multiple lines, i.e. one that has been defined
* by two regular expressions start="…"/end="…"
*/
class GlobalPainter extends Painter {
    /**
     * @override
     */
    getMatcher(part, insensitive) {
        let res = part.replace('start="', '').replace(/"$/, '').split(/"\s+end="/);
        let flag = insensitive ? 'gmi' : 'gm';
        return {
            start: new RegExp(convertRegExp(res[0]), flag),
            end: new RegExp(convertRegExp(res[1]), flag),
            source: res
        };
    }

    /**
     * @private
     * @param {String} code As passed to {@link #paint}
     * @returns {Array<{
     *     from: number,
     *     to: number
     * }>}
     */
    findStarts(code) {
        let starts = [];
        let start;
        let lastIndex = -1;
        while (start = this.matcher.start.exec(code)) {
            if (start.index === lastIndex) {
                throw new Error(this.matcher.source[0] + ' matched the empty string');
            }
            starts.push({
                from: start.index,
                to: this.matcher.start.lastIndex - 1
            });
            lastIndex = start.index;
        }
        return starts;
    }

    /**
     * @private
     * @param {String} code As passed to {@link #paint}
     * @param {Array} starts As returned from {@link #findStarts}
     * @returns {Array<{
     *     from: number,
     *     to: number
     * }>}
     */
    findEnds(code, starts) {
        let ends = [];
        let end;
        let lastIndex = -1;
        while (end = this.matcher.end.exec(code)) {
            if (end.index === lastIndex) {
                throw new Error(this.matcher.source[0] + ' matched the empty string');
            }
            if (end.index > starts[0].to) {
                ends.push({
                    from: end.index,
                    to: this.matcher.end.lastIndex - 1
                });
            }
            lastIndex = end.index;
        }
        return ends;
    }

    /**
     * Helper to determine intervals from start/end pairs
     * @private
     * @param {Array} starts A list of ranges as returned from {@link #findStarts}
     * @param {Array} ends A list of ranges as returned from {@link #findStarts}
     * @returns {Array<Array>} A list of pairs of ranges that form connected patches respectively
     */
    findIntervals(starts, ends) {
        let intervals = [];
        for (let start = starts.shift(); start && ends.length; start = starts.shift()) {
            //console.log('start', start);
            let end;
            do {
                end = ends.shift();
                //console.log('trying end', end);
                let buggy = false; // this emulates a matcher bug in nano < 2.4 https://savannah.gnu.org/bugs/?45525
                while (starts.length && starts[0].from <= end.from - (buggy ? 1 : 0)) {
                    //console.log('shifting!', starts[0]);
                    starts.shift();
                }
            } while (end.from <= start.to && ends.length);
            //console.log('good!');
            intervals.push([start, end]);
        }
        return intervals;
    }

    /**
     * @override
     */
    paint(code) {
        let layers = {};
        let starts = this.findStarts(code);
        if (!starts.length) {
            return layers;
        }
        let ends = this.findEnds(code, starts);
        if (!ends.length) {
            return layers;
        }
        //console.log('****');
        //console.log('starts,ends:', starts, ends);
        let intervals = this.findIntervals(starts, ends);
        let charCounts = code.split('\n').map(x => x.length + 1);
        intervals.forEach(interval => {
            let start = interval[0].from;
            let end = interval[1].to;
            let started = false;
            for (let line = 0; line < charCounts.length; line++) {
                //console.log(start, end);
                let length = charCounts[line];
                if (0 <= start && start < length) {
                    started = true;
                }
                if (started) {
                    let layer = new Layer(Math.max(0, start), null, this.fg, this.bg);
                    if (0 <= end && end < length) {
                        layer.end = end + 1;
                    } else {
                        layer.end = length - 1;
                    }
                    layers[line] = layers[line] || [];
                    layers[line].push(layer);
                }
                start -= length;
                end -= length;
                if (end < 0) {
                    break;
                }
            }
            //console.log(layers);
        });
        return layers;
    }
}
