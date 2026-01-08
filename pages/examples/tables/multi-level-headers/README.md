---
navigation_title: 'Multi-level headers'
position: 4
---

# Multi-level headers in a table

**Sometimes a hierarchical data structure should be shown in a table. Let's build a table with diffrent techniques and check which one is simpler to read with a screen reader.**

[[_TOC_]]

## Data structure and the problem

Let's take countries and regions together with the population.

| Region/Country             | Population  |
|----------------------------|-------------|
| Europe                     | 742 million |
| Western Europe             | 200 million |
| Austria                    | 9 million   |
| France                     | 68 million  |
| Switzerland                | 9 million   |
| Central and Eastern Europe | 285 million |
| Czeh Republic              | 11 million  |
| Hungary                    | 10 million  |
| Romania                    | 19 million  |
| America                    | 1.02 billion|
| North America              | 592 million |
| Canada                     | 41 million  |
| Mexico                     | 130 million |
| United States              | 335 million |

There are two challenges in this data structure.
1. Pair regions and countries to each other.
2. Each region has a population information as well as the countries.

## Table with irregular headers

[Example](_examples/table-with-irregular-headers)

[Irregular headers](https://www.w3.org/WAI/tutorials/tables/irregular/) are using `rowspan` attribute on `th` elements to span multiple rows.

The data is better structured visually but there are more columns and empty cells are produced.

The current level is known only because it starts with the column which is the first one in that row when entering a row.

## Table with more headers

[Example](_examples/table-with-more-headers)

[Multi-lelve headers](https://www.w3.org/WAI/tutorials/tables/multi-level/) are using `id` and `headers` attributes on `th` and `td` elements to connect them to each other.

> Additional CSS indentation is used in each region/country cell to visualize the current level.

The table reamins simple, there is no empty cell but it is complex to implement because of many header IDs.

It is similar to follow the current level like in the Irregular headers example. All the connected header cells are mentioned for the first cell of a row when the level is changed (screen readers could be different).

## Table as tree grid

[Example](_examples/table-as-tree-grid)

Tree grid is using `role` treegrid attribute on `table` element and `aria-level` attribute on `tr` elements to enhance table with level information.

> Additional CSS indentation is used in each region/country cell to visualize the current level.

The table reamins simple, there is no empty cell and the implementation is also easy as the level information comes from the data structure.

Level information is mentioned for each row and cell (screen readers could be different).
