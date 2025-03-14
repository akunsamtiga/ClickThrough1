// Particle Animation
export const initParticles = () => {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 4 + 1,
    speedX: Math.random() * 3 - 1.5,
    speedY: Math.random() * 3 - 1.5,
  }));

  const animateParticles = (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      const mouseX = e ? e.clientX : null;
      const mouseY = e ? e.clientY : null;

      if (mouseX && mouseY) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        p.size = dist < 120 ? 6 : Math.random() * 4 + 1;
      }

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fill();
    });

    requestAnimationFrame(() => animateParticles(e));
  };

  window.addEventListener("mousemove", animateParticles);
  animateParticles();
};

// Shape Hover Interaction
export const interactiveShapes = () => {
  const shapes = document.querySelectorAll(".shape");

  shapes.forEach((shape) => {
    shape.addEventListener("mouseenter", () => {
      shape.style.transform = "scale(1.3) rotate(20deg)";
      shape.style.transition = "transform 0.3s ease";
    });

    shape.addEventListener("mouseleave", () => {
      shape.style.transform = "scale(1) rotate(0deg)";
    });
  });
};

// Parallax Effect
export const parallaxEffect = () => {
  document.addEventListener("mousemove", (e) => {
    document.querySelectorAll("[data-depth]").forEach((el) => {
      const depth = el.getAttribute("data-depth");
      const x = (window.innerWidth - e.pageX * depth) / 100;
      const y = (window.innerHeight - e.pageY * depth) / 100;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
};

// Smooth Scrolling
export const smoothScrolling = () => {
  document.documentElement.style.scrollBehavior = "smooth";
};

// Reverse Scroll Movement for Shapes
export const reverseScrollShapes = () => {
  let lastScrollTop = 0;
  const shapes = document.querySelectorAll(".shape");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollSpeed = Math.min(20, Math.abs(scrollTop - lastScrollTop));

    shapes.forEach((shape) => {
      // Hitung posisi relatif dari scroll
      const moveDistance = scrollTop * -0.5; // Semakin kecil angkanya, semakin lambat shapes bergerak
      shape.style.transform = `translateY(${moveDistance}px)`;
    });

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Hindari nilai negatif
  });
};



