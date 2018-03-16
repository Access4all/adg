---
layout: layout
title: "Relevant combinations of screen readers and browsers"
position: 2
lead: "To reach as many users as possible, it's a pragmatic approach to support the most widely used combinations of browsers and screen readers.

TODO: V7 ist verfügbar! <https://webaim.org/projects/screenreadersurvey7/>

TODO: In speziellen geschlossenen Systemen können auch ganz andere Kombinationen prioritär sein! Und sonst die typischen."
---

# Relevant combinations of screen readers and browsers

As web developers, we're aware of how hard it is to support all relevant devices, operating systems, and browsers. Adding screen readers to the mixture doesn't make things less complicated: a long list of screen readers can be combined with another long list of browsers, each combination possibly having its own characteristics.

It's impossible to develop and test for dozens of possible combinations of browsers and screen readers. We take a pragmatic approach, aiming at the most widely used ones (always running the newest stable versions):

- JAWS with Internet Explorer 11
- JAWS with Firefox => TODO: laut WebAIM eher unwichtig?!
- NVDA with Firefox

Read more to find out about the reasoning behind this.

# Determining browser market share: analysing user agents

When communicating with a server, browsers usually send a distinctive [user agent](https://de.wikipedia.org/wiki/User_Agent) header to identify themselves. For example, Firefox 40.1 sends the following user agent string: `Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1`, making it possible to identify both the browser and its version.

Evaluating the market share of any given browser thus is pretty easy: simply analyse the log files of a very popular website like [Google](http://www.google.com) regarding frequency of different user agents.

# Determining screen reader market share: not as easy

As described in [How screen readers work - and why they seem so buggy](/knowledge-about-developing-and-testing-accessible-websites/introduction-to-desktop-screen-reader-usage/how-screen-readers-work---and-why-they-seem-so-buggy){.page}, most screen readers aren't an integral part of the operating system: they simply "sit" on top of another application (e.g. a browser), reading the available contents to the user. As such, they don't send anything like a user agent or similar info to anybody, making it impossible to identify them programmatically.

As such it's much harder to learn about how widely different screen readers are used, in which versions they are used, and in combination with which browser.

# WebAIM's screen reader user survey to the rescue!

The initiative [Web Accessibility In Mind (WebAIM)](https://webaim.org/) conducts regular surveys among users of assistive software, which gives us at least some insight into the topic.

But like every survey, it's expected to reach a rather deterministic sample only, and as such:

- Its representativeness is limited
- We only gain an outline about the rough proportions, but no detailed data about absolute statistics
    - For example, we can say that there are about twice as many JAWS users than NVDA users
    - But we can't say whether the overall number of JAWS users is rather some ten thousands, some hundred thousands, or some millions

The following data is taken from [WebAIM's Screen Reader User Survey #6](https://webaim.org/projects/screenreadersurvey6/), conducted in 2015. As our foundation is based in Switzerland, we asked WebAIM for some more detailed numbers specifically about Europe.

**By the way:** The [Screen Reader User Survey #7](https://webaim.org/projects/screenreadersurvey7/) has just been conducted. Results can be expected soon.

# Combinations of browsers and screen readers used

## World wide

- JAWS with IE: 23.9%
- Window-Eyes with IE: 14.9%
- NVDA with Firefox: 11.4%
- ZoomText with IE: 9.8%
- ZoomText with Firefox: 6.9%
- VoiceOver with Safari: 6.8%

## Europe

- JAWS with IE - 21.3%
- NVDA with Firefox - 19.4%
- Window-Eyes with IE - 9.7%
- ZoomText with IE - 7.8%
- VoiceOver with Safari - 7.4%
- ZoomText with Firefox - 5.9%

## Verdict: most relevant combinations

While JAWS is the unchallenged leader both world wide and in Europe, Window-Eyes leads world wide and NVDA leads in Europe.

We decided to go for NVDA for the following reasons:

- Based in Switzerland, our foundation serves clients mainly from Europe
- NVDA is light weight, Open Source, and known to adhere very strictly to standards like HTML and ARIA, making an ideal tool for the daily accessibility development and testing workflow

# What about specific software versions?

To make the whole topic even more complex, we could ask for combinations of specific software versions of both browsers and screen readers. This would definitely result in an explosion of possible combinations.

Even though having current versions available of both screen readers and browsers is essential for users with special needs, we are aware that many of them keep running legacy versions. This due to various reasons:

- Many commercial screen readers are very expensive, and license upgrades are feasible only every few years
    - Even health insurance often doesn't guarantee their clients to stay up to date: in Switzerland, the invalidity insurance sponsors a new JAWS license only every 3 (5?) years!
- When it comes to installing, configuring, and updating their software, many users with special needs are dependent on assistance
    - Most users with special needs aren't technicians and are thankful if something "just works"
    - Much software needed to run assistive devices isn't built accessibly itself, making it hard or even impossible to be managed by users with special needs

## Verdict: newest stable versions

As it's not feasible to test dozens of possible software versions, we decided that it's most pragmatic to always test the newest versions of both browsers and screen readers.

An exception from this rule could be a closed web application run under a certain specific environment, like the intranet of a bank.