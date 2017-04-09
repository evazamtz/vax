var exampleSchema = {
    "colors": {
        "relation": "#cf3",
        "table": "#0ff",
        "exprs": "#aaa",
        "expr": "#fff",
        "boolean": "#f22",
        "orderBy": "#6fa",
        "coreNode": "0-#f80-#da0:50-#520",
        "auxCoreNode": "0-#aaf-#9be:50-#225",
        "tableNode": "0-#0ff-#0dd:20-#111",
        "columnNode": "0-#0f7-#0d3:30-#111",
        "logicNode": "0-#f55-#d20:30-#411",
        "dictNode": "0-#aa5-#7aa:30-#011",
        "exprNode": "0-#aff-#599:30-#111"
    },
    "types": {
        "FromClause": {"color": "@relation", "title": "FROM"},
        "Relation": {"color": "@relation", "extends": "FromClause", "title": "Отношение"},
        "Exprs": {"color": "@exprs", "title": "Выражения"},
        "Expr": {"color": "@expr", "extends": "Exprs", "title": "Выражение"},
        "NullExpr": {"color": "@expr", "extends": "Expr", "title": null},
        "BooleanExpr": {"color": "@boolean", "extends": "Expr", "title": "Условие"},
        "NumericExpr": {"color": "@expr", "extends": "Expr", "title": "Число"},
        "IdExpr": {"color": "@expr", "extends": "NumericExpr", "title": "ID"},
        "TextExpr": {"color": "@expr", "extends": "Expr", "title": "Строка"},
        "TimestampExpr": {"color": "@expr", "extends": ["Expr"], "title": "Время"},
        "DateExpr": {"color": "@expr", "extends": "TimestampExpr", "title": "Дата"},
        "IntervalExpr": {"color": "@expr", "extends": ["Expr"], "title": "Дата"},
        "OrderByColumns": {"color": "@orderBy", "title": "Колонки сортировки"},
        "Table": {"extends": "Relation", "color": "@table", "title": "Таблица"},
        "Select": {"extends": "Relation", "color": "@relation", "title": "Запрос"},
        "CTE": {"extends": "Relation", "color": "@relation", "title": "CTE"},
        "Identifier": {"color": "#0ff", "title": "Идентификатор"},
        "ClaimOrder": {"extends": "Table", "color": "@table", "title": "Tbl_ClaimOrder"},
        "ClaimTicketReply": {"extends": "Table", "color": "@table", "title": "Tbl_ClaimTicketReply"},
        "Claim": {"extends": "Table", "color": "@table", "title": "Tbl_Claim"},
        "OrderTrackInformation": {"extends": "Table", "color": "@table", "title": "Tbl_OrderTrackInformation"},
        "OrderCashOnDelivery": {"extends": "Table", "color": "@table", "title": "Tbl_OrderCashOnDelivery"},
        "OrderMoneyTransaction": {"extends": "Table", "color": "@table", "title": "Tbl_OrderMoneyTransaction"},
        "OrderPlatformDeliveryStatusHistoryItem": {
            "extends": "Table",
            "color": "@table",
            "title": "Tbl_OrderPlatformDeliveryStatusHistoryItem"
        },
        "DeliveryService": {"extends": "Table", "color": "@table", "title": "Tbl_DeliveryService"},
        "LegalEntity": {"extends": "Table", "color": "@table", "title": "Tbl_LegalEntity"},
        "MoneyDistributionItem": {"extends": "Table", "color": "@table", "title": "Tbl_MoneyDistributionItem"},
        "MoneyDistribution": {"extends": "Table", "color": "@table", "title": "Tbl_MoneyDistribution"},
        "MoneyRequest": {"extends": "Table", "color": "@table", "title": "Tbl_MoneyRequest"},
        "PaymentOrder": {"extends": "Table", "color": "@table", "title": "Tbl_PaymentOrder"},
        "Customer": {"extends": "Table", "color": "@table", "title": "Tbl_Customer"},
        "Order": {"extends": "Table", "color": "@table", "title": "Tbl_Order"},
        "User": {"extends": "Table", "color": "@table", "title": "Tbl_User"}
    },
    "dictionaries": {
        "JoinTypes": {
            "title": "Типы соединений таблиц",
            "values": {"INNER": "INNER", "LEFT": "LEFT", "RIGHT": "RIGHT", "FULL": "FULL"}
        },
        "AggregateTypes": {
            "title": "Типы аггрегатных функций",
            "values": {
                "MAX": "МАКСИМУМ",
                "MIN": "МИНИМУМ",
                "AVG": "СРЕДНЕЕ",
                "COUNT": "КОЛИЧЕТВО",
                "COUNT(DISTINCT": "КОЛИЧЕСТВО УНИКАЛЬНЫХ",
                "SUM": "СУММА"
            }
        },
        "SortDirections": {
            "title": "Направления сортировок",
            "values": {"ASC": "По возрастанию", "DESC": "По убыванию"}
        },
        "OrderDeliveryStatuses": {
            "title": "Статусы доставки заказ",
            "values": {"delivered": "Доставлен", "intransit": "В пути"}
        },
        "YesNo": {"title": "Да/Нет", "values": {"yes": "Да", "no": "Нет"}},
        "PlusMinus": {"title": "+/-", "values": {"plus": true, "minus": false}},
        "Months": {
            "title": "Месяцы",
            "values": {
                "1": "Январь",
                "2": "Февраль",
                "3": "Март",
                "4": "Апрель",
                "5": "Май",
                "6": "Июнь",
                "7": "Июль",
                "8": "Август",
                "9": "Сентябрь",
                "10": "Октябрь",
                "11": "Ноябрь",
                "12": "Декабрь"
            }
        },
        "IntervalTypes": {"title": "Типы интервалов", "values": {"D": "День", "M": "Месяц"}},
        "AccountingFunctionTypes": {
            "title": "Типы бухгалтерский функций",
            "values": {
                "DebitBalance": "Дт Сальдо",
                "CreditBalance": "Кт Сальдо",
                "DebitSum": "Дт Оборот",
                "CreditSum": "Кт Оборот"
            }
        },
        "OrderDetailsConsts": {
            "title": "Переменные tbl_order.details",
            "values": {"f103_date": "Дата Ф103", "f103_num": "Номер Ф103", "moneyRecipient": "Получатель денег"}
        },
        "Dict_Accounts__dictionary": {
            "title": "Бухгалтерские счета",
            "values": {
                "'SettlementAccount'": "Расчетный счет",
                "'CashIn'": "Входящие платежи",
                "'CashOut'": "Исходящие платежи",
                "'CashInHousehold'": "Хоз Входящие",
                "'CashOutHousehold'": "Хоз Исходящие",
                "'Loan'": "Основное тело займа клиента",
                "'LoanInterest'": "Проценты по займу клиента",
                "'LoanPenaltyInterest'": "Пени по займу клиента",
                "'CustomerBalance'": "Баланс клиента",
                "'CompanyProfit'": "Прибыль ПИМ",
                "'Deposit'": "Депозит клиента",
                "'DepositInterest'": "Проценты по депозиту клиента",
                "'DepositInterestCapitalized'": "Капитализированные проценты по депозиту клиента",
                "'DeliveryServiceBalance'": "Баланс СД-плательщика",
                "'PlatformBalance'": "Баланс Площадки",
                "'CustomerRegistration'": "Приходы по авто-регистрации",
                "'CashInUnknown'": "Неизвестные или отложенные входящие операции",
                "'CashOutUnknown'": "Неизвестные или отложенные исходящие операции",
                "'LostAndFound'": "Нераспределенные деньги по приходу от СД",
                "'FoundOrders'": "Найденные деньги по заказам, ранее отнесённым на lostAndFound",
                "'CustomerMoneyTransfer'": "Клиентские перечисления",
                "'CourtAdjustments'": "Корректировки по судебным решениям",
                "'PreviousPeriodsErrors'": "Ошибки прошлых периодов",
                "'ClaimFee'": "Комиссия за претензионку (для ручных проводок)",
                "'ClaimServiceFee'": "Комиссия за претензионку",
                "'ClaimProfit'": "Комиссия за претензионку",
                "'TransactionFee'": "Тариф Почты России",
                "'RedundantCustomerMoneyTransfer'": "Избыточные перечисления клиенту",
                "'StateDue'": "Гос. пошлина",
                "'VerificationFee'": "Комиссия PimPay.Сверки",
                "'Ndfl'": "НДФЛ",
                "'UrgentRequestProcessFee'": "Комиссия за срочное рассмотрение заявки",
                "'SpecialPurposeFundingFee'": "Проценты по Целевому финансированию",
                "'ClaimWallet'": "Кошелек претензионки",
                "'ClaimOrdersFee'": "Долг по заказам претензионки",
                "'DeliveryServiceAgreementPenalty'": "Неустойка за нарушение условий договора с СД"
            }
        },
        "Dict_Platform__dictionary": {
            "title": "Площадка",
            "values": {
                "'customer'": "Клиентские перечисления",
                "'test'": "Тестовая площадка",
                "'logsis'": "Logsis",
                "'pimpay_penalty'": "PimPay Штрафы",
                "'topdelivery'": "TopDelivery",
                "'marschroute'": "Маршрут",
                "'usend'": "USEND",
                "'spsr'": "SPSR express",
                "'russian_post_service'": "RUSSIAN POST SERVICE",
                "'boxberry'": "Boxberry",
                "'cse'": "Курьер Сервис Экспресс",
                "'ddelivery'": "DDelivery",
                "'dostavista'": "Достависта",
                "'kaz_post'": "Казпочта",
                "'mrsender'": "mr.SENDER",
                "'logoscor'": "Логоскор",
                "'lost_and_found'": "Lost N Found",
                "'multiship_ru'": "Multiship",
                "'open_api'": "АККОРД ПОСТ",
                "'post_ems_test'": "Почта России",
                "'posthouse'": "Почтовый Дом",
                "'reworker_russian_post'": "ReWorker - заказы Почты России",
                "'ru_courier'": "РуКурьер",
                "'axiomus'": "Axiomus",
                "'distance_selling_service'": "Сервис Дистанционной Торговли",
                "'beta_production'": "Бета ПРО",
                "'sdek_public'": "СДЭК",
                "'reworker'": "ReWorker",
                "'b2cpl'": "B2CPL"
            }
        },
        "Dict_OrderDeliveryStatus__dictionary": {
            "title": "Статус доставки заказа",
            "values": {
                "'pending'": "Ожидает отправки в СД",
                "'prepared_at_wh'": "На складе",
                "'prepared_at_ds'": "На складе СД",
                "'intransit'": "В пути",
                "'at_desctination_city'": "В городе получателя",
                "'stored'": "Прибыл в ПВЗ",
                "'delivered'": "Доставлен",
                "'expected_full_return'": "Ожидается полный возврат",
                "'expected_partial_return'": "Ожидается частичный возврат",
                "'actually_returned'": "Возврат",
                "'lost'": "Утерян",
                "'error'": "Ошибка",
                "'unknown'": "Неизвестно"
            }
        },
        "Dict_DeliveryService__dictionary": {
            "title": "Служба доставки",
            "values": {
                "8": "Logibox",
                "10": "ПЭК",
                "1": "Axiomus",
                "2": "B2Cpl",
                "3": "Boxberry",
                "4": "Курьер Сервис Экспресс",
                "5": "DPD",
                "6": "EMS Почта России",
                "7": "IM-Logistics",
                "9": "Maxima-Express",
                "11": "PickPoint",
                "12": "Pony",
                "13": "Почта России",
                "14": "QiwiPost",
                "15": "СДЭК",
                "17": "BetaProduction",
                "16": "СПСР-Экспресс",
                "19": "Аккорд Пост",
                "18": "BetaPost",
                "20": "TopDelivery",
                "21": "MaxiPost",
                "22": "ReWorker",
                "23": "ShopLogistics",
                "24": "Hermes",
                "25": "Lenod",
                "26": "Aplix",
                "27": "ТК КИТ",
                "28": "FSD",
                "29": "Great Express",
                "30": "Почта казахстана",
                "31": "Логсис",
                "32": "mr.SENDER",
                "65": "Вестовой",
                "66": "Маршрут",
                "67": "DDelivery",
                "68": "СДТ",
                "69": "RPS",
                "70": "Достависта",
                "71": "USEND",
                "72": "Логоскор",
                "73": "MultiShip"
            }
        },
        "Dict_ClaimStatus__dictionary": {
            "title": "Статус претензии",
            "values": {
                "'generating'": "Идёт генерация",
                "'on_tracking'": "Cоздается претензия, просьба не трогать",
                "'manual_moderation'": "Сгенерена, нужна ручная проверка",
                "'waiting_for_data'": "Не хватает данных по заказам для отправки",
                "'customer_negotiation'": "На согласовании с клиентом",
                "'customer_comment_requires_reaction'": "Ответ от клиента, нужно обработать",
                "'ready_to_send'": "Готова к отправке в Почту/агрегатору",
                "'sending'": "Письма отправляются",
                "'send_error'": "Ошибка отправки",
                "'platform_negotiation'": "Отправлена аггрегатору, ждём согласования",
                "'platform_negotiation_time_elapsed'": "Истекло время согласования с агрегатором",
                "'sent_to_russian_post'": "Отправлена в Почту России, ждём ответов",
                "'closed'": "Закрыта",
                "'sent_old'": "Срок подачи более 30 дней"
            }
        },
        "Dict_ClaimWorkflow__dictionary": {
            "title": "Workflow претензии",
            "values": {
                "'basic'": "Базовая претензия",
                "'faccept'": "По FAccept-ам",
                "'customer'": "Клиентская",
                "'test'": "Тестовая"
            }
        },
        "Dict_ClaimOrderStatus__dictionary": {
            "title": "Статус включения заказа в претензию",
            "values": {"'included'": "Включен", "'excluded'": "Исключен"}
        },
        "Dict_ClaimOrderModerationStatus__dictionary": {
            "title": "Статус модерации заказа в претензии",
            "values": {
                "'pending'": "Ожидает рассмотрения",
                "'moderated'": "Рассмотрен",
                "'suspended'": "Рассмотрение отложено, подозрительный заказ"
            }
        },
        "Dict_ClaimTicketReplyStatus__dictionary": {
            "title": "Статус ответа по заказу",
            "values": {
                "'deleted'": "Удален",
                "'executed'": "Готов",
                "'pending'": "Ожидает",
                "'reacted'": "Действие проделано",
                "'draft'": "Черновик"
            }
        },
        "Dict_MoneyRequestStatus__dictionary": {
            "title": "Статус запроса",
            "values": {
                "'auto_scoring'": "Авто-скоринг",
                "'pending'": "Ожидает рассмотрения",
                "'declined'": "Отклонён",
                "'sent_waiting_bank_approval'": "Отправлен в банк, ждём подтверждения",
                "'complete'": "Полностью исполнен",
                "'partially_complete'": "Частично исполнен"
            }
        },
        "Dict_MoneyRequestType__dictionary": {
            "title": "Тип запроса",
            "values": {
                "'remainder'": "Обычное перечисление",
                "'loan'": "Ускоренные перечисления",
                "'deposit_interest_withdrawal'": "Вывод начисленных процентов на расчетный счет",
                "'deposit_withdrawal'": "Вывод средств с баланса PimPay.Доход на расчетный счет",
                "'deposit_interest_withdrawal_ndfl_by_customer'": "Уплата клиентом НДФЛ на проценты по депозиту",
                "'deposit_interest_withdrawal_ndfl_by_pimpay'": "Уплата НДФЛ компанией"
            }
        }
    },
    "groups": {
        "core": "Основные элементы",
        "agg": "Аггрегаты",
        "bool": "Логические элементы",
        "cmp": "Сравнения",
        "datetime": "Работа с датой",
        "expr": "Выражения",
        "literal": "Литералы",
        "cast": "Преобразования данных",
        "tables": "Таблицы",
        "advancedCore": "Продвинутые элементы",
        "dictionaries": "Справочники",
        "Tbl_claim__tbl_claim_order": "Тбл | Заказ в претензии",
        "Tbl_claim__tbl_claim_ticket_reply": "Тбл | Ответ по заказу",
        "Tbl_claim__tbl_claim": "Тбл | Претензия",
        "Tbl_public__tbl_order_track_information": "Тбл | Трекинг заказа",
        "Tbl_public__tbl_order_cash_on_delivery": "Тбл | Трекинг наложки",
        "Tbl_public__tbl_order_money_transaction": "Тбл | Транзакция по заказу",
        "Tbl_public__tbl_order_platform_delivery_status_history_item": "Тбл | История статусов заказа",
        "Tbl_public__tbl_delivery_service": "Тбл | Служба доставки",
        "Tbl_public__tbl_legal_entity": "Тбл | Юр. лицо",
        "Tbl_public__tbl_money_distribution_item": "Тбл | Строчка оприходования средств",
        "Tbl_public__tbl_money_distribution": "Тбл | Оприходование средств",
        "Tbl_public__tbl_money_request": "Тбл | Запрос",
        "Tbl_public__tbl_payment_order": "Тбл | Платёжное поручение",
        "Tbl_public__tbl_customer": "Тбл | Клиент",
        "Tbl_public__tbl_order": "Тбл | Заказ",
        "Tbl_public__tbl_user": "Тбл | Пользователь"
    },
    "components": {
        "Select": {
            "group": "core",
            "title": "Запрос (SELECT)",
            "color": "@coreNode",
            "in": {
                "WITH": "CTE",
                "Cols": {"title": "Колонки", "type": "Exprs"},
                "FROM": {"title": "Данные", "type": "FromClause"},
                "WHERE": {"title": "Фильтр строк", "type": "BooleanExpr"},
                "ORDER": {"title": "Сортировка", "type": "OrderByColumns"},
                "GROUP": {"title": "Группировка", "type": "Exprs"},
                "HAVING": {"title": "Фильтр групп", "type": "BooleanExpr"}
            },
            "attrs": {"Alias": "Any", "LIMIT": "Any", "OFFSET": "Any"},
            "out": {"O": "Select"}
        },
        "Subquery": {
            "group": "core",
            "color": "@coreNode",
            "title": "Подзапрос",
            "typeParams": ["T"],
            "typeBounds": {"T": {"<": "Expr"}},
            "in": {"S": "Select"},
            "attrs": {"Alias": "Identifier"},
            "out": {"O": "@T"}
        },
        "CTE": {
            "group": "core",
            "color": "@coreNode",
            "title": "CTE",
            "in": {"Prev": "CTE", "S": "Select"},
            "attrs": {"Alias": "Identifier"},
            "out": {"O": "CTE"}
        },
        "PseudoTable": {
            "group": "core",
            "color": "@coreNode",
            "title": "Псевдо таблица",
            "typeParams": ["T"],
            "typeBounds": {"T": {"<": "Expr"}},
            "in": {
                "Prev": "CTE",
                "V1": "@T",
                "V2": "@T",
                "V3": "@T",
                "V4": "@T",
                "V5": "@T",
                "V6": "@T",
                "V7": "@T",
                "V8": "@T",
                "V9": "@T",
                "V10": "@T"
            },
            "attrs": {
                "FieldAlias": {"type": "Identifier", "default": "v"},
                "CTEAlias": {"type": "Identifier", "default": "vals"}
            },
            "out": {"CTE": "CTE", "Expr": "@T"}
        },
        "SmartJoin": {
            "group": "core",
            "color": "@coreNode",
            "title": "Авто JOIN",
            "in": {"Prev": "FromClause", "L": "Table", "R": "Table"},
            "attrs": {"Type": {"default": "INNER", "valuePicker": {"type": "dictionary", "dictionary": "JoinTypes"}}},
            "out": {"O": "FromClause"}
        },
        "PlainJoin": {
            "group": "advancedCore",
            "color": "@coreNode",
            "title": "JOIN",
            "in": {"Prev": "FromClause", "L": "Relation", "R": "Relation", "ON": "BooleanExpr"},
            "attrs": {"Type": {"default": "INNER", "valuePicker": {"type": "dictionary", "dictionary": "JoinTypes"}}},
            "out": {"O": "FromClause"}
        },
        "PickColumn": {
            "group": "core",
            "title": "Выбрать колонку",
            "color": "@auxCoreNode",
            "in": {"R": {"title": "Relation", "type": "Relation"}},
            "attrs": {
                "C": {"title": "Name", "type": "Identifier", "default": "id"},
                "A": {"title": "Alias", "type": "Identifier"}
            },
            "out": {"O": {"type": "Expr"}}
        },
        "AllColumns": {
            "group": "core",
            "color": "@auxCoreNode",
            "title": "Все колонки (*)",
            "in": {"R": {"title": "Relation", "type": "Relation"}},
            "out": {"O": {"type": "Exprs"}}
        },
        "Gather3Columns": {
            "group": "core",
            "color": "@auxCoreNode",
            "title": "3 колонки",
            "in": {"C1": "Exprs", "C2": "Exprs", "C3": "Exprs"},
            "out": {"O": {"type": "Exprs"}}
        },
        "Gather5Columns": {
            "group": "core",
            "color": "@auxCoreNode",
            "title": "5 колонок",
            "in": {"C1": "Exprs", "C2": "Exprs", "C3": "Exprs", "C4": "Exprs", "C5": "Exprs"},
            "out": {"O": {"type": "Exprs"}}
        },
        "Gather10Columns": {
            "group": "core",
            "color": "@auxCoreNode",
            "title": "10 колонок",
            "in": {
                "C1": "Exprs",
                "C2": "Exprs",
                "C3": "Exprs",
                "C4": "Exprs",
                "C5": "Exprs",
                "C6": "Exprs",
                "C7": "Exprs",
                "C8": "Exprs",
                "C9": "Exprs",
                "C10": "Exprs"
            },
            "out": {"O": {"type": "Exprs"}}
        },
        "OrderBy": {
            "group": "core",
            "color": "@auxCoreNode",
            "title": "Сортировка",
            "in": {
                "Prev": {"title": "Предыдущие", "type": "OrderByColumns"},
                "E": {"title": "Выражение", "type": "Expr"}
            },
            "attrs": {
                "D": {
                    "title": "Порядок",
                    "default": "ASC",
                    "valuePicker": {"type": "dictionary", "dictionary": "SortDirections"}
                }
            },
            "out": {"O": {"type": "OrderByColumns"}}
        },
        "GroupBy": {
            "group": "core",
            "color": "@auxCoreNode",
            "title": "Группировка",
            "in": {"Prev": {"title": "Предыдущие", "type": "Exprs"}, "A": "Expr", "B": "Expr", "C": "Expr"},
            "out": {"O": {"type": "Exprs"}}
        },
        "Aggregate": {
            "group": "agg",
            "color": "@auxCoreNode",
            "title": "Аггрегат",
            "in": {"Expr": "Expr", "FILTER": "BooleanExpr"},
            "attrs": {
                "Type": {
                    "valuePicker": {"type": "dictionary", "dictionary": "AggregateTypes"},
                    "default": "COUNT"
                }, "Alias": {"type": "Identifier", "default": "cnt"}
            },
            "out": {"O": "Expr"}
        },
        "BooleanAnd": {
            "group": "bool",
            "color": "@logicNode",
            "title": "И (AND)",
            "in": {"A": {"title": "A", "type": "BooleanExpr"}, "B": {"title": "A", "type": "BooleanExpr"}},
            "out": {"O": {"title": "AND", "type": "BooleanExpr"}}
        },
        "BooleanOr": {
            "group": "bool",
            "color": "@logicNode",
            "title": "ИЛИ (OR)",
            "in": {"A": {"title": "A", "type": "BooleanExpr"}, "B": {"title": "A", "type": "BooleanExpr"}},
            "out": {"O": {"title": "O", "type": "BooleanExpr"}}
        },
        "BooleanNot": {
            "group": "bool",
            "color": "@logicNode",
            "title": "НЕ (NOT)",
            "in": {"I": "BooleanExpr"},
            "out": {"O": "BooleanExpr"}
        },
        "BinOp_Plus": {
            "group": "expr",
            "color": "@exprNode",
            "title": "Плюс (+)",
            "typeParams": ["T"],
            "typeBounds": {"T": {"<": "Expr"}},
            "in": {"A": "@T", "B": "@T"},
            "out": {"O": "@T"}
        },
        "BinOp_Minus": {
            "group": "expr",
            "color": "@exprNode",
            "title": "Минус (-)",
            "typeParams": ["T"],
            "typeBounds": {"T": {"<": "Expr"}},
            "in": {"A": "@T", "B": "@T"},
            "out": {"O": "@T"}
        },
        "BinOp_Mul": {
            "group": "expr",
            "color": "@exprNode",
            "title": "Умножить (*)",
            "typeParams": ["T"],
            "typeBounds": {"T": {"<": "Expr"}},
            "in": {"A": "@T", "B": "@T"},
            "out": {"O": "@T"}
        },
        "BinOp_Div": {
            "group": "expr",
            "color": "@exprNode",
            "title": "Поделить (/)",
            "typeParams": ["T"],
            "typeBounds": {"T": {"<": "Expr"}},
            "in": {"A": "@T", "B": "@T"},
            "out": {"O": "@T"}
        },
        "BinOp_Eq": {
            "group": "cmp",
            "color": "@exprNode",
            "title": "Равняется (=)",
            "in": {"A": {"title": "A", "type": "Expr"}, "B": {"title": "B", "type": "Expr"}},
            "out": {"O": {"title": "O", "type": "BooleanExpr"}}
        },
        "BinOp_NotEq": {
            "group": "cmp",
            "color": "@exprNode",
            "title": "НЕ равняется (!=)",
            "in": {"A": {"title": "A", "type": "Expr"}, "B": {"title": "B", "type": "Expr"}},
            "out": {"O": {"title": "O", "type": "BooleanExpr"}}
        },
        "In": {
            "group": "cmp",
            "color": "@logicNode",
            "title": "Одно из (IN)",
            "in": {"E": "Expr", "I1": "Expr", "I2": "Expr", "I3": "Expr", "I4": "Expr", "I5": "Expr"},
            "out": {"O": "BooleanExpr"}
        },
        "NotIn": {
            "group": "cmp",
            "color": "@logicNode",
            "title": "Не одно из (NOT IN)",
            "in": {"E": "Expr", "I1": "Expr", "I2": "Expr", "I3": "Expr", "I4": "Expr", "I5": "Expr"},
            "out": {"O": "BooleanExpr"}
        },
        "BinOp_Lt": {
            "group": "cmp",
            "color": "@exprNode",
            "title": "Меньше (<)",
            "in": {"A": "Expr", "B": "Expr"},
            "out": {"O": "BooleanExpr"}
        },
        "BinOp_LtEq": {
            "group": "cmp",
            "color": "@exprNode",
            "title": "Меньше или равно (<=)",
            "in": {"A": "Expr", "B": "Expr"},
            "out": {"O": "BooleanExpr"}
        },
        "BinOp_Gt": {
            "group": "cmp",
            "color": "@exprNode",
            "title": "Больше (>)",
            "in": {"A": "Expr", "B": "Expr"},
            "out": {"O": "BooleanExpr"}
        },
        "BinOp_GtEq": {
            "group": "cmp",
            "color": "@exprNode",
            "title": "Больше либо равно (>=)",
            "in": {"A": "Expr", "B": "Expr"},
            "out": {"O": "BooleanExpr"}
        },
        "Between": {
            "group": "cmp",
            "color": "@exprNode",
            "title": "От и до (BETWEEN)",
            "in": {"E": "Expr", "L": "Expr", "R": "Expr"},
            "out": {"O": "BooleanExpr"}
        },
        "IsNull": {
            "group": "cmp",
            "color": "@exprNode",
            "title": "Пустое? (IS NULL)",
            "in": {"I": "Expr"},
            "out": {"O": "BooleanExpr"}
        },
        "IsNotNull": {
            "group": "cmp",
            "color": "@exprNode",
            "title": "Не пустое? (IS NOT NULL)",
            "in": {"I": "Expr"},
            "out": {"O": "BooleanExpr"}
        },
        "TextLiteral": {"group": "literal", "title": "Строка", "attrs": {"V": "TextExpr"}, "out": {"O": "TextExpr"}},
        "NumericLiteral": {
            "group": "literal",
            "title": "Число",
            "attrs": {"V": {"type": "NumericExpr", "title": "=", "default": "0"}},
            "out": {"O": "NumericExpr"}
        },
        "NullLiteral": {"group": "literal", "title": null, "out": {"O": "NullExpr"}},
        "CurrentDate": {"group": "datetime", "title": "Текущая дата", "out": {"O": "DateExpr"}},
        "DateLiteral": {
            "group": "datetime",
            "title": "Выбрать дату",
            "attrs": {
                "Year": {"type": "IdExpr", "title": "Год", "default": 2017},
                "Month": {
                    "type": "IdExpr",
                    "title": "Месяц",
                    "default": 1,
                    "valuePicker": {"type": "dictionary", "dictionary": "Months"}
                },
                "Day": {"type": "IdExpr", "title": "День", "default": 1}
            },
            "out": {"O": "DateExpr"}
        },
        "IntervalLiteral": {
            "group": "datetime",
            "title": "Интервал дат",
            "attrs": {
                "N": {"type": "Any", "default": 1},
                "Type": {
                    "type": "Any",
                    "default": "day",
                    "valuePicker": {"type": "dictionary", "dictionary": "IntervalTypes"}
                }
            },
            "out": {"O": "IntervalExpr"}
        },
        "DatePlusMinusInteval": {
            "group": "datetime",
            "title": "Дата +/- интервал",
            "in": {"Date": "DateExpr", "Interval": "NumericExpr"},
            "attrs": {
                "Operation": {
                    "type": "TextExpr",
                    "title": "+/-",
                    "default": "+",
                    "valuePicker": {"type": "dictionary", "dictionary": "PlusMinus"}
                }
            },
            "out": {"O": "DateExpr"}
        },
        "DateRange": {
            "group": "datetime",
            "title": "Создать даты в периоде",
            "in": {"Prev": "CTE", "From": "DateExpr", "To": "DateExpr", "Interval": "IntervalExpr"},
            "attrs": {
                "FieldAlias": {"type": "Identifier", "default": "d"},
                "CTEAlias": {"type": "Identifier", "default": "date_ranges"}
            },
            "out": {"CTE": "CTE", "Expr": "DateExpr"}
        },
        "FirstDayOfMonth": {
            "group": "datetime",
            "title": "Первый день месяца",
            "in": {"D": "DateExpr"},
            "out": {"O": "DateExpr"}
        },
        "LastDayOfMonth": {
            "group": "datetime",
            "title": "Последний день месяца",
            "in": {"D": "DateExpr"},
            "out": {"O": "DateExpr"}
        },
        "AliasExpr": {
            "group": "core",
            "title": "Синоним выражения",
            "typeParams": ["T"],
            "typeBounds": {"T": {"<": "Expr"}},
            "in": {"E": "@T"},
            "attrs": {"Alias": {"type": "Identifier", "default": "alias"}},
            "out": {"O": "@T"}
        },
        "CustomSql": {
            "group": "core",
            "color": "@coreNode",
            "title": "Custom SQL",
            "typeParams": ["T"],
            "attrs": {
                "SQL": "@T",
                "Quote": {
                    "title": "В кавычки?",
                    "type": "Any",
                    "default": false,
                    "valuePicker": {"type": "dictionary", "dictionary": "YesNo"}
                }
            },
            "out": {"O": "@T"}
        },
        "CastExprOnBlueprint": {
            "group": "core",
            "title": "~>",
            "typeParams": ["T"],
            "typeBounds": {"T": {"<": "Expr"}},
            "in": {"I": "Expr"},
            "out": {"O": "@T"}
        },
        "CastToDate": {"group": "cast", "title": "Преобразовать в дату", "in": {"E": "Expr"}, "out": {"O": "DateExpr"}},
        "CastToText": {
            "group": "cast",
            "title": "Преобразовать в текст",
            "in": {"E": "Expr"},
            "out": {"O": "TextExpr"}
        },
        "CastToNumeric": {
            "group": "cast",
            "title": "Преобразовать в число",
            "in": {"E": "Expr"},
            "out": {"O": "NumericExpr"}
        },
        "Repeat": {"group": "core", "title": "->>-", "typeParams": ["T"], "in": {"I": "@T"}, "out": {"O": "@T"}},
        "AccountingFn": {
            "group": "core",
            "title": "ОСВ",
            "in": {
                "Account": {"title": "Счёт", "type": "TextExpr"},
                "CustomerID": {"title": "ID Клиента", "type": "IdExpr"},
                "Platform": {"title": "Площадка", "type": "TextExpr"},
                "From": {"title": "Период от (вкл.)", "type": "DateExpr"},
                "To": {"title": "Период до (вкл.)", "type": "DateExpr"}
            },
            "attrs": {
                "Type": {
                    "title": "Тип",
                    "type": "TextExpr",
                    "default": "DebitBalance",
                    "valuePicker": {"type": "dictionary", "dictionary": "AccountingFunctionTypes"}
                }, "Alias": {"type": "Identifier"}
            },
            "out": {"O": "NumericExpr"}
        },
        "OrderDetails": {
            "group": "Tbl_public__tbl_order",
            "title": "Детали заказа",
            "in": {"T": "Order"},
            "attrs": {
                "Field": {
                    "title": "Поле",
                    "type": "TextExpr",
                    "default": "f103_date",
                    "valuePicker": {"type": "dictionary", "dictionary": "OrderDetailsConsts"}
                }, "Alias": {"type": "Identifier", "default": "f103_date"}
            },
            "out": {"O": "TextExpr"}
        },
        "Tbl_claim__tbl_claim_order": {
            "title": "Тбл: Заказ в претензии",
            "group": "tables",
            "color": "@tableNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "co"}},
            "out": {"O": "ClaimOrder"}
        },
        "Col_claim__tbl_claim_order__id": {
            "title": "ID",
            "group": "Tbl_claim__tbl_claim_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "id"}},
            "in": {"T": "ClaimOrder"},
            "out": {"O": "IdExpr"}
        },
        "Col_claim__tbl_claim_order__claim_id": {
            "title": "ID претензии",
            "group": "Tbl_claim__tbl_claim_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "claim_id"}},
            "in": {"T": "ClaimOrder"},
            "out": {"O": "IdExpr"}
        },
        "Col_claim__tbl_claim_order__order_id": {
            "title": "ID заказа",
            "group": "Tbl_claim__tbl_claim_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "order_id"}},
            "in": {"T": "ClaimOrder"},
            "out": {"O": "IdExpr"}
        },
        "Col_claim__tbl_claim_order__status": {
            "title": "Статус вхождения",
            "group": "Tbl_claim__tbl_claim_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "status"}},
            "in": {"T": "ClaimOrder"},
            "out": {"O": "TextExpr"}
        },
        "Col_claim__tbl_claim_order__moderation_status": {
            "title": "Статус модерации",
            "group": "Tbl_claim__tbl_claim_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "moderation_status"}},
            "in": {"T": "ClaimOrder"},
            "out": {"O": "TextExpr"}
        },
        "Tbl_claim__tbl_claim_ticket_reply": {
            "title": "Тбл: Ответ по заказу",
            "group": "tables",
            "color": "@tableNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "reply"}},
            "out": {"O": "ClaimTicketReply"}
        },
        "Col_claim__tbl_claim_ticket_reply__id": {
            "title": "ID",
            "group": "Tbl_claim__tbl_claim_ticket_reply",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "id"}},
            "in": {"T": "ClaimTicketReply"},
            "out": {"O": "IdExpr"}
        },
        "Col_claim__tbl_claim_ticket_reply__order_id": {
            "title": "ID заказа",
            "group": "Tbl_claim__tbl_claim_ticket_reply",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "order_id"}},
            "in": {"T": "ClaimTicketReply"},
            "out": {"O": "IdExpr"}
        },
        "Col_claim__tbl_claim_ticket_reply__decision": {
            "title": "Решение",
            "group": "Tbl_claim__tbl_claim_ticket_reply",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "decision"}},
            "in": {"T": "ClaimTicketReply"},
            "out": {"O": "TextExpr"}
        },
        "Col_claim__tbl_claim_ticket_reply__created_at": {
            "title": "Время создания",
            "group": "Tbl_claim__tbl_claim_ticket_reply",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "created_at"}},
            "in": {"T": "ClaimTicketReply"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_claim__tbl_claim_ticket_reply__status": {
            "title": "Статус",
            "group": "Tbl_claim__tbl_claim_ticket_reply",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "status"}},
            "in": {"T": "ClaimTicketReply"},
            "out": {"O": "TextExpr"}
        },
        "Tbl_claim__tbl_claim": {
            "title": "Тбл: Претензия",
            "group": "tables",
            "color": "@tableNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "clm"}},
            "out": {"O": "Claim"}
        },
        "Col_claim__tbl_claim__id": {
            "title": "ID",
            "group": "Tbl_claim__tbl_claim",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "id"}},
            "in": {"T": "Claim"},
            "out": {"O": "IdExpr"}
        },
        "Col_claim__tbl_claim__type": {
            "title": "Тип претензии (адаптер)",
            "group": "Tbl_claim__tbl_claim",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "type"}},
            "in": {"T": "Claim"},
            "out": {"O": "TextExpr"}
        },
        "Col_claim__tbl_claim__customer_id": {
            "title": "ID Клиента",
            "group": "Tbl_claim__tbl_claim",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "customer_id"}},
            "in": {"T": "Claim"},
            "out": {"O": "IdExpr"}
        },
        "Col_claim__tbl_claim__platform": {
            "title": "Площадка",
            "group": "Tbl_claim__tbl_claim",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "platform"}},
            "in": {"T": "Claim"},
            "out": {"O": "TextExpr"}
        },
        "Col_claim__tbl_claim__delivery_service_id": {
            "title": "ID Службы доставки",
            "group": "Tbl_claim__tbl_claim",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "delivery_service_id"}},
            "in": {"T": "Claim"},
            "out": {"O": "IdExpr"}
        },
        "Col_claim__tbl_claim__status": {
            "title": "Статус претензии",
            "group": "Tbl_claim__tbl_claim",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "status"}},
            "in": {"T": "Claim"},
            "out": {"O": "TextExpr"}
        },
        "Col_claim__tbl_claim__created_at": {
            "title": "Время создания",
            "group": "Tbl_claim__tbl_claim",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "created_at"}},
            "in": {"T": "Claim"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_claim__tbl_claim__workflow": {
            "title": "Workflow",
            "group": "Tbl_claim__tbl_claim",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "workflow"}},
            "in": {"T": "Claim"},
            "out": {"O": "TextExpr"}
        },
        "Tbl_public__tbl_order_track_information": {
            "title": "Тбл: Трекинг заказа",
            "group": "tables",
            "color": "@tableNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "oti"}},
            "out": {"O": "OrderTrackInformation"}
        },
        "Col_public__tbl_order_track_information__id": {
            "title": "ID",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "id"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_order_track_information__order_id": {
            "title": "ID Заказа",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "order_id"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_order_track_information__barcode": {
            "title": "ШПИ",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "barcode"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_track_information__destination_index": {
            "title": "Индекс назначения",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "destination_index"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_track_information__destination_address": {
            "title": "Адрес назначения",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "destination_address"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_track_information__origin_address": {
            "title": "Адрес отправки",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "origin_address"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_track_information__origin_index": {
            "title": "Индекс отправки",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "origin_index"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_track_information__complex_item_name": {
            "title": "Вид и категория отправления",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "complex_item_name"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_track_information__mail_type_id": {
            "title": "Код вида почтового отправления",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "mail_type_id"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_order_track_information__mail_type_name": {
            "title": "Название вида почтового отправления",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "mail_type_name"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_track_information__mail_ctg_id": {
            "title": "Код категории почтового отправления",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "mail_ctg_id"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_order_track_information__mail_ctg_name": {
            "title": "Название категории почтового отправления",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "mail_ctg_name"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_track_information__payment": {
            "title": "Сумма наложенного платежа",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "payment"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "NumericExpr"}
        },
        "Col_public__tbl_order_track_information__value": {
            "title": "Сумма объявленной ценности",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "value"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "NumericExpr"}
        },
        "Col_public__tbl_order_track_information__mass_rate": {
            "title": "Общая сумма платы за пересылку наземным и воздушным транспортом",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "mass_rate"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "NumericExpr"}
        },
        "Col_public__tbl_order_track_information__insurance_rate": {
            "title": "Сумма платы за объявленную ценность",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "insurance_rate"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "NumericExpr"}
        },
        "Col_public__tbl_order_track_information__air_rate": {
            "title": "Выделенная сумма платы за пересылку воздушным транспортом из общей суммы платы за пересылку",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "air_rate"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "NumericExpr"}
        },
        "Col_public__tbl_order_track_information__rate": {
            "title": "Сумма дополнительного тарифного сбора",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "rate"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "NumericExpr"}
        },
        "Col_public__tbl_order_track_information__mass": {
            "title": "Вес отправления в граммах",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "mass"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "NumericExpr"}
        },
        "Col_public__tbl_order_track_information__oper_type_id": {
            "title": "Код операции над отправлением",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "oper_type_id"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_order_track_information__oper_type_name": {
            "title": "Название операции над отправлением",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "oper_type_name"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_track_information__oper_attr_id": {
            "title": "Код атрибута операции над отправлением",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "oper_attr_id"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "NumericExpr"}
        },
        "Col_public__tbl_order_track_information__oper_attr_name": {
            "title": "Название атрибута операции над отправлением",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "oper_attr_name"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_track_information__oper_date": {
            "title": "Время и время проведения последней операции",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "oper_date"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_order_track_information__delivery_status": {
            "title": "Последний статус доставки Pimpay",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "delivery_status"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_track_information__xml_data": {
            "title": "Raw xml",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "xml_data"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_track_information__first_oper_date": {
            "title": "Время и время проведения первой операции",
            "group": "Tbl_public__tbl_order_track_information",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "first_oper_date"}},
            "in": {"T": "OrderTrackInformation"},
            "out": {"O": "TimestampExpr"}
        },
        "Tbl_public__tbl_order_cash_on_delivery": {
            "title": "Тбл: Трекинг наложки",
            "group": "tables",
            "color": "@tableNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "cash"}},
            "out": {"O": "OrderCashOnDelivery"}
        },
        "Col_public__tbl_order_cash_on_delivery__id": {
            "title": "ID",
            "group": "Tbl_public__tbl_order_cash_on_delivery",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "id"}},
            "in": {"T": "OrderCashOnDelivery"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_order_cash_on_delivery__order_id": {
            "title": "ID Заказа",
            "group": "Tbl_public__tbl_order_cash_on_delivery",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "order_id"}},
            "in": {"T": "OrderCashOnDelivery"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_order_cash_on_delivery__type": {
            "title": "Тип",
            "group": "Tbl_public__tbl_order_cash_on_delivery",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "type"}},
            "in": {"T": "OrderCashOnDelivery"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_cash_on_delivery__number": {
            "title": "Номер",
            "group": "Tbl_public__tbl_order_cash_on_delivery",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "number"}},
            "in": {"T": "OrderCashOnDelivery"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_order_cash_on_delivery__date": {
            "title": "Дата",
            "group": "Tbl_public__tbl_order_cash_on_delivery",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "date"}},
            "in": {"T": "OrderCashOnDelivery"},
            "out": {"O": "DateExpr"}
        },
        "Col_public__tbl_order_cash_on_delivery__origin_index": {
            "title": "Индекс отправителя",
            "group": "Tbl_public__tbl_order_cash_on_delivery",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "origin_index"}},
            "in": {"T": "OrderCashOnDelivery"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_cash_on_delivery__recipient_index": {
            "title": "Индекс получателя",
            "group": "Tbl_public__tbl_order_cash_on_delivery",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "recipient_index"}},
            "in": {"T": "OrderCashOnDelivery"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_cash_on_delivery__sum": {
            "title": "Сумма",
            "group": "Tbl_public__tbl_order_cash_on_delivery",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "sum"}},
            "in": {"T": "OrderCashOnDelivery"},
            "out": {"O": "NumericExpr"}
        },
        "Tbl_public__tbl_order_money_transaction": {
            "title": "Тбл: Транзакция по заказу",
            "group": "tables",
            "color": "@tableNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "otx"}},
            "out": {"O": "OrderMoneyTransaction"}
        },
        "Col_public__tbl_order_money_transaction__id": {
            "title": "ID",
            "group": "Tbl_public__tbl_order_money_transaction",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "id"}},
            "in": {"T": "OrderMoneyTransaction"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_order_money_transaction__order_id": {
            "title": "ID Заказа",
            "group": "Tbl_public__tbl_order_money_transaction",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "order_id"}},
            "in": {"T": "OrderMoneyTransaction"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_order_money_transaction__type": {
            "title": "Тип проводки",
            "group": "Tbl_public__tbl_order_money_transaction",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "type"}},
            "in": {"T": "OrderMoneyTransaction"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_money_transaction__amount": {
            "title": "Сумма",
            "group": "Tbl_public__tbl_order_money_transaction",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "amount"}},
            "in": {"T": "OrderMoneyTransaction"},
            "out": {"O": "NumericExpr"}
        },
        "Col_public__tbl_order_money_transaction__created_at": {
            "title": "Время регистрации проводки",
            "group": "Tbl_public__tbl_order_money_transaction",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "created_at"}},
            "in": {"T": "OrderMoneyTransaction"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_order_money_transaction__money_distribution_item_id": {
            "title": "ID оприходования",
            "group": "Tbl_public__tbl_order_money_transaction",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "money_distribution_item_id"}},
            "in": {"T": "OrderMoneyTransaction"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_order_money_transaction__accounting_transaction_id": {
            "title": "ID бухглатерской проводки",
            "group": "Tbl_public__tbl_order_money_transaction",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "accounting_transaction_id"}},
            "in": {"T": "OrderMoneyTransaction"},
            "out": {"O": "IdExpr"}
        },
        "Tbl_public__tbl_order_platform_delivery_status_history_item": {
            "title": "Тбл: История статусов заказа",
            "group": "tables",
            "color": "@tableNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "h"}},
            "out": {"O": "OrderPlatformDeliveryStatusHistoryItem"}
        },
        "Col_public__tbl_order_platform_delivery_status_history_item__id": {
            "title": "ID",
            "group": "Tbl_public__tbl_order_platform_delivery_status_history_item",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "id"}},
            "in": {"T": "OrderPlatformDeliveryStatusHistoryItem"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_order_platform_delivery_status_history_item__order_id": {
            "title": "ID заказа",
            "group": "Tbl_public__tbl_order_platform_delivery_status_history_item",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "order_id"}},
            "in": {"T": "OrderPlatformDeliveryStatusHistoryItem"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_order_platform_delivery_status_history_item__status": {
            "title": "Статус PimPay",
            "group": "Tbl_public__tbl_order_platform_delivery_status_history_item",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "status"}},
            "in": {"T": "OrderPlatformDeliveryStatusHistoryItem"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_platform_delivery_status_history_item__platform_status": {
            "title": "Статус на площадке",
            "group": "Tbl_public__tbl_order_platform_delivery_status_history_item",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "platform_status"}},
            "in": {"T": "OrderPlatformDeliveryStatusHistoryItem"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_platform_delivery_status_history_item__delivery_service_status": {
            "title": "Статус у СД",
            "group": "Tbl_public__tbl_order_platform_delivery_status_history_item",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "delivery_service_status"}},
            "in": {"T": "OrderPlatformDeliveryStatusHistoryItem"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order_platform_delivery_status_history_item__platform_time": {
            "title": "Время на площадке",
            "group": "Tbl_public__tbl_order_platform_delivery_status_history_item",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "platform_time"}},
            "in": {"T": "OrderPlatformDeliveryStatusHistoryItem"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_order_platform_delivery_status_history_item__total_cost_for_recipient": {
            "title": "Сумма",
            "group": "Tbl_public__tbl_order_platform_delivery_status_history_item",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "total_cost_for_recipient"}},
            "in": {"T": "OrderPlatformDeliveryStatusHistoryItem"},
            "out": {"O": "NumericExpr"}
        },
        "Col_public__tbl_order_platform_delivery_status_history_item__created_at": {
            "title": "Время записи статуса",
            "group": "Tbl_public__tbl_order_platform_delivery_status_history_item",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "created_at"}},
            "in": {"T": "OrderPlatformDeliveryStatusHistoryItem"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_order_platform_delivery_status_history_item__zipcode": {
            "title": "Индекс",
            "group": "Tbl_public__tbl_order_platform_delivery_status_history_item",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "zipcode"}},
            "in": {"T": "OrderPlatformDeliveryStatusHistoryItem"},
            "out": {"O": "TextExpr"}
        },
        "Tbl_public__tbl_delivery_service": {
            "title": "Тбл: Служба доставки",
            "group": "tables",
            "color": "@tableNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "ds"}},
            "out": {"O": "DeliveryService"}
        },
        "Col_public__tbl_delivery_service__id": {
            "title": "ID",
            "group": "Tbl_public__tbl_delivery_service",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "id"}},
            "in": {"T": "DeliveryService"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_delivery_service__name": {
            "title": "Название",
            "group": "Tbl_public__tbl_delivery_service",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "name"}},
            "in": {"T": "DeliveryService"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_delivery_service__connector": {
            "title": "Код адаптера",
            "group": "Tbl_public__tbl_delivery_service",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "connector"}},
            "in": {"T": "DeliveryService"},
            "out": {"O": "TextExpr"}
        },
        "Tbl_public__tbl_legal_entity": {
            "title": "Тбл: Юр. лицо",
            "group": "tables",
            "color": "@tableNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "le"}},
            "out": {"O": "LegalEntity"}
        },
        "Col_public__tbl_legal_entity__id": {
            "title": "ID",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "id"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_legal_entity__inn": {
            "title": "ИНН",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "inn"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_legal_entity__name": {
            "title": "Название компании",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "name"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_legal_entity__form_of_institution": {
            "title": "Правовая форма",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "form_of_institution"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_legal_entity__legal_address": {
            "title": "Юридический адрес",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "legal_address"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_legal_entity__physical_address": {
            "title": "Физический адрес",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "physical_address"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_legal_entity__ogrn": {
            "title": "ОРГНИП",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "ogrn"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_legal_entity__kpp": {
            "title": "КПП",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "kpp"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_legal_entity__okved": {
            "title": "Код ОКВЭД",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "okved"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_legal_entity__okpo": {
            "title": "Код ОКПО",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "okpo"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_legal_entity__cert_series": {
            "title": "Серия свидетельства о регистрации",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "cert_series"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_legal_entity__cert_num": {
            "title": "Номер свидетельства о регистрации",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "cert_num"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_legal_entity__cert_date": {
            "title": "Время свидетельства о регистрации",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "cert_date"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_legal_entity__fio": {
            "title": "ФИО гендиректора",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "fio"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_legal_entity__fio_genetive": {
            "title": "ФИО гендиректора в родителном падеже",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "fio_genetive"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_legal_entity__accountant_fio": {
            "title": "ФИО главного бухгалтера",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "accountant_fio"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_legal_entity__phone": {
            "title": "Номер телефона",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "phone"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_legal_entity__email": {
            "title": "Email",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "email"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_legal_entity__created_at": {
            "title": "Время создания записи",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "created_at"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_legal_entity__updated_at": {
            "title": "Время обновления записи",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "updated_at"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_legal_entity__passport": {
            "title": "Паспорт",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "passport"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_legal_entity__birth_date": {
            "title": "Дата рождения",
            "group": "Tbl_public__tbl_legal_entity",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "birth_date"}},
            "in": {"T": "LegalEntity"},
            "out": {"O": "DateExpr"}
        },
        "Tbl_public__tbl_money_distribution_item": {
            "title": "Тбл: Строчка оприходования средств",
            "group": "tables",
            "color": "@tableNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "mdi"}},
            "out": {"O": "MoneyDistributionItem"}
        },
        "Col_public__tbl_money_distribution_item__id": {
            "title": "ID",
            "group": "Tbl_public__tbl_money_distribution_item",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "id"}},
            "in": {"T": "MoneyDistributionItem"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_money_distribution_item__money_distribution_id": {
            "title": "К какому оприходованию средств относится",
            "group": "Tbl_public__tbl_money_distribution_item",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "money_distribution_id"}},
            "in": {"T": "MoneyDistributionItem"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_money_distribution_item__customer_id": {
            "title": "ID Клиента",
            "group": "Tbl_public__tbl_money_distribution_item",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "customer_id"}},
            "in": {"T": "MoneyDistributionItem"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_money_distribution_item__platform": {
            "title": "Плошадка",
            "group": "Tbl_public__tbl_money_distribution_item",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "platform"}},
            "in": {"T": "MoneyDistributionItem"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_money_distribution_item__status": {
            "title": "Статус записи",
            "group": "Tbl_public__tbl_money_distribution_item",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "status"}},
            "in": {"T": "MoneyDistributionItem"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_money_distribution_item__available_sum": {
            "title": "Сумма",
            "group": "Tbl_public__tbl_money_distribution_item",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "available_sum"}},
            "in": {"T": "MoneyDistributionItem"},
            "out": {"O": "NumericExpr"}
        },
        "Tbl_public__tbl_money_distribution": {
            "title": "Тбл: Оприходование средств",
            "group": "tables",
            "color": "@tableNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "md"}},
            "out": {"O": "MoneyDistribution"}
        },
        "Col_public__tbl_money_distribution__id": {
            "title": "ID",
            "group": "Tbl_public__tbl_money_distribution",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "id"}},
            "in": {"T": "MoneyDistribution"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_money_distribution__type": {
            "title": "Тип/схема распределения",
            "group": "Tbl_public__tbl_money_distribution",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "type"}},
            "in": {"T": "MoneyDistribution"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_money_distribution__status": {
            "title": "Текущий статус",
            "group": "Tbl_public__tbl_money_distribution",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "status"}},
            "in": {"T": "MoneyDistribution"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_money_distribution__platform": {
            "title": "Площадка",
            "group": "Tbl_public__tbl_money_distribution",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "platform"}},
            "in": {"T": "MoneyDistribution"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_money_distribution__payment_order_id": {
            "title": "Платёжное поручение",
            "group": "Tbl_public__tbl_money_distribution",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "payment_order_id"}},
            "in": {"T": "MoneyDistribution"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_money_distribution__comment": {
            "title": "Комментарий",
            "group": "Tbl_public__tbl_money_distribution",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "comment"}},
            "in": {"T": "MoneyDistribution"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_money_distribution__created_at": {
            "title": "Время создания",
            "group": "Tbl_public__tbl_money_distribution",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "created_at"}},
            "in": {"T": "MoneyDistribution"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_money_distribution__updated_at": {
            "title": "Время последнего изменения",
            "group": "Tbl_public__tbl_money_distribution",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "updated_at"}},
            "in": {"T": "MoneyDistribution"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_money_distribution__customer_id": {
            "title": "ID Клиента",
            "group": "Tbl_public__tbl_money_distribution",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "customer_id"}},
            "in": {"T": "MoneyDistribution"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_money_distribution__operational_day_id": {
            "title": "ID Опер. дня",
            "group": "Tbl_public__tbl_money_distribution",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "operational_day_id"}},
            "in": {"T": "MoneyDistribution"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_money_distribution__customer_agreement_id": {
            "title": "ID Договора клиента",
            "group": "Tbl_public__tbl_money_distribution",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "customer_agreement_id"}},
            "in": {"T": "MoneyDistribution"},
            "out": {"O": "IdExpr"}
        },
        "Tbl_public__tbl_money_request": {
            "title": "Тбл: Запрос",
            "group": "tables",
            "color": "@tableNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "mr"}},
            "out": {"O": "MoneyRequest"}
        },
        "Col_public__tbl_money_request__id": {
            "title": "ID",
            "group": "Tbl_public__tbl_money_request",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "id"}},
            "in": {"T": "MoneyRequest"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_money_request__created_by_user_id": {
            "title": "Кем создан",
            "group": "Tbl_public__tbl_money_request",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "created_by_user_id"}},
            "in": {"T": "MoneyRequest"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_money_request__type": {
            "title": "Тип",
            "group": "Tbl_public__tbl_money_request",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "type"}},
            "in": {"T": "MoneyRequest"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_money_request__status": {
            "title": "Статус",
            "group": "Tbl_public__tbl_money_request",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "status"}},
            "in": {"T": "MoneyRequest"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_money_request__payment_order_id": {
            "title": "Платёжное поручение (ПП)",
            "group": "Tbl_public__tbl_money_request",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "payment_order_id"}},
            "in": {"T": "MoneyRequest"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_money_request__total_to_pay": {
            "title": "Итого к выплате",
            "group": "Tbl_public__tbl_money_request",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "total_to_pay"}},
            "in": {"T": "MoneyRequest"},
            "out": {"O": "NumericExpr"}
        },
        "Col_public__tbl_money_request__created_at": {
            "title": "Время создания",
            "group": "Tbl_public__tbl_money_request",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "created_at"}},
            "in": {"T": "MoneyRequest"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_money_request__updated_at": {
            "title": "Время изменения",
            "group": "Tbl_public__tbl_money_request",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "updated_at"}},
            "in": {"T": "MoneyRequest"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_money_request__draft_payment_order_id": {
            "title": "Черновик ПП",
            "group": "Tbl_public__tbl_money_request",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "draft_payment_order_id"}},
            "in": {"T": "MoneyRequest"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_money_request__customer_id": {
            "title": "ID клиента",
            "group": "Tbl_public__tbl_money_request",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "customer_id"}},
            "in": {"T": "MoneyRequest"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_money_request__platform": {
            "title": "Площадка",
            "group": "Tbl_public__tbl_money_request",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "platform"}},
            "in": {"T": "MoneyRequest"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_money_request__customer_agreement_id": {
            "title": "ID договора клиента",
            "group": "Tbl_public__tbl_money_request",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "customer_agreement_id"}},
            "in": {"T": "MoneyRequest"},
            "out": {"O": "IdExpr"}
        },
        "Tbl_public__tbl_payment_order": {
            "title": "Тбл: Платёжное поручение",
            "group": "tables",
            "color": "@tableNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "po"}},
            "out": {"O": "PaymentOrder"}
        },
        "Col_public__tbl_payment_order__id": {
            "title": "ID",
            "group": "Tbl_public__tbl_payment_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "id"}},
            "in": {"T": "PaymentOrder"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_payment_order__num": {
            "title": "Номер",
            "group": "Tbl_public__tbl_payment_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "num"}},
            "in": {"T": "PaymentOrder"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_payment_order__date": {
            "title": "Дата",
            "group": "Tbl_public__tbl_payment_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "date"}},
            "in": {"T": "PaymentOrder"},
            "out": {"O": "DateExpr"}
        },
        "Col_public__tbl_payment_order__sum": {
            "title": "Сумма",
            "group": "Tbl_public__tbl_payment_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "sum"}},
            "in": {"T": "PaymentOrder"},
            "out": {"O": "NumericExpr"}
        },
        "Col_public__tbl_payment_order__bank_details_id": {
            "title": "Реквизиты",
            "group": "Tbl_public__tbl_payment_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "bank_details_id"}},
            "in": {"T": "PaymentOrder"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_payment_order__origin_platform": {
            "title": "Площадка",
            "group": "Tbl_public__tbl_payment_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "origin_platform"}},
            "in": {"T": "PaymentOrder"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_payment_order__origin_platform_external_id": {
            "title": "ID внутри площадки",
            "group": "Tbl_public__tbl_payment_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "origin_platform_external_id"}},
            "in": {"T": "PaymentOrder"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_payment_order__created_at": {
            "title": "Время создания",
            "group": "Tbl_public__tbl_payment_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "created_at"}},
            "in": {"T": "PaymentOrder"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_payment_order__purpose_of_payment": {
            "title": "Назначение",
            "group": "Tbl_public__tbl_payment_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "purpose_of_payment"}},
            "in": {"T": "PaymentOrder"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_payment_order__status": {
            "title": "Статус",
            "group": "Tbl_public__tbl_payment_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "status"}},
            "in": {"T": "PaymentOrder"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_payment_order__type": {
            "title": "Тип",
            "group": "Tbl_public__tbl_payment_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "type"}},
            "in": {"T": "PaymentOrder"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_payment_order__date_created": {
            "title": "date_created",
            "group": "Tbl_public__tbl_payment_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "date_created"}},
            "in": {"T": "PaymentOrder"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_payment_order__is_exported": {
            "title": "Экспортировано?",
            "group": "Tbl_public__tbl_payment_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "is_exported"}},
            "in": {"T": "PaymentOrder"},
            "out": {"O": "BooleanExpr"}
        },
        "Col_public__tbl_payment_order__operational_day_id": {
            "title": "ID Опер дня",
            "group": "Tbl_public__tbl_payment_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "operational_day_id"}},
            "in": {"T": "PaymentOrder"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_payment_order__is_household": {
            "title": "Хоз?",
            "group": "Tbl_public__tbl_payment_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "is_household"}},
            "in": {"T": "PaymentOrder"},
            "out": {"O": "BooleanExpr"}
        },
        "Tbl_public__tbl_customer": {
            "title": "Тбл: Клиент",
            "group": "tables",
            "color": "@tableNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "ct"}},
            "out": {"O": "Customer"}
        },
        "Col_public__tbl_customer__id": {
            "title": "ID",
            "group": "Tbl_public__tbl_customer",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "id"}},
            "in": {"T": "Customer"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_customer__legal_entity_id": {
            "title": "ID юридического лица",
            "group": "Tbl_public__tbl_customer",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "legal_entity_id"}},
            "in": {"T": "Customer"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_customer__status": {
            "title": "Статус регистрации",
            "group": "Tbl_public__tbl_customer",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "status"}},
            "in": {"T": "Customer"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_customer__created_at": {
            "title": "Время создания записи",
            "group": "Tbl_public__tbl_customer",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "created_at"}},
            "in": {"T": "Customer"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_customer__updated_at": {
            "title": "Время последнего редактирования записи",
            "group": "Tbl_public__tbl_customer",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "updated_at"}},
            "in": {"T": "Customer"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_customer__registered_at": {
            "title": "Время завершения регистрации пользователя",
            "group": "Tbl_public__tbl_customer",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "registered_at"}},
            "in": {"T": "Customer"},
            "out": {"O": "TimestampExpr"}
        },
        "Tbl_public__tbl_order": {
            "title": "Тбл: Заказ",
            "group": "tables",
            "color": "@tableNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "o"}},
            "out": {"O": "Order"}
        },
        "Col_public__tbl_order__id": {
            "title": "ID",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "id"}},
            "in": {"T": "Order"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_order__delivery_service_id": {
            "title": "Служба доставки",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "delivery_service_id"}},
            "in": {"T": "Order"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_order__delivery_status": {
            "title": "Статус доставки",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "delivery_status"}},
            "in": {"T": "Order"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order__total_cost_for_recipient": {
            "title": "Суммарная стоимость (позиций и доставки) для получателя",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "total_cost_for_recipient"}},
            "in": {"T": "Order"},
            "out": {"O": "NumericExpr"}
        },
        "Col_public__tbl_order__created_at": {
            "title": "Время создания записи",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "created_at"}},
            "in": {"T": "Order"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_order__platform_created_at": {
            "title": "Время создания внутри площадки",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "platform_created_at"}},
            "in": {"T": "Order"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_order__platform_updated_at": {
            "title": "Время обновления внутри плошадки",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "platform_updated_at"}},
            "in": {"T": "Order"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_order__delivery_service_external_order_id": {
            "title": "Внеший номер заказа от СД",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "delivery_service_external_order_id"}},
            "in": {"T": "Order"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order__origin_platform": {
            "title": "Площадка",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "origin_platform"}},
            "in": {"T": "Order"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order__origin_platform_external_id": {
            "title": "ID внутри площадки",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "origin_platform_external_id"}},
            "in": {"T": "Order"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order__synced_at": {
            "title": "Время последней синхронизации",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "synced_at"}},
            "in": {"T": "Order"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_order__shop_num": {
            "title": "Номер внутри ИМ",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "shop_num"}},
            "in": {"T": "Order"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order__location": {
            "title": "Город",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "location"}},
            "in": {"T": "Order"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order__dest_zip": {
            "title": "dest_zip",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "dest_zip"}},
            "in": {"T": "Order"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order__customer_id": {
            "title": "ID клиента",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "customer_id"}},
            "in": {"T": "Order"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_order__customer_platform_connector_id": {
            "title": "ID коннектора в рамках площадки",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "customer_platform_connector_id"}},
            "in": {"T": "Order"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_order__currency": {
            "title": "Валюта",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "currency"}},
            "in": {"T": "Order"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_order__send_date": {
            "title": "Дата отправки",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "send_date"}},
            "in": {"T": "Order"},
            "out": {"O": "DateExpr"}
        },
        "Col_public__tbl_order__delivery_date": {
            "title": "Дата доставки",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "delivery_date"}},
            "in": {"T": "Order"},
            "out": {"O": "DateExpr"}
        },
        "Col_public__tbl_order__payment_sum": {
            "title": "Сумма приходов",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "payment_sum"}},
            "in": {"T": "Order"},
            "out": {"O": "NumericExpr"}
        },
        "Col_public__tbl_order__first_payment_date": {
            "title": "Дата первого прихода",
            "group": "Tbl_public__tbl_order",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "first_payment_date"}},
            "in": {"T": "Order"},
            "out": {"O": "DateExpr"}
        },
        "Tbl_public__tbl_user": {
            "title": "Тбл: Пользователь",
            "group": "tables",
            "color": "@tableNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "u"}},
            "out": {"O": "User"}
        },
        "Col_public__tbl_user__id": {
            "title": "ID",
            "group": "Tbl_public__tbl_user",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "id"}},
            "in": {"T": "User"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_user__email": {
            "title": "Имя/email",
            "group": "Tbl_public__tbl_user",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "email"}},
            "in": {"T": "User"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_user__role": {
            "title": "Роль",
            "group": "Tbl_public__tbl_user",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "role"}},
            "in": {"T": "User"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_user__created_at": {
            "title": "Время создания",
            "group": "Tbl_public__tbl_user",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "created_at"}},
            "in": {"T": "User"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_user__is_email_verified": {
            "title": "Email верифицирован?",
            "group": "Tbl_public__tbl_user",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "is_email_verified"}},
            "in": {"T": "User"},
            "out": {"O": "BooleanExpr"}
        },
        "Col_public__tbl_user__email_verification_key": {
            "title": "Ключ для верификации email",
            "group": "Tbl_public__tbl_user",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "email_verification_key"}},
            "in": {"T": "User"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_user__is_phone_verified": {
            "title": "Телефон верифицирован?",
            "group": "Tbl_public__tbl_user",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "is_phone_verified"}},
            "in": {"T": "User"},
            "out": {"O": "BooleanExpr"}
        },
        "Col_public__tbl_user__phone_verification_key": {
            "title": "Ключ для верификации телефона",
            "group": "Tbl_public__tbl_user",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "phone_verification_key"}},
            "in": {"T": "User"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_user__password_recovery_key": {
            "title": "Ключ для восстановления пароля",
            "group": "Tbl_public__tbl_user",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "password_recovery_key"}},
            "in": {"T": "User"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_user__last_password_recovery_requested_at": {
            "title": "Время последнего запроса на восстановление пароля",
            "group": "Tbl_public__tbl_user",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "last_password_recovery_requested_at"}},
            "in": {"T": "User"},
            "out": {"O": "TimestampExpr"}
        },
        "Col_public__tbl_user__customer_id": {
            "title": "ID клиента",
            "group": "Tbl_public__tbl_user",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "customer_id"}},
            "in": {"T": "User"},
            "out": {"O": "IdExpr"}
        },
        "Col_public__tbl_user__phone": {
            "title": "Телефон",
            "group": "Tbl_public__tbl_user",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "phone"}},
            "in": {"T": "User"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_user__status": {
            "title": "Статус",
            "group": "Tbl_public__tbl_user",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "status"}},
            "in": {"T": "User"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_user__first_name": {
            "title": "Имя",
            "group": "Tbl_public__tbl_user",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "first_name"}},
            "in": {"T": "User"},
            "out": {"O": "TextExpr"}
        },
        "Col_public__tbl_user__last_name": {
            "title": "Фамилия",
            "group": "Tbl_public__tbl_user",
            "color": "@columnNode",
            "attrs": {"Alias": {"type": "Identifier", "default": "last_name"}},
            "in": {"T": "User"},
            "out": {"O": "TextExpr"}
        },
        "Dict_Accounts": {
            "group": "dictionaries",
            "title": "Спр: Бухгалтерские счета",
            "color": "@dictNode",
            "attrs": {
                "Value": {
                    "title": ">",
                    "valuePicker": {"type": "dictionary", "dictionary": "Dict_Accounts__dictionary"},
                    "default": "'SettlementAccount'"
                }
            },
            "out": {"O": "TextExpr"}
        },
        "Dict_Platform": {
            "group": "dictionaries",
            "title": "Спр: Площадка",
            "color": "@dictNode",
            "attrs": {
                "Value": {
                    "title": ">",
                    "valuePicker": {"type": "dictionary", "dictionary": "Dict_Platform__dictionary"},
                    "default": "'customer'"
                }
            },
            "out": {"O": "TextExpr"}
        },
        "Dict_OrderDeliveryStatus": {
            "group": "dictionaries",
            "title": "Спр: Статус доставки заказа",
            "color": "@dictNode",
            "attrs": {
                "Value": {
                    "title": ">",
                    "valuePicker": {"type": "dictionary", "dictionary": "Dict_OrderDeliveryStatus__dictionary"},
                    "default": "'pending'"
                }
            },
            "out": {"O": "TextExpr"}
        },
        "Dict_DeliveryService": {
            "group": "dictionaries",
            "title": "Спр: Служба доставки",
            "color": "@dictNode",
            "attrs": {
                "Value": {
                    "title": ">",
                    "valuePicker": {"type": "dictionary", "dictionary": "Dict_DeliveryService__dictionary"},
                    "default": 8
                }
            },
            "out": {"O": "IdExpr"}
        },
        "Dict_ClaimStatus": {
            "group": "dictionaries",
            "title": "Спр: Статус претензии",
            "color": "@dictNode",
            "attrs": {
                "Value": {
                    "title": ">",
                    "valuePicker": {"type": "dictionary", "dictionary": "Dict_ClaimStatus__dictionary"},
                    "default": "'generating'"
                }
            },
            "out": {"O": "TextExpr"}
        },
        "Dict_ClaimWorkflow": {
            "group": "dictionaries",
            "title": "Спр: Workflow претензии",
            "color": "@dictNode",
            "attrs": {
                "Value": {
                    "title": ">",
                    "valuePicker": {"type": "dictionary", "dictionary": "Dict_ClaimWorkflow__dictionary"},
                    "default": "'basic'"
                }
            },
            "out": {"O": "TextExpr"}
        },
        "Dict_ClaimOrderStatus": {
            "group": "dictionaries",
            "title": "Спр: Статус включения заказа в претензию",
            "color": "@dictNode",
            "attrs": {
                "Value": {
                    "title": ">",
                    "valuePicker": {"type": "dictionary", "dictionary": "Dict_ClaimOrderStatus__dictionary"},
                    "default": "'included'"
                }
            },
            "out": {"O": "TextExpr"}
        },
        "Dict_ClaimOrderModerationStatus": {
            "group": "dictionaries",
            "title": "Спр: Статус модерации заказа в претензии",
            "color": "@dictNode",
            "attrs": {
                "Value": {
                    "title": ">",
                    "valuePicker": {"type": "dictionary", "dictionary": "Dict_ClaimOrderModerationStatus__dictionary"},
                    "default": "'pending'"
                }
            },
            "out": {"O": "TextExpr"}
        },
        "Dict_ClaimTicketReplyStatus": {
            "group": "dictionaries",
            "title": "Спр: Статус ответа по заказу",
            "color": "@dictNode",
            "attrs": {
                "Value": {
                    "title": ">",
                    "valuePicker": {"type": "dictionary", "dictionary": "Dict_ClaimTicketReplyStatus__dictionary"},
                    "default": "'deleted'"
                }
            },
            "out": {"O": "TextExpr"}
        },
        "Dict_MoneyRequestStatus": {
            "group": "dictionaries",
            "title": "Спр: Статус запроса",
            "color": "@dictNode",
            "attrs": {
                "Value": {
                    "title": ">",
                    "valuePicker": {"type": "dictionary", "dictionary": "Dict_MoneyRequestStatus__dictionary"},
                    "default": "'auto_scoring'"
                }
            },
            "out": {"O": "TextExpr"}
        },
        "Dict_MoneyRequestType": {
            "group": "dictionaries",
            "title": "Спр: Тип запроса",
            "color": "@dictNode",
            "attrs": {
                "Value": {
                    "title": ">",
                    "valuePicker": {"type": "dictionary", "dictionary": "Dict_MoneyRequestType__dictionary"},
                    "default": "'remainder'"
                }
            },
            "out": {"O": "TextExpr"}
        }
    }
};