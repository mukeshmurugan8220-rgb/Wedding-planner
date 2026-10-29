
// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.getElementById("preloader");

  if (preloader) {
    window.addEventListener("load", () => {
      preloader.classList.add("loaded");
    });

    setTimeout(() => {
      preloader.classList.add("loaded");
    }, 1500);
  }

  // Current year in footer
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Mobile navigation menu
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      const isOpen = navLinks.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Header shadow on scroll
  const header = document.getElementById("header");

  function updateHeader() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }
  }

  window.addEventListener("scroll", updateHeader);
  updateHeader();

  // Scroll reveal animations
  const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .about-image, .service-card, " +
    ".gallery-item, .process-step, .contact-content, .contact-form, .stat-item"
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // Back to top button
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 400);
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Contact form validation
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const phone = String(formData.get("phone") || "").trim();

      if (!name || !email || !phone) {
        if (formStatus) {
          formStatus.textContent = "Please complete all required fields.";
        }
        return;
      }

      if (formStatus) {
        formStatus.textContent =
          "Thank you, " + name +
          "! Your form passed validation. Connect a backend or email service to receive enquiries.";
        formStatus.setAttribute("role", "status");
      }

      contactForm.reset();
    });
  }

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});

