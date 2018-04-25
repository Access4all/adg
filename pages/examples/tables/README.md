---
layout: layout
title: "Data tables"
navigation_title: "Tables"
position: 4
lead: "Tables allow to present complex data in a structured manner. They have a long history: from layout tables around the 2000's to today's need for responsive tables. Traditional tables are fully accessible, but you still should try to keep them as simple as possible. Even in more advanced use cases, they can be fully accessible - if you know how to do them right."
changed: "2018-04-14"
---

# Data tables

**Tables allow to present complex data in a structured manner. They have a long history: from layout tables around the 2000's to today's need for responsive tables. Traditional tables are fully accessible, but you still should try to keep them as simple as possible. Even in more advanced use cases, they can be fully accessible - if you know how to do them right.**

First things first: you need to [learn how to handle tables](/examples/tables/handling){.page title="How to handle tables"} - using screen readers and other tools.

We begin with demonstrating how screen readers allow to efficiently browse a [basic data table](/examples/tables/good-example){.page title="General good table example"}. This is followed by a demonstration about [what typically can go wrong regarding tables](/examples/tables/bad-examples){.page title="General bad table examples"} when developers are not mindful and forget about proper semantics.

This is followed by an explanation about how to [use multiple header cells](/examples/tables/spanning-rows-cols){.page title="Spanning multiple rows and columns"} to support distinguishability of table data and improve navigation inside it.

We then show that [spanning multiple rows and columns](/examples/tables/spanning-rows-cols){.page title="Spanning multiple rows and columns"} is possible - but also a bit tricky to navigate in screen readers, so this should used carefully.

One of the most important requests in recent website development are [responsive tables](/examples/tables/responsive){.page title="Accessible responsive tables"}, which we show how to implement (with the fundamental help of ARIA).

Another often seen requirement is [sticky and hidden headers](/examples/tables/sticky-headers){.page title="Tables with fixed or hidden headers"} in tables, which is especially useful for big tables that need a lot of space.

Finally, we do some crazy experiments with a [table made up of div elements only](/examples/tables/table-of-divs-experiment){.page title="The "table of divs" experiment"}, that are not meant to be used for productive websites.