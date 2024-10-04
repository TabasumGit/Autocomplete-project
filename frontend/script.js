// const searchInput = document.getElementById('search');
// const resultsDiv = document.getElementById('results');

// searchInput.addEventListener('input', function() {
//     const query = this.value;
//     if (query.length < 1) {
//         resultsDiv.innerHTML = ''; // Clear results if input is empty
//         return;
//     }

//     fetch(`http://127.0.0.1:5000/autocomplete?prefix=${query}`)
//         .then(response => response.json())
//         .then(data => {
//             resultsDiv.innerHTML = '<h2>Results:</h2>';

//             // Display artist names
//             if (data.names.length > 0) {
//                 resultsDiv.innerHTML += '<h3>Artists:</h3><ul>';
//                 data.names.forEach(name => {
//                     resultsDiv.innerHTML += `<li>${name}</li>`;  // Correctly inject the name here
//                 });
//                 resultsDiv.innerHTML += '</ul>';
//             }

//             // Display album titles
//             if (data.albums.length > 0) {
//                 resultsDiv.innerHTML += '<h3>Albums:</h3><ul>';
//                 data.albums.forEach(album => {
//                     resultsDiv.innerHTML += `<li>${album}</li>`;  // Correctly inject the album title here
//                 });
//                 resultsDiv.innerHTML += '</ul>';
//             }

//             // Display song titles
//             if (data.songs.length > 0) {
//                 resultsDiv.innerHTML += '<h3>Songs:</h3><ul>';
//                 data.songs.forEach(song => {
//                     resultsDiv.innerHTML += `<li>${song}</li>`;  // Correctly inject the song title here
//                 });
//                 resultsDiv.innerHTML += '</ul>';
//             }

//             // If no results found
//             if (data.names.length === 0 && data.albums.length === 0 && data.songs.length === 0) {
//                 resultsDiv.innerHTML += '<p>No suggestions found.</p>';
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//             resultsDiv.innerHTML = '<p>Error fetching data. Please try again later.</p>';
//         });
// });
 

// document.getElementById('autocomplete-input').addEventListener('input', function () {
//     const query = this.value.trim();

//     // Clear suggestions if query is empty
//     if (query.length < 1) {
//         document.getElementById('suggestions').innerHTML = '';
//         document.getElementById('suggestions').style.display = 'none';
//         return;
//     }

//     // Fetch autocomplete results from the server
//     fetch(`http://127.0.0.1:5000/autocomplete?prefix=${query}`)
//         .then(response => response.json())
//         .then(data => {
//             const suggestionsDiv = document.getElementById('suggestions');
//             suggestionsDiv.innerHTML = ''; // Clear previous suggestions

//             // Display suggestions for artists, albums, and songs
//             if (data.names.length > 0) {
//                 data.names.forEach(name => {
//                     const suggestionItem = document.createElement('div');
//                     suggestionItem.textContent = name;
//                     suggestionItem.onclick = function() {
//                         document.getElementById('autocomplete-input').value = name; // Set input value to clicked suggestion
//                         suggestionsDiv.innerHTML = ''; // Clear suggestions
//                         suggestionsDiv.style.display = 'none'; // Hide suggestions
//                     };
//                     suggestionsDiv.appendChild(suggestionItem);
//                 });
//             }

//             // Display albums as suggestions
//             if (data.albums.length > 0) {
//                 data.albums.forEach(album => {
//                     const suggestionItem = document.createElement('div');
//                     suggestionItem.textContent = album;
//                     suggestionItem.onclick = function() {
//                         document.getElementById('autocomplete-input').value = album; // Set input value to clicked suggestion
//                         suggestionsDiv.innerHTML = ''; // Clear suggestions
//                         suggestionsDiv.style.display = 'none'; // Hide suggestions
//                     };
//                     suggestionsDiv.appendChild(suggestionItem);
//                 });
//             }

//             // Display songs as suggestions
//             if (data.songs.length > 0) {
//                 data.songs.forEach(song => {
//                     const suggestionItem = document.createElement('div');
//                     suggestionItem.textContent = song;
//                     suggestionItem.onclick = function() {
//                         document.getElementById('autocomplete-input').value = song; // Set input value to clicked suggestion
//                         suggestionsDiv.innerHTML = ''; // Clear suggestions
//                         suggestionsDiv.style.display = 'none'; // Hide suggestions
//                     };
//                     suggestionsDiv.appendChild(suggestionItem);
//                 });
//             }

//             // Show the suggestions box if there are suggestions
//             if (suggestionsDiv.innerHTML.length > 0) {
//                 suggestionsDiv.style.display = 'block';
//             } else {
//                 suggestionsDiv.style.display = 'none';
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//             document.getElementById('results').innerHTML = '<p>Error fetching data. Please try again later.</p>';
//         });
// });

// // Search function
// function searchFunction() {
//     const input = document.getElementById('autocomplete-input').value;
//     alert('Searching for: ' + input);
// }


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
