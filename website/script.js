/*
 * Emir YILDIRIM's C/C++ Guide - tiny client side helpers
 *
 *  - minimal C/C++ syntax highlighting
 *  - highlight the current section in the sidebar
 *  - mobile "Contents" toggle
 *  - dark / light mode toggle
 *
 * The page is fully readable with JavaScript disabled.
 */

(function () {
  "use strict";

  /* ---------- syntax highlighting ---------- */

  var KEYWORDS = [
    "alignas", "alignof", "auto", "break", "case", "catch", "class", "const",
    "constexpr", "continue", "default", "delete", "do", "else", "enum",
    "explicit", "extern", "for", "friend", "goto", "if", "inline", "namespace",
    "new", "noexcept", "nullptr", "operator", "private", "protected", "public",
    "return", "sizeof", "static", "struct", "switch", "template", "this",
    "throw", "try", "typedef", "typename", "union", "using", "virtual",
    "volatile", "while", "true", "false", "NULL"
  ];
  var TYPES = [
    "bool", "char", "double", "float", "int", "long", "short", "signed",
    "unsigned", "void", "size_t", "ssize_t", "std"
  ];

  var kwSet = Object.create(null);
  KEYWORDS.forEach(function (k) { kwSet[k] = "hl-kw"; });
  TYPES.forEach(function (k) { kwSet[k] = "hl-type"; });

  // One regex, alternatives tried left to right.
  var TOKEN = new RegExp([
    "(\\/\\/[^\\n]*)",                 // 1 line comment
    "(\\/\\*[\\s\\S]*?\\*\\/)",        // 2 block comment
    "(\"(?:\\\\.|[^\"\\\\])*\")",      // 3 string
    "('(?:\\\\.|[^'\\\\])')",          // 4 char
    "(^[ \\t]*#[^\\n]*)",              // 5 preprocessor line
    "(\\b\\d+(?:\\.\\d+)?\\b)",        // 6 number
    "([A-Za-z_][A-Za-z0-9_]*)"         // 7 identifier
  ].join("|"), "gm");

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function wrap(cls, text) {
    return '<span class="' + cls + '">' + escapeHtml(text) + "</span>";
  }

  function highlight(src) {
    var out = "";
    var last = 0;
    var m;
    TOKEN.lastIndex = 0;
    while ((m = TOKEN.exec(src)) !== null) {
      out += escapeHtml(src.slice(last, m.index));
      if (m[1] || m[2]) out += wrap("hl-com", m[0]);
      else if (m[3] || m[4]) out += wrap("hl-str", m[0]);
      else if (m[5]) out += wrap("hl-pre", m[0]);
      else if (m[6]) out += wrap("hl-num", m[0]);
      else if (m[7] && kwSet[m[7]]) out += wrap(kwSet[m[7]], m[0]);
      else out += escapeHtml(m[0]);
      last = TOKEN.lastIndex;
    }
    return out + escapeHtml(src.slice(last));
  }

  document.querySelectorAll("pre code.lang-cpp").forEach(function (el) {
    el.innerHTML = highlight(el.textContent);
  });

  /* ---------- active section in sidebar ---------- */

  var links = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  var targets = links
    .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);

  function setActive() {
    var current = null;
    var offset = window.innerHeight * 0.25;
    for (var i = 0; i < targets.length; i++) {
      if (targets[i].getBoundingClientRect().top - offset <= 0) current = targets[i];
    }
    // at the very bottom, the last section is the active one
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      current = targets[targets.length - 1];
    }
    links.forEach(function (a) {
      a.classList.toggle("active", !!current && a.getAttribute("href") === "#" + current.id);
    });
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { setActive(); ticking = false; });
  }, { passive: true });
  setActive();

  /* ---------- mobile contents toggle ---------- */

  var sidebar = document.getElementById("sidebar");
  var menuToggle = document.getElementById("menu-toggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      var open = sidebar.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.forEach(function (a) {
      a.addEventListener("click", function () {
        sidebar.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- theme toggle ---------- */

  var root = document.documentElement;
  var themeToggle = document.getElementById("theme-toggle");

  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function updateLabel() {
    if (themeToggle) themeToggle.textContent = isDark() ? "Switch to light mode" : "Switch to dark mode";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      updateLabel();
    });
    updateLabel();
  }
})();
