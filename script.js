// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Smooth Scrolling
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                document.querySelector('.nav-links')?.classList.remove('active');
            }
        });
    });

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Menu Dropdown Toggle
function toggleMenu(header) {
    const menuItem = header.parentElement;
    const isActive = menuItem.classList.contains('active');
    
    // Close all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't already open
    if (!isActive) {
        menuItem.classList.add('active');
    }
}

// Form Submission Handler
function handleFormSubmit(e, formType) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    console.log(`${formType} Form submitted:`, data);
    
    // Show success message
    alert(`Thank you for your ${formType.toLowerCase()} enquiry! We'll get back to you within 24-48 hours. Please also DM us on Instagram @mkmoments for the fastest response.`);
    
    // Reset form
    e.target.reset();
}

// Gallery Filter (for gallery page)
function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-grid-item');
    const buttons = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Add/remove filtered class for mobile layout
    if (category === 'all') {
        galleryGrid.classList.remove('filtered');
    } else {
        galleryGrid.classList.add('filtered');
    }
    
    // Filter items
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            setTimeout(() => item.style.opacity = '1', 10);
        } else {
            item.style.opacity = '0';
            setTimeout(() => item.style.display = 'none', 300);
        }
    });
}

// Image Modal for Gallery
function openImageModal(imgSrc) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeImageModal()"></div>
        <div class="modal-content">
            <span class="modal-close" onclick="closeImageModal()">&times;</span>
            <img src="${imgSrc}" alt="Gallery Image">
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, observerOptions);

// Observe elements on page load
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.service-card, .about-content, .menu-item');
    elements.forEach(el => observer.observe(el));
});
