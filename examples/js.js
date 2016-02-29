examples.push({
    title: 'js',
    nanorc: `syntax "js" "\\.js$"

# numbers
icolor brightgreen "\\.?\\<[0-9]+" "\\<[0-9]+\\.([0-9]+)?"
icolor brightgreen "\\<0x[0-9a-f]"

# keywords
color brightyellow "\\b(if|else|for|in|while|do|continue|break|with|try|catch|finally|switch|case|new|var|return|delete|true|false|void|throw|typeof|const|default|null)\\b"
color brightyellow "\\b(Anchor|Applet|Area|Array|Boolean|Button|Checkbox|Date|document|window|Image|FileUpload|Form|Frame|Function|Hidden|Link|MimeType|Math|Max|Min|Layer|navigator|Object|Password|Plugin|Radio|RegExp|Reset|Screen|Select|String|Text|Textarea|this|Window)\\b"
color brightyellow "\\b(abs|acos|asin|atan|atan2|ceil|cos|ctg|E|exp|floor|LN2|LN10|log|LOG2E|LOG10E|PI|pow|round|sin|sqrt|SQRT1_2|SQRT2|tan)\\b"
color brightmagenta "\\bfunction\\b"

# brackets
color brightcyan "[{}()[]" "\\]"

# Semicolon
color brightblue ";"

# Operators
color brightred "[-+*/%]"
color brightred "[-+*/&|]?="
color brightred "(\\+\\+|--)"
color brightmagenta "\\."

# comparison / logical
color brightred "(!|&&|\\|\\|)"
color brightred "[<>]=?" "[=!]==?"
color brightred "[:?]"

# Strings
color green ""(\\\\.|[^\\"])*"" "'(\\\\.|[^\\'])*'"

# Escape-Sequences
color brightgreen "\\\\."

# Comments
color brightblack "(^|[[:space:]])//.*$"
color brightblack start="/\\*" end="\\*/"

# FIXME, TODO, etc.
color brightyellow,red "\\<(BUG|FIXME|IMPORTANT|WARNING):?"
color brightwhite,yellow "\<(BUGFIX|HACK|NOTE|TODO):?"
`,
    code: `;(function($){

    var plugin = {};

    var defaults = {

        // GENERAL
        mode: 'horizontal',
        slideSelector: '',
        infiniteLoop: true,
        hideControlOnEnd: false,
        speed: 500,
        easing: null,
        adaptiveHeight: false,
        adaptiveHeightSpeed: 500,
        video: false,
        useCSS: true,
        preloadImages: 'visible',
        responsive: true,

        // CALLBACKS
        onSliderLoad: function() {},
        onSlideAfter: function() {},
        onSlideNext: function() {},
        onSlidePrev: function() {}
    }

// FIXME: there is code missing here!

        init();

        // returns the current jQuery object
        return this;
    }

})(jQuery);`
});
