document.addEventListener("DOMContentLoaded", function () {
  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Dropdown
  var dropdown = document.querySelector(".dropdown");
  var toggle = document.getElementById("dropdown-toggle");
  var panel = document.getElementById("dropdown-panel");
  if (dropdown && toggle && panel) {
    function setOpen(isOpen) {
      dropdown.setAttribute("data-open", String(isOpen));
      toggle.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) {
        panel.removeAttribute("hidden");
      } else {
        // Delay hiding until transition ends for smooth collapse
        panel.addEventListener("transitionend", function onEnd(e) {
          if (dropdown.getAttribute("data-open") !== "true") {
            panel.setAttribute("hidden", "");
          }
          panel.removeEventListener("transitionend", onEnd);
        });
      }
    }

    toggle.addEventListener("click", function () {
      var open = dropdown.getAttribute("data-open") === "true";
      setOpen(!open);
    });
  }
});
