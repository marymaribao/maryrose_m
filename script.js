/* ========================================
   1. MOBILE MENU
======================================== */

const menuToggle = document.getElementById("menu-toggle");
const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuIcon.textContent = "☰";
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuIcon.textContent = isOpen ? "✕" : "☰";
});

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

// Close menu when clicking outside.
document.addEventListener("click", (event) => {
    if (
        navLinks.classList.contains("open") &&
        !event.target.closest(".navbar")
    ) {
        closeMenu();
    }
});

// Close menu when resizing to desktop.
window.addEventListener("resize", () => {
    if (window.innerWidth > 650) {
        closeMenu();
    }
});


/* ========================================
   2. ACTIVE NAVIGATION INDICATOR
======================================== */

const observedSections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {

                navItems.forEach((link) => {
                    const isActive =
                        link.getAttribute("href") === `#${entry.target.id}`;

                    link.classList.toggle("active", isActive);

                    if (isActive) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });

            }
        });
    },
    {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
    }
);

observedSections.forEach((section) => {
    sectionObserver.observe(section);
});


/* ========================================
   3. BUTTON RIPPLE EFFECT
======================================== */

document.querySelectorAll(".btn, .menu-toggle, .back-to-top")
    .forEach((button) => {

        button.addEventListener("click", (event) => {

            const rect = button.getBoundingClientRect();
            const ripple = document.createElement("span");

            const size = Math.max(rect.width, rect.height) * 2;

            ripple.className = "ripple";
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;

            const x = event.clientX
                ? event.clientX - rect.left
                : rect.width / 2;

            const y = event.clientY
                ? event.clientY - rect.top
                : rect.height / 2;

            ripple.style.left = `${x - size / 2}px`;
            ripple.style.top = `${y - size / 2}px`;

            button.appendChild(ripple);

            ripple.addEventListener("animationend", () => {
                ripple.remove();
            }, { once: true });

        });
    });


/* ========================================
   4. SCROLL REVEAL ANIMATIONS
======================================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

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
        element.classList.add("is-visible");
    });

}


/* ========================================
   5. AUTOMATIC COPYRIGHT YEAR
======================================== */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* ========================================
   6. BACK TO TOP BUTTON
======================================== */

const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {

    backToTop.classList.toggle("visible", window.scrollY > 400);

}, { passive: true });

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ========================================
   7. CONTACT FORM DEMONSTRATION
======================================== */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (!contactForm.reportValidity()) {
        return;
    }

    const name = document.getElementById("name").value.trim();

    formStatus.textContent =
        `Thank you, ${name}! Your form looks good. To actually send messages, connect this form to an email service or backend.`;

    contactForm.reset();

});
