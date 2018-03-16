---
layout: layout
title: "JAWS installation and configuration"
navigation_title: "JAWS"
position: 2
lead: "JAWS (Job Access With Speech) is one of the most used screen readers. Therefore it's very important to ensure its compatibility with your websites. Due to its heavy weight, JAWS is a rather clumsy companion while developing, but it's absolutely crucial to fire it up every now and then to ensure accessibility."
---

# JAWS installation and configuration

![JAWS icon](_media/jaws-icon.png){.image}

# Installation

JAWS is a quite heavy piece of software that installs itself deeply into the Windows operating system. To keep your existing Windows clean, it is a good idea to install JAWS inside a virtual machine (VM), see [Chapter: Windows virtual machine - overview](/part--setup-of-the-accessibility-environment---introduction/chapter--windows-virtual-machine---overview){.page}.

The demo version of JAWS forces you to restart your computer after 40 minutes (which is another good reason to have it run inside a VM).

[Download JAWS](http://www.freedomscientific.com/Downloads/JAWS) and simply run the installer, or see [JAWS Quick Start (PDF, FreedomScientific.com)](http://www.freedomscientific.com/Content/Documents/Manuals/JAWS/JAWS-Quick-Start-Guide.pdf) for detailed information.

# Running JAWS

## Starting

Start JAWS using its icon on the desktop. After it has launched, you have to restart your web browser(s) to make JAWS interact with them correctly.

## Using the menu

![JAWS application window](_media/jaws-application-window.png){.image}

By default, JAWS displays its own application window while running. To save space in the taskbar, JAWS should run in the system tray:

- In JAWS, open `Options` -> `Basics`.
- Select `Run JAWS from System Tray`.
- Confirm and restart JAWS.

From now on, you won't see much of JAWS except a small icon in the system tray: ![JAWS in the system tray](_media/jaws-in-the-system-tray.png){.image}.

![The JAWS menu](_media/the-jaws-menu.png){.image}

By clicking on the icon, the JAWS menu is displayed.

Alternatively, you can press `JAWS + J` to display it. By default, the `JAWS` key is the `Insert` key (if you are really curious and want to learn more about this, skip ahead and read [Screen readers are keyboard shortcut monsters](/part--knowledge-about-accessibility---introduction/chapter--introduction-to-desktop-screen-reader-usage---overview/screen-readers-are-keyboard-shortcut-monsters){.page}).

The best way to use the JAWS menu is by keyboard:

- Use the arrow keys to navigate it and press `Enter` to select an item.
- For even quicker navigation, press the letter on your keyboard that is underlined in the intended menu item.
    - For example, press `X` for `Exit`.
    - In this guide, we indicate those letters by putting braces around them, for instance like so: `E(x)it` or `(H)elp`.
- You can close the menu items by pressing `Esc`.

## Silencing JAWS on demand

While JAWS is running, it's announcing whatever your screen is currently showing.

- To make JAWS abort the current stream of words, press the `Ctrl` key.
- To make JAWS shut up completely, you can toggle speech mode by pressing `JAWS + Space`, then `S`.
    - Be aware though that JAWS is still running in the background, so your computer may behave differently in some situations!

## Braille viewer

![JAWS braille viewer](_media/jaws-braille-viewer.png){.image}

JAWS doesn't offer a `Speech Viewer` like NVDA (see [NVDA installation and configuration](/part--setup-of-the-accessibility-environment---introduction/chapter--screen-readers---overview/nvda-installation-and-configuration){.page}), but at least its `Braille Viewer` gives some basic info about where the JAWS focus currently is.

## Speech history

![JAWS speech history dialog](_media/jaws-speech-history-dialog.png){.image}

Sometimes it's interesting to see what JAWS announced in the past (or to copy&paste some output).

- To open the output history, press `JAWS + Space`, then `H`.
- The history shows that last 20 announcements.
- Sadly, the history doesn't refresh automatically.