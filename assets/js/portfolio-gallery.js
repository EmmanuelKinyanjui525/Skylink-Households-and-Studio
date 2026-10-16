/* Portfolio gallery: category filter + photo viewer (lightbox). Data lives in portfolio.js */
(function(){
  "use strict";
  var grid = document.getElementById("portfolioGrid"); if(!grid) return;
  var ROOT = document.body.getAttribute("data-root") || "";
  var DATA = window.SKYLINK_PORTFOLIO, CATS = window.SKYLINK_CATEGORIES, INFO = window.SKYLINK_CATEGORY_INFO;
  var filters = document.getElementById("portfolioFilters"), bar = document.getElementById("catInfo");
  var cur = "All", shown = [];

  function src(p){ return ROOT + "assets/img/portfolio/" + p.f; }
  function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;"); }

  DATA.forEach(function(p, i){
    var f = document.createElement("figure");
    f.tabIndex = 0; f.setAttribute("role","button"); f.setAttribute("aria-label","Open " + p.c[0].toLowerCase() + " photo");
    f.innerHTML = '<div class="ph-photo"><img loading="lazy" width="'+p.w+'" height="'+p.h+'" alt="Skylink Studios '+esc(p.c[0].toLowerCase())+' photograph" src="'+src(p)+'"></div>';
    f.addEventListener("click", function(){ openLb(p); });
    f.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); openLb(p); } });
    p.el = f; grid.appendChild(f);
  });

  function setCat(c, btn){
    cur = c;
    filters.querySelectorAll(".tab-btn").forEach(function(b){ b.classList.toggle("active", b === btn); b.setAttribute("aria-pressed", b === btn); });
    DATA.forEach(function(p){ p.el.hidden = !(c === "All" || p.c.indexOf(c) !== -1); });
    var n = DATA.filter(function(p){ return !p.el.hidden; }).length;
    var info = INFO[c];
    if(info){
      bar.hidden = false;
      bar.innerHTML = '<div><strong>'+esc(info.title)+'</strong><span class="amt">'+esc(info.price)+'</span><span class="note">'+esc(info.note)+'</span></div>' +
        '<a class="btn btn-gold btn-sm" target="_blank" rel="noopener" href="'+window.SkylinkWA(info.msg, "studio")+'">Book '+esc(c)+'</a>';
    } else {
      bar.hidden = false;
      bar.innerHTML = '<div><strong>'+(c === "All" ? "All our work" : esc(c))+'</strong><span class="note">'+n+' photos · Ask us for a quote</span></div>' +
        '<a class="btn btn-gold btn-sm" target="_blank" rel="noopener" href="'+window.SkylinkWA("Hi Skylink, I'd like to book a photography session.", "studio")+'">Book a Session</a>';
    }
  }
  ["All"].concat(CATS.filter(function(c){ return DATA.some(function(p){ return p.c.indexOf(c) !== -1; }); })).forEach(function(c, i){
    var b = document.createElement("button"); b.type = "button"; b.className = "tab-btn" + (i === 0 ? " active" : "");
    b.textContent = c; b.setAttribute("aria-pressed", i === 0);
    b.addEventListener("click", function(){ setCat(c, b); });
    filters.appendChild(b);
  });
  setCat("All", filters.querySelector(".tab-btn"));

  /* lightbox */
  var lb = document.getElementById("lb"), lbi = lb.querySelector("img"), cap = lb.querySelector(".cap"), idx = 0, lastFocus = null;
  function list(){ return DATA.filter(function(p){ return !p.el.hidden; }); }
  function show(){ var L = list(), p = L[idx]; lbi.src = src(p); lbi.alt = "Skylink Studios " + p.c[0].toLowerCase() + " photograph"; cap.textContent = p.c[0] + "  ·  " + (idx + 1) + " / " + L.length; }
  function openLb(p){ lastFocus = document.activeElement; idx = list().indexOf(p); show(); lb.classList.add("open"); document.body.style.overflow = "hidden"; lb.querySelector(".x").focus(); }
  function closeLb(){ lb.classList.remove("open"); document.body.style.overflow = ""; if(lastFocus) lastFocus.focus(); }
  function step(d){ var L = list(); idx = (idx + d + L.length) % L.length; show(); }
  lb.querySelector(".x").addEventListener("click", closeLb);
  lb.querySelector(".p").addEventListener("click", function(){ step(-1); });
  lb.querySelector(".n").addEventListener("click", function(){ step(1); });
  lb.addEventListener("click", function(e){ if(e.target === lb) closeLb(); });
  document.addEventListener("keydown", function(e){
    if(!lb.classList.contains("open")) return;
    if(e.key === "Escape") closeLb(); if(e.key === "ArrowLeft") step(-1); if(e.key === "ArrowRight") step(1);
  });
})();
