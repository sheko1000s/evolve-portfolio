document.addEventListener("DOMContentLoaded", () => {

  /* ================= FILTER ================= */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        projectCards.forEach(card => {
          const category = card.dataset.category;

          card.style.display =
            filter === "all" || category === filter
              ? "flex"
              : "none";
        });
      });
    });
  }

  /* ================= POPUP ================= */
  const popup = document.getElementById("popup");

  if (popup) {
    const popupTitle = document.getElementById("popupTitle");
    const popupType = document.getElementById("popupType");
    const popupDesc = document.getElementById("popupDesc");
    const closePopup = document.getElementById("closePopup");

    document.querySelectorAll(".project-card").forEach(card => {
      const viewBtn = card.querySelector(".view-btn");

      if (!viewBtn) return;

      viewBtn.addEventListener("click", (e) => {
        e.preventDefault();

        popupTitle.textContent = card.dataset.title || "";
        popupType.textContent = card.dataset.type || "";
        popupDesc.textContent = card.dataset.desc || "";

        popup.classList.add("show");
      });
    });

    closePopup?.addEventListener("click", () => {
      popup.classList.remove("show");
    });

    popup.addEventListener("click", (e) => {
      if (e.target === popup) popup.classList.remove("show");
    });
  }

  /* ================= GLOW ================= */
  const glow = document.querySelector(".cursor-glow");

  if (glow && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      glow.style.transform = `translate(${currentX}px, ${currentY}px)`;
      requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }

  /* ================= REVEAL ================= */
  const revealItems = document.querySelectorAll(
    ".section-head, .about-card, .expertise-box, .project-card, .contact-card, .cta-box"
  );

  if (revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.1 });

    revealItems.forEach(item => {
      item.classList.add("reveal");
      observer.observe(item);
    });
  }

  /* ================= TEAM SLIDER ================= */
  let teamIndex = 0;

  window.moveTeam = function(direction) {
    const track = document.getElementById("teamTrack");
    const cards = document.querySelectorAll(".team-card");

    if (!track || cards.length === 0) return;

    const visibleCards = window.innerWidth < 768 ? 1 :
                         window.innerWidth < 1024 ? 2 : 3;

    const cardWidth = cards[0].offsetWidth + 20;

    teamIndex += direction;

    const maxIndex = cards.length - visibleCards;

    if (teamIndex < 0) teamIndex = 0;
    if (teamIndex > maxIndex) teamIndex = maxIndex;

    track.style.transform = `translateX(-${teamIndex * cardWidth}px)`;
  };

});