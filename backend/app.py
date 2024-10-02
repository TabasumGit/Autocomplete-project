from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Load the JSON data from a file
with open('data.json', 'r') as f:
    data = json.load(f)

@app.route('/autocomplete', methods=['GET'])
def autocomplete():
    prefix = request.args.get('prefix', '').lower()
    results = [item for item in data if item['title'].lower().startswith(prefix)]
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
