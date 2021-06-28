---
navigation_title: "Relevant combinations"
position: 2
changed: "2020-04-07"
---

# Relevant combinations of screen readers and browsers

**To reach as many users as possible, it's a pragmatic approach to support the most widely used combinations of browsers and screen readers. Here you learn, which those are. Other requirements may only apply in closed environments that are only open to a specific, deterministic group of users.**

[[toc]]

As web developers, we're aware of how hard it is to support all relevant devices, operating systems, and browsers. Adding screen readers to the mixture does not make things easier: a long list of screen readers can potentially be combined with another long list of browsers, each combination possibly having its own characteristics.

## Short summary

It is impossible to develop and test for dozens of possible combinations of browsers and screen readers. We have had good experiences with taking the following pragmatic approach, namely aiming at the most widely used combinations (newest stable versions):

### Mobile screen readers

- VoiceOver/iOS with Safari
- TalkBack with Chrome

### Desktop/Laptop screen readers

- JAWS with Chrome
- NVDA with Firefox (FF)

**Notice:** an exception from this rule is valid in closed environments, where only specific browsers or screen readers are available.

## Exhaustive explanation

If you are interested to find out more about the reasoning behind this, continue reading. Otherwise just skip the rest of this page.

### Determining screen reader market share

Screen readers aren't an integral part of the browser: they simply "sit" on top of it, announcing the available contents to the user. As such, they do not send anything like user agent data or similar to the server, making it impossible to identify them programmatically.

As such it is very hard to examine:

- How widely different screen readers are used.
- In which versions they are used.
- And in combination with which browsers they are used.

### WebAIM's screen reader user survey

The initiative [Web Accessibility In Mind (WebAIM.org)](https://webaim.org/) conducts regular surveys among users of assistive software, which gives us at least some insight into the topic.

The most recent survey was conducted in August - September 2019 ([WebAIM's Screen Reader User Survey #8](https://webaim.org/projects/screenreadersurvey8/)). Around 58% of the roughly speaking 1200 responses came from North America and 27% from Europe.

#### Limitations

Like every other survey, the WebAIM screen reader survey is expected to reach a rather deterministic sample only: exclusively screen reader users who somehow got to know about the survey and were eager to fill it out are included. As such, its results may be heavily biased and its representativeness may be limited.

Also, we only gain an outline about rough proportions, but no detailed data about absolute statistics. For example, we can say that there are about twice as many JAWS users than NVDA users. But we cannot say whether the overall number of JAWS users worldwide is rather some ten thousands, some hundred thousands, or some millions.

Also, the difference between desktop and mobile often is not obvious: especially regarding VoiceOver, it often is unclear whether VoiceOver/macOS or VoiceOver/iOS is meant.

Finally, we do not have detailed information about differences between countries and continents, nor any details about specific versions of software being used.

However: even if there are general limitations to the representativeness of the survey, it provides the best currently available data regarding the preferences of screen reader users, particularly in North America and Europe, including the UK.

#### Results for mobile devices

Almost all (86.3%) of the respondents use a screen reader on a mobile device or tablet. That's a greater usage than on laptop (83.9%) or desktop (67.5%).

The reponses to the question "Which of the following mobile screen readers do you commonly use?" show us that VoiceOver/iOS (71.2%) and TalkBack (33.0%) are by far the most popular mobile screen readers.

Regarding the question, which browser is used with the user's primary mobile screen reader, the survey results show that Safari (62.7%) and Chrome (25.2%) are the prevailing mobile browsers.

Respondents with disabilities used iOS devices at a higher rate than those without disabilities. For 69% of them iOS is the primary mobile platform, followed by Android (27.5%).

#### Results for desktop/laptop computers

While most screen reader users now use mobile devices, still almost half of the respondents (41.3%) say that they are using a screen reader on a desktop/laptop computer most often.

The responses to the question "Which of the following desktop/laptop screen readers do you commonly use?" clearly tell us that  NVDA (72.4%) and JAWS (61.7%) are the most popular desktop/laptop screen readers, followed by VoiceOver/macOS (47.1%). Very interestingly, those figures underline many users do use more than one screen reader.

Regarding the question, which browser is used with the user's desktop/laptop primary screen reader, the survey results show that Chrome (44.4%), FF (27.4%) are the prevailing browsers, followed by IE 11 (10.9%) and Safari (9.8%).

Finally, when it comes to the mostly used desktop/laptop browser / screen reader combinations, the survey provides the following data:

- JAWS with Chrome: 21.4%
- NVDA with Firefox: 19.6%
- NVDA with Chrome: 18.0%
- JAWS with IE: 11.5%
- VoiceOver/macOS with Safari: 9.1%
- JAWS with Firefox: 5.9%
- VoiceOver with Chrome: 3.0%
- NVDA with IE: 1.2%
- Other combinations: 10.4%

#### What about IE?

Usage of Internet Explorer has dropped significantly since the last survey (then 23.3%) as primary desktop/laptop browser. As Microsoft ceased to support IE any longer, combinations with IE are no requirement anymore. We leave the references in this guide for documentation purposes. At the time being, all of our examples are tested and are backwards compatible with JAWS with IE.

#### What about Edge?

Accessibility support in Microsoft's current browser Edge was very low upon release. Meanwhile, Edge was improved in some respects. But most screen reader users didn't switch from Internet Explorer yet or switched to other browsers. Edge did not gain sufficient traction to be considered here.

### Software versions

To make the whole topic even more complex, we could ask for combinations of specific software versions of both browsers and screen readers. This would definitely result in an explosion of possible combinations.

Even though having current versions of both screen readers and browsers available is essential for users with special needs, we are aware that many of them keep running legacy versions. This is due to various reasons:

- Many commercial screen readers are very expensive, and license upgrades are affordable only every few years for a lot of users.
    - Even health insurance or social security often do not guarantee their clients to keep their assistive technology equipment up to date: in Switzerland, the invalidity insurance does not sponsor new JAWS licenses at the intervals needed.
- When it comes to installing, configuring, and updating their software, many users with special needs are dependent on assistance.
    - Most users with special needs aren't "digital natives" and are thankful if something "just works".
        - This may change in the future, as people with special needs begin to realise the vast potential of modern technology and the impact it can have on their lives.
    - Much software needed to run assistive devices is not built accessibly itself, making it hard or even impossible to be self-managed by users with special needs.

As it is not feasible to test dozens of possible software versions, we follow a pragmatic way which is to test always the newest stable versions of both browsers and screen readers.

### Diverging requirements in closed environments

In closed environments, where a web application is only exposed to a deterministic group of users, requirements different to the ones outlined above may be feasible.

For example, in a bank, every user may have the same workstation available with default software and configuration; this could be NVDA screen reader and Firefox browser. Alas, for the intranet website of the bank (which is exclusively available from those workstations), only this specific combination needs to be supported.
