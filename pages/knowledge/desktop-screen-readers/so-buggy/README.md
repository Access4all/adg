---
layout: layout
title: "How screen readers work - and why they seem so buggy"
navigation_title: "So buggy!"
position: 12
lead: "Sitting on top of another application, screen readers announce the underlying content - often trying to compensate for inadequate presentation by both the underlying application and its content. This is a very hard task and prone to regressions, as we are trying to explain here."
---

# How screen readers work - and why they seem so buggy

Screen readers always "sit" on top of another application, conveying its contents to the user through audio.

As many of those applications don't care too much for accessibility and present their content in non-semantical or inadequate ways, screen readers try to compensate for this. In addition to this, many websites are coded poorly, and some screen readers even try to compensate for this.

While this works sometimes, it often results in strange behaviours. Thus, screen readers often are perceived as being buggy.

In the following article, we are trying to explain the problem a little deeper. Keep in mind that we are whether browser developers nor screen reader developers, so the following information may be incomplete, biased, or even wrong in some parts. But it is the best we can provide from our years long experience with the topic.

# Modus operandi of screen readers

A screen reader reads aloud elements on a screen (or represents them in braille on such a device):

- It announces the content of elements, for example a the text inside a heading on a website.
- It also announces semantical (or meta) information about elements, for example that an element is a heading and that it is on the 3rd level (an `<h3>`).

The screen reader announces elements in a sequential (one dimensional) fashion:

- It announces one element after the other, following the DOM sequence.
- Thus, the screen reader's reading position always is on one single point on a screen and moves upwards or downwards from there.
    - This is similar to the keyboard focus, but while the keyboard focus can be moved only between focusable elements (for example links and form elements), the screen reader focus can be moved to any element on screen.
    - The screen reader focus is very similar to the cursor in a text editor.
        - It is capable of moving between single characters or words.
        - By default though, it moves between higher level objects like paragraphs, images, form elements, etc.

The screen reader starts reading elements from the top of the screen: element by element, it reads down to the bottom. Finally, the end of the screen is announced.

# Don't kill the messenger!

The screen reader always sits on top of another application, for example a web browser or PDF viewer:

- This other application provides the content and semantical information through the accessibility API. We could call the provided content and information "the message".
- The screen reader connects to this accessibility API and announces the available data to the user in a human friendly way. We could call the screen reader "the messenger".

Many applications neglect treating the accessibility API responsibly. "Responsibly" means that all needed information is provided through it, so that a screen reader can announce everything in a meaningful way. This means that the message is broken.

In addition to this, the code quality of website content often is low:

- Sometimes, required content is partially missing: for example an image with no alternative text.
- Or semantical information is missing: for example a button is only marked up as plain text (instead of a proper `<button>` element).

This breaks the message even more.

Aware of such problems (and because they want to be duteous and faithful messengers), some screen readers try to "fix" broken messages by collecting additional information through precarious ways, for example by looking for information directly in the browser's DOM. JAWS, as a rather extreme example, even installs its own graphic driver into the system, intercepting graphical information and applying optical character recognition (OCR) to it.

Still, a broken message is highly prone to remain broken. And this makes clear why the same website with the same screen reader may work well in one browser (maybe Firefox), while failing completely in another one (maybe Edge): the messenger is the same, but the message quality may vary a lot.

So please, don't kill the messenger - instead, follow this guide and provide high quality messages!

# Reasons for bugs

Screen readers sadly seem to be very prone to regressions: this means that a feature which worked well in an earlier browser version, doesn't work anymore in a subsequent version.

Let's say that for a specific accessibility feature, the browser doesn't provide all necessary information to the accessibility API:

- To work around this problem, the screen reader may implement a workaround and gathers the missing data through some other, "unofficial" channel. This could be through some internal information structure of the browser which isn't meant to be "leaked" by any other application.
- If the browser now changes some of this internal information structure in a subsequent version, the screen reader can't find the needed data anymore.
- So the formerly working accessibility feature doesn't work anymore - a regression! But who is to blame?

This is a devastating situation:

- For screen reader users, as they are depending on stable working software.
- For screen reader manufacturers, as they have to deal with the untenable situation of reluctantly maintained accessibility APIs. And so they always have to catch up with changes in browsers and other apps. And usually they're the ones who are blamed for creating buggy software - how ungrateful.
- For web developers aiming to design accessible websites, as they are using screen readers to ensure that their creations work. Only to see it break by itself later again...

# How to avoid bugs

The best way to avoid such situations is to follow established standards and best practices - essentially the ones we are presenting in our guide. If you are really curious and want to learn more about this, skip ahead and read [Our codex about clean and maintainable accessibility](/knowledge/codex){.page}.

# What will the future bring?

Traditionally, desktop screen readers haven't been incorporated into operating systems. As such, they never really felt like being an integral part of them (some reasons for this are outlined in the text above), but rather like a parasite sucking for information wherever possible.

With the screen readers VoiceOver on macOS and Narrator on Windows, this has changed fundamentally in recent years: both are incorporated deeply into the operating system by default. Being an official part of their ecosystem, support is expected to be much better and more reliable than for 3rd party screen readers. Especially VoiceOver on macOS is seen by many users as being the best screen reader available.

But although it sounds cynical that a full Macbook in fact is cheaper than a 1-year JAWS license, it will take time until the majority of users will have switched (if ever). So until then, developers need to keep JAWS and consorts as their main references.