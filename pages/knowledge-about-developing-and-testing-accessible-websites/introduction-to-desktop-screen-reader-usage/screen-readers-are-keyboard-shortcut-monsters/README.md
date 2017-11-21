---
layout: layout
title: "Screen readers are keyboard shortcut monsters"
---

# Screen readers are keyboard shortcut monsters

Desktop screen readers are controlled with the keyboard only. Offering tons of functionalities, all of them ought to be triggered by keyboard shortcuts.

# The problem: No traditional keyboard combinations left!

Most traditional keyboard shortcuts (a combination of at least one modifier key and any other key, for more info see [Controlling a computer with a keyboard only](/knowledge-about-developing-and-testing-accessible-websites/introduction-to-keyboard-only-usage/controlling-a-computer-with-a-keyboard-only){.page}) are already in use by the operating system and running applications!

# The solution: Using `Insert` as additional modifier key!

Both NVDA and JAWS worked around this problem by hijacking the `Insert` key as their modifier key. So most interaction with desktop screen readers involves a combination of the `Insert` and other keys.

Some examples:

- When running NVDA:
    - `Insert + N` shows the NVDA menu
    - `Insert + F7` shows the elements list
- When running JAWS
    - `Insert + J` shows the JAWS menu
    - `Insert + F6` displays the heading list

## Alternatives to the `Insert` key

- If you're on a Mac running NVDA or JAWS in a virtual machine, there are several ways you can work around the missing `Insert` key
    - For more info, see [Virtual testing machine with VMware Fusion (Mac)](/environment-needed-for-developing-accessible-websites/virtual-testing-machine/virtual-testing-machine-with-vmware-fusion--mac-){.page}
- NVDA has the option to use `Caps Lock` instead of `Insert` as a modifier key
    - For more info, see [Virtual testing machine with VMware Workstation Player (for Windows)](/environment-needed-for-developing-accessible-websites/virtual-testing-machine/virtual-testing-machine-with-vmware-workstation-player--for-windows-){.page}
    - This doesn't seem to work in VMware Fusion (TODO: Why?)

# Naming convention in this guide

In this guide, we don't talk about the `Insert` key. Instead, when running NVDA, we talk about the `NVDA` key. And when running JAWS, we talk about the `JAWS` key.

So the examples above look like this:

- When running NVDA:
    - `NVDA + N` shows the NVDA menu
    - `NVDA + F7` shows the elements list
- When running JAWS
    - `JAWS + J` shows the JAWS menu
    - `JAWS + F6` displays the heading list

# Mouse features

Some desktop screen readers offer special functionality for mouse users. For example, NVDA automatically reads aloud elements hovered using the mouse. This can be useful to search for elements on a screen. For developing purposes, we feel this feature is rather distracting, so you should disable it as described here: [NVDA Installation and Configuration](/environment-needed-for-developing-accessible-websites/relevant-screen-readers/nvda-installation-and-configuration){.page}.

# Mouse emulation

Some desktop screen readers allow emulation of a mouse. For example, JAWS allows to move the mouse using the keyboard (TODO: Wie??). TODO: Sagen, dass dies nicht der übliche Use-Case ist!