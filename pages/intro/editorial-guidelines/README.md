---
navigation_title: "Editorial guidelines"
position: 7
changed: "2018-02-22"
---

# Editorial guidelines

**TODO**

Maintaining an online source as a community needs some rules regarding a shared writing style.

## Gender

- Use plural form (they)! This seems the easiest option in English.

## Simple language

From: [Writing Clearly and Simply](https://webaim.org/techniques/writing/)

- [Organize your ideas into a logical outline—before and during the writing process](https://webaim.org/techniques/writing/#outline)
    - This is why we have topics (e.g. [Introduction to desktop screen reader usage](http://adg.access4all.ch/en/pages/25)) with sub pages
- [Tell the readers what you're going to tell them; tell them; then tell them what you told them](https://webaim.org/techniques/writing/#tell)
    - This is why we have the "TL;DR - Too long, didn't read" section for each topic, introducing each and every sub page's content
    - We're missing a "Conclusion" for each topic though?! Should we add one?
- [Write for your target audience](https://webaim.org/techniques/writing/#target)
    - This is why we're trying to be technical, straight to the point, and sometimes a bit funny
- [Assume that your readers are intelligent, but do not assume that they know the subject matter as well as you](https://webaim.org/techniques/writing/#intelligent)
    - This is exactly why we created the ADG!
- [Write cohesive paragraphs constructed around a single major idea](https://webaim.org/techniques/writing/#paragraphs): If possible, put the main idea of the paragraph in the first sentence.
    - We're using short paragraphs, often containing only a single sentence.
    - Whenever it makes sense, we're using enumeration lists to separate sentences even more clearly.
- [Avoid slang and jargon](https://webaim.org/techniques/writing/#jargon)
    - Stick to our [Glossary and wording conventions](http://adg.access4all.ch/en/pages/186)!
- [Use familiar words and combinations of words](https://webaim.org/techniques/writing/#familiar)
    - Stick to our [Glossary and wording conventions](http://adg.access4all.ch/en/pages/186)!
- [Use active voice](https://webaim.org/techniques/writing/#active)
    - This is really important!
- [Avoid weak verbs](https://webaim.org/techniques/writing/#weak)
    - Avoid "to be" (is, are, was, were)
    - Example: "One way to improve your writing is to use strong verbs" vs. "Using stronger verbs can improve your writing".
- [Use parallel sentence construction](https://webaim.org/techniques/writing/#parallel)
    - Rather use a verb a 2nd time in a sub sentence instead of omitting it
    - Whenever it makes sense, we're using enumeration lists to separate sentences even more clearly.
- [Use positive terms](https://webaim.org/techniques/writing/#positive)
    - Emphasize the way things are, were, will be, or would be.
    - To the extent possible, avoid the use of don't, didn't, etc.
    - Example: "Do not get dirty" vs. "Stay clean".
- [Give direct instructions](https://webaim.org/techniques/writing/#direct)
    - Example: "Students should read chapter five" vs. "Read chapter five".
- [Avoid multiple negatives](https://webaim.org/techniques/writing/#negatives)
- [Avoid acronyms and abbreviations if possible; explain all acronyms and abbreviations](https://webaim.org/techniques/writing/#acronyms)
    - Is it possible to have automatically generated [Glossary and wording conventions](http://adg.access4all.ch/en/pages/186)? -> see mail 255162EF-38C8-4573-AEEE-D636532F4B84@access-for-all.ch
- [Check the spelling](https://webaim.org/techniques/writing/#spelling)
    - Can this be automated? -> see mail 255162EF-38C8-4573-AEEE-D636532F4B84@access-for-all.ch
- [Write short sentences](https://webaim.org/techniques/writing/#short)
    - Avoid using "and" to link two sentences, just add a fullstop and start a new sentence!
    - Whenever it makes sense, we're using enumeration lists to separate sentences even more clearly.
- [Ensure that every word and paragraph is necessary](https://webaim.org/techniques/writing/#necessary)
- Supplement the text with illustrations!
    - Would be great for milestone #2
    - For example, on [Screen readers are one-dimensional](http://adg.access4all.ch/en/pages/133), a drawing (or even GIF animation) of a blind person "scanning" an page, compared to a seeing person, would be great
- Reduce text to a bare minimum
    - This is why we have split topics into sub pages!
- Be as literal as possible
    - Straight to the point!
    - No irony, parody or sarcasm!

Also:

- End each sentence in an enumeration list with a fullstop!
- Never start an enumeration list directly below a heading! Always start with a paragraph.

## Einheitliche Formatierung

- SR-Zitate in `<q>` oder `<samp>`? Siehe https://developer.mozilla.org/de/docs/Web/HTML/HTML5/HTML5_element_list
- Pfeile: "->" ersetzen mit "→" und .sr-only "Pfeil nach rechts"?
- Keyboard Shortcuts in `<kbd>`?
    - Immer gross oder immer klein (z.B. `Shift + H` vs. `Shift + h`)? => Immer gross, so wie auf Keyboards
    - Insert oder NVDA/JAWS Key?! NVDA/JAWS!
- Externe Links mit oder ohne sichtbare URL, Seiten-Name, etc.?
    - "Hiding elements correctly" vs. "Hiding elements correctly (on WebAIM)" => letzteres!
- Gross-/Kleinschreibung von Headings und Examples
    - Alles ganz normaler Text, keine Sonderregelungen!
- Bringt die Fettschreibung wichtiger Inhalte etwas?
    - Oder eher verwirrend?
    - Ich finde es ansich schon noch gut, aber man darf es nicht übertreiben!
    - `<em>` vs. `<strong>` vs. `<i>` vs. `<u>`?
    - Auf jeden Fall macht es etwas mehr Aufwand beim Schreiben...