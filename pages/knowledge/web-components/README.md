---
navigation_title: 'Web Components'
position: 5
---

# Web Components

**"Web Components" is an umbrella term for three main technologies: Custom elements, Shadow DOM and HTML templates. Using these technologies allows us to create reusable, optionally encapsulated components. There are some important caveats regarding accessibility we need to keep in mind when authoring web components.**

[[_TOC_]]

## The main technologies

[mdn](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) has the most useful overview of the underlying technologies. It is important to understand that they can be used

### Custom Elements

> One of the key features of web components is the ability to create custom elements: that is, HTML elements whose behavior is defined by the web developer, that extend the set of elements available in the browser.
>
> <cite>[Using custom elements (mdn)](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)</cite>

### Shadow DOM

> An important aspect of custom elements is encapsulation, because a custom element, by definition, is a piece of reusable functionality: it might be dropped into any web page and be expected to work. So it's important that code running in the page should not be able to accidentally break a custom element by modifying its internal implementation. Shadow DOM enables you to attach a DOM tree to an element, and have the internals of this tree hidden from JavaScript and CSS running in the page.
>
> <cite>[Using shadow DOM (mdn)](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)</cite>

### HTML templates

> When you have to reuse the same markup structures repeatedly on a web page, it makes sense to use some kind of a template rather than repeating the same structure over and over again. This was possible before, but it is made a lot easier by the HTML \<template\> element. This element and its contents are not rendered in the DOM, but it can still be referenced using JavaScript.
>
> <cite>[Using templates and slots
> (mdn)](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots)</cite>

## Web Components and accessibility

Web components have great potential to help us improve accessibility as they are framework-agnostic. This allows us to _share_ accessible components with everyone, independent of which UI framework they use. However, when using shadow DOM (which is absolutely not a requirement), we need to be aware of the limitations when attempting to cross "shadow boundaries". Specifically, we cannot yet easily link elements outside of a shadow root with elements within.

Manuel Matuzović created a [great list of FAQ](https://www.matuzo.at/blog/2023/web-components-accessibility-faq) with helpful examples.
