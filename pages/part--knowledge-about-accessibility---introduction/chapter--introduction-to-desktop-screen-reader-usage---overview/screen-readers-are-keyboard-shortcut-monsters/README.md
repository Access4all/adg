---
layout: layout
title: "Screen readers are keyboard shortcut monsters"
navigation_title: "Shortcut monsters"
position: 6
lead: "Desktop screen readers are usually controlled with the keyboard only. Offering tons of functionalities, all of them ought to be triggered by keyboard shortcuts. But what to do if none of the standard keyboard combinations are free anymore?"
---

# Screen readers are keyboard shortcut monsters

# Problem: no keyboard combinations left

Most traditional keyboard shortcuts (a combination of at least one modifier key and any other key, for more info see [Controlling a computer with a keyboard only](/part--knowledge-about-accessibility---introduction/chapter--introduction-to-keyboard-only-usage---overview/controlling-a-computer-with-a-keyboard-only){.page}) are already in use by the operating system and running applications!

# Solution: using `Insert` as modifier key

Both screen readers NVDA and JAWS worked around this problem by hijacking the `Insert` key as their modifier key. So most interaction with desktop screen readers involves a combination of `Insert` and other keys.

Some examples:

- When running NVDA:
    - `Insert + N` shows the NVDA menu.
    - `Insert + F7` shows the elements list.
- When running JAWS:
    - `Insert + J` shows the JAWS menu.
    - `Insert + F6` displays the heading list.

## Alternatives to the `Insert` key

If you're on a Mac running NVDA or JAWS in a virtual machine, there are several ways you can work around the missing `Insert` key; for more info, see [Configuring VMware Fusion on macOS](/part--setup-of-the-accessibility-environment---introduction/chapter--windows-virtual-machine---overview/configuring-vmware-fusion-on-macos){.page}.

Both NVDA and JAWS offer the option to use `Caps Lock` instead of `Insert` as a modifier key. For some reason though, this doesn't seem to work in VMware Fusion.

# Naming convention

In this guide, we don't talk about the `Insert` key. Instead, when running NVDA, we talk about the `NVDA` key. And when running JAWS, we talk about the `JAWS` key.

So the examples above look like this:

- When running NVDA:
    - `NVDA + N` shows the NVDA menu.
    - `NVDA + F7` shows the elements list.
- When running JAWS:
    - `JAWS + J` shows the JAWS menu.
    - `JAWS + F6` displays the heading list.