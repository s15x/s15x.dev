document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".menu-button");
    const navLinks = document.querySelector(".nav-links");
  
    // Toggle menu when clicking the button
    menuButton.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent immediate closure
      navLinks.classList.add("visible"); // Set visibility before animation
      navLinks.classList.toggle("show");
    });
  
    // Hide menu when clicking outside
    document.addEventListener("click", function (event) {
      if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) {
        navLinks.classList.remove("show");
  
        // Wait for animation to finish before hiding it completely
        setTimeout(() => {
          if (!navLinks.classList.contains("show")) {
            navLinks.classList.remove("visible"); // Hide after animation
          }
        }, 300); // Matches CSS transition duration
      }
    });
  });

  function createStars(count) {
    for (let i = 0; i < count; i++) {
        let star = document.createElement('div');
        star.classList.add('star');

        // Random positions using percentage for responsiveness
        let x = Math.random() * 100;
        let y = Math.random() * 100;
        let delay = Math.random() * 5;

        star.style.left = `${x}vw`;
        star.style.top = `${y}vh`;
        star.style.animationDelay = `${delay}s`;

        document.body.appendChild(star);
    }
}

// Generate stars once on load
createStars(100);



// Existing hover tilt effect
document.querySelectorAll('.grid-box-textTop, .grid-box-textBottom').forEach(card => {
  let rotateX = 0, rotateY = 0;
  let targetRotateX = 0, targetRotateY = 0;
  let requestId = null;

  card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Tilting in the opposite direction
      targetRotateX = -(y - centerY) / 20;
      targetRotateY = (x - centerX) / 20;

      if (!requestId) requestId = requestAnimationFrame(smoothRotate);
  });

  card.addEventListener('mouseleave', () => {
      targetRotateX = 0;
      targetRotateY = 0;
      if (!requestId) requestId = requestAnimationFrame(smoothRotate);
  });

  function smoothRotate() {
      rotateX += (targetRotateX - rotateX) * 0.15;
      rotateY += (targetRotateY - rotateY) * 0.15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      if (Math.abs(rotateX - targetRotateX) > 0.01 || Math.abs(rotateY - targetRotateY) > 0.01) {
          requestId = requestAnimationFrame(smoothRotate);
      } else {
          requestId = null;
      }
  }
});

// Scroll fade‑in using IntersectionObserver for all elements with the "hidden" class
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          entry.target.classList.remove('hidden');
          observer.unobserve(entry.target); // Stop observing once revealed
      }
  });
}, { threshold: 0.1 });

// Observe every element that should fade in
document.querySelectorAll('.hidden').forEach(el => observer.observe(el));





function spawnShootingStar() {
  const star = document.createElement('div');
  star.classList.add('shooting-star');
  
  // Start near the top half of the viewport (typical for shooting stars)
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight * 0.5;
  star.style.left = startX + 'px';
  star.style.top = startY + 'px';
  
  // For a more natural look, choose an angle from one of two ranges:
  // either from top-left to bottom-right or top-right to bottom-left
  let angle;
  if (Math.random() < 0.5) {
    angle = 20 + Math.random() * 30; // 20° to 50°
  } else {
    angle = 130 + Math.random() * 30; // 130° to 160°
  }
  star.style.setProperty('--angle', angle + 'deg');
  
  // Determine a travel distance that lets the star cross much of the screen
  const distance = window.innerWidth * 0.75;
  const rad = angle * Math.PI / 180;
  const dx = Math.cos(rad) * distance;
  const dy = Math.sin(rad) * distance;
  star.style.setProperty('--dx', dx + 'px');
  star.style.setProperty('--dy', dy + 'px');
  
  // Set a randomized duration for the shooting animation
  const duration = 1 + Math.random() * 2; // new duration between 2s and 3s
  star.style.setProperty('--duration', duration + 's');
  
  // Append to document and remove after animation completes
  document.body.appendChild(star);
  star.addEventListener('animationend', () => {
    star.remove();
  });
}

// Recursively spawn shooting stars with random delays for a natural cadence
function createShootingStars() {
  spawnShootingStar();
  const nextDelay = 500 + Math.random() * 1500; // delay between 500ms and 2000ms
  setTimeout(createShootingStars, nextDelay);
}

// Start after a short delay
setTimeout(createShootingStars, 1000);