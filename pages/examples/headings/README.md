---
navigation_title: "Headings"
position: 3
changed: "2018-05-02"
---

# Heading outlines

**Like a traditional book's table of contents, a proper heading hierarchy allows screen reader users to quickly get an overview over the available areas of a page (including header, main, footer, and alike), and their respective contents. Furthermore, a comprehensive heading hierarchy supports quick navigation inside all those contents.**

TODO

## Additional notes

- Während NVDA es egal ist, ob sich innerhalb der aktuellen Überschrift eine `<h3>` ist, wenn man `3` drückt, und ggf. auch einfach daraus hinausspringt zu irgendeiner `<h3>`, schränkt JAWS diese Funktionalität auf die aktuelle Überschrift ein!
- Da braucht es irgendwo noch einen Hinweis, dass `<title>` und `<h1>` niemals dasselbe sind! Beim General Headings Example z.B.! Mit Link zu [Title](/examples/title).

---

First things first: you need to [learn how to handle headings](/examples/headings/handling) - using screen readers and other tools.

We begin by explaining that [website content should be structured properly using headings](/examples/headings/good-example) - very similar to books. This is followed by a [demonstration about what typically can go wrong](/examples/headings/bad-example) when developers aren't mindful and forget about proper semantics and logic of textual content.

Not only a page's main content - also recurring areas such as header, footer, and navigation need to provide proper headings. To not destroy the visual design, such headings can be inserted as [visually hidden headings](/examples/headings/visually-hidden-headings).

We then address some often posed [concerns about search engine optimisation](/examples/headings/multiple-h1-okay-for-seo) and explain, why we think that a page absolutely can (and should) have more than a single heading on level 1. And for those who aren't convinced, we provide some alternate solutions with only a single heading on level 1. Yay!

While headings are the most widely known and robust technique to label page regions, there exist [other ways to label content](/examples/headings/alternative-techniques) in HTML (though we don't recommend to use them).

Finally, we explain why the seemingly genius [HTML5's heading algorithm](/examples/headings/html-5-outline) is not accessible, and what alternatives there are.