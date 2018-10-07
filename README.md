# dmuka.Zoom

 Demo : http://www.bilgisayarafisildayanadam.com/dmuka.Zoom/
 
 It helps you to add "Zoom" feature to the subjects on browser. By this way, through rolling the mouse cross ball, you can zoom in and zoom out the subject. Example Usage;
 
 * Product images
 * Book pages
 * Documents
 * Detailed Picture Screening
 
## Create Instance

### Variables
Name | Type | Default Value | Description
---- | ---- | ------------- | -----------
  **element** | _HTML Element_ | document.body | Target element.
  **increment** | _float_ | 0.3 | Scale x and scale y incerement value.
  **minZoom** | _float_ | 0.2 | Minimum scale x and minimum scale y value.
  **maxZoom** | _float_ | 10 | Maximum scale x and minimum scale y value.
  **transitionEnable** | _boolean_ | true | Animation enable.
  **parentEnable** | _boolean_ | true | If you want to element append to new zoom element then you should set true the value. So your element will have a new parent.
  **parentClasses** | _string:class_ | "" | Parent element classes list. Important : This property only working when **parentEnable** is true.
  **parentOverflow** | _string:css_ | "" | Parent element's overflow's value. Important : This property only working when **parentEnable** is true.
  **parentPadding** | _string:css_ | "" | Parent element's padding's value. Important : This property only working when **parentEnable** is true.
  
### Events
Name | Parameters | Return Type | Run Time
---- | ---- | ------------- | -----------
**onZoom** | _()_ | undefined | When change zoom on element.
**onMove** | _()_ | undefined | When change mouse position on element.

#### Example Usage
```javascript
var zoom = new dmuka.Zoom({
    /* Variables --BEGIN */
    // --------------------
    
    element: document.querySelector("img"),
    increment: 0.3,
    minZoom: 0.2,
    maxZoom: 10,
    transitionEnable: true,
    parentEnable: true,
    parentClasses: "",
    parentOverflow: "hidden",
    parentPadding: 20,
    
    // --------------------
    /* Variables --END */
    
    /* Events --BEGIN */
    // --------------------
    
    onZoom: function () {
        // this = zoom
        var element = this.DOM.element.get();
        console.log(element, "My Zoom Element - onZoom");
        var parent = this.DOM.parent.get();
        console.log(parent, "My Zoom Parent - onZoom");
    },
    onMove: function () {
        // this = zoom
        var element = this.DOM.element.get();
        console.log(element, "My Zoom Element - onMove");
        var parent = this.DOM.parent.get();
        console.log(parent, "My Zoom Parent - onMove");
    }
    
    // --------------------
    /* Events --END */
});
```

## Public Variables
_**The basic rule you need to know about Variables is that, they are received with “get” function and updated with “set” function!**_


### zoom.DOM
This variable includes DOM (Document Object Model; ex; body, head, div…) data within component. Template is represented below;

```javascript
zoom.DOM = {
  // Target Element Content
  element: {
    get: <function():DOM>
  },
  // Parent Element Content
  parent: {
    get: <function():DOM>
  }
}
```

## Public Functions

### zoom.zoomIn
Via this function, you can activate the zoom in command of the subject. Template is represented below;
```javascript
function zoom.zoomIn() {
  // codes
  
  return undefined;
}
```

#### Example Usage
```javascript
zoom.zoomIn();
```

### zoom.zoomOut
Via this function you can activate the zoom out command of the subject. Template is represented below;
```javascript
function zoom.zoomOut() {
  // codes
  
  return undefined;
}
```

#### Example Usage
```javascript
zoom.zoomOut();
```

### zoom.zoomClear
Via this function you can reset the zoom command of the subject. Template is represented below;
```javascript
function zoom.zoomClear() {
  // codes
  
  return undefined;
}
```

#### Example Usage
```javascript
zoom.zoomClear();
```
