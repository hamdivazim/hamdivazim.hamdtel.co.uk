from flask import Flask, jsonify, request
import json
from flask_cors import CORS

app = Flask(__name__)

JSON_FILE_PATH = 'data.json'

CORS(app)

def load_data():
    try:
        with open(JSON_FILE_PATH, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {}


@app.route('/api/view/<post_id>', methods=['POST'])
def get_data(post_id):
    data = load_data()

    if post_id not in data:
        data[post_id] = {"likes": 0, "views": 0, "liked_by": []}

    client_id = request.get_json().get("id")

    liked = client_id in data[post_id]["liked_by"]

    data[post_id]["views"] += 1

    post_data = {key: value for key, value in data[post_id].items() if key != 'liked_by'}

    with open(JSON_FILE_PATH, 'w') as file:
        json.dump(data, file, indent=4)

    return jsonify({"message": "Post viewed successfully", "updated": post_data, "liked": liked}), 200


@app.route('/api/like/<post_id>', methods=['POST'])
def like_post(post_id):
    data = load_data()

    client_id = request.get_json().get("id")

    if post_id not in data:
        data[post_id] = {"likes": 0, "views": 0, "liked_by": []}

    already_liked = client_id in data[post_id]["liked_by"]

    if not already_liked:
        data[post_id]["likes"] += 1
        data[post_id]["liked_by"].append(client_id)

    post_data = {key: value for key, value in data[post_id].items() if key != 'liked_by'}

    with open(JSON_FILE_PATH, 'w') as file:
        json.dump(data, file, indent=4)

    if not already_liked:
        return jsonify({"message": "Post liked successfully", "updated": post_data}), 200
    else:
        return jsonify({"message": "Post already liked", "updated": post_data}), 409


if __name__ == '__main__':
    app.run(debug=True)
