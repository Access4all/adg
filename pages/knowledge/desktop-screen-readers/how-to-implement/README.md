---
layout: layout
title: "How to implement websites that are ready for screen reader usage"
navigation_title: "How to implement"
position: 10
lead: "If a website is optimised already for use with a keyboard only, it will also work in many respects with a screen reader. Still, some close attention needs to be paid, especially regarding semantics and custom interactivity."
changed: "2018-04-13"
---

# How to implement websites that are ready for screen reader usage

**If a website is optimised already for use with a keyboard only, it will also work in many respects with a screen reader. Still, some close attention needs to be paid, especially regarding semantics and custom interactivity.**

## Some words about ARIA

While most requirements for screen readers can be fulfilled best with traditional HTML (and maybe some JavaScript), the usage of ARIA sometimes is necessary and a big help. So if you haven't done this yet, go back and read [ARIA - when HTML simply isn't enough](/knowledge/aria){.page}.

## Keyboard optimisation is half the rent

Screen readers are usually controlled with just a keyboard. Thus, everything that improves keyboard interaction, usually improves screen reader interaction as well.

If you haven't done so yet, go back and read [How to implement websites that are ready for keyboard only usage](/knowledge/keyboard-only/how-to-implement){.page}.

## Even more semantics

Regarding screen readers, semantics are particularly important for providing meaning. If you haven't done so yet, go back and read [Semantics and their importance for accessibility](/knowledge/semantics){.page}.

## Giving proper feedback

A screen reader's cursor is always placed on one single element of a page. In contrast to visual perception (that makes it possible to register changes on a two-dimensional computer monitor), the screen reader only ever registers changes regarding this single element it is placed on. If you haven't done so yet, go back and read [Screen readers process contents in a linear way](/knowledge/desktop-screen-readers/linear-processing){.page}.

So if you change some content on your website, you have to take care that the screen reader will to take notice of it.

### Using ARIA live region

One method is to use an ARIA live region. But this may interfere with the current output. If you are really curious and want to learn more about this, skip ahead and read [Live Regions And Alerts](/examples/live-regions-and-alerts){.page}.

### Moving focus

If the focus is set to an element, the screen reader announces it. This can be an easy way to inform users about something on the page: simply set the focus on it. Be sure though that this doesn't result in disorientation for the screen reader user: it shouldn't happen "out of the blue", but only when the screen reader user has done some interaction that caused the page change.

And by the way, you should not set the focus on a big container of information, as it would cause the screen reader announce all of its content in one go. This usually is way too much for the user to handle. Instead, set the focus on the first content element, for example the close button of a dialog: after its announcement, the screen reader stops, and the user can decide when to continue to read. And last but not least: be sure to give this focused element a proper, self-speaking label (for example "Close terms and conditions dialog").

### Modifying currently focused element

When the screen reader's focus is placed on an element, and suddenly this element is modified in some way, in certain cases the screen reader notices the modification and announces it to the user.

This works best for form controls, for example text inputs: if it is focused, and its value is changed using JavaScript, screen readers announce the new value. This can be very useful, for example when implementing an autocomplete: when users toggle through the suggestions with the arrow keys, the currently selected value is set to the input field and is directly announced. If you are really curious and want to learn more about this, skip ahead and read [Autocomplete widgets (a.k.a. auto-suggest, look-ahead, type-ahead)](/examples/widgets/autocomplete-widgets-a-k-a-auto-suggest-look-ahead-type-ahead-){.page}.

Sadly, for non-interactive elements, this doesn't seem to work reliably. So for example, if a link is focused by the screen reader, it doesn't notice modifications to its attributes (like `aria-label` or `title`), and also replacing its content isn't noticed.

## Adding descriptive text

If a page's content structure is unintuitive, or its interactive elements (widgets) are hard to understand, it sometimes can be helpful to add a visually hidden descriptive text for screen reader users. If you are really curious and want to learn more about this, skip ahead and read [Hiding elements visually by moving them off-screen](/examples/hiding-elements/visually){.page}.

In general though, this often is a sign for bad interaction design: if it needs to be doubted that some users will understand what is going on on your page, you should think about optimising your page in general. We have seen very complex functionality that is very easy to control for all users. If you are really curious and want to learn more about this, skip ahead and read [Widgets simply working for all](/knowledge/semantics/widgets){.page}.

## Using screen reader as reference

While developing, you need to use your screen readers on a regular basis to ensure your product is accessible.

We advise you to use NVDA for this. So if you haven't done this yet, go back and read [NVDA installation and configuration](/setup/screen-readers/nvda){.page}.

Every now and then, don't forget to counter-check using JAWS though. So if you haven't done this yet, go back and read [JAWS installation and configuration](/setup/screen-readers/jaws){.page}.

## Conclusion

Optimising a website for screen reader usage needs a lot of awareness of the typical pitfalls. Providing proper semantics helps truly a lot already, but the full deal requires some additional developer skills from you.

All of the code examples in our guide are fully accessible and can provide you a lot of inspiration. If you are really curious and want to learn more about this, skip ahead and read [Examples of accessibility patterns](/examples){.page}.