// Progress bar
const progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
    const scrolled =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
    progress.style.width = scrolled * 100 + "%";
    document
        .getElementById("back-top")
        .classList.toggle("show", window.scrollY > 400);
});

// Intersection Observer for section animations
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("visible");
        });
    },
    { threshold: 0.08 },
);
sections.forEach((s) => observer.observe(s));

// Active nav highlight
const navItems = document.querySelectorAll(".nav-item");
const sectionEls = document.querySelectorAll("section.section");

const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                navItems.forEach((n) => n.classList.remove("active"));
                const active = document.querySelector(
                    `.nav-item[href="#${e.target.id}"]`,
                );
                if (active) active.classList.add("active");
            }
        });
    },
    { threshold: 0.4 },
);
sectionEls.forEach((s) => navObserver.observe(s));

// Copy button
function copyCode(btn) {
    const code = btn
        .closest(".code-wrapper")
        .querySelector("pre").innerText;
    navigator.clipboard.writeText(code).then(() => {
        const orig = btn.textContent;
        btn.textContent = "Copied!";
        btn.style.borderColor = "var(--accent)";
        btn.style.color = "var(--accent)";
        setTimeout(() => {
            btn.textContent = orig;
            btn.style.borderColor = "";
            btn.style.color = "";
        }, 1500);
    });
}

// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
menuToggle.addEventListener("click", () =>
    sidebar.classList.toggle("open"),
);
document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && e.target !== menuToggle) {
        sidebar.classList.remove("open");
    }
});

// Search
const searchInput = document.getElementById("searchInput");
const allNavItems = document.querySelectorAll(".nav-item");
searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase().trim();

    allNavItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        const match = !q || text.includes(q);
        item.style.display = match ? "block" : "none";
    });

    // Hide section headers if all their items are hidden
    document.querySelectorAll(".nav-section").forEach((header) => {
        let next = header.nextElementSibling;
        let hasVisible = false;
        while (next && !next.classList.contains("nav-section")) {
            if (next.style.display !== "none") hasVisible = true;
            next = next.nextElementSibling;
        }
        le.display = hasVisible ? "block" : "none";
    });

    // If query cleared, restore all section headers
    if (!q) {
        document
            .querySelectorAll(".nav-section")
            .forEach((h) => (h.style.display = "block"));
    }
});