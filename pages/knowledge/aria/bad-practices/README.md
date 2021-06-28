---
navigation_title: "Bad practices"
position: 3
changed: "2018-04-12"
---

# Bad ARIA practices

**There are certain situations where ARIA is a good (and maybe the only) way to go. But if done wrong, usage of ARIA often leads to even worse accessibility. Especially accessibility novices tend to misuse ARIA to "optimise" smelly code.**

[[toc]]

ARIA is often misunderstood as "general repair kit" for accessibility problems. Developers new to accessibility usually think that ARIA can be used to fix accessibility problems for all sorts of bad HTML code. In general though, throwing some ARIA attributes into the mix of bad semantics does not leverage any problem (most of the time, the exact opposite is the case).

## Fixing broken semantics

ARIA is not meant to be used to "fix" standard elements that lack semantical meaning.

Let's look again at an example of a link that is not properly marked up as such. But this time, it is spiced up with `role="link"`:

```html
<span class="link" onclick="..." role="link">
  Google
</span>
```

Admittedly, this makes screen readers announce the element as link. But still, this approach is missing a lot of standard functionality: it is not focusable, it needs custom JavaScript, browser history may be broken, just to name a few. And legacy screen readers may have no support for `role="link"` anyway.

So remember: using ARIA to add missing semantical information is never a good solution. Always use the proper HTML tag itself!

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

It does not - quite the contrary is often the case, as screen readers seem to behave buggy from stuff like this.

## Adding missing labels

ARIA offers ways to label elements, for example `aria-label`. This means adding text to (or sometimes changing an existing text of) an element. This label is then announced by screen readers. Alas, it may be tempting to add such labels to all elements on a page that are missing descriptive text themselves.

For example, the following link points to a shopping cart. It offers a visual label through a CSS background image (displaying a shopping cart icon), but it has no "real" text label:

```css
a.cart {
  background: url("cart.png"); /* Image contains shopping cart icon */
}
```

```html
<a class="cart">
  <!-- No real text here, screen readers will only announce "link" -->
</a>
```

### Approach using ARIA

To make the image accessible, it could be tempting now to simply add an ARIA label:

```html
<a class="cart" aria-label="Shopping cart">
  <!-- Still no real text here, but screen readers will now announce "Shopping cart link" -->
</a>
```

If you are really curious and want to learn more about this, skip ahead and read [Labelling elements using aria-label and aria-labelledby](/examples/sensible-aria-usage/label-labelledby).

While this certainly is an improvement over offering no label at all, it is not the technique of choice. This is due to several reasons, some very obvious ones outlined here:

- First of all, ARIA labels are only visible to screen readers.
    - But a text browser (unable to display background images) would still not be able to convey a link label to the user.
    - And legacy screen readers may even lack backwards compatibility for ARIA.
- What about users with bad internet connection?
    - If for some reason the CSS or images cannot be loaded, they are also unable to understand the link's purpose.
- Furthermore, commonly used browser tools may not work with ARIA.
    - For example, people using the search of their browser wouldn't be able to look for a link with the name "shopping cart", as the browser does not search within ARIA labels.

### Approach using visually hidden text

Again, there are traditional techniques to achieve the wanted result that are much more robust. In the case of our example, simply add a real text label, and hide it visually:

```html
<a class="cart">
  <span class="visually-hidden">Shopping cart</span>
</a>
```

If you are really curious and want to learn more about this, skip ahead and read [Hiding elements visually by moving them off-screen](/examples/hiding-elements/visually).

### Approach using a real image

An even more robust way in case of bad internet connection is to not use a CSS background image, but a "real" image with an alternative text:

```html
<a class="cart">
  <img src="cart.png" alt="Shopping cart" />
</a>
```

The downside to this is that it is not searchable with the browser.

### Approach using a combination

You still could combine both techniques to cover all possible problems outlined above:

```html
<a class="cart">
  <img src="cart.png" alt="Shopping cart" />
  <span class="visually-hidden">Shopping cart</span>
</a>
```

This may feel a bit over-engineered, it also leads to redundancy in screen readers. But if you want to go the extra mile, it is a perfectly valid approach: it is better to have a little bit of redundant information than no information.

### Conclusion

As you can see, there sometimes are cases that offer several traditional solutions with various pros and cons. Usually though each one (or a combination) of them is better than using ARIA.

Generally speaking, adding labels using ARIA is a case of treating disabled users differently to other users, which is never a good thing (see below).

## Treating disabled users differently

It sometimes may seem tempting to give a different user experience to some user group - or to hide some functionality completely using ARIA.

In the following artificial example, lazy developers do not feel like developing an accessible zoom function. Feeling clever, they think that a zoom functionality is not of relevance to blind users anyway. Using `aria-label`, they simply override the zoom button's content:

```html
<button aria-label="Dear screen reader user, please do not use this functionality, it is not meant for you">
  Zoom image
</button>
```

The first problem with this is the fact that screen readers will not have an idea about what "this functionality" might be. You could easily fix that by naming the functionality in the text though: "Please do not use this zoom functionality".

But surprisingly, a zoom function indeed is used among blind users! They like to download images like many other users do (even in high resolution), for sending them to somebody else or for using them in some other context.

Generally speaking: it is very questionable to treat different users differently regarding accessibility. In the very most cases, you should treat every user the same, even if you feel like it does not make much sense for some of them. In line with [Universal Design (Wikipedia.org)](https://en.wikipedia.org/wiki/Universal_design), "one solution working for all" is what we are propagating throughout this guide, with as few special treatments as possible.

So in most cases this holds true: if you face a situation where a screen reader user will be presented with different information or functionality than other users, you are most probably on the wrong track.

## Hiding focusable elements

Sometimes, developers try to hide focusable elements (or elements that contain focusable children) from screen readers using `aria-hidden`. This leads to unpredictable behaviour in many screen readers, as the browser still allows to focus such elements using the `Tab` key, but because of `aria-hidden` screen readers will not announce it.

If you are really curious and want to learn more about this, skip ahead and read [Hiding elements from screen readers using aria-hidden](/examples/hiding-elements/from-screen-readers).
