var exampleSchema = {
	"types": {
		"Numeric": {
			"color": "#fff"
		}
	},
	"dictionaries": {
		"fns": {
			title: "yolo",
			"values": {
				"sin": "sin(x)",
				"cos": "cos(x)",
				"tg": "tan(x)",
				"ctg": "cot(x)"
			}
		}
	},
	"components": {
		"Literal": {
			"attrs": {
				"V": "Numeric"
			},
			"out": {
				"O": "Numeric"
			}
		},
		"Plus": {
			"in": {
				"A": "Numeric",
				"B": "Numeric"
			},
			"out": {
				"O": "Numeric"
			}
		},
		"Trig. Function": {
			"in": {
				"I": "Numeric"
			},
			"out": {
				"O": "Numeric"
			},
			"attrs": {
				"Fn": {
					"type": "Any",
					"default": "sin",
					"valuePicker": {
						"type": "dictionary",
						"dictionary": "fns"
					}
				}

			}
		}
	}
};