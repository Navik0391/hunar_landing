import './style.css'

// Скрипт для слайдера (переключение каждые 4 секунды)
const slides = document.querySelectorAll('.hero-slide');
if (slides.length > 0) {
  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 4000);
}


// Логика появления элементов при скроллинге (Intersection Observer)
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Элемент начнет появляться когда виден на 15%
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Анимируем только один раз
        
        // После завершения анимации (через 1.5 секунды)
        // удаляем классы появления, чтобы они не перебивали Tailwind hover (transform и transition)
        setTimeout(() => {
          entry.target.classList.remove(
            'reveal', 'reveal-left', 'reveal-right', 'reveal-bottom',
            'delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500',
            'active'
          );
        }, 1500);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-bottom');
  elements.forEach(el => observer.observe(el));
}

// Запускаем инициализацию после загрузки DOM
document.addEventListener('DOMContentLoaded', initScrollAnimations);
// Если скрипт вызывается как module, DOMContentLoaded может уже отработать, поэтому запускаем сразу тоже
initScrollAnimations();

// Интеллектуальное изменение цвета шапки при скролле до "мастерской" секции
function initHeaderColorChange() {
  const header = document.getElementById('main-header');
  const targetSection = document.getElementById('how-to-become-a-repairman');
  
  if (!header || !targetSection) return;

  const handleScroll = () => {
    // Высота шапки (примерно 80px)
    const offset = 85;
    const rect = targetSection.getBoundingClientRect();
    
    if (window.scrollY < 50) {
      // В самом верху — шапка прозрачная
      header.classList.remove('bg-primary', 'bg-secondary');
    } else if (rect.top <= offset) {
      // Доскроллили до секции how-to-become-a-repairman
      header.classList.remove('bg-primary');
      header.classList.add('bg-secondary');
    } else {
      // Обычный скролл по странице
      header.classList.remove('bg-secondary');
      header.classList.add('bg-primary');
    }
  };

  // Следим за скроллом страницы
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Проверяем позицию сразу при загрузке
  handleScroll();
}

document.addEventListener('DOMContentLoaded', initHeaderColorChange);
initHeaderColorChange();

// Управление мобильным меню
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const overlay = document.getElementById('mobile-menu-overlay');
  const line1 = document.getElementById('burger-line-1');
  const line2 = document.getElementById('burger-line-2');
  const line3 = document.getElementById('burger-line-3');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-link-divider');
  
  if (!btn || !overlay) return;
  
  let menuOpen = false;

  const toggleMenu = () => {
    menuOpen = !menuOpen;
    
    if (menuOpen) {
      // Показываем оверлей
      overlay.classList.remove('opacity-0', 'pointer-events-none');
      overlay.classList.add('opacity-100', 'pointer-events-auto');
      
      // Анимируем крестик
      line1.className = "absolute left-0 w-full h-0.5 bg-white rounded transition-all duration-300 top-1/2 -translate-y-1/2 rotate-45";
      line2.className = "absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-transparent rounded transition-all duration-300"; // Делаем прозрачным
      line3.className = "absolute left-0 w-full h-0.5 bg-white rounded transition-all duration-300 top-1/2 -translate-y-1/2 -rotate-45";
      
      // Вызываем ссылки с красивым fade-in
      mobileLinks.forEach((link, index) => {
        setTimeout(() => {
          link.classList.remove('translate-y-4', 'opacity-0');
          link.classList.add('translate-y-0', 'opacity-100');
        }, index * 50 + 100);
      });
      
      // Блокируем скролл за оверлеем
      document.body.style.overflow = 'hidden';
      
    } else {
      // Прячем оверлей
      overlay.classList.add('opacity-0', 'pointer-events-none');
      overlay.classList.remove('opacity-100', 'pointer-events-auto');
      
      // Анимируем бургер обратно
      line1.className = "absolute top-0 left-0 w-full h-0.5 bg-white rounded transition-all duration-300";
      line2.className = "absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-white rounded transition-all duration-300";
      line3.className = "absolute bottom-0 left-0 w-full h-0.5 bg-white rounded transition-all duration-300";
      
      // Сбрасываем классы ссылок для следующего открытия
      mobileLinks.forEach(link => {
        link.classList.add('translate-y-4', 'opacity-0');
        link.classList.remove('translate-y-0', 'opacity-100');
      });
      
      // Возвращаем скролл
      document.body.style.overflow = '';
    }
  };

  btn.addEventListener('click', toggleMenu);
  
  // Закрывать меню при клике на любую ссылку
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuOpen) {
        toggleMenu();
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initMobileMenu);
initMobileMenu();

// Скрипт для слайдера внутри телефона (секция Скачайте приложение)
function initPhoneSlider() {
  const slider = document.getElementById('phone-app-slider');
  if (!slider) return;
  const slideCount = slider.children.length;
  let currentPhoneSlide = 0;
  
  setInterval(() => {
    currentPhoneSlide = (currentPhoneSlide + 1) % slideCount;
    slider.style.transform = `translateX(-${currentPhoneSlide * 100}%)`;
  }, 2000);
}

document.addEventListener('DOMContentLoaded', initPhoneSlider);
initPhoneSlider();

