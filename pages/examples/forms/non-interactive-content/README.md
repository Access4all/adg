---
navigation_title: "Non-interactive content"
position: 6
changed: "2020-04-30"
---

# Placing non-interactive content between form controls

**Screen reader interaction with forms usually happens in focus mode. So if there are any non-interactive elements (like a paragraph) in the form, they are prone to be missed. To prevent this, they need to be attached specifically to the form controls. There are several ways to achieve this goal.**

[[toc]]

Screen reader users generally interact with form controls using focus mode, meaning they navigate back and forth only between interactive (which are focusable) elements using the `Tab` key (if you haven't done this yet, go back and read [Screen readers' browse and focus modes](/knowledge/screen-readers/desktop/browse-focus-modes)).

Especially in complex forms, it can be necessary to have non-interactive content next to some control: for example paragraphs (or a list) presenting terms and conditions next to an "I agree" checkbox. As this content is not focusable, it is prone to be completely missed by desktop screen reader users when tabbing through the form.

Alas, such content needs to be specifically attached to the form controls, so it is recognisable also in focus mode. There are various approaches to achieve this goal.

## Best approach: ARIA

While we usually do not favour solutions using ARIA over traditional HTML, regarding forms, in our experience ARIA is the most robust way to associate content to controls (if you haven't done this yet, go back and read [ARIA - when HTML simply is not enough](/knowledge/aria)).

It is easy to attach a little descriptive text to any form control using `aria-describedby`:

[Example](_examples/associating-content-to-form-controls-using-aria)

This works very well in all modern browsers and screen readers (if you haven't done this yet, go back and read [Labelling elements using aria-label and aria-labelledby](/examples/sensible-aria-usage/label-labelledby)).

### Referencing structured text

You can use `aria-describedby` on structured text (as you see in the example above, where a list is referenced to the terms and conditions checkbox). Please do not overdo this, because when focusing a form control, screen readers announce all referenced content in one go. And when long contents are referenced, this can quickly become overstraining.

#### Too much referenced content

Take a look at the following example which clearly overdoes the usage of `aria-describedby`:

[Example](_examples/associating-too-much-content-to-form-controls-using-aria)

Admittedly, this example feels a bit artificial. But you get the point: listening to too much information at a time is making tired quickly. To fully understand, the user will have to manually trigger the whole announcement again and again - a very tedious task, especially for people with mental disabilities.

In addition, a lot of semantic information about the referenced elements (that would be announced in browse mode) is not announced this way: while list items are still recognisable by the prefix "bullet", other semantic information is not announced at all (for examples occurrences of headings and links).

#### Giving a short clue instead

Instead of referencing all the information, simply give the user a short clue that there is more information somewhere (below a form control, at the end of the page, or wherever):

[Example](_examples/giving-clue-about-additional-content-in-a-form)

The example above shows three ways to give a user clue about additional information:

1. For "Full name", a clue was appended to the `<label>` and hidden visually.
    - For more information about this, read [Hiding elements visually by moving them off-screen](/examples/hiding-elements/visually).
2. For "Biography", a clue was added anywhere on the page, then hidden completely and referenced to the input using `aria-describedby`.
    - For more information about this, read [Hiding elements from all devices](/examples/hiding-elements/from-all-devices).
3. For "Terms and conditions", the label text was changed so it gives a clue itself (making it "self speaking"). This does not only serve screen reader users, but also visual users who could miss the terms and conditions because of not scrolling enough vertically.

In general, when doing something like that, be sure the referenced content is easily discoverable by the user.

## Less good approaches

The following approaches show solutions that are problematic in some way or another for different users. We highly discourage from following them.

### Making content focusable

When navigating using the `Tab` key, the easiest way to prevent non-focusable content from being skipped may seem to simply make it focusable: add a `tabindex="0"` to a heading, paragraph, list, or whatever, and you should be fine.

[Example](_examples/making-content-focusable)

While this may be tempting, it is very bad style: only elements that provide some interaction (buttons, links, form controls, etc.) should be focusable. Otherwise keyboard only users may be confused, as they may think that (for example) a paragraph can be interacted with, although it cannot.

Also, it is unfortunate that this way the descriptive text of a form control is announced to screen readers **after** perceiving (and possibly interacting with) it.

### Placing more content into labels

HTML allows to put various content into a `<label>`. On one hand, it is possible this way to put a form control right into its label, which even removes the need for the `for` attribute (if you haven't done this yet, go back and read [General good form example](/examples/forms/good-example)).

```html
<label>
  Name
  <input type="text" />
</label>
```

On the other hand (which is more interesting to us), it is also possible to put additional content into it.

```html
<label>
  Name
  <input type="text" />
  Please enter your full real name.
</label>
```

This solution looks very easy and as such is tempting: it does not only solve our requirement, but it also enlarges the clickable area of the label for mouse and touch screen users (clicking on the label places the focus into its control).

[Example](_examples/additional-content-in-form-labels)

Sadly, browser support is buggy:

- In Firefox this works like a charm (both JAWS and NVDA).
    - In the example, the radio buttons for gender are correctly announced, like "Gender grouping. Male. You may be this if you like beer...".
- In Internet Explorer things are messed up when elements are packed into a `<fieldset>`/`<legend>` structure.
    - In the example, the radio buttons for gender are both announced like "Gender. Name. Please enter your full real name."

What a bummer. This is why we recommend to separate form controls and their `<label>` elements strictly and to use the `for` attribute to connect them.

And for associating additional content to a control ("Please enter..."), we advise to stick to better solutions (if you are really curious and want to learn more about this, skip ahead and read [Placing non-interactive content between form controls](/examples/forms/non-interactive-content)), at least if you are using `<fieldset>`/`<legend>` structures.

### More than one label per input

It is perfectly valid HTML to associate more than a single `<label>` element to an input. But Internet Explorer sadly connects only one of them, resulting in incomplete desktop screen reader announcements.

So the following is not a recommended solution:

[Example](_examples/associating-content-to-form-inputs-using-multiple-labels)
