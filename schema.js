var vaxSchema = {
  "colors": {
    "relation": "#cf3",
    "exprs": "#aaa",
    "expr": "#fff",
    "boolean": "#ff0"
  },
  "types": {
    "Relation": {
      "color": "@relation"
    },
    "Exprs": {
      "color": "@exprs"
    },
    "Expr": {
      "color": "@expr",
      "extends": [
        "Exprs"
      ]
    },
    "BooleanExpr": {
      "color": "@boolean",
      "extends": "Expr"
    },
    "NumericExpr": {
      "color": "@expr",
      "extends": "Expr"
    },
    "IdExpr": {
      "color": "@expr",
      "extends": "NumericExpr"
    },
    "TextExpr": {
      "color": "@expr",
      "extends": "Expr"
    },
    "TimestampExpr": {
      "color": "@expr",
      "extends": "Expr"
    },
    "Table": {
      "color": "@relation",
      "extends": "Relation"
    },
    "Join": {
      "extends": "Table",
      "color": "@relation"
    },
    "ColumnRef": {
      "extends": "Expr",
      "color": "@expr"
    },
    "TextColumnRef": {
      "extends": [
        "ColumnRef",
        "TextExpr"
      ],
      "color": "@expr"
    },
    "NumericColumnRef": {
      "extends": [
        "ColumnRef",
        "NumericExpr"
      ],
      "color": "@expr"
    },
    "IdColumnRef": {
      "extends": [
        "NumericColumnRef",
        "IdExpr"
      ],
      "color": "@expr"
    },
    "TimestampColumnRef": {
      "extends": [
        "ColumnRef",
        "TimestampExpr"
      ],
      "color": "@expr"
    },
    "Column": {
      "extends": "ColumnRef",
      "color": "@expr"
    },
    "TextColumn": {
      "extends": [
        "Column",
        "TextColumnRef"
      ],
      "color": "@expr"
    },
    "NumericColumn": {
      "extends": [
        "Column",
        "NumericColumnRef"
      ],
      "color": "@expr"
    },
    "IdColumn": {
      "extends": [
        "Column",
        "IdColumnRef"
      ],
      "color": "@expr"
    },
    "TimestampColumn": {
      "extends": [
        "Column",
        "TimestampColumnRef"
      ],
      "color": "@expr"
    },
    "Columns": {
      "color": "@exprs",
      "extends": [
        "Exprs"
      ]
    },
    "Select": {
      "extends": "Relation",
      "color": "@relation"
    },
    "CTE": {
      "extends": "Select",
      "color": "@relation"
    },
    "Identifier": {
      "color": "#0ff"
    },
    "OrderColumns": {
      "color": "@exprs"
    },
    "OrderColumn": {
      "extends": "OrderColumns",
      "color": "@expr"
    },
    "Tbl_Order": {
      "extends": "Table",
      "color": "@relation"
    },
    "Tbl_Customer": {
      "extends": "Table",
      "color": "@relation"
    },
    "Tbl_LegalEntity": {
      "extends": "Table",
      "color": "@relation"
    }
  },
  "components": {
    "Tbl_Order": {
      "title": "Тбл.Заказ",
      "attrs": {
        "Alias": {
          "type": "Identifier",
          "default": "o"
        }
      },
      "out": {
        "O": "Tbl_Order"
      }
    },
    "Col_Order_DeliveryStatus": {
      "title": "Заказ.СтатусДоставки",
      "in": {
        "T": "Tbl_Order"
      },
      "attrs": {
        "Alias": {
          "type": "Identifier",
          "default": "delivery_status"
        }
      },
      "out": {
        "O": "TextColumn"
      }
    },
    "Tbl_Customer": {
      "title": "Тбл.Клиент",
      "attrs": {
        "Alias": {
          "type": "Identifier",
          "default": "ct"
        }
      },
      "out": {
        "O": "Tbl_Customer"
      }
    },
    "Tbl_LegalEntity": {
      "title": "Тбл.ЮрЛицо",
      "attrs": {
        "Alias": {
          "type": "Identifier",
          "default": "le"
        }
      },
      "out": {
        "O": "Tbl_LegalEntity"
      }
    },
    "LegalEntity_FullName": {
      "title": "Полное имя клиента",
      "in": {
        "T": "Tbl_LegalEntity"
      },
      "attrs": {
        "Alias": {
          "type": "Identifier",
          "default": "le_fullname"
        }
      },
      "out": {
        "O": "TextExpr"
      }
    },
    "Select": {
      "title": "SELECT",
      "color": "0-#495-#075:20-#335",
      "in": {
        "Cols": "Exprs",
        "FROM": "Relation",
        "WHERE": "BooleanExpr",
        "ORDER": "OrderColumns",
        "GROUP": "Exprs",
        "HAVING": "BooleanExpr"
      },
      "attrs": {
        "Alias": "Identifier"
      },
      "out": {
        "O": "Select"
      }
    },
    "CountAsteriks": {
      "title": "COUNT(*)",
      "attrs": {
        "Alias": {
          "type": "Identifier",
          "default": "cnt"
        }
      },
      "out": {
        "O": "NumericExpr"
      }
    },
    "SmartJoin": {
      "title": "Smart JOIN",
      "color": "0-#495-#075:20-#335",
      "in": {
        "Prev": "Relation",
        "L": "Relation",
        "R": "Relation",
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
    "PlainJoin": {
      "title": "JOIN",
      "color": "0-#495-#075:20-#335",
      "in": {
        "L": "Relation",
        "R": "Relation",
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
      "title": "Pick column",
      "color": "0-#32a-#0a5:40-#03a",
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
          "type": "Expr"
        },
        "B": {
          "title": 2,
          "type": "Expr"
        },
        "C": {
          "title": 3,
          "type": "Expr"
        },
        "D": {
          "title": 4,
          "type": "Expr"
        },
        "E": {
          "title": 5,
          "type": "Expr"
        },
        "Prev": {
          "title": "Other",
          "type": "Exprs"
        }
      },
      "out": {
        "O": {
          "type": "Exprs"
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
    "GroupBy": {
      "title": "GROUP BY",
      "color": "0-#32d-#aa5:40-#03a",
      "in": {
        "E": {
          "title": "Expr",
          "type": "Expr"
        },
        "Prev": {
          "title": "Prev. grouping",
          "type": "Exprs"
        }
      },
      "out": {
        "O": {
          "type": "Exprs"
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
          "title": "B",
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
    "TypedEq": {
      "title": "Typed =",
      "typeParams": [
        "T"
      ],
      "in": {
        "A": {
          "title": "A",
          "type": "@T"
        },
        "B": {
          "title": "B",
          "type": "@T"
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
      "title": "SQL",
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
    "Param": {
      "title": "Параметр",
      "typeParams": [
        "T"
      ],
      "attrs": {
        "title": {
          "title": "Имя",
          "type": "Any"
        }
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