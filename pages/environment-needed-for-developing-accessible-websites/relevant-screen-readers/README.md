---
layout: layout
title: "Relevant Screen Readers"
---

# Relevant Screen Readers

Screen readers are the most important tool when it comes to Accessibility Testing.
Learn how to install and configure them conveniently.

# Why a screenreader?

- Screen reader tests are considered litmus tests in accessible UI development. Screen reader compliant websites comply with a lot success criteria that are not only important to blind people, but also to many other people with special needs.
- Screenreaders don't simply read aloud websites with disabled CSS and JavaScript (like a text browser kinda does)
- Screenreaders rely exactly on the same website data like other web browsers do (including custom CSS and JavaScript), in fact: a screenreader runs on top of a common web browser (e.g. Firefox)!
- **Conclusion:** you won't get around learning how to use a screenreader if you want to design modern accessible websites

# Desktop screen readers

- There exist many screen readers
- Most screen readers can be used on top of many different browsers, resulting in dozens of possible combinations
- It's hard to test all combinations, so we focus on the most used combinations
- Based on the results of [WebAIM's Screen Reader User Survey](http://webaim.org/projects/screenreadersurvey6/), we assume that the following screen readers are the most relevant

## NVDA - Non-Visual Desktop Access (Windows)

- Open source
- Probably the most reliable accessibility testing tool
- Used on top of [Firefox](/environment-needed-for-developing-accessible-websites/relevant-web-browsers){.page title="Relevant Web Browsers"}

## JAWS - Job Access With Speech (Windows)

- The most widespread screen reader (but it's market share is shrinking constantly)
- Extremely expensive, but offers a 40 minutes time limited demo
- Used on top of [Firefox and Internet Explorer 11](/environment-needed-for-developing-accessible-websites/relevant-web-browsers){.page title="Relevant Web Browsers"}

## Other, less relevant screen readers

If possible, also test with:

- [VoiceOver](https://en.wikipedia.org/wiki/VoiceOver#OS_X) (Mac OS X), which is deeply integrated into the operating system and thus offers a whole new user experience
- [Windows-Eyes](https://en.wikipedia.org/wiki/Window-Eyes) (Windows), another commonly used screen reader (especially in the US)

# Mobile screen readers

The mobile world offers very easy to use screen readers: especially VoiceOver can be used by anyone in only a few minutes.

While standard HTML and JavaScript is all well supported by mobile screen readers, they vary a lot in supported ARIA elements and attributes.

- [VoiceOver](https://en.wikipedia.org/wiki/VoiceOver#iOS) (iOS)
- [TalkBack](http://www.androidcentral.com/what-google-talk-back) (Android)