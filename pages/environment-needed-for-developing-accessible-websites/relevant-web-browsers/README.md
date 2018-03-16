---
layout: layout
title: "Relevant Web Browsers"
---

# Relevant Web Browsers

You need several browsers to test accessibility.
Thankfully, you should know all of them quite well already.

# Which browser to use?

  - Screenreaders access the accessibility layer of the currently active application
  - Browsers render a website and offer information through the accessibility layer
  - The same way websites don't look 100% identical in different browsers, their accessibility layers aren't identical
  - It's important to make sure your website works on the most typical combinations of screenreaders and browsers, which are: 
      - JAWS on Internet Explorer
      - JAWS on Firefox
      - NVDA on Firefox
  - A good reason for testing with NVDA on Firefox is their better standard conformity
  - For both screenreaders and browsers, we always use the most current stable versions
  - Regarding screenreader usage, [Edge](http://windows.microsoft.com/en-US/windows-10/getstarted-get-to-know-microsoft-edge) is **not** relevant yet, and neither is Chrome!
  - There are a lot of browser add-ons which are useful in the daily workflow of an accessibility web developer, so beneath Internet Explorer and Firefox we also suggest to install Chrome

## Internet Explorer (IE)

![Internet Explorer logo](_media/internet-explorer-logo.png){.image}

  - [Internet Explorer](http://windows.microsoft.com/en-US/internet-explorer/download-ie) is already installed in a Windows environment (make sure it's the most recent version 11!)
      - This may be the reason why it's still the most wide-spread browser used with JAWS
  - Make sure that in the menu, under `View` → `Toolbars`, all items are selected
      - If you don't see the menu, press the `Alt` key (`Option` on Mac) once
  - You may want to [restore tabs in IE upon restart](http://www.thewindowsclub.com/internet-explorer-restore-last-browsing-session)

## Firefox (FF)

![Firefox logo](_media/firefox-logo.png){.image}

  - Firefox is used by both JAWS and NVDA users a lot
  - For development, Firefox in combination with NVDA is the best choice, but be sure to test your stuff on the other combinations, too!
  - [Download Firefox](https://www.mozilla.org/en-US/firefox/new/) and install it
  - Make sure that in the menu, under `View` → `Toolbars`, all items are selected
      - If you don't see the menu, press the `Alt` key (`Option` on Mac) once
  - You may want to [restore tabs in FF upon restart](https://support.mozilla.org/en-US/kb/restore-previous-session)

## Chrome

![Chrome logo](_media/chrome-logo.png){.image}

  - [Download Chrome](https://www.google.com/chrome/browser/desktop/) and install it
  - You may want to [restore tabs in Chrome upon restart](https://productforums.google.com/forum/#!topic/chrome/7JoWEVz3CK8)