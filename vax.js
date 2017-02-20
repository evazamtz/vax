(function(window, _, $) {

    // static helper
    var idCounter = 1;

    window.vax = {};

    vax = _.extend(vax, {

        genNextId: function()
        {
            return idCounter++;
        },

        buildPath: function (parts) {
            return parts.join(' ');
        },

        buildWirePath: function (x1, y1, x2, y2) {
            dx = (x2 - x1) / 4;
            dy = (y2 - y1) / 4;

            return this.buildPath([
                'M', x1, y1,
                'S', x1 + dx, y1, x1 + 2 * dx, y1 + 2 * dy,
                'S', x2, y2 - dy, x2, y2
            ]);
        },

        parseType: function parseType(str, whole)
        {
            whole = whole || str;

            var re = /^\s*(@?[A-Z]\w*)\s*(\[\s*(.*)\s*\]\s*)?$/; // we have 4 matching
            var matches = re.exec(str);

            if (!matches)
            {
                throw new Error("Invalid type signature of '" + str + "' in '" + whole + "'");
            }

            if (!matches[2]) // simple type
            {
                return str;
            }
            else // parametrized type
            {
                var params = matches[3].split(',');
                return {
                    name: matches[1],
                    typeParams: _.map(params, function(param) {return parseType(param, whole); })
                }
            }
        },

        doesRectangleContainOther: function(outerRect, innerRect)
        {
            return (
                outerRect.left <= innerRect.left
                && outerRect.top <= innerRect.top
                && outerRect.right >= innerRect.right
                && outerRect.bottom >= innerRect.bottom
            );
        },

        getUserFunctionTypes: function()
        {
            return {
                "UF_Outputs": {
                    "color": "#2f2"
                },
                "UF_Output": {
                    "color": "#2f2",
                    "extends": "UF_Outputs"
                },
                /*
                not yet supported
                "UF_Attributes": {
                    "color": "#f2c"
                },
                "UF_Attribute": {
                    "color": "#f2c",
                    "extends": "UF_Attributes"
                },*/
                "UF_Name": {
                    "color": "#f00"
                },
                "UF_String": {
                    "color": "#f6a"
                },
                "UF_Color": {
                    "color": "#fa6"
                }
            };
        },

        getUserFunctionComponents: function()
        {
           return {
               "UF_Input": {
                   "group": "_ufElements",
                   "title": "Input",
                   "typeParams": [
                       "T"
                   ],
                   "attrs": {
                       "Name": {
                           "type": "UF_Name",
                           "default": "I"
                       },
                       "Title": {
                           "type": "UF_String",
                           "default": "Input"
                       }
                   },
                   "out": {
                       "O": "@T"
                   }
               },
               "UF_Output": {
                   "group": "_ufElements",
                   "title": "Output",
                   "typeParams": [
                       "T"
                   ],
                   "attrs": {
                       "Name": {
                           "type": "UF_Name",
                           "default": "O"
                       },
                       "Title": {
                           "type": "UF_String",
                           "default": "Output"
                       }
                   },
                   "in": {
                       "I": "@T"
                   },
                   "out": {
                       "O": "UF_Output"
                   }
               },
               "UF_Function": {
                   "group": "_ufElements",
                   "title": "Function",
                   "attrs": {
                       "Title": {
                           "type": "UF_String",
                           "default": "Node"
                       },
                       "Color": {
                           "type": "UF_Color",
                           "default": "0-#495-#075"
                       }
                   },
                   "in": {
                       "Outputs": "UF_Outputs"
                       // not yet supported: "Attributes": "UF_Attributes"
                   }
               },
               /*
               not yet supported
               "UF_Attribute": {
                   "title": "Attribute",
                   "typeParams": [
                       "T"
                   ],
                   "attrs": {
                       "Name": {
                           "type": "UF_Name",
                           "default": "Name"
                       },
                       "Title": {
                           "type": "UF_String",
                           "default": "Title"
                       },
                       "Default": {
                           "type": "UF_String",
                           "default": "Default value"
                       }
                   },
                   "out": {
                       "V": {
                           "type": "@T",
                           "title": "Value",
                       },
                       "A": "UF_Attributes"
                   }
               },
                "UF_Attributes": {
                "title": "Collect attributes",
                "in": {
                "A1": "UF_Attributes",
                "A2": "UF_Attributes",
                "A3": "UF_Attributes",
                },
                "out": {
                "O": "UF_Attributes"
                }
                },
               */
               "UF_Outputs": {
                   "group": "_ufElements",
                   "title": "Collect outputs",
                   "in": {
                       "O1": "UF_Outputs",
                       "O2": "UF_Outputs",
                       "O3": "UF_Outputs",
                   },
                   "out": {
                       "Outputs": "UF_Outputs"
                   }
               }
           };
        },


    }); // vax.extend

    // VAX class
    function VAX(domElementId, config)
    {
        var vaxRoot = this;

        // create wrapper
        this.domElementId = domElementId;
        var $wrapper = this.$wrapper = $('#' + domElementId);
        $wrapper.addClass('vax-wrapper vax-text-unselectable');

        this.wrapperWidth = $wrapper.width();
        this.wrapperHeight = $wrapper.height();

        var scrollbarSpinnerSize = this.scrollbarSpinnerSize = 20;
        var toolbarSize = this.toolbarSize = 40;

        // toolbar
        var $toolbar = this.$toolbar = $('<div class="vax-toolbar"><div class="vax-toolbar-btn" data-action="createFunction">F</div><div class="vax-toolbar-btn" data-action="help">?</div></div>');
        $wrapper.append($toolbar);

        // tabs wrapper
        var $tabsWrapper = this.$tabsWrapper = $('<div class="vax-tabs-wrapper"/>');
        $wrapper.append($tabsWrapper);

        // canvas element
        this.canvasWidth = this.wrapperWidth - scrollbarSpinnerSize - toolbarSize;
        this.canvasHeight = this.wrapperHeight - scrollbarSpinnerSize - toolbarSize;

        this.canvasDomElementId = domElementId + '-vax-canvas-' + vax.genNextId();
        var $canvas = this.$canvas = $('<div id="' + this.canvasDomElementId + '" class="vax-canvas"/>');
        $canvas.css({'width': this.canvasWidth, 'height': this.canvasHeight});

        $wrapper.append(this.$canvas);

        this.canvasOffset = this.$canvas.offset();

        // create scrollbars
        var $horizScrollbar = this.$horizScrollbar =
            $('<div class="vax-scrollbar vax-horiz-scrollbar">' +
                '<div class="vax-sb-spinner vax-hsb-left-spinner">&larr;</div>' +
                '<div class="vax-sb-slider vax-horiz-sb-slider"></div>' +
                '<div class="vax-sb-spinner vax-hsb-right-spinner">&rarr;</div>' +
              '</div>'
            );
        $wrapper.append($horizScrollbar);

        var $vertScrollbar = this.$vertScrollbar =
            $('<div class="vax-scrollbar vax-vert-scrollbar">' +
                '<div class="vax-sb-spinner vax-vsb-top-spinner">&uarr;</div>' +
                '<div class="vax-sb-slider vax-vert-sb-slider"></div>' +
                '<div class="vax-sb-spinner vax-vsb-bottom-spinner">&darr;</div>' +
                '</div>'
            );
        $wrapper.append($vertScrollbar);

        // dragging scrollbars helper object
        this.scollbarsDragging = {
            horizontal: {
                isDragging: false,
                delta: 0
            },

            vertical: {
                isDragging: false,
                delta: 0
            }
        };

        // raphael view box (for now we only use pan)
        this.viewBox = {left:0, top:0};

        // creating the actual Raphael object
        var raphael = this.raphael = new Raphael(this.canvasDomElementId, this.canvasWidth, this.canvasHeight);

        // create ui
        this.ui = new VaxUI(this);

        // create tabs
        this.tabs = new VaxTabs(this);

        // create user function storage
        this.userFunctionStorage = new VaxUserFunctionStorage(this);

        // create valuePickers
        this.valuePickers = {
            default:    new VaxDefaultValuePicker(this),
            memo:       new VaxMemoValuePicker(this),
            dictionary: new VaxDictionaryValuePicker(this)
        };

        this.registerValuePicker = function(type, valuePicker)
        {
            this.valuePickers[type] = valuePicker;
        };

        // setting states of down-move-up operations
        this.isDragging  = false;
        this.isWiring    = false;
        this.isSelecting = false;
        this.isPanning   = false;

        // system keys positions
        this.isSpacebarDown = false;
        this.isCtrlDown     = false;
        this.isAltDown      = false;
        this.isShiftDown    = false;

        // selection rectangle
        this.selectionRect = null;

        // the selection
        this.selection = new VaxSelection(this);

        // operations history
        this.history = this.tabs.getCurrentTabHistory();

        // clipboard
        this.clipboard = new VaxClipboard(this);

        // default config
        this.config = _.defaults(config, {
            schema: {
                colors: {},
                types: {},
                groups: {},
                dictionaries: {},
                components: {}
            }
        });

        this.schema = {};

        this.isValidType = function isValidType(type)
        {
            if (!_.isObject(type))
            {
                return type.substring(0, 1) == '@' || (vaxRoot.schema.types.hasOwnProperty(type));
            }
            else
            {
                var typeName = type.name;
                var typeParams = type.typeParams;

                return isValidType(typeName) && _.every(typeParams, function(typeParam) { return isValidType(typeParam)});
            }
        };

        this.areParsedTypesCompatible = function areParsedTypesCompatible(inputType, outputType)
        {
            var isSimpleOutputType = !_.isObject(outputType);
            var isSimpleInputType  = !_.isObject(inputType);

            // support type params in functions
            if (isSimpleInputType && inputType.substr(0, 1) === '@')
            {
                return outputType === inputType;
            }

            if (isSimpleOutputType && outputType.substr(0, 1) === '@')
            {
                return inputType === 'Any' || inputType === outputType;
            }

            // go on with real types
            if (isSimpleInputType && isSimpleOutputType) // both simple
            {
                return (inputType === outputType) || _.some(vaxRoot.schema.types[outputType].extends, function(extType) { return extType == inputType;});
            }
            else if (isSimpleInputType && !isSimpleOutputType) // input = simple, output = paramtrized
            {
                return _.some(vaxRoot.schema.types[outputType.name].extends, function(extType) { return extType == inputType;});
            }
            else if (!isSimpleOutputType && isSimpleInputType) // input = paramtrized, output = simple
            {
                return false;
            }
            else // both are parametrized
            {
                // check if they are same
                if (inputType.name !== outputType.name)
                {
                    return false;
                }

                // TODO: later add support for different wrapping classes

                // for each type params
                return _.every(inputType.typeParams, function(inputTypeParam, index)
                {
                    return areParsedTypesCompatible(inputTypeParam, outputType.typeParams[index]);
                });
            }
        };

        this.buildSchemaColors = function(schema)
        {
            return schema.colors || {};
        };

        this.getColorByAlias = function(alias)
        {
            if (!(alias in this.schema.colors))
            {
                throw new Error("Color alias: " + alias + " wasn't found!");
            }

            return this.schema.colors[alias];
        };


        this.resolveColor = function(color)
        {
            color = color || '#fff';
            if (color.substr(0, 1) == '@')
            {
                color = this.getColorByAlias(color.substr(1));
            }

            return color;
        };

        this.buildSchemaTypes = function(schema)
        {
            var self = this;

            var typesConfig = schema.types || {};

            typesConfig = _.extend(typesConfig, vax.getUserFunctionTypes());

            var types = {
                Any: {
                    color: "#fff",
                    extends: [],
                    typeParams: []
                }
            };

            _.each(typesConfig, function(type, name)
            {
                if (name == 'Any')
                {
                    throw new Error("Type 'Any' is reserved.");
                }

                var allExtends = ['Any'];

                if (!type)
                {
                    type = {};
                }

                if (type && type.extends)
                {
                    // normalize extends
                    if (!_.isArray(type.extends))
                    {
                        type.extends = [type.extends];
                    }

                    _.each(type.extends, function(typeNameToExtend)
                    {
                        if (typeNameToExtend in types)
                        {
                            allExtends.push(typeNameToExtend);
                            allExtends = allExtends.concat(types[typeNameToExtend].extends);
                        }
                        else
                        {
                            throw new Error("Type '" + typeNameToExtend + "' wasn't found!");
                        }
                    });
                }

                if (type.typeParams && (!_.isArray(type.typeParams) || type.typeParams.length == 0))
                {
                    throw new Error("Type params should a plain array with length > 0!");
                }

                types[name] = {
                    color: self.resolveColor(type.color),
                    extends: _.filter(_.unique(allExtends, false)),
                    typeParams: type.typeParams || [],
                };
            });

            return types;
        };

        this.buildSchemaGroups = function(schema)
        {
            return _.defaults(schema.groups, {
              '_default':       'Uncategorized',
              '_userFunctions': 'User functions',
              '_ufElements':    'User functions elements'
            });
        };


        this.buildSchemaComponents = function(schema)
        {
            var self = this;

            var componentsConfig = schema.components || {};

            components = _.extend(componentsConfig, vax.getUserFunctionComponents());

            var components = {};

            _.each(componentsConfig, function(componentConfig, name)
            {
                components[name] = self.buildComponentConfig(componentConfig, name);
            });

            return components;
        };

        this.buildComponentConfig = function(componentConfig, name, userFunctionData)
        {
            var self = this;

            var isUserFunction = !!userFunctionData;

            var component = _.defaults(componentConfig, {
                group: '_default',
                component: name,
                isUserFunction: isUserFunction,
                title: name,
                color: "0-#490-#070:20-#333",
                typeParams: [],
                inputSockets: [],
                attributes: [],
                outputSockets: [],
                typeInstances: {}
            });

            if (isUserFunction)
            {
                component.userFunction = userFunctionData;
            }

            component.color = self.resolveColor(component.color);

            var mapSubConfig = function(subConfig, name)
            {
                if (_.isString(subConfig))
                {
                    subConfig = {type: subConfig};
                }

                var sub = _.defaults(subConfig, {
                    color: '#fff',
                    name: name,
                    title: name,
                    type: 'Any',
                    default: ''
                });

                var parsedType = vax.parseType(sub.type);
                if (!vaxRoot.isValidType(parsedType))
                {
                    throw new Error("Invalid type: " + sub.type);
                }

                sub.parsedType = parsedType;
                sub.color = vaxRoot.getColorOfParsedType(parsedType);

                return sub;
            };

            component.inputSockets  = _.map(componentConfig.in    || {}, mapSubConfig);
            component.outputSockets = _.map(componentConfig.out   || {}, mapSubConfig);
            component.attributes    = _.map(componentConfig.attrs || {}, mapSubConfig);

            return component;
        };

        this.isComponentAppropriate = function(component)
        {
            return !(this.tabs.isCurrentlyBlueprint() && component.substring(0, 3) == 'UF_');
        };

        this.isTypeAppropriate = function(type)
        {
            return !(this.tabs.isCurrentlyBlueprint() && type.substring(0, 3) == 'UF_');
        };

        this.cloneComponentConfig = function(component)
        {
            var componentConfig = this.schema.components[component];

            if (!componentConfig)
            {
                return undefined;
            }

            // shallow clone
            var nodeConfig = _.clone(componentConfig);

            // deep clone
            nodeConfig.inputSockets  = [];
            _.each(componentConfig.inputSockets, function(socket)
            {
                nodeConfig.inputSockets.push(_.clone(socket));
            });

            nodeConfig.outputSockets  = [];
            _.each(componentConfig.outputSockets, function(socket)
            {
                nodeConfig.outputSockets.push(_.clone(socket));
            });

            nodeConfig.attributes  = [];
            _.each(componentConfig.attributes, function(attr)
            {
                nodeConfig.attributes.push(_.clone(attr));
            });

            return nodeConfig;
        };

        this.fillTypeInstance = function(nodeConfig, typeAlias, actualType)
        {
            var self = this;

            nodeConfig.typeInstances[typeAlias] = actualType;

            var subUpdate = function(subConf)
            {
                subConf.type = subConf.type.replace('@' + typeAlias, actualType);
                subConf.parsedType = vax.parseType(subConf.type);
                subConf.color = self.getColorOfParsedType(subConf.parsedType);
            };

            _.each(nodeConfig.inputSockets,  subUpdate);
            _.each(nodeConfig.outputSockets, subUpdate);
            _.each(nodeConfig.attributes,    subUpdate);
        };

        this.getColorOfParsedType = function(parsedType)
        {
            var rootTypeName = _.isObject(parsedType) ? parsedType.name : parsedType;

            if (rootTypeName.substring(0, 1) == '@')
            {
                return '#fff';
            }

            var type = vaxRoot.schema.types[rootTypeName];

            if (!type)
            {
                throw new Error("Type " + rootTypeName + " wasn't found!");
            }

            return type.color;
        };

        this.compileUserFunction = function(config)
        {
            var self = this;

            if (!config.id)
            {
                throw new Error('Id is empty');
            }

            var trees      = config.trees || {};
            var graph      = config.graph || {};
            var typeParams = config.typeParams || {};

            var component = {group: "_userFunctions"};

            if (typeParams)
            {
                component.typeParams = typeParams;
            }

            if (trees.length && trees.length == 1)
            {
                var root = trees[0];
                if (root.c !== 'UF_Function')
                {
                    alert("Root node should be UF_Function!");
                    return false;
                }

                component.title = root.a.Title;
                component.color = root.a.Color;

                component.in    = {};
                component.out   = {};

                var walk = function walk(node)
                {
                    if (node.c == 'UF_Input')
                    {
                        component.in[node.a.Name] = {
                            type:    node.t.T,
                            title:   node.a.Title
                        };
                    }
                    else if (node.c == 'UF_Output')
                    {
                        component.out[node.a.Name] = {
                            type:    node.t.T,
                            title:   node.a.Title
                        };
                    }
                    /*
                    not yet supported
                    else if (node.c == 'UF_Attribute')
                    {
                        component.attrs[node.a.Name] = {
                            type:    node.t.T,
                            title:   node.a.Title,
                            default: node.a.Default
                        };
                    }
                    */

                    // traverse each link
                    _.each(node.links, function(link)
                    {
                        walk(link);
                    });
                };

                // build component config
                walk(root);

                // build component & register in current schema
                self.schema.components[config.id] = self.buildComponentConfig(component, config.id, {id: config.id, name: config.name});

                // save in repo
                self.userFunctionStorage.save(config.id, config.name, component, graph);

                return component;
            }
            else
            {
                alert('There should be exactly one tree root');
                return false;
            }
        };

        this.schema.colors       = this.buildSchemaColors(this.config.schema);
        this.schema.types        = this.buildSchemaTypes(this.config.schema);
        this.schema.groups       = this.buildSchemaGroups(this.config.schema);
        this.schema.dictionaries = this.config.schema.dictionaries;
        this.schema.components   = this.buildSchemaComponents(this.config.schema, this.schema.types);

        this.nodes = {};
        this.sockets = {};
        this.wires = {};
        this.comments = {};

        this.getNodeById = function(id)
        {
            if (id in this.nodes)
            {
                return this.nodes[id]
            }
            else
            {
                throw new Error("Node with id: " + id + " wasn't found!");
            }
        };

        this.init = function()
        {
            var self = this;

            $(document).mousemove(function(e) {
                var canvasOffset = self.$canvas.offset();
                var viewBox      = self.viewBox;

                self.mouseX = e.pageX - canvasOffset.left + viewBox.left;
                self.mouseY = e.pageY - canvasOffset.top  + viewBox.top;
            }).mouseover(); // call the handler immediately

            $(document).keydown(function (evt)
            {
                if (evt.keyCode == 32) // spacebar
                {
                    self.isSpacebarDown = true;
                }

                if (evt.keyCode == 17) // ctrl
                {
                    self.isCtrlDown = true;
                }

                if (evt.keyCode == 18) // alt
                {
                    self.isAltDown = true;
                }

                if (evt.keyCode == 16) // shift
                {
                    self.isAltDown = true;
                }
            });

            $(document).keyup(function (evt) { // should be a DOM node for that


                if (evt.keyCode == 32) // spacebar
                {
                    self.isSpacebarDown = false;
                }

                if (evt.keyCode == 17) // ctrl
                {
                    self.isCtrlDown = false;
                }

                if (evt.keyCode == 18) // alt
                {
                    self.isAltDown = false;
                }

                if (evt.keyCode == 16) // shift
                {
                    self.isAltDown = false;
                }


                if (!self.ui.hasOverlay) // non-overlay keys
                {
                    if (evt.keyCode == 88 && !evt.ctrlKey) // X key
                    {
                        self.showComponentSelector();
                    }

                    if (evt.keyCode == 67 && !evt.ctrlKey) // C key
                    {
                        self.showCommentCreator();
                    }

                    if (evt.keyCode == 70) // F key
                    {
                        self.showNewUserFunctionDialog();
                    }

                    if (evt.keyCode == 46 || evt.keyCode == 8) // Delete
                    {
                        self.selection.removeSelectedElements();
                    }

                    if (evt.keyCode == 90 && evt.ctrlKey) // Ctrl+Z
                    {
                        self.history.undo();
                    }

                    if (evt.keyCode == 67 && evt.ctrlKey) // Ctrl+C
                    {
                        self.clipboard.copy();
                    }

                    if (evt.keyCode == 86 && evt.ctrlKey) // Ctrl+V
                    {
                        self.clipboard.paste();
                    }

                    if (evt.keyCode == 88 && evt.ctrlKey) // Ctrl+X
                    {
                        self.clipboard.cut();
                    }

                    if (evt.keyCode == 69) // Ctrl + E
                    {
                        self.tabs.compileUserFunction();
                    }

                    if (evt.keyCode == 65) // Ctrl + A
                    {
                        self.selection.selectAllNodes();
                    }
                }
            });

            // draw scrollbars
            this.initScrollbarsHandlers();
            this.refreshScrollSliders();

            // init ui
            this.ui.init();

            // init tabs
            this.tabs.init();

            // load user functions
            this.userFunctionStorage.loadAll();

            // selection handler
            self.$canvas.mousedown(function(e)
            {
                if (self.isDragging || self.isPanning || self.isSelecting || self.isWiring)
                {
                    return;
                }

                if (self.isSpacebarDown || e.which == 2) // panning
                {
                    self.isPanning = true;

                    self.$canvas.addClass('vax-is-panning');

                    self.panningStartX = self.mouseX;
                    self.panningStartY = self.mouseY;
                }
                else // selecting
                {
                    self.isSelecting = true;

                    self.selectionStartX = self.mouseX;
                    self.selectionStartY = self.mouseY;
                }
            });

            $(document).mousemove(function()
            {
                if (self.isSelecting) {

                    var x = self.selectionStartX;
                    var y = self.selectionStartY;
                    var w = self.mouseX - self.selectionStartX;
                    var h = self.mouseY - self.selectionStartY;

                    if (w < 0) {
                        x = x + w;
                        w = -w;
                    }
                    if (h < 0) {
                        y = y + h;
                        h = -h;
                    }

                    if (!self.selectionRect) {
                        self.selectionRect = self.raphael.rect(x, y, w, h, 2);
                        self.selectionRect.attr({
                            'stroke': '#0f0',
                            'stroke-dasharray': ['.'],
                            'stroke-width': 1
                        });
                    }
                    else
                    {
                        self.selectionRect.attr({x: x, y: y, width: w, height: h});
                    }
                }
                else if (self.isPanning)
                {
                    var panToX = -(self.mouseX - self.panningStartX) / 2 + self.viewBox.left;
                    var panToY = -(self.mouseY - self.panningStartY) / 2 + self.viewBox.top;

                    self.panningStartX = self.mouseX;
                    self.panningStartY = self.mouseY;

                    self.panTo(panToX, panToY);
                }
            });

            $(document).mouseup(function(e)
            {
                self.isSelecting = false;
                self.isPanning   = false;
                self.$canvas.removeClass('vax-is-panning');

                if (self.selectionRect)
                {
                    self.selection.selectByRect({
                        left:   self.selectionRect.attr('x'),
                        top:    self.selectionRect.attr('y'),
                        right:  self.selectionRect.attr('x') + self.selectionRect.attr('width'),
                        bottom: self.selectionRect.attr('y') + self.selectionRect.attr('height')
                    });

                    self.selectionRect.remove();
                    self.selectionRect = null;
                }
            });
        };

        this.initScrollbarsHandlers = function()
        {
            var self = this;

            var $horizSlider = $('.vax-horiz-sb-slider', this.$wrapper);
            var $vertSlider  = $('.vax-vert-sb-slider',  this.$wrapper);

            $horizSlider.mousedown(function(e)
            {
                var mouseX = e.originalEvent.pageX;

                self.scollbarsDragging.horizontal.isDragging = true;
                self.scollbarsDragging.horizontal.delta = parseInt(mouseX - $horizSlider.offset().left);

                $horizSlider.addClass('vax-sb-slider-dragging');
            });

            $vertSlider.mousedown(function(e)
            {
                var mouseY = e.originalEvent.pageY;

                self.scollbarsDragging.vertical.isDragging = true;
                self.scollbarsDragging.vertical.delta = parseInt(mouseY - $vertSlider.offset().top);

                $vertSlider.addClass('vax-sb-slider-dragging');
            });

            $(document).mousemove(function(e)
            {
                if (self.scollbarsDragging.horizontal.isDragging)
                {
                    var mouseX = e.pageX;

                    var left = mouseX - self.scollbarsDragging.horizontal.delta;

                    left = Math.max(0, left);
                    left = Math.min(left, self.canvasWidth - self.scrollbarSpinnerSize - $horizSlider.width());

                    $horizSlider.css({'left': parseInt(left)});

                    // now we panTo somewhere
                    var pos = left / (self.canvasWidth - 2 * self.scrollbarSpinnerSize);
                    var maxViewBox = self.getMaxViewBox();

                    var width = maxViewBox.right - maxViewBox.left;
                    var newLeft = maxViewBox.left + parseInt(width * pos);

                    self.panTo(newLeft, self.viewBox.top);
                }
                else if (self.scollbarsDragging.vertical.isDragging)
                {
                    var mouseY = e.pageY;

                    var top = mouseY - self.scollbarsDragging.vertical.delta;

                    top = Math.max(0, top);
                    top = Math.min(top, self.canvasHeight - self.scrollbarSpinnerSize - $vertSlider.height());

                    $vertSlider.css({'top': parseInt(top)});

                    // now we panTo somewhere
                    var pos = top / (self.canvasHeight - 2 * self.scrollbarSpinnerSize);
                    var maxViewBox = self.getMaxViewBox();

                    var height = maxViewBox.bottom - maxViewBox.top;
                    var newTop = maxViewBox.top + parseInt(height * pos);

                    self.panTo(self.viewBox.left, newTop);
                }
            });

            $(document).mouseup(function(e)
            {
                self.scollbarsDragging.horizontal.isDragging = false;
                self.scollbarsDragging.vertical.isDragging   = false;

                $horizSlider.removeClass('vax-sb-slider-dragging');
                $vertSlider.removeClass('vax-sb-slider-dragging');
            });
        };

        this.getBoundingBox = function()
        {
            var self = this;

            var nodesBoxes    = _.map(this.nodes,    function(node)    { return node.getBoundingBox(); });
            var commentsBoxes = _.map(this.comments, function(comment) { return comment.getBoundingBox(); });

            var allBoxes = [{left: 0, top: 0, right: self.canvasWidth, bottom: self.canvasHeight}].concat(nodesBoxes, commentsBoxes);

            return {
                left:   _.min( _.map(allBoxes, function(box) { return box.left }) ),
                top:    _.min( _.map(allBoxes, function(box) { return box.top  }) ),

                right:  _.max( _.map(allBoxes, function(box) { return box.right }) ),
                bottom: _.max( _.map(allBoxes, function(box) { return box.bottom }) )
            };
        };

        this.getMaxViewBox = function()
        {
            var bb = this.getBoundingBox();

            var freeOffset = 200; // TODO: configure of constant (or half of view size)s

            return {
                left: Math.min(this.viewBox.left, bb.left - freeOffset),
                top:  Math.min(this.viewBox.top, bb.top - freeOffset),
                right:  Math.max(this.viewBox.left + this.canvasWidth, bb.right + freeOffset),
                bottom: Math.max(this.viewBox.top + this.canvasHeight, bb.bottom + freeOffset)
            };
        };

        this.getScrollbarsScales = function()
        {
            var boundingBox = this.getMaxViewBox();
            var viewBox = this.viewBox;

            var hs = 1;
            var ho = 0;
            if (isFinite(boundingBox.left))
            {
                hs = Math.min(1, this.canvasWidth / (Math.abs(boundingBox.right - boundingBox.left)));
                ho = Math.abs(boundingBox.left - viewBox.left) / Math.abs(boundingBox.right - boundingBox.left);
            }

            var vs = 1;
            var vo = 0;
            if (isFinite(boundingBox.top))
            {
                vs = Math.min(1, this.canvasHeight / (Math.abs(boundingBox.bottom - boundingBox.top)));
                vo = Math.abs(boundingBox.top - viewBox.top) / Math.abs(boundingBox.bottom - boundingBox.top);
            }

            if (hs == 1)
            {
                ho = 0;
            }

            if (vs == 1)
            {
                vo = 0;
            }

            return {
                horizontalScale: hs,
                horizontalOffset: ho,
                verticalScale: vs,
                verticalOffset: vo
            };
        };

        this.refreshScrollSliders = function()
        {
            var scales = this.getScrollbarsScales();

            // horizontal
            var horizSpace = this.canvasWidth - 2 * this.scrollbarSpinnerSize;
            $('.vax-horiz-sb-slider', this.$wrapper).css({
                'width':  horizSpace * scales.horizontalScale,
                'left': this.scrollbarSpinnerSize + horizSpace * scales.horizontalOffset
            });

            // vertical
            var vertSpace = this.canvasHeight - 2 * this.scrollbarSpinnerSize;
            $('.vax-vert-sb-slider', this.$wrapper).css({
                'height': vertSpace * scales.verticalScale,
                'top': this.scrollbarSpinnerSize + vertSpace * scales.verticalOffset,
            });
        };

        this.panTo = function(left, top)
        {
            var vb = this.getMaxViewBox();

            left = Math.min(Math.max(left, vb.left), vb.right - this.canvasWidth);
            top  = Math.min(Math.max(top, vb.top), vb.bottom - this.canvasHeight);

            // view box
            this.viewBox = {left: left, top: top};
            this.raphael.setViewBox(left, top, this.canvasWidth, this.canvasHeight, false);

            // canvas bg position
            this.$canvas.css({'backgroundPosition': '' + (-left) + 'px ' + ' ' + (-top) + 'px'});

            // scrollSliders if they're driven by scrolling ?? should be a flag
            this.refreshScrollSliders();
        };

        // Показать диалог для выбора и создания нового компонента
        this.showComponentSelector = function()
        {
            var self = this;

            if (self.selectorDlg)
            {
                return;
            }

            self.newNodeX = self.mouseX;
            self.newNodeY = self.mouseY;

            var $selectorBody = $('<div class="vax-component-selector"><select data-role="component" class="vax-chosen"/></div>');

            // create select
            var $select = $('[data-role="component"]', $selectorBody).css({'width': '100%'});

            // fill it by groups
            var grouped = _.groupBy(self.schema.components, function(component) { return component.group; });

            _.each(grouped, function(components, group)
            {
                var $optgroup = $("<optgroup>").attr('label', self.schema.groups[group]);

                // fill <optgroup> with <option>s
                _.each(components, function(component)
                {
                    var name = component.component;

                    if (!self.isComponentAppropriate(name))
                    {
                        return;
                    }

                    var title = component.title;
                    if (component.typeParams && component.typeParams.length > 0)
                    {
                        title = title + ' [' + component.typeParams.join(', ') + ']';
                    }

                    var $option = $('<option/>').attr('value', name).text(title);

                    if (self.lastSelectedComponent && self.lastSelectedComponent == name)
                    {
                        $option.attr('selected', 'selected');
                    }

                    $optgroup.append($option);
                });

                // append <optgroup> to main select
                $select.append($optgroup);
            });

            // on component change
            $select.on('change', function()
            {
                var $this = $(this);

                var component = $(this).val();
                var componentConfig = self.schema.components[component];

                $('.vax-component-types-picker', $selectorBody).remove(); // clear prev types pickers

                if (componentConfig.typeParams && componentConfig.typeParams.length > 0)
                {
                    // allTypes
                    var $allTypes = $('<div class="vax-component-types-picker"/>');

                    _.each(componentConfig.typeParams, function(typeAlias) {
                        $allTypes.append($('<hr/>'));
                        var $typePicker = $('<div class="vax-type-picker"/>').text(typeAlias + ' = ').attr('data-type-alias', typeAlias).attr('data-type-signature', 'Any');
                        var $typePickerSelect = $('<select class="vax-type-picker-select vax-chosen" data-type-n="1"/>');

                        _.each([self.tabs.getCurrentFunctionTypeParamsForPicker(), self.schema.types], function(types)
                        {
                            _.each(types, function(type, name)
                            {
                                if (!self.isTypeAppropriate(name))
                                {
                                    return;
                                }

                                var title = name;

                                var $option = $('<option/>').attr('value', name);

                                if (type.typeParams && type.typeParams.length)
                                {
                                    title = title + ' [' + type.typeParams.join(',') + ']';
                                    $option.attr('data-type-params-length', type.typeParams.length);
                                }

                                $option.text(title);

                                $typePickerSelect.append($option);
                            });
                        });

                        $typePicker.append($typePickerSelect);
                        $typePicker.append($('<span data-type-n="1"/>'));

                        $allTypes.append($typePicker);
                    });

                    // append to selector body
                    $selectorBody.append($allTypes);
                    $('.vax-chosen', $allTypes).chosen({});

                    // force serialization of a selected type
                    $('select', $allTypes).change();
                }
                self.selectorDlg.center();
            });

            // on type change
            $($selectorBody).on('change', '.vax-type-picker-select', function(e)
            {
                var $this = $(this);
                var val = $this.val();

                var $parent = $this.parents('.vax-type-picker');

                var $option = $('option[value="' + val + '"]', $this);
                var n = parseInt($this.attr('data-type-n'));
                var $span = $('span[data-type-n="' + n +'"]', $parent);

                // empty nested types
                $span.empty();

                if ($option.attr('data-type-params-length'))
                {
                    var l = parseInt($option.attr('data-type-params-length'));

                    $span.append($('<span class="vax-type-picker-punct"> [ </span>'));

                    for (var i = 0; i < l; ++i)
                    {
                        var $clone = $this.clone();

                        $clone.attr('data-type-n', n + i + 1);
                        $clone.val('Any');
                        $clone.show();

                        $span.append($clone);
                        $span.append($('<span data-type-n="' + (n + i + 1) + '"></span>'));

                        if (i < l - 1)
                        {
                            $span.append($('<span class="vax-type-picker-punct"> , </span>'));
                        }

                        $clone.chosen({});
                    }

                    $span.append($('<span class="vax-type-picker-punct"> ] </span>'));
                }

                // serialize type
                var typeSignature = '';
                $('select,.vax-type-picker-punct', $parent).each(function()
                {
                    var $el = $(this);

                    if ($el.hasClass('vax-type-picker-punct'))
                    {
                        typeSignature = typeSignature + $el.text();
                    }
                    else
                    {
                        typeSignature = typeSignature + $el.val();
                    }

                    typeSignature = typeSignature.replace(' ', '');
                    $parent.attr('data-type-signature', typeSignature);
                });

                self.selectorDlg.center();
            });

            self.selectorDlg = self.ui.createDialog({header: 'Chose a component', body: $selectorBody, buttons: {'ok': 'OK', 'cancel': 'Cancel'}});
            self.selectorDlg.show();

            // apply chosen
            $select.chosen({});

            // force first select
            $select.change();

            // dlg handlers
            self.selectorDlg.on('ok', function()
            {
                var component = $select.val();
                var nodeConfig = self.cloneComponentConfig(component);
                nodeConfig.x = self.newNodeX;
                nodeConfig.y = self.newNodeY;


                _.each($('.vax-type-picker'), function(el)
                {
                    var $typePicker = $(el);
                    var typeAlias     = $typePicker.attr('data-type-alias');
                    var typeSignature = $typePicker.attr('data-type-signature');

                    self.fillTypeInstance(nodeConfig, typeAlias, typeSignature);
                });

                var createdNode = self.createNode(nodeConfig);

                self.selectorDlg.destroy();
                delete self.selectorDlg;

                self.lastSelectedComponent = component;

                // select the created node
                self.selection.selectByNodeId(createdNode.getId());

                // push action into history
                self.history.pushAction('createdANode');
            });

            self.selectorDlg.on('cancel', function()
            {
                self.selectorDlg.destroy();
                delete self.selectorDlg;
            })
        };

        // Show create comment dialog
        this.showCommentCreator = function()
        {
            var self = this;

            self.newCommentX = self.mouseX;
            self.newCommentY = self.mouseY;

            var memoValuePicker = vaxRoot.valuePickers.memo;

            memoValuePicker.invoke('', function(commentText)
            {
                var commentConfig = {x: self.newCommentX, y: self.newCommentY, text: commentText};

                // if we have selected nodes -> create comment, surrounding them into group
                var selectionBb = self.selection.getSelectedNodesBoundingBox();
                if (selectionBb)
                {
                    var padding    = 15;
                    var topPadding = 45;

                    commentConfig.x      = selectionBb.left - padding;
                    commentConfig.y      = selectionBb.top - topPadding;
                    commentConfig.width  = selectionBb.right - selectionBb.left + 2 * padding;
                    commentConfig.height = selectionBb.bottom - selectionBb.top + topPadding + padding;
                }

                self.createComment(commentConfig);
            });
        };

        this.createNode = function(config)
        {
            var newId = "VaxNode-" + vax.genNextId();
            var newNode = new VaxNode(newId, config);
            this.nodes[newId] = newNode;

            return newNode;
        };

        this.createComment = function(config)
        {
            var newId = 'VaxComment-' + vax.genNextId();
            var newComment = new VaxComment(newId, config);
            this.comments[newId] = newComment;

            return newComment;
        };

        this.createDraggingGroup = function(rootRect)
        {
            return new VaxDraggingGroup(this, rootRect);
        };

        this.showNewUserFunctionDialog = function()
        {
            var self = this;

            if (self.userFunctionDlg)
            {
                return;
            }

            var $body = $('<input type="text" placeholder="Function name" name="name" maxlength="50" class="vax-text-input vax-text-input-wide" /><hr/>Type params: <select><option value="0">None</option><option value="1">[A]</option><option value="2">[A, B]</option><option value="3">[A, B, C]</option></select>')

            self.userFunctionDlg = self.ui.createDialog({header: 'Create a function', body: $body, buttons: {'ok': 'OK', 'cancel': 'Cancel'}});
            self.userFunctionDlg.show();

            var $dlg = self.userFunctionDlg.$dlg;

            $('select', $dlg).chosen({});
            $('input[name="name"]', $dlg).focus();

            self.userFunctionDlg.on('ok', function()
            {
                var functionName    = $.trim($('input[name="name"]', $dlg).val()).substring(0, 50);
                var typeParamsCount = $('select', $dlg).val();

                if (functionName.length > 0)
                {
                    var selectedGraph = self.selection.serializeSelectedGraph();

                    var tabId = self.tabs.createNewFunctionTab(self.userFunctionStorage.generateNewId(), functionName, typeParamsCount);
                    self.tabs.switchToTab(tabId);

                    if (selectedGraph)
                    {
                        self.appendGraph(selectedGraph);
                    }

                    // add UF_Function node if one is missing
                    var functionNode = _.find(self.nodes, function(node) { return node.config.component == 'UF_Function'; });
                    if (!functionNode)
                    {
                        self.appendGraph({nodes:[{id:1,c:"UF_Function", x: self.canvasWidth * .6, y: self.canvasHeight * .3,a: {"Title": functionName}}]});
                    }

                    // close dlg
                    self.userFunctionDlg.destroy();
                    delete self.userFunctionDlg;
                }
            });

            self.userFunctionDlg.on('cancel', function()
            {
                self.userFunctionDlg.destroy();
                delete self.userFunctionDlg;
            });
        };

        function VaxDraggingGroup(vax, rootRect)
        {
            var self = this;

            if (!(vax instanceof VAX))
            {
                throw new Error("Instance of VAX was expected!");
            }

            this.vaxRoot = vax;
            this.rootRect = rootRect;
            this.children = [];
            this.$events = $('<div/>');
            this.dragX = null;
            this.dragY = null;

            this.getX = function()
            {
                return this.rootRect.attr('x');
            };

            this.getY = function()
            {
                return this.rootRect.attr('y');
            };

            this.addCircle = function(circle)
            {
                this.children.push({
                    type:'circle',
                    shape: circle,
                    dx: this.rootRect.attr('x') - circle.attr('cx'),
                    dy: this.rootRect.attr('y') - circle.attr('cy')
                });

                return this;
            };

            this.addSet = function(set)
            {
                this.children.push({
                    type: 'set',
                    shape: set,
                    dx: 0,
                    dy: 0
                });

                return this;
            };

            this.addText = function(text)
            {
                this.children.push({
                    type: 'text',
                    shape: text,
                    dx: this.rootRect.attr('x') - text.attr('x'),
                    dy: this.rootRect.attr('y') - text.attr('y')
                });

                return this;
            };

            this.addRect = function(rect)
            {
                this.children.push({
                    type: 'rect',
                    shape: rect,
                    dx: this.rootRect.attr('x') - rect.attr('x'),
                    dy: this.rootRect.attr('y') - rect.attr('y')
                });

                return this;
            };

            this.rootRect.drag(
                function (dx, dy, nx, ny)
                {
                    self.move(self.dragX + dx, self.dragY + dy);
                },

                function (x, y) {
                    self.vaxRoot.isDragging = true;
                    self.dragX = this.attr('x');
                    self.dragY = this.attr('y');
                    self.trigger('dragstart');
                },

                function (evt) {
                    self.vaxRoot.isDragging = false;

                    self.dragX = null;
                    self.dragY = null;

                    self.vaxRoot.refreshScrollSliders();

                    self.trigger('dragend');
                }
            );

            this.on = function(evt, handler)
            {
                this.$events.on(evt, handler);
                return this;
            };

            this.trigger = function(evt, params)
            {
                this.$events.trigger(evt, params);
                return this;
            };

            this.move = function(x, y, stopEventPropagation)
            {
                var dx = this.rootRect.attr('x') - x;
                var dy = this.rootRect.attr('y') - y;

                var rx = x;
                var ry = y;

                this.rootRect.attr({x: x, y: y});

                _.each(this.children, function(child)
                {
                    switch (child.type)
                    {
                        case 'circle':
                            child.shape.attr({
                                cx: rx - child.dx,
                                cy: ry - child.dy
                            });
                            break;

                        case 'set':
                            child.shape.translate(-dx, -dy);
                            break;

                        default:
                            child.shape.attr({
                                x: rx - child.dx,
                                y: ry - child.dy
                            });
                    }
                });

                if (!stopEventPropagation)
                {
                    this.trigger('drag', [x, y, dx, dy]);
                }

                return this;
            };

            this.remove = function()
            {
                _.each(self.children, function(child)
                {
                    child.shape.remove();
                });

                self.rootRect.remove();
            };

            this.toBack = function()
            {
                _.each(self.children, function(child)
                {
                    child.shape.toBack();
                });
            };

            this.toFront = function()
            {
                _.each(self.children, function(child)
                {
                    child.shape.toFront();
                });
            };
        };

        function VaxSelection(vax)
        {
            var self = this;

            if (!(vax instanceof VAX))
            {
                throw new Error("Instance of VAX was expected!");
            }

            this.vaxRoot     = vax;
            this.nodesIds    = [];
            this.wiresIds    = [];

            this.getNodesIds = function()
            {
                return this.nodesIds;
            };

            this.clear = function()
            {
                this.clearNodes();
                this.clearWires();
            };

            this.clearNodes = function()
            {
                var self = this;

                _.each(this.nodesIds, function(nodeId)
                {
                    if (nodeId in vaxRoot.nodes)
                    {
                        vaxRoot.nodes[nodeId].deselect();
                    }
                });
                this.nodesIds = [];
            };

            this.clearWires = function()
            {
                _.each(this.wiresIds, function(wireId)
                {
                    if (wireId in vaxRoot.wires)
                    {
                        vaxRoot.wires[wireId].deselect();
                    }
                });


                this.wiresIds = [];
            };

            this.testByRect = function(rect)
            {
                // test nodes
                var nodesIds = _.map(
                    _.filter(
                        this.vaxRoot.nodes,
                        function(node) { return window.vax.doesRectangleContainOther(rect, node.getBoundingBox()); }
                    ),
                    function(node) { return node.getId(); }
                );

                // test wires
                var wiresIds = [];
                if (_.size(nodesIds) == 0)
                {
                    wiresIds = _.map(
                        _.filter(
                            this.vaxRoot.wires,
                            function(wire) { return wire.doesIntersectWithRect(rect); }
                        ),
                        function(wire) { return wire.getId(); }
                    );
                }

                // collect results
                return {
                    nodesIds:    nodesIds,
                    wiresIds:    wiresIds
                };
            };

            this.selectByNodeId = function(nodeId)
            {
                this.clear();
                this.nodesIds = [nodeId];

                if (nodeId in vaxRoot.nodes)
                {
                    this.vaxRoot.nodes[nodeId].highlightSelection();
                }
            };

            this.addNodeIdToSelection = function(nodeId)
            {
                if (_.contains(this.nodesIds, nodeId))
                {
                    return;
                }

                this.clearWires();

                this.nodesIds.push(nodeId);
                if (nodeId in this.vaxRoot.nodes)
                {
                    this.vaxRoot.nodes[nodeId].highlightSelection();
                }
            };

            this.removeNodeIdFromSelection = function(nodeId)
            {
                if (!_.contains(this.nodesIds, nodeId))
                {
                    return;
                }

                this.nodesIds = _.reject(this.nodesIds, function(givenNodeId) { return givenNodeId == nodeId; });
                if (nodeId in this.vaxRoot.nodes)
                {
                    this.vaxRoot.nodes[nodeId].deselect();
                }
            };

            this.selectByNodesIds = function(nodesIds)
            {
                var self = this;

                this.clear();
                this.nodesIds = nodesIds;

                _.each(nodesIds, function(nodeId)
                {
                    if (nodeId in vaxRoot.nodes)
                    {
                        self.vaxRoot.nodes[nodeId].highlightSelection();
                    }
                });
            };

            this.selectAllNodes = function()
            {
                var self = this;

                self.clear();
                self.nodesIds = [];

                _.each(self.vaxRoot.nodes, function(node) {node.highlightSelection(); self.nodesIds.push(node.getId()); });
            };

            this.hasNodeId = function(nodeId)
            {
                return _.contains(this.nodesIds, nodeId);
            };

            this.selectByRect = function(rect)
            {
                this.clear();

                var selected = this.testByRect(rect);
                this.nodesIds = selected.nodesIds;
                this.wiresIds = selected.wiresIds;

                _.each(this.nodesIds, function(nodeId)
                {
                    if (nodeId in vaxRoot.nodes)
                    {
                        vaxRoot.nodes[nodeId].highlightSelection();
                    }
                });

                _.each(this.wiresIds, function(wireId)
                {
                    if (wireId in vaxRoot.wires)
                    {
                        vaxRoot.wires[wireId].highlightSelection();
                    }
                });
            };

            this.getSelectedNodesBoundingBox = function()
            {
                var self = this;

                if (!this.nodesIds.length)
                {
                    return undefined;
                }

                var nodesBoxes = _.map(this.nodesIds, function(nodeId) { return self.vaxRoot.nodes[nodeId].getBoundingBox(); });

                return {
                    left:   _.min( _.map(nodesBoxes, function(box) { return box.left }) ),
                    top:    _.min( _.map(nodesBoxes, function(box) { return box.top  }) ),

                    right:  _.max( _.map(nodesBoxes, function(box) { return box.right }) ),
                    bottom: _.max( _.map(nodesBoxes, function(box) { return box.bottom }) )
                };
            };

            this.removeSelectedElements = function(forced)
            {
                if (_.size(this.nodesIds) > 0 && (forced || confirm('Вы действительно хотите удалить выделенные узлы?')) )
                {
                    _.each(this.nodesIds, function(nodeId)
                    {
                        if (nodeId in vaxRoot.nodes)
                        {
                            vaxRoot.nodes[nodeId].remove();
                        }
                    });

                    this.nodesIds = [];
                }

                if (_.size(this.wiresIds) > 0 && confirm('Вы действительно хотите удалить выделенные связи?'))
                {
                    _.each(this.wiresIds, function(wireId)
                    {
                        if (wireId in vaxRoot.wires)
                        {
                            vaxRoot.wires[wireId].remove();
                        }
                    });

                    this.wiresIds = [];
                }

                // push action into history
                this.vaxRoot.history.pushAction('removedElements');
            };

            this.serializeSelectedGraph = function()
            {
                return this.nodesIds.length > 0 ? this.vaxRoot.saveGraph(this.nodesIds) : undefined;
            };
        };

        /*
         * TODO:
         * We just save full graph each time and restore it if needed, which is not really effective.
         * But hey, it's so easy to implement and it works!
         *
         * Real implementation ofc should be defining undo/redo code for each type of operation
         */
        function VaxHistory(vax)
        {
            var self = this;

            if (!(vax instanceof VAX)) {
                throw new Error("Instance of VAX was expected!");
            }

            this.vaxRoot = vax;
            this.stack = [];
            this.MAX_SIZE = 20;

            this.pushAction = function(action)
            {
                this.stack.push(this.vaxRoot.saveGraph());

                if (this.stack.length > this.MAX_SIZE)
                {
                    this.stack.shift();
                }
            };

            this.undo = function()
            {
                if (this.stack.length > 1)
                {
                    var prevGraph = this.stack[this.stack.length - 2];
                    this.vaxRoot.loadGraph(prevGraph);
                    this.vaxRoot.selection.clear();
                    this.stack.pop();
                }
            };
        };

        function VaxClipboard(vax)
        {
            var self = this;

            if (!(vax instanceof VAX)) {
                throw new Error("Instance of VAX was expected!");
            }

            this.vaxRoot = vax;
            this.bufferGraph = null;

            this.copy = function()
            {
                var selectedGraph = this.vaxRoot.selection.serializeSelectedGraph();

                if (selectedGraph)
                {
                    this.bufferGraph = selectedGraph;
                }
            };

            this.cut = function()
            {
                this.copy();
                this.vaxRoot.selection.removeSelectedElements(true);
            };

            this.paste = function()
            {
                if (this.bufferGraph)
                {
                    var pastedNodesIds = this.vaxRoot.appendGraph(this.bufferGraph, {x: 50, y: 50});

                    this.vaxRoot.selection.selectByNodesIds(pastedNodesIds);

                    this.vaxRoot.history.pushAction('pasted');
                }
            };
        };

        function VaxSocket(id, node, nodeIndex, config, kind)
        {
            var self = this;

            if (!(node instanceof VaxNode)) {
                throw new Error("Instance of VaxNode was expected");
            }

            this.id = id;
            this.node = node;
            this.vaxRoot = node.getVAX();
            this.nodeIndex = nodeIndex;

            this.config = _.defaults(config, {
                color: "#fff",
                name: "",
                title: "",
            });

            this.kind = kind;

            this.wires = {};

            this.createCircle = function()
            {
                var autoHeightDimensions = self.node.calcAutoHeightDimensions();

                var nodeX = self.node.getX();
                var nodeY = self.node.getY();

                var circle = self.isInput()
                    ? raphael.circle(nodeX, nodeY + (self.nodeIndex + 1) * 20 + autoHeightDimensions.caption, 5)
                    : raphael.circle(nodeX, nodeY + autoHeightDimensions.attributes + (self.nodeIndex + 1) * 20, 5);

                self.circle = circle;

                return circle;
            };

            this.createCaption = function()
            {
                var cx = self.circle.attr("cx");
                var cy = self.circle.attr("cy");

                if (self.isInput())
                {
                    self.caption = raphael.text(cx + 10, cy, self.config.title + " (" + self.config.type + ')');
                    self.caption.attr('text-anchor', 'start');
                }
                else
                {
                    self.caption = raphael.text(cx - 10, cy, '(' + self.config.type + ')');
                    self.caption.attr('text-anchor', 'end');
                }

                self.caption.attr({
                    "fill": "#fff",
                    "font-family": "Tahoma",
                    "font-size": "10pt"
                });
            };

            this.getBoundingBoxWidth = function()
            {
                return this.caption.getBBox().width + 10 + 10;
            };

            this.alignToNodeWidth = function()
            {
                var nodeX = self.node.getX();
                var nodeWidth = self.node.getWidth();

                if (self.isOutput())
                {
                    self.circle.attr('cx', nodeX + nodeWidth);
                    self.caption.attr('x', nodeX + nodeWidth - 10);
                }
            };

            this.attachToNodeDraggingGroup = function()
            {
                self.node.getDraggingGroup().addCircle(self.circle);
                self.node.getDraggingGroup().addText(self.caption);
            };

            this.init = function ()
            {
                // init shapes
                self.circle = self.createCircle();
                self.circle.toFront();
                self.circle.attr({
                    "stroke-width": 2,
                    stroke: self.config.color,
                    cursor: 'pointer',
                    fill: '#000',
                });
                self.circle.data("vaxType", "socket");
                self.circle.data("socketKind", self.kind);
                self.circle.data("nodeId", self.node.getId());
                self.circle.data("socketId", self.id);
                self.circle.data("socketParsedType", self.config.parsedType);

                self.createCaption();

                // init drag handlers
                self.circle.drag(
                    // drag
                    function (dx, dy, nx, ny)
                    {
                        if (this.drawWire)
                        {
                            this.drawWire.remove();
                        }

                        var cx = self.circle.attr("cx");
                        var cy = self.circle.attr("cy");

                        this.drawWire = raphael.path(vax.buildWirePath(cx, cy, nx - vaxRoot.canvasOffset.left + vaxRoot.viewBox.left, ny - vaxRoot.canvasOffset.top + vaxRoot.viewBox.top));
                        this.drawWire.toBack();
                        this.drawWire.attr({
                            'stroke': self.config.color,
                            'stroke-width': 3,

                        });
                        this.drawWire.attr(self.isOutput() ? 'arrow-end' : 'arrow-start', 'classic-narrow-long');
                    },

                    // start dragging
                    function (x, y) {
                        self.vaxRoot.isWiring = true;
                        self.circle.attr({fill: self.config.color});
                    },
                    // end
                    function (evt) {
                        if (this.drawWire)
                        {
                            this.drawWire.remove();
                        }

                        var targetSocket = raphael.getElementByPoint(evt.clientX, evt.clientY);
                        if (targetSocket)  // we have a target
                        {
                            if (targetSocket.data("vaxType") === "socket")
                            {
                                // different kinds, not the same socket/node
                                if (targetSocket.data("socketKind") !== self.kind && targetSocket.data("socketId") !== self.id && targetSocket.data("nodeId") !== self.node.getId())
                                {

                                    // check if we dont wire more than 1 time an output socket
                                    var targetSocketObj = vaxRoot.sockets[targetSocket.data("socketId")];
                                    if (!(targetSocketObj.isInput() && targetSocketObj.isWired()))
                                    {
                                        // check type compatibility
                                        var inputParsedType  = self.isInput() ? self.config.parsedType : targetSocket.data("socketParsedType");
                                        var outputParsedType = self.isInput() ? targetSocket.data("socketParsedType") : self.config.parsedType;

                                        if (vaxRoot.areParsedTypesCompatible(inputParsedType, outputParsedType))
                                        {
                                            vaxRoot.wire(self.id, targetSocket.data("socketId"));

                                            // push action into history
                                            vaxRoot.history.pushAction('wired2Sockets');
                                        }
                                    }
                                }
                            }
                        }
                        else
                        {
                            // we do nothing ?
                        }

                        self.refreshState(); // refresh state of circle

                        self.vaxRoot.isWiring = false;
                    }
                );

                // dragging group move handler
                self.node.getDraggingGroup().on('drag', function()
                {
                    self.refreshWires();
                });
            };

            this.refreshWires = function ()
            {
                // wires
                for (var k in self.wires)
                {
                    if (self.wires.hasOwnProperty(k))
                    {
                        vaxRoot.wires[k].refresh();
                    }
                }
            };

            this.getNode = function()
            {
                return this.node;
            };

            this.getCX = function() {
                return self.circle.attr("cx");
            };

            this.getCY = function() {
                return self.circle.attr("cy");
            };

            this.wire = function(wireId)
            {
                self.wires[wireId] = true;
                self.circle.attr({fill: self.config.color});
            };

            this.hasWire = function(wireId)
            {
                return self.wires.hasOwnProperty(wireId);
            };

            this.isConnectedToSocket = function(targetSocketId)
            {
                for( var k in self.wires)
                {
                    if (self.wires.hasOwnProperty(k))
                    {
                        var wire = vaxRoot.wires[k];

                        if (this.isInput() && wire.getOutputSocketId() === targetSocketId)
                        {
                            return true;
                        }
                        else if(this.isOutput() && wire.getInputSocketId() === targetSocketId)
                        {
                            return true;
                        }
                    }
                }

                return false;
            };

            this.isInput = function()
            {
                return self.kind === "input";
            };

            this.isOutput = function()
            {
                return self.kind === "output";
            };

            this.isWired = function() {
                return _.keys(self.wires).length > 0;
            };

            this.getWireIds = function()
            {
                return _.keys(this.wires);
            };

            this.unwire = function(wireId)
            {
                delete self.wires[wireId];
                self.refreshState();
            };

            this.refreshState = function()
            {
                if (!self.isWired())
                {
                    self.circle.attr({fill:'#000'});
                }
            };

            this.init();
        };

        function VaxUI(vax)
        {
            var self = this;

            if (!(vax instanceof VAX))
            {
                throw new Error("Instance of VAX was expected");
            }

            self.vaxRoot = vax;
            self.hasOverlay = false;

            this.init = function()
            {
                this.$overlay = $('<button class="vax-overlay"/>');
                vaxRoot.$wrapper.append(this.$overlay);
            };

            this.showOverlay = function()
            {
                this.$overlay.addClass('vax-overlay-visible');
                this.hasOverlay = true;
            };

            this.hideOverlay = function()
            {
                this.$overlay.removeClass('vax-overlay-visible');
                this.hasOverlay = false;
            };

            this.createDialog = function(options)
            {
                var $dlg = $('<div class="vax-dlg vax-text-unselectable"/>');
                
                if (options.header)
                {
                    var $header = $('<div class="vax-dlg-header"/>');

                    var headerContents = options.header;
                    (headerContents instanceof jQuery) ? $header.append(headerContents) : $header.html(headerContents);
                    
                    $dlg.append($header);
                }
                
                if (options.body)
                {
                    var $body = $('<div class="vax-dlg-body"/>');

                    var bodyContents = options.body;
                    (bodyContents instanceof jQuery) ? $body.append(bodyContents) : $body.html(bodyContents);

                    $dlg.append($body);
                }

                if (options.buttons)
                {
                    var $footer = $('<div class="vax-dlg-footer"/>');

                    _.each(options.buttons, function(title, action)
                    {
                        var $btn = $('<button type="button"/>').addClass('vax-dlg-btn').attr('data-action', action).text(title);
                        $footer.append($btn);
                    });

                    $dlg.append($footer);
                }

                return new VaxDialog(this, $dlg);
            };

            this.init();
        };

        function VaxDialog(ui, $dlg)
        {
            var self = this;

            if (!(ui instanceof VaxUI))
            {
                throw new Error("Instance of VaxUI was expected.");
            }

            this.ui = ui;
            this.$dlg = $dlg;

            this.handlers = {};

            $('button[data-action]', $dlg).click(function(e)
            {
                var $btn = $(this);
                var action = $btn.attr('data-action');

                self.trigger(action);
            });

            this.on = function(evt, handler)
            {
                this.$dlg.on(evt, handler);
                return this;
            };

            this.trigger = function(evt, params)
            {
                this.$dlg.trigger(evt, params);
                return this;
            };

            this.show = function()
            {
                this.ui.showOverlay();

                var $wrapper = self.ui.vaxRoot.$wrapper;
                $wrapper.append(self.$dlg);

                this.center();
            };

            this.center = function()
            {
                var $wrapper = this.ui.vaxRoot.$wrapper;

                var left = ($wrapper.width() - self.$dlg.width()) / 2;
                var top  = ($wrapper.height() - self.$dlg.height()) / 2;

                self.$dlg.css({left: left, top: top});
            };

            this.destroy = function()
            {
                self.$dlg.remove();
                self.ui.hideOverlay();

                this.trigger('destroy');
            };
        };

        function VaxTabs(vaxRoot)
        {
            var self = this;

            if (!(vaxRoot instanceof VAX)) {
                throw new Error("Instance of VAX was expected");
            }

            this.vaxRoot = vaxRoot;

            this.tabs = {
                'blueprint': {
                    id: 'blueprint',
                    history: new VaxHistory(vaxRoot),
                    graph: {},
                    type: 'blueprint',
                    functionName: null,
                    functionTypeParams: [],
                    isSaved: false
                }
            };

            this.currentTabId = 'blueprint';

            var $tabsWrapper = this.$tabsWrapper = this.vaxRoot.$tabsWrapper;

            this.init = function()
            {
                var $blueprint = this.$blueprint = $('<div class="vax-tab vax-tab-is-active" data-tab="blueprint">Blueprint</div>');
                this.$tabsWrapper.append($blueprint);

                this.$tabsWrapper.on('click', '[data-tab]', function()
                {
                    self.switchToTab($(this).attr('data-tab'));
                });
            };

            this.createNewFunctionTab = function(id, name, typeParamsCount)
            {
                var tabId = id;

                var title = name;
                var typeParamsStack = ['A', 'B', 'C'];
                var typeParams = typeParamsStack.slice(0, typeParamsCount);

                if (typeParamsCount > 0)
                {
                    title = title + ' [' + typeParams.slice(0, typeParamsCount).join(', ') + ']';
                }

                var $tab = $('<div class="vax-tab"/>').text(title).attr('data-tab', tabId);
                var $tabCloser = $('<div class="vax-tab-close">x</div>');
                $tab.append($tabCloser);

                $tabCloser.click(function()
                {
                    self.closeTabId(tabId);
                });

                this.$tabsWrapper.append($tab);

                this.tabs[tabId] = {
                    id: tabId,
                    history: new VaxHistory(self.vaxRoot),
                    graph: {},
                    type: 'function',
                    functionName: name,
                    functionTypeParams: typeParams,
                    isSaved: false
                };

                return tabId;
            };

            this.closeTabId = function(tabId)
            {
                $('[data-tab="' + tabId + '"]', this.$tabsWrapper).remove();
                delete this.tabs[tabId];

                this.switchToTab( _.last(_.keys(this.tabs)) );
            };

            this.openExistingFunctionInTab = function(userFunctionId)
            {
                if (userFunctionId in this.tabs)
                {
                    this.switchToTab(userFunctionId);
                }
                else
                {
                    var uf = this.vaxRoot.userFunctionStorage.get(userFunctionId);
                    if (uf)
                    {
                        var typeParamsCount = 0;
                        if (uf.component.typeParams && uf.component.typeParams.length)
                        {
                            typeParamsCount = uf.component.typeParams.length;
                        }

                        this.createNewFunctionTab(userFunctionId, uf.name, typeParamsCount);
                        this.switchToTab(userFunctionId);
                        this.vaxRoot.appendGraph(uf.graph);
                    }
                }
            };

            this.compileUserFunction = function()
            {
                var self = this;

                if (this.isCurrentlyFunction())
                {
                    var currentTab = this.getCurrentTab();

                    var functionComponent = this.vaxRoot.compileUserFunction({
                        id: currentTab.id,
                        name: currentTab.functionName,
                        trees: this.vaxRoot.composeTrees(),
                        graph: self.vaxRoot.saveGraph(),
                        typeParams: currentTab.functionTypeParams
                    });
                }
            };

            this.switchToTab = function(newTabId)
            {
                if (this.currentTabId == newTabId)
                {
                    return;
                }

                var prevTabId = this.currentTabId;

                // save prev tabId graph
                this.vaxRoot.selection.clear();
                if (this.tabs[prevTabId])
                {
                    var gr = this.tabs[prevTabId].graph = this.vaxRoot.saveGraph();
                }

                // switch to new graph
                this.currentTabId = newTabId;
                this.vaxRoot.history = this.getCurrentTabHistory();
                this.vaxRoot.loadGraph(this.tabs[newTabId].graph);

                // visual stuff
                $('.vax-tab', this.vaxRoot.$wrapper).removeClass('vax-tab-is-active');
                $('.vax-tab[data-tab="' + newTabId + '"]', this.vaxRoot.$wrapper).addClass('vax-tab-is-active');
            };

            this.getCurrentTabHistory = function()
            {
                return this.tabs[this.currentTabId].history;
            };

            this.isCurrentlyFunction = function()
            {
                return this.getCurrentTab().type == 'function';
            };

            this.isCurrentlyBlueprint = function()
            {
                return this.getCurrentTab().type == 'blueprint';
            };

            this.getCurrentTab = function()
            {
                return this.tabs[this.currentTabId];
            };

            this.getCurrentFunctionTypeParams = function()
            {
                return this.getCurrentTab().functionTypeParams;
            };

            this.getCurrentFunctionTypeParamsForPicker = function()
            {
                var types = {};
                _.each(this.getCurrentTab().functionTypeParams, function(name) { name = '@' + name; types[name] = {extends: 'Any'};});

                return types;
            };

            this.isCurrentTabSaved = function()
            {
                return this.getCurrentTab().isSaved;
            };
        };

        function VaxUserFunctionStorage(vaxRoot)
        {
            var self = this;

            this.functions = {};

            if (!(vaxRoot instanceof VAX)) {
                throw new Error("Instance of VAX was expected");
            }

            this.vaxRoot = vaxRoot;

            this.loadAll = function()
            {
                for (var k in window.localStorage)
                {
                    if (window.localStorage.hasOwnProperty(k))
                    {
                        if (k.substr(0, 7) == 'vax_uf_')
                        {
                            try {
                                var uf = JSON.parse(localStorage[k]);
                            }
                            catch (e)
                            {
                                window.console.debug("Couldn't parse json for id: " + k, localStorage[k], e);
                            }

                            if (uf && uf.component && uf.graph)
                            {
                                var ufId = uf.id = k;
                                uf.name = uf.name || ufId;

                                this.functions[ufId] = uf;

                                // force component group
                                uf.component.group = "_userFunctions";

                                this.vaxRoot.schema.components[ufId] = this.vaxRoot.buildComponentConfig(uf.component, uf.component.name, {id: ufId, name: uf.name});
                            }
                        }
                    }
                }
            };

            this.save = function(id, name, componentConfig, graph)
            {
                var uf = {id: id, name: name, component: componentConfig, graph: graph};
                this.functions[id] = uf;

                window.localStorage.setItem(id, JSON.stringify(uf));
            };

            this.getAll = function()
            {
                return this.functions;
            };

            this.get = function(id)
            {
                return this.functions[id];
            };

            this.has = function(c)
            {
                return (c in this.functions);
            };

            this.generateNewId = function()
            {
                var d = new Date();
                return 'vax_uf_' + d.getTime() + '_' + d.getMilliseconds() + '_' + vax.genNextId(); // add some session user prefix so they never collapseroni
            };
        };

        function VaxAttribute(id, node, nodeIndex, config)
        {
            var self = this;

            if (!(node instanceof VaxNode)) {
                throw new Error("Instance of VaxNode was expected");
            }

            this.id = id;
            this.node = node;
            this.vaxRoot = node.getVAX();
            this.nodeIndex = nodeIndex;
            this.config = _.defaults(config, {
                color: "#fff",
                name: "A",
                title: "Attr",
                default: "",
                valuePicker: {type: 'default'}
            });
            this.value = this.config.default;

            this.nodeMaxWidth = null;

            this.valuePicker = self.vaxRoot.valuePickers[self.config.valuePicker.type]; // TODO: more error checks

            this.createCaption = function()
            {
                var nodeX = self.node.getX();
                var nodeY = self.node.getY();

                var autoHeightDimensions = self.node.calcAutoHeightDimensions();

                self.rect = raphael.rect(nodeX + 5, nodeY + autoHeightDimensions.inputSockets + (self.nodeIndex + 1) * 35 - 19, 10, 10, 2);
                self.rect.attr({
                    "fill": vaxRoot.getColorOfParsedType(self.config.type),
                    "stroke-width": 0,
                    "title": "Click to change this value ...",
                    "cursor": "pointer"
                });
                self.rect.click(function() {self.invokeValuePicker();});
                this.node.getDraggingGroup().addRect(self.rect);

                self.caption = raphael.text(nodeX + 20, nodeY + autoHeightDimensions.inputSockets + (self.nodeIndex + 1) * 35 - 15, self.config.title);
                self.caption.attr({
                    'text-anchor': 'start',
                    "fill": "#fff",
                    "font-family": "Tahoma",
                    "font-size": "12pt",
                    "font-weight": "bold",
                    "title": "Click to change this value ...",
                    "cursor": "pointer"
                });
                self.caption.click(function() {self.invokeValuePicker();});
                this.node.getDraggingGroup().addText(self.caption);
            };

            this.invalidateValueHolder = function()
            {
                if (self.valueHolder)
                {
                    self.valueHolder.remove();
                    self.valueHolder = null;
                }

                var nodeX = self.node.getX();
                var nodeY = self.node.getY();

                var autoHeightDimensions = self.node.calcAutoHeightDimensions();

                var valueTitle = self.getValueTitle(self.value);
                self.valueHolderSet = raphael.paragraph({
                    x: nodeX + 20,
                    y: nodeY + autoHeightDimensions.inputSockets + (self.nodeIndex + 1) * 35,
                    text: valueTitle,
                    maxWidth: self.node.getWidth() - 20 - 5,
                    maxHeight: 20,
                    textStyle: {
                        "text-anchor": 'start',
                        "fill": "orange",
                        "font-family": "Tahoma",
                        "font-size": "12pt",
                        "font-weight": "bold"
                    }
                });

                self.valueHolder = self.valueHolderSet[0];
                self.valueHolder.attr({
                    "title": valueTitle + "\nClick to change this value ...",
                    "cursor": "pointer"
                });

                self.valueHolder.click(function()
                {
                    self.invokeValuePicker();
                });

                this.node.getDraggingGroup().addText(self.valueHolder);
            };

            this.getValueTitle = function(value)
            {
                return this.valuePicker.getValueTitle(value, this.config.valuePicker);

            };

            this.getBoundingBoxWidth = function()
            {
                return this.caption.getBBox().width + 20;
            };

            this.invokeValuePicker = function()
            {
                var self = this;

                var callback = function(value)
                {
                    self.value = value;
                    self.invalidateValueHolder();
                };

                self.valuePicker.invoke(self.value, callback, self.config.valuePicker);
            };

            this.init = function () {

                self.createCaption();
            };

            this.init();
        };

        function VaxNode(id, config) {
            var self = this;

            this.id = id;
            this.attributes = {};
            this.inputSockets = {};
            this.outputSockets = {};
            this.draggingGroup = null;

            this.config = _.defaults(config, {
                title: "Node",
                component: null,
                isUserFunction: false,
                width: 100,
                height: 100,
                color: "0-#490-#070:20-#333", // vaxRoot.config.ui.defaultNodeColor
                x: 0,
                y: 0,
                attributes: {},
                inputSockets: {},
                outputSockets: {},
                typeParams: [],
                typeInstances: {}
            });

            this.getVAX = function()
            {
                return vaxRoot;
            };

            this.getId = function()
            {
                return self.id;
            };

            this.getCompactId = function()
            {
                return parseInt(self.id.replace('VaxNode-', ''));
            };

            this.getConfig = function()
            {
                return self.config;
            };

            this.calcAutoHeightDimensions = function()
            {
                var hasTypeParams = self.config.typeParams.length > 0;
                var captionHeight = hasTypeParams ? 42 : 30;

                var padding      = 15;
                var socketHeight = 20;
                var attrHeight   = 35;

                var inputSocketCount  = _.size(this.config.inputSockets);
                var outputSocketCount = _.size(this.config.outputSockets);
                var attrCount         = _.size(this.config.attributes);

                var inputSocketsHeight = captionHeight + inputSocketCount * socketHeight;
                var attributesHeight   = inputSocketsHeight + attrCount * attrHeight;

                var totalHeight = (
                    captionHeight
                    + inputSocketCount * socketHeight
                    + outputSocketCount * socketHeight
                    + attrCount * attrHeight
                    + padding
                );

                var dimensions = {
                    caption: captionHeight,
                    inputSockets: inputSocketsHeight,
                    attributes: attributesHeight,
                    total: totalHeight
                };

                return dimensions;
            };

            this.init = function ()
            {
                var autoHeight = this.calcAutoHeightDimensions().total;

                // creating move container with width of 10, since we don't know actual width
                self.moveContainer = raphael.rect(self.config.x, self.config.y, 10, autoHeight, 10);
                self.moveContainer.attr({
                    fill: '#000',
                    opacity: .0,
                    cursor: 'move',
                    "title": self.id,
                });

                // create dragging group
                self.draggingGroup = vaxRoot.createDraggingGroup(self.moveContainer);

                // create node caption
                self.nodeCaption = raphael.text(self.config.x + 10, self.config.y + 15, self.config.title);
                self.nodeCaption.attr({
                    "font-family": "Tahoma",
                    "font-size": "12pt",
                    "font-weight": "bold",
                    "fill": "#fff",
                    "text-anchor": "start",

                });
                self.draggingGroup.addText(self.nodeCaption);

                // create type caption
                var hasTypeParams = self.config.typeParams.length > 0;
                if (hasTypeParams)
                {
                    var typeTitle = hasTypeParams ? '[' + _.toArray(self.config.typeInstances).join(',') + ']' : '';

                    self.typeCaption = raphael.text(self.config.x + 10, self.config.y + 30, typeTitle);
                    self.typeCaption.attr({
                        "font-family": "Tahoma",
                        "font-size": "10pt",
                        "font-weight": "bold",
                        "fill": "#ddd",
                        "text-anchor": "start"
                    });

                    self.draggingGroup.addText(self.typeCaption);
                }

                // moveContainer in front of captions
                self.moveContainer.toFront();

                // input sockets
                for (var i = 0; i < self.config.inputSockets.length; ++i) {
                    var socketId = this.id + "-InputSocket-" + vax.genNextId();
                    var inputSocket = new VaxSocket(socketId, self, i, self.config.inputSockets[i], 'input');
                    self.inputSockets[socketId] = inputSocket;
                    vaxRoot.sockets[socketId] = inputSocket;
                }

                // attributes
                for (i = 0; i < self.config.attributes.length; ++i) {
                    var attrId = this.id + "-Attribute-" + vax.genNextId();
                    attr = new VaxAttribute(attrId, self, i, self.config.attributes[i]);
                    self.attributes[attrId] = attr;
                }

                // output sockets
                for (var j = 0; j < self.config.outputSockets.length; ++j) {
                    socketId = this.id + "-OutputSocket-" + vax.genNextId();
                    var outputSocket = new VaxSocket(socketId, self, j, self.config.outputSockets[j], 'output');
                    self.outputSockets[socketId] = outputSocket;
                    vaxRoot.sockets[socketId] = outputSocket;
                }

                // calc final width of node
                var widths = [self.nodeCaption.getBBox().width + 20 + (self.isUserFunction() ? 13 : 0)];
                if (hasTypeParams)
                {
                    widths.push(self.nodeCaption.getBBox().width + 20);
                }

                var inputSocketsWidths  = _.map(self.inputSockets,  function(socket) { return socket.getBoundingBoxWidth(); });
                var outputSocketsWidths = _.map(self.outputSockets, function(socket) { return socket.getBoundingBoxWidth(); });
                var attributesWidths    = _.map(self.attributes,    function(socket) { return socket.getBoundingBoxWidth(); });

                widths = widths.concat(inputSocketsWidths, outputSocketsWidths, attributesWidths);

                var nodeWidth = _.max(widths);

                // move container
                self.moveContainer.attr('width', nodeWidth);

                // bg graphics
                self.bgRect = raphael.rect(self.config.x, self.config.y, nodeWidth, autoHeight, 10);
                self.bgRect.attr({
                    fill: '#111',
                    opacity: .5,
                    stroke: "#000",
                    "stroke-opacity": 1
                });
                self.bgRect.toBack();

                self.captionRect2 = raphael.rect(self.config.x, self.config.y + 10, nodeWidth, hasTypeParams ? 32 : 20);
                self.captionRect2.attr({
                    fill: self.config.color,
                    "stroke-width": 0
                });
                self.captionRect2.toBack();

                // caption rect
                self.captionRect = raphael.rect(self.config.x, self.config.y, nodeWidth, hasTypeParams ? 42 : 30, 10);
                self.captionRect.attr({
                    fill: self.config.color,
                    "stroke-width": 0
                });
                self.captionRect.toBack();

                // add bg graphics to dragging group
                self.draggingGroup.addRect(self.bgRect).addRect(self.captionRect).addRect(self.captionRect2);

                // realign sockets to a new node width and attach to dragging group
                _.each(self.inputSockets, function(socket) { socket.alignToNodeWidth(); socket.attachToNodeDraggingGroup(); });
                _.each(self.outputSockets, function(socket) { socket.alignToNodeWidth(); socket.attachToNodeDraggingGroup(); });

                // invalidate attributes value holders
                _.each(self.attributes, function(attribute) { attribute.invalidateValueHolder(); });

                // add userFunction marker if needed
                if (self.isUserFunction())
                {
                    self.userFunctionMarker = raphael.text(self.config.x + nodeWidth - 10, self.config.y + 15, "f");
                    self.userFunctionMarker.attr({
                        "text-anchor": "end",
                        "title": "This node is a user function",
                        "fill": "#ff0",
                        "font-size": "16",
                        "cursor": "help",
                        'font-weight':"bold"
                    });
                    self.draggingGroup.addText(self.userFunctionMarker);
                }

                // refresh scrollbars sliders
                vaxRoot.refreshScrollSliders();

                // remove selection on 2x click
                self.moveContainer.dblclick(function()
                {
                    if (self.isUserFunction())
                    {
                        self.getVAX().tabs.openExistingFunctionInTab(self.config.userFunction.id);
                    }
                    else
                    {
                        self.getVAX().selection.removeSelectedElements();
                    }
                });

                // dragging group handlers
                self.draggingGroup.on('dragstart', function()
                {
                    self.draggingGroupsOffsets = {};

                    var vax = self.getVAX();
                    var selection = vax.selection;

                    if (!selection.hasNodeId(self.id))
                    {
                        if (vax.isCtrlDown)
                        {
                            selection.addNodeIdToSelection(self.id);
                        }
                        else
                        {
                            selection.selectByNodeId(self.id);
                        }
                    }
                    else
                    {
                        if (vax.isCtrlDown)
                        {
                            selection.removeNodeIdFromSelection(self.id);
                        }
                        else
                        {
                            // drag other groups accordingly
                            _.each(selection.getNodesIds(), function(nodeId)
                            {
                                if (nodeId == self.id)
                                {
                                    return;
                                }

                                var node = self.getVAX().nodes[nodeId];
                                if (node)
                                {
                                    self.draggingGroupsOffsets[nodeId] = {
                                        dx: node.draggingGroup.getX() - self.draggingGroup.getX(),
                                        dy: node.draggingGroup.getY() - self.draggingGroup.getY(),
                                    };
                                }
                            });
                        }
                    }
                });

                self.draggingGroup.on('drag', function(evt, x, y)
                {
                    _.each(self.draggingGroupsOffsets, function(offset, nodeId)
                    {
                        var node = self.getVAX().nodes[nodeId];
                        if (node)
                        {
                            node.draggingGroup.move(x + offset.dx, y + offset.dy, false);
                        }
                    });
                });

                self.draggingGroup.on('dragend', function()
                {
                    self.draggingGroupsOffsets = {};

                    // push action into history
                    self.getVAX().history.pushAction('movedNode');
                });
            };

            this.getDraggingGroup = function()
            {
                return this.draggingGroup;
            };

            // bounding box {left,right,top,bottom)
            this.getBoundingBox = function()
            {
                return {
                    left:   this.moveContainer.attr('x'),
                    top:    this.moveContainer.attr('y'),
                    right:  this.moveContainer.attr('x') + this.moveContainer.attr('width'),
                    bottom: this.moveContainer.attr('y') + this.moveContainer.attr('height'),
                };
            };

            this.getOutputSocketIdByName = function(socketName)
            {
                return this._getSocketIdByName(this.outputSockets, socketName);
            };

            this.getInputSocketIdByName = function(socketName)
            {
                return this._getSocketIdByName(this.inputSockets, socketName);
            };

            this._getSocketIdByName = function(sockets, socketName)
            {
                for (var k in sockets)
                {
                    if (sockets.hasOwnProperty(k))
                    {
                        var is = sockets[k];
                        if (is.config.name == socketName)
                        {
                            return is.id;
                        }
                    }
                }

                return null;
            };

            // удаление
            this.remove = function()
            {
                var removeSocket = function(socket)
                {
                    // remove wires
                    _.each(_.keys(socket.wires), function(wireId)
                    {
                        var wire = vaxRoot.wires[wireId];
                        wire.remove();
                    });

                    // delete from repository
                    delete vaxRoot.sockets[socket.id];
                };

                // remove all sockets
                _.each(self.inputSockets,  removeSocket);
                _.each(self.outputSockets, removeSocket);

                // remove graphics
                self.draggingGroup.remove();

                // delete from repositore
                delete vaxRoot.nodes[self.id];
            };

            this.move = function(nx, ny)
            {
                this.getDraggingGroup().move(nx, ny);
            };
            
            this.highlightSelection = function()
            {
                this.bgRect.attr({
                    'stroke': '#fa0',
                    'stroke-width': 3,
                    'opacity': .7
                });
            };

            this.deselect = function()
            {
                this.bgRect.attr({
                    'stroke': '#000',
                    'stroke-width': 1,
                    'opacity': .5
                });
            };

            this.getX = function () {
                return self.moveContainer.attr("x");
            };

            this.getY = function () {
                return self.moveContainer.attr("y");
            };

            this.isUserFunction = function()
            {
                return this.config.isUserFunction;
            };

            this.getInputSocketsCount = function()
            {
                return _.size(this.inputSockets);
            };

            this.getOutputSocketsCount = function()
            {
                return _.size(this.outputSockets);
            };

            this.getInputSockets = function()
            {
                return this.inputSockets;
            };

            this.getOutputSockets = function()
            {
                return this.outputSockets;
            };

            this.getWiresIds = function()
            {
                var inputWiresIds  = _.map(this.inputSockets,  function(socket) { return socket.getWireIds(); });
                var outputWiresIds = _.map(this.outputSockets, function(socket) { return socket.getWireIds(); });

                var wiresIds = _.unique(_.flatten(_.union(inputWiresIds, outputWiresIds)), false);

                return wiresIds;
            };

            this.getWires = function()
            {
                var self = this;

                return _.map(this.getWiresIds(), function(wireId) { return self.getVAX().wires[wireId]; });
            };

            this.getWidth = function () {
                return self.moveContainer.attr('width')
            };

            this.getHeight = function () {
                return self.config.height;
            };

            this.init();
        }

        this.removeWireById = function(wireId)
        {
            var wire = this.wires[wireId];

            if (wire)
            {
                wire.remove();
                delete this.wires[wireId];
            }
        };

        this.wire = function(socketId1, socketId2)
        {

            if (vaxRoot.sockets[socketId1].isConnectedToSocket(socketId2))
            {
                return null;
            }

            var newWireId = "VaxWire-" + vax.genNextId();
            var newWire = new VaxWire(newWireId, socketId1, socketId2);
            this.wires[newWireId] = newWire;

            return newWire;
        };

        function VaxWire(id, socketId1, socketId2, config)
        {
            var self = this;

            this.id = id;

            var socket1 = vaxRoot.sockets[socketId1];
            var socket2 = vaxRoot.sockets[socketId2];

            if (socket1.isInput() && socket2.isOutput())
            {
                self.inputSocketId = socketId1;
                self.outputSocketId = socketId2;
            }
            else if(socket1.isOutput() && socket2.isInput())
            {
                self.inputSocketId = socketId2;
                self.outputSocketId = socketId1;
            }
            else
            {
                throw new Error("You can only wire input socket to an output one.");
            }


            this.init = function()
            {
                vaxRoot.sockets[self.inputSocketId].wire(self.id);
                vaxRoot.sockets[self.outputSocketId].wire(self.id);

                this.refresh();
            };

            this.getId = function()
            {
                return this.id;
            };

            this.getInputSocketId = function()
            {
                return self.inputSocketId;
            };

            this.getOutputSocketId = function()
            {
                return self.outputSocketId;
            };

            this.getInputSocket = function()
            {
                return vaxRoot.sockets[this.inputSocketId];
            };

            this.getOutputSocket = function()
            {
                return vaxRoot.sockets[this.outputSocketId];
            };

            this.isConnectedToNodeId = function(nodeId)
            {
                return this.getInputSocket().getNode().getId() == nodeId || this.getOutputSocket().getNode().getId();
            };

            this.isConnectedToBothOfNodesIds = function(nodesIds)
            {
                var inputNodeId  = this.getInputSocket().getNode().getId();
                var outputNodeId = this.getOutputSocket().getNode().getId();

                return _.contains(nodesIds, inputNodeId) && _.contains(nodesIds, outputNodeId);
            };

            this.refresh = function()
            {
                if (self.path)
                {
                    self.path.remove();
                }

                var s1 = vaxRoot.sockets[self.inputSocketId];
                var s2 = vaxRoot.sockets[self.outputSocketId];

                self.pathString = vax.buildWirePath(s1.getCX(), s1.getCY(), s2.getCX(), s2.getCY());
                self.path = raphael.path(self.pathString);
                self.path.toBack();
                self.path.attr({
                    'stroke': s2.config.color, // color of output socket
                    'stroke-width': 3,
                    'title': "Wire #" + self.id + " from " + self.inputSocketId + " to " + self.outputSocketId,
                    'arrow-start': 'classic-narrow-long',
                });

                self.path.dblclick(function()
                {
                    self.path.animate({'opacity': 0}, 200, '<', function()
                    {
                        self.remove();
                    });
                });
            };

            this.remove = function()
            {
                vaxRoot.sockets[self.inputSocketId].unwire(self.id);
                vaxRoot.sockets[self.outputSocketId].unwire(self.id);
                delete vaxRoot.wires[self.id];

                if (self.path)
                {
                    self.path.remove();
                }

                if (self.glow)
                {
                    self.glow.remove();
                }
            };



            this.doesIntersectWithRect = function(rect)
            {
                if (!this.path)
                {
                    return false;
                }

                // rough check of bounding box intersction
                var rbb = this.path.getBBox();

                var bb = {
                    left: rbb.x,
                    top: rbb.y,
                    right: rbb.x + rbb.width,
                    bottom: rbb.y + rbb.height
                };

                var bbIntersects = (
                    rect.left < bb.right
                    && rect.right > bb.left
                    && rect.top < bb.bottom
                    && rect.bottom > bb.top
                );

                if (!bbIntersects)
                {
                    return false;
                }

                // for each line of rect, we check if it intersects with pathString
                /**   A-------B
                 *    |       |
                 *    |       |
                 *    C-------D
                 */

                var ab = vax.buildPath(['M', rect.left,  rect.top,    'L', rect.right, rect.top]);
                var bd = vax.buildPath(['M', rect.right, rect.top,    'L', rect.right, rect.bottom]);
                var dc = vax.buildPath(['M', rect.right, rect.bottom, 'L', rect.left,  rect.bottom]);
                var ca = vax.buildPath(['M', rect.left,  rect.bottom, 'L', rect.left,  rect.top]);

                var rectLines = [ab, bd, dc, ca];
                for (var i = 0, l = rectLines.length; i < l; ++i)
                {
                    var rectLine = rectLines[i];

                    if (Raphael.pathIntersection(self.pathString, rectLine).length > 0)
                    {
                        return true;
                    }
                }

                return false;
            };

            this.highlightSelection = function()
            {
                if (self.path)
                {
                    self.glow = self.path.glow({color: '#fb0', 'width': 15});
                }
            };

            this.deselect = function()
            {
                if (self.glow)
                {
                    self.glow.remove();
                }
            };

            this.init();
        };

        function VaxComment(id, config)
        {
            var self = this;

            this.id = id;
            this.draggingGroup = null;

            this.minWidth = 100;
            this.minHeight = 60;

            this.config = _.defaults(config, {
                x: 0,
                y: 0,
                text: ''
            });
            this.text = this.config.text;

            this.getVAX = function()
            {
                return vaxRoot;
            };

            // initialize functions
            this.init = function()
            {
                this.invalidate(self.config.x, self.config.y, self.config.width, self.config.height, true);
            };

            this.invalidateByMoveContainer = function()
            {
                var mc = this.moveContainer;
                this.invalidate(mc.attr('x'), mc.attr('y'), mc.attr('width'), mc.attr('height'), false);
            };


            this.invalidate = function(x, y, width, height, initial)
            {
                if (self.draggingGroup)
                {
                    self.draggingGroup.remove();
                }

                // create new ones
                var padding = 10;

                var textStyle = {
                    "text-anchor": "start",
                    "fill": "#ddd",
                    "font-family": "Tahoma",
                    "font-size": "14pt",
                    "font-weight": "bold"
                };

                if (!width)
                {
                    var paragraph = raphael.paragraph({
                        x: x + padding,
                        y: y + padding + 3,
                        maxHeight: 20,
                        text: self.transformText(self.text),
                        textStyle: textStyle
                    });

                    self.titleText = paragraph[0];
                    width = self.titleText.getBBox().width + 2 * padding;
                }
                else
                {
                    var paragraph = raphael.paragraph({
                        x: x + padding,
                        y: y + padding + 3,
                        maxHeight: 20,
                        maxWidth: width - padding * 2,
                        text: self.transformText(self.text),
                        textStyle: textStyle
                    });

                    self.titleText = paragraph[0];
                }

                if (!height)
                {
                    height = self.minHeight;
                }

                // create move container
                self.moveContainer = raphael.rect(x, y, width, height, 10);
                self.moveContainer.attr({fill: "#000", opacity: 0, "cursor": "move", "title": self.text + "\n\nDouble click to change the comment text ..."});
                self.moveContainer.toBack();

                // bring title text behind move container
                self.titleText.toBack();

                // bg graphics
                self.bgRect = raphael.rect(x, y, width, height, 10);
                self.bgRect.attr({
                    fill: '#555',
                    opacity: .5,
                    stroke: "#fff",
                    "stroke-opacity": 1
                });
                self.bgRect.toBack();

                self.captionRect2 = raphael.rect(x, y + 10, width, 20);
                self.captionRect2.attr({
                    fill: '0-#111:20-#000',
                    "stroke-width": 0
                });
                self.captionRect2.toBack();

                // caption rect
                self.captionRect = raphael.rect(x, y, width, 30, 10);
                self.captionRect.attr({
                    fill: '0-#111:20-#000',
                    "stroke-width": 0
                });
                self.captionRect.toBack();

                // caption border
                self.captionBorder = raphael.rect(x, y + 30, width, 1);
                self.captionBorder.attr({
                    fill: '#777',
                    "stroke-width": 0
                });
                self.captionBorder.toBack();

                // create delete button
                self.deleteCircle = raphael.circle(x + width, y, 10);
                self.deleteCircle.attr({'fill': '#bbb', 'stroke-width': 0, 'cursor': 'pointer'});
                self.deleteText = raphael.text(x + width, y, 'x');
                self.deleteText.attr({'font-size': '12pt', 'font-weight': 'bold', 'cursor': 'pointer'});

                // delete btn handlers
                _.each([self.deleteText, self.deleteCircle], function(el)
                {
                    el.hover(
                        function() {self.deleteCircle.attr({fill: '#cb0'});},
                        function() {self.deleteCircle.attr({fill: '#bbb'});}
                    );

                    el.click(function()
                        {
                            if (confirm('Вы уверены что хотите удалить этот комментарий?')) {
                                self.remove();
                            }
                        }
                    );
                });

                // create sizers
                var sizerThickness = 18;

                self.topSizer     = raphael.rect(x + sizerThickness / 2, y - sizerThickness / 2, width - sizerThickness, sizerThickness);
                self.topSizer.attr({cursor: 'n-resize', 'fill': '#000', 'opacity': 0, 'stroke-width': 0});
                self.topSizer.data('axes', {top: true});

                self.leftSizer     = raphael.rect(x - sizerThickness / 2, y + sizerThickness / 2, sizerThickness, height - sizerThickness / 2);
                self.leftSizer.attr({cursor: 'e-resize', 'fill': '#000', 'opacity': 0, 'stroke-width': 0});
                self.leftSizer.data('axes', {left: true});
                
                self.rightSizer    = raphael.rect(x + width - sizerThickness / 2, y + sizerThickness, sizerThickness, height - sizerThickness / 2);
                self.rightSizer.attr({cursor: 'e-resize', 'fill': '#000', 'opacity': 0, 'stroke-width': 0});
                self.rightSizer.data('axes', {right: true});
                
                self.bottomSizer   = raphael.rect(x + sizerThickness / 2, y + height - sizerThickness / 2, width - sizerThickness, sizerThickness);
                self.bottomSizer.attr({cursor: 'n-resize', 'fill': '#000', 'opacity': 0, 'stroke-width': 0});
                self.bottomSizer.data('axes', {bottom: true, 'fill': '#000', 'opacity': 0, 'stroke-width': 0});
                
                self.blCornerSizer = raphael.rect(x - sizerThickness / 2, y + height - sizerThickness / 2, sizerThickness, sizerThickness);
                self.blCornerSizer.attr({cursor: 'ne-resize', 'fill': '#000', 'opacity': 0, 'stroke-width': 0});
                self.blCornerSizer.data('axes', {bottom: true, left: true});
                
                self.brCornerSizer = raphael.rect(x + width - sizerThickness / 2, y + height - sizerThickness / 2, sizerThickness, sizerThickness);
                self.brCornerSizer.attr({cursor: 'nw-resize', 'fill': '#000', 'opacity': 0, 'stroke-width': 0});
                self.brCornerSizer.data('axes', {bottom: true, right: true});

                self.tlCornerSizer = raphael.rect(x - sizerThickness / 2, y - sizerThickness / 2, sizerThickness, sizerThickness);
                self.tlCornerSizer.attr({cursor: 'nw-resize', 'fill': '#000', 'opacity': 0, 'stroke-width': 0});
                self.tlCornerSizer.data('axes', {top: true, left: true});

                _.each([self.leftSizer, self.rightSizer, self.topSizer, self.bottomSizer, self.blCornerSizer, self.brCornerSizer, self.tlCornerSizer], function(el)
                {
                    el.drag(
                        function (dx, dy, nx, ny)
                        {
                            var axes = el.data('axes');

                            if (axes.left)
                            {
                                self.moveContainer.attr('x', Math.min(self.sizerX + self.sizerW - self.minWidth, self.sizerX + dx));
                                self.moveContainer.attr('width', Math.max(self.minWidth, self.sizerW - dx));
                            }

                            if (axes.right)
                            {
                                self.moveContainer.attr('width', Math.max(self.minWidth, self.sizerW + dx));
                            }

                            if (axes.top)
                            {
                                self.moveContainer.attr('y', Math.min(self.sizerY + self.sizerH - self.minHeight, self.sizerY + dy));
                                self.moveContainer.attr('height', Math.max(self.minHeight, self.sizerH - dy));
                            }

                            if (axes.bottom)
                            {
                                self.moveContainer.attr('height', Math.max(self.minHeight, self.sizerH + dy));
                            }
                        },

                        function (x, y) {
                            self.getVAX().isDragging = true;

                            self.moveContainer.attr({opacity: '.4', 'stroke-width': 2, 'stroke': '#eee', 'stroke-dasharray': ['.']});

                            self.sizerX = self.moveContainer.attr('x');
                            self.sizerY = self.moveContainer.attr('y');
                            self.sizerW = self.moveContainer.attr('width');
                            self.sizerH = self.moveContainer.attr('height');

                        },

                        function (evt) {
                            self.getVAX().isDragging = false;
                            self.moveContainer.attr({opacity: 0, 'stroke-width': 0});
                            self.invalidateByMoveContainer();
                        }
                    );
                });

                // group shit for dragging
                self.draggingGroup = new VaxDraggingGroup(self.getVAX(), self.moveContainer);
                self.draggingGroup.addRect(self.bgRect).addRect(self.captionRect).addRect(self.captionRect2).addRect(self.captionBorder);
                self.draggingGroup.addText(self.titleText);
                self.draggingGroup.addCircle(self.deleteCircle);
                self.draggingGroup.addText(self.deleteText);
                self.draggingGroup.addRect(self.leftSizer).addRect(self.rightSizer).addRect(self.bottomSizer).addRect(self.topSizer).addRect(self.blCornerSizer).addRect(self.brCornerSizer).addRect(self.tlCornerSizer);

                // move all comments to back so u can select nodes

                // handle comment dragging
                self.draggingGroup.on('dragstart', function()
                {
                    self.draggingGroupsOffsets = [];

                    // save grouped nodes Ids offsets
                    _.each(self.getVAX().selection.testByRect(self.getBoundingBox()).nodesIds, function(nodeId)
                    {
                        var node = self.getVAX().nodes[nodeId];
                        if (node)
                        {
                            var nodeDraggingGroup = node.getDraggingGroup();
                            self.draggingGroupsOffsets.push({
                                draggingGroup: nodeDraggingGroup,
                                dx: nodeDraggingGroup.getX() - self.draggingGroup.getX(),
                                dy: nodeDraggingGroup.getY() - self.draggingGroup.getY()
                            });
                        }
                    });
                });

                self.draggingGroup.on('drag', function(evt, x, y)
                {
                    _.each(self.draggingGroupsOffsets, function(item)
                    {
                        item.draggingGroup.move(x + item.dx, y + item.dy);                        
                    });
                });

                self.draggingGroup.on('dragend', function()
                {
                    self.draggingGroupsOffsets = [];

                    // once everything is done, resize scrollbars sizes and save history
                    self.getVAX().refreshScrollSliders();
                    self.getVAX().history.pushAction('commentDragged');
                });

                // 2x click for comment editing
                self.moveContainer.dblclick(function()
                {
                    var memoPicker = self.getVAX().valuePickers.memo;
                    memoPicker.invoke(self.text, function(newComment)
                    {
                        self.text = newComment;
                        self.invalidateByMoveContainer();
                    });
                });

                // once everything is done, resize scrollbars sizes and save history if this is not initial creation
                if (!initial)
                {
                    self.getVAX().refreshScrollSliders();
                    self.getVAX().history.pushAction('commentInvalidated');
                }
            };

            this.getId = function()
            {
                return this.id;
            };

            this.getBoundingBox = function()
            {
                var x = this.moveContainer.attr('x');
                var y = this.moveContainer.attr('y');
                var w = this.moveContainer.attr('width');
                var h = this.moveContainer.attr('height');

                return {
                    left: x,
                    top: y,
                    right: x + w,
                    bottom: y + h
                };
            };

            this.getWidth = function()
            {
                return this.moveContainer.attr('width');
            };

            this.getHeight = function()
            {
                return this.moveContainer.attr('height');
            };

            this.getDraggingGroup = function()
            {
                return this.draggingGroup;
            };

            this.getText = function()
            {
                return this.text;
            };

            this.transformText = function(s)
            {
               return $.trim(s.replace("\n", ' '));
            };

            this.move = function(nx, ny)
            {
                var self = this;

                self.bgRect.attr({x: nx, y: ny});
                self.paragraph.attr({x: nx + 10, y: ny + 10});
            };

            this.remove = function()
            {
                this.draggingGroup.remove();
                delete this.getVAX().comments[this.id];
            };

            // init me!
            this.init();
        };

        // value pickers classes
        function VaxDefaultValuePicker(vaxRoot)
        {
            this.getValueTitle = function(value, options)
            {
                return value;
            };

            this._$createInput = function()
            {
                return $('<input type="text"/>');
            };

            this.invoke = function(value, callback, options)
            {
                var self = this;

                if (self.pickerDlg)
                {
                    return;
                }

                var $body = self._$createInput().val(value);

                self.pickerDlg = vaxRoot.ui.createDialog({header: 'Enter value', body: $body, buttons: {'ok': 'OK', 'cancel': 'Cancel'}});
                self.pickerDlg.show();

                $('input,select,textarea', self.pickerDlg.$dlg).focus();

                self.pickerDlg.on('ok', function()
                {
                    var newValue = $body.val();

                    callback(newValue);

                    self.pickerDlg.destroy();
                    delete self.pickerDlg;
                });

                self.pickerDlg.on('cancel', function()
                {
                    self.pickerDlg.destroy();
                    delete self.pickerDlg;
                });
            };
        };

        function VaxMemoValuePicker(vaxRoot)
        {
            var defaultPicker = new VaxDefaultValuePicker(vaxRoot);

            defaultPicker._$createInput = function()
            {
                return $('<textarea rows="4" cols="20" class="vax-memo"/>');
            };

            return defaultPicker;
        };

        function VaxDictionaryValuePicker(vaxRoot)
        {
            this.getDictionary = function(options)
            {
                return vaxRoot.schema.dictionaries[options.dictionary];
            };

            this.getValueTitle = function(value, options)
            {
                return this.getDictionary(options).values[value] || '';
            };

            this.invoke = function(value, callback, options)
            {
                var self = this;

                if (self.pickerDlg)
                {
                    return;
                }

                var $select = $('<select style="width: 100%;" class="vax-chosen"/>');

                var dict = self.getDictionary(options).values;

                for (var k in dict)
                {
                    var $option = $('<option/>').attr('value', k).text(dict[k]);
                    if (k == value)
                    {
                        $option.attr('checked', 'checked');
                    }

                    $select.append($option);
                }

                self.pickerDlg = vaxRoot.ui.createDialog({header: 'Select value', body: $select, buttons: {'ok': 'OK', 'cancel': 'Cancel'}});
                self.pickerDlg.show();

                $select.chosen({});

                $('select', self.pickerDlg.$dlg).focus();

                self.pickerDlg.on('ok', function()
                {
                    var newValue = $select.val();

                    callback(newValue);

                    self.pickerDlg.destroy();
                    delete self.pickerDlg;
                });

                self.pickerDlg.on('cancel', function()
                {
                    self.pickerDlg.destroy();
                    delete self.pickerDlg;
                });
            };
        };

        // === Working with graphs/trees
        this.findRootNodes = function(graph)
        {
            return _.filter(graph.nodes, function(node)
            {
                return _.every(graph.wires, function(wire) { return wire[0] != node.id; });
            });
        };

        this.composeTrees = function()
        {
            var self = this;

            var graph = self.saveGraph();

            return _.map(this.findRootNodes(graph), function(rootNode) { return self.composeTreeFromGraph(graph, rootNode.id); });
        };

        this.composeTreesInlined = function()
        {
            var self = this;

            var inlinedGraph = self.inlineUserFunctionsInGraph(self.saveGraph());

            return _.map(this.findRootNodes(inlinedGraph), function(rootNode) { return self.composeTreeFromGraph(inlinedGraph, rootNode.id); });
        };

        this.composeTreeFromGraph = function(graph, rootNodeId)
        {
            // graph is: nodes, wires
            var graphNodes = {};
            var graphLinks = {};

            // let's zip nodes with its' ids
            _.each(graph.nodes || [], function(node) { graphNodes[node.id] = node; });

            // let's build links
            _.each(graph.wires || [], function(wire) {
                var outputNodeId = wire[0];
                var outputName   = wire[1];
                var inputNodeId  = wire[2];
                var inputName    = wire[3];

                graphLinks[inputNodeId] = graphLinks[inputNodeId] || [];
                graphLinks[inputNodeId].push({in: inputName, link: outputNodeId, out: outputName});
            });

            var composeTree = function(node, parentsIds, out)
            {
                parentsIds = parentsIds || [];

                if (_.some(parentsIds, function(pid) { return pid == node.id;}))
                {
                    throw new Error("Node " + node.id + " is already present in graph parents: " + parentsIds.join(', '));
                }

                // set new parent Ids
                var newParentsIds = _.union(parentsIds, [node.id]);

                // collect links
                var nodeLinks = {};
                _.each(graphLinks[node.id], function(linkData)
                {
                    nodeLinks[linkData.in] = composeTree(graphNodes[linkData.link], newParentsIds, linkData.out);
                });

                // return leaf data
                var leafData = _.clone(node);

                // delete x,y
                delete leafData.x;
                delete leafData.y;

                leafData.links = nodeLinks;
                leafData.out   = out;

                return leafData;
            };

            return composeTree(graphNodes[rootNodeId], []);
        };

        this.inlineUserFunctionsInGraph = function(graph, userFunctionsIds)
        {
            var self = this;

            if (!userFunctionsIds)
            {
                userFunctionsIds = [];
                _.each(self.schema.components, function(component, name)
                {
                    if (component.isUserFunction)
                    {
                        userFunctionsIds.push(name);
                    }
                });
            }

            var ufNodes = _.filter(graph.nodes, function(node) { return _.contains(userFunctionsIds, node.c); });

            if (!ufNodes.length) // no user functions spotted, we're cool
            {
                return graph;
            }

            _.each(ufNodes, function(ufNode)
            {
                var userFunction = self.userFunctionStorage.get(ufNode.c);

                var ufPrefix = 'uf' + window.vax.genNextId() + '_';
                var ufClonedGraph = self.cloneGraphPrefixed(userFunction.graph, ufPrefix);

                // rewire
                _.each(graph.wires, function(gWire)
                {
                    if (gWire[2] == ufNode.id) // if input is given ufNode
                    {
                        var inputName = gWire[3];

                        // so we find an input from ufClonedGraph with given name
                        var ufInput = _.find(ufClonedGraph.nodes, function(ufNode) { return ufNode.c == 'UF_Input' && ufNode.a.Name == inputName; });
                        if (ufInput)
                        {
                            // we update each wire that out from given UF_Input node
                            _.each(ufClonedGraph.wires, function(ufWire)
                            {
                                if (ufWire[0] == ufInput.id)
                                {
                                    gWire[2] = ufWire[2];
                                    gWire[3] = ufWire[3];

                                    // register cloned wire to delete
                                    ufWire.push('toDelete');
                                }
                            });
                        }
                    }
                    else if (gWire[0] == ufNode.id) // if output is given ufNode
                    {
                        var outputName = gWire[1];

                        // so we find an output from ufClonedGraph with given name
                        var ufOutput = _.find(ufClonedGraph.nodes, function(ufNode) { return ufNode.c == 'UF_Output' && ufNode.a.Name == outputName; });
                        if (ufOutput)
                        {
                            // we update each wire that input from given UF_Output node
                            _.each(ufClonedGraph.wires, function(ufWire)
                            {
                                if (ufWire[2] == ufOutput.id)
                                {
                                    gWire[0] = ufWire[0];
                                    gWire[1] = ufWire[1];

                                    // register cloned wire to delete
                                    ufWire.push('toDelete');
                                }
                            });
                        }
                    }
                });

                // delete system nodes
                var systemNodesIds = [];
                _.each(ufClonedGraph.nodes, function(ufNode)
                {
                    if (ufNode.c.substr(0, 3) == 'UF_')
                    {
                        systemNodesIds.push(ufNode.id);
                    }
                });
                ufClonedGraph.nodes = _.reject(ufClonedGraph.nodes, function(ufNode) { return ufNode.c.substr(0, 3) == 'UF_'; });

                // delete system wires
                ufClonedGraph.wires = _.reject(ufClonedGraph.wires, function(ufWire) { return ufWire[4] == 'toDelete' || _.contains(systemNodesIds, ufWire[0]) || _.contains(systemNodesIds, ufWire[2]); });

                // delete graph rewired wires
                graph.wires = _.reject(graph.wires, function(wire) { return wire[4] == 'toDelete'; });

                // delete ufNode itself
                graph.nodes = _.reject(graph.nodes, function(node) { return node.id == ufNode.id; });

                // merge user function nodes and wires into parent graph
                _.each(ufClonedGraph.nodes, function(clonedNode)
                {
                    graph.nodes.push(clonedNode);
                });
                _.each(ufClonedGraph.wires, function(clonedWire)
                {
                    graph.wires.push(clonedWire);
                });
            });

            // check if we've introduced new user functions by inlining
            ufNodes = _.filter(graph.nodes, function(node) { return _.contains(userFunctionsIds, node.c); });

            if (!ufNodes.length) // no user functions spotted, we're cool
            {
                return graph;
            }
            else
            {
                // repeat until we have no user functions left
                return this.inlineUserFunctionsInGraph(graph, userFunctionsIds);
            }
        };

        this.cloneGraphPrefixed = function(graph, prefix)
        {
            var cloneGraph = {nodes: [], wires: []};

            for (var i = 0, l = graph.nodes.length; i < l; i++)
            {
                var nodeClone = _.clone(graph.nodes[i]);
                nodeClone.id  = prefix + nodeClone.id;

                cloneGraph.nodes.push(nodeClone);
            }

            for (i = 0, l = graph.wires.length; i < l; ++i)
            {
                var wireClone = _.clone(graph.wires[i]);
                wireClone[0] = prefix + wireClone[0];
                wireClone[2] = prefix + wireClone[2];

                cloneGraph.wires.push(wireClone);
            }

            return cloneGraph;
        };

        this.inlineUserFunctions = function()
        {
            var inlineGraph = this.inlineUserFunctionsInGraph(this.saveGraph());
            this.loadGraph(inlineGraph);

            return inlineGraph;
        };

        this.serializeTrees = function()
        {
            return JSON.string(this.composeTrees());
        };

        this.saveGraph = function(filterNodesIds)
        {
            var self = this;

            var nodesToPickle = filterNodesIds ? this.getNodesByIds(filterNodesIds) : self.nodes;

            // --- nodes
            var nodesPickles = _.map(nodesToPickle, function(node) {
                var nodePickle = {
                    id: node.getCompactId(),
                    c: node.config.component,
                    x: node.getX(),
                    y: node.getY()
                };

                if (!_.isEmpty(node.config.typeInstances))
                {
                    nodePickle.t = node.config.typeInstances;
                }

                if (!_.isEmpty(node.attributes))
                {
                    var pickledAttrs = {};
                    _.each(node.attributes, function(attr, k)
                    {
                        pickledAttrs[attr.config.name] = attr.value;
                    });

                    nodePickle.a = pickledAttrs;
                }

                return nodePickle;
            });

            // --- wires
            var wiresToPickle = filterNodesIds ? self.getWiresBetweenNodesIds(filterNodesIds) : self.wires;

            var wiresPickles = _.map(wiresToPickle, function(wire)
            {
                var input  = self.sockets[wire.getInputSocketId()];
                var output = self.sockets[wire.getOutputSocketId()];

                return [output.getNode().getCompactId(), output.config.name, input.getNode().getCompactId(), input.config.name];
            });
            
            // --- comments
            var commentsToPickle = filterNodesIds ? {} : self.comments; // if there's a filter on nodes -> we don't save comments at all

            var commentsPickles = _.map(commentsToPickle, function(comment)
            {
                var commentBb = comment.getBoundingBox();
                return {t: comment.getText(), x: commentBb.left, y: commentBb.top, w: comment.getWidth(), h: comment.getHeight()};
            });

            // gather everything in a blueprint
            return {
                nodes:    nodesPickles,
                wires:    wiresPickles,
                comments: commentsPickles
            };
        };

        this.serializeGraph = function()
        {
            return JSON.stringify(this.saveGraph());
        };

        this.getNodesByIds = function(nodesIds)
        {
            var self = this;
            return _.map(nodesIds, function(nodeId) { return self.nodes[nodeId]; });
        };

        this.getWiresBetweenNodesIds = function(nodesIds)
        {
            var self = this;
            var wiresIds = [];

            _.each(nodesIds, function(nodeId)
            {
                var nodeWires = self.getNodeById(nodeId).getWires();

                _.each(nodeWires, function(wire)
                {
                    if (wire.isConnectedToBothOfNodesIds(nodesIds))
                    {
                        wiresIds.push(wire.id);
                    }
                });
            });

            wiresIds = _.unique(wiresIds);

            return _.map(wiresIds, function(wireId) { return self.wires[wireId]; });
        };

        this.serializeGraph = function()
        {
            return JSON.stringify(this.saveGraph());
        };

        this.clear = function()
        {
            _.each(this.nodes, function(node)
            {
                node.remove();
            });

            _.each(this.comments, function(comment)
            {
                comment.remove();
            });
        };

        this.loadGraph = function(graph)
        {
            this.clear();
            return this.appendGraph(graph);
        };

        this.appendGraph = function(graph, positionOffset)
        {
            var self = this;

            positionOffset = _.defaults(positionOffset, {
                x: 0,
                y: 0
            });

            // pickledId -> realId nodes mapping
            var nodesIdsMap = {};

            if (graph.nodes)
            {
                _.each(graph.nodes, function(nodePickle)
                {
                    // TODO: handle errors and return them
                    // TODO: if case of nodes/wires/attrs -> show errors as comments on canvas in places of nodes
                    var component = nodePickle.c;

                    if (!component || !self.isComponentAppropriate(component))
                    {
                        return;
                    }

                    var nodeConfig = self.cloneComponentConfig(component);

                    if (!nodeConfig)
                    {
                        return;
                    }

                    // fill in type instances
                    if (nodePickle.t)
                    {
                        _.each(nodePickle.t, function(actualType, typeAlias)
                        {
                            self.fillTypeInstance(nodeConfig, typeAlias, actualType);
                        });
                    }

                    // set attributes
                    if (nodePickle.a)
                    {
                        _.each(nodePickle.a, function(val, name)
                        {
                            for (var i = 0, l = nodeConfig.attributes.length; i < l; ++i)
                            {
                                var attr = nodeConfig.attributes[i];
                                if (attr.name == name)
                                {
                                    nodeConfig.attributes[i].default = val;
                                    break;
                                }
                            }
                        });
                    }

                    // set position
                    nodeConfig.x = (nodePickle.x || 0) + positionOffset.x;
                    nodeConfig.y = (nodePickle.y || 0) + positionOffset.y;

                    // create actualNode
                    var node = vaxRoot.createNode(nodeConfig);

                    // map id for wiring
                    nodesIdsMap[nodePickle.id] = node.getId();
                });
            }

            // wire 'em
            if (graph.wires)
            {
                _.each(graph.wires, function(wirePickle)
                {
                    var outputNodeId = nodesIdsMap[wirePickle[0]];
                    var outputSocketName = wirePickle[1];
                    var outputNode = self.nodes[outputNodeId];

                    var inputNodeId = nodesIdsMap[wirePickle[2]];
                    var inputSocketName = wirePickle[3];
                    var inputNode = self.nodes[inputNodeId];

                    if (inputNode && outputNode)
                    {
                        var inputSocketId = inputNode.getInputSocketIdByName(inputSocketName);
                        var outputSocketId = outputNode.getOutputSocketIdByName(outputSocketName);

                        if  (inputSocketId && outputSocketId)
                        {
                            self.wire(outputSocketId, inputSocketId);
                        }
                        else
                        {
                            // report error
                        }
                    }
                    else
                    {
                        // report error
                    }
                });
            }

            // create comments
            if (graph.comments)
            {
                _.each(graph.comments, function(commentPickle)
                {
                    self.createComment({x: commentPickle.x, y: commentPickle.y, width: commentPickle.w, height: commentPickle.h, text: commentPickle.t});
                });
            }

            // created nodesIds
            return _.values(nodesIdsMap);
        };

        // init VAX
        this.init();
    } // function VAX

    window.VAX = VAX;
    }
)(window, _, jQuery);