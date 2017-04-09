var exampleSchema = {
	"colors": {
		"core": "0-#aaf-#9be:50-#225",
		"ops": "0-#495-#075:20-#335",
		"bool": "0-#0ff-#0dd:20-#111"
	},
	"groups": {
		"core": "Основные элементы",
		"ops": "Арифметические операции",
		"bool": "Логические операции",
		"str": "Строковые операции"
	},
	"types": {
		"Numeric": {
			"color": "#fff",
			"title": "Число"
		},
		"Boolean": {
			"color": "#ff0",
			"title": "Условие"
		},
		"String": {
			"color": "#0ff",
			"title": "Строка"
		}
	},
	"components": {
		"Result": {
			"color": "0-#f80-#da0:50-#520",
			"group": "core",
			"title": "Результат",
			"in": {
				"I": "Any"
			}
		},
		"Repeat": {
			"color": "@core",
			"group": "core",
			"title": "=>>=",
			"typeParams": [
				"T"
			],
			"in": {
				"I": "@T"
			},
			"out": {
				"O": "@T"
			}
		},
		"Number": {
			"title": "Число",
			"color": "@core",
			"group": "core",
			"attrs": {
				"V": {
					"title": "=",
					"type": "Numeric",
					"default": "0"
				}
			},
			"out": {
				"O": "Numeric"
			}
		},
		"String": {
			"color": "@core",
			"group": "core",
			"title": "Строка",
			"attrs": {
				"V": {
					"title": "=",
					"type": "String",
					"default": "-"
				}
			},
			"out": {
				"O": "String"
			}
		},
		"ToString": {
			"color": "@core",
			"group": "str",
			"title": "Преобразовать в строку",
			"in": {
				"I": "Any"
			},
			"out": {
				"O": "String"
			}
		},
		"Concat": {
			"color": "@core",
			"group": "str",
			"title": "Склеить строки",
			"in": {
				"S1": "String",
				"S2": "String",
				"S3": "String",
				"S4": "String"
			},
			"out": {
				"O": "String"
			}
		},
		"Prompt": {
			"title": "Числовой параметр",
			"color": "@core",
			"group": "core",
			"attrs": {
				"Name": {
					"title": "Название",
					"type": "Any",
					"default": "a"
				}
			},
			"out": {
				"O": "Numeric"
			}
		},
		"Add": {
			"group": "ops",
			"color": "@ops",
			"title": "+",
			"in": {
				"A": "Numeric",
				"B": "Numeric"
			},
			"out": {
				"O": "Numeric"
			}
		},
		"Sub": {
			"title": "-",
			"group": "ops",
			"color": "@ops",
			"in": {
				"A": "Numeric",
				"B": "Numeric"
			},
			"out": {
				"O": "Numeric"
			}
		},
		"Mul": {
			"title": "*",
			"group": "ops",
			"color": "@ops",
			"in": {
				"A": "Numeric",
				"B": "Numeric"
			},
			"out": {
				"O": "Numeric"
			}
		},
		"Div": {
			"title": "/",
			"group": "ops",
			"color": "@ops",
			"in": {
				"A": "Numeric",
				"B": "Numeric"
			},
			"out": {
				"O": "Numeric"
			}
		},
		"Sqrt": {
			"title": "Корень",
			"group": "ops",
			"color": "@ops",
			"in": {
				"I": "Numeric"
			},
			"out": {
				"O": "Numeric"
			}
		},
		"If": {
			"title": "Если То Иначе",
			"color": "@bool",
			"group": "bool",
			"typeParams": [
				"T"
			],
			"in": {
				"Condition": "Boolean",
				"onTrue": "@T",
				"onFalse": "@T"
			},
			"out": {
				"O": {
					"type": "@T"
				}
			}
		},
		"Gt": {
			"title": "Больше (>)",
			"color": "@bool",
			"group": "bool",
			"in": {
				"A": "Numeric",
				"B": "Numeric"
			},
			"out": {
				"O": "Boolean"
			}
		},
		"Eq": {
			"title": "Равняется",
			"color": "@bool",
			"group": "bool",
			"in": {
				"A": "Numeric",
				"B": "Numeric"
			},
			"out": {
				"O": "Boolean"
			}
		},
		"Not": {
			"title": "НЕ",
			"color": "@bool",
			"group": "bool",
			"in": {
				"I": "Boolean"
			},
			"out": {
				"O": "Boolean"
			}
		},
		"And": {
			"title": "И",
			"color": "@bool",
			"group": "bool",
			"in": {
				"A": "Boolean",
				"B": "Boolean"
			},
			"out": {
				"O": "Boolean"
			}
		},
		"Or": {
			"title": "ИЛИ",
			"color": "@bool",
			"group": "bool",
			"in": {
				"A": "Boolean",
				"B": "Boolean"
			},
			"out": {
				"O": "Boolean"
			}
		}
	}
};