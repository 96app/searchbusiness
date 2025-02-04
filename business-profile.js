const businesses = [
    {
        logo: '/images/business-logos/96_studios_logo.png',
        name: '96 Studios',
        category: 'Art Studio',
        location: 'Polokwane',
        areas: ['Sebayeng', 'Solomondale'], // Add areas here
        phone: '0817925033',
        email: '96studios.mails@Gmail.com',
        googleMapsEmbedLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.227635923133!2d29.696500675461262!3d-23.774906969472553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ec6c78ba089f6b5%3A0x28ab91810f8ba04e!2s96%20studios!5e0!3m2!1sen!2sza!4v1738679292983!5m2!1sen!2sza',
        mapLink: 'https://maps.app.goo.gl/ngzN39p2EXzgYB7Q9',
        description: 'We are Graphic Design based studio, offering creative designs, including website design. <br> <br> More..<br> Computer and Software maintenance.',
        verified: true
    },
    {
        logo: '/images/business-logos/96_studios_logo.png',
        name: '96 Studios',
        category: 'Computer Repair',
        location: 'Polokwane',
        areas: ['Sebayeng', 'Solomondale'], // Add areas here
        phone: '0817925033',
        email: '96studios.mails@Gmail.com',
        googleMapsEmbedLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.227635923133!2d29.696500675461262!3d-23.774906969472553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ec6c78ba089f6b5%3A0x28ab91810f8ba04e!2s96%20studios!5e0!3m2!1sen!2sza!4v1738679292983!5m2!1sen!2sza',
        mapLink: 'https://maps.app.goo.gl/ngzN39p2EXzgYB7Q9',
        description: 'We are Graphic Design based studio, offering creative designs, including website design. <br> <br> More..<br> Computer and Software maintenance.',
        verified: true
    },
    {
        logo: '/images/business-logos/96_studios_logo.png',
        name: '96 Studios',
        category: 'Graphic designer',
        location: 'Polokwane',
        areas: ['Sebayeng', 'Solomondale'], // Add areas here
        phone: '0817925033',
        email: '96studios.mails@Gmail.com',
        googleMapsEmbedLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.227635923133!2d29.696500675461262!3d-23.774906969472553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ec6c78ba089f6b5%3A0x28ab91810f8ba04e!2s96%20studios!5e0!3m2!1sen!2sza!4v1738679292983!5m2!1sen!2sza',
        mapLink: 'https://maps.app.goo.gl/ngzN39p2EXzgYB7Q9',
        description: 'We are Graphic Design based studio, offering creative designs, including website design. <br> <br> More..<br> Computer and Software maintenance.',
        verified: true
    }
];


const validLocations = ['Polokwane', 'Solomondale', 'Sebayeng']; // Add Location / Area here Again
const validCategories = ['Art Studio', 'IT Services', 'Consulting', 'Restaurant', 'Art'];

// Input and ghost text elements
const locationInput = document.getElementById('location');
const ghostText = document.getElementById('ghostText');
const queryInput = document.getElementById('query');
const queryGhostText = document.getElementById('queryGhostText');

// Autocomplete handler function
function handleInput(inputElement, ghostElement, suggestions) {
inputElement.addEventListener('input', function () {
const typedValue = inputElement.value;

if (!typedValue) {
    ghostElement.textContent = ''; // Clear ghost text
    return;
}

// Find the first suggestion that matches
const match = suggestions.find(item =>
    item.toLowerCase().startsWith(typedValue.toLowerCase())
);

if (match) {
    const remainingPart = match.slice(typedValue.length);
    ghostElement.textContent = typedValue + remainingPart; // Show suggestion
} else {
    ghostElement.textContent = ''; // No match
}
});

inputElement.addEventListener('keydown', function (e) {
const typedValue = inputElement.value;
const suggestion = ghostElement.textContent;

if ((e.key === 'ArrowRight' || e.key === 'Tab') && suggestion.startsWith(typedValue)) {
    e.preventDefault(); // Prevent default behavior
    inputElement.value = suggestion; // Auto-complete input
    ghostElement.textContent = ''; // Clear ghost text
}
});
}

