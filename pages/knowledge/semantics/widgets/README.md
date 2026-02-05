---
navigation_title: "Widgets"
position: 3
---

# Widgets simply working for all

**HTML supports interactive controls for most requirements. But what about additional interaction patterns that do not offer an HTML equivalent? The key is to use semantic HTML and standard controls where possible, enhance them with ARIA when needed, style them with CSS, and add interactivity with JavaScript. This approach leverages native browser behavior and ensures widgets work for everyone.**

[[_TOC_]]

## The principle

When creating custom widgets, start with semantic HTML and standard form controls. These provide built-in accessibility features, keyboard support, and screen reader compatibility. Then:

1. **Enhance with ARIA** when semantic HTML alone isn't sufficient
2. **Style with CSS** to achieve the desired visual design
3. **Add interactivity with JavaScript** to create the widget behavior

This approach ensures that widgets work out of the box for keyboard users and screen reader users, while still allowing complete visual customization.

## Using ARIA for complex widgets

For widgets that don't have a direct HTML equivalent (like tablists, accordions, or carousels), ARIA provides the necessary semantic structure. ARIA roles, states, and properties communicate the widget's structure and behavior to assistive technologies.

### Example: Tablists

A tablist allows users to toggle the visibility of content panels. The recommended approach is to use ARIA roles and attributes following the [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/). This provides:

- Proper semantic structure that screen readers understand
- Robust keyboard navigation with focus management
- Clear communication of relationships between tabs and panels
- Accurate announcement of the active state

For detailed information and implementation examples, see [Tablists](/examples/widgets/tablists).

## When to use standard HTML controls

For many widget patterns, standard HTML form controls can be styled and enhanced to create accessible custom widgets. This approach works well when:

- The widget's behavior closely matches a native form control
- Visual customization is needed but semantic structure can remain
- You want to leverage built-in browser accessibility features

Examples include styled checkboxes for multi-select lists, radio buttons for single-select options, or native select elements enhanced with custom styling.

## Best practices

Regardless of which approach you choose:

- **Start with semantic HTML** - Use the most appropriate HTML element for the job
- **Enhance with ARIA when needed** - Add ARIA roles, states, and properties for complex widgets
- **Ensure keyboard accessibility** - All interactive elements must be keyboard accessible
- **Test with assistive technologies** - Verify that screen readers announce widgets correctly
- **Follow established patterns** - Use the [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) as a reference

For more examples of accessible widgets, see [Interactive widgets](/examples/widgets).
