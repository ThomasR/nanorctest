examples.push({
    title: 'Bash',
    nanorc: `syntax "sh" "\\.sh$" "(/|^|\\.)bash(rc|_[^/]*)$" "(^|\\.|/)(bash_)?profile$"

# keywords
color brightmagenta "\\b(break|case|do|done|elif|else|esac|exit|fi|for|if|in|local|read|return|select|shift|then|time|until|while)\\b"

# sudo
color black,red "(^|[^-[:alnum:]])sudo($|[^-[:alnum:]])"

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
color brightcyan "(^|[^-[:alnum:]])(cat|cd|chgrp|chmod|chown|clear|cp(io)?|echo|env|export|[efr]?grep|install|kill(all)?|let|ln|ls|make|mkdir|mv|rm(dir)?|sed|set|tar|test|touch|umask|uname|unset|which)($|[^-[:alnum:]])"

# "Strings"
color green ""(\\.|[^\\\\"])*""

# command substitution
color brightyellow "\`(\\.|[^\\\\\`])*\`" "\\$\\((\\.|[^\\)])*\\)"

# calculations $((x+y))
icolor magenta start="\\$\\(\\(" end="\\)\\)"

# Variables
icolor brightblue "\\$[:0-9A-Z_!@#$*?-]+" "(^|\\;)[[:space:]]*(export[[:space:]]+)?[0-9A-Z_!@#$*?-]+="
icolor brightblue start="\\$\\{" end="}"

# Syntax errors on var assignment
icolor brightwhite,red "(^|\\;)[[:space:]]*(export[[:space:]]+)?\\$[0-9A-Z_!@#$*?-]+=" "(^|\\;)[[:space:]]*(export[[:space:]]+)?[0-9A-Z_!@#$*?-]+[[:space:]]=" "(^|\\;)[[:space:]]*(export[[:space:]]+)?[0-9A-Z_!@#$*?-]+=[[:space:]]"

color brightcyan "(^|\\;)[[:space:]]*export[[:space:]]+"

# escaped
color brightgreen "\\." "\\0[0-7]{1,3}" "\\\\x[a-fA-F0-9]{1,2}"

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
    code: `#!/usr/bin/env bash

##########
# Checks #
##########
function lxc_check() {
    lxc-ls | grep -qw "\$1" && return 1 || return 0
}

function lxc_name_check() {
    if [[ -z \$1 ]]; then
        echo "Empty container name, exitted."
        exit 1
    fi
}

function lxc_name_required() {
    lxc_name_check \$1
    if  lxc_check \$1; then
        echo "No container named '\$1' does not exists"
        exit 1
    fi
}

function lxc_template_required() {
    if [[ -z \$1 ]]; then
        echo "No template name, exitted."
        exit 1
    fi
}


function lxc_name_running_check() {
    lxc-ls --running | grep -qw "\$1" && return 1 || return 0
}

function lxc_name_running_required() {
    lxc_name_check \$1
    if  lxc_name_running_check \$1; then
        echo "The container '\$1' is not running"
        exit 1
    fi
}

#####################
# Common operations #
#####################

# help: init <NAME> <TEMPLATE> create a named container using the designated template
function lxc_init() {
    lxc_name_check \$1
    lxc_template_required \$2
    name=\$1
    template=\$2
    options=\${@:3}
    lxc-create -t \$template -n \$name -- \$options
}

# help: destroy <NAME> [-f] delete the named container.
# help:destroy use -f if it's still running, to force its destruction.
function lxc_destroy() {
    lxc_name_required \$1
    options=\${@:2}
    read -p "Are you sure? (y/n) " -n 1 -r
    echo
    if [[ \$REPLY =~ ^[Yy]\$ ]]; then
        lxc-destroy -n \$1 \$options
    fi
}

# help: start <NAME> start the named container
function lxc_start() {
    lxc_name_required \$1
    if ! lxc-wait -n \$1 -s RUNNING -t 0; then
        lxc-start -n \$1 -d
        lxc-wait -n \$1 -s RUNNING
    fi
    echo "Started \$1"
}

# help: attach <NAME> attach the named container using bash as a default shell
function lxc_attach() {
    lxc_name_required \$1
    SHELL=/bin/bash LANG=C lxc-attach -n \$1
}

# help: go <NAME> start if not ready, and attach to the named container
function lxc_go() {
    lxc_start \$1
    lxc_attach \$1
}

# help: stop <NAME> stop the named container
# help:stop if you run the command "stop all", it will stop all running containers
function lxc_stop() {
    if [[ \$1 == "all" ]]
    then
        for container in \`lxc-ls --running\`
        do
            lxc-stop -n \$container -t 10
            echo "Stopped \$container"
        done
    else
        lxc_name_required \$1
        lxc-stop -n \$1 -t 10
        echo "Stopped \$1"
    fi
}

# help: restart <NAME> stop & start the named container
function lxc_restart() {
    lxc_stop \$1
    lxc_start \$1
}

# help: ls "fancy" list of available containers
function lxc_ls() {
    lxc-ls -f
}

# help: info <NAME> give information about the named container
function lxc_info() {
    lxc_name_required \$1
    lxc-info --name \$1
}

# help: ip <NAME> give the IP address of the named container
function lxc_ip() {
    lxc_name_required \$1
    lxc-info --name \$1 -i
}

# help: editconfig <NAME> open \$EDITOR for the config file of the named container
# help:editconfig *WARNING* any modification in your config file will only be taken into account when you'll restart you container.
# help:editconfig *OR* use the --restart option to explicitely restart your container right after you closed your editor.
function lxc_editconfig() {
    lxc_name_required \$1
    \$EDITOR /var/lib/lxc/\$1/config
    options=\${@:2}
    if [[ \$options == *"--restart"* ]]; then
        lxc_restart \$1;
    else
        echo "Warning: any change will need a restart to be taken into account"
    fi
}

# help: push <NAME> <source> [<target>] copy the source file to the target path in the named container.
# help:push target path are relative to the \`rootfs\`. if \`target\` is omitted, the file will be pushed at the "/" of the container.
function lxc_push() {
    lxc_name_required \$1
    source_file=\`readlink -f \$2\`
    target_file=\$3
    target_file=\${target_file#/}
    target_path=/var/lib/lxc/\$1/rootfs/\$target_file
    cp \$source_file \$target_path
    echo "\${source_file} copied into \$1"
}

# help: share <NAME> <source path> <target path> mount a shared directory on your container.
# help:share *WARNING* you'll have to restart your container to have the shared directory activated.
# help:share *OR* use the --restart option to explicitely restart your container immediately after this command.
function lxc_share() {
    lxc_name_required \$1
    source_path=\`readlink -f \$2\`
    target_path=\$3
    target_path=\${target_path#/}
    # Mandatory arguments
    if [[ -z \$source_path ]]; then
        echo "'source path' argument is mandatory."
        exit 1
    fi
    if [[ -z \$target_path ]]; then
        echo "'target path' argument is mandatory."
        exit 1
    fi
    config=/var/lib/lxc/\$1/config
    options=\${@:4}

    # Check for restart
    restart=false
    if [[ \$options == *"--restart"* ]]; then
        restart=true
        options="\${options/--restart/}"
    fi
    # revamp options if needed
    options="\${options:-none defaults,bind,uid=0,create=dir 0 0}"
    source_prefix="lxc.mount.entry = \$source_path"
    line="\$source_prefix \$target_path \$options"
    # Delete the previous share
    sed -i "\\|\${source_prefix} |d" \$config
    # Add it to the end
    echo "\$line" >> \$config
    echo "Shared '\${source_path}'."
    if \$restart; then
        lxc_restart \$1
    else
        echo "Warning: this change needs a restart to be taken into account"
    fi
}

# help: unshare <NAME> <source path> unmount the shared directory on your container.
# help:unshare *WARNING* you'll have to restart your container to take this unshare into account.
# help:unshare *OR* use the --restart option to explicitely restart your container immediately after this command.
function lxc_unshare() {
    lxc_name_required \$1
    source_path=\`readlink -f \$2\`
    # Mandatory argument
    if [[ -z \$source_path ]]; then
        echo "'source path' argument is mandatory."
        exit 1
    fi
    # Check for restart
    options=\${@:3}
    restart=false
    if [[ \$options == *"--restart"* ]]; then
        restart=true
        options="\${options/--restart//}"
    fi
    config=/var/lib/lxc/\$1/config
    source_prefix="lxc.mount.entry = \$source_path"
    # Delete the previous share
    sed -i "\\|\${source_prefix} |d" \$config
    echo "Unshared '\${source_path}'."
    if \$restart; then
        lxc_restart \$1
    else
        echo "Warning: this change needs a restart to be taken into account"
    fi
}

# help: exec <NAME> <command> run a command on the designated running container
# help:exec note: the command doesn't have to be interactive or not.
# help:exec If you're prompted, you'll keep the ability to answer.
function lxc_exec() {
    lxc_name_running_required \$1
    cmd=\${@:2}
    # Mandatory argument
    if [[ -z \$cmd ]]; then
        echo "the 'command' argument is mandatory."
        exit 1
    fi
    lxc-attach -n \$1 -- \$cmd
}

# help: help [command] displays this help message or help for the designated command
function lxc_help() {
    if [[ -z \$1 ]]; then
        echo "Available commands:"
        echo ""
        sed -n '/^# help: /{s/# help: /  * /;p}' \$0
        echo ""
    else
        cmd=\$1
        echo "Help on: \${cmd}"
        echo
        sed -n "/^# help: \${cmd}/{s/# help: /  /;p}" \$0
        echo
        sed -n "/^# help:\${cmd}/{s/# help:\${cmd}/ /;p}" \$0
        echo ""
    fi
}

# Check Who am I
if [ "\$(whoami)" != "root" ]; then
	echo "Sorry, you are not root."
	exit 1
fi

# Run help
[[ -z "\${1-}" ]] && lxc_help "\$1" && exit
case \$1 in
	start|stop|restart|attach|ls|info|ip|editconfig|init|destroy|go|push|share|unshare|exec) lxc_"\$1" "\${@:2}" ;;
    att) lxc_attach "\${@:2}" ;;
	*) lxc_help "\$2" ;;
esac
`
});
