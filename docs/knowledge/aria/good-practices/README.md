---
navigation_title: "Good practices"
position: 2
changed: "2018-05-30"
---

# Good ARIA practices

**There are a few ARIA features that truly fill some gaps HTML does not provide a solution for. Working pretty reliably in modern browsers and screen readers, some techniques can be recommended as safe to use.**

While ARIA is not needed most of the time when developing accessible websites, it can help in certain situations to make the user experience better for screen readers.

The ARIA techniques that have proven to be useful and robust will be explained in detail throughout the 4th part of this guide, [Examples of accessibility patterns](/examples), specifically in [Sensible usage of ARIA roles and attributes](/examples/sensible-aria-usage). We are carefully using ARIA here and there to optimise some of our proposed examples; this is especially true for our widgets, which are all made of traditional HTML form controls, spiced up with some JavaScript and ARIA, see [Interactive widgets](/examples/widgets).

## Conclusion: be careful with ARIA!

There are only rare situations where HTML is not enough. In those (and only those) situations, using ARIA is advised. In other situations, when the use of a clean and semantically correct HTML structure can provide a solution, usage of ARIA is strongly discouraged. This is due to its non-homogenous support among browsers and screen readers.