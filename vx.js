(function(window, _, $) {

    // static helper
    var idCounter = 1;

    window.vx = {};

    vx = _.extend(vx, {

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



    }); // vx.extend

    // VX class
    function VX(raphael, config)
    {
        var vxRoot = this;

        this.raphael = raphael;

        this.config = _.defaults(config, {
            schema: {
                types: {},
                components: {} // elements,nodes?
            },
            skin: {}, // theme. ui
            lang: {}
        });

        this.schema = {};

        this.isValidType = function isValidType(type)
        {
            if (!_.isObject(type))
            {
                return type.substring(0, 1) == '@' || (vxRoot.schema.types.hasOwnProperty(type));
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

            if (isSimpleInputType && isSimpleOutputType) // both simple
            {
                return (inputType === outputType) || _.some(vxRoot.schema.types[outputType].extends, function(extType) { return extType == inputType;});
            }
            else if (isSimpleInputType && !isSimpleOutputType) // input = simple, output = paramtrized
            {
                return _.some(vxRoot.schema.types[outputType.name].extends, function(extType) { return extType == inputType;});
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

        this.buildSchemaTypes = function(schema)
        {
            var typesConfig = schema.types || {};

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

                if (type && type.extends)
                {
                    // normalize extends
                    if (!_.isArray(type.extends))
                    {
                        type.extends = [type.extends];
                    }

                    _.each(type.extends, function(typeToExtend)
                    {
                        if (typeToExtend in types)
                        {
                            allExtends.push(typeToExtend);
                            allExtends = allExtends.concat(types[typeToExtend.extends]);
                        }
                        else
                        {
                            throw new Error("Type '" + typeToExtend + "' wasn't found!");
                        }
                    });
                }

                if (type.typeParams && (!_.isArray(type.typeParams) || type.typeParams.length == 0))
                {
                    throw new Error("Type params should a plain array with length > 0!");
                }

                types[name] = {
                    color: type.color || "#fff",
                    extends: _.filter(_.unique(allExtends, false)),
                    typeParams: type.typeParams || [],
                };
            });

            return types;
        };

        this.buildSchemaComponents = function(schema)
        {
            var componentsConfig = schema.components || {};

            var components = {};

            _.each(componentsConfig, function(componentConfig, name)
            {
                var component = _.defaults(componentConfig, {
                    component: name,
                    title: name,
                    color: "0-#490-#070:20-#333",
                    width: 100,
                    height: 100,
                    typeParams: [],
                    inputSockets: [],
                    attributes: [],
                    outputSockets: [],
                    typeInstances: {}
                });

                var mapSubConfig = function(subConfig, name)
                {
                    var sub = _.defaults(subConfig, {
                        color: '#fff',
                        name: name,
                        title: name,
                        type: 'Any',
                        default: ''
                    });

                    var parsedType = vx.parseType(sub.type);
                    if (!vxRoot.isValidType(parsedType))
                    {
                        throw new Error("Invalid type: " + sub.type);
                    }

                    sub.parsedType = parsedType;
                    sub.color = vxRoot.getColorOfParsedType(parsedType);

                    return sub;
                };

                component.inputSockets  = _.map(componentConfig.in    || {}, mapSubConfig);
                component.outputSockets = _.map(componentConfig.out   || {}, mapSubConfig);
                component.attributes    = _.map(componentConfig.attrs || {}, mapSubConfig);

                components[name] = component;
            });

            return components;
        };

        this.getColorOfParsedType = function(parsedType)
        {
            var rootTypeName = _.isObject(parsedType) ? parsedType.name : parsedType;

            if (rootTypeName.substring(0, 1) == '@')
            {
                return '#fff';
            }

            var type = vxRoot.schema.types[rootTypeName];

            if (!type)
            {
                throw new Error("Type " + rootTypeName + " wasn't found!");
            }

            return type.color;
        };

        this.schema.types = this.buildSchemaTypes(this.config.schema);
        this.schema.components = this.buildSchemaComponents(this.config.schema, this.schema.types);

        this.nodes = {};
        this.sockets = {};
        this.wires = {};

        this.init = function()
        {
            var self = this;

            $(document).mousemove(function(e) {
                self.mouseX = e.pageX;
                self.mouseY = e.pageY;
            }).mouseover(); // call the handler immediately


            $(document).keyup(function (evt) { // should be a DOM node for that
                if (evt.which == 88) // X key
                {
                    self.showSelector();
                }
            });
        };

        this.showSelector = function()
        {
            var self = this;

            if (self.$selector)
            {
                self.$selector.remove();
            }

            var $wrapper = self.$selector = $('<div class="vx-component-selector">');
            $wrapper.append($('<div class="vx-title"/>').text("Choose a component..."));

            _.each(self.schema.components, function(component, name)
            {
                var $component = $('<div class="vx-component"/>').attr('data-vx-component', name);

                var text = component.title;
                if (component.typeParams && component.typeParams.length > 0)
                {
                    text = text + ' [' + component.typeParams.join(', ') + ']';
                }
                $component.text(text);

                $wrapper.append($component);
            });

            $wrapper.on('click', 'div', function()
            {

                var $this = $(this);

                var component = $this.attr('data-vx-component');

                var componentConfig = self.schema.components[component];

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
                _.each(componentConfig.attributes, function(socket)
                {
                    nodeConfig.attributes.push(_.clone(socket));
                });


                // update mouse pos
                nodeConfig.x = self.mouseX;
                nodeConfig.y = self.mouseY;

                if (nodeConfig.typeParams && nodeConfig.typeParams.length > 0)
                {
                    if (nodeConfig.typeParams.length == 1)
                    {
                        var paramName = nodeConfig.typeParams[0];
                        nodeConfig.typeInstances = {};
                        nodeConfig.typeInstances[paramName] = prompt('Input type name for parameter ' + paramName, 'Any');


                        var subUpdate = function(subConf)
                        {
                            subConf.type = subConf.type.replace('@' + paramName, nodeConfig.typeInstances[paramName]);
                            subConf.parsedType = vx.parseType(subConf.type);
                            subConf.color = vxRoot.getColorOfParsedType(subConf.parsedType);
                        };

                        _.each(nodeConfig.inputSockets,  subUpdate);
                        _.each(nodeConfig.outputSockets, subUpdate);
                        _.each(nodeConfig.attributes,    subUpdate);


                        /*
                        for (var k in nodeConfig.inputSockets)
                        {
                            nodeConfig.inputSockets[k].type = nodeConfig.inputSockets[k].
                            nodeConfig.inputSockets[k].parsedType = vx.parseType(nodeConfig.inputSockets[k].type);
                        }

                        // out
                        for (k in nodeConfig.outputSockets)
                        {
                            nodeConfig.outputSockets[k].type = nodeConfig.outputSockets[k].type.replace('@' + paramName, nodeConfig.typeInstances[paramName]);
                            nodeConfig.outputSockets[k].parsedType = vx.parseType(nodeConfig.outputSockets[k].type);
                        }

                        // attrs
                        for (k in nodeConfig.attributes)
                        {
                            nodeConfig.attributes[k].type = nodeConfig.attributes[k].type.replace('@' + paramName, nodeConfig.typeInstances[paramName]);
                            nodeConfig.attributes[k].parsedType = vx.parseType(nodeConfig.attributes[k].type);
                        }*/
                    }
                    else
                    {
                        return alert("Multiple type params are not yet supported");
                    }
                }

                vxRoot.createNode(nodeConfig);

                $wrapper.remove();
            });


            $wrapper.mouseleave(function()
            {
                $wrapper.remove();
            });

            $wrapper.offset({left: self.mouseX - 3, top: self.mouseY - 3});
            $('body').append($wrapper);
        };

        this.createNode = function(config)
        {
            var newId = "VxNode-" + vx.genNextId();
            this.nodes[newId] = new VxNode(newId, config);
        };

        function VxSocket(id, node, nodeIndex, config, kind)
        {
            var self = this;

            if (!(node instanceof VxNode)) {
                throw new Error("Instance of VxNode was expected");
            }

            this.id = id;
            this.node = node;
            this.vx = node.getVX();
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
                var nodeX = self.node.getX();
                var nodeY = self.node.getY();

                var circle = self.isInput()
                    ? raphael.circle(nodeX, nodeY + (self.nodeIndex + 1) * 20 + 30, 5)
                    : raphael.circle(nodeX + self.node.getWidth(), nodeY + self.node.getHeight() - (self.nodeIndex + 1) * 20, 5);

                return circle;
            };

            this.createCaption = function()
            {
                var cx = self.circle.attr("cx");
                var cy = self.circle.attr("cy");

                if (self.isInput())
                {
                    self.caption = raphael.text(cx + 10, cy, self.config.title + " | " + self.config.type);
                    self.caption.attr('text-anchor', 'start');
                }
                else
                {
                    self.caption = raphael.text(cx - 10, cy, self.config.type + " | " + self.config.title);
                    self.caption.attr('text-anchor', 'end');
                }

                self.caption.attr({
                    "fill": "#fff",
                    "font-family": "Tahoma",
                    "font-size": "10pt",
                });
            };

            this.init = function () {
                self.circle = self.createCircle();
                self.circle.toFront();
                self.circle.attr({
                    "stroke-width": 2,
                    stroke: self.config.color,
                    cursor: 'pointer',
                    fill: '#000',
                });
                self.circle.data("vxType", "socket");
                self.circle.data("socketKind", self.kind);
                self.circle.data("nodeId", self.node.getId());
                self.circle.data("socketId", self.id);
                self.circle.data("socketParsedType", self.config.parsedType);

                self.createCaption();

                self.circle.drag(
                    function (dx, dy, nx, ny)
                    {
                        if (this.drawWire)
                        {
                            this.drawWire.remove();
                        }

                        var cx = self.circle.attr("cx");
                        var cy = self.circle.attr("cy");

                        this.drawWire = raphael.path(vx.buildWirePath(cx, cy, nx, ny));
                        this.drawWire.toBack();
                        this.drawWire.attr({
                            'stroke': self.config.color,
                            'stroke-width': 3,
                        });
                    },
                    // start dragging
                    function (x, y) {
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
                            if (targetSocket.data("vxType") === "socket")
                            {
                                // different kinds, not the same socket/node
                                if (targetSocket.data("socketKind") !== self.kind && targetSocket.data("socketId") !== self.id && targetSocket.data("nodeId") !== self.node.getId())
                                {

                                    // check if we dont wire more than 1 time an output socket
                                    var targetSocketObj = vxRoot.sockets[targetSocket.data("socketId")];
                                    if (!(targetSocketObj.isInput() && targetSocketObj.isWired()))
                                    {
                                        // check type compatibility
                                        var inputParsedType  = self.isInput() ? self.config.parsedType : targetSocket.data("socketParsedType");
                                        var outputParsedType = self.isInput() ? targetSocket.data("socketParsedType") : self.config.parsedType;

                                        if (vxRoot.areParsedTypesCompatible(inputParsedType, outputParsedType))
                                        {
                                            vxRoot.wire(self.id, targetSocket.data("socketId"));
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
                    }
                );

            };

            this.updatePos = function (nx, ny) {

                // circle
                if (self.isInput())
                {
                    self.circle.attr({
                        cx: nx,
                        cy: ny + (self.nodeIndex + 1) * 20 + 30
                    });
                }
                else
                {
                    self.circle.attr({
                        cx: nx + self.node.getWidth(),
                        cy: ny + self.node.getHeight() - (self.nodeIndex + 1) * 20
                    });
                }

                // caption
                var cx = self.circle.attr("cx");
                var cy = self.circle.attr("cy");

                if (self.isInput())
                {
                    self.caption.attr({
                        x: cx + 10,
                        y: cy
                    });
                }
                else
                {
                    self.caption.attr({
                        x: cx - 10,
                        y: cy
                    })
                }

                // wires
                for (var k in self.wires)
                {
                    if (self.wires.hasOwnProperty(k))
                    {
                        vxRoot.wires[k].refresh();
                    }
                }
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
                        var wire = vxRoot.wires[k];

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

        function VxAttribute(id, node, nodeIndex, config)
        {
            var self = this;

            if (!(node instanceof VxNode)) {
                throw new Error("Instance of VxNode was expected");
            }

            this.id = id;
            this.node = node;
            this.vx = node.getVX();
            this.nodeIndex = nodeIndex;
            this.config = _.defaults(config, {
                color: "#fff",
                name: "A",
                title: "Attr",
                default: "",
            });
            this.value = this.config.default;

            this.createCaption = function()
            {
                var nodeX = self.node.getX();
                var nodeY = self.node.getY();

                var socketsCount = self.node.getInputSocketsCount();

                self.caption = raphael.text(nodeX + 8, nodeY + socketsCount * 20 + (self.nodeIndex + 1) * 25 + 25, self.config.title + ":");
                self.caption.attr('text-anchor', 'start');

                self.caption.attr({
                    "fill": "#fff",
                    "font-family": "Tahoma",
                    "font-size": "12pt",
                    "font-weight": "bold",
                    "text-anchor": "start"
                });
            };

            this.createValueHolder = function()
            {
                var nodeX = self.node.getX();
                var nodeY = self.node.getY();

                var socketsCount = self.node.getInputSocketsCount();

                self.valueHolder = raphael.text(nodeX + 8, nodeY + socketsCount * 20 + (self.nodeIndex + 1) * 25 + 40, self.value);
                self.valueHolder.attr('text-anchor', 'start');

                self.valueHolder.attr({
                    "fill": "orange",
                    "font-family": "Tahoma",
                    "font-size": "12pt",
                    "font-weight": "bold",
                    "text-anchor": "start"
                });

                // change value
                self.valueHolder.dblclick(function()
                {
                    var newValue = prompt("Enter value", self.value);
                    self.value = newValue;
                    self.valueHolder.attr("text", newValue);
                });
            };

            this.init = function () {

                self.createCaption();
                self.createValueHolder();
            };

            this.updatePos = function (nx, ny)
            {
                self.caption.attr({
                    x: nx + 8,
                    y: ny + self.node.getInputSocketsCount() * 20 + (self.nodeIndex + 1) * 25 + 25
                });

                self.valueHolder.attr({
                    x: nx + 8,
                    y: ny + self.node.getInputSocketsCount() * 20 + (self.nodeIndex + 1) * 25 + 40
                });
            };

            this.init();
        };

        function VxNode(id, config) {
            var self = this;

            this.id = id;
            this.attributes = {};
            this.inputSockets = {};
            this.outputSockets = {};

            this.config = _.defaults(config, {
                title: "Node",
                component: null,
                width: 100,
                height: 100,
                color: "0-#490-#070:20-#333", // vxRoot.config.ui.defaultNodeColor
                x: 0,
                y: 0,
                attributes: {},
                inputSockets: {},
                outputSockets: {},
                typeParams: [],
                typeInstances: {}
            });

            this.getVX = function()
            {
                return this.vx;
            };

            this.getId = function()
            {
                return self.id;
            };

            this.getConfig = function()
            {
                return self.config;
            };

            this.init = function () {

                // self graphics
                self.bgRect = raphael.rect(self.config.x, self.config.y, self.config.width, self.config.height, 10);
                self.bgRect.attr({
                    fill: '#111',
                    opacity: .5,
                    stroke: "#000",
                    "stroke-opacity": 1
                });

                self.captionRect = raphael.rect(self.config.x, self.config.y, self.config.width, 30, 10);
                self.captionRect.attr({
                    fill: self.config.color,
                    "stroke-width": 0
                });

                self.captionRect2 = raphael.rect(self.config.x, self.config.y + 10, self.config.width, 20);
                self.captionRect2.attr({
                    fill: self.config.color,
                    "stroke-width": 0
                });

                var nodeTitle = self.config.title;
                if (self.config.typeParams.length > 0)
                {
                    nodeTitle = nodeTitle + ' [' + _.toArray(self.config.typeInstances).join(',') + ']';
                }

                self.caption = raphael.text(self.config.x + 10, self.config.y + 15, nodeTitle);
                self.caption.attr({
                    "font-family": "Tahoma",
                    "font-size": "12pt",
                    "font-weight": "bold",
                    "fill": "#fff",
                    "text-anchor": "start"
                });

                self.moveContainer = raphael.rect(self.config.x, self.config.y, self.config.width, self.config.height, 10);
                self.moveContainer.attr({
                    fill: '#000',
                    opacity: .0,
                    cursor: 'move'
                });


                // input sockets
                for (var i = 0; i < self.config.inputSockets.length; ++i) {
                    var socketId = this.id + "-InputSocket-" + vx.genNextId();
                    var inputSocket = new VxSocket(socketId, self, i, self.config.inputSockets[i], 'input');
                    self.inputSockets[socketId] = inputSocket;
                    vxRoot.sockets[socketId] = inputSocket;
                }

                // attributes
                for (var i = 0; i < self.config.attributes.length; ++i) {
                    var attrId = this.id + "-Attribute-" + vx.genNextId();
                    var attr = new VxAttribute(attrId, self, i, self.config.attributes[i]);
                    self.attributes[attrId] = attr;
                }

                // output sockets
                for (var j = 0; j < self.config.outputSockets.length; ++j) {
                    var socketId = this.id + "-OutputSocket-" + vx.genNextId();
                    var outputSocket = new VxSocket(socketId, self, j, self.config.outputSockets[j], 'output');
                    self.outputSockets[socketId] = outputSocket;
                    vxRoot.sockets[socketId] = outputSocket;
                }


                // moveContainer drag
                self.moveContainer.drag(
                    function (dx, dy, nx, ny)
                    {
                        self.move(this.dragX + dx, this.dragY + dy)

                    },
                    function (x, y) {
                        this.dragX = this.attr('x');
                        this.dragY = this.attr('y');
                    },

                    function (evt) {
                        this.dragX = null;
                        this.dragY = null;
                    }
                );

                // remove on 2x click
                self.moveContainer.dblclick(function()
                {
                    if (confirm('Вы действительно хотите удалить выделенный узел ' + self.config.component + '?'))
                    {
                        self.remove();
                    }
                })
            };

            // удаление
            this.remove = function()
            {
                var removeSocket = function(socket)
                {
                    // remove wires
                    _.each(_.keys(socket.wires), function(wireId)
                    {
                        var wire = vxRoot.wires[wireId];
                        wire.remove();
                    });

                    // remove graphics
                    socket.circle.remove();
                    socket.caption.remove();

                    // delete from repository
                    delete vxRoot.sockets[socket.id];
                };

                // remove all sockets
                _.each(self.inputSockets,  removeSocket);
                _.each(self.outputSockets, removeSocket);

                // remove attrs
                _.each(self.attributes, function(attr)
                {
                    attr.caption.remove();
                    attr.valueHolder.remove();
                });

                // remove itself
                self.moveContainer.remove();
                self.caption.remove();
                self.captionRect.remove();
                self.captionRect2.remove();
                self.bgRect.remove();

                delete vxRoot.nodes[self.id];
            };

            this.move = function(nx, ny)
            {
                var newPos = {x: nx , y: ny};
                self.moveContainer.attr(newPos);

                self.bgRect.attr(newPos);
                self.captionRect.attr(newPos);


                self.captionRect2.attr({
                    x: newPos.x,
                    y: newPos.y + 10
                });


                self.caption.attr({
                    x: newPos.x + 10,
                    y: newPos.y + 15
                });

                // move input sockets
                for (var k in self.inputSockets)
                {
                    if (self.inputSockets.hasOwnProperty(k))
                    {
                        self.inputSockets[k].updatePos(newPos.x, newPos.y);
                    }
                }

                // move attributes
                for (k in self.attributes)
                {
                    if (self.attributes.hasOwnProperty(k))
                    {
                        self.attributes[k].updatePos(newPos.x, newPos.y);
                    }
                }

                // move output sockets
                for (k in self.outputSockets)
                {
                    if (self.outputSockets.hasOwnProperty(k))
                    {
                        self.outputSockets[k].updatePos(newPos.x, newPos.y);
                    }
                }
            };

            this.getX = function () {
                return self.moveContainer.attr("x");
            };

            this.getY = function () {
                return self.moveContainer.attr("y");
            };

            this.getInputSocketsCount = function()
            {
                return _.size(this.inputSockets);
            };

            this.getOutputSocketsCount = function()
            {
                return _.size(this.outputSockets);
            };

            this.getWidth = function () {
                return self.config.width;
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

            if (vxRoot.sockets[socketId1].isConnectedToSocket(socketId2))
            {
                return null;
            }

            var newWireId = "VxWire-" + vx.genNextId();
            var newWire = new VxWire(newWireId, socketId1, socketId2);
            this.wires[newWireId] = newWire;

            return newWire;
        };

        function VxWire(id, socketId1, socketId2, config)
        {
            var self = this;

            this.id = id;

            var socket1 = vxRoot.sockets[socketId1];
            var socket2 = vxRoot.sockets[socketId2];

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
                vxRoot.sockets[self.inputSocketId].wire(self.id);
                vxRoot.sockets[self.outputSocketId].wire(self.id);

                this.refresh();
            };

            this.getInputSocketId = function()
            {
                return self.inputSocketId;
            };

            this.getOutputSocketId = function()
            {
                return self.outputSocketId;
            };

            this.refresh = function()
            {
                if (self.path)
                {
                    self.path.remove();
                }

                var s1 = vxRoot.sockets[self.inputSocketId];
                var s2 = vxRoot.sockets[self.outputSocketId];

                self.path = raphael.path(vx.buildWirePath(s1.getCX(), s1.getCY(), s2.getCX(), s2.getCY()));
                self.path.toBack();
                self.path.attr({
                    'stroke': s2.config.color, // color of output socket
                    'stroke-width': 3,
                    'title': "Wire from " + self.inputSocketId + " to " + self.outputSocketId
                });

                self.path.dblclick(function()
                {
                    self.path.animate({"stroke-opacity":0}, 150, "linear", function()
                    {
                        delete vxRoot.wires[self.id];
                        self.remove();
                    });
                });
            };

            this.remove = function()
            {
                vxRoot.sockets[self.inputSocketId].unwire(self.id);
                vxRoot.sockets[self.outputSocketId].unwire(self.id);

                if (self.path)
                {
                    self.path.remove();
                }
            };

            this.init();
        };

        this.findRootNodes = function()
        {
            return _.filter(this.nodes, function(node)
            {
                return (_.size(node.outputSockets) == 0) ? true : _.every(node.outputSockets, function(socket) { return !socket.isWired(); });
            });
        };

        this.composeTrees = function()
        {
            var composeTree = function composeTree(vxNode, parentsIds, out)
            {
                parentsIds = parentsIds || [];

                if (_.some(parentsIds, function(pid) { return pid == vxNode.id;}))
                {
                    throw new Error("Node " + vxNode.id + " is already present in graph parents: " + parentsIds.join(', '));
                }

                var wiredInputSockets = _.filter(vxNode.inputSockets, function(socket) { return socket.isWired();});

                // collect attrs
                var nodeAttrs = {};
                _.each(vxNode.attributes, function(attr)
                {
                    nodeAttrs[attr.config.name] = attr.value;
                });

                var newParentsIds = _.union(parentsIds, [vxNode.id]);

                // collect links
                var links = {};
                _.each(wiredInputSockets, function(inputSocket) {
                    var wiresIdsArray = _.keys(inputSocket.wires);

                    if (_.size(wiresIdsArray) !== 1) {
                        throw new Error("Input socket " + inputSocket.id + " is wired to more than 1 output");
                    }

                    var wire = vxRoot.wires[wiresIdsArray[0]];

                    var outputSocket = vxRoot.sockets[wire.outputSocketId];



                    links[inputSocket.config.name] = composeTree(vxRoot.nodes[outputSocket.node.id], newParentsIds, outputSocket.config.name);
                });

                // return node data
                return {
                    id: vxNode.id,
                    component: vxNode.config.component,
                    attrs: nodeAttrs,
                    links: links,
                    out: out
                };

            };

            return _.map(this.findRootNodes(), function(rootNode) { return composeTree(rootNode); });
        };

        // init VX
        this.init();
    } // function VX

    window.VX = VX;
}
)(window, _, jQuery);