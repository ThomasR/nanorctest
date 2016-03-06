'use strict';

/**
* Get the colorized version of a given line and its respective color layer metadata
* @param {string} line The line to paint
* @param {Array<Layer>} layers As returned from {@link Painter.paint}
* @returns {string} HTML
*/
let paintLine = function (line, layers) {
    // paint each letter (override invisible layers)
    let style = {};
    layers.forEach(function (layer) {
        for (let i = layer.start; i < layer.end; i++) {
            style[i] = {fg: layer.fg, bg: layer.bg};
        }
    });

    // determine intervals of equally painted letters
    let spans = [];
    let span = {text: '', fg: null, bg: null};
    for (let i = 0; i < line.length; i++) {
        let fg, bg;
        if (style[i]) {
            fg = style[i].fg;
            bg = style[i].bg;
        } else {
            fg = null;
            bg = null;
        }
        if (fg == span.fg && bg == span.bg) {
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

    // generate HTML
    return spans.filter(s => s.text.length).map(s => {
        if (!s.fg && !s.bg) {
            return htmlEscape(s.text);
        }
        return `<span class="${s.fg || ''} ${s.bg ? `bg-${s.bg}` : ''}">${htmlEscape(s.text)}</span>`;
    }).join('');
};
