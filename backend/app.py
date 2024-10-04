from flask import Flask, request, jsonify, send_from_directory
import json
from flask_cors import CORS

app = Flask(__name__, static_folder='../frontend', static_url_path='')  # Static folder set to frontend
CORS(app)
data_file = 'data.json'

# Load the JSON data from a file
try:
    with open(data_file, 'r') as f:
        data = json.load(f)
except json.JSONDecodeError as e:
    print(f"Error decoding JSON: {e}")

@app.route('/')
def home():
    return send_from_directory('../frontend', 'index.html')  # Serve index.html directly

@app.route('/autocomplete', methods=['GET'])
def autocomplete():
    prefix = request.args.get('prefix', '').lower()
    albums = []
    songs = []
    names = []

    # Search for albums and songs matching the prefix
    for artist in data:
        if artist['name'].lower().startswith(prefix):
            names.append(artist['name'])
        for album in artist['albums']:
            if album['title'].lower().startswith(prefix):
                albums.append(album['title'])
            for song in album['songs']:
                if song['title'].lower().startswith(prefix):
                    songs.append(song['title'])

    return jsonify({'albums': albums, 'songs': songs, 'names': names})

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '')
    results = []

    # Perform your search logic here
    for artist in data:
        if artist['name'].lower() == query.lower():
            results.append({'type': 'artist', 'name': artist['name']})
        for album in artist['albums']:
            if album['title'].lower() == query.lower():
                results.append({'type': 'album', 'title': album['title'], 'artist': artist['name']})
            for song in album['songs']:
                if song['title'].lower() == query.lower():
                    results.append({'type': 'song', 'title': song['title'], 'artist': artist['name']})

    return jsonify({'results': results})

if __name__ == '__main__':
    app.run(debug=True)
