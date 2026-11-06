document.documentElement.classList.add("js");

const STORAGE_KEYS = {
  theme: "toa-theme",
  favorites: "toa-favorites",
};

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
  }
}

function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    const next = theme === "dark" ? "light" : "dark";
    toggle.setAttribute("aria-label", `Switch to ${next} mode`);
    toggle.setAttribute("title", `Switch to ${next} mode`);
  };

  applyTheme(readStorage(STORAGE_KEYS.theme, "dark"));

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    writeStorage(STORAGE_KEYS.theme, next);
  });
}

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  const setOpen = (isOpen) => {
    nav.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

function initScrollEffects() {
  const header = document.querySelector(".site-header");
  const backToTop = document.querySelector(".back-to-top");

  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 10);
    if (backToTop) backToTop.classList.toggle("is-visible", y > 600);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

let favorites = readStorage(STORAGE_KEYS.favorites, []);

function renderFavoriteButton(button) {
  const id = button.dataset.id;
  const isFav = favorites.includes(id);
  const label = button.querySelector(".fav-label");

  button.classList.toggle("is-favorite", isFav);
  button.setAttribute("aria-pressed", String(isFav));
  if (label) label.textContent = isFav ? "Saved" : "Favorite";
}

function updateFavoriteBadge() {
  document.querySelectorAll(".fav-badge").forEach((badge) => {
    badge.textContent = favorites.length;
    badge.dataset.count = favorites.length;
  });
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter((favId) => favId !== id);
  } else {
    favorites.push(id);
  }
  writeStorage(STORAGE_KEYS.favorites, favorites);
}

function initFavorites() {
  const buttons = document.querySelectorAll(".fav-btn");

  buttons.forEach((button) => {
    renderFavoriteButton(button);

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      toggleFavorite(button.dataset.id);

      document
        .querySelectorAll(`.fav-btn[data-id="${button.dataset.id}"]`)
        .forEach(renderFavoriteButton);

      updateFavoriteBadge();

      document.dispatchEvent(new CustomEvent("favorites:changed"));
    });
  });

  updateFavoriteBadge();
}

function initRecipeFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".recipe-card");
  if (!filterButtons.length || !cards.length) return;

  const searchInput = document.getElementById("recipe-search");
  const countEl = document.getElementById("results-count");
  const emptyState = document.getElementById("empty-state");

  let activeFilter = "all";

  function applyFilter() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    let visible = 0;

    for (const card of cards) {
      const region = card.dataset.region;
      const text = card.textContent.toLowerCase();

      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "favorites" && favorites.includes(card.dataset.id)) ||
        region === activeFilter;
      const matchesSearch = query === "" || text.includes(query);
      const show = matchesFilter && matchesSearch;

      const wasHidden = card.classList.contains("hidden");
      card.classList.toggle("hidden", !show);

      if (show && wasHidden) {
        card.classList.remove("is-entering");
        void card.offsetWidth;
        card.classList.add("is-entering");
      }

      if (show) visible++;
    }

    if (countEl) {
      countEl.textContent = `Showing ${visible} of ${cards.length} dishes`;
    }

    if (emptyState) {
      emptyState.classList.toggle("hidden", visible > 0);
      const msg = emptyState.querySelector(".empty-text");
      if (msg) {
        msg.textContent =
          activeFilter === "favorites" && query === ""
            ? "You haven't saved any favourites yet. Use the Favorite button on any dish to save it here."
            : "No dishes match your search. Try another region or keyword.";
      }
    }
  }

  function setActiveFilter(filter) {
    activeFilter = filter;
    filterButtons.forEach((btn) => {
      const isActive = btn.dataset.filter === filter;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
    applyFilter();
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => setActiveFilter(button.dataset.filter));
  });

  if (searchInput) searchInput.addEventListener("input", applyFilter);

  document.addEventListener("favorites:changed", () => {
    if (activeFilter === "favorites") applyFilter();
  });

  const requested = new URLSearchParams(window.location.search).get("filter");
  const valid = [...filterButtons].some((btn) => btn.dataset.filter === requested);
  setActiveFilter(valid ? requested : "all");
}

function formatQuantity(value) {
  const fractions = [
    [0, ""], [0.125, "⅛"], [0.25, "¼"], [0.333, "⅓"], [0.5, "½"],
    [0.667, "⅔"], [0.75, "¾"], [1, ""],
  ];

  if (value >= 20) return String(Math.round(value));

  let whole = Math.floor(value);
  const remainder = value - whole;

  let closest = fractions[0];
  for (const fraction of fractions) {
    if (Math.abs(fraction[0] - remainder) < Math.abs(closest[0] - remainder)) {
      closest = fraction;
    }
  }

  if (closest[0] === 1) whole += 1;
  const result = `${whole > 0 ? whole : ""}${closest[1]}`;
  return result || "a pinch";
}

