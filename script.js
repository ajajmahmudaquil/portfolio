// Page Navigation System
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.page-section');
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.getElementById('navLinks');

// Function to show specific page
function showPage(pageName) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(pageName);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Re-trigger fade-in animations
        const fadeElements = targetSection.querySelectorAll('.fade-in');
        fadeElements.forEach((el, index) => {
            el.classList.remove('visible');
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        });
    }
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });
}

// Add click event to all nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = link.getAttribute('data-page');
        showPage(pageName);
        
        // Close mobile menu if open
        navLinksContainer.classList.remove('active');
    });
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

// Logo click - go to About page
document.querySelector('.logo').addEventListener('click', () => {
    showPage('about');
    navLinksContainer.classList.remove('active');
});

// Initialize - Show About page and trigger animations
window.addEventListener('load', () => {
    showPage('about');
    
    // Trigger initial animations
    setTimeout(() => {
        const initialFadeElements = document.querySelectorAll('#about .fade-in');
        initialFadeElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        });
    }, 100);
});

// Intersection Observer for fade-in animations when switching pages
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});