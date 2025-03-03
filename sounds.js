$(document).ready(function() {
  // Create an AudioContext and force it to be active
  let audioContext = Howler.ctx;
  
  function unlockAudioContext() {
    if (audioContext.state === "suspended") {
      audioContext.resume().then(() => {
        console.log("Audio Context Unlocked Automatically!");
      });
    }
  }

  // Try unlocking immediately when the page loads
  unlockAudioContext();

  // Preload sounds
  const hoverSound = new Howl({
    src: ["https://cdn.jsdelivr.net/gh/fndcsonlinerepo/Audio-Host/sound2.mp3"],
    volume: 0.3,
    preload: true
  });

  const openSound = new Howl({
    src: ["https://cdn.jsdelivr.net/gh/fndcsonlinerepo/Audio-Host/open1.mp3"],
    volume: 0.6,
    preload: true
  });

  const closeSound = new Howl({
    src: ["https://cdn.jsdelivr.net/gh/fndcsonlinerepo/Audio-Host/close.mp3"],
    volume: 0.6,
    preload: true
  });

  // Ensure hover sound plays immediately
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

