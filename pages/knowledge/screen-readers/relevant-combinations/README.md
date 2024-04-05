---
navigation_title: "Relevant combinations"
position: 2
---

# Relevant combinations of screen readers and browsers

**To reach as many users as possible, it's a pragmatic approach to support the most widely used combinations of browsers and screen readers. Here you learn, which those are. Other requirements may only apply in closed environments that are only open to a specific, deterministic group of users.**

[[_TOC_]]

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

The initiative [Web Accessibility In Mind (WebAIM.org)](https://webaim.org/){ target=_blank } conducts regular surveys among users of assistive software, which gives us at least some insight into the topic.

The most recent survey was conducted in December 2023 and January 2024 ([WebAIM's Screen Reader User Survey #10](https://webaim.org/projects/screenreadersurvey10/){ target=_blank }). Around 47% of the roughly speaking 1500 responses came from North America and 31% from Europe.

#### Limitations

Like every other survey, the WebAIM screen reader survey is expected to reach a rather deterministic sample only: exclusively screen reader users who somehow got to know about the survey and were eager to fill it out are included. As such, its results may be heavily biased and its representativeness may be limited.

Also, we only gain an outline about rough proportions, but no detailed data about absolute statistics. For example, we can say that there are slightly more JAWS users (40.5%) than NVDA users (37.7%). But we cannot say whether the overall number of JAWS users worldwide is rather some ten thousands, some hundred thousands, or some millions.

Also, the difference between desktop and mobile often is not obvious: especially regarding VoiceOver, it often is unclear whether VoiceOver/macOS or VoiceOver/iOS is meant.

Finally, we do not have detailed information about differences between countries and continents, nor any details about specific versions of software being used.

However: even if there are general limitations to the representativeness of the survey, it provides the best currently available data regarding the preferences of screen reader users, particularly in North America and Europe, including the UK.


#### Results for mobile devices

Almost all (91.3%) of the respondents use a screen reader on a mobile device or tablet.

##### **Mobile screen readers commonly used**

- VoiceOver: 70.6%
- TalkBack: 34.7%
- Commentary/Jieshuo: 10.1%
- Other mobile screen readers: 24%

##### Mobile/tablet platform

- Apple iOS: 70.6%
- Android: 27.6%
- Chrome OS: 0.5%
- Other mobile/tablet platforms: 1.3%

##### Primary mobile web browser

- Safari: 58.2%
- Chrome: 27.9%
- Firefox: 4.6%
- Other mobile web browsers: 9.3%

See [webaim.org/projects/screenreadersurvey10/#mobile](https://webaim.org/projects/screenreadersurvey10/#mobile){ target=_blank } for more details.


#### Results for desktop/laptop computers

While most screen reader users now use mobile devices, still almost half of the respondents (40.2%) say that they are using a screen reader on a desktop/laptop computer most often.

##### **Desktop/laptop screen readers commonly used**

- NVDA: 65.6%
- JAWS: 60.5%
- VoiceOver: 43.9%
- Narrator: 37.3%
- Other desktop/laptop screen readers: 33.1%

##### **Screen reader/browser combinations**

- JAWS with Chrome: 24.7%
- NVDA with Chrome: 21.3%
- JAWS with Edge: 11.4%
- NVDA with Firefox: 10.0%
- VoiceOver with Safari: 7.0%
- NVDA with Edge: 5.0%
- JAWS with Firefox: 2.6%
- VoiceOver with Chrome: 2.0%
- Other combinations: 16.0%

##### Operating system

- Windows: 86.1%
- Mac: 9.6%
- Linux: 2.9%
- Other operating systems: 1.4%

##### Primary browser

- Chrome: 52.3%
- Microsoft Edge: 19.3%
- Firefox: 16.0%
- Safari: 8.0%
- Other browsers: 4.4%

See [webaim.org/projects/screenreadersurvey10/#primary](https://webaim.org/projects/screenreadersurvey10/#primary){ target=_blank } for more details.
