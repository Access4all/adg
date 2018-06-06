---
navigation_title: "How we evaluate JavaScript widgets"
position: 4
changed: "2018-05-09"
---

# How we evaluate JavaScript widgets

**TODO**

Take look at our #{link_to 'widgets section', page_path('widgets_overview')}, where we offer reviews about some well-known 3rd party widgets.


## Test procedure

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

## How we decide what's "annoying" (and how much)

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

## Additional notes

/ markdown:
/   ## Things to consider
/
/   The following text snippets are from the following (old dated, but still very informative) source: [Accessible ARIA Tabs (August 2010)](http://accessibleculture.org/articles/2010/08/aria-tabs/).
/
/   - The [interaction design pattern promoted for ARIA-enabled tabs](http://www.w3.org/TR/2009/WD-wai-aria-practices-20091215/#tabpanel) suggests that just the currently active tab control be found in the Tab order, and that the tab controls be navigable using the arrow keys.
/   - Setting focus to a tab control loads the associated content tabpanel which is otherwise hidden.
/       - In a web page, for most screen readers [...] this means switching to Application Mode.
/           - Yet, because the screen reader is now passing keyboard commands through to the browser, we can no longer use the normal reading commands to access the tabpanel's content.
/           - We can still easily use the Tab key to move to the first form control or focussable element in the tabpanel and interact with it.
/           - However, if a tabpanel contains nothing but regular text content, there is nothing to set focus to using the Tab key.
/           - The user can, of course, manually turn the Virtual Cursor back on, but it is worth noting that setting focus to a non-form or non-application element can accomplish the same thing in some instances; so this suggests a possible workaround, namely including such an element, for example, a heading, in the Tab order at the beginning of the tabpanel content.
/   - Conclusion: there is the impression that there does not appear to be one ideal approach where broad accessibility is concerned. It may be reasonable to include for screen reader users some sort of instructions just before the tabbed interface. Still, the very fact that such instructions should prove useful suggests, I think, that an ARIA-enabled tabbed interface might for now just get in the way of a usable experience for too many users. To sum up, in none of the versions presented here will the experience necessarily be clear and obvious for all users with all screen readers, and especially not for older versions.
/
/
/   Frage: GEHT JAWS IMMER IN DEN APP MODUS, EGAL WIE DAS WIDGET PROGRAMIERT IST?!
/   Frage: IST NVDA IM IE IMMER SO EXTREM LANGSAM?!
/   Da hat es evtl. gute zugängliche Widgets: http://accessibility.athena-ict.com/aria/aria-examples-index.shtml
/   Nur fancy ARIA Tabs benutzen, wenn es sich tatsächlich um eine Webapp mit vielen, vielen Tabs handelt! Sonst besser nahe bei traditionellem HTML bleiben. (Kommentar von Jan Hellbusch im Mail vom 21.10.2015, 14:33)
/   Sowohl JAWS als auch NVDA scheinen Meta-Infos unabhängig von Seitensprache auszugeben