---
layout: layout
title: "Forms in tables"
---

# Forms in tables

TODO

Sometimes it's necessary to have form inputs within tables. Be sure to mark up both table and inputs properly.

# Form within a table

No labels, `<th>` aren't associated in IE!

[**Form Inputs Mixed Into Table With Missing Labels**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.BwyKmj.small.566e92c5-3c79-40df-a53b-9c24700b3a70.png)](https://codepen.io/accessibility-developer-guide/pen/BwyKmj){.code}

# With Aria

Better, but wordy output by JAWS (press XY to read descriptive text)

[**Form Inputs Mixed Into Table With Aria**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.xXbVWy.small.a59309a2-6e3c-4fc8-b6f1-4d399faa203b.png)](https://codepen.io/accessibility-developer-guide/pen/xXbVWy){.code}

Also, WAVE doesn't like it!

# With real labels

Sort of redundant... but okay. And WAVE loves it!

[**Form Inputs Mixed Into Table With Labels**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.KXwzjZ.small.a751ed89-a53d-4343-a027-5aef8e1f993e.png)](https://codepen.io/accessibility-developer-guide/pen/KXwzjZ){.code}

# Form looking like a table

The following example uses `<fieldset>`/`<legend>` combinations