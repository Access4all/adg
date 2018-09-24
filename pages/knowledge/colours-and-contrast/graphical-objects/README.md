---
navigation_title: "Graphical objects"
position: 5
changed: "2018-08-12"
---

# Contrast requirements of graphical objects

**Like for user interface components, the recently published version 2.1 of Web Content Accessibility Guidelies (WCAG) has added colour contrast requirements for graphical objects.**

There is not much value to graphical objects on a page, if a user can not perceive them. Alas, graphical objects need a contrast ratio of at least `3:1` against adjacent color(s).

## Status through color

In the following example, the availability status of elements in a shop list is indicated using a red or green dot; green standing for "ok", red standing for "not ok".

![Shop list with colour coded elements](_media/low-contrast-shop-list.png)

### Enhancing perceivability

First of all: while the red colour has a contrast of `4:1` (which is good), the green colour has only a contrast of `2.1:1` (which is not enough).

An easy way to improve this is to add borders around the elements:

- Either in a darker green (and, if wanted, red), as seen on the left side of the following screen shot.
- Or by any other colour that has enough contrast (like black), as seen on the right side of the following screen shot.

![Elements with darker borders](_media/shop-list-borders.png)

Let's stick with the black borders for the time being.

![Shop list with colour coded elements](_media/shop-list.png)

For now, the elements are clearly perceivable - but can they be distinguished from each other?

### Enhancing distinctiveness

The red and green colours have a contrast ratio of `2.0:1`, which is not sufficient. Alas, a user with a severe colour deficiancy would not be able to recognise whether an element is available or not.

You could try to fix the problem by experimenting with the colours until you find a combination with enough contrast. But this would probably suffer the visual design - and as additional statuses occur, this quickly becomes a dead-end.

By the way: always be careful with meaning conveyed solely through colour! In other cultures, colours may be used differently to yours. Alas, always offer a legend with descriptive texts so the meaning is independent from cultural backgrounds.

#### Adding text information

You could simply add text information to each dot, conveying its status. This would even render the legend obsolete.

![Shop list with text status](_media/shop-list-with-text.png)

In general though, this somehow feels like redundant information.

#### Adding shape information

Instead of simply using a coloured dots, we could use a different shape for each status.

In the following example, a tick sign is used for "ok", and a dot for "not ok".

![Shop list with shapes](_media/shop-list-with-shapes.png)

#### Adding pattern information

Another possible solution is to use a different pattern for each status.

In the following example, a vertical pattern is used for "ok", and a horizontal one for "not ok".

![Shop list with patterns](_media/shop-list-with-patterns.png)

Needless to say that such patterns also need to be contrasty enough.

## More colors!

Another frequent example of colours conveying meaning is visual charts.

For example, a pie chart has three sections, described using a legend and referenced using colours like this:

- Male (red)
- Female (blue)
- Other (green)

![Low contrast pie chart](_media/low-contrast-pie-chart.png)

To a visually non-impaired user, this pie chart should not pose any problem. But the colour contrasts are way too low:

- Red/blue is `1.1:1`
- Blue/green is `1.5:1`
- Green/red is `1.7:1`

This is due to the fact that colours are no key factor for calculating contrast. So even with only a few sections you will quickly run out of high contrast combinations. Again, we can use similar techniques like above to solve this situation.

First of all you should add a clearly visible stroke around the sections.

![Pie chart with stroke](_media/pie-chart-with-stroke.png)

Still, the colours cannot be related successfully by people with low contrast vision. To make up for this, you can either place the descriptions right inside the sections...

![Pie chart labels inside](_media/pie-chart-with-labels-inside.png)

...or draw lines between the sections and their respective descriptions.

![Pie chart with connected labels](_media/pie-chart-with-connected-labels.png)

And again, adding background patterns can be very useful.

![Pie chart with patterns](_media/pie-chart-with-patterns.png)

# Conclusion

Colour contrasts can either be enhanced to be perceivable enough. Or they can be complemented with additional visual indicators, so the colours themselves do not need to be contrasty anymore.
