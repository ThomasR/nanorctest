examples.push({
    title:'nanorc',
    nanorc:
        `syntax "nanorc" "(/|^|\\.)nanorc$"

# Syntax errors (I think…)
icolor brightwhite,red "^[^[:space:]]+"

# numbers
icolor brightmagenta "[[:space:]]+(tabsize|fill)[[:space:]]+-?[0-9]+"

# colors
icolor brightblue "^[[:space:]]*(extendsyntax[[:space:]]+[^[:space:]]+[[:space:]]+)?i?color[[:space:]]*((bright)?(white|black|red|blue|green|yellow|magenta|cyan))?(,(white|black|red|blue|green|yellow|magenta|cyan))?\\>"
icolor magenta "^[[:space:]]*(extendsyntax[[:space:]]+[^[:space:]]+[[:space:]]+)?i?color" "[[:space:]]+(start|end)="

# Strings (nanorc-/Regex- special syntax)
icolor brightwhite "\\B"([^"][[:space:]]|[[:graph:]])*""

#### regular expressions begin
# line begin / end
icolor brightmagenta "[\$^]"

# character classes
icolor green "\\[\\^?" "\\]"
icolor cyan "\\[:(alnum|alpha|blank|cntrl|digit|graph|lower|print|punct|space|upper|xdigit):\\]"
icolor yellow "[[:alpha:]]-[[:alpha:]]" "[[:digit:]]-[[:digit:]]"

# Regex Operators
icolor brightred "[()|.+*?]"

# Quantifiziers
icolor yellow "\\{[1-9][0-9]*,?([1-9][0-9]*)?}"

# unneeded backslashes(?)
icolor brightblue "\\\\."

# escape sequences
icolor brightgreen "\\\\[wb<>1-9]"

# escaped special characters
color brightyellow "\\\\[].+*?|()\\{^$[]"
#### regular expressions end

#reset
icolor white "^[[:space:]]*(unset|set|include|syntax|bind|(extendsyntax[[:space:]]+)?(header|linter|magic|formatter)).*"

# hotkeys
icolor brightcyan "^[[:space:]]*bind[[:space:]]+[^[:space:]]+"

# values
icolor brightcyan "^[[:space:]]*(set|unset)[[:space:]]+(autoindent|backup|backupdir|backwards|boldtext|brackets|casesensitive|constantshow|cut|fill|functioncolor|historylog|justifytrim|keycolor|locking|matchbrackets|morespace|mouse|multibuffer|noconvert|nofollow|nohelp|nonewlines|nowrap|operatingdir|positionlog|preserve|punct|quickblank|quiet|quotestr|rebinddelete|rebindkeypad|regexp|smarthome|smooth|softwrap|speller|statuscolor|suspend|tabsize|tabstospaces|tempfile|titlecolor|unix|view|whitespace|wordbounds)\\>"

#keywords
icolor green "^[[:space:]]*(set|include|syntax|bind|(extendsyntax[[:space:]]+[^[:space:]]+[[:space:]]+)?(header|linter|magic|formatter))\\>"
icolor brightwhite,blue "^[[:space:]]*(extend)?syntax[[:space:]]+[^[:space:]]+"
icolor green "^[[:space:]]*(extend)?syntax[[:space:]]+"
icolor brightred "^[[:space:]]*unset\\>"

# comments
icolor brightblack "^[[:space:]]*#.*\$"`
});
examples[examples.length - 1].code = `set autoindent
unset morespace
set speller "aspell -x -c"
set tabsize 8

bind ^S savefile main

include "~/.nano/foo.nanorc"

` + examples[examples.length - 1].nanorc;
