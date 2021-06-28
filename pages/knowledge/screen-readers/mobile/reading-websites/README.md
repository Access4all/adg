---
navigation_title: "Reading websites"
position: 1
changed: "2020-04-23"
---

# How to read websites using a mobile screen reader

**For a sighted person, it's hard to imagine how a screen reader user surfs the internet. For a web developer with accessibility in mind, it's crucial to have a basic knowledge about this topic. So be ready to get a concrete idea of the main strategies available to read a website using a mobile screen reader!**

[[toc]]

## Opening a website

We advise you to activate your mobile screen reader only when reading and interacting with a web page. For anything else like entering an URL into the browser's address bar we advise you to deactivate it temporarily; as soon as the web page has loaded, start it again.

- For VoiceOver/iOS, use the accessibility shortcut by tripple clicking the Home button (if you haven't done this yet, go back and read [VoiceOver/iOS configuration](/setup/screen-readers/voiceover-ios/)).
- For TalkBack, on recent Android versions, the shortcut is operated by pressing both volume keys for 3 seconds (if you haven't done this yet, go back and read [TalkBack configuration](/setup/screen-readers/talkback/)).

## Reading through a document

### Swiping

The standard way to read through a document is to move the screen reader cursor from element to element:

- To navigate from one element to the next one, swipe with one finger to the right.
- To navigate to the previous one, swipe with one finger to the left.

### Pointing

You can set the cursor to any element on the screen by clicking on it. Advanced mobile screen reader users often know exactly where the elements are displayed on their screen and access them quickly this way.

This behaviour usually is confusing to new users, as they expect that pointing on an element would activate (click) it.

### Scanning

If you move your finger over the touch screen, any element below your finger will receive the cursor. This is a good way to scan the screen and browse for elements.

## Change settings in VoiceOver/iOS (using Rotor)

The rotor is a quickly accessible menu which offers more ways to interact with VoiceOver/iOS. To use it, rotate two fingers on your screen as if you're turning a dial. VoiceOver/iOS will announce the current setting; if you want to hear more settings, keep rotating your fingers until you found the one you need. To interact with the current setting, swipe up or down with one finger.

Some of the settings that prove to be useful in daily accessibility testing are:

- Speech rate: increase or decrease.
- Container/Headings/Characters/Words: move the cursor to the next or previous corresponding element.
    - Especially the "Headings" setting is useful, as it allows to scan a website quickly for expected content.
- Language: toggle through available languages (for example, if a website has a wrong or missing `lang` attribute).

## Change settings TalkBack (using context menus)

TalkBack provides two menus to help the user to quickly find common settings and controls.
The activation gestures can be changed in the Settings.

### The global context menu

This is activated by smoothly swiping down then right, like drawing an "L" sign. It presents the user with a number of options, including "TalkBack Settings" and "Text to speech settings". 

### The local context menu

This is activated by smoothly swiping up, then right. It contains controls that relate to the currently focused item, like "Navigation options" and "Links menu".

## Screen dim (VoiceOver/iOS)

If you want to have the "real deal" (i.e. have truly the same experience like a blind person), you can dim your iPhone's screen by triple clicking on it using three fingers. Do the same again to un-dim.
