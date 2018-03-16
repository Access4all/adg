---
layout: layout
title: "Virtual testing machine with VMware Workstation Player (for Windows)"
---

# Virtual testing machine with VMware Workstation Player (for Windows)

Even if you are a Windows user, it is recommended to set up a virtual machine specifically designed for accessibility testing.

# Install VMWare Workstation

![VMware Workstation logo](_media/vmware-workstation-player-logo.png){.image}
  
  - Download [VMWare Workstation Player (Windows, Linux)](http://www.vmware.com/de/products/player/) Installer, install and launch it  
  - When launched choose the button `Open a virtual machine`, browse to the extracted folder of your chosen virtual machine and select the `.ovf`-file. Click `Import`
  - Start VMWare Workstation Player
  - Enable internet access and set your keyboard layout as default
  - Start the VM

# Set up VM for convenient accessibility testing
  
## Add Network Adapter
  
  - In order to connect to the internet, choose `Edit virtual machine settings`, click `Add` on the bottom of the 'Hardware' tab and select `Network Apapter` from 'Hardware types:' list
      - Choose `Next`
      - Select `NAT: Used to share the host's IP address`
      - Click `Finish`, then `OK`
    
## Set your keyboard layout as default

  - In order to make your keyboard work on the virtual machine you need to set the keyboard preferences accordingly
      - Open the `Control Panel` and choose `Clock, Language, and Region`
      - Open the `Keyboards and Languages` tab and click on the `Change keyboards...` button
      - Choose the `Add` button and select your keyboard layout from the list and click `OK`
      - Then set your new added keyboard layout as `Default input language` in the drop-down  

## Integration

  - We think `Single Window` mode (default) isn't the best choice
      - There's a conflict between the host Windows and the virtual machine when using `Alt-Tab`.
  - We suggest to use the "Unity" mode
      - You will notice a yellow border around the virtual machine's windows (and a small yellow icon in their menu bars)
      - Simply start new Windows apps through the VMWare menu bar on the bottom left, right above the host Windows' Start menu
      - There's a small bug that causes the VMWare app to be displayed when switching between opened windows of the VM
          - This won't happen as long as the VMWare app window is minimised

## Alternatives to the `Insert` key

- TODO: SharpKeys!
- TODO: NVDA Caps Lock Option!