---
navigation_title: "Graphical objects"
position: 5
changed: "2018-08-12"
---

# Contrast requirements of graphical objects

**Like for user interface components, the recently published version 2.1 of Web Content Accessibility Guidelies (WCAG) has added colour contrast requirements for graphical objects.**

There is not much value to graphical objects on a page, if a user can not perceive them. Alas, graphical objects need a contrast ratio of at least `3:1` against adjacent color(s).

## Colours as references

For example, a pie chart has three sections, described using a legend and referenced using colours like this:

- Male (red)
- Female (blue)
- Other (green)

![Low contrast pie chart](_media/low-contrast-pie-chart.png)

To a visually non-impaired user, this pie chart should not pose any problem. But the colour contrasts are way too low:

- Red/blue is `1.1:1`
- Blue/green is `1.5:1`
- Green/red is `1.7:1`

This is due to the fact that colours are no key factor for calculating contrast. So even with only a few sections you will run out quickly of high contrast combinations.

## Working arround low contrasts

First of all you should add a clearly visible stroke around the sections. This way the sections' colours do not need to have high contrast against each other anymore.

![Pie chart with stroke](_media/pie-chart-with-stroke.png)

Still, the colours cannot be assigned successfully by people with low contrast vision. To make up for this, you can either place the descriptions right inside the sections...

![Pie chart labels inside](_media/pie-chart-with-labels-inside.png)

...or draw lines between the sections and their respective descriptions.

![Pie chart with connected labels](_media/pie-chart-with-connected-labels.png)

## Adding background patterns

In other cases, adding a unique background pattern to both each section and the respective labels in the legend can be very useful. Needless to say that such patterns also need to be contrasty enough.

![Pie chart with patterns](_media/pie-chart-with-patterns.png)
