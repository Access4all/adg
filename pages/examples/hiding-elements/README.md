---
navigation_title: "Hiding elements"
position: 2
changed: "2018-05-02"
---

# Hiding elements correctly

**There are cases when some element on a page needs to be hidden in some way: for example you want to show some content to one audience, but not to another one. In this chapter, you learn how to do this properly. Much is possible, but there are some pitfalls you really need to know about.**

TODO

## Additional notes

### VoiceOver hat Probleme

VoiceOver/iOS scheint Probleme zu haben, wenn man einzelne inline Elemente mittels `.visually-hidden` visuell versteckt: es wird dann jedes Element angesprungen, so dass kein flüssiger Output mehr passiert.

Z.B.:

```
span 3min
span.visually-hidden utes
```

wird nicht mehr als "3minutes" ausgegeben, sondern als "3min" und "utes". Gibt es dafür einen besseren Ansatz??

Antwort: Das ist normal in iOS! Jedes Element wird einzeln angesteuert, auch wenn es nur ein `<b>` oder so ist! Beim zeilenweise Lesen (Rotor einstellen, dann Wischgeste hoch/runter) wird es aber in einem Zug ausgegeben.

---

We show how to hide elements from specific channels:

- [How to hide elements visually](/examples/hiding-elements/visually) by moving them off-screen, a dirty old workaround.
- [How to hide elements from screen readers](/examples/hiding-elements/from-screen-readers) using ARIA - and in what situations this can lead to problems.
- [How to hide elements from all devices](/examples/hiding-elements/from-all-devices) using HTML or CSS.

Then we take a short look at some regularly asked questions about possible [search engine optimisation problems](/examples/hiding-elements/okay-for-seo) regarding hidden elements.