// Apply the handler to both inputs
handleInput(locationInput, ghostText, validLocations);
handleInput(queryInput, queryGhostText, validCategories);

// Fuzzy matching function (Levenshtein Distance)
function getLevenshteinDistance(a, b) {
    const tmp = [];
    let i, j, alen = a.length, blen = b.length, cost;
    if (alen === 0) { return blen; }
    if (blen === 0) { return alen; }
    for (i = 0; i <= alen; i++) { tmp[i] = [i]; }
    for (j = 0; j <= blen; j++) { tmp[0][j] = j; }
    for (i = 1; i <= alen; i++) {
        for (j = 1; j <= blen; j++) {
            cost = a[i - 1] === b[j - 1] ? 0 : 1;
            tmp[i][j] = Math.min(tmp[i - 1][j] + 1, tmp[i][j - 1] + 1, tmp[i - 1][j - 1] + cost);
        }
    }
    return tmp[alen][blen];
}

function getBestMatch(input, validItems) {
    return validItems.reduce((bestMatch, current) => {
        const distance = getLevenshteinDistance(input.toLowerCase(), current.toLowerCase());
        if (distance < bestMatch.distance) {
            bestMatch.match = current;
            bestMatch.distance = distance;
        }
        return bestMatch;
    }, { match: null, distance: Infinity }).match;
}

// Show suggestions based on fuzzy match
function showSuggestions(inputId, suggestions) {
    const suggestionBox = document.getElementById(`${inputId}Suggestions`);
    suggestionBox.innerHTML = '';
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.textContent = suggestion;
        div.onclick = function () {
            document.getElementById(inputId).value = suggestion;
            suggestionBox.style.display = 'none';
        };
        suggestionBox.appendChild(div);
    });
    suggestionBox.style.display = suggestions.length > 0 ? 'block' : 'none';
}

// Handle input events for auto-correction
document.getElementById('location').addEventListener('input', function () {
    const locationInput = this.value.trim();
    if (locationInput) {
        const bestMatch = getBestMatch(locationInput, validLocations);
        if (bestMatch !== locationInput) {
            showSuggestions('location', [bestMatch]);
        } else {
            document.getElementById('locationSuggestions').style.display = 'none';
        }
    } else {
        document.getElementById('locationSuggestions').style.display = 'none';
    }
});

// Handle Arrow Right or Tab to accept the suggestion
locationInput.addEventListener('keydown', function (e) {
const typedValue = locationInput.value;
const suggestion = ghostText.textContent;

if ((e.key === 'ArrowRight' || e.key === 'Tab') && suggestion.startsWith(typedValue)) {
e.preventDefault(); // Prevent default behavior
locationInput.value = suggestion; // Complete the input with the suggestion
ghostText.textContent = ''; // Clear grey text
}
});

document.getElementById('query').addEventListener('input', function () {
    const queryInput = this.value.trim();
    if (queryInput) {
        const bestMatch = getBestMatch(queryInput, validCategories);
        if (bestMatch !== queryInput) {
            showSuggestions('query', [bestMatch]);
        } else {
            document.getElementById('querySuggestions').style.display = 'none';
        }
    } else {
        document.getElementById('querySuggestions').style.display = 'none';
    }
});

// Handle form submission
document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const locationInput = document.getElementById('location').value.trim();
    const queryInput = document.getElementById('query').value.trim();

// Validate location input
const validLocationsAndAreas = [...validLocations, ...businesses.flatMap(business => business.areas)];

if (!validLocationsAndAreas.some(item => item.toLowerCase() === locationInput.toLowerCase())) {
    alert('Invalid location or area.');
    return;
}

// Filter businesses
const matches = businesses.filter(business =>
    (business.location.toLowerCase() === locationInput.toLowerCase() || 
     business.areas.some(area => area.toLowerCase() === locationInput.toLowerCase())) &&
    (business.category.toLowerCase() === queryInput.toLowerCase() ||
     business.name.toLowerCase() === queryInput.toLowerCase())
);



    if (matches.length > 0) {
        displayResultsPage(matches, locationInput, queryInput);
    } else {
        alert('No matches found.');
    }
});