// Скрипт для Splash Screen (Экрана загрузки)
function initSplashScreen() {
  const splash = document.getElementById('splash-screen');
  if (!splash) return;

  // Блокируем скролл пока висит экран загрузки
  document.body.style.overflow = 'hidden';

  let isHidden = false;

  const hideSplash = () => {
    if (isHidden) return;
    isHidden = true;
    
    // Прячем стилями
    splash.classList.add('splash-hidden');
    
    // Возвращаем скролл
    document.body.style.overflow = '';

    // Удаляем элемент после завершения анимации (700ms)
    setTimeout(() => {
      splash.remove();
    }, 700);
  };

  // Механизм 1: ждем окончания загрузки страницы + тайм-аут для красоты
  window.addEventListener('load', () => {
    setTimeout(hideSplash, 600);
  });

  // Механизм 2 (фоллбэк): убираем экран максимум через 4 секунды в любом случае
  setTimeout(hideSplash, 4000);
}

// Запускаем сразу, не дожидаясь DOMContentLoaded, чтобы скролл заблокировался как можно раньше
initSplashScreen();
document.addEventListener('DOMContentLoaded', initSplashScreen);

// Скрипт для Coverflow карусели (3D слайдер телефонов)
function initCoverflow() {
  const slides = document.querySelectorAll('.coverflow-slide');
  if (slides.length === 0) return;

  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    
    slides.forEach((slide, i) => {
      slide.classList.remove('coverflow-center', 'coverflow-right', 'coverflow-left');
      
      if (i === currentIndex) {
        slide.classList.add('coverflow-center');
      } else if (i === (currentIndex + 1) % slides.length) {
        slide.classList.add('coverflow-right');
      } else {
        slide.classList.add('coverflow-left');
      }
    });
  }, 3000);
}

document.addEventListener('DOMContentLoaded', initCoverflow);
initCoverflow();

// Скрипт для модального окна "Оставить заявку"
function initCallbackModal() {
  const modal = document.getElementById('modal-callback');
  if (!modal) return;
  
  const backdrop = modal.querySelector('.modal-backdrop');
  const content = modal.querySelector('.modal-content');
  const closeBtns = modal.querySelectorAll('.close-modal');
  const openBtns = document.querySelectorAll('a[href="#modal-callback"]');
  const form = document.getElementById('callback-form');
  const successMessage = document.getElementById('callback-success');
  const header = document.getElementById('main-header');
  const phoneInput = document.getElementById('callback-phone');
  const submitBtn = document.getElementById('callback-submit-btn');
  const btnText = document.getElementById('callback-btn-text');
  const btnSpinner = document.getElementById('callback-btn-spinner');
  
  let isOpen = false;

  const openModal = (e) => {
    if (e) e.preventDefault();
    isOpen = true;
    
    // Снимаем скрытие
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Блокируем скролл самого сайта
    document.body.style.overflow = 'hidden';

    // Даем браузеру цикл на рендер перед анимацией свойств
    requestAnimationFrame(() => {
      modal.classList.remove('opacity-0', 'pointer-events-none');
      content.classList.remove('scale-95');
      content.classList.add('scale-100');
    });
  };

  const closeModal = () => {
    isOpen = false;
    modal.classList.add('opacity-0', 'pointer-events-none');
    content.classList.remove('scale-100');
    content.classList.add('scale-95');
    
    // Ждем окончания transition (300ms) перед display: none
    setTimeout(() => {
      if (!isOpen) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Сброс формы и окна успеха, если нужно на будущее
        setTimeout(() => {
          if (form) form.reset();
          if (successMessage) {
            successMessage.classList.remove('flex');
            successMessage.classList.add('hidden');
          }
        }, 100);
      }
    }, 300);
  };

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
  
  // Клик по темному фону закрывает модалку
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }
  
  // Маска для телефона (+992)
  if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
      // Очищаем от всего кроме цифр
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
      if (!x[1]) {
        e.target.value = '';
        return;
      }
      
      let res = '';
      if (x[1] === '992') {
        res = '+992 ' + (x[2] ? x[2] + ' ' : '') + (x[3] ? x[3] + ' ' : '') + (x[4] ? x[4] + ' ' : '') + (x[5] ? x[5] : '');
      } else {
        res = '+' + x[1] + (x[2] ? ' ' + x[2] : '') + (x[3] ? ' ' + x[3] : '') + (x[4] ? ' ' + x[4] : '') + (x[5] ? ' ' + x[5] : '');
      }
      e.target.value = res.trim();
    });

    // Добавляем префикс при клике на пустое поле
    phoneInput.addEventListener('focus', function(e) {
      if (e.target.value === '') e.target.value = '+992 ';
    });
  }

  // Перехват отправки формы (имитация запроса на сервер)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Включаем лоадер на кнопке
      if (submitBtn && btnText && btnSpinner) {
        submitBtn.disabled = true;
        btnText.textContent = 'Отправка...';
        btnSpinner.classList.remove('hidden');
      }

      // Имитируем задержку сети сервера в 1.5 секунды
      setTimeout(() => {
        // Успех, показываем сообщение
        if (successMessage) {
          successMessage.classList.remove('hidden');
          successMessage.classList.add('flex');
          requestAnimationFrame(() => {
            successMessage.style.opacity = '1';
          });
        }
        
        // Возвращаем кнопку в исходное состояние для следующего раза
        if (submitBtn && btnText && btnSpinner) {
          submitBtn.disabled = false;
          btnText.textContent = 'Отправить заявку';
          btnSpinner.classList.add('hidden');
        }
      }, 1500);
    });
  }
}

document.addEventListener('DOMContentLoaded', initCallbackModal);
initCallbackModal();
