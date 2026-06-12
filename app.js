$(function(){

  /* =========================================
     MOBILE NAVIGATION
  ========================================= */

  function removeNav(){
    $('.site-nav').removeClass('active');
    $('.nav-toggle').removeClass('open')
      .attr('aria-expanded','false');
    $('body').removeClass('nav-open');
  }

  $('.nav-toggle').on('click',function(){
    var expanded=$(this).attr('aria-expanded')==='true';
    $(this).attr('aria-expanded',!expanded)
      .toggleClass('open');
    $('.site-nav').toggleClass('active');
    $('body').toggleClass('nav-open');
  });

  $('.site-nav a').on('click',removeNav);


  /* =========================================
     HEADER SCROLL EFFECT
  ========================================= */

  $(window).on('scroll',function(){
    $('.site-header')
      .toggleClass('scrolled',$(window).scrollTop()>50);
  });


  /* =========================================
     SEARCH FILTER
  ========================================= */

  $('#search-input').on('input',function(){
    var query=$(this).val().toLowerCase().trim();
    $('.sport-card').each(function(){
      var text=$(this).text().toLowerCase();
      $(this).toggle(text.indexOf(query)!==-1);
    });
  });


  /* =========================================
     LOCAL VISIT COUNTER
  ========================================= */

  function updateVisits(){
    var visits=Number(localStorage.getItem('srcVisitorCount')||0)+1;
    localStorage.setItem('srcVisitorCount',visits);
    $('#page-visits').text(visits);
  }

  if($('#page-visits').length){ updateVisits(); }


  /* =========================================
     CAPTCHA SYSTEM
  ========================================= */

  function setCaptcha(formId, challengeId){
    if($(challengeId).length){
      var a=Math.floor(Math.random()*8)+2;
      var b=Math.floor(Math.random()*7)+2;
      var answer=a+b;
      $(challengeId)
        .data('answer',answer)
        .text('What is '+a+' + '+b+'?');
      $(formId).data('captcha',answer);
    }
  }

  setCaptcha('#register-form','#captcha-challenge');
  setCaptcha('#booking-form','#booking-captcha-challenge');


  function showMessage(selector,message,type){
    var color=type==='error'?'#ffb3b3':'#c8f7d3';
    selector.css({color:color}).text(message);
  }


  function handleForm(formId, messageId, fields, captchaField, challengeId){
    $(formId).on('submit',function(e){
      e.preventDefault();

      var valid=true;
      var message='Please complete all required fields.';

      fields.forEach(function(selector){
        var field=$(selector);
        if(!field.val().trim()){
          valid=false;
          field.addClass('input-error');
        } else {
          field.removeClass('input-error');
        }
      });

      var expected=$(formId).data('captcha');
      var actual=$(captchaField).val().trim();

      if(valid && Number(actual)!==expected){
        valid=false;
        message='Please solve the verification correctly.';
      }

      if(!valid){
        showMessage($(messageId),message,'error');
        var firstError=$(formId)
          .find('.input-error').first();
        if(firstError.length){
          firstError[0]
            .scrollIntoView({behavior:'smooth',block:'center'});
        }
        return;
      }

      showMessage(
        $(messageId),
        'Thanks! Your submission was received successfully.',
        'success'
      );

      $(formId)[0].reset();
      setCaptcha(formId, challengeId);
    });
  }

  handleForm(
    '#register-form',
    '#register-message',
    ['#full-name','#email','#interest','#captcha-answer'],
    '#captcha-answer',
    '#captcha-challenge'
  );

  handleForm(
    '#booking-form',
    '#booking-message',
    ['#booking-name','#booking-email','#booking-sport','#session-date','#time-slot','#booking-captcha'],
    '#booking-captcha',
    '#booking-captcha-challenge'
  );

  $('.faq-toggle').on('click', function(){
    var card=$(this).closest('.faq-card');
    var expanded=$(this).attr('aria-expanded')==='true';
    var answer=card.find('.faq-answer');

    card.toggleClass('open');
    $(this).attr('aria-expanded', String(!expanded));

    answer.stop(true,true).slideToggle(300);
  });

  /* =========================================
     SCROLL REVEAL ANIMATION
  ========================================= */

  const observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        $(entry.target).addClass('active');
      }
    });
  },{ threshold:0.2 });

  $('.sport-card, .stat-card, .highlight-card')
    .each(function(){
      $(this).addClass('reveal');
      observer.observe(this);
    });


  /* =========================================
     3D TILT EFFECT (SPORT + STATS)
  ========================================= */

  $('.sport-card, .stat-card').on('mousemove',function(e){

    var card=$(this);
    var rect=this.getBoundingClientRect();

    var x=e.clientX-rect.left;
    var y=e.clientY-rect.top;

    var rotateY=(x/rect.width-0.5)*18;
    var rotateX=(y/rect.height-0.5)*-18;

    card.css(
      'transform',
      'rotateY('+rotateY+'deg) rotateX('+rotateX+'deg)'
    );

  }).on('mouseleave',function(){
    $(this).css('transform','rotateY(0deg) rotateX(0deg)');
  });


  /* =========================================
     HERO PARALLAX (SMOOTHER)
  ========================================= */

  $('.hero-section').on('mousemove',function(e){

    var width=$(this).width();
    var height=$(this).height();

    var offsetX=(e.pageX-$(this).offset().left-width/2)/width*25;
    var offsetY=(e.pageY-$(this).offset().top-height/2)/height*25;

    $(this).find('.hero-copy').css(
      'transform',
      'translate3d('+offsetX+'px,'+offsetY+'px,0)'
    );

  }).on('mouseleave',function(){

    $(this).find('.hero-copy').css(
      'transform',
      'translate3d(0,0,0)'
    );

  });

  // HERO VIDEO INLINE / Firefox fallback
  (function heroVideoFallback(){
    var hero = document.querySelector('.hero-section .hero-video');
    if (!hero) return;
    var v = document.createElement('video');
    var supportsPlaysInline = 'playsInline' in v;
    var ua = navigator.userAgent || '';
    var isFirefoxAndroid = /Android/i.test(ua) && /Firefox/i.test(ua);

    if (!supportsPlaysInline || isFirefoxAndroid) {
      var poster = hero.getAttribute('poster') || 'images/basketball.jpg';
      var img = document.createElement('img');
      img.className = 'hero-poster';
      img.src = poster;
      img.alt = hero.getAttribute('aria-label') || '';
      img.setAttribute('aria-hidden','true');
      hero.parentNode.insertBefore(img, hero);
      hero.style.display = 'none';
    } else {
      try {
        hero.muted = true;
        hero.setAttribute('muted','');
        hero.play().catch(function(){});
      } catch (e) {}
    }
  })();

});

