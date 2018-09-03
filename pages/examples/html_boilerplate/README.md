---
navigation_title: "HTML Boilerplate"
position: 1
changed: "2018-09-02"
---

# Basic structure of an accessible HTML file

**An HTML file has a clearly defined structure that allows the browser to render its content correctly. To make an HTML file accessible beyond its content you need to know the basic structure and it parts.**

As you learned for sure each HTML file consists on the same structure that includes the declaration of the document type, a header part that describes the document followed by a body that contains the actual content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Titel</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>

  </body>
</html>
```

## What language are you speaking?
We are used to regonize in which language a text is written simply by skimming over the text. When using assistive technologies such as screen readers it is crucial to know the language of the content in advance. In the example of a screen reader the synthesizer needs to know which language the content is to pronunciate the output correclty. Otherwise it will sound strange even if you understand the other language.

By adding the language attribute `lang` to any HTML tag we can define the language of the enclosed content. `<html lang="en">` for example defines the documents content by default as english. To override the document language partially you can apply the language attribute to any other HTML tag in the content.

[Example](_examples/languages)

## A document should have a meaningful title

## Set the viewport to the width of the device
https://developers.google.com/web/tools/lighthouse/audits/has-viewport-meta-tag
