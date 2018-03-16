---
layout: layout
title: "Safe and misusage of ARIA"
navigation_title: "Safe and misuse"
position: 3
lead: "There are certain situations where ARIA is a good (and maybe the only) way to go. But if done wrong, usage of ARIA most often leads to even worse accessibility. Especially accessibility novices tend to misuse ARIA to optimise smelly code. Here we explain some of the typical dos and don'ts."
---

# Safe and misusage of ARIA

# Safe usage

There are a few `aria-*` attributes that fill some gaps HTML doesn't provide a native solution for. Working pretty reliably in modern browsers and screen readers, the following attributes can be recommended as safe to use:

- `aria-label` and `aria-labelledby` are used to label an element
- `aria-describedby` is used to add description to an element
- `aria-expanded` is used to describe an element's expand/collapse status
- `aria-hidden` is used to hide non-focusable elements (including children) from screen readers

But always remember: there are only very rare situations where HTML isn't enough. In those (and only those) situations, using ARIA is advised. In any other situation, when using a clean and semantically correct HTML structure can provide for a situation, using ARIA is strongly discouraged. This is due to its heterogenous support among browsers and screen readers (see above).

If you are really curious and want to learn more about this, skip ahead and read [Sensible Usage of ARIA Roles and Attributes](/examples/sensible-usage-of-aria-roles-and-attributes){.page}.

# Misusage

One last problematic topic with ARIA is that it is often misunderstood as "general repair kit" for accessibility problems. Developers new to accessibility usually think that ARIA that can be used to fix accessibility problems for all sorts of bad HTML code. In general though, throwing some ARIA attributes into the mix of bad semantics doesn't leverage any problem. Most of the time, the exact opposite is the case.

## Fixing broken semantics

ARIA isn't meant to be used to "fix" standard elements that lack semantical meaning.

Let's look again at an example of a link that isn't properly marked up as such. But this time, it is spiced up with `role="link"`:

```html
<span class="link" onclick="..." role="link">
  Google
</span>
```

Admittedly, this makes screen readers announce the element as link. But still, this approach is missing a lot of standard functionality: it isn't focusable, it needs custom JavaScript, browser history may be broken, just to name a few. And legacy screen readers may have no support for `role="link"` anyway.

So remember: adding ARIA to add missing semantical meaning is never a good solution. Always use the proper HTML tag itself!

## Adding redundant semantics

We also sometimes see overzealous developers adding redundant ARIA roles to elements, thinking it would enhance accessibility:

```html
<form role="form">
  ...
</form>

<a href="..." role="link">
  Google
</a>
```

It doesn't - quite the contrary often is the case, as screen readers seem to behave buggy from stuff like this.

## Modifying content

It sometimes may seem tempting to modify the content of elements using ARIA.

In the following artificial example, a lazy developer doesn't feel like developing an accessible zoom function. Feeling clever, they think that a zoom functionality isn't of relevance to blind users anyway. Using `aria-label`, they simply overwrite the zoom button's content:

```html
<button aria-label="Dear screen reader user, please don't use this functionality, it isn't meant for you">
  Zoom image
</button>
```

The first problem with this is the fact that screen readers have no idea now what "this functionality" might be. You could easily fix that by naming the functionality in the text though: "Please don't use this zoom functionality".

But surprisingly, a zoom function indeed is used among blind users! They like to download images like many other users do, for sending them to somebody else or for using them in some other context.

Generally speaking: it is very questionable to treat different users differently regarding accessibility. In the very most cases, you should treat every user the same, even if you feel like it doesn't make much sense for some of them. One solution working for all is what we're propagating throughout this guide.

Admittedly, a valid usage of `aria-label` could be to provide additional, more precise information to screen reader users:

```html
<button aria-label="Zoom image: opens a high resolution version, press Esc to close">
  Zoom image
</button>
```

But also this case could be even better: why not present this information to every user, for example using a tooltip that displays on focus/hover?

```html
<button>
  Zoom image
  <span class="tooltip">Opens a high resolution version, press Esc to close</span>
</button>
```

In most cases holds true: if you face a situation where a screen reader user would need different information to other users, you're probably on the wrong track. And if you are thinking about enhancing existing information, there still may be better ways than using ARIA - ways that provide use to all users, and as such are working for all.

# Conclusion: caution with ARIA!

ARIA is an intriguing approach to make the web a more accessible place. In most situations though, it is neither needed (because there are usually better ways to achieve the wanted result) nor useful (because browser and screen reader support is still shaky).