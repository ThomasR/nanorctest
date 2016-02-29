examples.push({
    title: 'xml/html',
    nanorc: `syntax "xml" "\\.(dtd|ent|html?|xml|xul|svg|plist|xib)$"

# Code
icolor brightgreen start="\<\code" end="\<\/code>"

# Tags
color brightblue start="\<" end=">"

# XML Declaration
color brightcyan start="\<\\?xml" end="\\?\>"

# Attributes
color red "[[:space:]][[:graph:]][^= ]*="

# \</> =
color cyan "[\<>=]" "\</"

# pre
icolor brightyellow,blue "\<pre[ >]" "\</pre>"

# values
color green ""[^"]*""

# Doctype
color brightcyan start="\<!DOCTYPE" end=">"
color yellow "\<!DOCTYPE[^"]+("|$)"

# Quotes
color cyan "["]"

# \<head> and \<body>
icolor black,green "\</?head[ >]"
icolor brightwhite,green "\</?body[ >]"

# Stylesheets
icolor magenta start="\<style" end="\</style>"
icolor start="style="" end="""

# CDATA
color brightmagenta start="\<!\\[CDATA\\[" end="\\]\\]>"

# colors
icolor brightred "#([0-9a-f]{3}){1,2}" "rgb\\([^,]+,[^,]+,[^)]+\\)" "\\\<(AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenrod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|Goldenrod|Gray|Green|GreenYellow|Honeydew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenrodYellow|LightGreen|LightGrey|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquamarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenrod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|Seashell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)"

# Masked special characters
icolor brightyellow "&([a-z0-9]+|#([0-9]+|x[0-9a-f]+));"

# comments
color brightblack start="\<!--" end="-->"

# Conditional Comments
color brightgreen start="\<!--\[if[^]]+\]" end="\<!\[endif\]-->"

# Scripts
icolor brightyellow start="\<script" end="\</script>"
`,
    code: `<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <!-- Place favicon.ico in the root directory -->

        <link rel="stylesheet" href="css/normalize.css">
        <style>
            body {
                background: magenta;
            }
        </style>
        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.8.3.min.js"></script>
    </head>
    <body>
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        <p>
            Copyright (c) HTML5 Boilerplate

            Permission is hereby granted, free of charge, to any person obtaining a copy of
            this software and associated documentation files (the "Software"), to deal in
            the Software without restriction, including without limitation the rights to
            use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
            of the Software, and to permit persons to whom the Software is furnished to do
            so, subject to the following conditions:

            The above copyright notice and this permission notice shall be included in all
            copies or substantial portions of the Software.

            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
        </p>

        <script src="https://code.jquery.com/jquery-1.12.1.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.12.1.min.js"><\/script>')</script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>

        <!-- Google Analytics: change UA-XXXXX-Y to be your site's ID. -->
        <script>
            window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
            ga('create','UA-XXXXX-Y','auto');ga('send','pageview')
        </script>
        <script src="https://www.google-analytics.com/analytics.js" async defer></script>
    </body>
</html>
`
});
