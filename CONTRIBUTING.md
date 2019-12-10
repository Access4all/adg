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

Prerequisites: Node (see required Node version in package.json, you may want to use [Node Version Manager](https://github.com/creationix/nvm)).

- Setup: `npm install`
- Develop: `npm start`

Happy coding!

## Netlify

We use [Netlify](https://www.netlify.com/) in the background to build and deploy our pages.

### Branching
Our branching strategy is the following:
- `master` is the Production branch
- `develop` is the branch for current development. Any feature starts from it and is merged back to it once approved.
- a `feature/[issue_id]-[short_description]` branch is created whenever a new feature is started
- a `bugfix/[issue_id]-[short_description]` branch is created whenever a new bugfix is started
- hotfixes could processed like normal features or directly merged into `master` and deployed right away

### Production deployment
- a Production deployment is triggered by merging `develop` into `master`
- before merging, make sure to properly add a tag based on the [semantic versioning](https://semver.org/).
This allows to quickly revert a broken deployment.

### Feature/bugfix testing deployment
- a new pull request automatically trigger a build of the related branch
