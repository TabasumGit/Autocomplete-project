
let selectedSuggestion = ''; // Variable to store the selected suggestion

document.getElementById('autocomplete-input').addEventListener('input', showSuggestions);

function showSuggestions() {
    const input = document.getElementById('autocomplete-input');
    const suggestionsContainer = document.getElementById('suggestions');
    const value = input.value;

    if (value.length > 0) {
        fetch(`/autocomplete?prefix=${value}`)
            .then(response => response.json())
            .then(data => {
                suggestionsContainer.innerHTML = ''; // Clear previous suggestions
                const suggestions = [...data.names, ...data.albums, ...data.songs]; // Combine suggestions

                suggestions.forEach(suggestion => {
                    const div = document.createElement('div');
                    div.textContent = suggestion;
                    div.onclick = () => selectSuggestion(suggestion); // Store selected suggestion
                    suggestionsContainer.appendChild(div);
                });

                suggestionsContainer.style.display = suggestions.length ? 'block' : 'none'; // Show/hide suggestions
            })
            .catch(err => console.error('Error fetching suggestions:', err));
    } else {
        suggestionsContainer.style.display = 'none'; // Hide suggestions if input is empty
    }
}

// Store the selected suggestion
function selectSuggestion(suggestion) {
    selectedSuggestion = suggestion; // Store selected value
    document.getElementById('autocomplete-input').value = suggestion; // Update input field
    document.getElementById('suggestions').style.display = 'none'; // Hide suggestions
}

// Redirect to search results page when the search button is clicked
function searchFunction() {
    if (selectedSuggestion) {
        const searchQuery = encodeURIComponent(selectedSuggestion); // Encode the selected value for URL
        window.location.href = `searchresult.html?query=${searchQuery}`; // Redirect to search results page
    } else {
        alert('Please select a suggestion before searching.');
    }
}
