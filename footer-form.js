// Select elements
const footerImage = document.querySelector('.footer-img'); // Update the selector for the footer image
const contactForm = document.getElementById('contactForm');
const closeForm = document.getElementById('closeContactForm'); // Updated ID for close button

// Open form on image click
footerImage.addEventListener('click', () => {
    contactForm.classList.add('show');
});

// Close form on close button click
closeForm.addEventListener('click', () => {
    contactForm.classList.remove('show');
});

// Optional: Close form when clicking outside the modal content
contactForm.addEventListener('click', (e) => {
    if (e.target === contactForm) {
        contactForm.classList.remove('show');
    }
});
