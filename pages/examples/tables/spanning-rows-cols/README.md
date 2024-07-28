---
navigation_title: 'Spanning rows & cols'
position: 5
---

# Spanning multiple rows and columns

**Spanning rows and columns is a standard HTML feature and exists for decades already. Be sure not to overuse them though, as they can be tricky for screen readers, especially in complex data tables. And in general: keep your tables simple.**

[[_TOC_]]

Take a look at the following data table example showing a week schedule. It groups work days and leisure days together using `colspan`. Also, while most data cells span exactly one row, a single one ("Dancing") spans two rows using `rowspan`.

To associate data cells with more than one row or column header, we use `id` and `headers` attributes. See [WCAG technique H43](https://www.w3.org/WAI/WCAG22/Techniques/html/H43.html).

[Example](_examples/table-spanning-multiple-rows-and-columns)

Due to limited screen reader support for more complex scenarios, it is generally recommended to be very careful with spanning table cells. See examples and test results in [Adrian Roselli's post](https://adrianroselli.com/2023/02/avoid-spanning-table-headers.html).
