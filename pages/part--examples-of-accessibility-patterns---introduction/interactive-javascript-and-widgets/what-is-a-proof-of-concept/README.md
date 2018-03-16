---
layout: layout
title: "What is a \"Proof of concept\"?"
position: 2
lead: "TODO"
---

# What is a "Proof of concept"?

**Important**: these widgets are proofs of concept and thus are not intended to be used as-is in a "real world" project, as they are only optimised for specific versions of screen readers and browsers.

Our proofs of concepts are exact that: proofs of a given concept with main focus on accessibility, optimised for the most widely used combinations of browsers and screen readers. As such, they're not meant to be copied&pasted 1:1 into real projects. 

They have the purpose to give you an idea about how an accessible widget should behave like, so you can implement your own one.

ARIA roles and states were relinquished wherever possible, as they seem to be supported to different degrees by common browsers and screenreaders. So to prevent unforseeable problems, only plain ol' HTML and basic JavaScript was used.

See [Our codex about clean and maintainable accessibility](/part--knowledge-about-accessibility---introduction/our-codex-about-clean-and-maintainable-accessibility){.page}.

See [Chapter: Introduction to keyboard only usage - overview](/part--knowledge-about-accessibility---introduction/chapter--introduction-to-keyboard-only-usage---overview){.page}.

See [Chapter: Introduction to desktop screen reader usage - overview](/part--knowledge-about-accessibility---introduction/chapter--introduction-to-desktop-screen-reader-usage---overview){.page}.

# Using the controls: single focusable item vs. multiple

TODO

# Search engine optimisation concerns

TODO: What about SEO?! The contents that are set to display:none, are they indexed? What about using links in the labels that can be found by Google (i.e. the links point to #tab1, #tab2, etc. and this triggers the corresponding tab to be displayed initially)?