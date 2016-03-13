'use strict';

// use Logger for errors
(() => {
    window.onerror = function (message, source, lineno, colno, error) {
        Logger.error(message);
        return true;
    };
})();

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
            Logger.reset();
            code = newCode;
            nanorc = newNanorc;
            resultEl.innerHTML = linkify(paintCode(code, nanorc));
        }
    };
})();

// start polling
setInterval(sync, 100);
