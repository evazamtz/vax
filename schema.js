var vxSchema = {
  "types": {
    "Numeric": {
      "color": "#fff"
    },
    "Int": {
      "extends": "Numeric",
      "color": "#fff"
    },
    "Float": {
      "extends": "Numeric",
      "color": "#fff"
    },
    "String": {
      "color": "#f30"
    },
    "Boolean": {
      "color": "#05f"
    },
    "Array": {
      "color": "#0ff",
      "typeParams": [
        "T"
      ]
    },
    "Pair": {
      "color": "#f0f",
      "typeParams": [
        "A",
        "B"
      ]
    }
  },
  "components": {
    "Constant": {
      "title": "Constant",
      "color": "0-#495-#075:20-#335",
      "width": 150,
      "height": 80,
      "attrs": {
        "V": {
          "title": "Value",
          "type": "Numeric",
          "default": 0
        }
      },
      "out": {
        "O": {
          "type": "Numeric"
        }
      }
    },
    "Add": {
      "title": "+",
      "color": "0-#490-#070:20-#333",
      "width": 100,
      "height": 130,
      "in": {
        "A": {
          "type": "Numeric"
        },
        "B": {
          "type": "Numeric"
        }
      },
      "out": {
        "O": {
          "type": "Numeric"
        }
      }
    },
    "Sub": {
      "title": "-",
      "color": "0-#490-#070:20-#333",
      "width": 100,
      "height": 130,
      "in": {
        "A": {
          "type": "Numeric"
        },
        "B": {
          "type": "Numeric"
        }
      },
      "out": {
        "O": {
          "type": "Numeric"
        }
      }
    },
    "Mul": {
      "title": "*",
      "color": "0-#490-#070:20-#333",
      "width": 100,
      "height": 130,
      "in": {
        "A": {
          "type": "Numeric"
        },
        "B": {
          "type": "Numeric"
        }
      },
      "out": {
        "O": {
          "type": "Numeric"
        }
      }
    },
    "Div": {
      "title": "/",
      "color": "0-#490-#070:20-#333",
      "width": 100,
      "height": 130,
      "in": {
        "A": {
          "type": "Numeric"
        },
        "B": {
          "type": "Numeric"
        }
      },
      "out": {
        "O": {
          "type": "Numeric"
        }
      }
    },
    "If": {
      "title": "If",
      "typeParams": [
        "T"
      ],
      "height": 200,
      "in": {
        "Condition": {
          "type": "Boolean"
        },
        "onTrue": {
          "type": "@T"
        },
        "onFalse": {
          "type": "@T"
        }
      },
      "out": {
        "O": {
          "type": "@T"
        }
      }
    },
    "ArrayLength": {
      "title": "Array.length",
      "in": {
        "A": {
          "title": "Array",
          "type": "Array[Any]"
        }
      },
      "out": {
        "O": {
          "type": "Int"
        }
      }
    },
    "First": {
      "title": "First of pair",
      "typeParams": [
        "A"
      ],
      "in": {
        "P": {
          "type": "Pair[@A,Any]"
        }
      },
      "out": {
        "R": {
          "type": "@A"
        }
      }
    },
    "Result": {
      "color": "0-#690-#670:20-#933",
      "width": 80,
      "height": 70,
      "title": "Result",
      "in": {
        "I": {
          "type": "Numeric"
        }
      }
    }
  }
}