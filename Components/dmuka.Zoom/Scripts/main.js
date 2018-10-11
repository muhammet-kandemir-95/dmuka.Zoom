// Create namespace
if (window["dmuka"] === undefined) {
    window["dmuka"] = {};
}

dmuka.Zoom = function (parameters) {

    // Declare Access Modifiers
    var private = {
        variable: {
            DOM: {
                element: document.body
            },
            // Transform scale increment
            increment: 0.3,
            // Transform min scale
            minZoom: 0.2,
            // Transform max scale
            maxZoom: 10,
            // Animate enable
            transitionEnable: true,
            // Element append to new parent element
            parentEnable: true,
            // If added parent then classes will add to parent
            parentClasses: "",
            // If added parent then overflow css will add to parent
            parentOverflow: "hidden",
            // If added parent then padding css will add to parent
            parentPadding: 20
        },
        event: {
            // Running when change zoom on element
            onZoom: function () {

            },
            // Running when change mouse position on element
            onMove: function () {

            }
        },
        function: {

        }
    };

    var public = this;
    var me = {
        public: public,
        private: private
    };

    // Variables --BEGIN

    // Get Parameters --BEGIN

    private.variable.DOM.element = parameters.element === undefined ? private.variable.DOM.element : parameters.element;
    public.DOM = {
        element: {
            get: function () {
                return private.variable.DOM.element;
            }
        }
    };

    private.variable.transitionEnable = parameters.transitionEnable === undefined ? private.variable.transitionEnable : parameters.transitionEnable;
    private.variable.increment = parameters.increment === undefined ? private.variable.increment : parameters.increment;
    private.variable.minZoom = parameters.minZoom === undefined ? private.variable.minZoom : parameters.minZoom;
    private.variable.maxZoom = parameters.maxZoom === undefined ? private.variable.maxZoom : parameters.maxZoom;
    private.variable.parentEnable = parameters.parentEnable === undefined ? private.variable.parentEnable : parameters.parentEnable;
    private.variable.parentClasses = parameters.parentClasses === undefined ? private.variable.parentClasses : parameters.parentClasses;
    private.variable.parentPadding = parameters.parentPadding === undefined ? private.variable.parentPadding : parameters.parentPadding;
    private.event.onZoom = parameters.onZoom === undefined ? private.event.onZoom : parameters.onZoom;
    private.event.onMove = parameters.onMove === undefined ? private.event.onMove : parameters.onMove;

    // Get Parameters --END

    if (private.variable.DOM.element._dmuka === undefined)
        private.variable.DOM.element._dmuka = {};

    private.variable.DOM.element._dmuka.Zoom = me;

    private.function.sumMatrixs = function (matrix1, matrix2) {
        var result = [];
        for (var xIndex = 0; xIndex < matrix1.length; xIndex++) {
            result.push(matrix1[xIndex] + matrix2[xIndex]);
        }

        return result;
    }

    private.function.getMatrixFromElement = function (element) {
        var elementStyle = window.getComputedStyle(element);
        var transform = elementStyle.transform;
        if (transform === "none") {
            transform = "matrix(1,0,0,1,0,0)";
        }
        transform = transform.replace("matrix(", "");
        transform = transform.substr(0, transform.length - 1);
        var split = transform.split(',');

        return [
            parseFloat(split[0]),
            parseFloat(split[1]),
            parseFloat(split[2]),
            parseFloat(split[3]),
            parseFloat(split[4]),
            parseFloat(split[5])
        ];
    };

    private.function.getCssFromMatrix = function (matrix) {
        return "matrix(" + matrix[0] + "," + matrix[1] + "," + matrix[2] + "," + matrix[3] + "," + matrix[4] + "," + matrix[5] + ")";
    };

    private.function.mousewheel = function (e) {
        e.preventDefault();
        
        var elementMatrix = this._dmuka.Zoom.private.function.getMatrixFromElement(this);
        var sumMatrix = [0, 0, 0, 0, 0, 0, 0];
        if (e !== undefined) {
            if (e.wheelDelta < 0) {
                //scroll down
                sumMatrix = [-1 * elementMatrix[0] * this._dmuka.Zoom.private.variable.increment, 0, 0, -1 * elementMatrix[3] * this._dmuka.Zoom.private.variable.increment, 0, 0];
            } else {
                //scroll up
                sumMatrix = [1 * elementMatrix[0] * this._dmuka.Zoom.private.variable.increment, 0, 0, 1 * elementMatrix[3] * this._dmuka.Zoom.private.variable.increment, 0, 0];
            }
        }

        var lastMatrix = this._dmuka.Zoom.private.function.sumMatrixs(sumMatrix, elementMatrix);
        // Check min zoom
        lastMatrix[0] = Math.max(this._dmuka.Zoom.private.variable.minZoom, lastMatrix[0]);
        lastMatrix[3] = Math.max(this._dmuka.Zoom.private.variable.minZoom, lastMatrix[3]);
        // Check max zoom
        lastMatrix[0] = Math.min(this._dmuka.Zoom.private.variable.maxZoom, lastMatrix[0]);
        lastMatrix[3] = Math.min(this._dmuka.Zoom.private.variable.maxZoom, lastMatrix[3]);
        // Check distance by one
        if (Math.abs(lastMatrix[0] - 1) < this._dmuka.Zoom.private.variable.increment) {
            lastMatrix[0] = 1;
        }
        if (Math.abs(lastMatrix[3] - 1) < this._dmuka.Zoom.private.variable.increment) {
            lastMatrix[3] = 1;
        }

        this.style.transform = this._dmuka.Zoom.private.function.getCssFromMatrix(lastMatrix);
        this._dmuka.Zoom.private.event.onZoom.call(this._dmuka.Zoom.public);
    };
    public.zoomIn = function () {
        var elementMatrix = private.function.getMatrixFromElement(private.variable.DOM.element);
        if (elementMatrix[0] === 1 && elementMatrix[3] === 1) {
            private.variable.DOM.element.style.transformOrigin = "center center";
        }

        private.function.mousewheel.call(private.variable.DOM.element, {
            wheelDelta: 1
        });
    };
    public.zoomOut = function () {
        var elementMatrix = private.function.getMatrixFromElement(private.variable.DOM.element);
        if (elementMatrix[0] === 1 && elementMatrix[3] === 1) {
            private.variable.DOM.element.style.transformOrigin = "center center";
        }

        private.function.mousewheel.call(private.variable.DOM.element, {
            wheelDelta: -1
        });
    };
    public.zoomClear = function () {
        var elementMatrix = private.function.getMatrixFromElement(private.variable.DOM.element);
        elementMatrix[0] = 1;
        elementMatrix[3] = 1;
        var lastMatrix = elementMatrix;
        // Check min zoom
        lastMatrix[0] = Math.max(private.variable.minZoom, lastMatrix[0]);
        lastMatrix[3] = Math.max(private.variable.minZoom, lastMatrix[3]);
        // Check max zoom
        lastMatrix[0] = Math.min(private.variable.maxZoom, lastMatrix[0]);
        lastMatrix[3] = Math.min(private.variable.maxZoom, lastMatrix[3]);

        private.variable.DOM.element.style.transform = private.function.getCssFromMatrix(lastMatrix);
        private.event.onZoom.call(public);
    };

    private.function.mousemove = function (e) {
        this.style.transformOrigin = e.offsetX + "px " + e.offsetY + "px";
        this._dmuka.Zoom.private.event.onMove.call(this._dmuka.Zoom.public);
    };

    private.function.init = function () {
        if (private.variable.parentEnable === true) {
            private.variable.DOM.parent = document.createElement("div");
            public.DOM.parent = {
                get: function () {
                    return private.variable.DOM.parent;
                }
            };
            private.variable.DOM.parent.setAttribute("class", "dmuka-zoom-parent " + private.variable.parentClasses);

            // Copy CSS --BEGIN
            for (var key in private.variable.DOM.element.style) {
                private.variable.DOM.parent.style[key] = private.variable.DOM.element.style[key];
            }
            private.variable.DOM.element.style.position = "relative";
            private.variable.DOM.element.style.marginLeft = "0px";
            private.variable.DOM.element.style.marginRight = "0px";
            private.variable.DOM.element.style.marginTop = "0px";
            private.variable.DOM.element.style.marginBottom = "0px";
            private.variable.DOM.element.style.left = "0px";
            private.variable.DOM.element.style.right = "0px";
            private.variable.DOM.element.style.top = "0px";
            private.variable.DOM.element.style.bottom = "0px";
            private.variable.DOM.element.style.width = private.variable.DOM.element.style.width.indexOf("%") >= 0 ? "100%" : private.variable.DOM.element.style.width;
            private.variable.DOM.element.style.maxWidth = private.variable.DOM.element.style.maxWidth.indexOf("%") >= 0 ? "100%" : private.variable.DOM.element.style.maxWidth;
            private.variable.DOM.element.style.minWidth = private.variable.DOM.element.style.minWidth.indexOf("%") >= 0 ? "100%" : private.variable.DOM.element.style.minWidth;
            private.variable.DOM.element.style.height = private.variable.DOM.element.style.height.indexOf("%") >= 0 ? "100%" : private.variable.DOM.element.style.height;
            private.variable.DOM.element.style.maxHeight = private.variable.DOM.element.style.maxHeight.indexOf("%") >= 0 ? "100%" : private.variable.DOM.element.style.maxHeight;
            private.variable.DOM.element.style.minHeight = private.variable.DOM.element.style.minHeight.indexOf("%") >= 0 ? "100%" : private.variable.DOM.element.style.minHeight;
            private.variable.DOM.parent.style.overflow = private.variable.parentOverflow;
            private.variable.DOM.parent.style.padding = private.variable.parentPadding + "px";
            // Copy CSS --END

            private.variable.DOM.element.insertAdjacentElement("beforebegin", private.variable.DOM.parent);
            private.variable.DOM.parent.appendChild(private.variable.DOM.element);

            if (private.variable.DOM.parent._dmuka === undefined)
                private.variable.DOM.parent._dmuka = {};

            private.variable.DOM.parent._dmuka.Zoom = me;

            private.variable.DOM.parent.addEventListener("mousemove", function (e) {
                this._dmuka.Zoom.private.function.mousemove.call(this._dmuka.Zoom.private.variable.DOM.element, {
                    offsetX: e.offsetX - this._dmuka.Zoom.private.variable.parentPadding,
                    offsetY: e.offsetY - this._dmuka.Zoom.private.variable.parentPadding
                });
            });
            private.variable.DOM.parent.addEventListener("mousewheel", function (e) {
                this._dmuka.Zoom.private.function.mousewheel.call(this._dmuka.Zoom.private.variable.DOM.element, e);
            });
        }
        else {
            private.variable.DOM.element.addEventListener("mousemove", private.function.mousemove);
            private.variable.DOM.element.addEventListener("mousewheel", private.function.mousewheel);
        }

        if (private.variable.transitionEnable === true) {
            private.variable.DOM.element.style.transition = "transform 0.1s";
        }

        private.function.mousewheel.call(private.variable.DOM.element);
    };
    private.function.init();

    // Variables --END
};