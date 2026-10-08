const page = document.querySelector(".page");
const menu = document.querySelector(".page-header__nav");
const menuButton = document.querySelector(".page-header__toggle");
const menuLinks = document.querySelectorAll(".nav__link");
const productButtons = document.querySelectorAll(".product-card__button");
const mobileViewport = window.matchMedia("(max-width: 820px)");

const setMenuState = (isOpen) => {
  const menuIsOpen = mobileViewport.matches && isOpen;
  const menuLabel = menuIsOpen ? "Cerrar menú" : "Abrir menú";

  menu.classList.toggle("page-header__nav--open", menuIsOpen);
  menuButton.classList.toggle("page-header__toggle--active", menuIsOpen);
  menuButton.setAttribute("aria-expanded", String(menuIsOpen));
  menuButton.setAttribute("aria-label", menuLabel);
  menuButton.setAttribute("title", menuLabel);
  menu.inert = mobileViewport.matches && !menuIsOpen;
  page.classList.toggle("page--locked", menuIsOpen);
};

const closeMenu = (restoreFocus = false) => {
  const wasOpen = menuButton.getAttribute("aria-expanded") === "true";

  setMenuState(false);

  if (restoreFocus && wasOpen) {
    menuButton.focus();
  }
};

menuButton.addEventListener("click", () => {
  setMenuState(menuButton.getAttribute("aria-expanded") !== "true");
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu(true);
  }
});

document.addEventListener("click", (event) => {
  if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
    closeMenu();
  }
});

document.addEventListener("focusin", (event) => {
  if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
    closeMenu();
  }
});

productButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.textContent = "AÑADIDO";
    button.disabled = true;
  });
});

mobileViewport.addEventListener("change", () => {
  const focusIsInsideMenu = menu.contains(document.activeElement);

  closeMenu();

  if (mobileViewport.matches && focusIsInsideMenu) {
    menuButton.focus();
  }
});

setMenuState(false);
