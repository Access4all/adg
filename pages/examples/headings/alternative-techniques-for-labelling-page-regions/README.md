---
layout: layout
title: "Alternative techniques for labelling page regions"
navigation_title: "Alternative techniques for labelling page regions"
position: 6
lead: "While headings are the most widely known technique to label page regions, there exist other ways to label content in HTML."
---

# Alternative techniques for labelling page regions

Headings aren't explicitly required to label page regions like header, navigation, etc. In our opinion though, they are both the most expressive and simple technique.

Let's examine a few more possible techniques!

# Using HTML5 context giving containers to label a page region

Since HTML5 there are some new containers that provide semantical context:

- `<header>` is meant to contain header info, e.g. a page's logo, slogan, etc.
- `<main>` is meant to contain the main content of a page, e.g. on a website with cooking recipes, a page showing a single recipe would contain exactly that recipe in the `<main>` container (but not any additional page areas like header, navigation, footer, etc.)
- `<footer>` is meant to contain footer info

(There are a few more of them, like `<article>` or `<section>`, but let's not bother about them right now.)

Screen readers announce these elements to the user, and they also allow the user to navigate between them.

The downside: These elements don't add to the heading outline themselves. So when displaying solely the heading outline using a screen reader, important hierarchical elements will miss. This make navigation for screen reader users much more difficult. Also, not all screen readers announce all of these elements: for example, NVDA surprisingly doesn't announce `<main>` at the time being!

@code(/pages/examples/headings/alternative-techniques-for-labelling-page-regions/_examples/headings-example-with-html5-page-regions/){.code}

# Labelling a region using an ARIA label

If for some reason you absolutely don't want to add visually hidden headings to label your page regions, you can use ARIA labels instead.

@code(/pages/examples/headings/alternative-techniques-for-labelling-page-regions/_examples/headings-example-with-aria-labelled-page-regions/){.code}

The downside to this is that screen reader users won't be able to navigate between regions as they could when there were HTML regions or headings.

# A combination of HTML5 containers and ARIA labels

@code(/pages/examples/headings/alternative-techniques-for-labelling-page-regions/_examples/headings-example-with-aria-labelled-html5-page-regions/){.code}

Admitted, the example above doesn't make much sense, as the `aria-label`s only repeat what the screen readers would announce from the HTML5 containers anyway. But think of the following case: if you have more than one navigation, you can label them differently using ARIA labels, for example "Content Navigation" (`<nav aria-label="Content Navigation">`) and "Meta Navigation" (`<nav aria-label="Meta Navigation">`).

# Verdict: use plain old heading outlines!

We suggest using plain old headings. Having HTML5 containers on the site is always a good thing, so a combination of both is perfect:

@code(/pages/examples/headings/alternative-techniques-for-labelling-page-regions/_examples/headings-example-with-html5-page-regions-and-visually-hidden-headings/){.code}

By following this approach, the screen reader user can use both heading navigation and HTML region navigation according to their likings.

If you even want to go an extra mile and label the containers by connecting the headings to them using ARIA labels, feel free. This doesn't deliver a much better experience to screen reader users though.

@code(/pages/examples/headings/alternative-techniques-for-labelling-page-regions/_examples/headings-example-with-html5-page-regions-aria-labelled-by-visually-hidden-headings/){.code}