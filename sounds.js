$(document).ready(function() {
  // Check if Howler is available
  if (typeof Howler === 'undefined') {
    console.error('Howler.js is not loaded. Please include the Howler library before this script.');
    return;
  }
  
  // Initialize sounds AFTER checking for Howler
  let hoverSound, openSound, closeSound;
  let currentHoverSoundId = null;
  let audioInitialized = false;
  
  // Function to initialize audio - we'll call this on first user interaction
  function initializeAudio() {
    // Only initialize once
    if (audioInitialized) return;
    audioInitialized = true;
    
    // Initialize sounds
    hoverSound = new Howl({
      src: ["https://cdn.jsdelivr.net/gh/fndcsonlinerepo/Audio-Host/sound2.mp3"],
      volume: 0.3,
      preload: true,
      html5: true
    });
    
    openSound = new Howl({
      src: ["https://cdn.jsdelivr.net/gh/fndcsonlinerepo/Audio-Host/open1.mp3"],
      volume: 0.6,
      preload: true,
      html5: true
    });
    
    closeSound = new Howl({
      src: ["https://cdn.jsdelivr.net/gh/fndcsonlinerepo/Audio-Host/close.mp3"],
      volume: 0.6,
      preload: true,
      html5: true
    });
    
    console.log("Audio initialized successfully");
  }
  
  // Initialize audio on first user interaction
  $(document).one('click touchstart', function() {
    initializeAudio();
  });
  
  // Handle hover sound
  $(document).on("mouseenter", "a, button", function() {
    if (!audioInitialized) {
      initializeAudio();
    }
    
    if (hoverSound) {
      currentHoverSoundId = hoverSound.play();
    }
  });
  
  $(document).on("mouseleave", "a, button", function() {
    if (hoverSound && currentHoverSoundId !== null) {
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
    
    if (!audioInitialized) {
      initializeAudio();
    }
    
    if (navbar.classList.contains('open')) {
      if (closeSound) closeSound.play();
      navbar.classList.remove('open');
    } else {
      if (openSound) openSound.play();
      navbar.classList.add('open');
    }
  }
  
  // Ensure event listener works on Webflow
  $(document).on('click', '.FN_navbar-mobile-menu-button', function() {
    toggleNavbar();
  });
});
