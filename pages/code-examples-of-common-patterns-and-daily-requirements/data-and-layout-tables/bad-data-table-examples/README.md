---
layout: layout
title: "Bad data table examples"
position: 3
lead: "Data tables lacking header cells are very hard to read by screen reader users."
---

# Bad data table examples

# A table without header cells

The table in the following example doesn't offer any real header cells (`<th>` elements); instead, only data cells are used (`<td>` elements). Those cells that are meant to be headers are only styled visually using CSS `font-weight: bold`, attached to a `.th` class.

[**Bad Data Table Example Without Header Cells**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.brVvaP.small.086f7feb-5a51-4202-ad29-4b9cc7f377fb.png)](https://codepen.io/accessibility-developer-guide/pen/brVvaP){.code}

This makes it very hard for screen reader users to keep orientation, as they don't know in which column (Name? Description? Additional Resources?) and row (Playing Soccer? Dancing? Gardening?) they are. It's especially hard in the column "Additional Resources", where the cell's content doesn't offer any hint on what the Wikipedia link is about.

And while this is a very small table, you may imagine how hard it will be to browse a complex table with lots of columns and rows with e.g. numerical data in it.

# A table with only horizontal header cells

The table in the following example indeed has a header cell for each column (the top row), but the data rows don't have a one.

This makes it hard to identify the current data row when navigating the table vertically.

[**Bad Data Table Example With Only Horizontal Header Cells**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.MvaVzj.small.65e1439d-da20-4b92-a03f-9eadf8ec4608.png)](https://codepen.io/accessibility-developer-guide/pen/MvaVzj){.code}

## Possible solution: adding a unique identifier column as header cell

Sometimes a data table doesn't offer a column that identifies the current row (so it can be used as the `<th>` element).

For example, when having a huge database of addresses, chances are high that you have multiple records with very similar data, as demonstrated in the following example: here you have many John Does residing on similar addresses.

[**Bad Data Table Example With No Header Cells And Ambiguous Data**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.xLwjwj.small.1e48d2a1-f509-4bab-ade5-b23cc0a580d2.png)](https://codepen.io/accessibility-developer-guide/pen/xLwjwj){.code}

In such a case, you should try to introduce an additional unique column, like a record ID.

[**Data Table Example With Ambiguous Data And Added IDs**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.ayvGpK.small.d694d987-560e-4988-86a1-73fae1581ad3.png)](https://codepen.io/accessibility-developer-guide/pen/ayvGpK){.code}

## Possible solution: using multiple cells as header cells

TODO: Eigentlich schade dass dieser gute Tipp unter "Bad forms example" drin ist. Besser verschieben nach "General forms example"?

If there's really no identifying column (and you can't introduce one), you can mark more than a single data cell as header cell, and then the combination of the cells is announced by the screen reader, identifying the current row as good as possible.

[**Data Table Example With Ambiguous Data And Multiple Header Cells**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.jLbxwB.small.afb208ad-1688-462d-a23b-7d85d0be3d1c.png)](https://codepen.io/accessibility-developer-guide/pen/jLbxwB){.code}

As you see in the example above, the combinations of first and last names still aren't unique. So you could add even more cells as header cells...

But please don't overdo this! Usually if you need more than two or maybe three header cells for a row, you should think about deciding not to have a header cell at all. This is better than having all of the cells marked up as header cells!