function initIngredientScaler() {
  const scaler = document.querySelector(".scaler");
  if (!scaler) return;

  const output = scaler.querySelector("output");
  const minus = scaler.querySelector('[data-step="-1"]');
  const plus = scaler.querySelector('[data-step="1"]');
  const quantities = document.querySelectorAll(".qty[data-base]");
  const baseServings = Number(scaler.dataset.baseServings);
  let servings = baseServings;

  function render() {
    output.textContent = servings;
    minus.disabled = servings <= 1;
    plus.disabled = servings >= 20;

    const ratio = servings / baseServings;
    quantities.forEach((qty) => {
      qty.textContent = formatQuantity(Number(qty.dataset.base) * ratio);
      qty.classList.remove("is-updated");
      void qty.offsetWidth;
      qty.classList.add("is-updated");
    });
  }

  [minus, plus].forEach((button) => {
    button.addEventListener("click", () => {
      servings = Math.min(20, Math.max(1, servings + Number(button.dataset.step)));
      render();
    });
  });

  render();
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = form.querySelector("#name");
  const emailInput = form.querySelector("#email");
  const countrySelect = form.querySelector("#country");
  const messageInput = form.querySelector("#message");
  const charCount = form.querySelector(".char-count");
  const successBox = document.getElementById("form-success");
  const MIN_MESSAGE_LENGTH = 20;

  function setError(input, message) {
    const field = input.closest(".field");
    const errorEl = field.querySelector(".error-message");
    field.classList.toggle("has-error", Boolean(message));
    input.setAttribute("aria-invalid", String(Boolean(message)));
    if (errorEl) errorEl.textContent = message;
  }

  function validateName() {
    const ok = nameInput.value.trim().length >= 2;
    setError(nameInput, ok ? "" : "Please enter your name (at least 2 characters).");
    return ok;
  }

  function validateEmail() {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const ok = pattern.test(emailInput.value.trim());
    setError(emailInput, ok ? "" : "Please enter a valid email address.");
    return ok;
  }

  function validateCountry() {
    const ok = countrySelect.value !== "";
    setError(countrySelect, ok ? "" : "Please choose your country.");
    return ok;
  }

  function validateMessage() {
    const length = messageInput.value.trim().length;
    const ok = length > MIN_MESSAGE_LENGTH;
    setError(
      messageInput,
      ok ? "" : `Your message must be more than ${MIN_MESSAGE_LENGTH} characters (currently ${length}).`
    );
    return ok;
  }

  messageInput.addEventListener("input", () => {
    const length = messageInput.value.trim().length;
    charCount.textContent = `${length} / ${MIN_MESSAGE_LENGTH + 1}+ characters`;
    charCount.classList.toggle("is-valid", length > MIN_MESSAGE_LENGTH);
    if (messageInput.closest(".field").classList.contains("has-error")) validateMessage();
  });

  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  countrySelect.addEventListener("change", validateCountry);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const results = [validateName(), validateEmail(), validateCountry(), validateMessage()];

    if (results.includes(false)) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const name = nameInput.value.trim();
    successBox.querySelector(".success-title").textContent =
      `Thank you, ${name}! We've received your message.`;
    successBox.querySelector(".success-text").textContent =
      `We'll reply to ${emailInput.value.trim()} within 2 working days. In the meantime, why not explore a new recipe?`;

    form.classList.add("hidden");
    successBox.classList.remove("hidden");
    successBox.focus();
  });

  const resetBtn = document.getElementById("send-another");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      form.reset();
      charCount.textContent = `0 / ${MIN_MESSAGE_LENGTH + 1}+ characters`;
      charCount.classList.remove("is-valid");
      successBox.classList.add("hidden");
      form.classList.remove("hidden");
      nameInput.focus();
    });
  }
}

function initNewsletter() {
  document.querySelectorAll(".newsletter-form").forEach((form) => {
    const input = form.querySelector("input[type='email']");
    const msg = form.parentElement.querySelector(".newsletter-msg");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = input.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      msg.classList.toggle("is-success", valid);
      msg.classList.toggle("is-error", !valid);
      msg.textContent = valid
        ? "You're in! Fresh recipes will land in your inbox every month."
        : "Please enter a valid email address.";

      if (valid) form.reset();
    });
  });
}

function initYear() {
  document.querySelectorAll(".current-year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileNav();
  initScrollEffects();
  initReveal();
  initFavorites();
  initRecipeFilter();
  initIngredientScaler();
  initContactForm();
  initNewsletter();
  initYear();
});
