examples.push({
    title: 'ini',
    nanorc: `syntax "cfg" "\\.(colors|conf|cfg|desktop|directory|ini|pref|properties)\$" "(rc|config)\$" "(^|/)hosts(\\.(allow|deny))?\$"

# Variables
color cyan "^[^="]+[[:space:]]*="

# [bracketed]
color brightcyan "\\[[^]]+]"

# Operators
color brightred "(\\{|\\}|\\(|\\)|\\;|\\]|\\[|\`|\\\\|\\\$|<|>|!|=|&|\\||,)"

# numbers
color brightblue "-?\\<[0-9]+\\.?[0-9]*"

# IPs
color magenta "\\<[[:digit:]]{1,3}(\\.[[:digit:]]{1,3}){3}"
# IPv6
color magenta "::(([0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4})?(\$|[^[:alnum:]])"
color magenta "(^|[^[:alnum:]])[0-9a-fA-F]{1,4}::(([0-9a-fA-F]{1,4}:){0,5}[0-9a-fA-F]{1,4})?(\$|[^[:alnum:]])"
color magenta "(^|[^[:alnum:]])([0-9a-fA-F]{1,4}:){2}:(([0-9a-fA-F]{1,4}:){0,4}[0-9a-fA-F]{1,4})?(\$|[^[:alnum:]])"
color magenta "(^|[^[:alnum:]])([0-9a-fA-F]{1,4}:){3}:(([0-9a-fA-F]{1,4}:){0,3}[0-9a-fA-F]{1,4})?(\$|[^[:alnum:]])"
color magenta "(^|[^[:alnum:]])([0-9a-fA-F]{1,4}:){4}:(([0-9a-fA-F]{1,4}:){0,2}[0-9a-fA-F]{1,4})?(\$|[^[:alnum:]])"
color magenta "(^|[^[:alnum:]])([0-9a-fA-F]{1,4}:){5}:(([0-9a-fA-F]{1,4}:)?[0-9a-fA-F]{1,4})?(\$|[^[:alnum:]])"
color magenta "(^|[^[:alnum:]])([0-9a-fA-F]{1,4}:){6}:([0-9a-fA-F]{1,4})?(\$|[^[:alnum:]])"
color magenta "(^|[^[:alnum:]])([0-9a-fA-F]{1,4}:){7}(:|[0-9a-fA-F]{1,4}\\b)"

# "Strings" and 'Strings'
color brightgreen "'(\\\\.|[^\\\\'])*'"
color green ""(\\\\.|[^\\\\"])*""

# Escaped characters
# color brightgreen "\\\\."

# Config sections
color brightyellow "^[[:space:]]*\\[.*\\][[:space:]]*([[:space:]]#|[[:space:]];|\$)" "\\<(End)?(Sub)?Section"
# Comments
color brightblack "(^|[[:space:]])(#|;).*\$"

# Trailing whitespace
color ,blue "[[:space:]]+\$"
    `,
    code: `[user]
    name = ThomasR
[gc]
    aggressiveWindow = 150
[core]
    editor = /usr/bin/nano
    excludesfile = ~/.gitignore.core
    filemode = false
    whitespace = fix,-indent-with-non-tab,trailing-space,cr-at-eol
    quotepath = off
    autocrlf = input
    eol = LF
[justanexample]
    ip = 127.0.0.1
    ip6 = 0::42
[alias]
    st = status
    ci = commit
    co = checkout
    br = branch
    amend = commit --amend -C HEAD
    l = log --pretty='format:%C(3)[%h] %Cgreen%an%Creset%n\\t %cd %s %Cred%d%Creset' --graph --author-date-order
    la = !git l --all
    dif = diff --word-diff=color
    delbranch = "!f() { if [ \\"\$1\\" = \\"-h\\" ]; then echo \\"Usage: git delbranch [ORIGIN] BRANCHNAME\\nExample: git delbranch foo; git delbranch origin foo\\"; return; fi; if [ -z \\"\$2\\" ]; then git branch -d \\"\$1\\"; else git push \\"\$1\\" :\\"\$2\\"; fi; }; f"
    deltag = "!f() { if [ \\"\$1\\" = \\"-h\\" ]; then echo \\"Usage: git deltag [ORIGIN] TAGNAME\\nExample: git deltag foo; git deltag origin foo\\"; return; fi; if [ -z \\"\$2\\" ]; then git tag -d \\"\$1\\"; else git push \\"\$1\\" :refs/tags/\\"\$2\\"; fi; }; f"
# remove All deleted
    rma = !git ls-files --deleted -z | xargs -0 git rm
# remove all Untracked
    rmu = clean -df


[branch]
    autosetuprebase = always
[color]
    branch = auto
    status = auto
    diff = auto
    ui = auto
    log = auto
[color "diff"]
    meta = yellow
    frag = cyan
    old = red
    new = green
    whitespace = red reverse
[color "branch"]
    current = yellow reverse
    local = yellow
    remote = green
[color "status"]
    added = yellow
    changed = green
    untracked = cyan
[color "interactive"]
     prompt = yellow
     header =cyan
     help = green
     error = red
[diff]
    noprefix = true
    wordregex = "[[:alnum:]_\$]+|[:;,.?|\$*/+-]+|[][{}()</>]+|[\\"']+|[^][{}()</>[:alnum:]_\$[:space:]\\"':;,.?|\$*/+-]+"
    renames = true
[log]
    date = local
[merge]
    renamelimit = 4000
[pull]
        rebase = true
[push]
    default = upstream
[diff "css"]
    xfuncname = [^{} ][^{}]*\\\\{
[credential]
    helper = cache --timeout=86400
[i18n]
    logoutputencoding = utf8
    commitencoding = utf8`
});
