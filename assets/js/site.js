/* ============================================================
   SKYLINK — shared site script
   Builds the header, menu, footer and WhatsApp button on every page,
   shows the products, and handles the enquiry/booking forms.
   To change the menu, edit the HOUSE / STUDIO lists below.
   ============================================================ */
(function(){
  "use strict";
  var C = window.SKYLINK, PRODUCTS = window.SKYLINK_PRODUCTS || [];
  var body = document.body;
  var ROOT = body.getAttribute("data-root") || "";
  var PAGE = body.getAttribute("data-page") || "";
  var BRANCH = body.getAttribute("data-branch") || "";

  function u(p){ return ROOT + p; }
  function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;"); }
  function money(n){ return "KSh " + n.toLocaleString("en-KE"); }
  function wa(msg, to){
    var n = (to === "studio") ? C.whatsappStudio : C.whatsappGeneral;
    return "https://wa.me/" + n + "?text=" + encodeURIComponent(msg);
  }
  function icon(id, size){ return '<svg' + (size ? ' width="'+size+'" height="'+size+'"' : '') + ' aria-hidden="true"><use href="#'+id+'"/></svg>'; }

  /* ---------- MENU STRUCTURE (label, file, page id) ---------- */
  var HOUSE = [
    ["Households Home",     "households/index.html",              "households/index"],
    ["Kitchen Appliances",  "households/kitchen-appliances.html", "households/kitchen-appliances"],
    ["Kitchenware & Dining","households/kitchenware-dining.html", "households/kitchenware-dining"],
    ["Home Essentials",     "households/home-essentials.html",    "households/home-essentials"],
    ["Product Gallery",     "households/product-gallery.html",    "households/product-gallery"],
    ["Chama",               "households/chama.html",              "households/chama"],
    ["Households Contact",  "households/contact.html",            "households/contact"]
  ];
  var STUDIO = [
    ["Studio Home",           "studio/index.html",    "studio/index"],
    ["Portfolio",             "studio/portfolio.html","studio/portfolio"],
    ["Photography Services",  "studio/services.html", "studio/services"],
    ["About the Studio",      "studio/about.html",    "studio/about"],
    ["Studio Contact",        "studio/contact.html",  "studio/contact"]
  ];
  var TOP = [
    { label:"Home",               href:"index.html",       id:"index" },
    { label:"Households",         href:"households/index.html", id:"households", kids:HOUSE },
    { label:"Studio",             href:"studio/index.html",     id:"studio",     kids:STUDIO },
    { label:"About the Business", href:"about.html",       id:"about" },
    { label:"Contact",            href:"contact.html",     id:"contact" }
  ];
  function isActive(t){
    if(t.kids) return PAGE.indexOf(t.id + "/") === 0;
    return PAGE === t.id;
  }

  /* ---------- ICONS (hidden sprite) ---------- */
  var sprite = document.createElement("div");
  sprite.innerHTML = "<svg class=\"hide-sprite\" width=\"0\" height=\"0\" aria-hidden=\"true\"><defs><symbol id=\"i-camera\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><path d=\"M4 8h3l2-2h6l2 2h3v11H4z\" stroke-linejoin=\"round\"/><circle cx=\"12\" cy=\"13\" r=\"3.4\"/></symbol>\n<symbol id=\"i-home\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><path d=\"M4 11 12 4l8 7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M6 10v9h12v-9\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></symbol>\n<symbol id=\"i-whatsapp\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.87.5 3.62 1.4 5.14L2 22l4.98-1.3A9.94 9.94 0 0 0 12.02 22C17.55 22 22 17.52 22 12S17.55 2 12.02 2Zm0 18.1c-1.62 0-3.13-.44-4.42-1.2l-.32-.19-2.96.78.79-2.88-.2-.3a8.05 8.05 0 0 1-1.27-4.31c0-4.47 3.63-8.1 8.38-8.1 4.75 0 8.1 3.63 8.1 8.1s-3.63 8.1-8.1 8.1Zm4.44-6.06c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28Z\"/></symbol>\n<symbol id=\"i-phone\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><path d=\"M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.2 1L6.6 10.8Z\" stroke-linejoin=\"round\"/></symbol>\n<symbol id=\"i-pin\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><path d=\"M12 21s7-6.4 7-11.5A7 7 0 0 0 5 9.5C5 14.6 12 21 12 21Z\" stroke-linejoin=\"round\"/><circle cx=\"12\" cy=\"9.5\" r=\"2.4\"/></symbol>\n<symbol id=\"i-mail\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"m4 7 8 6 8-6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></symbol>\n<symbol id=\"i-clock\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3.5 2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></symbol>\n<symbol id=\"i-check\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M4 12.5 9 17l11-11\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></symbol>\n<symbol id=\"i-star\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 2.5l2.9 6.1 6.6.7-4.9 4.5 1.3 6.6-5.9-3.3-5.9 3.3 1.3-6.6-4.9-4.5 6.6-.7Z\"/></symbol>\n<symbol id=\"i-shield\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><path d=\"M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3Z\" stroke-linejoin=\"round\"/></symbol>\n<symbol id=\"i-truck\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><path d=\"M3 7h11v9H3z\" stroke-linejoin=\"round\"/><path d=\"M14 10h4l3 3v3h-7z\" stroke-linejoin=\"round\"/><circle cx=\"7\" cy=\"18\" r=\"1.6\"/><circle cx=\"17.5\" cy=\"18\" r=\"1.6\"/></symbol>\n<symbol id=\"i-users\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><circle cx=\"9\" cy=\"8\" r=\"3\"/><path d=\"M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6\" stroke-linecap=\"round\"/><circle cx=\"17.5\" cy=\"9\" r=\"2.4\"/><path d=\"M21 20c0-2.4-1.5-4.4-3.6-5.2\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"i-menu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M3 6h18M3 12h18M3 18h18\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"i-close\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M5 5l14 14M19 5 5 19\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"i-arrow\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M5 12h14M13 6l6 6-6 6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></symbol>\n<symbol id=\"i-facebook\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3V9.7c0-.4.3-.7.5-.7Z\"/></symbol>\n<symbol id=\"i-instagram\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"17.2\" cy=\"6.8\" r=\"1\"/></symbol>\n<symbol id=\"i-tiktok\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M14 3h2.6c.3 1.8 1.5 3.2 3.4 3.5v2.7c-1.3 0-2.5-.4-3.5-1.1v6.4c0 3.1-2.5 5.5-5.6 5.5S5 17.5 5 14.4c0-3 2.4-5.4 5.4-5.5v2.8c-1.5.1-2.6 1.3-2.6 2.7 0 1.5 1.2 2.7 2.7 2.7 1.5 0 2.7-1.2 2.7-2.7V3Z\"/></symbol>\n<symbol id=\"i-printer\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><path d=\"M6 9V4h12v5\" stroke-linejoin=\"round\"/><rect x=\"4\" y=\"9\" width=\"16\" height=\"7\" rx=\"1.5\"/><path d=\"M7 15h10v6H7z\"/></symbol>\n<symbol id=\"i-image\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"/><circle cx=\"8.5\" cy=\"9.5\" r=\"1.7\"/><path d=\"m4 17 5-5 3.5 3.5L17 11l3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></symbol>\n<symbol id=\"i-washer\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"/><circle cx=\"12\" cy=\"13\" r=\"5\"/><circle cx=\"12\" cy=\"13\" r=\"2\"/><circle cx=\"7\" cy=\"6\" r=\"0.8\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"10\" cy=\"6\" r=\"0.8\" fill=\"currentColor\" stroke=\"none\"/></symbol>\n<symbol id=\"i-pcooker\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><path d=\"M4 10h16v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6Z\"/><path d=\"M3 10h18\" stroke-linecap=\"round\"/><path d=\"M12 10V7\" stroke-linecap=\"round\"/><circle cx=\"12\" cy=\"5.5\" r=\"1.5\"/></symbol>\n<symbol id=\"i-flask2\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><rect x=\"8\" y=\"2\" width=\"8\" height=\"4\" rx=\"1\"/><path d=\"M7 6h10l1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L7 6Z\"/><path d=\"M7.5 11h9\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"i-stove\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><circle cx=\"9\" cy=\"12\" r=\"3\"/><circle cx=\"16\" cy=\"12\" r=\"3\" opacity=\"0.55\"/></symbol>\n<symbol id=\"i-table\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><path d=\"M3 9h11v2H3z\"/><path d=\"M5 11v8M12 11v8\" stroke-linecap=\"round\"/><path d=\"M13 13h8v2h-8z\" opacity=\"0.55\"/><path d=\"M14 15v6M20 15v6\" stroke-linecap=\"round\" opacity=\"0.55\"/></symbol>\n<symbol id=\"i-pan\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><circle cx=\"10\" cy=\"12\" r=\"6\"/><path d=\"M16 10l6-2\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"i-plates\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><ellipse cx=\"12\" cy=\"7\" rx=\"8\" ry=\"2.4\"/><ellipse cx=\"12\" cy=\"12\" rx=\"8\" ry=\"2.4\" opacity=\"0.7\"/><ellipse cx=\"12\" cy=\"17\" rx=\"8\" ry=\"2.4\" opacity=\"0.45\"/></symbol>\n<symbol id=\"i-kettle\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><path d=\"M5 12a7 7 0 0 1 14 0v3a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-3Z\"/><path d=\"M17 11l4-2\" stroke-linecap=\"round\"/><path d=\"M9 5V3M13 5V3\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"i-chevron\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\"><path d=\"m6 9 6 6 6-6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></symbol></defs></svg>";
  body.insertBefore(sprite.firstChild, body.firstChild);

  /* ---------- HEADER ---------- */
  function headerHTML(){
    var links = TOP.map(function(t){
      var cls = isActive(t) ? ' class="active"' : '';
      if(!t.kids) return '<a href="'+u(t.href)+'"'+cls+'>'+t.label+'</a>';
      var sub = t.kids.map(function(k){
        return '<a href="'+u(k[1])+'"'+(PAGE===k[2]?' aria-current="page"':'')+'>'+k[0]+'</a>';
      }).join("");
      return '<div class="has-menu"><a href="'+u(t.href)+'"'+cls+'>'+t.label+'</a>' +
             '<button class="menu-toggle" aria-expanded="false" aria-label="Show '+t.label+' pages">'+icon("i-chevron")+'</button>' +
             '<div class="dropdown">'+sub+'</div></div>';
    }).join("");

    var mm = TOP.map(function(t){
      if(!t.kids) return '<li><a href="'+u(t.href)+'">'+t.label+'</a></li>';
      var sub = t.kids.map(function(k){ return '<li><a href="'+u(k[1])+'">'+k[0]+'</a></li>'; }).join("");
      return '<li class="mm-group"><div class="mm-row"><a href="'+u(t.href)+'">'+t.label+'</a>' +
             '<button class="mm-exp" aria-expanded="false" aria-label="Show '+t.label+' pages">'+icon("i-chevron",22)+'</button></div>' +
             '<ul class="mm-sub" hidden>'+sub+'</ul></li>';
    }).join("");

    return '<div class="mobile-menu" id="mobileMenu" role="dialog" aria-label="Menu">' +
        '<div class="mobile-menu-top"><a class="nav-logo" href="'+u("index.html")+'"><span class="dot"></span>SKYLINK</a>' +
        '<button class="mobile-menu-close" id="mobileMenuClose" aria-label="Close menu">'+icon("i-close",26)+'</button></div>' +
        '<ul>'+mm+'</ul>' +
        '<a class="btn btn-gold" href="'+wa("Hi Skylink, I have a question.")+'" target="_blank" rel="noopener">'+icon("i-whatsapp",18)+'Chat on WhatsApp</a>' +
      '</div>' +
      '<header class="nav"><div class="wrap nav-row">' +
        '<a href="'+u("index.html")+'" class="nav-logo"><span class="dot"></span>SKYLINK</a>' +
        '<nav class="nav-links" aria-label="Primary">'+links+'</nav>' +
        '<div class="nav-cta"><a class="btn btn-navy btn-sm" href="'+u("contact.html")+'"><span class="btn-label">Get in touch</span>'+icon("i-arrow",16)+'</a>' +
        '<button class="nav-burger" id="mobileMenuOpen" aria-label="Open menu">'+icon("i-menu",26)+'</button></div>' +
      '</div></header>';
  }

  function subnavHTML(){
    var list = BRANCH === "households" ? HOUSE : BRANCH === "studio" ? STUDIO : null;
    if(!list) return "";
    return '<nav class="subnav '+(BRANCH==="households"?"house":"studio")+'" aria-label="'+(BRANCH==="households"?"Households":"Studio")+' pages"><div class="wrap">' +
      list.map(function(k){ return '<a href="'+u(k[1])+'"'+(PAGE===k[2]?' class="active" aria-current="page"':'')+'>'+k[0]+'</a>'; }).join("") +
      '</div></nav>';
  }

  /* ---------- FOOTER ---------- */
  function footerHTML(){
    var h = HOUSE.map(function(k){ return '<li><a href="'+u(k[1])+'">'+k[0]+'</a></li>'; }).join("");
    var s = STUDIO.map(function(k){ return '<li><a href="'+u(k[1])+'">'+k[0]+'</a></li>'; }).join("");
    return '<footer><div class="wrap">' +
      '<div class="footer-cols">' +
        '<div class="footer-brand"><a class="nav-logo" href="'+u("index.html")+'"><span class="dot"></span>SKYLINK</a>' +
          '<p>Your moments. Your home. One place.</p><p>'+esc(C.location)+'</p>' +
          '<a class="qr-box" href="'+u("assets/img/qr-skylink.png")+'" target="_blank" rel="noopener"><img src="'+u("assets/img/qr-skylink.png")+'" alt="QR code linking to the Skylink website" width="76" height="76"><span>Scan to visit our website</span></a></div>' +
        '<div><h4>Households</h4><ul>'+h+'</ul></div>' +
        '<div><h4>Skylink Studios</h4><ul>'+s+'</ul></div>' +
        '<div><h4>Contact</h4><ul class="footer-contact">' +
          '<li>Households: <a href="tel:'+C.householdsPhone.tel+'">'+C.householdsPhone.display+'</a></li>' +
          '<li>Studio: <a href="tel:'+C.studioPhones[1].tel+'">'+C.studioPhones[1].display+'</a></li>' +
          '<li><a href="mailto:'+C.email+'">'+C.email+'</a></li>' +
          '<li><a href="'+u("about.html")+'">About the Business</a></li><li><a href="'+u("contact.html")+'">Contact</a></li></ul></div>' +
      '</div>' +
      '<div class="footer-bottom"><span>© '+new Date().getFullYear()+' Skylink. All rights reserved.</span><span>Households + Skylink Studios — '+esc(C.location)+'</span></div>' +
    '</div></footer>';
  }

  function floatWA(){
    var studio = BRANCH === "studio";
    var a = document.createElement("a");
    a.className = "wa-float"; a.target = "_blank"; a.rel = "noopener";
    a.setAttribute("aria-label", "Chat with Skylink on WhatsApp");
    a.href = studio ? wa("Hi Skylink, I'd like to book a photography session.", "studio") : wa("Hi Skylink, I have a question.");
    a.innerHTML = icon("i-whatsapp");
    return a;
  }

  var hd = document.getElementById("site-header");
  if(hd) hd.innerHTML = headerHTML() + subnavHTML();
  var ft = document.getElementById("site-footer");
  if(ft) ft.innerHTML = footerHTML();
  body.appendChild(floatWA());

  /* ---------- MENU BEHAVIOUR ---------- */
  var menu = document.getElementById("mobileMenu");
  function openMenu(){ menu.classList.add("open"); body.style.overflow = "hidden"; }
  function closeMenu(){ menu.classList.remove("open"); body.style.overflow = ""; }
  var openBtn = document.getElementById("mobileMenuOpen"), closeBtn = document.getElementById("mobileMenuClose");
  if(openBtn) openBtn.addEventListener("click", openMenu);
  if(closeBtn) closeBtn.addEventListener("click", closeMenu);

  document.querySelectorAll(".mm-exp").forEach(function(b){
    b.addEventListener("click", function(){
      var sub = b.closest(".mm-group").querySelector(".mm-sub");
      var open = sub.hasAttribute("hidden");
      if(open) sub.removeAttribute("hidden"); else sub.setAttribute("hidden","");
      b.setAttribute("aria-expanded", open ? "true" : "false");
      b.parentNode.classList.toggle("open", open);
    });
  });
  document.querySelectorAll(".has-menu").forEach(function(g){
    var btn = g.querySelector(".menu-toggle");
    btn.addEventListener("click", function(e){
      e.stopPropagation();
      var open = !g.classList.contains("open");
      document.querySelectorAll(".has-menu.open").forEach(function(o){ o.classList.remove("open"); o.querySelector(".menu-toggle").setAttribute("aria-expanded","false"); });
      g.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  document.addEventListener("click", function(){
    document.querySelectorAll(".has-menu.open").forEach(function(o){ o.classList.remove("open"); o.querySelector(".menu-toggle").setAttribute("aria-expanded","false"); });
  });
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape"){
      closeMenu();
      document.querySelectorAll(".has-menu.open").forEach(function(o){ o.classList.remove("open"); o.querySelector(".menu-toggle").setAttribute("aria-expanded","false"); });
    }
  });

  /* ---------- WHATSAPP / PHONE LINKS IN PAGE CONTENT ----------
     <a data-wa="Message text" data-wa-to="studio">  -> WhatsApp link
     <a data-tel="households">  or  data-tel="studio:1"  -> tel: link   */
  document.querySelectorAll("[data-wa]").forEach(function(a){
    a.href = wa(a.getAttribute("data-wa"), a.getAttribute("data-wa-to"));
    a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll("[data-tel]").forEach(function(a){
    var v = a.getAttribute("data-tel"), p = v === "households" ? C.householdsPhone : C.studioPhones[Number(v.split(":")[1])];
    a.href = "tel:" + p.tel;
    if(a.hasAttribute("data-show")) a.textContent = p.display;
  });
  document.querySelectorAll("[data-maps]").forEach(function(a){ a.href = C.mapsUrl; a.target = "_blank"; a.rel = "noopener"; });
  document.querySelectorAll("[data-mapframe]").forEach(function(f){ f.src = C.mapsEmbed; });
  document.querySelectorAll("[data-email]").forEach(function(a){ a.href = "mailto:" + C.email; a.textContent = C.email; });

  document.querySelectorAll("[data-num]").forEach(function(s){
    var v = s.getAttribute("data-num");
    s.textContent = (v === "households" ? C.householdsPhone : C.studioPhones[Number(v.split(":")[1])]).display;
  });

  /* ---------- ENQUIRY / BOOKING FORMS -> WhatsApp ---------- */
  document.querySelectorAll("form[data-wa-form]").forEach(function(f){
    f.addEventListener("submit", function(e){
      e.preventDefault();
      var lines = [f.getAttribute("data-intro")];
      f.querySelectorAll("[name]").forEach(function(el){
        if(el.value.trim()) lines.push(el.getAttribute("data-label") + ": " + el.value.trim());
      });
      window.open(wa(lines.join("\n"), f.getAttribute("data-wa-to")), "_blank", "noopener");
    });
  });

  /* ---------- PRODUCT CARDS ---------- */
  function cardHTML(p){
    var img = p.img
      ? '<div class="ph-photo"><img src="'+u(p.img)+'" alt="'+esc(p.name)+'" loading="lazy"></div>'
      : '<div class="ph-img icon-tile">'+icon(p.icon || "i-image")+'</div>';
    var price = (p.price == null) ? "Ask for price" : money(p.price);
    var msg = (p.price == null)
      ? "Hi Skylink, I'm interested in the " + p.name + ". Could you tell me the price and if it is available?"
      : "Hi Skylink, I'm interested in the " + p.name + " priced at " + money(p.price) + ". Is it available?";
    return '<article class="product-card" id="'+p.id+'">' + img +
      '<div class="product-body"><span class="product-cat">'+esc(p.category)+'</span>' +
      '<h3 class="product-name">'+esc(p.name)+'</h3><p class="product-desc">'+esc(p.desc)+'</p>' +
      '<div class="product-meta"><span class="product-price">'+price+'</span><span class="product-avail low">Ask availability</span></div>' +
      '<div class="product-actions"><a class="btn btn-green btn-sm" href="'+wa(msg)+'" target="_blank" rel="noopener">Ask on WhatsApp</a>' +
      '<a class="btn btn-outline btn-sm" href="'+u("households/"+p.page+".html")+'#'+p.id+'">View Product</a></div></div></article>';
  }
  document.querySelectorAll("[data-products]").forEach(function(box){
    var only = box.getAttribute("data-products");           // "all" or a page name
    var list = PRODUCTS.filter(function(p){ return only === "all" || p.page === only; });
    var grid = box.querySelector(".product-grid");
    function draw(cat){
      var shown = list.filter(function(p){ return !cat || cat === "All" || p.category === cat; });
      grid.innerHTML = shown.length ? shown.map(cardHTML).join("") : '<p>No products in this category yet — ask us on WhatsApp.</p>';
    }
    var tabs = box.querySelector(".tabs.products"), sel = box.querySelector(".cat-select");
    if(tabs && sel){
      var cats = ["All"].concat(list.map(function(p){ return p.category; }).filter(function(c,i,a){ return a.indexOf(c) === i; }));
      cats.forEach(function(c, i){
        var b = document.createElement("button"); b.type = "button";
        b.className = "tab-btn light" + (i === 0 ? " active" : ""); b.textContent = c;
        b.addEventListener("click", function(){
          tabs.querySelectorAll(".tab-btn").forEach(function(x){ x.classList.toggle("active", x === b); });
          sel.value = c; draw(c);
        });
        tabs.appendChild(b);
        var o = document.createElement("option"); o.value = c; o.textContent = c; sel.appendChild(o);
      });
      sel.addEventListener("change", function(){
        tabs.querySelectorAll(".tab-btn").forEach(function(x){ x.classList.toggle("active", x.textContent === sel.value); });
        draw(sel.value);
      });
    }
    draw("All");
  });

  /* ---------- SCROLL REVEAL ---------- */
  var els = document.querySelectorAll(".why-card, .service-item, .chama-step, .price-card, .link-card");
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold:0.12 });
    els.forEach(function(el){ el.classList.add("reveal"); io.observe(el); });
  }
})();
