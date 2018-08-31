# Contributing to the «Accessibility Developer Guide»

This guide is the result of tight collaboration between accessibility experts and web developers. Its content by far is not exhaustive yet: there remain a lot of topics to talk about, and due to the fast evolution of web technologies, there certainly will always be.

We welcome everyone who wants to join our initiative, be it with adding new contents, fixing typos or bugs, etc. This guide is Open Source (MIT License). As such, everybody can contribute to it: we are happy about issues and pull requests.

## Technical details

We use a bunch of nice Open Source tools to make collaboration of both developers and content editors as easy as possible:

- We use [Node.js](https://github.com/nodejs/node) as JavaScript run-time environment to build the page.
- All contents are written in clean and sexy Markdown, see [Markdown (Wikipedia.org)](https://en.wikipedia.org/wiki/Markdown).
    - We use the [markdown-it](https://github.com/markdown-it/markdown-it) parser to have some additional parsing features available.
- Thanks to [Netlify](https://www.netlify.com/), the final page is deployed automatically.
- The search is generously sponsored by [Site Search 360](https://sitesearch360.com/). Thanks, guys!

## Local setup

Prerequisites: Node 8 (you may want to use [Node Version Manager](https://github.com/creationix/nvm)).

- Setup: `npm install`
- Develop: `npm start`

Happy coding!

## Netlify

We use [Netlify](https://www.netlify.com/) in the background to build our page:

- Commits to master trigger a build of the live page.
- Pull requests trigger a build of the related branch.
