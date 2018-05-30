---
navigation_title: "Contents Structured"
position: 1
changed: "2018-05-16"
---

# Contents Structured

**This bookmarklet highlights a lot of typical semantic HTML elements, conveying their tag names. This makes inspection of the current page's semantic structure pretty easy.**

## Installation

Bookmark this: [Contents structured](javascript:(function()%7Bvar to%3Dnew Array(%7Bn:%27H1%27,c:%27%23ff0000%27,p:0%7D,%7Bn:%27H2%27,c:%27%23713939%27,p:0%7D,%7Bn:%27H3%27,c:%27%2300aa00%27,p:0%7D,%7Bn:%27H4%27,c:%27%23054164%27,p:0%7D,%7Bn:%27H5%27,c:%27%237F0A7F%27,p:0%7D,%7Bn:%27H6%27,c:%27%2301D901%27,p:0%7D,%7Bn:%27LABEL%27,c:%27%23ff0000%27,p:0%7D,%7Bn:%27P%27,c:%27%231515C0%27,p:0%7D,%7Bn:%27B%27,c:%27%2300D400%27,p:0%7D,%7Bn:%27I%27,c:%27%235A005A%27,p:0%7D,%7Bn:%27EM%27,c:%27%234E6401%27,p:0%7D,%7Bn:%27TABLE%27,c:%27%23365F5F%27,p:1%7D,%7Bn:%27THEAD%27,c:%27%23003366%27,p:1%7D,%7Bn:%27TBODY%27,c:%27%239900cc%27,p:1%7D,%7Bn:%27TFOOT%27,c:%27%230000ff%27,p:1%7D,%7Bn:%27LEGEND%27,c:%27%2328025D%27,p:0%7D,%7Bn:%27STRONG%27,c:%27%23DE1A00%27,p:0%7D,%7Bn:%27FIELDSET%27,c:%27%23800000%27,p:1%7D,%7Bn:%27UL%27,c:%27%23FF00B8%27,p:1%7D,%7Bn:%27OL%27,c:%27%23%23EE799F%27,p:1%7D,%7Bn:%27LI%27,c:%27%234682B4%27,p:0%7D,%7Bn:%27DL%27,c:%27%2300CD66%27,p:0%7D,%7Bn:%27DT%27,c:%27%23FFD700%27,p:1%7D,%7Bn:%27DD%27,c:%27%238B4726%27,p:0%7D,%7Bn:%27BR%27,c:%27%23388E8E%27,p:1%7D,%7Bn:%27TH%27,c:%27%23FF6103%27,p:0%7D,%7Bn:%27TD%27,c:%27%2300CDCD%27,p:0%7D,%7Bn:%27CAPTION%27,c:%27%234cae4c%27,p:0%7D,%7Bn:%27A%27,c:%27%23873600%27,p:0%7D,%7Bn:%27FORM%27,c:%27%23873600%27,p:0%7D,%7Bn:%27INPUT%27,c:%27%23E74C3C%27,p:1%7D,%7Bn:%27SELECT%27,c:%27%231E8449%27,p:1%7D,%7Bn:%27TEXTAREA%27,c:%27%23633974%27,p:1%7D,%7Bn:%27BUTTON%27,c:%27%2334495E%27,p:1%7D)%3Bfunction hT(w,to)%7Bvar t%3Dw.document.getElementsByTagName(to.n)%3Bfor(var i%3D0%3Bi<t.length%3Bi%2B%2B)%7Bif(to.p%3D%3D0)%7Bt%5Bi%5D.insertBefore(cT(w,to,%27%27),t%5Bi%5D.firstChild)%3Bt%5Bi%5D.appendChild(cT(w,to,%27/%27))%3B%7Delse%7Bt%5Bi%5D.parentNode.insertBefore(cT(w,to,%27%27),t%5Bi%5D)%3Bt%5Bi%5D.parentNode.insertBefore(cT(w,to,%27/%27),t%5Bi%5D.nextSibling)%3B%7D%7D%7Dfunction cT(w,to,slash)%7Bvar s%3Dw.document.createElement(%27span%27)%3Bvar z%3Ds.style%3Bz.color%3Dto.c%3Bz.backgroundColor%3D%27%23fff%27%3Bz.backgroundImage%3D%27none%27%3Bz.fontSize%3D%2714px%27%3Bz.fontWeight%3D%27bold%27%3Bz.position%3D%27absolute%27%3Bvar tn%3Dw.document.createTextNode(%27 %5B%27%2Bslash%2Bto.n%2B%27%5D %27)%3Bs.insertBefore(tn,s.firstChild)%3Breturn s%3B%7Dfunction traverse(w)%7Btry%7Bfor(var i%3D0%3Bi<to.length%3Bi%2B%2B)hT(w,to%5Bi%5D)%3Bfor(var i%3D0%3Bi<w.frames.length%3Bi%2B%2B)traverse(w.frames%5Bi%5D)%3B%7Dcatch(e)%7B%7D%7Dtraverse(window)%3B%7D)()%3B).

## Usage

Activate the bookmarklet by clicking on it. Then inspect the displayed results and make sure the used tags are semantically meaningful.

![Results after firing "Contents structured" bookmarklet](_media/results-after-firing-contents-structured-bookmarklet.png)

## Credits

This is a slightly enriched version of the bookmarklet [Inhalte gegliedert](http://testen.bitv-test.de/bookmarklets.html). Our version highlights some more elements like lists, tables, links, and forms.