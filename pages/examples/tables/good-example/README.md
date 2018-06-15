---
navigation_title: "Good example"
position: 2
changed: "2018-??-??"
---

# General good table example

**Tables are widely used to display tabular data, be it complex or simple. HTML provides for accessibility, so cleanly laid out and marked up tables are already fully accessible all by themselves.**

The following example provides a very basic table: both the first row and first column are made up of header cells (`<th>`), while the respective data columns are made up of data cells (`<td>`). A `<caption>` adds a useful description to the table.

[Example](_examples/generally-good-table)

Navigate the example using table navigation and notice how the screen reader announces the current data cell's corresponding header cells:

- If you navigate horizontally (using `Ctrl + Alt + Left/Right`), in addition to the current cell's content, the screen reader also announces the current column's header cell.
- If you navigate vertically (using `Ctrl + Alt + Left/Right`), the screen reader announces the current row's header cell.

This provides all information needed to browse a table efficiently using a screen reader: you always know the current data cell's context, similar to a visual user. Easy and effective.

## Thead, tbody, tfoot?

It is recommended to use `<thead>` for the table's header, `<tbody>` for its data, and `<tfoot>` for its footer (if applicable, for example when having a final row summing up the presented data). If you do not provide those, the browser will add at least a `<tbody>` itself.