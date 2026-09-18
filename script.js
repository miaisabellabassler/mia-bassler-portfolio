const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "Close" : "Menu";
    document.body.classList.toggle("menu-open", isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "Menu";
      document.body.classList.remove("menu-open");
    }
  });
}

const lookbookTrack = document.querySelector(".styled-lookbook-track");
const lookbookPrev = document.querySelector(".lookbook-prev");
const lookbookNext = document.querySelector(".lookbook-next");
const lookbookCurrent = document.querySelector(".lookbook-current");

if (lookbookTrack && lookbookPrev && lookbookNext && lookbookCurrent) {
  const cards = Array.from(lookbookTrack.querySelectorAll("figure"));

  const updateLookbook = () => {
    const trackLeft = lookbookTrack.getBoundingClientRect().left;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    lookbookCurrent.textContent = String(closestIndex + 1).padStart(2, "0");
    lookbookPrev.disabled = closestIndex === 0;
    lookbookNext.disabled =
      lookbookTrack.scrollLeft + lookbookTrack.clientWidth >= lookbookTrack.scrollWidth - 2;
  };

  const scrollLookbook = (direction) => {
    const card = cards[0];
    const gap = parseFloat(getComputedStyle(lookbookTrack).columnGap) || 0;
    lookbookTrack.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  };

  lookbookPrev.addEventListener("click", () => scrollLookbook(-1));
  lookbookNext.addEventListener("click", () => scrollLookbook(1));
  lookbookTrack.addEventListener("scroll", updateLookbook, { passive: true });
  window.addEventListener("resize", updateLookbook);
  updateLookbook();
}
