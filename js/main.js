const body = document.querySelector("body");
const changeableImages = document.querySelectorAll("img[changeable]");
const changeableSources = document.querySelectorAll("source[changeable]");
const switchableElements = document.querySelectorAll("*[switchable]");

const burgerMenu = document.querySelector(".header__burger-menu");
const burgerMenuImg = document.querySelector(".header__burger-menu img");
const burgerMenuContainer = document.querySelector(
  ".header__burger-menu-container"
);

const themeSwitcher = document.querySelector(".theme-switcher");

const links = document.querySelectorAll(".links");

const header = document.querySelector(".header");
const nav = document.querySelector(".header__nav");

const switchTheme = function () {
  let currentTheme = body.dataset.theme;
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  changeableImages.forEach(
    (image) => (image.src = image.src.replace(currentTheme, newTheme))
  );
  changeableSources.forEach((source) =>
    source.setAttribute(
      "srcset",
      source.getAttribute("srcset").replaceAll(currentTheme, newTheme)
    )
  );
  switchableElements.forEach((el) =>
    el.classList.toggle(`${el.classList[0]}--light`)
  );
  body.dataset.theme = newTheme;
};

const toggleMenu = function () {
  burgerMenu.classList.toggle("header__burger-menu--active");
  if (
    burgerMenuContainer.classList.contains(
      "header__burger-menu-container--active"
    )
  ) {
    setTimeout(function () {
      burgerMenuContainer.classList.toggle(
        "header__burger-menu-container--active"
      );
    }, 300);
    burgerMenuContainer.style.animationName = "burgerMenuCloseAnimation";
  } else {
    burgerMenuContainer.classList.toggle(
      "header__burger-menu-container--active"
    );
    burgerMenuContainer.style.animationName = "burgerMenuOpenAnimation";
  }
};

themeSwitcher.addEventListener("click", switchTheme);

burgerMenu.addEventListener("click", toggleMenu);

links.forEach((links) =>
  links.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("link"))
      document
        .querySelector(`${e.target.getAttribute("href")}`)
        .scrollIntoView({ behavior: "smooth" });
  })
);

const headerObserver = new IntersectionObserver(
  function ([entry]) {
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  },
  {
    root: null,
    rootMargin: `-${nav.getBoundingClientRect().height}px`,
    threshold: 0.1,
  }
);

headerObserver.observe(header);

AOS.init();
