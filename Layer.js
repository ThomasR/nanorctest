'use strict';

/**
 * A layer of paint
 * @class Layer
 * @property {number} start
 * @property {number} end
 * @property {String} fg
 * @property {String} bg
 */
class Layer {
    /**
     * @param {Number} start Column number of first colored letter
     * @param {Number} end Column number of last colored letter
     * @param {string} fg Foreground color
     * @param {string} bg Background color
     */
    constructor(start, end, fg, bg) {
        Object.assign(this, {
            start,
            end,
            fg,
            bg
        });
    }
}
