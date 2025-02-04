document.getElementById("searchForm").addEventListener("submit", function(event) {
    // Prevent form submission if fields are empty
    const locationValue = document.getElementById("location").value.trim();
    const queryValue = document.getElementById("query").value.trim();

    // Hide error message initially
    document.getElementById("error-message").style.display = "none";

    // Check if both fields are empty
    if (!locationValue || !queryValue) {
        event.preventDefault(); // Prevent form submission
        document.getElementById("error-message").style.display = "block"; // Show error message
    } else {
        // Show results page after search
        document.getElementById("resultsPage").style.display = "block";
        const resultsTitle = document.getElementById("resultsTitle");
        const resultsSubtitle = document.getElementById("resultsSubtitle");

        // Filter businesses based on location and category
        const filteredBusinesses = businesses.filter(business => {
            const isLocationValid = business.location.toLowerCase() === locationValue.toLowerCase();
            const isCategoryValid = business.category.toLowerCase().includes(queryValue.toLowerCase());
            return isLocationValid && isCategoryValid;
        });

        // Show the results in the grid
        const resultsGrid = document.getElementById("results");
        resultsGrid.innerHTML = ''; // Clear previous results

        if (filteredBusinesses.length > 0) {
            filteredBusinesses.forEach(business => {
                const businessDiv = document.createElement('div');
                businessDiv.classList.add('business');
                
                businessDiv.innerHTML = `
                    <img src="${business.logo}" alt="${business.name}">
                    <h3>${business.name} ${business.verified ? '<span class="verified-icon">✔</span>' : ''}</h3>
                    <p>${business.description}</p>
                    <div class="actions">
                        <button onclick="window.open('${business.mapLink}', '_blank')">View on Map</button>
                        <button onclick="window.location.href='mailto:${business.email}'">Contact</button>
                    </div>
                    <div class="report" onclick="alert('Report feature coming soon!')">Report</div>
                `;
                
                resultsGrid.appendChild(businessDiv);
            });
        } else {
            resultsGrid.innerHTML = `<p>No businesses found matching your search criteria.</p>`;
        }
    }
});