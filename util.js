'use strict';

/**
* Convert hyperlink-like text in HTML to anchor
* @param {String} text HTML possibly containing a link
* @returns {String} The HTML with the link surrounded by an anchor tag
*/
let linkify = text => text.replace(/https?:\/\/([\][!#$&-;=?-_a-z~]|%[0-9a-fA-F]{2})+/g, url => `<a href="${url}">${url}</a>`);

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
* HTML escaping
*/
let htmlEscape = str => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
