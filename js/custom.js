















let smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1,
    effects: true
})



// Campaign One Side Animation
const tl1 = gsap.timeline();

tl1
  .fromTo("#hero-zoe", { x: 100, duration: 1, opacity: 0 }, { x: 0, duration: 1, opacity: 1 })
  .fromTo("#wife", { y: -100, duration: 1, opacity: 0 }, { y: '10%', duration: 1, opacity: 1 }, "<")
  .fromTo("#section1-intro", { duration: 1, opacity: 0 }, { duration: 1, opacity: 1 })
  .fromTo("#section1-p", { y: 100, duration: 1, opacity: 0 }, { y: 0, duration: 1, opacity: 1 });


gsap.to("#section2-content",
  {
    scrollTrigger: {
      trigger: "#section2-content",
      scrub: true,
      // start: "top center",
      // markers: true,
      toggleActions: "restart pause reverse pause"

    }, y: 100, duration: 2
  })

//change navigation colors
ScrollTrigger.create({
  trigger: ".section1",
  start: "20% top",
  // markers: true,
  onEnter: () =>
    gsap.to(".navbar", {
      backgroundColor: "rgba(255, 255, 255, 0.9)"
    }),
  onLeaveBack: () =>
    gsap.to(".navbar", {
      backgroundColor: "rgba(255, 255, 255, 0)"
    })
})




ScrollTrigger.matchMedia({

  "(min-width: 991px) and (min-height: 800px)": function () {
    // The ScrollTriggers created inside these functions are segregated and get
    // reverted/killed when the media query doesn't match anymore. 
   
    ScrollTrigger.create({
      trigger: ".section3",
      start: "start start",
      // end: "bottom bottom",
      pinSpacing: false,
      // pin: true
    })


    gsap.to(".section4",
      {
        scrollTrigger: {
          trigger: ".section4",
          start: "start start",
          end: "bottom bottom",
          pinSpacing: false,
          pin: true

        }
      });
  },

}); 









//hamburger menu
(function(){
  'use strict';

  class Menu {
    constructor(settings) {
      this.menuRootNode = settings.menuRootNode;
      this.isOpened = false;
    }
    
    changeMenuState(menuState) {
      return this.isOpened = !menuState;
    }
  }
  
  class MenuBurger extends Menu {
    
    constructor(settings) {
      super(settings);
      this.openText = settings.openText;
      this.closeText = settings.closeText;
      this.menuClassesNames = settings.menuClassesNames;
    }
    
    init() {
      let currentMenuState = this.changeMenuState(this.isOpened);
      let toggleHint = this.getCurrentToggleHint(currentMenuState, this.openText, this.closeText);
      let toggleNode = this.menuRootNode.querySelector(`.${this.menuClassesNames.toggleClass}`);
      
      this.changeToggleHint(toggleHint, this.menuRootNode.querySelector(`.${this.menuClassesNames.toggleHintClass}`));
      this.menuRootNode.classList.toggle(`${this.menuClassesNames.activeClass}`);
      this.setCurrentA11yAttribute(currentMenuState, toggleNode, "aria-expanded");  
      this.getFocusCurrentNode(currentMenuState, toggleNode, this.menuRootNode.querySelector(`.${this.menuClassesNames.menuItemClass}`));
    }
    
    changeToggleHint(toggleHint, toggleNode) {
      toggleNode.textContent = toggleHint;
      return toggleHint; 
    }
    
    getCurrentToggleHint(currentMenuState, openText, closeText) {
      return (currentMenuState !== true) ? openText : closeText;
    }
    
    setCurrentA11yAttribute(currentMenuState, toggleNode, attribute) {
      return toggleNode.setAttribute(attribute, currentMenuState);
    }
    
    getFocusCurrentNode(currentMenuState, nodeFirst, nodeSecond) {
      return (currentMenuState !== true) ? this.setFocus(nodeFirst) : this.setFocus(nodeSecond);
    }
    
    setFocus(node) {
      return node.focus();
    }
  }

  const menuClassesNames = {
    rootClass: 'menu',
    activeClass: 'menu_activated',
    toggleClass: 'menu__toggle',
    toggleHintClass: 'menu__toggle-hint',
    menuItemClass: 'menu__link'
  }
  
  const jsMenuNode = document.querySelector(`.${menuClassesNames.rootClass}`);
  const demoMenu = new MenuBurger ({
    menuRootNode: jsMenuNode,
    menuClassesNames: menuClassesNames,
    openText: 'Open menu',
    closeText: 'Close menu'
  });
    
function scrollToSection(section) {
  return new Promise((resolve) => {
    gsap.to(window, {
      duration: 0, 
      scrollTo: section, 
      autoKill: false,
      onComplete: resolve
    });
  });
}

 // Function to handle the Escape key press
  function handleEscapeKey(event) {
    if (demoMenu.isOpened && (event.key === 'Escape' || event.keyCode === 27)) {
      toggleMenu(event);
    }
  }



async function toggleMenu(event) { 
  const id = event.target.id;
  const match = id.match(/^section(\d+)-menu$/); // Regular expression to match 'sectionX-menu'

  if (match) {
    event.preventDefault();
    const sectionNumber = match[1]; // Extract the number X
    await scrollToSection(`#section${sectionNumber}`);
  }

  demoMenu.init();
}

  
  jsMenuNode.querySelector(`.${menuClassesNames.toggleClass}`).addEventListener('click', toggleMenu);
 

  const menuLinks = jsMenuNode.querySelectorAll(`.${menuClassesNames.menuItemClass}`);
  menuLinks.forEach(link => link.addEventListener('click', toggleMenu));

   document.addEventListener('keydown', handleEscapeKey);
  
})();


















