---
layout: layout
title: "HTML5's headings outline algorithm"
navigation_title: "HTML5's headings outline algorithm"
position: 8
lead: "The idea behind HTML5's heading algorithm is great, it sadly was never picked up by any browser or screen reader."
---

# HTML5's headings outline algorithm

The HTML5's heading outline algorithm allows to create heading outlines much easier by using the context elements like `<main>`, `<article>` and `<aside>`: you can put whatever heading levels you want within these (for example, you could use headings on level 1 throughout). This makes including external content much safer, as you don't have to worry about headings anymore (another way to include external content is using an iframe, more info here: [External Content in iFrames](/examples/iframes){.page}).

# Fact: HTML5 outlines are not accessible!

In practice, this sadly wasn't implemented by any assistive software known yet. And finally, even the W3C advises against using the HTML5 document outline in its HTML 5.2 draft: [Computer says NO to HTML5 document outline (html5doctor.com)](http://html5doctor.com/computer-says-no-to-html5-document-outline/).

The following example shows the correct usage of the HTML5 outline algorithm. Check it out with a screen reader and see whether it works or not (spoiler: it won't).

If you want to see how it **should** work, use [HeadingsMap](@page-59)'s experimental feature for displaying HTML5 outlines.

@code(/pages/examples/headings/html5s-headings-outline-algorithm/_examples/html5-headings-outline-algorithm-example/){.code}

# How to fix HTML5 outlines

## If possible: use standard HTML headings!

The best is to simply avoid relying on the HTML5 outline algorithm. Instead, use the traditional HTML heading mechanism (irrespective of whether you're combining them with elements like `<main>` or `<article>`).

@code(/pages/examples/headings/html5s-headings-outline-algorithm/_examples/html5-headings-outline-algorithm-example-with-numbered-headings/){.code}

## Otherwise: use ARIA to overrule heading levels!

If you really need to use HTML5 outline, you can try to use ARIA's `role="heading"` together with `aria-level` (to set a specific level, e.g. `aria-level="3"` for heading level 3). You could do that even programmatically using JavaScript.

@code(/pages/examples/headings/html5s-headings-outline-algorithm/_examples/html5-headings-outline-algorithm-example-with-fixed-aria-levels/){.code}