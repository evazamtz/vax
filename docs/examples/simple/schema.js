var exampleSchema = {
	"types": {
		"Numeric": {
			"color": "#fff"
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
		}
	}
};