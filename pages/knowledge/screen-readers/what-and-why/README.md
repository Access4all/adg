---
navigation_title: "What and why"
position: 1
changed: "2020-04-07"
---

# What screen readers are - and why they are so important to accessibility testing

**Blind people are only one of many groups of people with special needs. Still, to develop and test accessible websites, screen readers are considered the most important addition to a web developer's toolset. But why is that? And what are screen readers anyway?**

[[toc]]

## What are screen readers?

> A screen reader is a form of assistive technology which is essential to people who are blind, as well as useful to people who are visually impaired, illiterate, or have a learning disability. Screen readers are software applications that attempt to convey what people with normal eyesight see on a display to their users via non-visual means, like text-to-speech, sound icons, or a Braille device.
>
> <cite>[Screen reader (Wikipedia.org)](https://en.wikipedia.org/wiki/Screen_reader)</cite>

## Why are they so important?

Screen reader tests are considered the "litmus tests" in the development of accessible user interfaces.

> If you say that something is a litmus test of something, you mean that it is an effective and definite way of proving it or measuring it.
>
> <cite>[Litmus test definition and meaning (CollinsDictionary.com)](https://www.collinsdictionary.com/dictionary/english/litmus-test)</cite>

So to say, if a website can be read and operated by a screen reader, it can be considered pretty accessible (regarding non-visual aspects). Screen reader compliant websites comply with a lot of requirements that are not only important to visually impaired people, but also to many other groups of people with special needs.

In addition, while modern web browsers are pretty forgiving with malformed website code, screen readers tend to expose such weaknesses like invalid syntax or missing/wrong semantics pitilessly (if you haven't done this yet, go back and read [Semantics provide meaning](/knowledge/semantics/meaning)). So they are a good tool to test the overall quality and validity of the code.

Still, there are a few areas that cannot be validated with screen readers and thus need some special attention on their own (mainly visual aspects, such as the usage of colour, contrasts, and some audio and video requirements, just to name a few).

## Mobile vs. desktop screen readers

There is various screen reader software available, which can roughly be divided into mobile and desktop applications. Some of them are preinstalled and deeply integrated into the operating system, while others are 3rd party software. Both mobile and desktop screen readers share a lot of their behaviour. Still, they have some fundamental differences.

Mobile screen readers are relatively easy to use. As such, they are predestined for accessibility beginners, and they reveal already a lot of potential accessibility issues.

Desktop screen readers are rather complex to use. As such, they require quite some effort to be handled properly. In the end, they reveal the most potential accessibility issues.

## Conclusion

If you want to design modern accessible websites, you won't get around learning how to use screen readers, both mobile and desktop ones. Our guide will be a huge help for this.
