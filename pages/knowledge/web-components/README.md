---
navigation_title: 'Web Components'
position: 5
---

# Web Components

**"Web Components" is an umbrella term for three main technologies: Custom elements, shadow DOM and HTML templates. Using these technologies allows us to create reusable, optionally encapsulated components. There are some important caveats regarding accessibility we need to keep in mind when authoring web components.**

[[_TOC_]]

## The main technologies

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) has the most useful overview of the underlying technologies. It is important to understand that they can be used independently of each other. There is absolutely no need to use shadow DOM when writing web components. At the same time, shadow DOM can be used outside of custom elements, too.

### Custom Elements

> One of the key features of web components is the ability to create custom elements: that is, HTML elements whose behavior is defined by the web developer, that extend the set of elements available in the browser.
>
> <cite>[Using custom elements (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)</cite>

Example of a custom element formatting an ISO date string in the user's locale:

[Example](_examples/custom-element)

### Shadow DOM

> An important aspect of custom elements is encapsulation, because a custom element, by definition, is a piece of reusable functionality: it might be dropped into any web page and be expected to work. So it's important that code running in the page should not be able to accidentally break a custom element by modifying its internal implementation. Shadow DOM enables you to attach a DOM tree to an element, and have the internals of this tree hidden from JavaScript and CSS running in the page.
>
> <cite>[Using shadow DOM (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)</cite>

Example of above custom element using (declarative) shadow DOM:

[Example](_examples/shadow-dom)

The global color styles for `time` are not applied because our element is rendered in shadow DOM. This is one of the main use cases of shadow DOM.

### HTML templates

> When you have to reuse the same markup structures repeatedly on a web page, it makes sense to use some kind of a template rather than repeating the same structure over and over again. This was possible before, but it is made a lot easier by the HTML \<template\> element. This element and its contents are not rendered in the DOM, but it can still be referenced using JavaScript.
>
> <cite>[Using templates and slots
> (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots)</cite>

Our example with declarative shadow DOM above is already using a `template` element. For client-side rendering (where there is no _declarative_ shadow DOM involved) we do not need a `template` in every instance of `date-formatted`. Instead, we only need a single one and clone it into every instance.

[Example](_examples/template)

## Browser support

Overall, above technologies are well supported in current browsers. Though aspects like _declarative shadow DOM_ have [just recently landed](https://caniuse.com/declarative-shadow-dom) in all major browsers at the time of writing (April 2024). Declarative shadow DOM allows us to render shadow DOM server-side rather than relying on client-side JavaScript.

## Web Components and accessibility

Web components have great potential to help us improve accessibility as they are framework-agnostic. This allows us to _share_ accessible components with everyone, independent of which UI framework they use.

However, when using shadow DOM, we need to be aware of the limitations of crossing "shadow boundaries". Specifically, we cannot yet easily link elements outside of a shadow root with elements within. There is ongoing specification work regarding associating [labels and form elements in particular](https://github.com/whatwg/html/issues/3219) or [any DOM elements using ARIA attributes](https://github.com/WICG/aom/issues/192), to give two examples.

Manuel Matuzović gives the following recommendation in his [great list of FAQ](https://www.matuzo.at/blog/2023/web-components-accessibility-faq):

> If all your relationships for an element happen exclusively in light DOM or shadow DOM and you don't try to cross boundaries, working with ARIA is not a problem.

Additionally, some testing tools are not yet able to handle shadow DOM. In many cases, this should be straight-forward to fix. Exemplary issue: `document.querySelectorAll(SELECTOR)` will not find nodes within a shadow root. To find all elements matching `SELECTOR` on the page, the query code additionally needs to find all shadow roots and execute `root.querySelectorAll(SELECTOR)` on each of them recursively.
