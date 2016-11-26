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
    "TimestampExpr": {
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
    "TextColumnRef": {
      "extends": [
        "ColumnRef",
        "TextExpr"
      ]
    },
    "NumericColumnRef": {
      "extends": [
        "ColumnRef",
        "NumericExpr"
      ]
    },
    "TimestampColumnRef": {
      "extends": [
        "ColumnRef",
        "TimestampExpr"
      ]
    },
    "Column": {
      "extends": "ColumnRef",
      "color": "#fff"
    },
    "TextColumn": {
      "extends": [
        "Column",
        "TextColumnRef"
      ]
    },
    "NumericColumn": {
      "extends": [
        "Column",
        "NumericColumnRef"
      ]
    },
    "TimestampColumn": {
      "extends": [
        "Column",
        "TimestampColumnRef"
      ]
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
    "Identifier": {
      "color": "#0ff"
    },
    "OrderColumns": null,
    "OrderColumn": {
      "extends": "OrderColumns"
    },
    "Table_User": {
      "extends": "Table"
    },
    "Column_User_Id": {
      "extends": "NumericColumn"
    },
    "Column_User_Name": {
      "extends": "TextColumn"
    },
    "Column_User_Role": {
      "extends": "TextColumn"
    },
    "Column_User_CreatedAt": {
      "extends": "TimestampColumn"
    }
  },
  "components": {
    "Table_User": {
      "title": "Таблица.Пользователи",
      "attrs": {
        "Alias": {
          "type": "Identifier",
          "default": "u"
        }
      },
      "out": {
        "O": "Table_User"
      }
    },
    "Col_User_Email": {
      "title": "Пользователь.Email",
      "in": {
        "T": "Table_User"
      },
      "attrs": {
        "Alias": {
          "type": "Identifier",
          "default": "email"
        }
      },
      "out": {
        "O": "TextColumn"
      }
    },
    "Col_User_Role": {
      "title": "Пользователь.Роль",
      "in": {
        "T": "Table_User"
      },
      "attrs": {
        "Alias": {
          "type": "Identifier",
          "default": "role"
        }
      },
      "out": {
        "O": "TextColumn"
      }
    },
    "Col_User_CreatedAt": {
      "title": "Пользователь.ВремяСоздания",
      "in": {
        "T": "Table_User"
      },
      "attrs": {
        "Alias": {
          "type": "Identifier",
          "default": "created_at"
        }
      },
      "out": {
        "O": "TimestampColumn"
      }
    },
    "Select": {
      "title": "SELECT",
      "color": "0-#495-#075:20-#335",
      "width": 150,
      "in": {
        "Cols": "Columns",
        "FROM": "Relation",
        "WHERE": "Expr",
        "ORDER": "OrderColumns"
      },
      "attrs": {
        "Alias": "Identifier"
      },
      "out": {
        "O": "Select"
      }
    },
    "Join": {
      "title": "JOIN",
      "color": "0-#495-#075:20-#335",
      "width": 150,
      "in": {
        "L": "Relation",
        "R": "Expr",
        "Alias": "Identifier",
        "ON": "BooleanExpr"
      },
      "attrs": {
        "Type": {
          "default": "INNER"
        }
      },
      "out": {
        "O": "Relation"
      }
    },
    "Table": {
      "title": "Table",
      "color": "0-#195-#0a5:30-#635",
      "width": 150,
      "attrs": {
        "T": {
          "title": "Table",
          "type": "Identifier",
          "default": "tbl_"
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
          "type": "Identifier"
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
    "OrderBy": {
      "title": "ORDER BY",
      "color": "0-#32a-#0a5:40-#03a",
      "in": {
        "E": {
          "title": "Expr",
          "type": "Expr"
        },
        "Prev": {
          "title": "Prev. order",
          "type": "OrderColumns"
        }
      },
      "attrs": {
        "D": {
          "title": "Direction",
          "default": "ASC"
        }
      },
      "out": {
        "O": {
          "type": "OrderColumns"
        }
      }
    },
    "And": {
      "title": "AND",
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
      "typeParams": [
        "T"
      ],
      "attrs": {
        "SQL": "@T"
      },
      "out": {
        "O": "@T"
      }
    },
    "Repeat": {
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
    "Result": {
      "title": "Result",
      "color": "0-#495-#075:20-#335",
      "in": {
        "S": "Select"
      }
    }
  }
};