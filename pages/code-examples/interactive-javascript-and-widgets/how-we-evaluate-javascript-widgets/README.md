---
layout: layout
title: "How we evaluate JavaScript widgets"
---

# How we evaluate JavaScript widgets

Take look at our #{link_to 'widgets section', page_path('widgets_overview')}, where we offer reviews about some well-known 3rd party widgets.


# Test procedure

 - We test with the most current software available at the time of testing (unless stated otherwise)
 - We use the method of elimination by searching for specific annoyances:
   - neglectable annoyances are written down but don't affect the final verdict
    - killer annoyances result in the immediate end of the review and the rating of **Not recommended**
 - Sometimes, a widget is recommended for specific circumstances, which results in a partial recommendation, like **For applications only**
 - When no killer annoyance is found under any test circumstance, then the widget is rated as **Recommended**
 - We conduct tests in parallel under different testing circumstances, e.g.
    - a blind user
    - a seeing keyboard-only user
    - a "normal" user
 - We compare our individual findings with those of the parallel testers

# How we decide what's "annoying" (and how much)

  - Something is neglectably annoying when:
      - something generally works, but it could be improved obviously, e.g.
            - information that is announced redundantly
            - behaviour that is not expected, but after you know about it, it generally is usable
  - Something is "killingly" annoying when:
      - announced information is wrong (e.g. announcement of status "collapsed" for an expanded item)
      - announced information is not sufficient (e.g. missing feedback when activating an item)
      - items don't behave the same way all the time (e.g. activating an item toggles focus mode on and off randomly, or something is buggy)
      - too much browser or screenreader standard functionality is intercepted (e.g. by intercepting commonly used keyboard keys or shortcuts for custom behaviour)

**Notice:** While we are trying to represent as many different use cases, our results may still be very opinional and based on our own experiences and views. Keep in mind that you may have requirements (be it human or technical) different from ours.