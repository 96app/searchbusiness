// Select the elements
const googleIconBtn = document.getElementById('googleIconBtn'); // Google icon button
const businessBtnsContainer = document.getElementById('businessBtnsContainer'); // Business buttons container

// Show or hide the buttons container when the Google icon button is clicked
googleIconBtn.addEventListener('click', () => {
    // Toggle the visibility of the business buttons container
    businessBtnsContainer.classList.toggle('show');
});
