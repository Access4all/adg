---
layout: layout
title: "Spanning multiple rows and columns"
navigation_title: "Spanning multiple rows and columns"
position: 4
lead: "While `rowspan` and `colspan` are standard HTML attributes, they can be a bit tricky for screen readers. Be sure not to overuse them!"
---

# Spanning multiple rows and columns

Take a look at the following data table example showing a week schedule.

It groups work days and leisure days together using `colspan`. Also, while most data cells span exactly one row, one (Dancing) spans two rows using `rowspan`.

Navigate the table using a screen reader using table navigation (explained [here](/examples/headings/html5s-headings-outline-algorithm){.page title="HTML5's headings outline algorithm"}). Do you note any possible problems?

@code(/examples/tables/spanning-multiple-rows-and-columns/_examples/data-table-spanning-multiple-rows-and-columns-example/){.code}

While the very most of the table is announced very well by the screen reader, as soon as cells span multiple rows or columns, it's getting a bit tricky (if not to say: confusing).

# Tricky screen reader navigation

The first thing to note is that NVDA doesn't announce when a cell spans multiple rows or columns! For example, the header cell **"Work Days"** (which spans 5 columns) is simply announced as **"column 2 Work Days"**, and the next cell **"Leisure Days"** (which spans 2 columns) is announced as **"column 7 Leisure Days"**. Did you notice the jump from 2 to 7? You have to be a pretty focused user to realise this.

The same holds true when navigating vertically. For example, when navigating from **"Saturday"** down to **"Dancing"**, there's not hint by the screen reader that **"Dancing"** spans both **"9:00"** and **"10:00"**, it only announces **"9:00 row 3 Dancing"**. As there's no subsequent row (which would be announced as **"row 5"**, again with a jump from 3 to 5), not even focused users have the chance to realise by accident that **"Dancing"** spans 2 rows.

And one last thing to note: finding the cell **"Chillout"** isn't that easy using a screen reader! If you're on the last row (**"10:00"**) and navigating from **"Computer Science"** rightwards to **"Dancing"** and then again to the right, then you will end on **"Sleeping"** which in fact is one row above! Sure, the screen reader announced the jump from row 4 to row 3 when coming to **"Dancing"**, but still you have to be very focused to realise. So in fact, you only are able to reach **"Chillout"** by navigating down from **"Sleeping"**.

# What does this mean for developers?

In our opinion, this all clearly are shortcomings of screen readers, as the HTML code is perfectly clean and unambiguous - and tables are a feature that exists for decades already! Still, we advise not to overuse `rowspan` and `colspan` and to keep data tables simple - all users will thank you for this.