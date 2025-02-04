const popups = document.querySelectorAll('.popup-advert');
//const delayOnLoad = 10000; // 10 seconds initial delay
const displayTime = 5000; // Each advert shows for 5 seconds
let popupQueue = Array.from(popups); // Queue of popups

// Function to shuffle adverts randomly
function shuffleAdverts() {
    popupQueue.sort(() => Math.random() - 0.5);
}

// Function to generate random delay (between 15 and 45 seconds)
function getRandomDelay() {
    return Math.floor(Math.random() * (60000 - 40000 + 1)) + 45000; //(45000 - 15000 + 1)) + 15000; // Random delay between 15s and 45s
}


// Function to show a popup
function showPopup(popup) {
    if (!popup) {
        console.warn('Popup is null or undefined:', popup);
        return;
    }

    const popupContent = popup.querySelector('.popup-content');
    if (!popupContent) {
        console.warn('Popup content is missing for:', popup);
        return;
    }

    const bgImage = popupContent.getAttribute('data-bg');
    if (bgImage) {
        popupContent.style.background = `url('${bgImage}') no-repeat center center`;
        popupContent.style.backgroundSize = 'cover';
    }

    popup.style.visibility = 'visible';
    popup.style.opacity = '1';

    const progressBar = popup.querySelector('.progress');
    if (progressBar) {
        progressBar.style.width = '100%';

        let remainingTime = displayTime;
        const interval = 100; // Update every 100ms
        const timer = setInterval(() => {
            remainingTime -= interval;
            progressBar.style.width = `${(remainingTime / displayTime) * 100}%`;

            if (remainingTime <= 0) {
                clearInterval(timer);
                hidePopup(popup);
            }
        }, interval);
    }
}

// Function to hide a popup
function hidePopup(popup) {
    popup.style.opacity = '0';
    popup.style.visibility = 'hidden';

    popupQueue.push(popupQueue.shift()); // Move to end of queue

    if (popupQueue.length > 0) {
        setTimeout(() => {
            showPopup(popupQueue[0]);
        }, getRandomDelay());
    }
}

// Close button functionality
popups.forEach(popup => {
    const closeBtn = popup.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => hidePopup(popup));
});

// Start the advert cycle
setTimeout(async () => {
    await filterAdvertsByLocation();
    shuffleAdverts();

    if (popupQueue.length > 0) {
        showPopup(popupQueue[0]);
    } else {
        console.log('No adverts to display based on user location.');
    }
}, delayOnLoad);
