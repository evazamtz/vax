var vaxSchema = {
    "colors": {
        "relation": "#cf3",
        "exprs": "#aaa",
        "expr": "#fff",
        "boolean": "#ff0"
    },
    "types": {
        "Int": null,
        "String": null,
        "Relation": {
            "color": "@relation"
        },
        "WindowClause": {
            "color": "@relation"
        },
        "Exprs": {
            "color": "@exprs"
        },
        "NullExpr": {
            "color": "@expr"
        },
        "Expr": {
            "color": "@expr",
            "extends": [
                "NullExpr",
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
            "extends": [
                "Expr"
            ]
        },
        "DateExpr": {
            "color": "@expr",
            "extends": "TimestampExpr"
        },
        "IntervalExpr": {
            "color": "@expr",
            "extends": [
                "Expr"
            ]
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
        "BooleanColumnRef": {
            "extends": [
                "ColumnRef",
                "BooleanExpr"
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
        "DateColumnRef": {
            "extends": [
                "ColumnRef",
                "DateExpr"
            ]
        },
        "TimestampColumnRef": {
            "extends": [
                "DateColumnRef",
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
        "DateColumn": {
            "extends": [
                "Column",
                "DateColumnRef"
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
        "Subquery": {
            "extends": "Expr",
            "color": "@expr"
        },
        "NumericSubquery": {
            "extends": [
                "Subquery",
                "NumericColumnRef"
            ],
            "color": "@expr"
        },
        "BooleanSubquery": {
            "extends": [
                "Subquery",
                "BooleanColumnRef"
            ],
            "color": "@expr"
        },
        "TextSubquery": {
            "extends": [
                "Subquery",
                "TextColumnRef"
            ],
            "color": "@expr"
        },
        "DateSubquery": {
            "extends": [
                "Subquery",
                "DateColumnRef"
            ],
            "color": "@expr"
        },
        "Columns": {
            "color": "@exprs",
            "extends": [
                "Exprs"
            ]
        },
        "OrderByColumns": {
            "color": "@exprs",
            "extends": [
                "Columns"
            ]
        },
        "Select": {
            "extends": "Relation",
            "color": "@relation"
        },
        "Identifier": {
            "color": "#0ff"
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
    "dictionaries": {
        "AggregateTypes": {
            "title": "Типы аггрегатных функций",
            "values": {
                "MAX": "MAX",
                "MIN": "MIN",
                "AVG": "AVG",
                "COUNT": "COUNT",
                "SUM": "SUM"
            }
        },
        "OrderDeliveryStatuses": {
            "title": "Статусы доставки заказ",
            "values": {
                "delivered": "Доставлен",
                "intransit": "В пути"
            }
        }
    },
    "components": {
        "Select": {
            "title": "SELECT",
            "color": "0-#495-#075:20-#335",
            "in": {
                "Cols": "Exprs",
                "FROM": "Relation",
                "WHERE": "BooleanExpr",
                "ORDER": "OrderByColumns",
                "GROUP": "Exprs",
                "HAVING": "BooleanExpr"
            },
            "attrs": {
                "Alias": "Identifier",
                "LIMIT": "Int",
                "OFFSET": "Int"
            },
            "out": {
                "O": "Select"
            }
        },
        "Subquery": {
            "title": "Subquery",
            "typeParams": [
                "T"
            ],
            "in": {
                "S": "Select"
            },
            "attrs": {
                "Alias": "Identifier"
            },
            "out": {
                "O": "@T"
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
                    "type": "OrderByColumns"
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
                    "type": "OrderByColumns"
                }
            }
        },
        "GroupBy": {
            "title": "GROUP BY",
            "color": "0-#32d-#aa5:40-#03a",
            "in": {
                "A": "Expr",
                "B": "Expr",
                "C": "Expr",
                "Prev": "Exprs"
            },
            "out": {
                "O": {
                    "type": "Exprs"
                }
            }
        },
        "Aggregate": {
            "title": "Aggregate",
            "in": {
                "Expr": "Expr",
                "FILTER": "BooleanExpr",
                "OVER": "WindowClause"
            },
            "attrs": {
                "Type": {
                    "valuePicker": {
                        "type": "dictionary",
                        "dictionary": "AggregateTypes"
                    }
                },
                "Alias": "Identifier"
            },
            "out": {
                "O": "Expr"
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
        "Not": {
            "title": "NOT",
            "in": {
                "I": "BooleanExpr"
            },
            "out": {
                "O": "BooleanExpr"
            }
        },
        "Plus": {
            "title": "+",
            "typeParams": [
                "T"
            ],
            "in": {
                "A": "@T",
                "B": "@T"
            },
            "out": {
                "O": "@T"
            }
        },
        "Minus": {
            "title": "-",
            "typeParams": [
                "T"
            ],
            "in": {
                "A": "@T",
                "B": "@T"
            },
            "out": {
                "O": "@T"
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
        "Lt": {
            "title": "<",
            "in": {
                "A": "Expr",
                "B": "Expr"
            },
            "out": {
                "O": "BooleanExpr"
            }
        },
        "LtEq": {
            "title": "<=",
            "in": {
                "A": "Expr",
                "B": "Expr"
            },
            "out": {
                "O": "BooleanExpr"
            }
        },
        "Gt": {
            "title": "",
            "in": {
                "A": "Expr",
                "B": "Expr"
            },
            "out": {
                "O": "BooleanExpr"
            }
        },
        "GtEq": {
            "title": ">=",
            "in": {
                "A": "Expr",
                "B": "Expr"
            },
            "out": {
                "O": "BooleanExpr"
            }
        },
        "IsNull": {
            "title": "IS NULL",
            "in": {
                "I": "Expr"
            },
            "out": {
                "O": "BooleanExpr"
            }
        },
        "IsNotNull": {
            "title": "IS NOT NULL",
            "in": {
                "I": "Expr"
            },
            "out": {
                "O": "BooleanExpr"
            }
        },
        "null": {
            "title": null,
            "out": {
                "O": "NullExpr"
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
        "CurrentDate": {
            "title": "CURRENT_DATE",
            "out": {
                "O": "DateExpr"
            }
        },
        "Interval_NDays": {
            "title": "Interval N Days",
            "attrs": {
                "N": "Int"
            },
            "out": {
                "O": "IntervalExpr"
            }
        },
        "GenerateSeries_StartStopInterval": {
            "title": "generate_series(start,stop,interval)",
            "in": {
                "start": "TimestampExpr",
                "stop": "TimestampExpr",
                "interval": "IntervalExpr"
            },
            "attrs": {
                "Alias": "Identifier"
            },
            "out": {
                "O": "TimestampExpr"
            }
        },
        "AppendDaysToDate": {
            "title": "Date + N days",
            "in": {
                "A": "DateExpr",
                "B": "NumericExpr"
            },
            "out": {
                "O": "DateExpr"
            }
        },
        "SubtractDaysFromDate": {
            "title": "Date - N days",
            "in": {
                "A": "DateExpr",
                "B": "NumericExpr"
            },
            "out": {
                "O": "DateExpr"
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
        },
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
        "Col_Order_Cost": {
            "title": "Заказ.Стоимость",
            "in": {
                "T": "Tbl_Order"
            },
            "attrs": {
                "Alias": {
                    "type": "Identifier",
                    "default": "total_cost_for_recipient"
                }
            },
            "out": {
                "O": "NumericColumn"
            }
        },
        "Col_Order_SendDate": {
            "title": "Заказ.ДатаОтправки",
            "in": {
                "T": "Tbl_Order"
            },
            "attrs": {
                "Alias": {
                    "type": "Identifier",
                    "default": "send_date"
                }
            },
            "out": {
                "O": "DateColumn"
            }
        },
        "Col_Order_CustomerId": {
            "title": "Заказ.IdКлиента",
            "in": {
                "T": "Tbl_Order"
            },
            "attrs": {
                "Alias": {
                    "type": "Identifier",
                    "default": "customer_id"
                }
            },
            "out": {
                "O": "IdColumn"
            }
        },
        "Col_Order_Platform": {
            "title": "Заказ.Площадка",
            "in": {
                "T": "Tbl_Order"
            },
            "attrs": {
                "Alias": {
                    "type": "Identifier",
                    "default": "origin_platform"
                }
            },
            "out": {
                "O": "TextColumn"
            }
        },
        "Dict_Order_DeliveryStatus": {
            "title": "Статус доставки заказа",
            "attrs": {
                "S": {
                    "title": "Статус",
                    "valuePicker": {
                        "type": "dictionary",
                        "dictionary": "OrderDeliveryStatuses"
                    }
                }
            },
            "out": {
                "O": "TextExpr"
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
        }
    }
};