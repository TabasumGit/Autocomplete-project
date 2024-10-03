const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');

searchInput.addEventListener('input', function() {
    const query = this.value;
    if (query.length < 1) {
        resultsDiv.innerHTML = ''; // Clear results if input is empty
        return;
    }

    fetch(`http://127.0.0.1:5000/autocomplete?prefix=${query}`)
        .then(response => response.json())
        .then(data => {
            resultsDiv.innerHTML = '<h2>Results:</h2>';

            // Display artist names
            if (data.names.length > 0) {
                resultsDiv.innerHTML += '<h3>Artists:</h3><ul>';
                data.names.forEach(name => {
                    resultsDiv.innerHTML += `<li>${name}</li>`;  // Correctly inject the name here
                });
                resultsDiv.innerHTML += '</ul>';
            }

            // Display album titles
            if (data.albums.length > 0) {
                resultsDiv.innerHTML += '<h3>Albums:</h3><ul>';
                data.albums.forEach(album => {
                    resultsDiv.innerHTML += `<li>${album}</li>`;  // Correctly inject the album title here
                });
                resultsDiv.innerHTML += '</ul>';
            }

            // Display song titles
            if (data.songs.length > 0) {
                resultsDiv.innerHTML += '<h3>Songs:</h3><ul>';
                data.songs.forEach(song => {
                    resultsDiv.innerHTML += `<li>${song}</li>`;  // Correctly inject the song title here
                });
                resultsDiv.innerHTML += '</ul>';
            }

            // If no results found
            if (data.names.length === 0 && data.albums.length === 0 && data.songs.length === 0) {
                resultsDiv.innerHTML += '<p>No suggestions found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultsDiv.innerHTML = '<p>Error fetching data. Please try again later.</p>';
        });
});
 