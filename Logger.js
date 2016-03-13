'use strict';

class Logger {

    static error() {
        this.currentError = this.getText.apply(this, arguments);
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => this.printErrorAndWarning(), 1500);
    }

    static warn() {
        this.currentWarning = this.getText.apply(this, arguments);
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => this.printErrorAndWarning(), 1500);
    }

    static info() {
        this.printInfo(this.getText.apply(this, arguments));
    }

    static getText() {
        return Array.from(arguments).map(x => x.toString()).join(' ');
    }
    
    static printErrorAndWarning() {
        this.printError();
        this.printWarning();
    }

    static printError() {
        if (this.currentError && this.currentError !== this.lastError) {
            this.render(this.currentError, 'error');
            this.lastError = this.currentError;
            this.currentError = null;
        }
    }

    static printWarning() {
        if (this.currentWarning && this.currentWarning !== this.lastWarning) {
            this.render(this.currentWarning, 'warn');
            this.lastWarning = this.currentWarning;
            this.currentWarning = null;
        }
    }
    static printInfo(info) {
        if (info !== this.lastInfo) {
            this.render(info, 'info');
            this.lastInfo = info;
        }
    }

    static render(text, className) {
        var div = document.createElement('div');
        div.className = `toast ${className}`;
        div.textContent = text;
        document.body.appendChild(div);
        setTimeout(() => {
            document.body.removeChild(div);
        }, 5 * 1000);
    }

    static reset() {
        this.currentError = null;
        this.currentWarning = null;
    }
}
