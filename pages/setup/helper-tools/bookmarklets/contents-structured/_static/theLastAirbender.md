# The last airbender - a (maybe) better Element-Outliner

I was testing some Sites and the regular content structured bookmarklet drove me crazy. So I asked my good friend Copilot if he could give me something better (no ugly overlaps and line breaks).
And this is what came out of it, I like it. What do you think?

## one-liner
```
javascript:(function(){if(window.__accInspector)return;window.__accInspector=1;const g={Headings:{c:"#d32f2f%22,s:%22h1,h2,h3,h4,h5,h6%22},Landmarks:{c:%22#7b1fa2%22,s:%22header,main,nav,aside,footer,section%22},Forms:{c:%22#0288d1%22,s:%22form,label,input,select,textarea,button%22},Lists:{c:%22#455a64%22,s:%22ul,ol,li%22},Tables:{c:%22#00796b%22,s:%22table,caption,th,td%22},Links:{c:%22#1565c0%22,s:%22a%22},ARIA:{c:%22#000%22,s:%22[role]%22}};let%20overlay=document.createElement(%22div%22);overlay.id=%22ai-overlay%22;overlay.setAttribute(%22data-ai-ignore%22,%221%22);overlay.style.cssText=%22position:absolute;left:0;top:0;width:100%;height:0;pointer-events:none;z-index:2147483646%22;document.body.appendChild(overlay);function%20labelText(e){return%20e.hasAttribute(%22role%22)?%22ROLE=%22+e.getAttribute(%22role%22):e.tagName;}function%20clear(n){document.querySelectorAll('[data-ai=%22'+n+'%22]').forEach(e=%3E{e.style.outline=%22%22;e.style.outlineOffset=%22%22;e.removeAttribute(%22data-ai%22);});overlay.querySelectorAll('[data-owner=%22'+n+'%22]').forEach(e=%3Ee.remove());}function%20show(n){clear(n);const%20r=g[n];document.querySelectorAll(r.s).forEach(e=%3E{if(e.closest('[data-ai-ignore=%221%22]'))return;e.style.outline=%222px%20solid%20%22+r.c;e.style.outlineOffset=%222px%22;e.setAttribute(%22data-ai%22,n);const%20rect=e.getBoundingClientRect();const%20tag=document.createElement(%22div%22);tag.setAttribute(%22data-owner%22,n);tag.textContent=labelText(e);tag.style.cssText=%22position:absolute;left:%22+(window.scrollX+rect.left)+%22px;top:%22+(window.scrollY+rect.top-18)+%22px;padding:2px%205px;background:%22+r.c+%22;color:#fff;font:bold%2010px%20Arial;border-radius:3px;white-space:nowrap;pointer-events:none;z-index:2147483647%22;overlay.appendChild(tag);});}function%20refresh(){Object.keys(g).forEach(n=%3E{const%20cb=document.getElementById('ai-cb-'+n);if(cb&&cb.checked)show(n);});}function%20allOn(){Object.keys(g).forEach(show);p.querySelectorAll('input[type=checkbox]').forEach(c=%3Ec.checked=true);}function%20allOff(){Object.keys(g).forEach(clear);p.querySelectorAll('input[type=checkbox]').forEach(c=%3Ec.checked=false);}function%20closeAll(){allOff();window.removeEventListener(%22scroll%22,refresh,true);window.removeEventListener(%22resize%22,refresh,true);document.removeEventListener(%22keydown%22,escHandler);overlay.remove();p.remove();delete%20window.__accInspector;}function%20escHandler(e){if(e.key===%22Escape%22)closeAll();}let%20p=document.createElement(%22div%22);p.setAttribute(%22data-ai-ignore%22,%221%22);p.style.cssText=%22position:fixed;top:10px;right:10px;left:auto;z-index:2147483647;background:#fff;color:#000;border:2px%20solid%20#444;border-radius:8px;padding:10px;width:220px;font:13px%20Arial;box-shadow:0%202px%2010px%20rgba(0,0,0,.3)%22;p.innerHTML=%22%3Cdiv%20id='ai-header'%20style='font-weight:bold;margin-bottom:8px;cursor:move;background:#eee;padding:4px;border-radius:4px'%3EAccessibility%20Inspector%20%E2%98%B0%3C/div%3E%22;let%20drag=false,ox=0,oy=0;p.querySelector(%22#ai-header%22).onmousedown=function(e){drag=true;ox=e.clientX-p.offsetLeft;oy=e.clientY-p.offsetTop;e.preventDefault();};document.addEventListener(%22mousemove%22,function(e){if(!drag)return;p.style.left=(e.clientX-ox)+'px';p.style.top=(e.clientY-oy)+'px';p.style.right='auto';});document.addEventListener(%22mouseup%22,function(){drag=false;});Object.keys(g).forEach(n=%3E{let%20l=document.createElement(%22label%22);l.style.display=%22block%22;let%20c=document.createElement(%22input%22);c.type=%22checkbox%22;c.checked=true;c.id=%22ai-cb-%22+n;c.onchange=()=%3Ec.checked?show(n):clear(n);l.appendChild(c);l.append(%22%20%22+n);p.appendChild(l);});let%20d=document.createElement(%22div%22);d.style.marginTop=%2210px%22;let%20b1=document.createElement(%22button%22);b1.textContent=%22Alles%20ein%22;b1.onclick=allOn;let%20b2=document.createElement(%22button%22);b2.textContent=%22Alles%20aus%22;b2.onclick=allOff;let%20b3=document.createElement(%22button%22);b3.textContent=%22Schliessen%22;b3.onclick=closeAll;[b1,b2,b3].forEach(b=%3E{b.style.margin=%222px%22;d.appendChild(b);});p.appendChild(d);document.body.appendChild(p);window.addEventListener(%22scroll%22,refresh,true);window.addEventListener(%22resize%22,refresh,true);document.addEventListener(%22keydown%22,escHandler);allOn();})();
```
## formatted
```
javascript:(function () {
    if (window.__accInspector) return;
    window.__accInspector = 1;

    const groups = {
        Headings: {
            c: "#d32f2f",
            s: "h1,h2,h3,h4,h5,h6"
        },
        Landmarks: {
            c: "#7b1fa2",
            s: "header,main,nav,aside,footer,section"
        },
        Forms: {
            c: "#0288d1",
            s: "form,label,input,select,textarea,button"
        },
        Lists: {
            c: "#455a64",
            s: "ul,ol,li"
        },
        Tables: {
            c: "#00796b",
            s: "table,caption,th,td"
        },
        Links: {
            c: "#1565c0",
            s: "a"
        },
        ARIA: {
            c: "#000",
            s: "[role]"
        }
    };

    // Overlay layer
    const overlay = document.createElement("div");
    overlay.id = "ai-overlay";
    overlay.setAttribute("data-ai-ignore", "1");
    overlay.style.cssText =
        "position:absolute;" +
        "left:0;top:0;" +
        "width:100%;height:0;" +
        "pointer-events:none;" +
        "z-index:2147483646";

    document.body.appendChild(overlay);

    function labelText(el) {
        return el.hasAttribute("role")
            ? "ROLE=" + el.getAttribute("role")
            : el.tagName;
    }

    function clear(name) {
        document
            .querySelectorAll(`[data-ai="${name}"]`)
            .forEach(el => {
                el.style.outline = "";
                el.style.outlineOffset = "";
                el.removeAttribute("data-ai");
            });

        overlay
            .querySelectorAll(`[data-owner="${name}"]`)
            .forEach(el => el.remove());
    }

    function show(name) {
        clear(name);

        const group = groups[name];

        document.querySelectorAll(group.s).forEach(el => {
            if (el.closest('[data-ai-ignore="1"]')) {
                return;
            }

            el.style.outline = `2px solid ${group.c}`;
            el.style.outlineOffset = "2px";
            el.setAttribute("data-ai", name);

            const rect = el.getBoundingClientRect();

            const tag = document.createElement("div");
            tag.setAttribute("data-owner", name);
            tag.textContent = labelText(el);

            tag.style.cssText =
                `position:absolute;` +
                `left:${window.scrollX + rect.left}px;` +
                `top:${window.scrollY + rect.top - 18}px;` +
                `padding:2px 5px;` +
                `background:${group.c};` +
                `color:#fff;` +
                `font:bold 10px Arial;` +
                `border-radius:3px;` +
                `white-space:nowrap;` +
                `pointer-events:none;` +
                `z-index:2147483647`;

            overlay.appendChild(tag);
        });
    }

    function refresh() {
        Object.keys(groups).forEach(name => {
            const cb = document.getElementById(`ai-cb-${name}`);
            if (cb && cb.checked) {
                show(name);
            }
        });
    }

    function allOn() {
        Object.keys(groups).forEach(show);

        panel
            .querySelectorAll('input[type="checkbox"]')
            .forEach(cb => (cb.checked = true));
    }

    function allOff() {
        Object.keys(groups).forEach(clear);

        panel
            .querySelectorAll('input[type="checkbox"]')
            .forEach(cb => (cb.checked = false));
    }

    function closeAll() {
        allOff();

        window.removeEventListener("scroll", refresh, true);
        window.removeEventListener("resize", refresh, true);
        document.removeEventListener("keydown", escHandler);

        overlay.remove();
        panel.remove();

        delete window.__accInspector;
    }

    function escHandler(e) {
        if (e.key === "Escape") {
            closeAll();
        }
    }

    // Control panel
    const panel = document.createElement("div");

    panel.setAttribute("data-ai-ignore", "1");
    panel.style.cssText =
        "position:fixed;" +
        "top:10px;" +
        "right:10px;" +
        "z-index:2147483647;" +
        "background:#fff;" +
        "color:#000;" +
        "border:2px solid #444;" +
        "border-radius:8px;" +
        "padding:10px;" +
        "width:220px;" +
        "font:13px Arial;" +
        "box-shadow:0 2px 10px rgba(0,0,0,.3)";

    panel.innerHTML = `
        <div id="ai-header"
             style="font-weight:bold;
                    margin-bottom:8px;
                    cursor:move;
                    background:#eee;
                    padding:4px;
                    border-radius:4px">
            Accessibility Inspector ☰
        </div>
    `;

    // Dragging
    let drag = false;
    let offsetX = 0;
    let offsetY = 0;

    panel.querySelector("#ai-header").onmousedown = function (e) {
        drag = true;
        offsetX = e.clientX - panel.offsetLeft;
        offsetY = e.clientY - panel.offsetTop;
        e.preventDefault();
    };

    document.addEventListener("mousemove", function (e) {
        if (!drag) return;

        panel.style.left = `${e.clientX - offsetX}px`;
        panel.style.top = `${e.clientY - offsetY}px`;
        panel.style.right = "auto";
    });

    document.addEventListener("mouseup", function () {
        drag = false;
    });

    // Checkboxes
    Object.keys(groups).forEach(name => {
        const label = document.createElement("label");
        label.style.display = "block";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = true;
        checkbox.id = `ai-cb-${name}`;

        checkbox.onchange = () =>
            checkbox.checked
                ? show(name)
                : clear(name);

        label.appendChild(checkbox);
        label.append(` ${name}`);

        panel.appendChild(label);
    });

    // Buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.style.marginTop = "10px";

    const btnOn = document.createElement("button");
    btnOn.textContent = "Alles ein";
    btnOn.onclick = allOn;

    const btnOff = document.createElement("button");
    btnOff.textContent = "Alles aus";
    btnOff.onclick = allOff;

    const btnClose = document.createElement("button");
    btnClose.textContent = "Schliessen";
    btnClose.onclick = closeAll;

    [btnOn, btnOff, btnClose].forEach(btn => {
        btn.style.margin = "2px";
        buttonContainer.appendChild(btn);
    });

    panel.appendChild(buttonContainer);
    document.body.appendChild(panel);

    window.addEventListener("scroll", refresh, true);
    window.addEventListener("resize", refresh, true);
    document.addEventListener("keydown", escHandler);

    allOn();
})();
```
