---
layout: layout
title: "Configuring VMware Workstation Pro on Windows (and Linux)"
navigation_title: "VMware on Windows & Linux"
position: 4
lead: "Even if you are already running Windows as your operating system, it is highly recommended to make the initial effort needed to set up another Windows within a virtual machine, configured specifically for accessibility testing. This keeps your own system clean and makes accessibility testing much more comfortable."
---

# Configuring VMware Workstation Pro on Windows (and Linux)

# Windows vs. Linux

While the following instructions are written specifically for the Windows version of VMware Workstation Pro, they should be applicable in a similar way to the Linux version.

# Preparing the virtual machine

Before you proceed, be sure you have downloaded a pre-configured VM like described here: [Getting a free Windows virtual machine from Modern.IE](/setup/windows/modern-ie){.page}.

Then extract the VM to a proper location, for example `C:\Virtual Machines\Accessibility Testing`.

# Installing VMware Workstation Pro

![VMware Workstation Pro logo](_media/vmware-workstation-pro-logo.png){.image}

- Download [VMware Workstation Pro](https://www.vmware.com/products/workstation-pro.html), install and launch it.
    - Notice: there is also [VMware Workstation Player](https://www.vmware.com/products/workstation-player.html) which is cheaper but has limited functionality, for example it's missing the snapshots feature (see below).
- Click `Open a virtual machine`, select the `*.ovf` file in the extracted folder, and confirm.
- Take a snapshot (`Ctrl + Shift + S`).
    - This allows to easily go back to that state later, meaning you can re-activate the VM's Windows 90 days license again and again.
    - For more info, see [Understanding snapshots (VMware)](https://www.vmware.com/support/ws5/doc/ws_preserve_sshot_understanding.html).
- Click `Edit virtual machine settings`.
    - Go to `Processors & Memory`, then select at least 2000MB of memory.
    - To be able to connect to the internet, at the bottom of the `Hardware` tab, click `Add`.
        - From the `Hardware types` list, choose `Network Adapter`, then click `Next`.
        - Select `NAT: Used to share the host's IP address`, click `Finish`, then `OK`.

# Booting up the VM for the first time

Start the VM. User and password can be found here: [Getting a free Windows virtual machine from Modern.IE](/setup/windows/modern-ie){.page}.

# Improving seamless integration

## Emulating the Insert key

![Insert key on a keyboard](_media/insert-key-on-a-keyboard.png){.image}

Windows screen readers rely heavily on the `Insert` key which isn't easily available on some keyboards, so you may have to emulate it. The easiest way to do this is using the SharpKeys software.

- SharpKeys translates any given key to any other (in the VM itself).
- In the VM, download [SharpKeys](http://sharpkeys.codeplex.com/), install and launch it.
- Click `Add`, then map any key you like (e.g. the right `Alt` key `E0_38`) to `Insert` key `E0_52`.
- Click `OK` and `Write to Registry`.
- Restart the VM.

# Working seamlessly with the VM

We recommend you to play around with "Single Window" and "Unity" modes to find out what fits you best.