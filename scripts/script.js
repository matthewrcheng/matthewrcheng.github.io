document.querySelectorAll('.vertical-nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  toggleMode('auto');
});

document.addEventListener('scroll', (event) => {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".vertical-nav ul li a");
  let currentSection = "";
  console.log("sad");

  sections.forEach(section => {
    console.log("bye");
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    console.log(currentSection);
    link.classList.remove("active");
    if (link.getAttribute("href").includes(currentSection)) {
      console.log("hi");
      link.classList.add("active");
    }
  });
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