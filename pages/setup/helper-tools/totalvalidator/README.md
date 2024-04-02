---
navigation_title: "Total Validator"
position: 6
card_text: "Total Validator checks your website regarding various web and accessibility standards."
---

# Total Validator

**Total Validator checks your website regarding various web and accessibility standards by the press of a button. Building valid code is one of the highest goals developers should strive for. Total Validator helps a lot with achieving this.**

[[_TOC_]]

![Total Validator logo](_media/logo_total-validator.png){ style="max-width:350px;" }

<br>

> **Note**<br>According to the W3C as of September 2023, the success criterion 4.1.1 is considered as always satisfied for any system using HTML or XML, and there is no need to test it anymore (see [www.w3.org/WAI/WCAG21/Understanding/parsing.html](https://www.w3.org/WAI/WCAG21/Understanding/parsing.html){ target=_blank }).

## Installation

[Download Total Validator](https://www.totalvalidator.com/downloads/){ target=_blank } and run the installer. Then install [Chrome, Firefox or Edge extensions](https://www.totalvalidator.com/downloads/extension.html){ target=_blank }.

## Configuration

Under `Validations`, we recommend to disable `Check for broken links`, as it slows the tool down.

## Usage

![Total Validator window](_media/totalvalidator-window.png)

After launching it, open your website in either Firefox or Chrome, and activate Total Validator by clicking its icon in the browser toolbar.

![Total Validator browser icon](_media/totalvalidator-browser-icon.png)

Inspect the displayed results (which vary from parsing errors to very specific accessibility warnings).

![Total Validator results](_media/totalvalidator-results.png)

## Which ones are relevant for accessibility?

The bookmarklet [Filter relevant Total Validator results](https://codepen.io/jmuheim/pen/yLNqERL) is an attempt to give a pragmatic answer to this question. It scans the summary of a results page, looking out for the following 5 types of error codes, highlighting them visually:

- Incomplete start/end tags
- Invalid nesting
- Duplicate attributes
- Duplicate IDs
- Invalid ARIA

It shows a summary of its findings, as well:

![Filtered Total Validator results](_media/filtered-totalvalidator-results.png)

Check out the bookmarklet's description text for more details.
