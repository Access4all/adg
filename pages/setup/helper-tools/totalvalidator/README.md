---
navigation_title: "TotalValidator"
position: 4
changed: "2018-04-09"
---

# TotalValidator

**TotalValidator checks your website regarding various web and accessibility standards by the press of a button. Building valid code is one of the highest goals developers should strive for. TotalValidator helps a lot with achieving this.**

[[toc]]

![TotalValidator icon](_media/totalvalidator-icon.png)

## Installation

[Download TotalValidator](https://www.totalvalidator.com/downloads/index.html) and run the installer. Then install [Chrome and Firefox extensions](https://www.totalvalidator.com/downloads/extension.html).

## Configuration

Under `Validations`, we recommend to disable `Check for broken links`, as it slows the tool down.

## Usage

![TotalValidator window](_media/totalvalidator-window.png)

After launching it, open your website in either Firefox or Chrome, and activate TotalValidator by clicking its icon in the browser toolbar.

![TotalValidator browser icon](_media/totalvalidator-browser-icon.png)

Inspect the displayed results (which vary from parsing errors to very specific accessibility warnings).

![TotalValidator results](_media/totalvalidator-results.png)

## Which ones are relevant for accessibility?

The bookmarklet [Filter relevant TotalValidator results](https://codepen.io/jmuheim/pen/yLNqERL) is an attempt to give a pragmatic answer to this question. It scans the summary of a results page, looking out for the following 5 types of error codes, highlighting them visually:

- Incomplete start/end tags
- Invalid nesting
- Duplicate attributes
- Duplicate IDs
- Invalid ARIA

It shows a summary of its findings, as well:

![Filtered TotalValidator results](_media/filtered-totalvalidator-results.png)

Check out the bookmarklet's description text for more details.
