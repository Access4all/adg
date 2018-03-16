---
layout: layout
title: "Data and layout tables"
---

# Data and layout tables

Tables allow to present complex data in a structured manner. If coded properly, they are fully accessible - even in responsive layouts.

![](_media/1510777680092.png){.image}

Tables have a long history: from layout tables around the 2000's to today's need for responsive tables, there practically are no limits!

# TL;DR - Too Long, Didn't Read

First things first: you need to [learn to browse tables](/code-examples/data-and-layout-tables/how-to-browse-tables){.page title="How to browse tables"} using screen readers! We also present you some [quick tools for examining tables](/code-examples/data-and-layout-tables/quick-tools-for-examining-tables){.page title="Quick tools for examining tables"}.

We begin with demonstrating how screen readers allow to efficiently browse a basic [data table](/code-examples/data-and-layout-tables/general-data-table-example){.page title="General data table example"}! This is followed by a [demonstration about what typically can go wrong](/code-examples/data-and-layout-tables/bad-data-table-examples){.page title="Bad data table examples"} when developers aren't mindful and forget about proper semantics.

We then show that [spanning multiple rows and columns](/code-examples/data-and-layout-tables/spanning-multiple-rows-and-columns){.page title="Spanning multiple rows and columns"} is possible - but a bit tricky to navigate in screen readers, so this should used carefully.

![](_media/1510822941440.png){.image}

We then explain how [a non-table structure can be "faked" to feel like a table](/code-examples/data-and-layout-tables/faking-data-tables-using-aria){.page title="Faking data tables using ARIA"} - using ARIA. The other way round: when [changing a "real" table's display options](/code-examples/data-and-layout-tables/changing-a-tables-visual-display){.page title="Changing a table's visual display"}, its semantics are changed too (but again: ARIA is our rescue). Using this knowledge, we can create perfectly [accessible responsive data tables](/code-examples/data-and-layout-tables/responsive-data-tables){.page title="Responsive data tables"}!

Another often seen requirement is [expanding/collapsing rows in tables](/code-examples/data-and-layout-tables/expandable-table-rows){.page title="Expandable table rows"}, and [hiding parts of a table visually](/code-examples/data-and-layout-tables/hiding-parts-of-a-table-visually){.page title="Hiding parts of a table visually"}. We'll also show how to make [scrollable tables with fixed headers](/code-examples/data-and-layout-tables/scrollable-tables-with-fixed-headers){.page title="Scrollable tables with fixed headers"} and [sortable tables](/code-examples/data-and-layout-tables/sortable-data-tables){.page title="Sortable data tables"}. Needless to say: all of them are fully accessible!

Last (and least): a few words about the (hopefully long gone) [layout tables](/code-examples/data-and-layout-tables/accessible-layout-tables){.page title="Accessible layout tables"} and what you need to pay attention to regarding accessibility. But you don't really use layout tables, do you?!

Finally, the [FAQ](/code-examples/data-and-layout-tables/faq---frequently-asked-questions){.page title="FAQ - frequently asked questions"} gives answers to many more everyday questions.