document.getElementById('autocomplete-input').addEventListener('input', function() {
    const prefix = this.value;

    // Clear suggestions if input is empty
    if (!prefix) {
        document.getElementById('suggestions').innerHTML = '';
        document.getElementById('suggestions').style.display = 'none';
        return;
    }

    // Fetch suggestions from the Flask backend
    fetch(`http://127.0.0.1:5000/autocomplete?prefix=${prefix}`)
        .then(response => response.json())
        .then(data => {
            const suggestionsDiv = document.getElementById('suggestions');
            suggestionsDiv.innerHTML = ''; // Clear previous suggestions

            if (data.length === 0) {
                suggestionsDiv.style.display = 'none'; // Hide if no suggestions
                return;
            }

            // Show suggestions
            data.forEach(item => {
                const suggestionDiv = document.createElement('div');
                suggestionDiv.textContent = item;
                suggestionDiv.onclick = () => {
                    document.getElementById('autocomplete-input').value = item; // Set input value
                    suggestionsDiv.innerHTML = ''; // Clear suggestions
                    suggestionsDiv.style.display = 'none'; // Hide suggestions
                };
                suggestionsDiv.appendChild(suggestionDiv);
            });

            suggestionsDiv.style.display = 'block'; // Show suggestions
        })
        .catch(error => console.error('Error fetching suggestions:', error));
});
