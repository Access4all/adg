# Contributing to the «Accessibility Developer Guide»

This guide is the result of tight collaboration between accessibility experts and web developers. Its content by far is not exhaustive yet: there remain a lot of topics to talk about, and due to the fast evolution of web technologies, there certainly will always be.

We welcome everyone who wants to join our initiative, be it with adding new contents, fixing typos or bugs, etc. This guide is Open Source (MIT License). As such, everybody can contribute to it: we are happy about issues and pull requests.

## Communication

In addition to using issues and PRs to dicuss topics, we use Slack for general communication: [Join ADG Slack team](https://join.slack.com/t/a11y-dev-guide/shared_invite/enQtMzMwOTkxNTI3NDYwLTFkOTA5YmEwYjc5ZWU4OTJmZmZmYTJlNzFlNWQ0ZGU3MzQ0ZjQ1ODc3ZGFiY2MzYThkOTVkM2ZhNGQ0ZTZhZDE)!

## Technical details

We use a bunch of nice Open Source tools to make collaboration of both developers and content editors as easy as possible:

- We use [Node.js](https://github.com/nodejs/node) as JavaScript run-time environment to build the page.
- All contents are written in clean and sexy Markdown, see [Markdown (Wikipedia.org)](https://en.wikipedia.org/wiki/Markdown).
    - We use the [markdown-it](https://github.com/markdown-it/markdown-it) parser to have some additional parsing features available.
- Thanks to [Netlify](https://www.netlify.com/), the final page is deployed automatically.
- The search is generously sponsored by [Site Search 360](https://sitesearch360.com/). Thanks, guys!

## Local setup

Prerequisites: Node >=10 (you may want to use [Node Version Manager](https://github.com/creationix/nvm)).

- Setup: `npm install`
- Develop: `npm start`

Happy coding!

## Netlify

We use [Netlify](https://www.netlify.com/) in the background to build and deploy our pages.

### Branching

Our branching strategy is the following:

- `production` is the Production branch and reflects the state of the Live website
- `master` is the default branch and the one used for current development. Any feature/bugfix starts from it and is merged back to it once approved. Single commits can still be cherry-picked into `production` if needed
- a `feature/meaningful-short-description` branch is created whenever a new feature is started
- a `bugfix/meaningful-short-description` branch is created whenever a new bugfix is started

### Production deployment

- a Production deployment is triggered by merging `master` into `production`
- before merging, a proper tag, based on the [semantic versioning](https://semver.org/), is created

This allows to quickly revert a broken deployment.

### Feature/bugfix testing deployment

- a new pull request automatically trigger a build of the related branch