function displayResultsPage(matches, location, query) {
const resultsPage = document.getElementById('resultsPage');
const resultsContainer = document.getElementById('results');

document.getElementById('resultsTitle').textContent = `Results for "${location}"`;
document.getElementById('resultsSubtitle').textContent = `Query: ${query}`;
resultsContainer.innerHTML = '';

matches.forEach(business => {
const businessElement = document.createElement('div');
businessElement.className = 'business';
businessElement.innerHTML = `
    <img src="${business.logo}" alt="${business.name} logo">
    <h3>${business.name}
        ${business.verified ? '<img class="verified-icon" src="verified.png" alt="Verified">' : ''}
    </h3>
    <p>${business.description}</p>
    <div class="actions">
        <button onclick="callBusiness('${business.phone}')">Call</button>
        <button onclick="sendEmail('${business.email}')">Send Email</button>
    </div>
    <iframe
        src="${business.googleMapsEmbedLink}"
        width="100%"
        height="200"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
    </iframe>
    <div class="map-actions">
        <span class="report" onclick="toggleReportForm()" >Report</span>
        <a href="${business.mapLink}" target="_blank" class="view-map">View Larger Map</a>
    </div>

<!-- Hidden Report Form -->
<form id="reportForm" class="report-form" style="display: none;" action="https://formsubmit.co/c40e7b48e88f8c4a77b332410fe21c5c" method="POST">
    <label for="businessName">Business Name:</label>
    <input type="text" id="businessName" name="Business Name" placeholder="Enter business name" required>

    <label for="reportReason">Select a reason:</label>
    <select id="reportReason" name="Report Reason" required>
        <option value="Scam or Fraud">Scam or Fraud</option>
        <option value="Fake Business or Spam">Fake Business or Spam</option>
        <option value="Closed Business">Closed Business</option>
        <option value="Policy Violation">Policy Violation</option>
    </select>

    <!-- Hidden field for redirecting after submission -->
    <input type="hidden" name="_next" value="http://127.0.0.1:5503/index.html">

    <button type="submit">Submit</button>
</form>

<style>
.map-actions {
    margin-top: 10px;
}

.report {
    color: red;
    cursor: pointer;
    text-decoration: underline;
}

.report-form {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    width: 220px;
    background: #f9f9f9;
    display: flex;
    flex-direction: column;
}

.report-form label {
    font-weight: bold;
    margin-top: 5px;
}

.report-form input, .report-form select {
    margin-bottom: 10px;
    padding: 5px;
}

.report-form button {
    background-color: red;
    color: white;
    border: none;
    padding: 8px;
    cursor: pointer;
}

.report-form button:hover {
    background-color: darkred;
}
</style>
`;
resultsContainer.appendChild(businessElement);
});

document.querySelector('.search-container').style.display = 'none';
resultsPage.style.display = 'block';
}

function sendEmail(email) {
window.location.href = `mailto:${email}`;
}

document.getElementById('backButton').addEventListener('click', function () {
    // Hide the results page
    document.getElementById('resultsPage').style.display = 'none';

    // Show the search form container
    document.querySelector('.search-container').style.display = 'block';

    // Optionally clear the results
    document.getElementById('results').innerHTML = '';
    document.getElementById('resultsTitle').textContent = '';
    document.getElementById('resultsSubtitle').textContent = '';
});



function toggleReportForm() {
    var form = document.getElementById("reportForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

function submitReport() {
    var businessName = document.getElementById("businessName").value.trim();
    var reason = document.getElementById("reportReason").value;

    if (businessName === "") {
        alert("Please enter the business name.");
        return;
    }

    alert("Report submitted:\nBusiness: " + businessName + "\nReason: " + reason);
    document.getElementById("reportForm").style.display = "none";
}