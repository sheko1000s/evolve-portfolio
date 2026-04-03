const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projectCards.forEach(card => {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupType = document.getElementById("popupType");
const popupDesc = document.getElementById("popupDesc");
const closePopup = document.getElementById("closePopup");

if (popup && popupTitle && popupType && popupDesc && closePopup) {
  projectCards.forEach(card => {
    const viewBtn = card.querySelector(".view-btn");

    if (viewBtn) {
      viewBtn.addEventListener("click", () => {
        popupTitle.textContent = card.getAttribute("data-title");
        popupType.textContent = card.getAttribute("data-type");
        popupDesc.textContent = card.getAttribute("data-desc");
        popup.classList.add("show");
      });
    }
  });

  closePopup.addEventListener("click", () => {
    popup.classList.remove("show");
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("show");
    }
  });
}

/* mouse glow */
const glow = document.querySelector(".cursor-glow");

if (glow) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    currentX += (mouseX - currentX) * 0.14;
    currentY += (mouseY - currentY) * 0.14;

    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;

    requestAnimationFrame(animateGlow);
  }

  animateGlow();

  const interactiveElements = document.querySelectorAll("a, button, .project-card, .about-card, .contact-card");

  interactiveElements.forEach(item => {
    item.addEventListener("mouseenter", () => {
      glow.style.width = "46px";
      glow.style.height = "46px";
      glow.style.background = "rgba(40, 196, 138, 0.38)";
    });

    item.addEventListener("mouseleave", () => {
      glow.style.width = "28px";
      glow.style.height = "28px";
      glow.style.background = "rgba(40, 196, 138, 0.28)";
    });
  });
}

/* reveal animation */
const revealItems = document.querySelectorAll(
  ".section-head, .about-card, .expertise-box, .project-card, .contact-card, .cta-box"
);

revealItems.forEach(item => item.classList.add("reveal"));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

revealItems.forEach(item => revealObserver.observe(item));
let teamIndex = 0;

function moveTeam(direction) {
  const track = document.getElementById("teamTrack");
  const cards = document.querySelectorAll(".team-card");

  const cardWidth = cards[0].offsetWidth + 20; // width + gap

  teamIndex += direction;

  if (teamIndex < 0) teamIndex = 0;
  if (teamIndex > cards.length - 3) teamIndex = cards.length - 3;

  track.style.transform = `translateX(-${teamIndex * cardWidth}px)`;
}