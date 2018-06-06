---
navigation_title: "Screen Reader Flaws"
position: 13
changed: "2017-11-27"
---

# Screen Reader Flaws

**TODO**

Screen readers sometimes have strange opinions on how they behave, even when browsing very traditional standardized HTML. This is a collection of oddities that we ran into.

- **JAWS sometimes doesn't respect aria-hidden in Firefox** - TODO
  - **JAWS doesn't announce table headers associated using `headers` attribute when entering a row** - TODO
  - **JAWS doesn't associate labels and inputs correctly when a colon is used in the ID**
  - **JAWS messes things up when using role="form" in a form!** (So herausgefunden zusammen mit Nespresso)
  - **#{link_to 'JAWS and NVDA remember reading position when re-visiting a page', example_path('remember_position_when_revisiting_page_example')}** - a well-meant feature that feels like a bug (and behaves terribly in certain situations)

## Additional notes

### `<form role="form">
JAWS sagt Legend nicht mehr an! Auch weiteres komisches Verhalten (u.a. Doppelausgaben der Legend statt eines Labels, siehe Mail C5E2BA78-98D9-4D2D-A210-2B9D3F49C0C2@access-for-all.ch).

[Example](_examples/najyzr)