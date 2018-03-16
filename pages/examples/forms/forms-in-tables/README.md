---
layout: layout
title: "Forms in tables"
navigation_title: "Forms in tables"
position: 11
lead: "TODO"
---

# Forms in tables

Sometimes it's necessary to have form inputs within tables. Be sure to mark up both table and inputs properly.

# Form within a table

No labels, `<th>` aren't associated in IE!

@code(/pages/examples/forms/forms-in-tables/_examples/form-inputs-mixed-into-table-with-missing-labels/){.code}

# With Aria

Better, but wordy output by JAWS (press XY to read descriptive text)

@code(/pages/examples/forms/forms-in-tables/_examples/form-inputs-mixed-into-table-with-aria/){.code}

Also, WAVE doesn't like it!

# With real labels

Sort of redundant... but okay. And WAVE loves it!

@code(/pages/examples/forms/forms-in-tables/_examples/form-inputs-mixed-into-table-with-labels/){.code}

# Form looking like a table

The following example uses `<fieldset>`/`<legend>` combinations