function copyToClipboard() {
    const emailElement = document.getElementById("email");
    if (emailElement) {
        const email = emailElement.textContent;
        navigator.clipboard.writeText(email).then(() => {
            alert("Email copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy email: ", err);
        });
    }
}

function toggleFinalImages() {
    const images = [
        { id: "image-1", newSrc: "FYP-final.webp", oldSrc: "original-fyp.webp" },
        { id: "image-2", newSrc: "radio-page-final.webp", oldSrc: "original-radio.webp" },
        { id: "image-3", newSrc: "schedule-page-final.webp", oldSrc: "original-schedule.webp" }
    ];

    images.forEach(({ id, newSrc, oldSrc }) => {
        const imgElement = document.getElementById(id);
        if (imgElement.src.includes(newSrc)) {
            imgElement.src = oldSrc; // Switch back to old image
        } else {
            imgElement.src = newSrc; // Switch to new image
        }
    });
}

function toggleNewdsImages() {
    const images = [
        { id: "ds-1", newSrc: "rayo-ds/ds-old.webp", oldSrc: "rayo-ds/ds-new.webp" }
    ];

    const toggleButton = document.getElementById("toggle-images-button");
    const oldLabel = document.querySelector(".toggle-label:first-child");
    const newLabel = document.querySelector(".toggle-label:last-child");

    images.forEach(({ id, newSrc, oldSrc }) => {
        const imgElement = document.getElementById(id);
        if (imgElement.src.includes(newSrc)) {
            imgElement.src = oldSrc; // Switch back to old image
        } else {
            imgElement.src = newSrc; // Switch to new image
        }
    });

    if (toggleButton.checked) {
        oldLabel.style.fontWeight = "200";
        newLabel.style.fontWeight = "bold";
    } else {
        oldLabel.style.fontWeight = "bold";
        newLabel.style.fontWeight = "200";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const loadingGrid = document.querySelector(".loading-grid");

    if (loadingGrid) {
        const hasVisited = sessionStorage.getItem("hasVisited");

        if (!hasVisited) {
            sessionStorage.setItem("hasVisited", "true");

            setTimeout(() => {
                loadingGrid.classList.add("fade-out");
                setTimeout(() => {
                    loadingGrid.classList.add("hidden");
                }, 2000); // Matches the fade-out duration
            }, 3000); // Matches the animation duration
        } else {
            loadingGrid.classList.add("hidden");
        }
    }

    // === DYNAMIC WORD TYPING ===
    const words = ["Product", "UX", "UI"];
    let currentWordIndex = 0;
    const targetElement = document.querySelector(".dynamic-word");

    if (targetElement) {
        function toggleUnderscore() {
            targetElement.classList.toggle("show-underscore");
        }
        const underscoreInterval = setInterval(toggleUnderscore, 500);

        function typeWord(word, callback) {
            targetElement.classList.remove("show-underscore");
            let typedText = "";
            let i = 0;

            const typingInterval = setInterval(() => {
                typedText += word[i];
                targetElement.textContent = typedText;
                i++;

                if (i === word.length) {
                    clearInterval(typingInterval);
                    targetElement.classList.add("show-underscore");
                    setTimeout(callback, 3000);
                }
            }, 100);
        }

        function deleteWord(callback) {
            targetElement.classList.remove("show-underscore");
            let typedText = targetElement.textContent;

            const deletingInterval = setInterval(() => {
                typedText = typedText.slice(0, -1);
                targetElement.textContent = typedText;

                if (typedText.length === 0) {
                    clearInterval(deletingInterval);
                    callback();
                }
            }, 100);
        }

        function loopWords() {
            typeWord(words[currentWordIndex], () => {
                deleteWord(() => {
                    currentWordIndex = (currentWordIndex + 1) % words.length;
                    loopWords();
                });
            });
        }

        console.log("Starting typing animation...");
        loopWords();
    }

    // === CUSTOM CURSOR ===
    const customCursor = document.createElement("div");
    customCursor.classList.add("custom-cursor");
    document.body.appendChild(customCursor);

    document.addEventListener("mousemove", (e) => {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    });

    document.addEventListener("mouseleave", () => {
        customCursor.style.display = "none";
    });

    document.addEventListener("mouseenter", () => {
        customCursor.style.display = "block";
    });

    const textElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span");
    textElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
            customCursor.style.transition = "width 0.2s ease, height 0.2s ease, border-radius 0.2s ease";
            customCursor.style.width = "0.25rem";
            customCursor.style.height = "2rem";
            customCursor.style.borderRadius = "0";
        });

        element.addEventListener("mouseleave", () => {
            customCursor.style.transition = "width 0.2s ease, height 0.2s ease, border-radius 0.2s ease";
            customCursor.style.width = "2rem";
            customCursor.style.height = "2rem";
            customCursor.style.borderRadius = "50%";
        });
    });

    const hyperlinks = document.querySelectorAll("a");
    hyperlinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
            customCursor.style.display = "none";
        });

        link.addEventListener("mouseleave", () => {
            customCursor.style.display = "block";
        });
    });

    const emailElement = document.getElementById("email");
    if (emailElement) {
        emailElement.addEventListener("mouseenter", () => {
            customCursor.style.display = "none";
        });

        emailElement.addEventListener("mouseleave", () => {
            customCursor.style.display = "block";
        });
    }

    const toggleSwitch = document.querySelector(".toggle-switch");
    const slider = document.querySelector(".slider");

    if (toggleSwitch && slider) {
        [toggleSwitch, slider].forEach((element) => {
            element.addEventListener("mouseenter", () => {
                customCursor.style.display = "none";
            });

            element.addEventListener("mouseleave", () => {
                customCursor.style.display = "block";
            });
        });
    }

    // === SCROLL OBSERVER FOR PROJECT CARDS ===
    const projectCards = document.querySelectorAll(".project-card");
    if (projectCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const cardIndex = Array.from(projectCards).indexOf(entry.target);
                    entry.target.classList.add("scroll-in-view");
                    if (cardIndex % 3 === 1) {
                        entry.target.classList.add("delayed");
                    } else if (cardIndex % 3 === 2) {
                        entry.target.classList.add("delayed-2");
                    }
                }
            });
        }, { threshold: 0.1 });

        projectCards.forEach((card) => observer.observe(card));
    }

    // === PAGE TRANSITION ===
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            // Skip links with target="_blank"
            if (link.target === "_blank") return;

            e.preventDefault();
            const href = link.getAttribute("href");
            if (href && href !== "#") {
                const elements = document.querySelectorAll("main > *");
                elements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add("slide-out");
                    }, index * 100); // Stagger the animation
                });
                setTimeout(() => {
                    window.location.href = href;
                }, elements.length * 100 + 500); // Wait for all animations to finish
            }
        });
    });

    // === PAGE LOAD TRANSITION ===
    const navigationEntries = performance.getEntriesByType("navigation");
    const isReload = navigationEntries.length > 0 && navigationEntries[0].type === "reload";

    const elements = document.querySelectorAll("main > *");
    elements.forEach((element, index) => {
        if (!isReload) {
            element.style.opacity = "0";
            element.style.transform = "translateX(100%)";
            setTimeout(() => {
                element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                element.style.opacity = "1";
                element.style.transform = "translateX(0)";
            }, index * 100); // Stagger the animation
        } else {
            // Ensure elements are visible if animation is skipped
            element.style.opacity = "1";
            element.style.transform = "translateX(0)";
        }
    });

    // Set toggle to "on" by default
    const toggleButton = document.getElementById("toggle-images-button");
    if (toggleButton) {
        toggleButton.checked = true; // Ensure toggle is on by default
        toggleFinalImages(); // Set images to "new" state initially
    }
});