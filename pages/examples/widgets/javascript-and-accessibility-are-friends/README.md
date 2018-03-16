---
layout: layout
title: "JavaScript and accessibility are friends"
navigation_title: "JavaScript and accessibility are friends"
position: 1
lead: "TODO"
---

# JavaScript and accessibility are friends

Before getting too excited about all those fancy 3rd party widgets out there, you better keep calm and read this thoroughly.

Modern websites offer a lot of interactivity: here you find inspiring implementations of accessible JavaScript patterns.

A common pitfall when creating websites is choosing inaccessible 3rd party widgets for custom controls like tab panels, fancy form elements, etc.

Oftentimes, such widgets that offer fancy features for "normal" users are hard or even impossible to use for disabled users, and it's usually not easy to make them accessible and thus can ruin the whole user experience. In this section we are telling you what to keep in mind when choosing a widget. We also offer reviews about widgets we know.

Things to Consider When Choosing a Widget:

- Creating accessible JavaScript widgets is an art
  - Even widgets claiming to be accessible often are not
      - Be sure to thoroughly test the widget on accessibility
  - Different screen readers behave differently
      - Be sure to test with all #{link_to 'relevant screen readers', page_path('relevant_screenreaders')}
  - Often, widgets don't offer real value to the user, they're only looking nice
      - If that's the case, better drop it and use traditional ways of presenting content
  - Take look at our #{link_to 'widgets section', page_path('widgets_overview')}, where we offer reviews about some well-known 3rd party widgets