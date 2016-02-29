examples.push({
    title: 'bash',
    nanorc: `syntax "sh" "\\.sh$" "(/|^|\\.)bash(rc|_[^/]*)$" "(^|\\.|/)(bash_)?profile$"

# keywords
color brightmagenta "\\b(break|case|do|done|elif|else|esac|exit|fi|for|if|in|local|read|return|select|shift|then|time|until|while)\\b"

# sudo
color black,red "(^|[^[:alnum:]])sudo($|[^[:alnum:]])"

# brackets, operators
color brightred "(\\{|\\}|\\(|\\)|\\;|[[:space:]]\\]\\]?|\\[?\\[[[:space:]]|\`|\\|\\$|<|>|!|=|&|\\|)"

# numbers
color red "-?[0-9]+\\.?[0-9]*"

# streams
color yellow "\\&[0-9]"

# functions
icolor magenta "(^|\\;)[[:space:]]*(function[[:space:]]+)?[0-9A-Z_.]+[[:space:]]*\\(\\)" "(^|\\;)[[:space:]]*function[[:space:]]+[0-9A-Z_.]+"

# Test-Operators
# color blue "-(eq|ne|gt|lt|ge|le|s|n|z|o|a)"

# GNUtools / Bultins
color brightcyan "(^|[^[:alnum:]])(cat|cd|chgrp|chmod|chown|clear|cp(io)?|echo|env|export|[efr]?grep|install|kill(all)?|let|ln|ls|make|mkdir|mv|rm(dir)?|sed|set|tar|test|touch|umask|uname|unset|which)($|[^[:alnum:]])"

# "Strings"
color green ""(\\.|[^\\"])*""

# command substitution
color brightyellow "\`(\\.|[^\\\`])*\`" "\\$\\((\\.|[^\\)])*\\)"

# calculations $((x+y))
icolor magenta start="\\$\\(\\(" end="\\)\\)"

# Variables
icolor brightblue "\\$[:0-9A-Z_!@#$*?-]+" "(^|\\;)[[:space:]]*(export[[:space:]]+)?[0-9A-Z_!@#$*?-]+=" start="\\$\\{" end="}"

# Syntax errors on var assignment
icolor brightwhite,red "(^|\\;)[[:space:]]*(export[[:space:]]+)?\\$[0-9A-Z_!@#$*?-]+=" "(^|\\;)[[:space:]]*(export[[:space:]]+)?[0-9A-Z_!@#$*?-]+[[:space:]]=" "(^|\\;)[[:space:]]*(export[[:space:]]+)?[0-9A-Z_!@#$*?-]+=[[:space:]]"

color brightcyan "(^|\\;)[[:space:]]*export[[:space:]]+"

# escaped
color brightgreen "\\." "\\0[0-7]{1,3}" "\\x[a-fA-F0-9]{1,2}"

# 'Strings'
color cyan "'[^']*'"

# comments
color brightblack "(^|[[:space:]])#.*$" "(^|;)[[:space:]]*(:(;|$)|:[[:space:]][^;]*(;|$))"

# FIXME, TODO, etc.
color brightyellow,red "\\<(BUG|FIXME|IMPORTANT|WARNING):?"
color brightwhite,yellow "\\<(BUGFIX|HACK|NOTE|TODO):?"

# Shebang
color brightyellow "^#!.*$"
color yellow "^#!"

# trailing whitespace
color ,blue "[[:space:]]+$"`,
    code: `# Node Version Manager
# Implemented as a POSIX-compliant function
# Should work on sh, dash, bash, ksh, zsh
# To use source this file from your bash profile
#
# Implemented by Tim Caswell <tim@creationix.com>
# with much bash help from Matthew Ranney

{ # this ensures the entire script is downloaded #

NVM_SCRIPT_SOURCE="$_"

nvm_has() {
  type "$1" > /dev/null 2>&1
}

nvm_is_alias() {
  # this is intentionally not "command alias" so it works in zsh.
  \\alias "$1" > /dev/null 2>&1
}

nvm_get_latest() {
  local NVM_LATEST_URL
  if nvm_has "curl"; then
    NVM_LATEST_URL="$(curl -q -w "%{url_effective}\\n" -L -s -S http://latest.nvm.sh -o /dev/null)"
  elif nvm_has "wget"; then
    NVM_LATEST_URL="$(wget http://latest.nvm.sh --server-response -O /dev/null 2>&1 | command awk '/^  Location: /{DEST=$2} END{ print DEST }')"
  else
    >&2 echo 'nvm needs curl or wget to proceed.'
    return 1
  fi
  if [ "_$NVM_LATEST_URL" = "_" ]; then
    >&2 echo "http://latest.nvm.sh did not redirect to the latest release on Github"
    return 2
  else
    echo "$NVM_LATEST_URL" | command awk -F '/' '{print $NF}'
  fi
}

nvm_download() {
  if nvm_has "curl"; then
    curl -q $*
  elif nvm_has "wget"; then
    # Emulate curl with wget
    ARGS=$(echo "$*" | command sed -e 's/--progress-bar /--progress=bar /' \\
                           -e 's/-L //' \\
                           -e 's/-I /--server-response /' \\
                           -e 's/-s /-q /' \\
                           -e 's/-o /-O /' \\
                           -e 's/-C - /-c /')
    eval wget $ARGS
  fi
}

nvm_has_system_node() {
  [ "$(nvm deactivate >/dev/null 2>&1 && command -v node)" != '' ]
}

nvm_has_system_iojs() {
  [ "$(nvm deactivate >/dev/null 2>&1 && command -v iojs)" != '' ]
}

nvm_print_npm_version() {
  if nvm_has "npm"; then
    echo " (npm v$(npm --version 2>/dev/null))"
  fi
}


# …



# The MIT License (MIT)
#
# Copyright (c) 2010-2016 Tim Caswell
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
`
});
