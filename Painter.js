'use strict';

/**
* nano highlights text, by painting it over and over again, with several layers of paint on top of each other,
* like a horde of painters who do their job sequentially.
* This class represents one such painter.
* @property {{
*     start: RegExp
*     end: RegExp
*     source: Object
* }} matcher
*/
class Painter {

    /**
     * @constructor
     * @param {String} re The regular expression or start=""/end="" pair that triggers the painter
     * @param {String} fg foreground color
     * @param {String} bg background color
     * @param {boolean} insensitive `true` for case insensitive matching. Defaults to `false`.
     */
    constructor(re, fg, bg, insensitive) {
        Object.assign(this, {
            fg,
            bg,
            matcher: this.getMatcher(re, insensitive)
        });
    }

    /**
     * Get a matcher object from the given RE regular expression or start=""/end="" pair.
     * @param {String} re As passed to constructor
     * @param {boolean} insensitive As passed to constructor
     * @returns {{
     *     start: RegExp
     *     end: RegExp
     *     source: Object
     * }} Regular expressions determining the start of the painting area, along with debugging information
     */
    getMatcher(re, insensitive) {
        // abstract
    }

    /**
     * Paint the given code
     * @param {String} code
     * @returns {Object} An object containing color information per line
     *     The keys are the line numbers, the values are Arrays of {@link Layer}s
     */
    paint(code) {
        // abstract
    }
}
