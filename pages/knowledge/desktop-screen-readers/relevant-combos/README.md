---
layout: layout
title: "Relevant combinations of screen readers and browsers"
navigation_title: "Relevant combos"
position: 2
lead: "To reach as many users as possible, it's a pragmatic approach to support the most widely used combinations of browsers and screen readers. Here you learn, which those are. Other requirements may only apply in closed environments that are only open to a specific, deterministic group of users."
changed: "2018-05-01"
---

# Relevant combinations of screen readers and browsers

**To reach as many users as possible, it's a pragmatic approach to support the most widely used combinations of browsers and screen readers. Here you learn, which those are. Other requirements may only apply in closed environments that are only open to a specific, deterministic group of users.**

As web developers, we're aware of how hard it is to support all relevant devices, operating systems, and browsers. Adding screen readers to the mixture doesn't make things easier: a long list of screen readers can potentially be combined with another long list of browsers, each combination possibly having its own characteristics.

# Short summary

It is impossible to develop and test for dozens of possible combinations of browsers and screen readers. We have had good experiences with taking the following pragmatic approach, namely aiming at the most widely used combinations (newest stable versions):

- JAWS with Internet Explorer (IE)
- JAWS with Firefox (FF)
- NVDA with FF

**Notice:** an exception from this rule is valid in closed environments, where only specific browsers or screen readers are available.

# Exhaustive explanation

If you are interested to find out more about the reasoning behind this, continue reading. Otherwise just skip the rest of this page.

## Determining screen reader market share

Screen readers aren't an integral part of the browser: they simply "sit" on top of it, announcing the available contents to the user. As such, they don't send anything like user agent data or similar to the server, making it impossible to identify them programmatically.

As such it is very hard to examine:

- How widely different screen readers are used.
- In which versions they are used.
- And in combination with which browsers they are used.

## WebAIM's screen reader user survey

The initiative [Web Accessibility In Mind (WebAIM.org)](https://webaim.org/) conducts regular surveys among users of assistive software, which gives us at least some insight into the topic.

### Limitations

Like every other survey, the WebAIM screen reader survey is expected to reach a rather deterministic sample only: exclusively screen reader users who somehow got to know about the survey and were eager to fill it out are included. As such, its results may be heavily biased and its representativeness may be limited.

Also, we only gain an outline about rough proportions, but no detailed data about absolute statistics. For example, we can say that there are about twice as many JAWS users than NVDA users. But we can't say whether the overall number of JAWS users worldwide is rather some ten thousands, some hundred thousands, or some millions.

Finally, we don't have detailed information about differences between countries and continents, nor any details about specific versions of software being used.

### Results

Here's the available data regarding combinations of browsers and screen readers used according to [WebAIM's Screen Reader User Survey #7](https://webaim.org/projects/screenreadersurvey7/), conducted in October 2017:

- JAWS with IE: 24.7%
- NVDA with FF: 23.6%
- JAWS with FF: 15.1%
- VoiceOver/macOS with Safari: 10.0%
- JAWS with Chrome: 6.5%
- NVDA with Chrome: 5.9%
- NVDA with IE: 2.3%
- VoiceOver with Chrome: 1.4%
- Other combinations: 10.5%

### What about Edge?

Accessibility support in Microsoft's current browser Edge was very low upon release. Meanwhile, Edge was improved in some respects. But most screen reader users didn't switch from Internet Explorer yet, and it may still take quite some time until this will have happened.

## Software versions

To make the whole topic even more complex, we could ask for combinations of specific software versions of both browsers and screen readers. This would definitely result in an explosion of possible combinations.

Even though having current versions of both screen readers and browsers available is essential for users with special needs, we are aware that many of them keep running legacy versions. This is due to various reasons:

- Many commercial screen readers are very expensive, and license upgrades are affordable only every few years for a lot of users.
    - Even health insurance or social security often do not guarantee their clients to keep their assistive technology equipment up to date: in Switzerland, the invalidity insurance does not sponsor new JAWS licenses at the intervals needed.
- When it comes to installing, configuring, and updating their software, many users with special needs are dependent on assistance.
    - Most users with special needs aren't "digital natives" and are thankful if something "just works".
        - This may change in the future, as people with special needs begin to realise the vast potential of modern technology and the impact it can have on their lives.
    - Much software needed to run assistive devices isn't built accessibly itself, making it hard or even impossible to be self-managed by users with special needs.

As it is not feasible to test dozens of possible software versions, we follow a pragmatic way which is to test always the newest stable versions of both browsers and screen readers.

## Diverging requirements in closed environments

In closed environments, where a web application is only exposed to a deterministic group of users, requirements different to the ones outlined above may be feasible.

For example, in a bank, every user may have the same workstation available with default software and configuration; this could be NVDA screen reader and Firefox browser. Alas, for the intranet website of the bank (which is exclusively available from those workstations), only this specific combination needs to be supported.