---
navigation_title: "Layout changes"
position: 6
changed: "2018-04-16"
---

# Changing a table's visual layout

**Sometimes it is necessary to style tables visually in a way that standard tables are not capable of. For example, with some CSS, it is possible to stack all cells of a table vertically on top of each other. This provides a lot of new ways of styling a table. But as this potentially also changes its semantics, ARIA must be used to ensure accessibility.**

## Table layout - not layout table

First things first: we are not talking about layout tables here. We really do hope nobody is using tables for layout purposes anymore (although screen readers can handle them quite well).

In this article, we are talking about changing the visual appearance of a table while retaining its semantics (if you haven't done this yet, go back and read [Semantics and their importance for accessibility](/knowledge/semantics)).

## Changing the display property

To alter a table's visual appearance, the `display` property needs to be changed. Take a look at the following example, where the table's cells are stacked on top of each other.

[Example](_examples/table-with-block-elements)

This happens because all elements all are set to `display: block` now. So far, so good.

What may really be surprising: although the element is a perfectly valid HTML structure of a table, it is not announced as a table anymore by many screen readers. Thus, it is impossible to use table navigation or similar ways to browse the table, which is critically reducing its accessibility.

What happened?

## Lost semantics due to display changes

The `display` property is one of the few CSS properties that have an impact on accessibility. If it is changed, it can have an impact on the semantical information of an element.

By default, the following `display` properties are set to a basic table:

- `table` for `<table>`
- `table-header-group` for `<thead>`
- `table-row` for `<tr>`
- `table-cell` for `<th>` and `<td>`

In our example, we changed these values from their defaults to `display: block`. Alas, the inherent semantics are lost and the element is not recognised as a table anymore by screen readers. What a bummer.

## Re-applying proper semantics using ARIA

Fortunately, the lost semantics can be re-applied using ARIA (if you haven't done this yet, go back and read [ARIA - when HTML simply is not enough](/knowledge/aria)).

This is done by adding a `role` attribute with the appropriate value to each element:

- `role="table"` corresponds to `<table>`
- `role="row"` corresponds to `<tr>`
- `role="rowgroup"` corresponds to `<thead>`, `<tbody>` & `<tfoot>`
- `role="columnheader"` corresponds to `<th>` (horizontal)
- `role="rowheader"` corresponds to `<th>` (vertical)
- `role="cell"` corresponds to `<td>`

Now the table will be recognised properly again by screen readers.

[Example](_examples/table-with-block-elements-fixed-with-aria)

## Conclusion

Whenever you are messing with an element's layout, always remember to re-apply the potentially changed semantics using ARIA.

In general: fiddling around with a table's visual attributes is especially finicky. Be sure to take nothing for granted and always validate your work thoroughly for accessibility.
