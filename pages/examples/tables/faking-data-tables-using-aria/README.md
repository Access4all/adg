---
layout: layout
title: "Faking data tables using ARIA"
navigation_title: "Faking data tables using ARIA"
position: 5
lead: "Sometimes it's necessary to visually style tables in a way that standard tables aren't supposed to, e.g. when stacking table data vertically on small devices."
---

# Faking data tables using ARIA

# A table of divs

The following example contains an HTML structure that's made of pure `<div>` elements. Due to adding an appropriate `role` attribute to each element, it's conveyed to screen readers like a table.

[**Faking Table Using ARIA**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.ZJQJxX.small.e98ca7a9-ba16-406a-b787-1461b806f7ab.png)](https://codepen.io/accessibility-developer-guide/pen/ZJQJxX){.code}

- `role="grid"` corresponds to `<table>`
- `role="row"` corresponds to `<tr>`
- `role="columnheader"` corresponds to `<th>` (horizontal)
- `role="rowheader"` corresponds to `<th>` (vertical)
- `role="gridcell"` corresponds to `<td>`

This works in NVDA, JAWS, and VoiceOver/iOS, but **not** in TalkBack.

# Overriding display settings

As the table role is explicitly set using ARIA, you're not bound to display the table in a certain way. For example, instead of using `display: table`, `display: table-row`, and `display: table-cell`, you could display it as a Flexbox:

[**Faking Table Using ARIA (Flexbox)**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.rzOrgw.small.a16b5e3b-e7fa-4db1-9e4e-ffdbb82a178f.png)](https://codepen.io/accessibility-developer-guide/pen/rzOrgw){.code}

# The importance of a valid structure

When faking a table using ARIA roles, it's very important that the used structure of elements (and roles) resembles a valid HTML table.

The following example adds another `<div>` container (with the class `.favourites`) around the second and third hobby's `<tr>` elements to style them differently. This breaks the table for some screen readers: In NVDA it's announced as **"table with 2 rows and 3 columns"** (instead of 4 rows), and for the second and third hobby, [table navigation](/examples/tables){.page title="Data and layout tables"} doesn't work anymore.

[**Faking Table Using ARIA And Invalid Structure**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.MvKEwG.small.aac6877c-4d74-4d78-a4d9-0a83ef421313.png)](https://codepen.io/accessibility-developer-guide/pen/MvKEwG){.code}

This shouldn't be surprising too much: in standard HTML, adding a container around `<tr>` elements isn't valid, either! And although the above example is still working in JAWS and VoiceOver/iOS, the following always holds true: the messier the HTML code is, the more problems will occur.

The good news: by adding `role="presentation"` to this additional container, we remove its semantical meaning, and the table is working again also in NVDA!

[**Faking Table Using ARIA And Invalid Structure But Presentation Role**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.xLZXqo.small.fd4ca8ce-98d3-4565-8bd6-5babd29876e3.png)](https://codepen.io/accessibility-developer-guide/pen/xLZXqo){.code}

# Only fake tables if really needed!

While most modern assistive software supports faking tables using ARIA, TalkBack doesn't yet - and a presumably endless list of other/older screen reader and browser combinations.

So please, only fake tables with ARIA if you really have to.

# A better approach: changing a "real" table's visual appearance

Instead of tinkering together a table-like structure using plain old `<div>` elements, we highly advise to change a "real" table's appearance using CSS as explained here: [Changing a table's visual display](/examples/tables/changing-a-tables-visual-display){.page}.

This makes it easier to spot table-like data directly in the DOM, it's backwards compatible - and as such is aligned way better with this: [Our codex about clean and maintainable accessibility](/knowledge/codex){.page}.

# Open questions

TODO: You can use `rowspan` and `colspan`?

TODO: Where are `<thead>`, `<tbody>` and `<tfoot>`?

TODO: Why does NVDA announce table as "editable"?