//progress bar
function progressBarScroll() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
      height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
      scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}

window.onscroll = function () {
  progressBarScroll();
};


//splitText

const quotes = document.querySelectorAll(".quote");

function setupSplits() {
  quotes.forEach(quote => {
    // Reset if needed
    if(quote.anim) {
      quote.anim.progress(1).kill();
      quote.split.revert();
    }

    quote.split = new SplitText(quote, { 
      type: "lines,words,chars",
      linesClass: "split-line"
    });

    // Set up the anim
    quote.anim = gsap.from(quote.split.chars, {
      scrollTrigger: {
        trigger: quote,
        toggleActions: "restart pause resume reverse",
        start: "top 50%",
      },
      duration: 1, 
      ease: "circ.out", 
      y: 80, 
      stagger: 0.02,
      opacity: 0, // Initial opacity value
      // Set the final opacity value to 1 at the end of the animation
      onComplete: () => {
        gsap.set(quote.split.chars, { opacity: 1 });
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  setupSplits();
});


const quote_text = document.querySelectorAll(".quote-text");

function setupOpacityAnimation() {
  quote_text.forEach((quote, index) => {
    gsap.fromTo(
      quote,
      {
        opacity: 0, // Initial opacity value
      },
      {
        opacity: 1, // Final opacity value
        scrollTrigger: {
          trigger: quote,
          toggleActions: "restart pause resume reverse",
          start: "top 50%",
        },
        delay: 0.15 * index, // Delay of 200ms multiplied by the index of each element
        duration: 1,
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", function() {
  setupOpacityAnimation();
});





const videos = document.querySelectorAll('.video');

videos.forEach((video, index) => {
  const tVideo = gsap.timeline({
    scrollTrigger: {
      trigger: video,
      scrub: true,
      start: "bottom bottom",
      end: "bottom 60%",
      onUpdate: self => {
        const progress = self.progress.toFixed(2);
        let scale, opacity;

        if (progress <= 0.1) {
          scale = gsap.utils.interpolate(0.95, 1.1, progress / 0.1);
          opacity = gsap.utils.mapRange(0, 0.1, 0, 1, progress);  // Use mapRange function to map progress to opacity smoothly
        } else {
          scale = 1.1;
          opacity = 1; // Video fully displayed
        }

        if (progress >= 0.7) {
          scale = gsap.utils.interpolate(1.1, 0.9, (progress - 0.7) / 0.3);
        }
        
        if (scale >= 1.1) {
          video.play();
        } else {
          video.pause();
        }

        gsap.to(video, { delay: 0.15 * index, duration: 0.3, scale: scale, opacity: opacity, transformOrigin: "center center", ease: "power2.out" });
      }
    }
  });
});


// Campaign One Side Animation
const bubbles = document.querySelectorAll('.bubble');

bubbles.forEach(bubble => {
  const bubbleTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: bubble,  // element that triggers the animation
      start: "top bottom",  // animation starts when the top of bubble hits the bottom of viewport
    },
    defaults: {
      duration: 1,
      ease: "power1.out",
    },
  });

  bubbleTimeline.from(bubble, {
    y: "+=50",  // move up by 50px
    autoAlpha: 0,  // initially hidden
  });
});





// place this line in the dialog show function - to only add the listener when the dialog is shown
window.addEventListener('keydown', handleKey);

// uncomment and place this in the dialog close/hide function to remove the listener when dialog is closed/hidden
// window.removeEventListener('keydown', handleKey);

function handleKey(e) {
    if (e.keyCode === 9) {
        let focusable = document.querySelector('.menu_activated').querySelectorAll('input,button,select,textarea');
        if (focusable.length) {
            let first = focusable[0];
            let last = focusable[focusable.length - 1];
            let shift = e.shiftKey;
            if (shift) {
                if (e.target === first) { // shift-tab pressed on first input in dialog
                    last.focus();
                    e.preventDefault();
                }
            } else {
                if (e.target === last) { // tab pressed on last input in dialog
                    first.focus();
                    e.preventDefault();
                }
            }
        }
    }
}




gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);














