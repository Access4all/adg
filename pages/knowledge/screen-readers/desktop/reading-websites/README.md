---
navigation_title: "Reading websites"
position: 3
changed: "2020-04-07"
---

# How to read websites using a desktop screen reader

**While mobile screen readers already offer a pretty good idea of how it is to surf the internet as a blind person, they offer way less features (and thus complexity) than desktop ones. So be ready to get a concrete idea of the main strategies available to read a website using a desktop screen reader!**

[[toc]]

## Opening a website

This is done the same way like using a keyboard only. So if you haven't done this yet, go back and read [How to browse websites using a keyboard only](/knowledge/keyboard-only/browsing-websites).

After the page has loaded (indicated by screen readers by announcing the current page's `<title>` element), most blind users always intuitively press `Ctrl + Home` first. This is to work around any autofocus functionality, so the user can be sure that the screen reader starts reading from the very beginning of the document.

## Reading through a document

The standard way to read through a document is to move the screen reader cursor from line to line:

- To navigate from one line of text to the next one, press the `Down` key.
- To navigate to the previous one, press the `Up` key.

Depending on the screen reader, a "line" is around 80 characters and can be compared to a line of text in the multi-column layout of a newspaper. This is to make very long sentences easily digestible for the user: they're simply split into small parts, and the user controls when to move to the next (or previous) part.

In addition to this, the NVDA screen reader allows to read elements fully in one go (e.g. a complete paragraph regardless of its length). For this, simply use `Ctrl + Down` (or `Ctrl + Up`).

**Important:** as opposed to keyboard only users, screen reader users usually do not use the `Tab` key to read a page! If you haven't done this yet, go back and read [Screen readers' browse and focus modes](/knowledge/screen-readers/desktop/browse-focus-modes) to know the difference between navigation using `Arrow` keys and `Tab` key.

### Reading headings

Press `H` to move to headings, or press `1` to `6` to target their specific levels. Add `Shift` to reverse direction.

Use cases:

- To get a broad picture of a page's areas and contents, just navigate through all headings.
- If you know that the login form on a specific page is introduced by the 2nd heading on level 3, simply press 2 times the `3` key.
- If you open a page on Wikipedia and want to read its main content, simply press the `1` key once (because the first `<h1>` is the main content's heading).

If you are really curious and want to learn more about this, skip ahead and read [How to handle headings](/examples/headings/handling).

### Reading links

Press `K` to move to links, or press `V` / `U` to move to visited / unvisited links. Add `Shift` to reverse direction.

Use case: to quickly find links that you haven't visited yet, simply toggle through them by pressing `U`.

### Reading lists

Press `L` key to move to lists, or press `I` to move to list items. Add `Shift` to reverse direction.

Use case: to quickly find the list with the social media "share" links, simply toggle through lists by pressing `L`.

### Reading images

Press `G` key to move to images. Add `Shift` to reverse direction.

Use case: to quickly find the "avatar" image on your StackOverflow's profile page, simply toggle through images by pressing `G` (and hope that the avatar's alternative text is set to something that you recognise as such).

### Reading tables

Press `T` to move to tables, then press `Ctrl + Alt + Left/Right/Up/Down` to navigate their cells (announcing the appropriate column and row headers).

Use case: to compare the price of several products in a table, simply navigate the column "price" by pressing `Ctrl + Alt + Down`.

If you are really curious and want to learn more about this, skip ahead and read [How to handle tables](/examples/tables/handling).

### Reading forms

Press `F` to move to form elements, or press `B` to move to buttons. Add `Shift` to reverse direction.

Use case: to quickly find the login form, simply search for the respective input field by pressing `F`.

If you are really curious and want to learn more about this, skip ahead and read [How to handle forms](/examples/forms/handling).

## Autofocus addendum

In short: don't be worried too much if after a page load the screen reader cursor is somewhere you didn't expect it to be. Simply press `Ctrl + Home` and make your way through the page from the top.

There are two kinds of autofocus, which may prevent that a screen reader starts to read a document from the very beginning.

### Website autofocus

Some websites automatically set the initial focus to a specific element of the page (using `autofocus` attribute or by running some JavaScript):

- This can be helpful, for example on sites like [Google.com](http://www.google.com) where most of the time users want to enter a search term right into the search field.
- But when opening a site for the first time, blind users usually want to read through the whole content (top to bottom) to get a general, exhaustive overview.

### Screen reader autofocus

When leaving a page, some screen readers try to remember the current reading position. When re-visiting the same page, they try to set the focus to the remembered position (but this only happens when the website itself does not have any autofocus functionality):

- This can be useful, for example when re-visiting a text that was not read completely before.
- But it can also be confusing sometimes, for example in a shopping cart when removing an item:
    - After re-display, the removed element is missing, but the screen reader still tries to set the focus where the element had been before, resulting in focusing a seemingly random element.

This functionality dates from a passed internet era. Back then, the internet was mainly a bunch of static websites. Thus, no changes to a page would normally be expected after re-visiting it.
