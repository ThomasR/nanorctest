examples.push({
    title: 'fstab',
    nanorc: `syntax "fstab" "(/|^)((fs|m)tab|mounts)$"

# type
color brightred "^[[:space:]]*[[:graph:]]+[[:space:]]+[[:graph:]]+[[:space:]]+[[:graph:]]+"

# mount point
color brightcyan "^[[:space:]]*[[:graph:]]+[[:space:]]+[[:graph:]]+"

# file system
color brightyellow "^[[:space:]]*[[:graph:]]+"

# options
color brightgreen "[[:graph:]]+[[:space:]]*[0-9][[:space:]]+[0-9][[:space:]]*($|[[:space:]]#)"

# dump
color brightblue "[0-9][[:space:]]+[0-9][[:space:]]*($|[[:space:]]#)"

# pass
color brightmagenta "[0-9][[:space:]]*($|[[:space:]]#)"

# Comments
color brightblack "([[:space:]]+|^)#.*$"

# Legend
color red "<type>"
color cyan "<mount point>"
color yellow "<file system>"
color green "<options>"
color blue "<dump>"
color magenta "<pass>"
`,
    code: `# <file system> <mount point> <type> <options> <dump> <pass>

UUID=CBB6-24F2 /boot vfat rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=iso8859-1,shortname=mixed,errors=remount-ro 0 2
UUID=0a3407de-014b-458b-b5c1-848e92a327a3 / ext4 rw,relatime,discard,data=ordered 0 1
UUID=b411dc99-f0a0-4c87-9e05-184977be8539 /home ext4 rw,relatime,discard,data=ordered 0 2
UUID=f9fe0b69-a280-415d-a03a-a32752370dee none swap defaults 0 0`
});
