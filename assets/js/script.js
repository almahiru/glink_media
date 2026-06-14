/** @format */

// Toggle class Active Hamburger
const navbarNav = document.querySelector(".navbar-nav");

// ketika hamburger dibuka
document.querySelector("#hamburger-menu").onclick = () => {
    navbarNav.classList.toggle("active");
};

// Toggle Class Active Search Form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
    searchForm.classList.toggle("active");
    searchBox.focus();
    e.preventDefault();
};

// function menu
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("search-button");

document.addEventListener("click", function (e) {
    if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove("active");
        if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
            searchForm.classList.remove("active");
        }
    }
});
// Initialize mobile menu when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeMobileMenu);
} else {
    initializeMobileMenu();
}

// Initialize background effects
generateMatrixRain();
generateParticles();
generateDataStreams();

// Regenerate matrix rain on window resize
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const matrixRain = document.getElementById("matrixRain");
        matrixRain.innerHTML = "";
        generateMatrixRain();
    }, 250);
});

// Interactive mouse glow effect (throttled for performance)
let mouseTimer;
document.addEventListener("mousemove", (e) => {
    if (!mouseTimer) {
        mouseTimer = setTimeout(() => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Move orbs slightly based on mouse position
            const orbs = document.querySelectorAll(".orb");
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.02;
                const x = (mouseX - window.innerWidth / 2) * speed;
                const y = (mouseY - window.innerHeight / 2) * speed;
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });

            // Make nearby particles glow brighter (desktop only)
            if (window.innerWidth > 768) {
                const particles = document.querySelectorAll(".particle");
                particles.forEach((particle) => {
                    const rect = particle.getBoundingClientRect();
                    const particleX = rect.left + rect.width / 2;
                    const particleY = rect.top + rect.height / 2;
                    const distance = Math.sqrt(
                        Math.pow(mouseX - particleX, 2) +
                            Math.pow(mouseY - particleY, 2)
                    );

                    if (distance < 150) {
                        const brightness = 1 - distance / 150;
                        particle.style.boxShadow = `0 0 ${20 + brightness * 30}px rgba(0, 255, 255, ${0.5 + brightness * 0.5})`;
                        particle.style.transform = `scale(${1 + brightness * 0.5})`;
                    } else {
                        particle.style.boxShadow = "";
                        particle.style.transform = "";
                    }
                });
            }

            mouseTimer = null;
        }, 16); // ~60fps
    }
});

