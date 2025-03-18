$(document).ready(function() {
  // Make sure Howler is loaded before proceeding
  if (typeof Howler === 'undefined') {
    console.error('Howler.js is not loaded. Please include the Howler library before this script.');
    return;
  }
  
  // Check for AudioContext safely
  function unlockAudioContext() {
    // Only try to access ctx if Howler exists and has a ctx property
    if (Howler && Howler.ctx && Howler.ctx.state === "suspended") {
      Howler.ctx.resume().then(() => {
        console.log("Audio Context Unlocked Automatically!");
      });
    }
  }
  
  // Wait a short time before trying to unlock - gives Howler time to initialize
  setTimeout(unlockAudioContext, 100);
  
  // Also unlock audio on first user interaction (required by most browsers)
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
  
  // Ensure hover sound plays immediately - use delegation for dynamic elements
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
      console.warn('Navbar element not found. Check your selector.');
      return;
    }
    
    if (navbar.classList.contains('open')) {
      closeSound.play();
      navbar.classList.remove('open');
    } else {
      openSound.play();
      navbar.classList.add('open');
    }
  }
  
  // Ensure event listener works on Webflow
  $(document).on('click', '.FN_navbar-mobile-menu-button', function() {
    toggleNavbar();
  });
});
