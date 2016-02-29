examples.push({
    title: 'Markdown',
    nanorc: `syntax "md" "\\.(md|mkd|mkdn|markdown)$"

# lists
color red "^ *([-*+]|[1-9][0-9]*\\.)"

# tables
color blue ".*[ :]\\|[ :].*"

# blockquotes
color yellow "^>.*"

# emphasis
color brightwhite "(^|[[:space:]])(_[^ ][^_]*_|\\*[^ ][^*]*\\*)"
color brightred "(^|[[:space:]])(__[^ ][^_]*__|\\*\\*[^ ][^*]*\\*\\*)"
color brightblack "(^|[[:space:]])~~[^ ][^~]*~~"

# headlines
color brightyellow "^#{1,6} .*"
color brightyellow "^(---+|===+|___+|\\*\\*\\*+)\\s*$"

# HTML elements
color brightgreen start="</?(a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdi|bdo|bgsound|big|blink|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|command|content|data|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|element|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|head|header|hgroup|hr|html|i|iframe|image|img|input|ins|isindex|kbd|keygen|label|legend|li|link|listing|main|map|mark|marquee|menu|menuitem|meta|meter|multicol|nav|nobr|noembed|noframes|noscript|object|ol|optgroup|option|output|p|param|picture|plaintext|pre|progress|q|rp|rt|rtc|ruby|s|samp|script|section|select|shadow|small|source|spacer|span|strike|strong|style|sub|summary|sup|table|tbody|td|template|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video|wbr|xmp)[[:>:]]" end=">"

# links
color brightblue "\\[[^]]+\\]"
color brightblue "\\[([^][]|\\[[^]]*\\])*\\]\\([^)]+\\)"

# urls
color brightcyan "https?://[^ )>]+"

# images
color magenta "!\\[[^][]*\\](\\([^)]+\\)|\\[[^]]+\\])"

# code
color green "^ {4}[^-*+].*" "\`[^\`]+\`"

# code blocks
# unfortunately, nano is buggy and can’t handle the case
# where start==end with more than one matching block.
# so start="\`\`\`" end="\`\`\`" doesn’t work,
# and we use some stopgap here
color ,green "^\`\`\`$"
color green start="^\`\`\`[^\`]" end="^\`\`\`$"`,
    code: `# H
## H2
### H3
#### H4
##### H5
###### H6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------


Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~


1. First ordered list item
2. Another item
  * Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
  1. Ordered sub-list
4. And another item.

   Some text that should be aligned with the above item.

* Unordered list can use asterisks
- Or minuses
+ Or pluses


[I'm an inline-style link](https://www.google.com)

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself]

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com


Here's our logo (hover to see the title text):

Inline-style:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style:
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"


Inline \`code\` has \`back-ticks around\` it.


\`\`\`javascript
var s = "JavaScript syntax highlighting";
alert(s);
\`\`\`

\`\`\`python
s = "Python syntax highlighting"
print s
\`\`\`

foo

\`\`\`
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.
\`\`\`


No language indicated, so no syntax highlighting in Markdown Here (varies on Github).
But let's throw in a <b>tag</b>.


Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | \`renders\` | **nicely**
1 | 2 | 3


> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.


<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>


Three or more...

---

Hyphens

***

Asterisks

___

Underscores


Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a *separate paragraph*.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the *same paragraph*.


<a href="http://www.youtube.com/watch?feature=player_embedded&v=YOUTUBE_VIDEO_ID_HERE
" target="_blank"><img src="http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg"
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>


[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](http://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)

---
Taken from the markdown cheat sheet by Adam Pritchard (https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet), licensed under "CC BY 3.0": https://creativecommons.org/licenses/by/3.0/`
});
