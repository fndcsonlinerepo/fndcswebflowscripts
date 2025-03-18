$(document).ready(function() {
  // Make sure Howler is loaded before accessing it
  if (typeof Howler === 'undefined') {
    console.error('Howler.js is not loaded. Please include the Howler library before this script.');
    return;
  }

  // Create an AudioContext and force it to be active
  let audioContext = Howler.ctx;
  
  function unlockAudioContext() {
    if (audioContext && audioContext.state === "suspended") {
      audioContext.resume().then(() => {
        console.log("Audio Context Unlocked Automatically!");
      });
    }
  }
  
  // Try unlocking immediately when the page loads
  unlockAudioContext();
  
  // Also unlock audio on first user interaction (required by some browsers)
  $(document).one('click touchstart', function() {
    unlockAudioContext();
  });
  
  // Preload sounds
  const hoverSound = new Howl({
    src: ["https://cdn.jsdelivr.net/gh/fndcsonlinerepo/Audio-Host/sound2.mp3"],
    volume: 0.3,
    preload: true,
    html5: true // Better mobile compatibility
  });
  
  const openSound = new Howl({
    src: ["https://cdn.jsdelivr.net/gh/fndcsonlinerepo/Audio-Host/open1.mp3"],
    volume: 0.6,
    preload: true,
    html5: true
  });
  
  const closeSound = new Howl({
    src: ["https://cdn.jsdelivr.net/gh/fndcsonlinerepo/Audio-Host/close.mp3"],
    volume: 0.6,
    preload: true,
    html5: true
  });
  
  // Keep track of sound IDs to stop specific instances
  let currentHoverSoundId = null;
  
  // Ensure hover sound plays immediately
  $(document).on("mouseenter", "a, button", function() {
    currentHoverSoundId = hoverSound.play();
  });
  
  $(document).on("mouseleave", "a, button", function() {
    if (currentHoverSoundId !== null) {
      hoverSound.stop(currentHoverSoundId);
      currentHoverSoundId = null;
    }
  });
  
  // Toggle Navbar Open/Close with Sound
  function toggleNavbar() {
    const navbar = document.querySelector('.navbar-menu_component');
    
    if (!navbar) {
      console.error('Navbar element not found. Check your selector.');
      return;
    }
    
    if (navbar.classList.contains('open')) {
      closeSound.play();
      // No need to wait for sound to finish before toggling menu
      navbar.classList.remove('open');
    } else {
      openSound.play();
      // No need to wait for sound to finish before toggling menu
      navbar.classList.add('open');
    }
  }
  
  // Ensure event listener works on Webflow
  $(document).on('click', '.FN_navbar-mobile-menu-button', function() {
    toggleNavbar();
  });
});

