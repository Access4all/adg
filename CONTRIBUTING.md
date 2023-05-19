# Contributing to the «Accessibility Developer Guide»

This guide is the result of tight collaboration between accessibility experts and web developers. Its content by far is not exhaustive yet: there remain a lot of topics to talk about, and due to the fast evolution of web technologies, there certainly will always be.

We welcome everyone who wants to join our initiative, be it with adding new contents, fixing typos or bugs, etc. This guide is Open Source (MIT License). As such, everybody can contribute to it: we are happy about issues and pull requests.

## Communication

We use issues and pull requests to discuss topics.

## Technical details

We use a bunch of nice Open Source tools to make collaboration of both developers and content editors as easy as possible:

- We use [Node.js](https://nodejs.org/) as JavaScript run-time environment to build the page.
- All contents are written in clean and sexy Markdown, see [Markdown (Wikipedia.org)](https://en.wikipedia.org/wiki/Markdown).
  - We use the [markdown-it](https://markdown-it.github.io/) parser to have some additional parsing features available.
  - A table of content can be inserted in any README.md via `[[_TOC_]]` placeholder.
- Thanks to [Netlify](https://www.netlify.com/), the final page is deployed automatically.
- The search is generously sponsored by [Site Search 360](https://sitesearch360.com/). Thanks, guys!

## Local setup

Prerequisites: Node >=18 (you may want to use [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows)).

- Setup: `npm ci`
- Develop: `npm start`

Happy coding!

## Netlify

We use [Netlify](https://www.netlify.com/) to build and deploy our website.

Deployments are happening automatically:

- A production deployment is triggered for every change in `main`.
- A preview deployment is triggered for every new pull request and the link posted as a comment.

## Branching

Our branching strategy is the following:

- `main` is the default branch and reflects the state of the live website.
- Any feature/bugfix starts from `main` and is merged back to it once approved:
  - A `feature/meaningful-short-description` branch is created whenever a new feature is started
  - A `bugfix/meaningful-short-description` branch is created whenever a new bugfix is started
