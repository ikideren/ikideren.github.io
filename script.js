// 1. Navbar Scrolled Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Typing Effect untuk Hero Section
const words = ["AI Models", "Web Applications", "Computer Vision", "Cool Things"];
let i = 0;
let j = 0;
let isDeleting = false;
let typeSpeed = 100;
const typewriterElement = document.getElementById('typewriter');

function type() {
    typewriterElement.innerHTML = words[i].substring(0, j);
    
    if (isDeleting) {
        j--;
        typeSpeed = 50; // Lebih cepat pas ngehapus
    } else {
        j++;
        typeSpeed = 150;
    }

    if (!isDeleting && j === words[i].length) {
        typeSpeed = 2000; // Jeda sebelum hapus
        isDeleting = true;
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
        typeSpeed = 500; // Jeda sebelum ngetik kata baru
    }
    setTimeout(type, typeSpeed);
}
// Mulai typing effect
document.addEventListener('DOMContentLoaded', () => setTimeout(type, 1000));

// 3. Scroll Reveal Animation (Intersection Observer)
const hiddenElements = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Animasi cuma jalan sekali pas di-scroll ke bawah
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

hiddenElements.forEach((el) => observer.observe(el));