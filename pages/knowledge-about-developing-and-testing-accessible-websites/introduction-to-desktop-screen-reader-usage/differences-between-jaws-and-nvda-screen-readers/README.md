---
layout: layout
title: "Differences Between JAWS and NVDA Screen Readers"
---

# Differences Between JAWS and NVDA Screen Readers

TODO

- Was bei NVDA als Fokus Modus bezeichnet wird, heisst in Jaws Formular Modus und hat die gleiche bedeutung. Der Screen Reader wechselt automatisch in diesen Modus, wenn man ein Eingabefeld oder eine Applikation navigiert.
  - In case you are unaware, JAWS has two modes for displaying webpages or other documents using the virtual cursor, simple layout and screen layout.  Simple layout is the default, which displays content in a linear fashion - putting each link or control on its own line.  Screen layout formats the content similar to how it's displayed on screen. The default in NVDA is screen layout, but you can easily switch to it's version of simple layout by pressing NVDA+V while in browse mode. This will turn Screen layout off. Be sure to save your configuration after making this change with NVDA+CTRL+c.
  - While JAWS is loaded, pressing ctrl+f in Internet Explorer or Firefox brings up the JAWS Find dialogue rather than activating the browser's built-in find command.  This is to allow you to search for text using the virtual cursor.  The regular find command will search for the next occurrence of the entered text, but will not move the virtual cursor to that location.  This is due to how screen readers interact with web pages. NVDA has it's own find command to search in browse mode, but it has not been tied to CTRL+F, so pressing that shortcut key calls up the browser's find command, hence find not working as expected. To bring up NVDA's find dialogue, press ctrl+NVDA+F. Type in what you wish to find then press enter.
  - JAWS uses heuristics trying to connect information manually that should be connected in the code, but isn't. For example, when an input field and its label isn't connected correctly in the code, JAWS sometimes is able to connect them correctly - while sometimes it doesn't (or even connect the wrong elements). This means that NVDA is a lot more picky on correct code, which is a good thing when using it as a development tool.
  - In JAWS, you can press JAWS+F5 to list forms, JAWS+F6 to list headings and JAWS+F7 to list links. In NVDA, the latter two have been combined into an elements list dialog, and you can access it by pressing NVDA+F7.
  - JAWS nennt auch wenn man z.B. ´<main>´ betritt und verlässt
  - JAWS gibt of "Blank" aus => ist das immer zwischen Block-Elementen?
  - Die default Zeilenlänge von JAWS ist etwas länger als die von NVDA?
  - JAWS unterscheidet display:inline-block nicht von display:block?
      - Liest JAWS das Attribut überhaupt aus?? Ein auf block gestelltes Div scheint nach wie vor als inline betrachtet zu werden, siehe http://developer-guide.access4all.ch/en/examples/block_vs_inline!
  - JAWS gibt Nesting Level an, z.B. bei verschachtelten Listen, siehe http://developer-guide.access4all.ch/en/examples/browsing_lists
  - JAWS gibt <dl> explizit aus, NVDA betrachtet es scheinbar als blosse Liste
  - JAWS sucht nach Heading-Levels nur direkt innerhalb des aktuellen Headings! Also z.B. werden 2er nur im aktuellen 1er gefunden. Dies ist super! Aber wie kommt man explizit wieder einen Level zurück?
  - JAWS+Ctrl+QuickNavKey zeigt Liste dieser Elemente an, z.B. E für Eingabefelder
  - JAWS scheint Tabellen auch Tabellen, welche zwar keine th, thead haben, aber border, auch nicht als Tabellen anzusagen
  - JAWS sagt die erste Tabelle als Tabelle an, die zweite nicht! http://developer-guide.access4all.ch/en/examples/hide_empty_table_cells_in_layout_tables.html
  - JAWS scheint rowspan nicht speziell auszugeben, sondern sagt einfach blank, als sei rowspan gar nicht vorhanden?! http://developer-guide.access4all.ch/en/examples/browsing_tables
  - JAWS hat genau wie NVDA auch Probleme bei der Aussprache von Meta-Info! Ist dies evtl. ein Bug des OS/Browsers? Passiert sowohl in IE als auch in FF => daher eher OS Problem?!
  - Bei Same-Page-Links spricht JAWS 3x den Seitentitel aus! Plus auch alle Infos über Regionen etc., so als hätte man das Fenster gewechselt und währe zurück gekehrt. http://developer-guide.access4all.ch/en/examples/footnotes_and_other_references#asterisk_info
  - Auch JAWS fokussiert Elemente die mit aria-hidden versteckt wurden
  - JAWS scheint bei in-page Links immer "Say all" auszuführen (kann man das deaktivieren?)?! Oder warum wird dann beim Fokussieren nur eines Headings auch der nachfolgende Inhalt vorgelesen? http://developer-guide.access4all.ch/en/examples/setting_focus_to_elements#h1

Auch ein spannender Unterschied: der `:focus` Status wird vom NVDA beim Browsen getrittert, von JAWS aber nicht! Wie sieht das bei Mobile aus (ich glaube iOS setzt den Fokus auch, aber Android wiederum nicht => kann bei Sichtbarwerdung von Jump Links beobachtet werden)??