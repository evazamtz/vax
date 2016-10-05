(function(window, _) {

    // static helper
    var idCounter = 1;

    window.vx = {

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
        }
    };

    // VX class
    function VX(raphael)
    {
        var vxRoot = this;

        this.raphael = raphael;
        this.nodes = {};
        this.sockets = {};
        this.wires = {};



        this.createNode = function(config)
        {
            var newId = "VxNode-" + vx.genNextId();
            this.nodes[newId] = new VxNode(newId, config);
        };

        function VxSocket(id, node, nodeIndex, config, type)
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
            });
            this.type = type;

            this.wires = {};

            this.createCircle = function()
            {
                var nodeX = self.node.getX();
                var nodeY = self.node.getY();

                var circle = (self.type == 'input')
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
                    self.caption = raphael.text(cx + 10, cy, self.config.name);
                    self.caption.attr('text-anchor', 'start');
                }
                else
                {
                    self.caption = raphael.text(cx - 10, cy, self.config.name);
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
                self.circle.data("socketType", self.type);
                self.circle.data("nodeId", self.node.getId());
                self.circle.data("socketId", self.id);

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
                            'stroke': '#fff',
                            'stroke-width': 3,
                        });
                    },
                    // start dragging
                    function (x, y) {
                        self.circle.attr({fill: '#fff'});
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
                            if (targetSocket.data("vxType") === "socket") {
                                if (targetSocket.data("socketType") !== self.type && targetSocket.data("socketId") !== self.id && targetSocket.data("nodeId") !== self.node.getId()) {

                                    // different types, not the same socket/node

                                    // last check if we dont wire more than 1 time an output socket
                                    var targetSocketObj = vxRoot.sockets[targetSocket.data("socketId")];
                                    if (!(targetSocketObj.isInput() && targetSocketObj.isWired()))
                                    {
                                        vxRoot.wire(self.id, targetSocket.data("socketId"));
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
                self.circle.attr({fill:'#fff'});
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
                return self.type === "input";
            };

            this.isOutput = function()
            {
                return self.type === "output";
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

        function VxNode(id, config) {
            var self = this;

            this.id = id;
            this.config = _.defaults(config, {
                name: "Unnamed",
                width: 200,
                height: 200,
                x: 0,
                y: 0,
                inputSockets: {},
                outputSockets: {}
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

                self.bgRect = raphael.rect(self.config.x, self.config.y, self.config.width, self.config.height, 10);
                self.bgRect.attr({
                    fill: '#111',
                    opacity: .5,
                    stroke: "#000",
                    "stroke-opacity": 1
                });

                self.captionRect = raphael.rect(self.config.x, self.config.y, self.config.width, 30, 10);
                self.captionRect.attr({
                    fill: "0-#490-#070:20-#333",
                    "stroke-width": 0
                });

                self.captionRect2 = raphael.rect(self.config.x, self.config.y + 10, self.config.width, 20);
                self.captionRect2.attr({
                    fill: "0-#490-#070:20-#333",
                    "stroke-width": 0
                });

                self.caption = raphael.text(self.config.x + 35, self.config.y + 15, self.config.name);
                self.caption.attr({
                    "font-family": "Tahoma",
                    "font-size": "12pt",
                    "font-weight": "bold",
                    "fill": "#fff"
                });

                self.moveContainer = raphael.rect(self.config.x, self.config.y, self.config.width, self.config.height, 10);
                self.moveContainer.attr({
                    fill: '#000',
                    opacity: .0,
                    cursor: 'move'
                });


                // input sockets
                self.inputSockets = [];
                for (var i = 0; i < self.config.inputSockets.length; ++i) {
                    var socketId = this.id + "-InputSocket-" + vx.genNextId();
                    var inputSocket = new VxSocket(socketId, self, i, self.config.inputSockets[i], 'input');
                    self.inputSockets[socketId] = inputSocket;
                    vxRoot.sockets[socketId] = inputSocket;
                }

                // output sockets
                self.outputSockets = [];
                for (var j = 0; j < self.config.outputSockets.length; ++j) {
                    var socketId = this.id + "-OutputSocket-" + vx.genNextId();
                    var outputSocket = new VxSocket(socketId, self, j, self.config.outputSockets[j], 'output');
                    self.outputSockets[socketId] = outputSocket;
                    vxRoot.sockets[socketId] = outputSocket;
                }


                // moveContainer
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
                    x: newPos.x + 35,
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
                    'stroke': '#fff',
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
    } // function VX


    window.VX = VX;
}
)(window, _);