// Add a glow that follows the cursor (desktop only)
if (window.innerWidth > 768) {
    const cursorGlow = document.createElement("div");
    cursorGlow.style.cssText = `
                position: fixed;
                width: 400px;
                height: 400px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
                transition: opacity 0.3s ease;
                opacity: 0;
            `;
    document.body.appendChild(cursorGlow);

    document.addEventListener("mousemove", (e) => {
        cursorGlow.style.left = e.clientX + "px";
        cursorGlow.style.top = e.clientY + "px";
        cursorGlow.style.opacity = "1";
    });

    document.addEventListener("mouseleave", () => {
        cursorGlow.style.opacity = "0";
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        // Only prevent default and scroll if href is more than just '#'
        if (href && href.length > 1) {
            e.preventDefault();
            if (href === "#top") {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            } else {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (window.scrollY > 100) {
        nav.style.background = "rgba(15, 15, 35, 0.95)";
        nav.style.boxShadow = "0 0 30px rgba(0, 255, 255, 0.2)";
    } else {
        nav.style.background = "rgba(15, 15, 35, 0.9)";
        nav.style.boxShadow = "none";
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, observerOptions);

document.querySelectorAll(".fade-up").forEach((el) => {
    observer.observe(el);
});

// Trigger stats animation when section is visible
const statsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

const statsSection = document.querySelector(".stats");
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Glitch effect on hover for feature cards
document.querySelectorAll(".feature-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
        this.style.animation = "glitch1 0.3s ease-in-out";
        setTimeout(() => {
            this.style.animation = "";
        }, 300);
    });
});

// Random cyber text effects
const cyberTexts = [
    "CONNECTING...",
    "NEURAL LINK ESTABLISHED",
    "QUANTUM SYNC ACTIVE",
    "REALITY MATRIX LOADED"
];

setInterval(() => {
    const randomText =
        cyberTexts[Math.floor(Math.random() * cyberTexts.length)];
    const tempElement = document.createElement("div");
    tempElement.textContent = randomText;
    tempElement.style.cssText = `
                position: fixed;
                top: ${Math.random() * 100}vh;
                left: ${Math.random() * 100}vw;
                color: var(--primary-cyan);
                font-size: 0.8rem;
                font-weight: 700;
                z-index: 1000;
                opacity: 0.7;
                pointer-events: none;
                animation: fadeOut 3s ease-out forwards;
                text-shadow: 0 0 10px var(--primary-cyan);
            `;
    document.body.appendChild(tempElement);

    setTimeout(() => {
        document.body.removeChild(tempElement);
    }, 3000);
}, 5000);

// Add fadeOut animation
const style = document.createElement("style");
style.textContent = `
            @keyframes fadeOut {
                0% { opacity: 0.7; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-50px); }
            }
        `;
document.head.appendChild(style);

// Contact form submission
document.querySelector(".btn-submit").addEventListener("click", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
        // Simulate form submission
        this.textContent = "TRANSMITTING...";
        this.style.background =
            "linear-gradient(135deg, var(--primary-cyan), var(--primary-pink))";

        setTimeout(() => {
            this.textContent = "TRANSMISSION COMPLETE";
            this.style.background = "var(--primary-cyan)";

            // Clear form
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";

            // Reset button after 3 seconds
            setTimeout(() => {
                this.textContent = "Transmit Message";
                this.style.background = "";
            }, 3000);
        }, 2000);
    }
});
// Fungsi Send Contact To WhatsApp
function sendToWhatsapp() {
    let number = "+6285755604512";

    let pesan = document.getElementById("pesan-contact").value;
    let name = document.getElementById("name-contact").value;
    let email = document.getElementById("email-contact").value;
    let message = document.getElementById("message-contact").value;

    var url =
        "https://wa.me/" +
        number +
        "?text=" +
        "." +
        pesan +
        "%0a" +
        "Name : " +
        name +
        "%0a" +
        "Email : " +
        email +
        "%0a" +
        "Message : " +
        message +
        "%0a%0a";

    window.open(url, "_blank").focus();
}

// Fungsi Mode Gelap Dan Terang
function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

// ===== BASE LAYERS =====
const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 49
});

const satellite = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { maxZoom: 49 }
);

const map = L.map("map", {
    center: [-7.3270918, 112.2146629],
    zoom: 16,
    layers: [satellite] // default satelit
});

// Layer switch control
const baseMaps = {
    "Street Map": osm,
    Satellite: satellite
};

L.control.layers(baseMaps).addTo(map);

// ===== SYSTEM =====
let currentType = null;
let cableMode = false;
let selectedNode = null;

function setType(type) {
    currentType = type;
    cableMode = false;
    alert("Klik map untuk tambah " + type);
}

function enableCableMode() {
    cableMode = true;
    currentType = null;
    alert("Klik 2 node untuk tarik kabel");
}

function createNode(lat, lng, type) {
    const name = prompt("Nama " + type + ":");
    if (!name) return;

    const color = type === "ODC" ? "red" : type === "ODP" ? "blue" : "green";

    const marker = L.circleMarker([lat, lng], {
        radius: 8,
        color: color,
        fillColor: color,
        fillOpacity: 1
    }).addTo(map);

    marker.bindPopup(`<b>${name}</b><br>${type}`);

    marker.on("click", function () {
        if (!cableMode) return;

        if (selectedNode == null) {
            selectedNode = marker;
        } else {
            drawCable(selectedNode, marker);
            selectedNode = null;
        }
    });
}

function drawCable(nodeA, nodeB) {
    const latlngs = [nodeA.getLatLng(), nodeB.getLatLng()];
    const line = L.polyline(latlngs, {
        color: "#a855f7",
        weight: 4
    }).addTo(map);

    const distance = map
        .distance(nodeA.getLatLng(), nodeB.getLatLng())
        .toFixed(0);

    const midLat = (latlngs[0].lat + latlngs[1].lat) / 2;
    const midLng = (latlngs[0].lng + latlngs[1].lng) / 2;

    L.marker([midLat, midLng], {
        icon: L.divIcon({
            html: `<div style="
                background:#111827;
                padding:2px 6px;
                border-radius:6px;
                font-size:12px;
                color:#fff;">
                ${distance} m
            </div>`
        })
    }).addTo(map);
}

map.on("click", function (e) {
    if (currentType) {
        createNode(e.latlng.lat, e.latlng.lng, currentType);
    }
});
