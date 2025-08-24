

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


