/* ======================
IMAGE SLIDER (SAFE)
====================== */
const slides = document.querySelector(".slides");

if (slides) {
  let index = 0;
  const total = slides.children.length;

  setInterval(() => {
    index = (index + 1) % total;

    // safer than fixed 650px
    const slideWidth = slides.offsetWidth;

    slides.style.transform = `translateX(-${index * slideWidth}px)`;
  }, 3000);
}

/* ======================
PRODUCT POPUP (SAFE)
====================== */
const products = document.querySelectorAll(".product img");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popupImg");
const closeBtn = document.getElementById("close");

if (products.length && popup && popupImg) {
  products.forEach((img) => {
    img.addEventListener("click", () => {
      popup.style.display = "flex";
      popupImg.src = img.src;
    });
  });
}

if (closeBtn && popup) {
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
}

if (popup) {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
}

/* ======================
TIKTOK BUTTON
====================== */
function openTikTok() {
  window.open(
    "https://www.tiktok.com/@miss.a.craftsandstuffs",
    "_blank"
  );
}

/* ======================
SMOOTH SCROLL (SAFE)
====================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = this.getAttribute("href");

    if (!target || target === "#") return;

    const el = document.querySelector(target);
    if (!el) return;

    e.preventDefault();

    el.scrollIntoView({
      behavior: "smooth",
    });
  });
});

/* ======================
FADE IN SCROLL (SAFE)
====================== */
const reveal = document.querySelectorAll(
  ".section,.features,.contact"
);

if (reveal.length) {
  reveal.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    item.style.transition = ".8s";
  });

  function showSections() {
    reveal.forEach((section) => {
      const top = section.getBoundingClientRect().top;

      if (top < window.innerHeight - 100) {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }
    });
  }

  window.addEventListener("scroll", showSections);
  showSections();
}

/* ======================
CART COUNTER FIX (IMPORTANT)
====================== */
function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = totalItems;
}

// run on page load
document.addEventListener("DOMContentLoaded", updateCartBadge);