/* =================================================
   GSAP ANIMATIONS - PREMIUM ANIMATION SYSTEM
================================================= */

// Register GSAP Plugins (safe: only register plugins that are present)
(function registerGSAPPlugins(){
  const plugins = [];
  if (typeof window !== 'undefined') {
    if (window.ScrollTrigger) plugins.push(window.ScrollTrigger);
    if (window.ScrollToPlugin) plugins.push(window.ScrollToPlugin);
    if (window.TextPlugin) plugins.push(window.TextPlugin);
  }
  if (plugins.length) gsap.registerPlugin(...plugins);
})();

// ===== 1. SCROLL PROGRESS INDICATOR =====
(function initScrollProgressIndicator() {
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress-bar';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff6b35, #ff9f6b, #ff6b35);
    box-shadow: 0 0 15px rgba(255, 107, 53, 0.8);
    width: 0%;
    z-index: 9999;
  `;
  document.body.appendChild(progressBar);

  gsap.to(progressBar, {
    scrollTrigger: {
      trigger: document.body,
      scrub: 0.5,
      markers: false,
      onUpdate: (self) => {
        gsap.set(progressBar, { width: self.progress * 100 + '%' });
      }
    }
  });
})();

// ===== 2. FLOATING ELEMENTS MOVEMENT =====
// ===== 2. FLOATING ELEMENTS MOVEMENT =====
(function initFloatingElements() {
  const floatingElements = document.querySelectorAll('.sport-card, .stat-card, .highlight-card, .testimonial-card, .faq-card');
  
  floatingElements.forEach((element, index) => {
    // Add subtle floating movement — no opacity change and no infinite fade
    gsap.fromTo(element, 
      {
        y: 0
      },
      {
        y: 12,
        duration: 0.8,
        delay: index * 0.06,
        ease: 'sine.inOut',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none play none'
        }
      }
    );

    // Add very gentle rotation (kept slow)
    gsap.to(element, {
      rotation: Math.random() * 2 - 1,
      repeat: -1,
      yoyo: true,
      duration: 6 + Math.random() * 4,
      ease: 'sine.inOut'
    });
  });
})();

// ===== 3. SECTION ZOOM-IN TRANSITIONS =====
(function initSectionZoomIn() {
  const sections = document.querySelectorAll('section[class*="section"]');
  
  sections.forEach((section) => {
    gsap.fromTo(section,
      {
        opacity: 0,
        scale: 0.95,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 20%',
          toggleActions: 'play none play none'
        }
      }
    );
  });
})();

// ===== 4. CARDS SLIDE IN STAGGERED =====
(function initCardSlideIn() {
  // Sport cards slide in from left
  gsap.utils.toArray('.sport-card').forEach((card, index) => {
    gsap.fromTo(card,
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none play none'
        }
      }
    );
  });

  // Highlight cards slide in from right
  gsap.utils.toArray('.highlight-card').forEach((card, index) => {
    gsap.fromTo(card,
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none play none'
        }
      }
    );
  });
})();

// ===== X. LEFT/RIGHT CONVERGE ON SCROLL =====
(function initLeftRightConverge() {
  const targets = gsap.utils.toArray('.hero-copy, .hero-card, .testimonial-card, .sport-card, .highlight-card, .identity-card, .funding-wrapper, .about-stats, .stat-pill');

  targets.forEach((el) => {
    // compute element center at runtime to decide direction
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const fromLeft = centerX < (window.innerWidth / 2);
    const distance = Math.max(window.innerWidth * 0.12, 60); // 12% or min 60px

    gsap.fromTo(el,
      { x: fromLeft ? -distance : distance },
      {
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 35%',
          scrub: 0.6
        }
      }
    );
  });
})();


// ===== 5. TEXT TYPING EFFECT ON SCROLL =====
(function initTextTyping() {
  // Disabled by default to avoid layout shifts. To enable, add `.type-animate` to elements.
  const typingElements = document.querySelectorAll('.type-animate');
  if (!typingElements.length) return;

  typingElements.forEach((element) => {
    if (element.dataset.typed) return;
    const originalText = element.textContent;
    element.textContent = '';
    element.dataset.typed = true;

    gsap.to(element, {
      text: { value: originalText },
      duration: originalText.length * 0.05,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none play none'
      }
    });
  });
})();

// ===== 6. ENHANCED 3D TILT WITH VANILLA TILT =====
(function initVanillaTilt() {
  const tiltElements = document.querySelectorAll('.sport-card, .stat-card, .highlight-card');
  
  if (window.VanillaTilt) {
    tiltElements.forEach((element) => {
      VanillaTilt.init(element, {
        max: 15,
        speed: 400,
        scale: 1.05,
        transition: true
      });
    });
  }
})();

// ===== 7. PARALLAX SCROLL EFFECT =====
(function initParallaxScroll() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  parallaxElements.forEach((element) => {
    gsap.to(element, {
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        scrub: 1,
        markers: false
      }
    });
  });
})();

// ===== 8. ANIMATED COUNTERS ON SCROLL =====
(function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-counter]');
  
  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.counter);
    
    gsap.fromTo(counter,
      { innerText: 0 },
      {
        innerText: target,
        duration: 2,
        ease: 'power3.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: counter,
          start: 'top 80%',
          toggleActions: 'play none play none'
        },
        onUpdate: function() {
          counter.innerText = Math.ceil(this.targets()[0].innerText) + '+';
        }
      }
    );
  });
})();

// ===== 9. BUTTON HOVER ANIMATION =====
(function initButtonAnimations() {
  const buttons = document.querySelectorAll('a.cta, .track-btn, .highlight-btn, button[type="submit"]');
  
  buttons.forEach((btn) => {
    btn.addEventListener('mouseenter', function() {
      gsap.to(this, {
        scale: 1.08,
        boxShadow: '0 10px 30px rgba(255, 107, 53, 0.5)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    btn.addEventListener('mouseleave', function() {
      gsap.to(this, {
        scale: 1,
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
})();

// ===== 10. SMOOTH SCROLL TO ANCHOR LINKS =====
(function initSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      if (window.ScrollToPlugin) {
        gsap.to(window, {
          scrollTo: { y: target, autoKill: false },
          duration: 1,
          ease: 'power3.inOut'
        });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();

// ===== 11. PAGE LOAD ENTRANCE ANIMATION =====
(function initPageLoadAnimation() {
  const timeline = gsap.timeline();
  
  timeline
    .fromTo('header', 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo('.hero-section',
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
      0.2
    )
    .fromTo('.hero-copy',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      0.3
    );
})();

// ===== 12. SCROLL REVEAL FOR TEXT BLOCKS =====
(function initTextBlockReveal() {
  const textBlocks = document.querySelectorAll('p, .description, .content-text');
  
  gsap.utils.toArray(textBlocks).forEach((block) => {
    gsap.fromTo(block,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 90%',
          toggleActions: 'play none play none'
        }
      }
    );
  });
})();

// ===== 13. REFRESH SCROLL TRIGGER ON WINDOW RESIZE =====
window.addEventListener('resize', () => {
  if (window.ScrollTrigger && typeof ScrollTrigger.getAll === 'function') {
    ScrollTrigger.getAll().forEach(trigger => trigger.refresh());
  }
});

/* =================================================
   AUTO TESTIMONIAL SLIDER
================================================= */

const testimonialTrack = document.querySelector(".testimonial-track");
const testimonialDots = document.querySelectorAll(".dot");
let testimonialIndex = 0;

if (testimonialTrack && testimonialDots.length) {
  function moveSlider() {
    testimonialIndex++;

    if (testimonialIndex > testimonialDots.length - 1) {
      testimonialIndex = 0;
    }

    testimonialTrack.style.transform =
      `translateX(-${testimonialIndex * 350}px)`;

    testimonialDots.forEach(dot => dot.classList.remove("active"));
    testimonialDots[testimonialIndex].classList.add("active");
  }

  setInterval(moveSlider, 4000);
}

const scheduleTrack = document.getElementById("track");
const scheduleCards = document.querySelectorAll(".schedule-card");
const eventDots = document.querySelectorAll(".event-dots span");
let scheduleIndex = 0;

function updateScheduleSlider() {
  if (!scheduleTrack || !scheduleCards.length) return;

  const gapValue = parseFloat(getComputedStyle(scheduleTrack).columnGap) || 0;
  const cardWidth = scheduleCards[0].offsetWidth + gapValue;

  scheduleTrack.style.transform = `translateX(-${scheduleIndex * cardWidth}px)`;

  if (eventDots.length) {
    eventDots.forEach(dot => dot.classList.remove("active"));
    if (eventDots[scheduleIndex]) {
      eventDots[scheduleIndex].classList.add("active");
    }
  }
}

window.addEventListener("load", function() {
  if (!scheduleTrack || !scheduleCards.length) return;

  if (eventDots.length) {
    eventDots[0].classList.add("active");
  }

  updateScheduleSlider();

  window.addEventListener("resize", updateScheduleSlider);

  if (eventDots.length) {
    eventDots.forEach(function(dot, dotIndex){
      dot.addEventListener('click', function(){
        scheduleIndex = dotIndex;
        updateScheduleSlider();
      });
    });
  }

  setInterval(function() {
    scheduleIndex = (scheduleIndex + 1) % scheduleCards.length;
    updateScheduleSlider();
  }, 3000);
});

/* ── FAQ accordion (activities page) ──
   Add this to your app.js or a <script> at the bottom of new-activities.html */

document.querySelectorAll('.faq-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.faq-card');
    const isOpen = card.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-card').forEach(c => {
      c.classList.remove('open');
      c.querySelector('.faq-toggle').setAttribute('aria-expanded', 'false');
    });

    // Open clicked (if it was closed)
    if (!isOpen) {
      card.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});