---
layout: layout
title: "Configuring VMware Workstation Player (Win, Linux) for accessibility testing"
position: 4
lead: "Even if you are already a Windows user, it is recommended to set up a virtual machine (VM) specifically configured for accessibility testing."
---

# Configuring VMware Workstation Player (Win, Linux) for accessibility testing

# Installing VMware Workstation Player

![VMware Workstation logo](_media/vmware-workstation-player-logo.png){.image}

Before proceeding, be sure to have downloaded a VM like described here: [Getting a free Windows VM from modern.ie](/environment-needed-for-developing-accessible-websites/virtual-testing-machine/getting-a-free-windows-vm-from-modern-ie){.page}.

Note: While the following instructions are written specifically for the Windows version of VMware Workstation Player, it can be applied similarly to the Linux version.
  
- Download [VMWare Workstation Player (Windows, Linux)](http://www.vmware.com/de/products/player/), install and launch it  
- Click `Open a virtual machine`, browse to the extracted folder of your chosen virtual machine and select the `*.ovf` file
- Click `Import`
- To be able to connect to the internet:
    - Click `Edit virtual machine settings`
    - At the bottom of the `Hardware` tab, click `Add`
    - From the `Hardware types` list, choose `Network Adapter`
        - Choose `Next`
        - Select `NAT: Used to share the host's IP address`
        - Click `Finish`, then `OK`

# Booting up the VM for the first time

Start the VM. User and password can be found here: [Getting a free Windows VM from modern.ie](/environment-needed-for-developing-accessible-websites/virtual-testing-machine/getting-a-free-windows-vm-from-modern-ie){.page}.

# Improving seamless integration

## Emulating the Insert key

![Insert key on a keyboard](_media/insert-key-on-a-keyboard.png){.image}

Windows screen readers rely heavily on the `Insert` key which isn't easily available on some keyboards, so you may have to emulate it with SharpKeys:

- SharpKeys translates any given key to any other (in the VM itself)
- In the VM, download [SharpKeys](http://sharpkeys.codeplex.com/), install and launch it
- Click `Add`, then map any key you like (e.g. the right `Alt` key `E0_38`) to `Insert` key (`E0_52`)
- Click `OK` and `Write to Registry`
- Restart Windows

# Working seamlessly with the VM

We recommend to play around with "Single Window" and "Unity" modes to find out what fits you best.