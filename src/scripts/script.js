//Typewriter Header
var words = document.querySelectorAll(".word");
words.forEach(function (word) {
    var letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach(function (letter) {
        var span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});
var currentWordIndex = 0;
var maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";
var rotateText = function () {
    var currentWord = words[currentWordIndex];
    var nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
    // rotate out letters of current word
    Array.from(currentWord.children).forEach(function (letter, i) {
        setTimeout(function () {
            letter.className = "letter out";
        }, i * 80);
    });
    // reveal and rotate in letters of next word
    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach(function (letter, i) {
        letter.className = "letter behind";
        setTimeout(function () {
            letter.className = "letter in";
        }, 340 + i * 80);
    });
    currentWordIndex =
        currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};
rotateText();
setInterval(rotateText, 4000);

// Animated counter functionality
function dt_counterFlip() {
    const counter = document.getElementById('counter');
    const counters = counter.querySelectorAll('.count');

    function animateCounter(counterElement) {
        let start = 0;
        const end = parseInt(counterElement.textContent, 10);
        const duration = 4000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            counterElement.textContent = Math.ceil(progress * end);
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counterElement => {
                    animateCounter(counterElement);
                });
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    observer.observe(counter);
}

document.addEventListener('DOMContentLoaded', function() {
    dt_counterFlip();
});

//radial progress bar functionality
document.addEventListener('DOMContentLoaded', function() {
  const svg = document.querySelector('.radial-progress');
  const animatedCircle = svg.querySelector('.bar--animated');

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function onScroll() {
    if (isElementInViewport(svg)) {
      animatedCircle.classList.add('animated');
      window.removeEventListener('scroll', onScroll);
    }
  }

  window.addEventListener('scroll', onScroll);
  onScroll(); // Check if the element is already in view
});


// Bar graph functionality
document.addEventListener('DOMContentLoaded', function() {
    function skillSet() {
      // Iterate over each element with the class bar-info
      // and dynamically update the width of each bar.
      document.querySelectorAll('.bar-info').forEach(function(barInfo) {
        const total = barInfo.dataset.total;
        barInfo.style.width = total + '%';
      });
  
      // Iterate over each element with the class percent
      // and implement a counter animation for each .percent element.
      document.querySelectorAll('.percent').forEach(function(percentElement) {
        const endValue = parseInt(percentElement.textContent, 10);
        let startValue = 10;
        const duration = 3000;
        const startTime = performance.now();
  
        function animateCounter(currentTime) {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const counterValue = Math.ceil(startValue + progress * (endValue - startValue));
          percentElement.textContent = counterValue + '%';
  
          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          }
        }
  
        requestAnimationFrame(animateCounter);
      });
    }
  
    // Set up Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the target is visible
    };
  
    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillSet();
          observer.disconnect(); // Stop observing after animation starts
        }
      });
    }, observerOptions);
  
    // Observe the first .bar-info element to trigger the skillSet function
    const targetElement = document.querySelector('.bar-info');
    if (targetElement) {
      observer.observe(targetElement);
    }
  });
  
  //card animation functionality
  document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.animate-card, .SlideLeftCard, .SlideRightCard');
  
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    function onScroll() {
      elements.forEach(element => {
        if (isElementInViewport(element)) {
          element.classList.add('slide-in');
        }
      });
    }
  
    window.addEventListener('scroll', onScroll);
    onScroll(); // Check if the elements are already in view
  });
  
  