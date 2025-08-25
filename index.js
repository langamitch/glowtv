

  const shuffleBtn = document.querySelector('.shuffle');
  const gridSection = document.querySelector('.grid-section');

  shuffleBtn.addEventListener('click', () => {
    const items = Array.from(gridSection.children);

    // Shuffle the array (Fisher-Yates algorithm)
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    // Animate out (fade and move down)
    gsap.to(items, {
      opacity: 0,
      y: 30,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        // Reorder DOM
        items.forEach(item => gridSection.appendChild(item));

        // Animate back in
        gsap.fromTo(items,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }
        );
      }
    });
  });



  const modal = document.getElementById('itemModal');
  const modalImg = document.getElementById('modalImg');
  const modalText = document.getElementById('modalText');
  const closeBtn = document.querySelector('.close-btn');

  // Select all grid items
  const gridItems = document.querySelectorAll('.grid-item');

  gridItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('.square img')?.src || 'img/default.png';
      const text = item.querySelector('.item-text').textContent;

      modalImg.src = imgSrc;
      modalText.textContent = text;

      modal.style.display = 'flex'; // Show modal

      // GSAP Animation
      gsap.fromTo('.modal-content',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    });
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    gsap.to('.modal-content', {
      y: 100,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => modal.style.display = 'none'
    });
  });

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      gsap.to('.modal-content', {
        y: 100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => modal.style.display = 'none'
      });
    }
  });


  const scrollContainer = document.querySelector('.scroll-container');
  const leftArrow = document.querySelector('.scroll-arrow.left');
  const rightArrow = document.querySelector('.scroll-arrow.right');
  const scrollAmount = 150; // Adjust scroll per click
  
  leftArrow.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
  
  rightArrow.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
  
  // Optional: open modal on click
  document.querySelectorAll('.scroll-item').forEach(item => {
    item.addEventListener('click', () => {
      const modal = document.getElementById('itemModal');
      const modalImg = document.getElementById('modalImg');
      // Example if scroll-item contains an img
      const img = item.querySelector('img');
      if(img){
        modalImg.src = img.src;
        modal.style.display = 'flex';
        modal.style.pointerEvents = 'auto';
      }
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
    const infoIcon = document.getElementById('infoIcon');
    const aboutOverlay = document.getElementById('aboutOverlay');
    const gotItBtn = document.getElementById('gotItBtn');
  
    if (!infoIcon || !aboutOverlay || !gotItBtn) return;
  
    function openAbout() {
      aboutOverlay.classList.add('active');        // makes it clickable + visible via CSS
      if (window.gsap) {
        gsap.set('.about-content', { y: -30, opacity: 0 });
        gsap.to(aboutOverlay, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        gsap.to('.about-content', { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
      }
    }
  
    function closeAbout() {
      if (window.gsap) {
        gsap.to('.about-content', { y: -30, opacity: 0, duration: 0.3, ease: 'power2.in' });
        gsap.to(aboutOverlay, {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in',
          onComplete: () => aboutOverlay.classList.remove('active')
        });
      } else {
        aboutOverlay.classList.remove('active');
      }
    }
  
    infoIcon.addEventListener('click', openAbout);
    gotItBtn.addEventListener('click', closeAbout);
    aboutOverlay.addEventListener('click', (e) => {
      if (e.target === aboutOverlay) closeAbout(); // click outside content closes
    });
  });
