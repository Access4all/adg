---
layout: layout
title: "How screen readers work - and why they seem so buggy"
---

# How screen readers work - and why they seem so buggy

Sitting on top of another application, screen readers announce the underlying content - often trying to compensate for inadequate presentation of these.

Screen readers always sit on top of another application, conveying its contents aurally to the user.

As many of those applications don't care too much for accessibility and present their content in non-semantical or inadequate ways, screen readers try to compensate for this, and thus often are perceived as being buggy.

# What a screen reader does

A screen reader **reads aloud elements** on a screen:

- It announces the **content** of elements: e.g. a the text inside a heading on a website
- It also announces **semantical info** (or meta info) about elements: e.g. that an element is a **heading** and that it's on the **3rd level** (an `<h3>`)

The screen reader announces elements in a **sequential** (one dimensional) fashion:

- It announces **one element after the other**, following the DOM sequence
- Thus, the screen reader's **reading position always is on one single point** on a screen and moves up- or downwards from there
    - This is **similar to the keyboard focus**, but while the keyboard focus can be moved only between focusable elements (e.g. links and form elements), the **screen reader focus can be moved to any element** on screen
    - The screen reader focus is very **similar to the caret in a text editor**
        - It is capable to move between single characters or words
        - By default though, **it moves between higher level objects** like paragraphs, images, form elements, etc.

The screen reader **starts reading elements from the top** of a screen:

- Element by element, **it reads down to the bottom**
- The **end of the screen is announced**

# Where the provided info comes from

The screen reader always **sits on top of another application**, e.g. a web browser or PDF viewer, providing the elements to be read:

- This other application provides the content and semantical info through the **accessibility API**
- The screen reader connects to this accessibility API and announces the available data to the user in a human friendly way

**Many applications neglect treating the accessibility API responsibly**, which means providing all information through it needed by a screen reader to announce it to its user in meaningful way:

- This can be **missing content**: e.g. graphical info that has not alternative text
- And also **missing semantical info**: e.g. a button that is only conveyed as plain text

Aware of such problems, many screen readers try to **collect additional info** through other channels, e.g. by looking for info directly in a browser's DOM. JAWS, as a rather extreme example, installs its own graphic driver, intercepting graphical info and applying **optical character recognition** (OCR) to it.

This makes clear why the **same website** with the **same screen reader** may **work well in one browser** (e.g. Firefox), while **failing completely in another one** (e.g. Edge).

# The reason why there are so many screen reader bugs

Screen readers sadly seem to be very **prone to regressions**: This means that a feature which worked well in an earlier browser version (e.g. Firefox 42), doesn't work anymore in a subsequent version.

Let's say that for a specific accessibility feature, the browser doesn't provide all necessary info to the accessibility API:

- To work around this problem, the screen reader implements a workaround and gathers the missing data through some other, "unofficial" channel, e.g. through some internal information structure of the browser which isn't meant to be "leaked" by any other application
- If the browser now changes some of this internal information structure in a subsequent version, the screen reader can't find the needed data anymore
- So the formerly working accessibility feature doesn't work anymore - a regression!

This is a **devastating situation**:

- For **screen reader users**, as they are **depending on stable working software**
- For **screen reader manufacturers**, as they have to **deal with the untenable situation of reluctantly maintained accessibility APIs** and they always have to catch up with changes in browsers and other apps (and **usually they're the ones who are blamed** for creating buggy software - how ungrateful!)
- For **web developers** aiming to design accessible websites, as they are using screen readers to **ensure that their creations work** - only to see it break by itself later again

# How can running into screen reader bugs be prevented?

See [Our Codex About Clean and Maintainable Accessibility](/knowledge-about-developing-and-testing-accessible-websites/our-codex-about-clean-and-maintainable-accessibility){.page} for thoughts and guidelines on how to circumvent the biggest dangers.