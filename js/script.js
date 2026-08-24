document.addEventListener('DOMContentLoaded', function () {
  // Mobile Navigation
  var toggle = document.querySelector('.nav-toggle');
  var closeBtn = document.querySelector('.nav-close');
  var nav = document.querySelector('.main-nav');

  function openNav() {
    if (!nav) return;
    nav.classList.add('open');
    document.body.classList.add('nav-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.style.visibility = 'hidden';
    }
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    if (!nav) return;
    nav.classList.remove('open');
    document.body.classList.remove('nav-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.style.visibility = 'visible';
    }
    document.body.style.overflow = '';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.contains('open');
      if (isOpen) { closeNav(); } else { openNav(); }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeNav);
    }

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  // Scroll Reveal Animations
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Footer Year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Hero Slideshow (Automatic 2 seconds interval)
  initHeroSlideshow();
});

// ================= HERO SLIDESHOW (2s interval) =================
function initHeroSlideshow() {
  var container = document.querySelector('.hero-slideshow-container');
  if (!container) return;

  var slides = container.querySelectorAll('.hero-slide');
  var dots = container.querySelectorAll('.slideshow-dot');
  var prevBtn = container.querySelector('.slideshow-prev');
  var nextBtn = container.querySelector('.slideshow-next');
  if (!slides.length) return;

  var currentIndex = 0;
  var timer = null;
  var intervalTime = 2000; // 2 seconds per slide

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;

    slides.forEach(function (slide, i) {
      slide.classList.toggle('active', i === currentIndex);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(nextSlide, intervalTime);
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function (e) {
      e.preventDefault();
      nextSlide();
      startTimer();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function (e) {
      e.preventDefault();
      prevSlide();
      startTimer();
    });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function (e) {
      e.preventDefault();
      showSlide(i);
      startTimer();
    });
  });

  container.addEventListener('mouseenter', stopTimer);
  container.addEventListener('mouseleave', startTimer);

  // Mobile Touch Swipe Handling
  var touchStartX = 0;
  var touchEndX = 0;

  container.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
    stopTimer();
  }, { passive: true });

  container.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    startTimer();
  }, { passive: true });

  // Start 2s autoplay
  startTimer();
}
