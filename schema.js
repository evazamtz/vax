var vaxSchema = {
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
      "color": "#0ff",
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
      "typeParams": [
        "T"
      ],
      "attrs": {
        "V": {
          "title": "Value",
          "type": "@T",
          "default": 0
        }
      },
      "out": {
        "O": {
          "type": "@T"
        }
      }
    },
    "MakePair": {
      "title": "Pair",
      "color": "0-#495-#075:20-#335",
      "width": 150,
      "height": 130,
      "typeParams": [
        "A",
        "B"
      ],
      "attrs": {
        "A": {
          "title": "A",
          "type": "@A",
          "default": "-"
        },
        "B": {
          "title": "A",
          "type": "@B",
          "default": "-"
        }
      },
      "out": {
        "O": {
          "type": "Pair[@A,@B]"
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
    "GreaterThan": {
      "title": ">",
      "typeParams": [
        "T"
      ],
      "in": {
        "A": {
          "type": "@T"
        },
        "B": {
          "type": "@T"
        }
      },
      "out": {
        "O": {
          "type": "Boolean"
        }
      }
    },
    "Replicate": {
      "typeParams": [
        "T"
      ],
      "in": {
        "V": {
          "title": "What",
          "type": "@T"
        },
        "N": {
          "title": "# of times",
          "type": "Int"
        }
      },
      "out": {
        "O": {
          "type": "Array[@T]"
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
    "NumericToString": {
      "in": {
        "N": {
          "type": "Numeric"
        }
      },
      "out": {
        "O": {
          "type": "String"
        }
      }
    },
    "ConcatStrings": {
      "in": {
        "A": {
          "type": "String"
        },
        "B": {
          "type": "String"
        }
      },
      "out": {
        "O": {
          "type": "String"
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
          "type": "String"
        }
      }
    }
  }
};