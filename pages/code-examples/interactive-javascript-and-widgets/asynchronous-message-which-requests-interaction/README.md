---
layout: layout
title: "Asynchronous message which requests interaction"
---

# Asynchronous message which requests interaction



E.g. a message "Your session ends in 10mins" that pops up somewhere on the page (without the need to interact instantly, unlike a modal dialog).

How could this be done to not interrupt the screen reader user? Announce using ARIA live region, maybe by offering an `accesskey` or telling to watch out for a heading "XY"?

Maybe announce it more than once, e.g. 10mins before session end, then 5mins before, then 2mins before, then 30secs? This would attenuate the typical annoyance that screen reader output is interrupted by some user action (e.g. writing a text).