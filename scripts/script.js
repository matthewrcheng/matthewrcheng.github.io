document.querySelectorAll('.vertical-nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const rightPanel = document.querySelector('.right-half');

    if (target && rightPanel) {
      rightPanel.scrollTo({
        top: target.offsetTop - 20,
        behavior: 'smooth'
      });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// const rightPanel = document.querySelector('.right-half');
// const leftPanel = document.querySelector('.left-half');

// leftPanel.addEventListener('wheel', e => {
//   console.log('left', e.deltaY, e.deltaMode, e.deltaX);
// }, { passive: false });

// // logging the scrollTop of the right panel when scrolling the left panel
// leftPanel.addEventListener('wheel', e => {
//   const before = rightPanel.scrollTop;
//   rightPanel.scrollTop += e.deltaY * 1.15;
//   const after = rightPanel.scrollTop;
//   console.log({ before, after, deltaY: e.deltaY });
// }, { passive: false });

// rightPanel.addEventListener('wheel', e => {
//   console.log('right', e.deltaY, e.deltaMode, e.deltaX);
// }, { passive: false });

// rightPanel.addEventListener('scroll', () => {
//   console.log('scrollTop:', rightPanel.scrollTop);
// });

function updateActiveSection() {
  const sections = Array.from(document.querySelectorAll('.section'));
  const navSections = document.querySelectorAll('.vertical-nav .nav-section');
  const navLinks = document.querySelectorAll('.vertical-nav .section-link');
  const subsectionLinks = document.querySelectorAll('.vertical-nav .subsection-nav a');
  const rightPanel = document.querySelector('.right-half');
  const panelTop = rightPanel ? rightPanel.getBoundingClientRect().top : 0;
  const panelBottom = rightPanel ? rightPanel.getBoundingClientRect().bottom : window.innerHeight;
  let currentSection = '';
  let bestVisibleHeight = -1;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const visibleHeight = Math.max(0, Math.min(rect.bottom, panelBottom) - Math.max(rect.top, panelTop));

    if (visibleHeight > bestVisibleHeight) {
      bestVisibleHeight = visibleHeight;
      currentSection = section.getAttribute('id');
    }
  });

  if (!currentSection && sections.length) {
    const scrollOffset = rightPanel ? rightPanel.scrollTop + 80 : window.scrollY + 80;

    sections.forEach(section => {
      if (section.offsetTop <= scrollOffset) {
        currentSection = section.getAttribute('id');
      }
    });
  }

  navSections.forEach(section => {
    section.classList.remove('active');
    if (section.getAttribute('data-section') === currentSection) {
      section.classList.add('active');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });

  subsectionLinks.forEach(link => {
    link.classList.remove('active');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  toggleMode('auto');

  const rightPanel = document.querySelector('.right-half');
  const leftPanel = document.querySelector('.left-half');

  if (rightPanel) {
    rightPanel.addEventListener('scroll', updateActiveSection);
    updateActiveSection();
  }

  if (leftPanel && rightPanel) {
    leftPanel.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        rightPanel.scrollTop += e.deltaY * 1.15;
      } else if (Math.abs(e.deltaX) > 0) {
        e.preventDefault();
        rightPanel.scrollLeft += e.deltaX * 1.15;
      }
    }, { passive: false });
  }
});

function toggleMode(mode) {
  var modeIcon = document.getElementById('modeIcon');
  if (mode === 'light') {
      document.body.classList.remove('dark-mode');
      modeIcon.classList.remove('fa-moon', 'fa-circle-half-stroke', 'dark-toggle');
      modeIcon.classList.add('fa-sun');
  } else if (mode === 'dark') {
      document.body.classList.add('dark-mode');
      modeIcon.classList.remove('fa-sun', 'fa-circle-half-stroke');
      modeIcon.classList.add('fa-moon', 'dark-toggle');
  } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleMode('dark');
      } else {
        toggleMode('light')
      }
      modeIcon.classList.remove('fa-sun', 'fa-moon');
      modeIcon.classList.add('fa-circle-half-stroke');
  }
}