const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
let interval = setInterval(nextSlide, 5000);

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  currentSlide = index;
}

function nextSlide() {
  let next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

function prevSlide() {
  let prev = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prev);
}

document.querySelector(".hero-arrow.right").addEventListener("click", () => {
  nextSlide();
  resetInterval();
});

document.querySelector(".hero-arrow.left").addEventListener("click", () => {
  prevSlide();
  resetInterval();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    resetInterval();
  });
});

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(nextSlide, 5000);
}

$(document).ready(function () {
  $(".gallery-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    speed: 600,
    responsive: [
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});

const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

// Set minimum date to tomorrow
const dateInput = document.getElementById("date");
const today = new Date();
today.setDate(today.getDate() + 1);
dateInput.min = today.toISOString().split("T")[0];

function showError(input, message) {
  input.classList.add("error");
  input.nextElementSibling.textContent = message;
}

function clearError(input) {
  input.classList.remove("error");
  input.nextElementSibling.textContent = "";
}

function validateField(input) {
  const value = input.value.trim();

  if (input.id === "name") {
    if (value.length < 2) return "Minimum 2 characters required";
  }

  if (input.id === "email") {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!pattern.test(value)) return "Enter valid email";
  }

  if (input.id === "phone") {
    const pattern = /^[0-9]{10,}$/;
    if (!pattern.test(value)) return "Enter valid phone (min 10 digits)";
  }

  if (input.id === "model" && value === "") {
    return "Please select a model";
  }

  if (input.id === "date" && value === "") {
    return "Please select a future date";
  }

  return "";
}

// Real-time validation
form.querySelectorAll("input, select").forEach((input) => {
  input.addEventListener("blur", () => {
    const error = validateField(input);
    if (error) showError(input, error);
    else clearError(input);
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  form.querySelectorAll("input, select").forEach((input) => {
    const error = validateField(input);
    if (error) {
      showError(input, error);
      isValid = false;
    } else {
      clearError(input);
    }
  });

  // Checkbox validation
  const terms = document.getElementById("terms");
  if (!terms.checked) {
    terms.nextElementSibling.nextElementSibling.textContent = "You must agree to terms";
    isValid = false;
  }

  if (isValid) {
    form.style.opacity = "0";
    setTimeout(() => {
      form.style.display = "none";
      successMessage.style.display = "block";

      setTimeout(() => {
        form.reset();
        successMessage.style.display = "none";
        form.style.display = "block";
        form.style.opacity = "1";
      }, 5000);
    }, 500);
  }
});

const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");
const newsletterError = document.querySelector(".newsletter-error");

newsletterForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const emailValue = newsletterEmail.value.trim();
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!pattern.test(emailValue)) {
    newsletterError.textContent = "Please enter a valid email address";
    newsletterEmail.style.border = "1px solid #dc3545";
  } else {
    newsletterError.textContent = "";
    newsletterEmail.style.border = "none";
    newsletterEmail.value = "";
    alert("Subscribed successfully!");
  }
});

const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show button after 300px scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

// Smooth scroll to top (800ms)
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
