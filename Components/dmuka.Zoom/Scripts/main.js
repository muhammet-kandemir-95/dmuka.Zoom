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
            minZoom: 1,
            // Transform max scale
            maxZoom: 10,
            // Animate enable
            setTransition: true
        },
        event: {
            // Running when change zoom on element
            onZoom: function (event) {

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
    public.element = {
        get: function () {
            return private.variable.DOM.element;
        }
    };

    private.variable.setTransition = parameters.setTransition === undefined ? private.variable.setTransition : parameters.setTransition;
    private.variable.increment = parameters.increment === undefined ? private.variable.increment : parameters.increment;
    private.variable.minZoom = parameters.minZoom === undefined ? private.variable.minZoom : parameters.minZoom;
    private.variable.maxZoom = parameters.maxZoom === undefined ? private.variable.maxZoom : parameters.maxZoom;
    private.event.onZoom = parameters.onZoom === undefined ? private.event.onZoom : parameters.onZoom;

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
        var elementMatrix = this._dmuka.Zoom.private.function.getMatrixFromElement(this._dmuka.Zoom.private.variable.DOM.element);
        var sumMatrix = [];
        if (e.wheelDelta < 0) {
            //scroll down
            sumMatrix = [-1 * (elementMatrix[0] / 1) * this._dmuka.Zoom.private.variable.increment, 0, 0, -1 * (elementMatrix[3] / 1) * this._dmuka.Zoom.private.variable.increment, 0, 0];
        } else {
            //scroll up
            sumMatrix = [1 * (elementMatrix[0] / 1) * this._dmuka.Zoom.private.variable.increment, 0, 0, 1 * (elementMatrix[3] / 1) * this._dmuka.Zoom.private.variable.increment, 0, 0];
        }

        var lastMatrix = this._dmuka.Zoom.private.function.sumMatrixs(sumMatrix, elementMatrix);
        // Check min zoom
        lastMatrix[0] = Math.max(this._dmuka.Zoom.private.variable.minZoom, lastMatrix[0]);
        lastMatrix[3] = Math.max(this._dmuka.Zoom.private.variable.minZoom, lastMatrix[3]);
        // Check max zoom
        lastMatrix[0] = Math.min(this._dmuka.Zoom.private.variable.maxZoom, lastMatrix[0]);
        lastMatrix[3] = Math.min(this._dmuka.Zoom.private.variable.maxZoom, lastMatrix[3]);

        this.style.transform = this._dmuka.Zoom.private.function.getCssFromMatrix(lastMatrix);
        this._dmuka.Zoom.private.event.onZoom.call(this._dmuka.Zoom.public);
    };

    private.function.init = function () {
        if (private.variable.setTransition === true) {
            private.variable.DOM.element.style.transition = "transform 0.1s";
        }

        private.variable.DOM.element.addEventListener("mousemove", function (e) {
            this.style.transformOrigin = e.offsetX + "px " + e.offsetY + "px";
        });
        private.variable.DOM.element.addEventListener("mousewheel", private.function.mousewheel);
    };
    private.function.init();

    // Variables --END
};