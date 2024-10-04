
const inputField = document.getElementById('autocomplete-input');
const suggestionsContainer = document.getElementById('suggestions');
const resultsContainer = document.getElementById('results');

inputField.addEventListener('input', function() {
    const prefix = inputField.value;

    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';
    resultsContainer.style.display = 'none'; // Hide results initially

    if (prefix.length > 0) {
        fetch(`http://127.0.0.1:5000/autocomplete?prefix=${prefix}`)
            .then(response => response.json())
            .then(data => {
                const allSuggestions = [
                    ...data.names.map(name => ({ text: name, type: 'Artist' })),
                    ...data.albums.map(album => ({ text: album, type: 'Album' })),
                    ...data.songs.map(song => ({ text: song, type: 'Song' }))
                ];

                if (allSuggestions.length > 0) {
                    allSuggestions.forEach(suggestion => {
                        const suggestionDiv = document.createElement('div');
                        suggestionDiv.innerText = `${suggestion.text} (${suggestion.type})`; // Display suggestion type
                        suggestionDiv.addEventListener('click', () => selectSuggestion(suggestion));
                        suggestionsContainer.appendChild(suggestionDiv);
                    });

                    suggestionsContainer.style.display = 'block'; // Show suggestions
                } else {
                    suggestionsContainer.style.display = 'none'; // Hide if no suggestions
                }
            });
    } else {
        suggestionsContainer.style.display = 'none'; // Hide suggestions if input is empty
    }
});

function selectSuggestion(suggestion) {
    inputField.value = suggestion.text; // Set the input to the selected suggestion
    suggestionsContainer.style.display = 'none'; // Hide suggestions
    displayResultType(suggestion); // Display the result type
}

function displayResultType(suggestion) {
    resultsContainer.innerHTML = `Selected: ${suggestion.text} (${suggestion.type})`; // Display the selected suggestion with type
    resultsContainer.style.display = 'block'; // Show results
}

