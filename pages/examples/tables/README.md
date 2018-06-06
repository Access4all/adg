---
navigation_title: "Tables"
position: 4
changed: "2018-05-02"
---

# Data tables

**Tables allow to present complex data in a structured manner. They have a long history: from layout tables around the 2000's to today's need for responsive tables. Traditional tables are fully accessible, but you still should try to keep them as simple as possible. Even in more advanced use cases, they can be fully accessible - if you know how to do them right.**

TODO

## Additional notes

- Multiple `<th>` in a row not announced anymore: a regression?! <https://github.com/nvaccess/nvda/issues/7731>

---

First things first: you need to [learn how to handle tables](/examples/tables/handling) - using screen readers and other tools.

We begin with demonstrating how screen readers allow to efficiently browse a [basic data table](/examples/tables/good-example). This is followed by a demonstration about [what typically can go wrong regarding tables](/examples/tables/bad-examples) when developers are not mindful and forget about proper semantics.

This is followed by an explanation about how to [use multiple header cells](/examples/tables/spanning-rows-cols) to support distinguishability of table data and improve navigation inside it.

We then show that [spanning multiple rows and columns](/examples/tables/spanning-rows-cols) is possible - but also a bit tricky to navigate in screen readers, so this should used carefully.

One of the most important requests in recent website development are [responsive tables](/examples/tables/responsive), which we show how to implement (with the fundamental help of ARIA).

Another often seen requirement is [sticky and hidden headers](/examples/tables/sticky-headers) in tables, which is especially useful for big tables that need a lot of space.

Finally, we do some crazy experiments with a [table made up of div elements only](/examples/tables/table-of-divs-experiment), that are not meant to be used for productive websites.