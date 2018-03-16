---
layout: layout
title: "HTML5's headings outline algorithm"
---

# HTML5's headings outline algorithm

The idea behind HTML5's heading algorithm is great, it sadly was never picked up by any browser or screen reader.

The HTML5's heading outline algorithm allows to create heading outlines much easier by using the context elements like `<main>`, `<article>` and `<aside>`: you can put whatever heading levels you want within these (for example, you could use headings on level 1 throughout). This makes including external content much safer, as you don't have to worry about headings anymore (another way to include external content is using an iframe, more info here: [External Content in iFrames](/code-examples/external-content-in-iframes){.page}).

# Fact: HTML5 outlines are not accessible!

In practice, this sadly wasn't implemented by any assistive software known yet. And finally, even the W3C advises against using the HTML5 document outline in its HTML 5.2 draft: [Computer says NO to HTML5 document outline (html5doctor.com)](http://html5doctor.com/computer-says-no-to-html5-document-outline/).

The following example shows the correct usage of the HTML5 outline algorithm. Check it out with a screen reader and see whether it works or not (spoiler: it won't).

If you want to see how it **should** work, use [HeadingsMap](/code-examples/accessible-heading-outlines/quick-tools-for-examining-heading-outlines){.page title="Quick tools for examining heading outlines"}'s experimental feature for displaying HTML5 outlines.

[**HTML5 Headings Outline Algorithm Example**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.owyXqN.small.2f94c6cb-a57a-40b5-bd39-37ddad8c32bf.png)](https://codepen.io/accessibility-developer-guide/pen/owyXqN){.code}

# How to fix HTML5 outlines

## If possible: use standard HTML headings!

The best is to simply avoid relying on the HTML5 outline algorithm. Instead, use the traditional HTML heading mechanism (irrespective of whether you're combining them with elements like `<main>` or `<article>`).

[**HTML5 Headings Outline Algorithm Example with Numbered Headings**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.OgEVEm.small.0f84404f-900d-4551-a232-832603042c22.png)](https://codepen.io/accessibility-developer-guide/pen/OgEVEm){.code}

## Otherwise: use ARIA to overrule heading levels!

If you really need to use HTML5 outline, you can try to use ARIA's `role="heading"` together with `aria-level` (to set a specific level, e.g. `aria-level="3"` for heading level 3). You could do that even programmatically using JavaScript.

[**HTML5 Headings Outline Algorithm Example With Fixed ARIA Levels**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.dRKVdb.small.6008d13b-5105-45fe-92f3-f510ecfc6995.png)](https://codepen.io/accessibility-developer-guide/pen/dRKVdb){.code}