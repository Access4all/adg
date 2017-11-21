---
layout: layout
title: "Tools for Enhancing the Accessibility of Presentations"
---

# Tools for Enhancing the Accessibility of Presentations

Whether you are holding a Powerpoint presentation or demonstrating something live on your computer screen: there are tools which enhance the accessibility of this!

# Mouse Visibility Enhancers

## Mousepose (OSX, commercial)

 [Mousepose](https://boinx.com/mousepose/overview/).

# Keystrokes Displayer

Note: Windows screen readers intercept keystrokes, which seems to make it impossible to run both a keystrokes displayer app while having a screen reader running! More info here: [NVDA disables tools that display pressed key strokes](https://github.com/nvaccess/nvda/issues/6565).

The cool thing: if you have your screen reader running in a virtual machine (as described here: [Virtual Testing Machine](/environment-needed-for-developing-accessible-websites/virtual-testing-machine){.page}), you can run the keystrokes displayer tool in the host operating system, which works pretty well.

## KeyCastr (OSX, open source)

Download: [KeyCastr](https://github.com/keycastr/keycastr).

Issue: doesn't know the `Insert` key, so it just displays a question mark. More info: [Show Insert key command (win) correctly (not as a question mark)](https://github.com/keycastr/keycastr/issues/74).