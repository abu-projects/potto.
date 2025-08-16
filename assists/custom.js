/* Custom JavaScript for potto.eu website */

// Tailwind configuration
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: "#202F57",
        secondary: "#2CB0DB",
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px",
        button: "8px",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
};

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Contact form handling
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      alert(
        "Vielen Dank für Ihre Anfrage! Wir werden uns schnellstmöglich bei Ihnen melden."
      );
      contactForm.reset();
    });
  }

  // Service form handling
  const serviceForm = document.getElementById("service-form");
  if (serviceForm) {
    serviceForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(serviceForm);
      const data = Object.fromEntries(formData);
      alert(
        "Vielen Dank für Ihre Service-Anfrage! Wir werden uns schnellstmöglich bei Ihnen melden und einen Termin vereinbaren."
      );
      serviceForm.reset();
      const selectedService = document.getElementById("selected-service");
      const serviceType = document.getElementById("service-type");
      if (selectedService) selectedService.textContent = "Service auswählen";
      if (serviceType) serviceType.value = "";
    });
  }

  // Smooth scrolling
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#impressum") return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Logo fallback
  document.querySelectorAll('img[data-logo]').forEach(function(img){
    img.addEventListener('error', function(){
      const wrap = img.closest('.logo-item');
      const name = wrap?.getAttribute('data-name') || 'Logo';
      const badge = document.createElement('div');
      badge.className = 'px-3 py-1 text-sm font-semibold text-gray-700';
      badge.textContent = name;
      img.remove();
      wrap.appendChild(badge);
    });
  });

  // Impressum toggle (if exists)
  const impressumLink = document.querySelector('a[href="#impressum"]');
  const impressumPage = document.getElementById('impressum-page');
  const closeImpressum = document.getElementById('close-impressum');
  
  if (impressumLink && impressumPage && closeImpressum) {
    impressumLink.addEventListener('click', function(e) {
      e.preventDefault();
      impressumPage.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
    
    closeImpressum.addEventListener('click', function() {
      impressumPage.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });
  }
  
  // Service dropdown functionality
  const serviceDropdown = document.getElementById("service-dropdown");
  const serviceOptions = document.getElementById("service-options");
  const selectedService = document.getElementById("selected-service");
  const serviceTypeInput = document.getElementById("service-type");
  const serviceOptionButtons = document.querySelectorAll(".service-option");
  
  if (serviceDropdown && serviceOptions) {
    serviceDropdown.addEventListener("click", function () {
      serviceOptions.classList.toggle("hidden");
    });
    
    if (serviceOptionButtons.length > 0) {
      serviceOptionButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const value = this.getAttribute("data-value");
          const text = this.textContent.trim();
          if (selectedService) selectedService.textContent = text;
          if (serviceTypeInput) serviceTypeInput.value = value;
          serviceOptions.classList.add("hidden");
        });
      });
    }
    
    document.addEventListener("click", function (e) {
      if (
        serviceDropdown && serviceOptions &&
        !serviceDropdown.contains(e.target) &&
        !serviceOptions.contains(e.target)
      ) {
        serviceOptions.classList.add("hidden");
      }
    });
  }
});