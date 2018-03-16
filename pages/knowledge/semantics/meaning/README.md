---
layout: layout
title: "Semantics provide meaning"
navigation_title: "Meaning"
position: 1
lead: "HTML (not surprisingly) is a markup language. This means, that it's not only plain text, but text marked up with meaning - so called \"semantics\". For this, HTML offers a lot of tags, each with an inherent, unique meaning. And it is absolutely crucial that those tags are used properly."
---

# Semantics provide meaning

# Tags without meaning

To understand the importance of proper semantics, let's first look at the exceptions: tags that indeed do not provide semantical information.

There are only two tags in HTML that don't have any meaning: `<div>` and `<span>`. Their purpose is to offer containers needed for visual styling. And their only difference is that `<div>` is a block element, while `<span>` is an inline element.

Take a look at the following example:

```html
<div>
  My hobbies
</div>

<div>
  Dancing
</div>

<div>
  Playing soccer
</div>
```

![Screenshot of non-semantical example](_media/screenshot-of-non-semantical-example.png){.image}

A visual user agent (web browser) displays such elements' text contents (if any) in their standard font size, line height, color, etc.

An aural user agent (screen reader) simply announces such elements' text contents (if any). This will simply be announced as:

> My hobbies
>
> Dancing
>
> Playing soccer

In this case, both visual and aural presentation provide identical results to the user.

# Tags with meaning

Let's take a look at the same example, now marked up using heading tags (`<h1>`, `<h2>`, etc.):

```html
<h1>
  My hobbies
</h1>

<h2>
  Dancing
</h2>

<h2>
  Playing soccer
</h2>
```

Marking up text using an `<h#>` tag tells the user agent that this isn't just plain text, but - in fact - a heading of a certain level!

![Screenshot of semantical example](_media/screenshot-of-semantical-example.png){.image}

A web browser conveys this additional information visually by increasing the element's font size, line-height and boldness (depending on the heading's level).

A screen reader conveys this additional information by announcing the element's meaning:

> My hobbies: heading level 1
>
> Dancing: heading level 2
>
> Playing soccer: heading level 2

In this case, while visual and aural presentation may feel quite different, the provided information essentially remains identical: both dancing and playing soccer are clearly identifiable as hobbies.

# Typical problems

## Missing semantics

It is very important to acknowledge that while visual attributes are displayed in web browsers, screen readers don't care about them. Regardless whether text has `color: blue` or `color: red`, whether it is `font-size: 1px` or `font-size: 100px`, whether it has a `border` or a `text-shadow`, it's always announced as plain text. Only if it is marked up with semantics, screen readers do care.

Let's look at the following example, where the developer may not have felt like overriding default browser styles. So they decided to avoid real headings and just apply some visual attributes to meaningless containers:

```css
.h1 {
  font-size: 20px;
}

.h2 {
  font-size: 17px;
}
```

```html
<div class="h1">
  My hobbies
</div>

<div class="h2">
  Dancing
</div>

<div class="h2">
  Playing soccer
</div>
```

In this case, while visual presentation may look like proper headings, screen readers won't announce them as such. So the provided information is by no means identical: screen reader users are left behind, as the contents are in no identifiable relation to each other. Precisely: they will simply understand that there are hobbies, there is dancing, and there is playing soccer (but not necessarily that dancing and playing soccer are hobbies).

## Wrong semantics

Another problem that occurs a lot is wrong semantics. Look at the following example

Let's look at the following example, where the developer wanted to get higher rankings in search engines. So they decided to use only headings on level 1 and just override some visual attributes for lower levels:

```css
.h2 {
  font-size: 17px;
}
```

```html
<h1>
  My hobbies
</h1>

<h1 class="h2">
  Dancing
</h1>

<h1 class="h2">
  Playing soccer
</h1>
```

In this case, while visual presentation may still look like proper headings, screen readers will only announce headings on level 1! Again, the provided information isn't identical: screen reader users will have trouble to relate the different headings to each other properly. Precisely: again, they won't know that dancing and playing soccer are meant to be hobbies.

Needless to say that today's search engines know about such trickeries and penalise them.

## Invalid semantics

Browsers are very forgiving with invalid HTML code. This is a good thing, as it allows everybody (including non-professionals) to participate in the worldwide exchange of knowledge through the internet.

For example, the following table is coded extremely badly, because all closing tags are missing:

```html
<table>
<tr>
  <td>Apples
  <td>Pears
<tr>
  <td>Carots
  <td>Potatoes
```

![Screenshot of invalid semantical example](_media/screenshot-of-invalid-semantical-example.png){.image}

But most browsers still visually render it correctly.

Still, HTML is a very strict standard and must be coded correctly to be truly valid. And again, screen readers are much more dependent on valid HTML code, and mistakes like the ones above often lead to big problems.

# Conclusion: semantics over presentation!

The example above is artificial and doesn't have any real content, so it may not seem very drastic. But real websites often feel like an unmitigated mess (or a textual tapeworm) to screen reader users because of missing, wrong and invalid semantics.

In addition to this, proper semantics allow the user to navigate content quickly. For example by skipping the current list of links, or by jumping from heading to heading to get an overview of the webpage's contents. This provides the opportunity to choose which content should be digested, improving the general user experience a lot.

So to create accessible websites, it is highest priority to provide correct semantics, while presentation always has lower priority. Please live with that.