---
navigation_title: "Linear processing"
position: 3
changed: "2018-04-13"
---

# Screen readers process contents in a linear way

**Sighted users perceive a webpage as a two-dimensional, graphical area. Meanwhile, screen reader users perceive a page in a one-dimensional (linear) way: one element after the other, from top to bottom. Similar to reading a book, browsing websites in this way is usually considerably slow, as a lot of time is needed to get a proper overview of a full page.**

## Visual perception: two dimensions

A sighted user using a traditional display perceives the full two-dimensional layout of a page. Within fractions of a second, the user perceives the different areas of a page, for example:

- Header (typically on top with a logo)
- Navigation (typically part of the header or on the left side)
- Main content (typically the biggest area of the page, enclosed by the other areas)
- Footer (typically at the bottom)
- Etc.

## Auditive perception: one dimension

Blind users using a screen reader perceive a page in a linear, one-dimensional way. Like a traditional book (or better, an audiobook), a page is read aloud by the screen reader sequentially from top left to bottom right: character by character, word by word, sentence by sentence; or content element by content element.

- This is due to the nature of spoken information: it is presented in a purely linear, sequential fashion, one word after the other.
- A screen reader can focus on one single position in the whole page at a time, similar to the cursor of a text editor.
- The screen reader reads aloud the information fragment on which its cursor currently is placed.
    - Depending on how the user navigates, typically either a full line, a word, or a single character is announced.
    - The position of the cursor can then be moved (typically with the arrow keys) by the user to another information fragment (for example from one line to the next line, or from one word to the next word), each of which then is announced by the screen reader.

This way, users typically make their way through the whole document from the very top to the very bottom - or until they find the information they are looking for. In many cases, this means that screen reader users need a lot more time to browse a webpage than visual users do.

## Observation of content changes

While looking at a page, visual users usually notice any change that may happen to some element. For example, a red container suddenly appears on the top right corner of the screen, containing the warning "Your session will expire in 1 minute, please extend". Visual users will usually notice something like that automatically, regardless what exactly they are looking at.

To screen readers, such a change to the page can potentially only be observed if their focus is placed on the element in question. Changes to any other elements generally are not observed and thus not conveyed to users. In the example above, screen reader users will simply loose their session, without ever knowing that there had been a well-meant warning.

To handle situations like this, there are ways to tell screen readers to observe specific elements for changes; so if you are really curious and want to learn more about this, skip ahead and read [How to implement websites that are ready for screen reader usage](/knowledge/desktop-screen-readers/how-to-implement).