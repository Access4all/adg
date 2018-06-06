---
navigation_title: "Why using ARIA role=\"application\" is never a good idea"
position: 9
changed: "2018-05-15"
---

# Why using ARIA role="application" is never a good idea

****



## Additional notes

In our opinion, this makes things often very complicated and isn't needed most of the time.

> You only want to use role “application” if the content you’re providing consists of only interactive controls, and of those, mostly advanced widgets, that emulate a real desktop application. Note that, despite many things now being called a web application, most of the content these web applications work with are still document-based information, be it Facebook posts and comments, blogs, Twitter feeds, even accordeons that show and hide certain types of information dynamically. We primarily still deal with documents on the web, even though they may have a desktop-ish feel to them on the surface.
>
> In short: The times when you actually will use role “applications” are probably going to be very rare cases!

Quote from https://www.marcozehe.de/2012/02/06/if-you-use-the-wai-aria-role-application-please-do-so-wisely/

One of the main problems with role="application" is that the user has to know how to get out of the element, as application mode is activated - which is sort of like focus mode, and all interaction has to be handled by the application itself. This means (for example) that the arrow keys don't make the screen reader read lines of content anymore. Only the tab key works by default (as far as I know), but the focus doesn't leave the application anymore once it's in it. So we have a keyboard trap here.

One of our JAWS experts told me that pressing Insert+Z should leave application mode (if role="application" is on the body tag), but most users don't know about this feature. Also, in the current example, the role="application" is on a child node of the body tag, so Insert+Z doesn't work, but double tapping the "+" sign on the numpad works. More info here: http://accessibleculture.org/articles/2011/02/not-all-aria-widgets-deserve-role-application/

So as you can see, this is very cumbersome, and most screen reader users will be overchallenged with this.

(Von Mail XXX)