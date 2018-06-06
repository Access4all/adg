---
navigation_title: "iFrames"
position: 9
changed: "2018-05-15"
---

# External Content in iFrames

**Iframes allow to include any external content into a page. As such, precaution must be taken that external content does not mess up the semantics of your content with improper heading levels and hierarchies.**

In general, screen readers treat content in an iframe like any other content on the page.

In addition, they announce the frame:

- NVDA simply announces "frame".
- JAWS also announces the iframe's `title` attribute, so be sure to always provide a meaningful title to an iframe.

Also, both NVDA and JAWS allow navigating directly to any frame using the `m` key.

TODO: embedded examples do not work!

[Example](_examples/general-iframe-example)

## Headings in iframes

Screen readers integrate headings from iframes directly into the heading outline of the parent page. This means that you have to be very careful that an embedded content's heading does not badly affect your embedding page's heading outline.

The following bad example illustrates what can happen: the embedded content is meant to be part of the heading on level 2 "Dancing", but it defines its own headings on level 1.

[Example](_examples/iframe-embedding-problematic-headings)

The resulting headings outline looks like this to a screen reader:

![Bad heading outline](_media/bad-heading-outline.png)

- `<h1>` Hobbies
    - `<h2>` Playing Soccer
    - `<h2>` Dancing
- `<h1>` Salsa
- `<h1>` Rock'n'Roll
    - `<h2>` Gardening

To fix it, the headings in the embedded content need to be on the correct level relatively to the parent page.

[Example](_examples/iframe-embedding-proper-headings)

Now the resulting headings outline looks correct:

![Correct heading outline](_media/correct-heading-outline.png)

- `<h1>` Hobbies
    - `<h2>` Playing Soccer
    - `<h2>` Dancing
        - `<h3>` Salsa
        - `<h3>` Rock'n'Roll
    - `<h2>` Gardening

### More about accessible heading outlines

The learn more about accessible heading outlines, take a look at page [Heading outlines](/examples/headings) (and specifically at its sub page [HTML 5's headings outline algorithm](/examples/headings/html-5-outline)).

## Other resources

You can find additional information here: [Creating Accessible Frames and Iframes](http://webaim.org/techniques/frames/).

## Additional notes

Are there other possible problems? E.g. a 2nd `<main>` element in embedded content (where the parent already has one)?