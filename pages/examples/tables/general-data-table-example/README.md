---
layout: layout
title: "General data table example"
navigation_title: "General data table example"
position: 2
lead: "Tables are widely used to display tabular data, and HTML provides everything you need to make them accessible to assistive devices."
---

# General data table example

The following example provides a very basic table.

Navigate it using table navigation and notice how the screen reader always announces the corresponding data cell's header cell(s):

- If you navigate horizontally (using `Ctrl + Alt + Left/Right`), in addition to the current cell's content, the screen reader also announces the current column's header cell(s)
- If you navigate vertically (using `Ctrl + Alt + Left/Right`), the screen reader announces the current row's header cell(s)

This provides all information needed to browse a table efficiently using a screen reader - easy and effective!

@code(/examples/tables/general-data-table-example/_examples/general-data-table-example/){.code}