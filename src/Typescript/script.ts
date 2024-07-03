// Scrolling
let html: HTMLElement;
let body: HTMLElement;

window.onload = function() {
  // getting all anchor tags
  const links = document.links;
  // getting html
  html = document.documentElement;
  // getting body
  body = document.body;
  
  for (let i = 0; i < links.length; i++) {
    links[i].onclick = function(event: MouseEvent) {
      // getting current scroll position
      const scrollTop = Math.round(body.scrollTop || html.scrollTop);
      if ((this as HTMLAnchorElement).hash !== "") {
        // preventing default anchor click behavior
        event.preventDefault();
        // getting element with id found in hash
        const hashElement = document.getElementById((this as HTMLAnchorElement).hash.substring(1));
        if (hashElement) {
          let hashElementTop = 0;
          let obj: HTMLElement | null = hashElement;
          while (obj.offsetParent) {
            hashElementTop += obj.offsetTop;
            obj = obj.offsetParent as HTMLElement;
          }
          // getting element's position
          hashElementTop = Math.round(hashElementTop);

          scroll(scrollTop, hashElementTop, (this as HTMLAnchorElement).hash);
        }
      }
    };
  }
};

function scroll(from: number, to: number, hash: string) {
  const timeInterval = 1; // in ms
  let prevScrollTop: number;
  const increment = (to > from) ? 10 : -10;
  const scrollByPixel = setInterval(() => {
    // getting current scroll position
    const scrollTop = Math.round(body.scrollTop || html.scrollTop);
    if ((prevScrollTop === scrollTop) || (to > from && scrollTop >= to) || (to < from && scrollTop <= to)) {
      clearInterval(scrollByPixel);
      // Add hash to the url after scrolling
      window.location.hash = hash;
    } else {
      body.scrollTop += increment;
      html.scrollTop += increment;
      prevScrollTop = scrollTop;
    }
  }, timeInterval);
}

// Typewriter
class Typewriter {
  txtElement: HTMLElement;
  words: string[];
  txt: string;
  wordIndex: number;
  wait: number;
  isDeleting: boolean;
  typing: boolean;

  constructor(txtElement: HTMLElement, words: string[], wait: number = 1000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait.toString(), 10);
    this.isDeleting = false;
    this.typing = false; // Track if typing has started
    this.init();
  }

  init() {
    this.startTypingOnScroll();
    this.type();
  }

  startTypingOnScroll() {
    window.addEventListener('scroll', () => {
      const rect = this.txtElement.getBoundingClientRect();
      const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (isInViewport && !this.typing) {
        this.typing = true;
        this.type();
      }
    });
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];
    // Check if Deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    // Init Type speed
    let typeSpeed = 100;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      if (this.wordIndex === this.words.length - 1) {
        return; // Stop after last word is typed
      }
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing next word
      typeSpeed = 300;
      if (this.wordIndex >= this.words.length) {
        return; // Stop after all words have been typed
      }
    }
    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init APP
function init() {
  const txtElement = document.querySelector('.txt-type') as HTMLElement;
  const words = JSON.parse(txtElement.getAttribute('data-words') as string);
  const wait = parseInt(txtElement.getAttribute('data-wait') as string, 50);
  // Init Typewriter
  new Typewriter(txtElement, words, wait);
}
