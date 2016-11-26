var vaxSchema = {
  "types": {
    "Relation": {
      "color": "#fff"
    },
    "Expr": {
      "color": "#ff0"
    },
    "BooleanExpr": {
      "color": "#ff0",
      "extends": "Expr"
    },
    "NumericExpr": {
      "color": "#ff0",
      "extends": "Expr"
    },
    "TextExpr": {
      "color": "#ff0",
      "extends": "Expr"
    },
    "Table": {
      "extends": "Relation",
      "color": "#f00"
    },
    "Join": {
      "extends": "Table",
      "color": "#f00"
    },
    "ColumnRef": {
      "extends": "Expr",
      "color": "#fff"
    },
    "Column": {
      "extends": "ColumnRef",
      "color": "#fff"
    },
    "Columns": {
      "color": "#f0f"
    },
    "Select": {
      "extends": "Relation",
      "color": "#00f"
    },
    "CTE": {
      "extends": "Select",
      "color": "#00f"
    },
    "Identifier": null
  },
  "components": {
    "Test": {
      "title": "Test auto",
      "color": "0-#495-#075:20-#335",
      "width": 200,
      "typeParams": [
        "T"
      ],
      "in": {
        "Columns": {
          "title": "columns",
          "type": "Columns"
        },
        "From": {
          "title": "FROM",
          "type": "Relation"
        },
        "Where": {
          "title": "WHERE",
          "type": "Expr"
        }
      },
      "attrs": {
        "Alias": {
          "default": "alias"
        },
        "Export": {
          "default": "Yes"
        }
      },
      "out": {
        "O": {
          "type": "Select"
        }
      }
    },
    "Result": {
      "title": "Result",
      "color": "0-#495-#075:20-#335",
      "width": 150,
      "height": 80,
      "in": {
        "S": {
          "title": "Resulting select",
          "type": "Select"
        }
      }
    },
    "Select": {
      "title": "SELECT",
      "color": "0-#495-#075:20-#335",
      "width": 150,
      "height": 130,
      "in": {
        "Columns": {
          "title": "columns",
          "type": "Columns"
        },
        "From": {
          "title": "FROM",
          "type": "Relation"
        },
        "Where": {
          "title": "WHERE",
          "type": "Expr"
        }
      },
      "out": {
        "O": {
          "type": "Select"
        }
      }
    },
    "Table": {
      "title": "Table",
      "color": "0-#195-#0a5:30-#635",
      "width": 150,
      "height": 80,
      "attrs": {
        "T": {
          "title": "Table",
          "type": "Identifier",
          "default": "tbl_user"
        }
      },
      "out": {
        "O": {
          "type": "Table"
        }
      }
    },
    "Column": {
      "title": "Column",
      "color": "0-#32a-#0a5:40-#03a",
      "width": 150,
      "height": 130,
      "in": {
        "R": {
          "title": "Relation",
          "type": "Relation"
        }
      },
      "attrs": {
        "C": {
          "title": "Name",
          "type": "Identifier",
          "default": "id"
        },
        "A": {
          "title": "Alias",
          "type": "Identifier",
          "default": "id"
        }
      },
      "out": {
        "O": {
          "type": "Column"
        }
      }
    },
    "AllColumns": {
      "title": "*",
      "color": "0-#32a-#0a5:40-#03a",
      "width": 150,
      "height": 80,
      "in": {
        "R": {
          "title": "Relation",
          "type": "Relation"
        }
      },
      "out": {
        "O": {
          "type": "Columns"
        }
      }
    },
    "GatherColumns": {
      "title": "Gather columns",
      "color": "0-#32a-#0a5:40-#03a",
      "width": 150,
      "height": 200,
      "in": {
        "A": {
          "title": 1,
          "type": "Column"
        },
        "B": {
          "title": 2,
          "type": "Column"
        },
        "C": {
          "title": 3,
          "type": "Column"
        },
        "D": {
          "title": 5,
          "type": "Column"
        },
        "J": {
          "title": "Other",
          "type": "Columns"
        }
      },
      "out": {
        "O": {
          "type": "Columns"
        }
      }
    },
    "And": {
      "title": "AND",
      "width": 150,
      "height": 150,
      "in": {
        "A": {
          "title": "A",
          "type": "BooleanExpr"
        },
        "B": {
          "title": "A",
          "type": "BooleanExpr"
        }
      },
      "out": {
        "O": {
          "title": "AND",
          "type": "BooleanExpr"
        }
      }
    },
    "Or": {
      "title": "OR",
      "width": 150,
      "height": 150,
      "in": {
        "A": {
          "title": "A",
          "type": "BooleanExpr"
        },
        "B": {
          "title": "A",
          "type": "BooleanExpr"
        }
      },
      "out": {
        "O": {
          "title": "O",
          "type": "BooleanExpr"
        }
      }
    },
    "Eq": {
      "title": "=",
      "width": 150,
      "height": 150,
      "in": {
        "A": {
          "title": "A",
          "type": "Expr"
        },
        "B": {
          "title": "A",
          "type": "Expr"
        }
      },
      "out": {
        "O": {
          "title": "O",
          "type": "BooleanExpr"
        }
      }
    },
    "CustomSql": {
      "title": "Custom SQL",
      "width": 150,
      "height": 150,
      "typeParams": [
        "T"
      ],
      "attrs": {
        "S": {
          "title": "SQL",
          "type": "@T",
          "default": 1
        }
      },
      "out": {
        "O": {
          "title": "O",
          "type": "@T"
        }
      }
    }
  }
};