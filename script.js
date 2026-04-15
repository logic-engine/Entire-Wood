// PRELOADER
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => { preloader.style.opacity = '0'; setTimeout(() => preloader.remove(), 500); }, 800);
});

// STICKY NAVBAR + SMOOTH SCROLL
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) nav.style.background = 'rgba(0,0,0,0.85)';
  else nav.style.background = '';
});
document.querySelectorAll('.nav-link').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('navLinks').classList.remove('active');
  });
});

// HAMBURGER
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('active');
});

// DARK MODE TOGGLE
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const icon = themeToggle.querySelector('i');
  if (document.body.classList.contains('dark')) icon.classList.replace('fa-moon', 'fa-sun');
  else icon.classList.replace('fa-sun', 'fa-moon');
});

// PRODUCT DATA (placeholder images)
const products = [
  { name: "Velvet Chesterfield Sofa", category: "Sofas", price: "₨ 89,999", material: "Solid Sheesham + Velvet", img: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&w=400", desc: "Elegant handcrafted sofa." },
  { name: "Rustic King Bed", category: "Beds", price: "₨ 1,29,999", material: "Oak Wood", img: "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&w=400", desc: "Spacious with storage." },
  { name: "Extendable Dining Set", category: "Dining Sets", price: "₨ 1,49,999", material: "Teak Wood", img: "https://images.pexels.com/photos/3757055/pexels-photo-3757055.jpeg?auto=compress&w=400", desc: "Seats 8-10 persons." },
  { name: "Sliding Wardrobe", category: "Wardrobes", price: "₨ 1,19,999", material: "Engineered Wood", img: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&w=400", desc: "Mirror finish, ample space." },
  { name: "Custom Bookcase", category: "Custom Designs", price: "Custom Quote", material: "Premium Ply", img: "https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&w=400", desc: "Tailored to your wall." },
  { name: "Modern L-Shaped Sofa", category: "Sofas", price: "₨ 1,45,000", material: "Leather + Wood", img: "https://images.pexels.com/photos/1248583/pexels-photo-1248583.jpeg?auto=compress&w=400", desc: "Corner piece luxury." }
];

function renderProducts(filter = "all") {
  const grid = document.getElementById('productsGrid');
  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-name="${p.name}" data-price="${p.price}" data-material="${p.material}" data-desc="${p.desc}" data-img="${p.img}">
      <div class="product-img" style="background-image: url('${p.img}');"></div>
      <div class="product-info"><h3>${p.name}</h3><p>${p.material}</p><div class="product-price">${p.price}</div></div>
    </div>
  `).join('');
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const modal = document.getElementById('productModal');
      document.getElementById('modalBody').innerHTML = `<h2>${card.dataset.name}</h2><img src="${card.dataset.img}" width="100%"><p><strong>Material:</strong> ${card.dataset.material}</p><p><strong>Price:</strong> ${card.dataset.price}</p><p>${card.dataset.desc}</p>`;
      modal.style.display = 'flex';
    });
  });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});
renderProducts();

// MODAL CLOSE
document.querySelector('.close-modal').addEventListener('click', () => document.getElementById('productModal').style.display = 'none');
window.onclick = (e) => { if (e.target === document.getElementById('productModal')) document.getElementById('productModal').style.display = 'none'; };

// CUSTOM ORDER VIA WHATSAPP
document.getElementById('customFurnitureForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('custName').value;
  const phone = document.getElementById('custPhone').value;
  const type = document.getElementById('furnitureType').value;
  const size = document.getElementById('size').value;
  const desc = document.getElementById('description').value;
  const message = `Hello Entirewood! I need a custom furniture order.%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Type:* ${type}%0A*Size:* ${size}%0A*Details:* ${desc}`;
  window.open(`https://wa.me/923063228989?text=${message}`, '_blank');
});

// TESTIMONIAL SLIDER
let currentIdx = 0;
const sliderContainer = document.getElementById('sliderContainer');
const slides = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
function updateSlider() {
  sliderContainer.style.transform = `translateX(-${currentIdx * 100}%)`;
}
nextBtn.addEventListener('click', () => { currentIdx = (currentIdx + 1) % slides.length; updateSlider(); });
prevBtn.addEventListener('click', () => { currentIdx = (currentIdx - 1 + slides.length) % slides.length; updateSlider(); });

// SCROLL ANIMATIONS (fade-up, fade-left etc)
const faders = document.querySelectorAll('.fade-up, .fade-right, .fade-left');
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('appear'); });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `.fade-up, .fade-right, .fade-left { opacity: 0; transform: translateY(30px); transition: all 0.8s ease; } .fade-right { transform: translateX(-40px); } .fade-left { transform: translateX(40px); } .appear { opacity: 1; transform: translate(0,0); } .delay-1 { transition-delay: 0.1s; } .delay-2 { transition-delay: 0.2s; } .delay-3 { transition-delay: 0.3s; }`;
document.head.appendChild(style);
