---
layout: layout
title: "Search engine optimisation concerns"
position: 5
lead: "Websites optimised for accessibility also result in better search engine rankings. There are a few questions though that sometimes concern search engine optimisation experts."
---

# Search engine optimisation concerns

# Is it okay to have more than one heading on level 1?

Search engine optimisation (SEO) experts often state that a web page must only have a single heading on level 1. According to them, this heading must describe the main content of the page.

Since HTML5 there are additional semantical containers like the `<main>` element. From a semantical point of view, search engines now are totally capable of distinguishing "main headings" (that reside in the `<main>` element) and other headings, regardless of their level.

# From our perspective: yes, it absolutely is!

In our opinion then, having more than one heading on level 1 is absolutely reasonable: at least one for the main content (that lives in the `<main>` element), and additional ones for labelling those other page regions like header, navigation, footer, etc.

# Alternative solutions

If you definitely don't want to have more than a single heading on level 1, we can propose you a few alternative solutions that are still pretty accessible.

## Having a single heading level 1 - on top of the page

One approach is to add the single heading on level 1 at the very top of the page and indenting all other headings below.

[**Headings Example with only One Heading Level 1 on Top of the Page**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.GEGMYj.small.feebc670-7fd3-4abf-9c75-6350cceba468.png)](https://codepen.io/accessibility-developer-guide/pen/GEGMYj){.code}

This way it's a bit harder for screen reader users to find the "real" main content. By using HTML5 context giving elements like `<header>`, `<footer>`, and especially `<main>`, you can work around this problem effectively.

It might feel a bit awkward to have the main heading as both an `<h1>` and an `<h2>`. If you like, you can add a prefix to the heading in the `<main>` region and [hide it visually](/examples/hiding-elements){.page title="Hiding elements correctly"}, e.g. "Main content: ":

```html
<main>
  <h2>
    <span class="visually-hidden">Main Content:</span>
    My Hobbies
  </h2>
</main>
```

## Having a single heading level 1 - on top of the main content

If you prefer to have the single heading on level 1 directly on top of the main content, it is okay also okay. If you still need headings for the elements above it (e.g. the header), you can start on level 2 for them.

[**Headings Example with only One Heading Level 1 on Top of the Main Content**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.KqeXjB.small.6349b04d-706e-452a-adc0-b4eda47df8c0.png)](https://codepen.io/accessibility-developer-guide/pen/KqeXjB){.code}

This creates a heading outline which technically is a bit invalid, as it starts with a heading on level 2 (and you shouldn't skip heading levels). Also, it feels a bit strange that, using this technique, the header stands on its own, while the footer is part of the main content.

This special case is accepted though by the accessibility community.