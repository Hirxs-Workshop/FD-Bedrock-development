import os
import json

print("FD Texture File Generation Script using python")
print("Generates 'terrain_texture.json', 'textures_list.json', and 'item_texture.json'.")

textures_path = input("Input path' folder: ")

blocks_path = os.path.join(textures_path, "blocks")

image_data = {}
for root, dirs, files in os.walk(blocks_path):
    for filename in files:
        if filename.endswith(".png"):
            name = os.path.splitext(filename)[0]
            image_path = os.path.join(root, filename)
            image_data[name] = image_path

texture_data = {}
for name, path in image_data.items():
    relative_path = os.path.relpath(path, textures_path)
    texture_path = os.path.splitext(relative_path)[0].replace("\\", "/")
    print(f"Saving image: {name}")
    texture_data[name] = {
        "textures": [
            os.path.join("textures", texture_path).replace("\\", "/")
        ]
    }

json_data = {
    "resource_pack_name": "bridgeRP",
    "texture_name": "atlas.terrain",
    "padding": 8,
    "texture_data": texture_data
}

json_path = os.path.join(textures_path, "terrain_texture.json")
with open(json_path, "w") as json_file:
    json.dump(json_data, json_file, indent=4)

print("The file 'terrain_texture.json' has been successfully created.")

textures_list = []

blocks_path = os.path.join(textures_path, "blocks")
for root, dirs, files in os.walk(blocks_path):
    for filename in files:
        if filename.endswith(".png"):
            name = os.path.splitext(filename)[0]
            rel_path = os.path.relpath(root, blocks_path)
            image_path = os.path.normpath(os.path.join("textures", "blocks", rel_path, name))
            textures_list.append(image_path.replace("\\", "/"))
            print(f"Saving image: {image_path}")

items_path = os.path.join(textures_path, "items")
for root, dirs, files in os.walk(items_path):
    for filename in files:
        if filename.endswith(".png"):
            name = os.path.splitext(filename)[0]
            rel_path = os.path.relpath(root, items_path)
            image_path = os.path.normpath(os.path.join("textures", "items", rel_path, name))
            textures_list.append(image_path.replace("\\", "/"))
            print(f"Saving image: {image_path}")

entity_path = os.path.join(textures_path, "entity")
for root, dirs, files in os.walk(entity_path):
    for filename in files:
        if filename.endswith(".png"):
            name = os.path.splitext(filename)[0]
            rel_path = os.path.relpath(root, entity_path)
            image_path = os.path.normpath(os.path.join("textures", "entity", rel_path, name))
            textures_list.append(image_path.replace("\\", "/"))
            print(f"Saving image: {image_path}")

json_path = os.path.join(textures_path, "textures_list.json")
with open(json_path, "w") as json_file:
    json.dump(textures_list, json_file, indent=4)

print("The file 'textures_list.json' has been successfully created.")

items_path = os.path.join(textures_path, "items")

image_data = {}
for root, dirs, files in os.walk(items_path):
    for filename in files:
        if filename.endswith(".png"):
            name = os.path.splitext(filename)[0]
            image_path = os.path.join(root, filename)
            image_data[name] = image_path

texture_data = {}
for name, path in image_data.items():
    relative_path = os.path.relpath(path, textures_path)
    texture_path = os.path.splitext(relative_path)[0].replace("\\", "/")
    print(f"Saving image: textures\{relative_path}")
    texture_data[name] = {
        "textures": [
            os.path.join("textures", texture_path).replace("\\", "/")
        ]
    }

json_data = {
    "resource_pack_name": "bridgeRP",
    "texture_name": "atlas.items",
    "texture_data": texture_data
}

json_path = os.path.join(textures_path, "item_texture.json")
with open(json_path, "w") as json_file:
    json.dump(json_data, json_file, indent=4)

print("The file 'item_texture.json' has been successfully created.")
input("Press enter to exit")