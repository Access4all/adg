---
navigation_title: "Contents Structured"
position: 1
changed: "2019-01-31"
---

# Contents Structured

**This bookmarklet highlights a lot of typical semantic HTML elements, conveying their tag names. This makes inspection of the current page's semantic structure pretty easy.**

## Installation

The following block contains the code for a JavaScript bookmarklet.

<code>
<pre>
javascript:(function()%7Bjavascript%3A(function%20()%20%7Bvar%20to%20%3D%20%5B%7B%20n%3A%20'H1'%2C%20c%3A%20'%23ff0000'%2C%20p%3A%200%20%7D%2C%7B%20n%3A%20'H2'%2C%20c%3A%20'%23713939'%2C%20p%3A%200%20%7D%2C%7Bn%3A%20'H3'%2Cc%3A%20'%2300aa00'%2Cp%3A%200%7D%2C%7B%20n%3A%20'H4'%2C%20c%3A%20'%23054164'%2C%20p%3A%200%20%7D%2C%7B%20n%3A%20'H5'%2C%20c%3A%20'%237F0A7F'%2C%20p%3A%200%20%7D%2C%7B%20n%3A%20'H6'%2C%20c%3A%20'%2301D901'%2C%20p%3A%200%20%7D%2C%7Bn%3A%20'LABEL'%2Cc%3A%20'%23ff0000'%2Cp%3A%200%7D%2C%7B%20n%3A%20'P'%2C%20c%3A%20'%231515C0'%2C%20p%3A%200%20%7D%2C%7B%20n%3A%20'B'%2C%20c%3A%20'%2300D400'%2C%20p%3A%200%20%7D%2C%7B%20n%3A%20'I'%2C%20c%3A%20'%235A005A'%2C%20p%3A%200%20%7D%2C%7Bn%3A%20'EM'%2Cc%3A%20'%234E6401'%2Cp%3A%200%7D%2C%7B%20n%3A%20'TABLE'%2C%20c%3A%20'%23365F5F'%2C%20p%3A%201%20%7D%2C%7B%20n%3A%20'THEAD'%2C%20c%3A%20'%23003366'%2C%20p%3A%201%20%7D%2C%7B%20n%3A%20'TBODY'%2C%20c%3A%20'%239900cc'%2C%20p%3A%201%20%7D%2C%7Bn%3A%20'TFOOT'%2Cc%3A%20'%230000ff'%2Cp%3A%201%7D%2C%7B%20n%3A%20'LEGEND'%2C%20c%3A%20'%2328025D'%2C%20p%3A%200%20%7D%2C%7B%20n%3A%20'STRONG'%2C%20c%3A%20'%23DE1A00'%2C%20p%3A%200%20%7D%2C%7Bn%3A%20'FIELDSET'%2Cc%3A%20'%23800000'%2Cp%3A%201%7D%2C%7B%20n%3A%20'UL'%2C%20c%3A%20'%23FF00B8'%2C%20p%3A%201%20%7D%2C%7B%20n%3A%20'OL'%2C%20c%3A%20'%23%23EE799F'%2C%20p%3A%201%20%7D%2C%7B%20n%3A%20'LI'%2C%20c%3A%20'%234682B4'%2C%20p%3A%200%20%7D%2C%7Bn%3A%20'DL'%2Cc%3A%20'%2300CD66'%2Cp%3A%200%7D%2C%7B%20n%3A%20'DT'%2C%20c%3A%20'%23FFD700'%2C%20p%3A%201%20%7D%2C%7B%20n%3A%20'DD'%2C%20c%3A%20'%238B4726'%2C%20p%3A%200%20%7D%2C%7B%20n%3A%20'BR'%2C%20c%3A%20'%23388E8E'%2C%20p%3A%201%20%7D%2C%7Bn%3A%20'TH'%2Cc%3A%20'%23FF6103'%2Cp%3A%200%7D%2C%7B%20n%3A%20'TD'%2C%20c%3A%20'%2300CDCD'%2C%20p%3A%200%20%7D%2C%7B%20n%3A%20'CAPTION'%2C%20c%3A%20'%234cae4c'%2C%20p%3A%200%20%7D%2C%7B%20n%3A%20'A'%2C%20c%3A%20'%23873600'%2C%20p%3A%200%20%7D%2C%7Bn%3A%20'FORM'%2Cc%3A%20'%23873600'%2Cp%3A%200%7D%2C%7B%20n%3A%20'INPUT'%2C%20c%3A%20'%23E74C3C'%2C%20p%3A%201%20%7D%2C%7B%20n%3A%20'SELECT'%2C%20c%3A%20'%231E8449'%2C%20p%3A%201%20%7D%2C%7Bn%3A%20'TEXTAREA'%2Cc%3A%20'%23633974'%2Cp%3A%201%7D%2C%7B%20n%3A%20'BUTTON'%2C%20c%3A%20'%2334495E'%2C%20p%3A%201%20%7D%5D%3Bvar%20hT%20%3D%20function%20(w%2C%20to)%20%7Bvar%20t%20%3D%20w.document.getElementsByTagName(to.n)%3Bfor%20(var%20i%20%3D%200%3B%20i%20%3C%20t.length%3B%20i%2B%2B)%20%7Bif%20(to.p%20%3D%3D%200)%20%7Bt%5Bi%5D.insertBefore(cT(w%2C%20to%2C%20'')%2C%20t%5Bi%5D.firstChild)%3Bt%5Bi%5D.appendChild(cT(w%2C%20to%2C%20'%2F'))%3B%7D%20else%20%7Bt%5Bi%5D.parentNode.insertBefore(cT(w%2C%20to%2C%20'')%2C%20t%5Bi%5D)%3Bt%5Bi%5D.parentNode.insertBefore(cT(w%2C%20to%2C%20'%2F')%2C%20t%5Bi%5D.nextSibling)%3B%7D%7D%7D%3Bvar%20cT%20%3D%20function%20(w%2C%20to%2C%20slash)%20%7Bvar%20s%20%3D%20w.document.createElement('span')%3Bvar%20z%20%3D%20s.style%3Bz.color%20%3D%20to.c%3Bz.backgroundColor%20%3D%20'%23fff'%3Bz.backgroundImage%20%3D%20'none'%3Bz.fontSize%20%3D%20'14px'%3Bz.fontWeight%20%3D%20'bold'%3Bz.position%20%3D%20'absolute'%3Bvar%20tn%20%3D%20w.document.createTextNode('%20%5B'%20%2B%20slash%20%2B%20to.n%20%2B%20'%5D%20')%3Bs.insertBefore(tn%2C%20s.firstChild)%3Breturn%20s%7D%3Bvar%20traverse%20%3D%20function%20(w)%20%7Btry%20%7Bfor%20(var%20i%20%3D%200%3B%20i%20%3C%20to.length%3B%20i%2B%2B)%20hT(w%2C%20to%5Bi%5D)%3Bfor%20(var%20i%20%3D%200%3B%20i%20%3C%20w.frames.length%3B%20i%2B%2B)%20traverse(w.frames%5Bi%5D)%3B%7D%20catch%20(e)%20%7B%7D%7D%3Btraverse(window)%3B%7D)()%7D)()
</pre>
</code>

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
