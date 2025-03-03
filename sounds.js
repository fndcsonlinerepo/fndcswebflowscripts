$(document).ready(function() {
  // Preload sounds
  const hoverSound = new Howl({
    src: ["https://cdn.jsdelivr.net/gh/FNDCSREPO/Audio-Host/sound2.mp3"],
    volume: 0.3,
    preload: true
  });

  const openSound = new Howl({
    src: ["https://cdn.jsdelivr.net/gh/FNDCSREPO/Audio-Host/open1.mp3"],
    volume: 0.6,
    preload: true
  });

  const closeSound = new Howl({
    src: ["https://cdn.jsdelivr.net/gh/FNDCSREPO/Audio-Host/close.mp3"],
    volume: 0.6,
    preload: true
  });

  // Unlock Audio Context on user interaction
  function unlockAudioContext() {
    const silentSound = new Howl({
      src: ["data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAABCxAgAEABAAZGF0YQAAAAA="] // A tiny silent wav file
    });
    silentSound.play();

    // Remove event listeners after unlocking
    document.removeEventListener('click', unlockAudioContext);
    document.removeEventListener('keydown', unlockAudioContext);
  }

  document.addEventListener('click', unlockAudioContext);
  document.addEventListener('keydown', unlockAudioContext);

  // Hover sound for all links and buttons
  $("a, button").on("mouseenter", function () {
    hoverSound.play();
  });

  $("a, button").on("mouseleave", function () {
    hoverSound.pause();
  });

  // Toggle Navbar Open/Close with Sound
  function toggleNavbar() {
    const navbar = document.querySelector('.navbar-menu_component');
    
    if (navbar.classList.contains('open')) {
      closeSound.play();
      setTimeout(() => {
        navbar.classList.remove('open');
      }, closeSound.duration() * 1000);
    } else {
      openSound.play();
      setTimeout(() => {
        navbar.classList.add('open');
      }, openSound.duration() * 1000);
    }
  }

  // Ensure event listener works on Webflow
  $(document).on('click', '.FN_navbar-mobile-menu-button', function() {
    toggleNavbar();
  });
});

