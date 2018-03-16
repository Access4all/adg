---
layout: layout
title: "How to read websites using a desktop screen reader"
navigation_title: "Reading websites"
position: 7
lead: "For a sighted person, it's hard to imagine how a screen reader user surfs the internet. For a web developer with accessibility in mind, it's crucial to have a basic knowledge about this topic. So be ready to get a concrete idea of the main strategies available to read a website using a screen reader!"
---

# How to read websites using a desktop screen reader

Screen readers have a very limited one-dimensional perception of webpages (see [Screen readers are sequential](/part--knowledge-about-accessibility---introduction/chapter--introduction-to-desktop-screen-reader-usage---overview/screen-readers-are-sequential){.page}). So when browsing a website for the first time, blind users first have to manually get a general idea of its layout. They usually achieve that by combing through the content from top to bottom, trying to identify meaningful blocks of information.

# Autofocus workaround

After the page has loaded (indicated by screen readers by announcing the current page's `<title>` attribute), most blind users always intuitively press first `Ctrl + Home`.

This is to work around various kinds of autofocus functionality, so the user can be sure that the screen reader starts reading from the very beginning of the document.

## Website autofocus

Some websites automatically set the initial focus to a specific element of the page (using `autofocus` attribute or by running some JavaScript):

- This can be helpful, for example on sites like [Google](http://www.google.com) where most of the time users want to enter a search term right into the search field.
- But when opening a site for the first time, blind users usually want to read through the whole content (top to bottom) to get a general, exhaustive overview.

## Screen reader autofocus

When leaving a page, some screen readers try to remember the current reading position. When re-visiting the same page, they try to set the focus to the remembered position (but this only happens when the website itself doesn't have any autofocus functionality):

- This can be useful, for example when re-visiting a text that wasn't read completely before.
- But it can also be confusing sometimes, for example in a shopping cart when removing an item:
    - After re-display, the removed element is missing, but the screen reader still tries to set the focus where the element had been before, leading to unforeseeable and often confusing behaviour.

This functionality dates from a passed internet era. Back then, the internet was mainly a bunch of static websites. Thus, no changes to a page would normally be expected after re-visiting it.

Today, in the so called Web 2.0, websites often are very dynamic. Thus, pages often change during each re-visit. Sadly, screen readers didn't adapt to this situation yet.

## Conclusion

For the time being: don't be worried too much if after a page load the screen reader focus is somewhere you didn't expect it to be. Always press `Ctrl + Home` and make your way from there through the page.

# Reading through a document

The easiest way to read through a document is line by line:

- To navigate from one line to the next, the `Down` key is used.
- To navigate from one line to the previous, the `Up` key is used.

Depending on the screen reader, a "line" is around 80 characters and can be compared to a line of text in the multi-column layout of a newspaper. This is to make also very long sentences easily digestible for the user: they're simply split into parts, and the user has controls when to move to the next part (or previous).

Instead of browsing line by line, NVDA screen reader allows to read full blocks (for example, paragraph by paragraph, or any other kind of container). For this, simply use `Ctrl + Down` (or `Ctrl + Up`).

**Important note:** as opposed to keyboard-only users, screen reader users usually don't use the `Tab` key to read a page! Be sure to read [Screen reader interaction modes](/part--knowledge-about-accessibility---introduction/chapter--introduction-to-desktop-screen-reader-usage---overview/screen-reader-interaction-modes){.page} to know the difference between navigation using `Arrow` keys and `Tab` key!

## Reading headings

Press `H` to jump to headings, or press `1` to `6` to jump to headings on specific levels. Add `Shift` to reverse direction.

Use cases:

- To get a broad picture of a page's areas and contents within seconds, just navigate through all headings.
- If you know that the login form on a specific page is introduced by the 2nd heading on level 3, simply press 2 times the `3` key.
- If you open a page on Wikipedia and want to read its main content, simply press the `1` key once (because the first `<h1>` is the main content's heading).

If you are really curious and want to learn more about this, skip ahead and read [How to work with headings](/part--examples-of-accessibility-patterns---introduction/heading-outlines/how-to-work-with-headings){.page}.

## Reading links

Press `K` to jump to links, or press `V` / `U` to jump to visited / unvisited links. Add `Shift` to reverse direction.

Use case: to quickly find links that you haven't visited yet, simply toggle through them by pressing `U`!

## Reading lists

Press `L` key to jump to lists, or press `I` to jump to list items. Add `Shift` to reverse direction.

Use case: to quickly find the list with the social media "share" links, simply toggle through lists by pressing `L`!

## Reading images

Press `G` key to jump to images. Add `Shift` to reverse direction.

Use case: to quickly find the "avatar" image on your StackOverflow's profile page, simply toggle through images by pressing `G` (and hope that the avatar's alternative text is set to something that you recognise as such)!

## Reading tables

Press `T` to jump to tables, then press `Ctrl + Alt + Left/Right/Up/Down` to navigate a its cells.

Use case: to compare the price of several products in a table, simply navigate the column "price" by pressing `Ctrl + Alt + Down`!

If you are really curious and want to learn more about this, skip ahead and read [How to browse tables](/part--examples-of-accessibility-patterns---introduction/data-and-layout-tables/how-to-browse-tables){.page}.

## Reading forms

Press `F` to jump to form elements, or press `B` to jump to buttons. Add `Shift` to reverse direction.

Use case: to quickly find the login form, simply search for the respective input field by pressing `F`!

If you are really curious and want to learn more about this, skip ahead and read [How to browse forms](/part--examples-of-accessibility-patterns---introduction/forms--validations--and-error-messages/how-to-browse-forms){.page}.