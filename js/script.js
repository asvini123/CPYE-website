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

    nav.querySelectorAll('a:not(.nav-cta)').forEach(function (link) {
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

  // Hero Slideshow (2s automatic interval)
  initHeroSlideshow();

  // Donate Modal Functionality
  initDonateModal();
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

// ================= DONATE MODAL & WHATSAPP INTEGRATION =================
function initDonateModal() {
  // Check if modal exists, if not, create and inject it
  var modalOverlay = document.getElementById('donateModalOverlay');
  if (!modalOverlay) {
    var modalHTML = `
      <div class="donate-modal-overlay" id="donateModalOverlay" aria-modal="true" role="dialog">
        <div class="donate-modal">
          <div class="donate-modal-head">
            <div class="donate-modal-head-title">
              <img src="images/logo.jpeg" alt="CPYE logo">
              <h3>Support Our Cause</h3>
            </div>
            <button class="donate-modal-close" id="donateModalClose" type="button" aria-label="Close modal">&times;</button>
          </div>
          <div class="donate-modal-body">
            <form id="donateForm">
              <div class="donate-form-group">
                <label>Choose Project / Track</label>
                <select id="donateProject" required>
                  <option value="Our Resettlement Project">Our Resettlement Project (Vulnerable Children & Families)</option>
                  <option value="Future in Their Hands – IT Skills">Future in Their Hands – IT Skills & Digital Literacy</option>
                  <option value="Challenge-Based Learning & Education">Challenge-Based Learning & Education</option>
                  <option value="Community Dialogue & Peacebuilding">Community Dialogue & Peacebuilding</option>
                  <option value="General Community Support">General Community Development & Support</option>
                </select>
              </div>

              <div class="donate-form-group">
                <label>Contribution Amount (LKR)</label>
                <div class="donate-preset-grid">
                  <button type="button" class="donate-preset-btn active" data-amount="2500">2,500</button>
                  <button type="button" class="donate-preset-btn" data-amount="5000">5,000</button>
                  <button type="button" class="donate-preset-btn" data-amount="10000">10,000</button>
                  <button type="button" class="donate-preset-btn" data-amount="25000">25,000</button>
                </div>
                <input type="number" id="donateAmount" placeholder="Enter amount in LKR" value="2500" min="100" required>
              </div>

              <div class="donate-form-group">
                <label>Your Name *</label>
                <input type="text" id="donateName" placeholder="e.g. Asvini / John Doe" required>
              </div>

              <div class="donate-form-group">
                <label>Contact Number / WhatsApp *</label>
                <input type="tel" id="donatePhone" placeholder="e.g. +94 77 123 4567" required>
              </div>

              <div class="donate-form-group">
                <label>Email Address (Optional)</label>
                <input type="email" id="donateEmail" placeholder="e.g. yourname@gmail.com">
              </div>

              <div class="donate-form-group">
                <label>Message / Notes (Optional)</label>
                <textarea id="donateMessage" rows="2" placeholder="Any specific requirements or words of encouragement..."></textarea>
              </div>

              <button type="submit" class="donate-btn-submit">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.27 4.82L2 22l5.42-1.36a9.86 9.86 0 004.62 1.17h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.06c-.24.68-1.4 1.31-1.94 1.36-.5.05-1.05.24-3.53-.74-2.98-1.18-4.9-4.2-5.05-4.4-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.79-.37h.57c.18 0 .42-.02.66.5.24.53.83 1.83.9 1.96.07.13.12.28.02.46-.1.18-.15.28-.3.44-.15.15-.31.34-.44.46-.15.14-.3.3-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.08.13.08.73-.16 1.41z"/></svg>
                Send via WhatsApp
              </button>

              <div class="donate-note">
                🔒 Your details will be sent directly to CPYE’s official WhatsApp (+94 75 850 7463) to receive bank deposit / payment instructions.
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    modalOverlay = document.getElementById('donateModalOverlay');
  }

  var form = document.getElementById('donateForm');
  var amountInput = document.getElementById('donateAmount');
  var presetBtns = modalOverlay.querySelectorAll('.donate-preset-btn');

  function openDonateModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    var nameInput = document.getElementById('donateName');
    if (nameInput) setTimeout(function () { nameInput.focus(); }, 150);
  }

  function closeDonateModal() {
    if (modalOverlay) modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Universal click listener for all donate triggers and close buttons
  document.addEventListener('click', function (e) {
    if (e.target.closest('.nav-cta') || e.target.closest('.open-donate-modal') || e.target.closest('[data-open-donate]')) {
      openDonateModal(e);
      return;
    }
    if (e.target.closest('#donateModalClose') || e.target.closest('.donate-modal-close')) {
      e.preventDefault();
      closeDonateModal();
      return;
    }
    if (e.target === modalOverlay) {
      closeDonateModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeDonateModal();
    }
  });

  // Preset Amount Buttons
  presetBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      presetBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var val = btn.getAttribute('data-amount');
      if (amountInput) amountInput.value = val;
    });
  });

  if (amountInput) {
    amountInput.addEventListener('input', function () {
      var val = amountInput.value;
      presetBtns.forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-amount') === val);
      });
    });
  }

  // Form submission -> Format WhatsApp Message
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = (document.getElementById('donateName').value || '').trim();
      var phone = (document.getElementById('donatePhone').value || '').trim();
      var email = (document.getElementById('donateEmail').value || '').trim();
      var project = document.getElementById('donateProject').value;
      var amount = (amountInput ? amountInput.value : '').trim();
      var msg = (document.getElementById('donateMessage').value || '').trim();

      if (!name) {
        alert('Please enter your name.');
        return;
      }

      var formattedText = `*CPYE Donation / Support Inquiry*\n` +
        `--------------------------------\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Contact:* ${phone}\n` +
        (email ? `✉️ *Email:* ${email}\n` : ``) +
        `🎯 *Project:* ${project}\n` +
        `💰 *Donation Amount:* LKR ${amount}\n` +
        (msg ? `📝 *Message:* ${msg}\n` : ``) +
        `--------------------------------\n` +
        `Hello CPYE Team! I would like to make this contribution to support your project. Please share your bank transfer / payment instructions. Thank you!`;

      var waUrl = `https://wa.me/94758507463?text=${encodeURIComponent(formattedText)}`;

      // Open WhatsApp in a new window/tab
      window.open(waUrl, '_blank');

      closeDonateModal();
    });
  }
}
