---
layout: layout
title: "Contents Structured"
navigation_title: "Contents Structured"
position: 1
lead: "This bookmarklet highlights a lot of typical semantic HTML elements, conveying their tag names. This makes inspection of the current page's semantic structure pretty easy."
changed: "2018-04-06"
---

# Contents Structured

# Installation

Bookmark this: [Contents structured](javascript:%28function%28%29{var to=new Array%28{n:'H1',c:'#ff0000',p:0},{n:'H2',c:'#713939',p:0},{n:'H3',c:'#00aa00',p:0},{n:'H4',c:'#054164',p:0},{n:'H5',c:'#7F0A7F',p:0},{n:'H6',c:'#01D901',p:0},{n:'LABEL',c:'#ff0000',p:0},{n:'P',c:'#1515C0',p:0},{n:'B',c:'#00D400',p:0},{n:'I',c:'#5A005A',p:0},{n:'EM',c:'#4E6401',p:0},{n:'TABLE',c:'#365F5F',p:1},{n:'LEGEND',c:'#28025D',p:0},{n:'STRONG',c:'#DE1A00',p:0},{n:'FIELDSET',c:'#800000',p:1},{n:'UL',c:'#FF00B8',p:1},{n:'OL',c:'##EE799F',p:1},{n:'LI',c:'#4682B4',p:0},{n:'DL',c:'#00CD66',p:0},{n:'DT',c:'#FFD700',p:1},{n:'DD',c:'#8B4726',p:0},{n:'BR',c:'#388E8E',p:1},{n:'TH',c:'#FF6103',p:0},{n:'TD',c:'#00CDCD',p:1}%29;function hT%28w,to%29{var t=w.document.getElementsByTagName%28to.n%29;for%28var i=0;i<t.length;i++%29{if%28to.p==0%29{t[i].insertBefore%28cT%28w,to,''%29,t[i].firstChild%29;t[i].appendChild%28cT%28w,to,'/'%29%29;}else{t[i].parentNode.insertBefore%28cT%28w,to,''%29,t[i]%29;t[i].parentNode.insertBefore%28cT%28w,to,'/'%29,t[i].nextSibling%29;}}}function cT%28w,to,slash%29{var s=w.document.createElement%28'span'%29;var z=s.style;z.color=to.c;z.backgroundColor='#fff';z.backgroundImage='none';z.fontSize='14px';z.fontWeight='bold';z.position='absolute';var tn=w.document.createTextNode%28'%C2%A0['+slash+to.n+']%C2%A0'%29;s.insertBefore%28tn,s.firstChild%29;return s;}function traverse%28w%29{try{for%28var i=0;i<to.length;i++%29hT%28w,to[i]%29;for%28var i=0;i<w.frames.length;i++%29traverse%28w.frames[i]%29;}catch%28e%29{}}traverse%28window%29;}%29%28%29;).

# Usage

Activate the bookmarklet by clicking on it. Then inspect the displayed results and make sure the used tags are semantically meaningful.

![Results after firing "Contents structured" bookmarklet](_media/results-after-firing-contents-structured-bookmarklet.png){.image}

# Credits

This is a slightly enriched version of the bookmarklet [Inhalte gegliedert](http://testen.bitv-test.de/bookmarklets.html). Our version highlights some more elements like lists and tables.