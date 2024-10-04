document.getElementById('autocomplete-input').addEventListener('input', function () {
    const query = this.value.trim();

    // Clear suggestions if query is empty
    if (query.length < 1) {
        document.getElementById('suggestions').innerHTML = '';
        document.getElementById('suggestions').style.display = 'none';
        return;
    }

    // Fetch autocomplete results from the server
    fetch(`http://127.0.0.1:5000/autocomplete?prefix=${query}`)
        .then(response => response.json())
        .then(data => {
            const suggestionsDiv = document.getElementById('suggestions');
            suggestionsDiv.innerHTML = ''; // Clear previous suggestions

            // Display suggestions for artists, albums, and songs
            const addSuggestions = (items) => {
                items.forEach(item => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.textContent = item;
                    suggestionItem.onclick = function() {
                        document.getElementById('autocomplete-input').value = item; // Set input value to clicked suggestion
                        suggestionsDiv.innerHTML = ''; // Clear suggestions
                        suggestionsDiv.style.display = 'none'; // Hide suggestions
                    };
                    suggestionsDiv.appendChild(suggestionItem);
                });
            };

            addSuggestions(data.names);
            addSuggestions(data.albums);
            addSuggestions(data.songs);

            // Show the suggestions box if there are suggestions
            if (suggestionsDiv.innerHTML.length > 0) {
                suggestionsDiv.style.display = 'block';
            } else {
                suggestionsDiv.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('results').innerHTML = '<p>Error fetching data. Please try again later.</p>';
        });
});

// Search function
function searchFunction() {
    const input = document.getElementById('autocomplete-input').value;
    alert('Searching for: ' + input);
}
