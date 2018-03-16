---
layout: layout
title: "External Content in iFrames"
navigation_title: "iFrames"
position: 7
lead: "Iframes allow to include any external content into a page. As such, precaution must be taken that external content doesn't mess up the semantics of your content!"
---

# External Content in iFrames

In general, screen readers treat content in an iframe like any other content on the page.

In addition, they announce the frame:

- NVDA simply announces _"frame"_
- JAWS also announces the iframe's `title` attribute, so be sure to always provide a meaningful title to an iframe

Also, both NVDA and JAWS allow navigating directly to any frame using the `m` key.

[**General iFrame Example**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.aybwMM.small.c05e6cd2-1c8b-44aa-9d0b-65417ded8708.png)](https://codepen.io/accessibility-developer-guide/pen/aybwMM){.code}

# Headings in iframes

Screen readers integrate headings from iframes directly into the heading outline of the parent page. This means that you have to be very careful that an embedded content's heading doesn't badly affect your parent's heading outline!

The following bad example illustrates what can happen: the embedded content is meant to be part of the heading on level 2 "Dancing", but it defines its own headings on level 1.

[**iFrame Example With Wrong Embedded Heading**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.BdNBVG.small.8bfd8393-09a4-473c-8970-7a23e118cb26.png)](https://codepen.io/accessibility-developer-guide/pen/BdNBVG){.code}

The resulting headings outline looks like this to a screen reader:

![Bad heading outline](_media/bad-heading-outline.png){.image}

- `<h1>` Hobbies
    - `<h2>` Playing Soccer
    - `<h2>` Dancing
- `<h1>` Salsa
- `<h1>` Rock'n'Roll
    - `<h2>` Gardening

To fix it, the headings in the embedded content need to be on the correct level relatively to the parent page.

[**iFrame Example With Correct Embedded Heading**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.oeXvRp.small.4fd6f01b-19e9-42a3-bb00-e232b3be1960.png)](https://codepen.io/accessibility-developer-guide/pen/oeXvRp){.code}

Now the resulting headings outline looks correct:

![Correct heading outline](_media/correct-heading-outline.png){.image}

- `<h1>` Hobbies
    - `<h2>` Playing Soccer
    - `<h2>` Dancing
        - `<h3>` Salsa
        - `<h3>` Rock'n'Roll
    - `<h2>` Gardening

## More about accessible heading outlines

The learn more about accessible heading outlines, take a look at page [Heading outlines](/examples/headings){.page} (and specifically at its sub page [HTML5's headings outline algorithm](/examples/headings/html5s-headings-outline-algorithm){.page}).

# Other resources

You can find additional information here: [Creating Accessible Frames and Iframes](http://webaim.org/techniques/frames/).
