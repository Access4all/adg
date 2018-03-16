---
layout: layout
title: "Changing a table's visual display"
position: 6
lead: "When changing a \"real\" table's display settings, you also change how it's announced to the screen reader! This can be fixed with ARIA though."
---

# Changing a table's visual display

# Changing a real table's display settings

In the following example, all elements (`<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`) are set to `display: block`. Because of this, not only the table is visually displayed differently, it also isn't announced as a table anymore to the following screen readers (and thus making it impossible to browse it using table navigation): NVDA, VoiceOver/iOS, and TalkBack. JAWS announces the element still as a table.

[**General Data Table Example With Overridden Display Options**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.NvxvBR.small.f183349f-8ca0-4468-a66d-6980f555c520.png)](https://codepen.io/accessibility-developer-guide/pen/NvxvBR){.code}

# Re-adding table roles

You can re-add the table roles by using ARIA (as described here: [Faking data tables using ARIA](/examples/tables/faking-data-tables-using-aria){.page}). Notice how we have to add `role="presentation"` to both `<thead>` and `<tbody>`, as otherwise they would still be conveyed as `display: block` and wouldn't fit into the table structure (and thus breaking the table to some screen readers).

This works for NVDA and VoiceOver/iOS. Only TalkBack lacks support for this, and we don't know of any way to fix it at the time being.

[**General Data Table Example With Overridden Display Options And ARIA**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.gxPxZp.small.727a281b-703c-4302-9ecf-b4b24efa32a3.png)](https://codepen.io/accessibility-developer-guide/pen/gxPxZp){.code}

# Always use ARIA when messing with tables!

As soon as you're changing CSS' `display` attribute, you're messing with how an element is conveyed to a screen reader. The change can happen explicitly by setting a specific value (e.g. `display: block`), or implicitly by using a non-table element where a table element would be needed (e.g. a `<div>` instead of `<table>`, as discussed [here](/examples/tables/faking-data-tables-using-aria){.page title="Faking data tables using ARIA"}).

So whether you're changing a real table's visual appearance or want to convey a non-table structure as a table to screen readers, always set the appropriate ARIA roles and you are fine!

Keep in mind though that TalkBack doesn't support these ARIA roles. So in our opinion, it's best to try to stick to standard tables wherever possible - and for displaying them differently on small devices, use responsive CSS to alter their `display` values as needed. This way the table keeps working on Android devices with big screens, and only small screens lack table navigation support.