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
  