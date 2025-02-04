const addBusinessBtn = document.getElementById('addBusinessBtn');
const addBusinessFormContainer = document.getElementById('addBusinessFormContainer');
const closeFormBtn = document.querySelector('.close-form-btn');

// Show form when the button is clicked
addBusinessBtn.addEventListener('click', () => {
    addBusinessFormContainer.style.display = 'flex'; // Show the form
});

// Close form when the close button is clicked
closeFormBtn.addEventListener('click', () => {
    addBusinessFormContainer.style.display = 'none'; // Hide the form
});

// Close the form when clicking outside the form content
addBusinessFormContainer.addEventListener('click', (e) => {
    if (e.target === addBusinessFormContainer) {
        addBusinessFormContainer.style.display = 'none'; // Hide the form
    }
});
