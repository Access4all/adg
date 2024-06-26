---
navigation_title: 'Responsive'
position: 7
---

# Responsive tables

**The introduction of smartphones increasingly led web designers to avoid traditional "bulky" HTML tables - because these would exceed the limited screen dimensions. Others tried to find ways to change the layout of tables so they would not need so much horizontal space anymore. Responsive tables were born. But to make them accessible, the use of some ARIA is essential.**

[[_TOC_]]

## Tables - a relic of days gone by?

Tables exist since the very early days of the internet. In and by themselves, their layout is meant to have a lot of horizontal space available.

Since portable devices like smartphones have become increasingly popular, screens have tended to become smaller and smaller. Alas, the use of traditional tables tends to be avoided by many modern websites (to prevent the need of horizontal scrolling).

On the other side, there have also been attempts to change the layout of traditional tables so they would fit these new requirements. Sadly, most of these attempts left accessibility behind. So we show you to change a table's visual appearance while keeping accessibility intact.

## Allow scrolling

The safest baseline approach to make a responsive table is to not change its layout and add a scroll container.

[Example](_examples/table-with-scroll-container)

See details about this approach in [Adrian Roselli's post](https://adrianroselli.com/2020/11/under-engineered-responsive-tables.html).

## Changing the visual layout

But sometimes, the visual layout of a table needs to be changed completely to fit small screens.

As we already know: to alter a table's visual appearance, the `display` property can be changed, and some ARIA needs to be added (if you haven't done this yet, go back and read [Changing a table's visual layout](/examples/tables/layout-changes)). Take a look at the following example of a responsive table: when resizing the browser, you will see all elements stack on top of each other.

[Example](_examples/table-with-block-elements-in-narrow-view)

As the table is enhanced using ARIA, this generally works for screen reader users.

### Optimisation for visual users

Visually though, our table is not fully appealing yet, because in narrow view, the table headers' position on top of the table feels wrong.

![Strange position of table headers](_media/strange-position-of-table-headers.png)

#### Hiding table headers visually

In a first attempt, we can hide them visually in narrow view (if you haven't done this yet, go back and read [Hiding elements visually by moving them off-screen](/examples/hiding-elements/visually)). This way, they keep working for screen readers.

[Example](_examples/table-with-visually-hidden-headers-in-narrow-view)

#### Adding visual table header per element

It would be even more beautiful if the table headers could be displayed visually next to each table cell. For this, we have to add them in each cell, but display them only in narrow view.

But this is redundant information for screen readers, so we use `aria-hidden="true"`, trying to hide those additional table headers again.

[Example](_examples/table-with-added-headers-in-narrow-view)

### Final result

There we are: here you have an accessible responsive table.

![Responsive table](_media/responsive-table.png)

Admittedly, this has become a bit complex now. If you are using any kind of template engine, the additional markup can be generated automatically at least.

This solution will generally deliver a good experience to all kinds of users. But please keep in mind that the safest approach is still the one with a scroll container (see [first example](#allow-scrolling)).
