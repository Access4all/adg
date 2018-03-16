---
layout: layout
title: "How to read websites using a desktop screen reader"
---

# How to read websites using a desktop screen reader

For a sighted person, it's hard to imagine how a screen reader user surfs the internet. Get a concrete idea of the main strategies available to read a website!

Due to the limiting one-dimensional perception of screen readers (see [Screen readers are one-dimensional](/knowledge-about-developing-and-testing-accessible-websites/introduction-to-desktop-screen-reader-usage/screen-readers-are-one-dimensional){.page}), when browsing a website for the first time, blind users first have to manually get a general idea of its layout by combing through its content from top to bottom.

# First things first: how to work around autofocus

After the page has loaded (indicated by screen readers by announcing the current page's `<title>` attribute), most blind users always intuitively press first `Ctrl + Home`.

This is to make sure that the screen reader reads from the very beginning of the document to work around various kinds of autofocus functionality.

## Website autofocus

Some websites automatically set the focus to a specific element of the page (using `autofocus` attribute or by running some JavaScript):

- This is to reset autofocus functionality of some websites which sets the focus automatically somewhere into the page
- Autofocus may be helpful (e.g. on sites like [Google](http://www.google.com) where most of the time users want to enter a search term right into the search field)
- But when opening a site for the first time, blind users usually want to read through the whole content (top to bottom) to get an overview

## Screen reader autofocus

When leaving a page, some screen readers try to remember the current reading position. When re-visiting the same page, they set the focus to the remembered position:

- This can be useful, e.g. when re-visiting a text that wasn't read completely before
    - Side-note: this only happens when the website itself doesn't have any autofocus functionality
- But it can also be confusing sometimes, e.g. in a shopping cart when removing an item: after re-display, the removed element is missing, but screen readers still try to set the focus where the element had been before, leading to unforeseeable and often confusing behaviour

This functionality dates from a passed internet era:

- Back then, the internet was mainly a bunch of static websites
- Thus, no changes to a page would normally be expected after re-visiting it

Today, in the so called Web 2.0, websites often are very dynamic:

- Thus, pages often change during each re-visit
- Sadly, screen readers didn't adapt to this situation yet
    - For more discussion about this, see NVDA's GitHub issues tracker:
        - [What's the algorithm NVDA uses to decide whether the focus should be placed on the same item after a page refresh?](https://github.com/nvaccess/nvda/issues/4998)
        - [Setting focus to an element: NVDA doesn't announce it, when elements around it are set to aria-hidden!](https://github.com/nvaccess/nvda/issues/5825)

## Autofocus conclusion

For the time being: don't be worried too much if after a page load the screen reader focus is somewhere you didn't expect it to be! Just press `Ctrl + Home` and make your way from there through the page.

If you want to know more about proper focus handling, see [Focus Handling](/code-examples/focus-handling){.page}.

# Reading through a document

The easiest way to read through a document is by reading line by line:

- To navigate from one line to the next, the `Down` key is used
- To navigate from one line to the previous, the `Up` key is used

Important note: As opposed to keyboard-only users, **screen reader users usually don't use the `Tab` key to read a page**! Be sure to read [Screen reader interaction modes](/knowledge-about-developing-and-testing-accessible-websites/introduction-to-desktop-screen-reader-usage/screen-reader-interaction-modes){.page} to know the difference between navigation using `Arrow` keys and `Tab` key.

## Reading headings

As seen in [Accessible heading outlines](/code-examples/accessible-heading-outlines){.page}, an accessible website introduces all of its page areas using headings (`<h1>` to `<h6>`).

**In short:** Press `H` to jump to headings, or press `1` to `6` to jump to headings on specific levels.

Examples:

- To get a broad picture of a page's areas and contents within seconds, just navigate through all headings!
- If you know that the login form on a specific page is introduced by the 2nd heading on level 3, simply press 2 times the `3` key!
- If you open a page on Wikipedia and want to read its main content, simply press the `1` key once (because the first `<h1>` is the main content's heading)!

See [How to browse headings](/code-examples/accessible-heading-outlines/how-to-browse-headings){.page} for more detailed info about reading headings.

## Reading links

**In short:** Press `K` to jump to links, or press `V` / `U` to jump to visited / unvisited links.

Example: To quickly find links that you haven't visited yet, simply toggle through them by pressing `U`!

See [How to browse links and buttons](/code-examples/links-and-buttons/how-to-browse-links-and-buttons){.page} for more detailed info about reading links (and also how to interact with them).

## Reading lists

**In short:** Press `L` key to jump to lists, or press `I` to jump to list items.

Example: To quickly find the list with the social media "share" links, simply toggle through lists by pressing `L`!

TODO: Link to "more detailed info"!

## Reading images

**In short:** Press `G` key to jump to images.

Example: To quickly find the "avatar" image on your StackOverflow's profile page, simply toggle through images by pressing `G` (and hope that the avatar's alternative text is set to something that you recognise as such)!

TODO: Link to "more detailed info"!

## Reading tables

**In short:** Press `T` to jump to tables, or press `Ctrl + Alt + Left/Right/Up/Down` to navigate a table's cells.

Example: To compare the price of several products in a table, simply navigate the column "price" by pressing `Ctrl + Alt + Down`!

See [How to browse tables](/code-examples/data-and-layout-tables/how-to-browse-tables){.page} for more detailed info about reading tables.

## Reading forms

**In short:** Press `F` to jump to form elements, or press `B` to jump to buttons.

Example: To quickly find the login form, simply search for the respective input field by pressing `I`!

See [How to browse forms](/code-examples/forms--validations--and-error-messages/how-to-browse-forms){.page} for more detailed info about reading forms (and also how to interact with them).