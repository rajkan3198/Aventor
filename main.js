// Carousel component
function carousel() {
  return {
    current: 0,
    slides: [
      { image: 'banner1.jpg', caption: 'Quality Tools for Every Job' },
      { image: 'banner2.jpg', caption: 'Reliable & Affordable' },
      { image: 'banner3.jpg', caption: 'Supporting Indian Farmers' }
    ],
    next() { this.current = (this.current + 1) % this.slides.length; },
    prev() { this.current = (this.current - 1 + this.slides.length) % this.slides.length; },
    init() { setInterval(() => this.next(), 5000); }
  }
}

// Product & search component (Firestore-backed)
function productPage() {
  return {
    products: [],
    filteredProducts: [],
    async init() {
      try {
        const snap = await db.collection('products').get();
        this.products = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        this.filteredProducts = this.products;
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    },
    search(event) {
      const q = event.target.value.toLowerCase();
      this.filteredProducts = this.products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
  }
}

// Inquiry form handler
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('inquiryForm');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const data = {
        name:      form.name.value,
        email:     form.email.value,
        message:   form.message.value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      };
      try {
        await db.collection('inquiries').add(data);
        alert('Inquiry submitted! We’ll get back to you soon.');
        form.reset();
      } catch (err) {
        console.error(err);
        alert('Oops, something went wrong. Please try again.');
      }
    });
  }
});

// Authentication functions
window.registerUser = async function() {
  const email = document.getElementById('signup-email').value;
  const pw    = document.getElementById('signup-password').value;
  try {
    await auth.createUserWithEmailAndPassword(email, pw);
    alert('Account created! Redirecting…');
    window.location = 'index.html';
  } catch (err) {
    alert(err.message);
  }
}

window.loginUser = async function() {
  const email = document.getElementById('login-email').value;
  const pw    = document.getElementById('login-password').value;
  try {
    await auth.signInWithEmailAndPassword(email, pw);
    alert('Welcome back! Redirecting…');
    window.location = 'index.html';
  } catch (err) {
    alert(err.message);
  }
}

window.logoutUser = function() {
  auth.signOut();
  alert('Signed out');
  window.location = 'index.html';
}

// Alpine.js initialization
document.addEventListener('alpine:init', () => {
  Alpine.data('carousel',    carousel);
  Alpine.data('productPage', productPage);
});
