const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
}

menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});
navigation.addEventListener("click", () => setMenu(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});

const homeLink = navigation.querySelector('[href="#home"]');
const publicationsLink = navigation.querySelector('[href="#publications"]');
function markSection() {
  const selected = location.hash === "#publications" ? publicationsLink : homeLink;
  [homeLink, publicationsLink].forEach(link => link.removeAttribute("aria-current"));
  selected.setAttribute("aria-current", "location");
}
window.addEventListener("hashchange", markSection);
markSection();

document.querySelectorAll(".disclosure").forEach(button => {
  const panel = document.getElementById(button.getAttribute("aria-controls"));
  button.addEventListener("click", () => {
    const opening = panel.hidden;
    panel.hidden = !opening;
    button.setAttribute("aria-expanded", String(opening));
    if (button.dataset.openText) {
      button.querySelector("span").textContent = opening ? button.dataset.openText : button.dataset.closedText;
    }
  });
});
