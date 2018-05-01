---
layout: layout
title: "Forms within tables"
navigation_title: "In tables"
position: 10
lead: "Sometimes it is necessary to have form controls within tables. And while tables provide their own labelling mechanism, it is important that each and every control still has its dedicated label."
changed: "2018-05-01"
---

# Forms within tables

**Sometimes it is necessary to have form controls within tables. And while tables provide their own labelling mechanism, it is important that each and every control still has its dedicated label.**

Forms in tables are rather rare, but they can be a necessity. Be sure though you are using tables not simply for layout purposes - the days of layout tables are long gone. Forms in tables only make sense if they are handling data that has a tabular structure itself.

First it is important that the table itself is marked up properly using table headers `<th>` (if you haven't done this yet, go back and read [General good table example](/examples/tables/good-example){.page}). This allows navigating the table (and the contained form controls) using screen readers' table navigation: simply press `Ctrl + Alt + Up/Down/Left/Right` when inside a table.

But what about navigation in focus mode (using the `Tab` key)?

# Table headers instead of labels?

As we know from from [General good form example](/examples/forms/good-example){.page}, each and every form control ought to have its own label.

But when placing form controls into a table, one could argue that proper table headers should be a suitable substitute for "real" labels. Technically speaking, this sounds reasonable.

So take a look at the following example and try to navigate it using the `Tab` key:

@example[Form controls without labels in a table](form-controls-without-labels-in-a-table){.example}

Firefox announces both the table's column and row headers like a charm in focus mode. For example, when focusing the "insurance" checkbox in the row "DHL":

> Insurance. DHL. checkbox not checked.

But Internet Explorer does only announce the row headers:

> DHL. checkbox not checked.

What a bummer.

# No, real labels!

We can fix this by simply adding real `<label>` elements for each form control, then hide them visually (see [Hiding elements visually by moving them off-screen](/examples/hiding-elements/visually){.page}).

@example[Form controls with labels in a table](form-controls-with-labels-in-a-table){.example}

This makes the whole thing work in both Firefox and Internet Explorer, at least more or less: JAWS seems to have some troubles announcing the row headers in focus mode. But all in all, it is acceptable.

# Optional: alternative using ARIA?

As we know from [Placing non-interactive content between form controls](/examples/forms/non-interactive-content){.page}, elements can be associated to a form control by using `aria-describedby`. So instead of using real `<label>` elements, we could try to associate the table headers with the form controls.

@example[Form controls without labels in a table, fixed with ARIA](form-controls-without-labels-in-a-table-fixed-with-aria){.example}

But like in the very first example, JAWS seems to only announce the column headers. Also, this clearly violates our rule that each and every input needs its dedicated label.

So we can barely call this a real improvement, and we recommend to just use plain labels (without any ARIA).