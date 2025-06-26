document.addEventListener('DOMContentLoaded', function() {
    // --- Hamburger Menu Toggle ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active'); // For animating the hamburger icon
        document.body.classList.toggle('no-scroll'); // Optional: Prevent scrolling when mobile menu is open
    });

    // Close nav when a nav link is clicked (for better UX on mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) { // Only if mobile menu is open
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // --- Smooth Scroll for "Register Now!" button in Hero Section ---
    const scrollToRegisterBtn = document.querySelector('.scroll-to-register');
    if (scrollToRegisterBtn) {
        scrollToRegisterBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor link behavior
            const targetId = this.getAttribute('href'); // Get the target section ID (e.g., "#register")
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Scroll smoothly to the target section
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // --- Registration Form Submission Handling ---
    const registrationForm = document.querySelector('.registration-form');
    const formMessage = document.getElementById('form-message');

    if (registrationForm && formMessage) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission (page reload)

            // Basic form validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const ticketTypeSelect = document.getElementById('ticket-type');

            if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || ticketTypeSelect.value === '') {
                displayFormMessage('Please fill in all required fields (Name, Email, Ticket Type).', 'error');
                return; // Stop the function if validation fails
            }

            // Simulate form submission (e.g., sending data to a server)
            // In a real application, you would send this data using Fetch API or XMLHttpRequest
            // Example: fetch('/api/register', { method: 'POST', body: new FormData(this) })
            // .then(response => response.json())
            // .then(data => { /* handle response */ })
            // .catch(error => { /* handle error */ });

            displayFormMessage('Thank you for registering for FutureFest 2025! A confirmation email has been sent.', 'success');

            // Clear the form after a short delay for user to read the message
            setTimeout(() => {
                registrationForm.reset(); // Resets all form fields
                formMessage.style.display = 'none'; // Hide message after reset
            }, 3000); // Hide after 3 seconds
        });
    }

    function displayFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message'; // Reset classes
        formMessage.classList.add(type); // Add success or error class
        formMessage.style.display = 'block'; // Make it visible

        // Optional: Hide the message after a few seconds if it's a success
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000); // Hide success message after 5 seconds
        }
    }

    // --- Smooth scroll for other internal navigation links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Exclude the hero button as it has a specific listener
        // and the cta-nav-button as it is handled by hamburger menu close
        if (!anchor.classList.contains('scroll-to-register') && !anchor.classList.contains('cta-nav-button')) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    });

});
