// Confirm site loaded
console.log("Got Big Melons site loaded! 🍉");

/* =========================
   Random Fact Generator
========================= */

const facts = [
  "Watermelons are 90% water.",
  "They were first grown in Africa.",
  "The largest watermelon weighed over 350 pounds.",
  "Watermelons can be yellow, orange, or even white.",
  "Every part of a watermelon is edible.",
  "Watermelon is both a fruit and a vegetable.",
  // New facts
  "Watermelons belong to the cucumber family.",
  "China produces more watermelons than any other country.",
  "Watermelon rind can be pickled and eaten.",
  "There are over 1,200 varieties of watermelon.",
  "Seedless watermelons are actually not completely seed-free.",
  "Watermelons have been cultivated for over 5,000 years.",
  "Ancient Egyptians placed watermelons in tombs of kings.",
  "Watermelon juice is very hydrating on hot days.",
  "The rind is rich in nutrients like fiber and vitamin C.",
  "Watermelon seeds can be roasted and eaten as a snack.",
  "Watermelons can grow in many different shapes and sizes.",
  "Some watermelons are bred to be square.",
  "Square watermelons are popular in Japan.",
  "Watermelon is a berry, botanically speaking.",
  "The scientific name for watermelon is Citrullus lanatus.",
  "Watermelons grow on vines that spread across the ground.",
  "They need warm temperatures to grow properly.",
  "Watermelons are usually harvested in summer.",
  "A ripe watermelon often sounds hollow when tapped.",
  "The yellow spot on a watermelon shows where it sat on the ground.",
  "Watermelon juice can be used in smoothies and drinks.",
  "Some people grill watermelon for a smoky flavor.",
  "Watermelon is low in calories but high in vitamins.",
  "It contains vitamins A, B6, and C.",
  "Watermelon can help keep you hydrated.",
  "The flesh is mostly water and natural sugars.",
  "Watermelons can weigh anywhere from 2 to over 50 pounds.",
  "Mini watermelons are great for small households.",
  "Icebox watermelons are small enough to fit in a fridge.",
  "The red color comes from lycopene, an antioxidant.",
  "Lycopene is also found in tomatoes.",
  "Watermelon is often used in fruit salads.",
  "Watermelon festivals are held around the world.",
  "Some competitions involve seed-spitting contests.",
  "The longest watermelon seed spit was over 75 feet.",
  "Watermelons can be grown in home gardens.",
  "They require plenty of sunlight and space.",
  "Watermelon flowers are yellow and bloom on the vine.",
  "Bees help pollinate watermelon plants.",
  "Without pollination, fruit will not develop properly.",
  "Watermelon can be blended into refreshing drinks.",
  "Frozen watermelon can be used as a healthy dessert.",
  "Watermelon pairs well with mint and lime.",
  "Some varieties have striped green skin.",
  "Others have solid dark green skin.",
  "Watermelon can be carved into decorative shapes.",
  "It is a popular fruit at picnics and barbecues.",
  "Watermelon is naturally fat-free.",
  "It has a sweet, refreshing taste loved worldwide."
];

function showRandomFact() {
  const randomIndex = Math.floor(Math.random() * facts.length);
  const factElement = document.getElementById("random-fact");
  const imageElement = document.getElementById("random-image");

  // Update fact
  if (factElement) {
    factElement.textContent = facts[randomIndex];
  }

  // Update image (NOW using .jpeg)
  if (imageElement) {
    const imageIndex = Math.floor(Math.random() * 6) + 1;
    imageElement.src = `images/gallery${imageIndex}.jpeg`;
  }
}

/* =========================
   Simple Form Feedback
========================= */

const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    formMessage.textContent = "❌ Please fill out all fields.";
    formMessage.className = "error-message";

    setTimeout(() => {
      formMessage.textContent = "";
      formMessage.className = "";
    }, 5000);

    return;
  }

  formMessage.textContent = "✅ Thanks for your message! 🍉";
  formMessage.className = "success-message";
  formMessage.style.opacity = "1";

  setTimeout(() => {
    form.reset();
    formMessage.textContent = "";
    formMessage.className = "";
    formMessage.style.opacity = "";
  }, 5000);
}

if (form) {
  form.addEventListener("reset", () => {
    formMessage.textContent = "";
    formMessage.className = "";
    formMessage.style.opacity = "";
  });
}

/* =========================
   Gallery Slideshow
========================= */

const galleryImages = [
  "images/gallery1.jpeg",
  "images/gallery2.jpeg",
  "images/gallery3.jpeg",
  "images/gallery4.jpeg",
  "images/gallery5.jpeg",
  "images/gallery6.jpeg"
];

let currentImageIndex = 0;

function updateImage() {
  const galleryImage = document.getElementById("gallery-image");
  if (galleryImage) {
    galleryImage.src = galleryImages[currentImageIndex];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      updateImage();
    });

    prevBtn.addEventListener("click", () => {
      currentImageIndex =
        (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      updateImage();
    });
  }
});

/* =========================
   Variety Filter
========================= */
function showMelonInfo(type) {
  const info = document.getElementById("melon-info");

  const melonDetails = {
    seeded:
      "Seeded watermelons have a classic, rich flavor and contain black seeds.",
    seedless:
      "Seedless watermelons are easier to eat and are very popular today.",
    yellow: "Yellow watermelons are sweeter and have a honey-like flavor.",
    orange: "Orange watermelons have a tropical taste and are less common.",
    icebox: "Icebox watermelons are small and perfect for personal servings."
  };

  if (info && melonDetails[type]) {
    info.textContent = melonDetails[type];
  }
}

/* =========================
   Page Event Listeners
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const factBtn = document.getElementById("fact-btn");

  if (factBtn) {
    factBtn.addEventListener("click", showRandomFact);
  }

  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("mouseover", () => {
      link.style.opacity = "0.7";
    });

    link.addEventListener("mouseout", () => {
      link.style.opacity = "1";
    });
  });
});
