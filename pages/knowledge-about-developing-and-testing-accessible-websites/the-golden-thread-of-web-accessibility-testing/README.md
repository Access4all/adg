---
layout: layout
title: "The Golden Thread of Web-Accessibility Testing"
---

# The Golden Thread of Web-Accessibility Testing



The following document is an **attempt** to describe how we typically proceed when testing websites for common accessibility issues.

We've documented recurring requests by our customers. It is **neither exhaustive nor imperative**, but it will serve you as a **golden thread** when you are in the need of testing a website thoroughly yourself.

Notice: some links still point to internal documents (they will display a 404 on GitHub for you). These documents will soon be moved into this guide.

This is all about testing websites! Add note that testing depends a bit on what type of content needs to be tested (native app vs. web content)! If web content: what OS's and browsers?

# Some general thoughts

  - Proceed from a broad picture of the whole website to a more fine grained view.
      - To get a broad picture, use manual quick testing tools like WAVE, HeadingsMap or WAT
          - There are also some online services that evaluate full websites (e.g. [Tenon.io](http://tenon.io/) and [TAW](http://www.tawdis.net/))
      - To examine specific problems, you will often have to use more specific tools like the Web Developer Toolbar, the DOM Inspector and even a screen reader
  - Get an overview of the whole website:
      - Try to break big websites down into some "typical" page types (e.g. homepage, news page, registration form, shop with articles list and article details...)
      - Is there structured text (e.g. paragraphs, lists, images, tables...)
      - Are there forms, maybe with input validations that trigger error messages?
      - Are there fancy JavaScript widgets (e.g. a dropdown menu or a slide show)?
      - Are there PDF files linked?
      - Is there audio or video?
  - Write down everything of interest that jumps into your eye while testing (URL and steps to reproduce, if necessary), so you have a continuously growing list of possible issues that you can check upon later:
      - Saw a form somewhere?
      - Saw a JavaScript widget?
      - Triggered an error message in a form by accident?
      - Spotted a linked image somewhere?
      - Contrasts of an element look suspicious?
      - Spotted an enumeration which should be marked up as list, but maybe isn't (e.g. a menu bar, a tag cloud, a list of links...)
      - Relies the website on some device dependent user actions (e.g. hovering with a mouse, drag&drop)

  Important to remember: most of the mentioned tools provide a lot more functionality than explained here. Explore those functionalities and find your own favorite workflow! Also keep an eye open for newly released tools.

  Very important to remember: though "quick tools" (and online services) are very helpful, their scope is limited to technical issues, and none of them gives identical results to what screen readers produce. In cases of doubt, check your results back with a screen reader! Rule of thumb: the more custom dynamic features an element provides (typically using JavaScript), the more thorough you need to test it.

# Headings outline

  - Investigate the headings outline of some of the pages, e.g. using [HeadingsMap](https://github.com/Access4all/lufthansa/issues/25)
      - Be sure you have activated the tab "Headings", not "HTML5 Outline", as HTML5 outlines are not supported yet by most assistive technologies!
      - HeadingsMap is not always 100% accurate (it doesn't respect CSS attributes `display:none` and `visibility:hidden`)! Always verify with a screen reader!
  - Often, already the first page shows the typical problems:
      - Heading levels are skipped (which isn't forbidden by WCAG 2.0, but it confuses screen reader users, as they rely on inherently correct heading hierarchies when navigating documents)
      - There are no (or too few) headings, which means that headings are marked up only visually
      - There are empty headings
      - The main content doesn't have its own `h1`
          - In our opinion, it's absolutely legitimate to have more than one `h1` element on a page! SEO guys may disagree, but the introduction of HTML5 outlines tend to undermine their arguments and support ours.
      - Contents that are visually separated from the main content (e.g. navigation, login area, news, teasers, ads, related info, header, footer...) are not introduced by headings
  - Try to determine whether the existing headings outline makes sense
      - Does every sub heading really belong to its parent heading?
      - Is every heading expressive enough?
      - Would it make sense to have more headings? Rule of thumb: the bigger and more complex a page, the more headings it needs.

# WAVE toolbar

  - Use [WAVE](https://github.com/Access4all/lufthansa/issues/19) to investigate common problems on some of the pages very quickly, e.g. missing form labels, missing alternative texts, redundant links, missing document language, empty elements, layout tables...
  - WAVE provides good clues on how to proceed with the test:
      - Missing form labels? It seems forms in general could be a problem!
      - Missing alternative texts? It seems alternative texts in general could be a problem (because missing alternative texts are **never** okay)!
      - Empty elements? Could be that images of texts or symbols were used and no useful alternative texts were provided!
  - The order of the following chapters is only a suggestion. Depending on your results with WAVE, another sequence may make more sense for you!

# Code validity

  - Check the source code of the typical pages using [WAT](https://github.com/Access4all/lufthansa/issues/52)
  - As soon as you found some validation errors, simply tell the website author to use the WAT himself to check and fix the whole website.

# Inspect alternative texts of images

  - Use the [Web developer toolbar](https://github.com/Access4all/lufthansa/issues/17) to display alternative texts for images
  - Typical problems for images' alternative texts are:
      - It's not meaningful for informative images
      - It's not empty for decorative images (`alt=""`)
      - It doesn't describe the link target for linked images
      - The word "Logo" is missing in a website's logo (bad: "Lufthansa", good: "Logo Lufthansa")
      - There is no alternative text (missing `alt` attribute), which makes some screen readers announce the file name (cryptic!)
  - If an image contains a lot of important information (e.g. a statistical diagram), it's better to have the information available redundantly in a more suitable form, e.g. as tabular data or described in words as a paragraph. In this case, the original image's alternative text may be empty or refer to the alternative form (e.g. "Pie diagram, see table XYZ").
  - It's not always possible for testers to decide whether alternative texts are meaningful, or whether an image is decorative or not
  - There's also no general rule on what are the important details on an image to be conveyed to a screen reader (e.g. for a statistical diagram, there may be dozens of values, but only a few of them or even a single one might be of interest)
      - While there's a clear requirement that "all information" is conveyed to a screen reader, it's always due to the website author to estimate what in fact "is" information on a picture, and what is not
  - Make sure that all images that convey important information are implemented in the correct way (e.g. as image and not as CSS background)
      - Activate [Windows High Contrast Mode](https://github.com/Access4all/lufthansa/issues/54) and make sure all important images are still available
  - Images that are redundant to text content must be implemented in a way that doesn't produce redundant screen reader output (e.g. as image with empty alternative text or as CSS background image)
      - Within a link with an icon of a human head and a text "User", the icon is redundant
      - Within a link with only an icon of a human head, the icon is not redundant

# Check content elements

  - Use the ["Contents structured" bookmarklet](https://github.com/Access4all/lufthansa/issues/33) to display information about content elements:
  - Are headings structured as `<h#>` elements?
  - Are texts structured as `<p>` elements?
      - Every paragraph needs its own `<p>`, **don't** separate text inside a single `<p>` using some `<br>` tags!
  - Are `<br>` tags used to visually separate content? That's wrong! Use CSS `margin` for doing this!
      - In fact, the (correct) use of `<br>` tags is very rare! An example would be the separate lines of an address.
      - This is important, because screen readers tend to stop at every `<br>` tag which is annoying when they are used in places they shouldn't be used
  - Are `<b>`, `<i>`, `<strong>` and `<em>` elements used to highlight inline content (or is it only `<span>` elements with some stylings)
      - Notice: most screen readers don't convey these elements in a special way, so this isn't a game breaker
  - Is table like data structured in `<table>` elements?
      - Are table headers marked up as `<th>` elements?
  - Are form inputs grouped by `<fieldset>` and `<legend>` elements?
  - Are enumerations (normal lists, but also link lists, menus, thumbnail lists, etc.) marked up as `<ul>` or `<ol>` elements?
  - Are glossaries marked up as `<dl>` elements?

# Lists

  - A lot of things on a webpage are some sort of a list:
      - A general list, like a shopping list
      - A list of links
      - A dropdown menu with submenus (which is in fact a nested list of links)
      - ...
  - Links that are lists don't always look like lists on the first view (e.g. a dropdown menu), but they have to be marked up as lists (`<ul>` or `<ol>`)
      - Screen readers announce lists like "List with 3 items. Item one Apple. Item two Orange. Item three Mango. End of list."
      - Screen readers offer ways to quickly navigate within lists
  - Lists can easily be nested
  - Elements that introduce some sort of hierarchical context themselves (e.g. headings, or the new HTML5 context containers `<article>` and `<section>`) should **not** be put into lists!

# Tables

  - Make sure that tabular data is marked up as `<table>`
  - Make sure that there are header cells (`<th>`), if possible both horizontal and vertical
  - Make sure that tables are not used for layout purposes (while layout tables are no game breaker, they diminish usability and are generally seen as bad coding style)

# Forms

  Remember: as soon as a screen reader user finds a form, he enters focus mode, which means that he moves through the inputs using the tab key only. **He usually doesn't switch back to browse mode before submitting the form!**

  - Make sure that every input field has a corresponding label (this can be done easily using WAVE)
  - For complex forms (more than only a few fields), make sure the inputs are grouped in a meaningful way using `<fieldset>` / `<legend>` combos (this can be done using ["Contents structured" bookmarklet](https://github.com/Access4all/lufthansa/issues/33))
  - For radio buttons and checkboxes **groups** (e.g. "How did you find us?" or "Sex"), make sure they are grouped using a `<fieldset>` / `<legend>` combo
      - Therefore, it's absolutely okay to place a `<fieldset>` / `<legend>` combo inside another  `<fieldset>` / `<legend>` combo (e.g. a group of radio buttons inside a complex form)
  - Make sure that information that is placed between form elements (e.g. a paragraph holding a disclaimer) is conveyed to the screen reader (developers: `aria-describedby` is your friend!)
  - Make sure that visual information about the fields (e.g. an asterisk to indicate a required field) is also conveyed to the screen reader (developers: HTML5 and ARIA attributes where possible, otherwise use visually hidden texts)

## Input validations and errors

  - Try to input invalid data into fields and submit the form to trigger validation error messages
  - Make sure that the screen reader announces automatically that there has something gone wrong (developers: something like "There have been errors sending the contact form" in the page title can be very useful, but this only works with traditional requests; for AJAX you could do something similar using a [live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions))
  - Make sure that the erroneous inputs can be found quickly:
      - A list of the errors may be displayed above the form (introduced by a heading "Errors")
      - The focus may be set automatically to the first invalid input
  - Make sure that all invalid fields are associated with their specific error messages

  TODO: What about HTML5 browser validations?

# Language

  - Make sure that [there is a valid language set](https://github.com/Access4all/lufthansa/issues/49) for the website
  - If the website offers more than one language, make sure the set language corresponds to the chosen one
  - If the language is not set, immediately request the website author to set it, as screen readers rely on it for being able to choose the correct voice and dialect
      - If needed, most screen readers can also be configured manually to use a specific voice
  - Make sure that parts of the page that are in another language than the document language also set a valid language
      - Only do this for parts that consist of at least a few words (screen readers tend to interrupt the speak flow when changing language, so this tends to diminish the user experience quickly)
      - Don't do this for single technical terms in other languages

# Use of color

  - [Make sure that contrasts are high (`4.5:1` for small and `3:1` for large texts)](https://github.com/Access4all/lufthansa/issues/37)
  - Make sure that no information is conveyed by color alone, e.g.:
      - For a green semaphore (meant to convey a status "available") also have a corresponding text like "available"
      - For a red text (meant to convey an important information) also set it in **bold** or add a prefix like "Important information: ..."

# Keyboard

  - Navigate the website and make sure **every functionality** can be reached and controlled using keyboard only
      - In rare cases, very complex custom controls may not be available for being controlled by keyboard (e.g. drag and drop); in such cases, the functionality must be available through a redundant, keyboard controllable way
      - Some content may be available only for a specific user group, e.g. video games that need a mouse; in such cases, some sort of disclaimer is needed on the webpage
  - [Make sure the keyboard focus is clearly visible](https://github.com/Access4all/lufthansa/issues/48); this must also be the case for vision impaired users, so make sure that at least one of the following is true:
      - Contrast between non-focused and focused elements is high (`3:1`)
      - Focus change not only relies on color, but also on other style attributes (e.g. underline, bold or background color on focus)
  - Make sure there are no keyboard traps (elements that keep the focus)
  - Make sure the focus order is meaningful
  - When the focus disappears, this means that there are focusable elements that are not visible (maybe they have no dimensions or they are moved out of the viewport)
      - In rare cases (e.g. when a button offers a feature specifically for screen readers), a few of these may be ignored
      - Many of them are annoying and should always be complained about because keyboard users may lose orientation
      - Developers: make sure that elements are correctly hidden (CSS `display: none` and `visibility: hidden` hide objects from the DOM, while [moving objects out of the viewport](http://webaim.org/techniques/css/invisiblecontent/) hides them only from the visual layer)
  - Developers: it's good style to always provide the same features to users of every device, is it browser (Firefox, Chrome, Internet Explorer...), device (desktop computer, mobile, tablet...), input device (mouse, keyboard) or assistive technology (screen reader enabled or disabled)
      - Make sure the visual representation always reflects the current state of the website: even while screen reader users are not interested in what's displayed visually on screen, they share the same input method like keyboard-only users, and they definitely want to **see** what's going on
      - It's bad style to try to provide the same feature in different ways for different needs (e.g. a visually hidden link list for screen reader users instead of a fancy dropdown menu), as you'll never know about every setup and equipment of every user, so keep it simple and uniform. This will also make your own life easier, as offering different ways of the same feature almost always quickly leads into a maintenance nightmare!

# Page title

  - Make sure each page has a unique and meaningful title
      - It must contain the website name (typically in the end)
      - It must provide a clear clue about the current page's main content (typically at the beginning)
  - This means that every webpage on a website must have its unique title!
  - Developers: for single page applications you may need to set the title manually whenever appropriate
  - Developers: the page title is the first thing a screen reader announces after a page reload, so you are free to use its power to add things like alert messages to the page title!
  - Developers: it's up to you how you separate the parts of the title (whether you do it with a dash `-`, a pipe `|` or whatever), but be aware that most screenreaders don't read out special chars aloud
  - Good examples: "Welcome to Lufthansa! We are happy to see you here.", "Last minute flights - Lufthansa", "Check In - Lufthansa", "Alert: Your credentials are invalid! - Check In - Lufthansa", "How to check in - Lufthansa"

# Widgets

  - While traditional HTML elements are conveyed pretty clearly by screen readers, everything "custom" typically needs a lot of additional information like:
      - What is this?
      - What can I do with this?
      - What happened right now?
  - Additional information like this can be added e.g. using visually hidden text
  - Also for widgets: try to use meaningful markup!
      - Texts should still be in `<p>` tags!
      - Enumerations should still be lists!
      - Links are not buttons - buttons are buttons! (A link typically sends the user to some other content, is it on the same or another page. A button typically interacts with a website.)
  - Single-Page-Applications: keep your surroundings clean and organized!
      - Set the focus correctly
      - Update the page title (even if it's not announced by the screen reader without page refresh, but a user may leave the computer and come back to see where he left of by reading the page's title)
      - Make sure that the headings outline of the **full page** always is meaningful
  - Developers: always double check when choosing some 3rd party library whether it is accessible (**don't trust assertions, check it yourself**)!
  - Developers: try to stick traditional solutions whenever possible (e.g. a traditional `<select>` instead of this fancy graphical dropdown widget)
      - If for some reasons this isn't possible (e.g. design requirements), it can be useful to have a visually hidden traditional element and a graphical layer "above" it which both reflect each other's states (so the screen reader user can interact with the traditional element, while the mouse user gets the delight of using this other fancy mega super duper JavaScript thingie which is proven to be soooo much more awesome!)
  - Developers: while there are cool new accessibility features provided in the [Accessible Rich Internet Applications Spec (ARIA)](http://www.w3.org/WAI/intro/aria.php), be careful using them!
      - For example, if you want to provide a dropdown menu bar, you could implement it as ARIA role [menubar](http://www.w3.org/WAI/GL/wiki/Using_ARIA_menus), so the screen reader tells the user that this is a menubar. This is nice, but it forces you to implement **all** functionality that a menubar of a traditional native OS menubar offers, e.g. using arrows to navigate it! On the other side, you can simply provide a classic dropdown menu that only offers the possibility to be opened and closed using the Enter key, while the default of moving the focus using the Tab key is fine (a good example is the [Twitter Bootstrap Navbar](http://getbootstrap.com/examples/navbar/)). So don't make your life more complicated than it has to be (you will also have a higher acceptance rate this way, as less sophisticated assistive technologies (e.g. mobile screen readers) may not have yet implemented the mentioned ARIA features widely!

# What else?

  - Make sure that redundant content (that doesn't convey any additional relevant information to screen readers) is hidden:
      - For example, if a Google Map is presented only to show an address visually (and the address itself is available in plain text, too), the map should be hidden (as Google Maps is an accessibility nightmare, anyway)
      - If a complex JavaScript widget has an easy to use alternative for screen readers (which of course offers the same functionalities), hide the complex one!
      - **Important:** don't think you can simply decide that some content is "not relevant to screen readers" (and thus hide it from them), only because it's not accessible! In most cases, every information on a website is important for every user, regardless of the technology used.
  - Make sure that moving and blinking stuff (advertisements, slideshows, etc.) can be stopped manually (pause button), or stop it automatically after 5 seconds

# Audio

  - For all audio, make sure that a text equivalent is provided (e.g. a transcript)

# Video

  - For all video, make sure that a machine readable text equivalent is provided (e.g. subtitles or even audio descriptions, where applicable)

# Screen reader test

  - Make sure that you always know where you are
  - Make sure you always know what you can do now
  - Make sure that outputs are not excessively redundant
  - Make sure that an action (e.g. pressing a button) always results in some sort of feedback (e.g. the focus is set to another element, so the screen reader reads the element, or some special text like "User deleted")

  **Notice:** While a blind person can't find every issue on a page (e.g. issues with colors), a sighted person using a screen reader also can't find every issue himself! Only when sharing your issues and even browse a website together you are able to find everything of interest!

  **Developers:** Use screen readers on a regular basis! It will force you to write clean code and search for simple, pragmatic solutions, which is always a good thing. Use [NVDA](http://www.nvaccess.org/) regularly (coupled very tightly to the specs) and check back with [JAWS](http://www.freedomscientific.com/Products/Blindness/JAWS) from time to time (rather loosely coupled to the specs, e.g. it makes a lot of assumptions).

# More helpful tools and resources

  - [«Access for all» Accessibility Checklist](http://www.accessibility-checklist.ch/)
  - [«Access for all» Accessibility Developer Guide](http://developer-guide.access4all.ch/)
  - [W3 Web Accessibility Evaluation Tools List](http://www.w3.org/WAI/ER/tools/)