---
navigation_title: "Single-page Applications"
position: 7
changed: "2018-09-26"
---

# Optimizing Single-page Applications for accessibility

**Single Page Applications, short SPA, are applications that consist of one HTML page that loads it's contents dynamically JavaScript. As this differs from the navigation of a usual website, you need to make additional enhancements to make the navigation accessible for screen reader users.**

## The problem

When a screen reader user navigates between multiple HTML document, the screen reader is aware of the page changes and notifies the users about the page change. In single page applications, there is no real page change happening. Instead, content is added to the DOM and possibly, the URL is changed dynamically.

Without further optimizations of those applications, the screen reader will just stay silent. There are different approaches to fix this issue in a SPA.

### Solution 1: Change focus to H1

One approach to notify the screen reader about a change is to switch the keyboard focus to the H1 element as soon as the page was changed. Angular for example does this out of the box.

For a SPA using vanilla JavaScript, you can use the `.focus()` method on a `HTMLElement` to achieve a focus change.

- [Documentation of `.focus()` on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus)

Be aware, changing the focus can be confusing to screen reader users. Focusing H1 does not imply to a screen reader user, that a page change has happened.

To have more control about how the user is notified on page changes, take a look at solution 2.

### Solution 2: ARIA Live Region

Another solution is to create an ARIA live region and notify the user with a message when the navigation happens. This might be less confusing than solution 1 as the developer can set a text that explains that a page change has happened.

- [Explanation on how to ARIA Live Regions work on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)

## Don't forget to change the page `title`

Screen reader users depend on the page title to reflect the actual content. Many SPA frameworks do not even include this functionality by default in their routing libraries and it's not ideal. So you are responsible to keep the `title` tag of website or web app in sync with your page content.

- [Document.title documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/title)

## Optimize SPAs built with React, Angular and Vue.js

The previously mentioned solutions are also valid for JavaScript frameworks. We collected some useful resources that will help you to optimize your application built with some of the most popular frameworks.

### React

- [Accessibility chapter in the official React documentation](https://reactjs.org/docs/accessibility.html)
- [Blog post "Creating accessible React apps"](https://simplyaccessible.com/article/react-a11y/)
- [React package react-aria-live to help adding an ARIA Live region to your application](https://github.com/AlmeroSteyn/react-aria-live)

### Angular

- [Blog post "Angular and accessibility"](https://medium.com/dailyjs/angular-and-accessibility-8ae1f601803a)
- [Blog post "Angular CDK - Accessibility & A11y"](https://codeburst.io/angular-cdk-getting-started-accessibility-a11y-1b6143b961c)

### Vue.js

- [Blog post "Getting started with web accessibility in Vue"](https://medium.com/@emilymears/getting-started-with-web-accessibility-in-vue-17e2c4ea0842)
