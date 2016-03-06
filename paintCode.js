'use strict';

/**
* Create highlighted HTML from source code and a nanorc definition
* @param {String} code Code to be highlighted
* @param {String} nanorc A nanorc syntax definition
* @returns {String} HTML
*/
let paintCode = function (code, nanorc) {
    // create layer data
    let layers = {};
    getPainters(nanorc).forEach(highlighter => {
        let moreLayers = highlighter.paint(code);
        Object.keys(moreLayers).forEach(line => {
            layers[line] = (layers[line] || []).concat(moreLayers[line]);
        });
    });

    // colorize output line-by-line
    let result = code.split('\n').map((line, i) => {
        if (layers[i]) {
            return paintLine(line, layers[i]);
        } else {
            return htmlEscape(line);
        }
    });

    return result.join('\n');
};
