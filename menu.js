// Phone menu: opens and closes the page list behind the square at top right.
// Without this script the menu simply shows as a plain list at the top of the page.
(function () {
  var html = document.documentElement;
  var btn = document.querySelector(".menu-btn");
  var menu = document.getElementById("menu");
  if (!btn || !menu) return;

  function isOpen() {
    return html.classList.contains("menu-open");
  }

  function setOpen(open) {
    html.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = !isOpen();
    setOpen(open);
    if (open) {
      var first = menu.querySelector("a");
      if (first) first.focus();
    }
  });

  // Tapping the photo strip (anywhere outside the menu) closes it
  document.addEventListener("click", function (e) {
    if (isOpen() && !menu.contains(e.target)) setOpen(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      btn.focus();
    }
  });

  // Rotating the phone or resizing the window should not leave it open
  var mq = window.matchMedia("(max-width: 700px)");
  if (mq.addEventListener) {
    mq.addEventListener("change", function () { setOpen(false); });
  } else if (mq.addListener) {
    mq.addListener(function () { setOpen(false); });
  }

  // Coming back with the browser's back button should show a closed menu
  window.addEventListener("pageshow", function () { setOpen(false); });
})();
