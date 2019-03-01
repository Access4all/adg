---
navigation_title: "Contents Structured"
position: 1
changed: "2019-01-31"
---

# Contents Structured

**This bookmarklet highlights a lot of typical semantic HTML elements, conveying their tag names. This makes inspection of the current page's semantic structure pretty easy.**

## Installation

The following block contains the code for a JavaScript bookmarklet.
See the [Bookmarklets](/setup/browsers/bookmarklets/) page for details and setup.

Alternatively, you can execute the code into your JavaScript console.

<code>
<pre>
javascript:(function () {
  var to = [
    { n: 'H1', c: '#ff0000', p: 0 },
    { n: 'H2', c: '#713939', p: 0 },
    {
      n: 'H3',
      c: '#00aa00',
      p: 0
    },
    { n: 'H4', c: '#054164', p: 0 },
    { n: 'H5', c: '#7F0A7F', p: 0 },
    { n: 'H6', c: '#01D901', p: 0 },
    {
      n: 'LABEL',
      c: '#ff0000',
      p: 0
    },
    { n: 'P', c: '#1515C0', p: 0 },
    { n: 'B', c: '#00D400', p: 0 },
    { n: 'I', c: '#5A005A', p: 0 },
    {
      n: 'EM',
      c: '#4E6401',
      p: 0
    },
    { n: 'TABLE', c: '#365F5F', p: 1 },
    { n: 'THEAD', c: '#003366', p: 1 },
    { n: 'TBODY', c: '#9900cc', p: 1 },
    {
      n: 'TFOOT',
      c: '#0000ff',
      p: 1
    },
    { n: 'LEGEND', c: '#28025D', p: 0 },
    { n: 'STRONG', c: '#DE1A00', p: 0 },
    {
      n: 'FIELDSET',
      c: '#800000',
      p: 1
    },
    { n: 'UL', c: '#FF00B8', p: 1 },
    { n: 'OL', c: '##EE799F', p: 1 },
    { n: 'LI', c: '#4682B4', p: 0 },
    {
      n: 'DL',
      c: '#00CD66',
      p: 0
    },
    { n: 'DT', c: '#FFD700', p: 1 },
    { n: 'DD', c: '#8B4726', p: 0 },
    { n: 'BR', c: '#388E8E', p: 1 },
    {
      n: 'TH',
      c: '#FF6103',
      p: 0
    },
    { n: 'TD', c: '#00CDCD', p: 0 },
    { n: 'CAPTION', c: '#4cae4c', p: 0 },
    { n: 'A', c: '#873600', p: 0 },
    {
      n: 'FORM',
      c: '#873600',
      p: 0
    },
    { n: 'INPUT', c: '#E74C3C', p: 1 },
    { n: 'SELECT', c: '#1E8449', p: 1 },
    {
      n: 'TEXTAREA',
      c: '#633974',
      p: 1
    },
    { n: 'BUTTON', c: '#34495E', p: 1 }
  ];

  var hT = function (w, to) {
    var t = w.document.getElementsByTagName(to.n);
    for (var i = 0; i < t.length; i++) {
      if (to.p == 0) {
        t[i].insertBefore(cT(w, to, ''), t[i].firstChild);
        t[i].appendChild(cT(w, to, '/'));
      } else {
        t[i].parentNode.insertBefore(cT(w, to, ''), t[i]);
        t[i].parentNode.insertBefore(cT(w, to, '/'), t[i].nextSibling);
      }
    }
  };

  var cT = function (w, to, slash) {
    var s = w.document.createElement('span');
    var z = s.style;
    z.color = to.c;
    z.backgroundColor = '#fff';
    z.backgroundImage = 'none';
    z.fontSize = '14px';
    z.fontWeight = 'bold';
    z.position = 'absolute';
    var tn = w.document.createTextNode(' [' + slash + to.n + '] ');
    s.insertBefore(tn, s.firstChild);
    return s
  };

  var traverse = function (w) {
    try {
      for (var i = 0; i < to.length; i++) hT(w, to[i]);
      for (var i = 0; i < w.frames.length; i++) traverse(w.frames[i]);
    } catch (e) {}
  };

  traverse(window);
})();
</pre>
</code>

## Usage

Activate the bookmarklet by clicking on it. Then inspect the displayed results and make sure the used tags are semantically meaningful.

![Results after firing "Contents structured" bookmarklet](_media/results-after-firing-contents-structured-bookmarklet.png)

## Credits

This is a slightly enriched version of the bookmarklet [Inhalte gegliedert](http://testen.bitv-test.de/bookmarklets.html). Our version highlights some more elements like lists, tables, links, and forms.
