---
layout: layout
title: "Virtual Testing Machine"
---

# Virtual Testing Machine

Windows is a must have when it comes to testing for accessibility. To prevent disruption of your daily workflow (by an annoying synthesized screen reader voice), having a separate Windows instance in a virtual machine is a good idea. Believe us!

# Why Windows is a must-have

  - Blind internet surfers use screenreader software to let it read the screen contents to them 
      - [JAWS](http://www.freedomscientific.com/Products/Blindness/Jaws) is the most prevalent commercial screenreader
      - [NVDA](http://www.nvaccess.org/) is the most prevalent open source screenreader
      - Source: [WebAIM: Screen Reader User Survey 2015 Results](http://webaim.org/projects/screenreadersurvey6/)
      - Both are native Windows applications
  - You won't get around acquiring some Windows operating system
      - If you're on a Mac or Linux computer, you can install Windows as a virtual machine (see below)
      - Even if Windows is your host OS already, it's a good thing to do accessibility testing in a virtual machine, as otherwise, running test tools (like a screenreader) may impair your daily workflow

# Using a virtual machine (VM)

  - The easiest way is to grab a [free Windows VM from modern.IE](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) and run it using [VMWare virtualisation software] (http://www.vmware.com/)
  - All VMs from modern.IE are free and legal, as they will expire after some time period (90 days?)
  - We suggest you download the VM `IE11 on Win7` as it can be re-activated a few times after expiration

# Get, install and set up your Virtual Machine for convenient accessibility testing

Follow the Sub Pages links below to get up running

  - VMWare Fusion (for Mac)
  - VMWare Workstation Player (for Windows)

## Additional information

  - Because these free VMs expire after some time (and you have to download a new one), it's better to get a registered copy of Windows yourself because many accessibility related tools only run on Windows and you will customize and maintain your own selection over time.
  - If you already own a Windows serial, you can download the appropriate official ISO file directly from Microsoft → look here: [Where can I download Windows 7 (legally from Microsoft)?](https://superuser.com/questions/78761/where-can-i-download-windows-7-legally-from-microsoft/305434#305434)

## Antivirus

  - We hightly recommend to install an antivirus software in your VM, for example [Microsoft Security Essentials](https://support.microsoft.com/en-us/help/14210/security-essentials-download)