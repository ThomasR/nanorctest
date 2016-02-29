examples.push({
    title:'nanorc',
    nanorc:
        `syntax "nanorc" "(/|^|\\.)nanorc$"

# Syntax errors (I think…)
icolor brightwhite,red "^[^[:space:]]+"

# numbers
icolor brightmagenta "[[:space:]]+(tabsize|fill)[[:space:]]+-?[0-9]+"

# keywords
icolor brightcyan "^[[:space:]]*(set|unset)[[:space:]]+(autoindent|backup|backupdir|backwards|boldtext|brackets|casesensitive|const|cut|fill|historylog|matchbrackets|morespace|mouse|multibuffer|noconvert|nofollow|nohelp|nonewlines|nowrap|operatingdir|preserve|punct)" "^[[:space:]]*(set|unset)[[:space:]]+(quickblank|quotestr|rebinddelete|rebindkeypad|regexp|smarthome|smooth|speller|suspend|tabsize|tabstospaces|tempfile|view|whitespace|wordbounds)($|[^[:alnum:]])"
icolor green "^[[:space:]]*(set|include|syntax)"
icolor brightred "^[[:space:]]*unset"

# colors
icolor brightblue "^[[:space:]]*i?color[[:space:]]*((bright)?(white|black|red|blue|green|yellow|magenta|cyan))?(,(white|black|red|blue|green|yellow|magenta|cyan))?($|[^[:alnum:]])"
icolor magenta "^[[:space:]]*i?color" "[[:space:]]+(start|end)="

# Strings (nanorc-/Regex- special syntax)
icolor brightwhite "\\B"([^"][[:space:]]|[[:graph:]])*""

#### regular expressions begin
# line begin / end
icolor brightmagenta "[$^]"

# character classes
icolor green "\\[\\^?" "\\]"
icolor cyan "\\[:(alnum|alpha|blank|cntrl|digit|graph|lower|print|punct|space|upper|xdigit):\\]"
icolor white "[[:alpha:]]-[[:alpha:]]" "[[:digit:]]-[[:digit:]]"

# Regex Operators
icolor brightred "[()|.+*?]"

# Quantifiziers
icolor yellow "\\{[1-9][0-9]*,?([1-9][0-9]*)?}"

# unneeded backslashes(?)
icolor brightblue "\\\\."

# escape sequernces
icolor brightgreen "\\\\[wb<>1-9]"

# escaped special characters
color brightyellow "\\\\[].+*?|()\\{^$[]"
#### regular expressions end

# Begin syntax scheme
icolor brightwhite,blue "^[[:space:]]*syntax[[:space:]]+"[^"]+""

# comments
icolor brightblack "^[[:space:]]*#.*$"`
});
examples[examples.length - 1].code = `set autoindent
unset morespace

include ~/.nano/foo.nanorc

` + examples[examples.length - 1].nanorc;
