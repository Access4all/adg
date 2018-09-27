---
navigation_title: "HTML Boilerplate"
position: 1
changed: "2018-09-02"
---

# Basic structure of an accessible HTML file

**An HTML file has a clearly defined structure that allows any browser to render the content correctly. To make an HTML file accessible you need to know the basic structure and its roles.**

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
We are used to regonize in which language a text is written simply by skimming over the text. When using assistive technologies such as screen readers it is crucial to know the language of the content in advance. In the example of a screen reader the synthesizer needs to know which language the content is to pronunciate the output correclty. Otherwise it will be hard to understand even if you know the other language.

By adding the language attribute `lang` to any HTML tag we can define the language of the enclosed content. `<html lang="en">` for example defines the documents content by default as english. To override the document language partially you can apply the language attribute to any other HTML tag in the content.

[Example](_examples/languages)

### Do not overdo
In an extreme case you may translate individual words, i.e `<span lang="de">Zugänglichkeit<span>`. I the example of a screen reader, everytime the language is changing, the voice has to be changed to. This may interupt the output for a brief moment. This can break the flow for example when marking each and every foreign word in a longer text. Sometimes it is better to leave the word unmarked especially for simple end expectable words.

## A document should have a meaningful title
The title element in the header section phrase the purpose of the document in the browser toolbar, provides a name when a page is added to favorites and displays the title for the page in search engine results. In addition it plays an important role in accessibility.

When using a screen reader the title element will be announced after the page is loaded. This enables users to orient themself within a website without scanning the whole content. A meaningful title could be «Contact form».

In addition the title element can be used to gain users attention, for example when a validation failed after submiting a form, i.e «Contact form could not be sent. Please provide a valid email address.».

## Set the viewport to the width of the device
https://developers.google.com/web/tools/lighthouse/audits/has-viewport-meta-tag
