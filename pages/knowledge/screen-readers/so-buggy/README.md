---
navigation_title: "So buggy!"
position: 8
changed: "2020-04-07"
---

# How screen readers work - and why they seem so buggy

**Sitting on top of another application, screen readers announce the underlying content - often trying to compensate for inadequate presentation by both the underlying application and its content. This is a very hard task and prone to regressions, as we try to explain here.**

[[toc]]

## Short summary

Screen readers "sit" on top of another application, conveying its contents to the user through audio or braille.

As many of those applications do not care too much about accessibility and present their content in non-semantical or other inadequate ways, screen readers try to compensate for this. In addition to this, many websites are coded poorly, and some screen readers even try to compensate for this.

While this works sometimes, it often results in strange behaviours. Thus, screen readers often are perceived as being buggy.

To prevent bugs, it is best to follow established standards and best practices.

## Exhaustive explanation

In the following article, we are trying to explain the problem of buggy screen readers a little deeper. Keep in mind that we are neither browser developers nor screen reader developers, so the following information may be incomplete, biased, or even wrong in some parts. But it is the best we can currently provide from our years long experience with the topic.

### Don't kill the messenger!

Screen readers always "sit" on top of another application (for example a web browser or PDF viewer), conveying its contents to the user through audio (synthetic speech) or braille.

- This other application provides the content and semantical information through the accessibility API.
    - We could call the provided content and information "the message".
- The screen reader connects to this accessibility API and announces the available data to the user in a human friendly way.
    - We could call the screen reader "the messenger".

Many applications neglect treating the accessibility API responsibly. "Responsibly" means that all needed information is provided, so that a screen reader can announce everything in a meaningful way. Irresponsible treatment results in broken messages.

In addition to this, the code quality of website content often is bad:

- Sometimes, required content is partially missing: for example an image with no alternative text.
- Or semantical information is missing: for example a button is only marked up as `<span>` element (instead of as a proper `<button>`).

This breaks the message even more.

Aware of such problems (and because they want to be duteous and faithful messengers), some screen readers try to "fix" broken messages by collecting additional information through precarious ways, for example by looking for information directly in the browser's DOM. JAWS, as a rather extreme example, even used to install its own graphic driver into the system, intercepting graphical information and applying optical character recognition (OCR) to it.

Still, a broken message is highly prone to remain being broken. And this makes clear why the same website with the same screen reader may work well in one browser (maybe Firefox), while failing completely in another one (maybe Edge): the messenger is the same, but the message quality may vary a lot.

So please, do not kill the messenger - instead, follow this guide and provide high quality messages!

### Reasons for bugs

Screen readers sadly seem to be very prone to regressions, meaning that a feature which worked well in an earlier combination of browser and screen reader versions does not work anymore in subsequent versions. For example, the fact that a specific accessibility feature worked well in the combination of NVDA 2018.1 and Firefox 58 is no guarantee that it will still work in NVDA 2018.2 with Firefox 58 (or NVDA 2018.1 and Firefox 59).

Let's look at a hypothetical example. Let's say that for an ARIA tablist implementation, the browser does not provide the necessary information about which tab currently is active to the accessibility API:

- To work around this problem, the screen reader may implement a workaround and gathers the missing data through some other, "unofficial" channel. This could be through some internal information structure of the browser which is not meant to be "leaked" by any other application.
    - So through some tweaks and hacks, the screen reader is able to announce the currently active tab.
- If the browser now changes some of this internal information structure in a subsequent version, the screen reader cannot find the needed data anymore.
    - So the screen reader is not able anymore to announce the currently active tab. What a disappointment!

So the formerly working accessibility feature does not work anymore - a regression! But who is to blame?

This is a devastating situation:

- For screen reader users, as they are depending on steadily and stable working software.
- For screen reader manufacturers, as they have to deal with the untenable situation of reluctantly maintained accessibility APIs. And so they always have to catch up with changes in browsers and other apps. And usually they're the ones who are blamed for creating buggy software - how ungrateful.
- For web developers aiming to design accessible websites, as they are using screen readers to ensure that their products work. Only to see it break "by itself" later again...

### How to avoid bugs

The best way to avoid such situations is to follow established standards and best practices - essentially the ones we are presenting in our guide, which rely on pure and basic HTML most of the time. So if you haven't done this yet, go back and read [Semantics and their importance for accessibility](/knowledge/semantics).

### How to deal with bugs

If you find bugs in either screen readers or browsers, we highly urge you to get in contact with their manufacturers, so fixes can be worked out together.

- For filing NVDA issues, please use the [issue tracker for NVDA (GitHub.com)](https://github.com/nvaccess/nvda/issues).
    - The folks there are helpful and responsive.
- For filing JAWS issues, please use the [issue tracker for VFO-standards-support (GitHub.com)](https://github.com/FreedomScientific/VFO-standards-support/issues) by FreedomScientific.
    - For more details, please read [JAWS wide open (PacielloGroup.com)](https://developer.paciellogroup.com/blog/2017/10/jaws-wide-open/).
- For filing Firefox issues, please use the [issue tracker for Firefox (Mozilla.org)](https://bugzilla.mozilla.org).
- TODO: Chrome!

### What will the future bring?

Traditionally, desktop screen readers haven't been incorporated into operating systems. As such, they never really felt like being an integral part of them (some reasons for this are outlined in the text above), but rather like a parasite sucking for information wherever possible.

With the screen readers VoiceOver on macOS and Narrator on Windows, this has changed fundamentally in recent years: both are incorporated deeply into the operating system by default. Being an official part of their ecosystem, support is expected to be much better and more reliable than for 3rd party screen readers. Especially VoiceOver on macOS is currently seen by many users as being the best screen reader available.

But it will take time until the majority of users will have switched (if ever). So for the time being, developers need to keep JAWS and consorts as their main references.
