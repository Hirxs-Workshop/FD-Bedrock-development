![Image](https://raw.githubusercontent.com/Hirxs-MC/FD-Bedrock-development/main/FNAF%E2%80%99S%20DECORATIONS.svg)

> [!NOTE]
> 🔧 This is a tutorial in which you can make a rotating block using "traits", this in order for you to be able to support 1.21.20 for your block

## ❓- Rotatable Blocks - Using only traits
In this tutorial i will teach you how to make a block face the player in 4 different positions, or as it is called:
- **__Cardinal direction__**
  - Can only rotate to 4 sides 
    - (example: furnace,bookshelf etc...)

## Requirements:
- It is necessary to create a block as a base, a block without much code, just basic stuff like geometry, texture, collision and more

- Use a program to edit json files like Visual Studio Code, Bridge, Note pad++,etc...
  - (Avoid using mam for this tutorial)

## Here begins the tutorial!
**1**. First prepare a basic code for a custom block, something like this:

![image](https://media.discordapp.net/attachments/1273381780078071869/1273381793881657374/image.png?ex=66be68b5&is=66bd1735&hm=a589d8b29638854d01dff135fcd60563c47211aaeddfeecf6ffca181149fa12e&=&format=webp&quality=lossless&width=479&height=498)

_____________________________________

**2**. Near the `identifier` and `menu_category` sections write `traits: {}`

  - What is this for? This is used to assign a placement direction to our block

![image](https://media.discordapp.net/attachments/1273381780078071869/1273382335567495168/image.png?ex=66be6937&is=66bd17b7&hm=5db35d379d0f0f75b9614eed313ded61442ec54bd9afec1021a23f6e9cc3adc0&=&format=webp&quality=lossless)

_____________________________________

**3**. After you have added the "traits" section inside the **{ }** symbols you will have to write `"minecraft:placement_direction: {}"`, after that you will write again inside the **{ }** symbols and you will write 2 lines of code, one called `"enabled_states": []` and `"y_rotation_offset":`

- Enabled_states :
  - Inside this component you will write "minecraft:cardinal_direction" which has the function of making your block able to be rotated in 4 different directions (north, south, east and west)

- y_rotation_offset:
  - In this component you will write only 180, setting it to 180 will allow the block to face the player

```
			"traits": {
				"minecraft:placement_direction": {
					"enabled_states": [
						"minecraft:cardinal_direction"
					],
					"y_rotation_offset": 180
				}
			},
```

And that's it, this will activate the permutations of our block! By the way, now we will have to do that!

![image](https://media.discordapp.net/attachments/1273381780078071869/1273385839044333608/image.png?ex=66be6c7a&is=66bd1afa&hm=d428b7bdd36cdafebb49ad01e25d09e73965ef04cdabbed34d87fd17ec26bb04&=&format=webp&quality=lossless)

_____________________________________

**4**. Now you will write a section in our block called "permutations" this above or below the "components" section (as you like)

![image](https://media.discordapp.net/attachments/1273381780078071869/1273386812529840170/image.png?ex=66be6d62&is=66bd1be2&hm=f7f767fad4e073700aed78931c8d5f37f3c6b4bfe05581df2168b4836f393f02&=&format=webp&quality=lossless)

_____________________________________

**5**. Now it's time to set the states/permutations that our block will have so we can set the rotation of our block in-game

in this section we will write the following:

```
		"permutations": [
			{
				"condition": "q.block_state('minecraft:cardinal_direction') == 'north'",
				"components": {
					"minecraft:transformation": {
						"rotation": [
							0,
							0,
							0
						]
					}
				}
			},
			{
				"condition": "q.block_state('minecraft:cardinal_direction') == 'west'",
				"components": {
					"minecraft:transformation": {
						"rotation": [
							0,
							90,
							0
						]
					}
				}
			},
			{
				"condition": "q.block_state('minecraft:cardinal_direction') == 'south'",
				"components": {
					"minecraft:transformation": {
						"rotation": [
							0,
							180,
							0
						]
					}
				}
			},
			{
				"condition": "q.block_state('minecraft:cardinal_direction') == 'east'",
				"components": {
					"minecraft:transformation": {
						"rotation": [
							0,
							-90,
							0
						]
					}
				}
			}
		],
```

### In case you're wondering what each thing is for?
Well let's take as an example `"condition": "q.block_state('minecraft:cardinal_direction') == 'north'"` what this code does is assign a condition to our block such as if our block faces north as mentioned in the line of code `q.block_state('minecraft:cardinal_direction') == 'north'` it can execute a component such as 
```
					"minecraft:transformation": {
						"rotation": [
							0,
							0, // <--- The block will take rotation from this number, example: if set to 90 the block will rotate to the west position
							0
						]
					}
```
which is responsible for giving the rotation to our block either of the x,y,z coordinates

![image](https://media.discordapp.net/attachments/1273381780078071869/1273387638803398656/image.png?ex=66be6e27&is=66bd1ca7&hm=ed8b61539045277333862ee881afdadfb9062878b4896e1b37919baea8190ee9&=&format=webp&quality=lossless&width=386&height=498)

_____________________________________

### And that would be all! 
after having done everything right, your block will be able to turn wherever you look

![image](https://media.discordapp.net/attachments/1273396733287862366/1273396733665214565/Screenshot_2024-08-14_151923.png?ex=66be769f&is=66bd251f&hm=a0d2c64bc28c03b34c7d4875063e0fd80a376b51f9484fb8c321c1de0cffab5a&=&format=webp&quality=lossless&width=1020&height=463)

## Note:
that this can be assigned to blocks that have custom models, solid blocks and more

## Full code:
```
{
	"format_version": "1.20.80",
	"minecraft:block": {
		"description": {
			"identifier": "sample:block",
			"traits": {
				"minecraft:placement_direction": {
					"enabled_states": [
						"minecraft:cardinal_direction"
					],
					"y_rotation_offset": 180
				}
			},
			"menu_category": {
				"category": "construction"
			}
		},
		"permutations": [
			{
				"condition": "q.block_state('minecraft:cardinal_direction') == 'north'",
				"components": {
					"minecraft:transformation": {
						"rotation": [
							0,
							0,
							0
						]
					}
				}
			},
			{
				"condition": "q.block_state('minecraft:cardinal_direction') == 'west'",
				"components": {
					"minecraft:transformation": {
						"rotation": [
							0,
							90,
							0
						]
					}
				}
			},
			{
				"condition": "q.block_state('minecraft:cardinal_direction') == 'south'",
				"components": {
					"minecraft:transformation": {
						"rotation": [
							0,
							180,
							0
						]
					}
				}
			},
			{
				"condition": "q.block_state('minecraft:cardinal_direction') == 'east'",
				"components": {
					"minecraft:transformation": {
						"rotation": [
							0,
							-90,
							0
						]
					}
				}
			}
		],
		"components": {
			"minecraft:geometry": "minecraft:geometry.full_block",
			"minecraft:material_instances": {
				"*": {
					"texture": "dirt",
					"render_method": "opaque"
				},
				"north": {
					"texture": "sand",
					"render_method": "opaque"
				}
			},
			"minecraft:light_dampening": 15,
			"minecraft:selection_box": {
				"origin": [
					-8,
					0,
					-8
				],
				"size": [
					16,
					16,
					16
				]
			},
			"minecraft:collision_box": {
				"origin": [
					-8,
					0,
					-8
				],
				"size": [
					16,
					16,
					16
				]
			}
		}
	}
}
```