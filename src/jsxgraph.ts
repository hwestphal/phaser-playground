
export namespace TSX {

    /** JXG.Board controls all properties and methods used to manage a geonext board like managing geometric elements, managing mouse and touch events, etc. You probably don't want to use this constructor directly. Please use JXG.JSXGraph.initBoard to initialize a board. */
    interface BoardAttributes  {
    /** Time (in msec) between two animation steps. Used in JXG.CoordsElement#moveAlong, JXG.CoordsElement#moveTo and JXG.CoordsElement#visit. */
    animationDelay?: Number
    /** Show default axis. If shown, the horizontal axis can be accessed via JXG.Board.defaultAxes.x, the vertical axis can be accessed via JXG.Board.defaultAxes.y.
   /* Both axes have a sub-element "defaultTicks".Value can be Boolean or an object containing axis attributes. */
    axis?: Boolean
    /** Bounding box of the visible area in user coordinates. It is an array consisting of four values: [x1, y1, x2, y2]The canvas will be spanned from the upper left
   /* corner (1, y1) to the lower right corner (x2, y2). */
    boundingBox?: [Number,Number,Number,Number]
    /** Enable browser scrolling on touch interfaces if the user double taps into an empty region of the board.Implemented for pointer touch devices - not with mouse,
   /* pen or old iOS touch.It only works if browserPan:trueOne finger action by the settings "pan.enabled:true" and "pan.needTwoFingers:false" has priority */
    browserPan?: Boolean
    /** Attributes for the default axes in case of the attribute axis:true in JXG.JSXGraph#initBoard. */
    defaultAxes?: Object
    /** Description string for the board. Primarily used in an invisible text element which is adressed by the attribute 'aria-describedby' from the JSXGraph container.
   /* JSXGraph creates a new div-element with id "{containerid}_ARIAdescription" containing this string. */
    description?: String
    /** Supply the document object. Defaults to window.document DOM object */
    document?: Object
    /** Control the possibilities for dragging objects.Possible sub-attributes with default values are:drag: {enabled: true// Allow dragging } */
    drag?: Object
    /** Attribute(s) to control the fullscreen icon. The attribute "showFullscreen" controls if the icon is shown. The following attribute(s) can be set:symbol
   /* (String): Unicode symbol which is shown in the navigation bar.Default: svg code for '\u26f6', other possibilities are the unicode symbols '\u26f6' and '\u25a1'.
   /* However, '\u26f6' is not supported by MacOS and iOS.scale (number between 0 and 1): Relative size of the larger side of the JSXGraph board in the fullscreen
   /* window. 1.0 gives full width or height. Default value is 0.85.id (String): Id of the HTML element which is brought to full screen or null if the JSXgraph div is
   /* taken. It may be an outer div element, e.g. if the old aspect ratio trick is used. Default: null, i.e. use the JSXGraph div. */
    fullscreen?: Object
    /** If set true and hasPoint() is true for both an element and it's label, the element (and not the label) is taken as drag element.If set false and hasPoint() is
   /* true for both an element and it's label, the label is taken (if it is on a higher layer than the element)Meanwhile, this feature might be irrelevant. */
    ignoreLabels?: Boolean
    /** Support for internationalization of number formatting. This affectsaxis labelsinfoboxtexts consisting of numbers onlysmartlabel elementsslider labelstapemeasure
   /* elementsintegral element labelsSee https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat for an overview on the
   /* possibilities and the options.User generated texts consisting of texts AND numbers have to be internationalized by the user, see Text#intl. Language locale and
   /* options can be individually controlled for each element by its intl attribute. If no locale is set, the default language of the browser is used. */
    intl?: Object
    /** If set to true, the ratio between horizontal and vertical unit sizes stays constant - independent of size changes of the hosting HTML div element.If the aspect
   /* ration of the hosting div changes, JSXGraphs will change the user supplied bounding box accordingly. This is necessary if circles should look like circles and
   /* not like ellipses. It is recommended to set keepAspectRatio = true for geometric applets.For function plotting keepAspectRatio = false might be the better
   /* choice. */
    keepAspectRatio?: Boolean
    /** Control using the keyboard to change the construction.enabled: true / falsedx: horizontal shift amount per key pressdy: vertical shift amount per key
   /* presspanShift: zoom if shift key is pressedpanCtrl: zoom if ctrl key is pressed */
    keyboard?: Object
    /** If enabled, user activities are logged in array "board.userLog". */
    logging?: Object
    /** Maximal bounding box of the visible area in user coordinates. It is an array consisting of four values: [x1, y1, x2, y2]The bounding box of the canvas must be
   /* inside of this maximal bounding box. */
    maxBoundingBox?: [Number,Number,Number,Number]
    /** Maximum frame rate of the board, i.e. maximum number of updates per second triggered by move events. */
    maxFrameRate?: Number
    /** Maximum number of digits in automatic label generation. For example, if set to 1 automatic point labels end at "Z". If set to 2, point labels end at "ZZ". */
    maxNameLength?: Number
    /** Change redraw strategy in SVG rendering engine.This optimization seems to be obsolete in newer browsers (from 2021 on, at least) and even slow down the
   /* constructions. Therefore, the default is set to 'none' since v1.2.4.If set to 'svg', before every redrawing of the JSXGraph construction the SVG sub-tree of the
   /* DOM tree is taken out of the DOM.If set to 'all', before every redrawing of the JSXGraph construction the complete DOM tree is taken out of the DOM. If set to
   /* 'none' the redrawing is done in-place.Using 'svg' or 'all' speeds up the update process considerably. The risk is that if there is an exception, only a white
   /* div or window is left. */
    minimizeReflow?: String
    /** Element which listens to move events of the pointing device. This allows to drag elements of a JSXGraph construction outside of the board. Especially, on mobile
   /* devices this enhances the user experience. However, it is recommended to allow dragging outside of the JSXGraph board only in certain constructions where users
   /* may not "loose" points outside of the board. In such a case, points may become unreachable.A situation where dragging outside of the board is uncritical is for
   /* example if only sliders are used to interact with the construction.Possible values for this attributes are:an element specified by document.getElementById('some
   /* id');null: to use the JSXGraph container div elementdocumentSince the introduction of this attribute "moveTarget", the value "document" has become sort of
   /* default on touch devices like smartphones. However, it is no longer the case that the document listens to move events, but there is the new feature
   /* "setPointerCapture", which is also implicitly enabled on certain devices. In future versions, JSXGraph may adopt this new standard and distinguish only two
   /* cases:null: no pointerCapture document: use pointerCaptureThis attribute is immutable. It can be changed as follows: HTML node or document */
    moveTarget?: Object
    /** A number that will be added to the absolute position of the board used in mouse coordinate calculations in JXG.Board#getCoordsTopLeftCorner. */
    offsetX?: Number
    /** A number that will be added to the absolute position of the board used in mouse coordinate calculations in JXG.Board#getCoordsTopLeftCorner. */
    offsetY?: Number
    /** Control the possibilities for panning interaction (i.e. moving the origin).Possible sub-attributes with default values are:pan: {enabled: true// Allow
   /* panningneedTwoFingers: false, // panning is done with two fingers on touch devicesneedShift: true, // mouse panning needs pressing of the shift key } */
    pan?: Object
    /** Allow user interaction by registering mouse, pointer, keyboard or touch events. Decide if JSXGraph listens to these events. Keyboard events can then turned off
   /* separately with the keyboard attribute.This attribute is immutable. Please use JXG.Board#addEventHandlers() and JXG.Board#removeEventHandlers() directly. */
    registerEvents?: Boolean
    /** Listen to fullscreen event.This attribute is immutable. Please use JXG.Board#addFullscreenEventHandlers() and JXG.Board#removeEventHandlers() directly. */
    registerFullscreenEvent?: Boolean
    /** Listen to resize events, i.e. start "resizeObserver" or handle the resize event with "resizeListener". This is independent from the mouse, touch, pointer
   /* events.This attribute is immutable. Please use JXG.Board#addResizeEventHandlers() and JXG.Board#removeEventHandlers() directly.This attribute just starts a
   /* resizeObserver. If the resizeObserver reacts to size changed is controled wuth JXG.Board#resize. */
    registerResizeEvent?: Boolean
    /** Default rendering engine. Possible values are 'svg', 'canvas', 'vml', 'no', or 'auto'. If the rendering engine is not available JSXGraph tries to detect a
   /* different engine.In case of 'canvas' it is advisable to call 'board.update()' after all elements have been constructed. This ensures that all elements are drawn
   /* with their intended visual appearance.This attribute is immutable. */
    renderer?: String
    /** Control if JSXGraph reacts to resizing of the JSXGraph container element by the user / browser. The attribute "throttle" determines the minimal time in msec
   /* between to resize calls. */
    resize?: Object
    /** Attributes to control the screenshot function. The following attributes can be set:scale: scaling factor (default=1.0)type: format of the screenshot image.
   /* Default: pngsymbol: Unicode symbol which is shown in the navigation bar. Default: '\u2318'css: CSS rules to format the div element containing the screen shot
   /* imagecssButton: CSS rules to format the close button of the div element containing the screen shot imageThe screenshot will fail if the board contains text
   /* elements or foreign objects containing SVG again. */
    screenshot?: Object
    /** Control the possibilities for a selection rectangle. Starting a selection event triggers the "startselecting" event. When the mouse pointer is released, the
   /* "stopselecting" event is fired. The "stopselecting" event is supplied by the user.So far it works in SVG renderer only.Possible sub-attributes with default
   /* values are:selection: {enabled: false,name: 'selectionPolygon',needShift: false,// mouse selection needs pressing of the shift keyneedCtrl: true,// mouse
   /* selection needs pressing of the shift keyfillColor: '#ffff00' }Board events triggered by selection manipulation: 'startselecting', 'stopselecting',
   /* 'mousestartselecting', 'mousestopselecting', 'pointerstartselecting', 'pointerstopselecting', 'touchstartselecting', 'touchstopselecting'. */
    selection?: Object
    /** Show a button which allows to clear all traces of a board. */
    showClearTraces?: Boolean
    /** Show copyright string in canvas. */
    showCopyright?: Boolean
    /** Show a button in the navigation bar to start fullscreen mode. */
    showFullscreen?: Boolean
    /** If true, the infobox is shown on mouse/pen over for all points which have set their attribute showInfobox to 'inherit'. If a point has set its attribute
   /* showInfobox to false or true, that value will have priority over this value. */
    showInfobox?: Boolean
    /** Display of navigation arrows and zoom buttons in the navigation bar. */
    showNavigation?: Boolean
    /** Show a button in the navigation bar to force reload of a construction. Works only with the JessieCode tag. */
    showReload?: Boolean
    /** Show a button in the navigation bar to enable screenshots. */
    showScreenshot?: Boolean
    /** Display of zoom buttons in the navigation bar. To show zoom buttons, additionally showNavigation has to be set to true. */
    showZoom?: Boolean
    /** If true the first element of the set JXG.board.objects having hasPoint==true is taken as drag element. */
    takeFirst?: Boolean
    /** If true, when read from a file or string - the size of the div can be changed by the construction text. */
    takeSizeFromFile?: Boolean
    /** Title string for the board. Primarily used in an invisible text element which is adressed by the attribute 'aria-labelledby' from the JSXGraph container.
   /* JSXGraph creates a new div-element with id "{containerid}_ARIAlabel" containing this string. */
    title?: String
    /** Control the possibilities for zoom interaction.Possible sub-attributes with default values are:zoom: {enabled: true,// turns off zooming completely, if set to
   /* false.factorX: 1.25,// horizontal zoom factor (multiplied to JXG.Board#zoomX)factorY: 1.25,// vertical zoom factor (multiplied to JXG.Board#zoomY)wheel: true,//
   /* allow zooming by mouse wheelneedShift: true,// mouse wheel zooming needs pressing of the shift keymin: 0.001,// minimal values of JXG.Board#zoomX and
   /* JXG.Board#zoomY, limits zoomOutmax: 1000.0,// maximal values of JXG.Board#zoomX and JXG.Board#zoomY, limits zoomInpinch: true,// by pinch-to-zoom gesture on
   /* touch devicespinchHorizontal: true, // Allow pinch-to-zoom to zoom only horizontal axispinchVertical: true,// Allow pinch-to-zoom to zoom only vertical
   /* axispinchSensitivity: 7// Sensitivity (in degrees) for recognizing horizontal or vertical pinch-to-zoom gestures. }If the zoom buttons are visible, zooming is
   /* still possible, regardless of zoom.enabled:true/false. If this should be prevented, set showZoom:false.Deprecated: zoom.eps which is superseded by zoom.min */
    zoom?: Object
    /** Zoom factor in horizontal direction. */
    zoomX?: Number
    /** Zoom factor in vertical direction. */
    zoomY?: Number
    }



    /**  */
    interface InfoboxAttributes  {
    /** Horizontal offset in pixel of the infobox text from its anchor point. */
    distanceX?: Number
    /** Vertical offset in pixel of the infobox text from its anchor point. */
    distanceY?: Number
    /** Internationalization support for infobox text. */
    intl?: object
    }



    /** Namespace for the complex number arithmetic functions. */
    interface CAttributes  {
    }



    /**  */
    interface CAAttributes  {
    }



    /** Constructor for a chart. */
    interface ChartAttributes  {
    }



    /** This element is used to provide a constructor for a circle. */
    interface CircleAttributes  {
    /** Attributes for center point. */
    center?: Point
    /** If true, moving the mouse over inner points triggers hasPoint. */
    hasInnerPoints?: Boolean
    /** Attributes for circle label. */
    label?: Label
    /** Attributes for center point. */
    point?: Point
    /** Attributes for center point. */
    point2?: Point
    }



    /** This class is for calculating with complex numbers. */
    interface ComplexAttributes  {
    }



    /** JXG.Composition */
    interface CompositionAttributes  {
    }



    /** This is the Coordinates class. All members a coordinate has to provide are defined here. */
    interface CoordsAttributes  {
    }



    /** This is the basic class for geometry elements like points, circles and lines. */
    interface GeometryElementAttributes  {
    /** Determines the elements border-style. Possible values are: 0 for a solid line 1 for a dotted line 2 for a line with small dashes 3 for a line with medium dashes
   /* 4 for a line with big dashes 5 for a line with alternating medium and big dashes and large gaps 6 for a line with alternating medium and big dashes and small
   /* gaps 7 for a dotted line. Needs JXG.GeometryElement#linecap set to "round" for round dots.The dash patterns are defined in JXG.AbstractRenderer#dashArray. */
    dash?: Number
    /** If true, the dash pattern is multiplied by strokeWidth / 2. */
    dashScale?: Boolean
    /** If draft.draft: true the element will be drawn in grey scale colors (as default) to visualize that it's only a draft. */
    draft?: Object
    /** If the element is dragged it will be moved on mousedown or touchstart to the top of its layer. Works only for SVG renderer and for simple elements consisting of
   /* one SVG node. */
    dragToTopOfLayer?: Boolean
    /** The fill color of this geometry element. */
    fillColor?: String
    /** Opacity for fill color. */
    fillOpacity?: Number
    /** If true the element is fixed and can not be dragged around. The element will be repositioned on zoom and moveOrigin events. */
    fixed?: Boolean
    /** If true the element is fixed and can not be dragged around. The element will even stay at its position on zoom and moveOrigin events. Only free elements like
   /* points, texts, curves can be frozen. */
    frozen?: Boolean
    /** Gradient type. Possible values are 'linear'. 'radial' or null. */
    gradient?: String
    /** Angle (in radians) of the gradiant in case the gradient is of type 'linear'. If the angle is 0, the first color is on the left and the second color is on the
   /* right. If the angle is &pi;/2 the first color is on top and the second color at the bottom. */
    gradientAngle?: Number
    /** From the SVG specification: ‘cx’, ‘cy’ and ‘r’ define the largest (i.e., outermost) circle for the radial gradient. The gradient will be drawn such
   /* that the 100% gradient stop is mapped to the perimeter of this largest (i.e., outermost) circle. For radial gradients in canvas this is the value 'x1'. Takes a
   /* value between 0 and 1. */
    gradientCX?: Number
    /** From the SVG specification: ‘cx’, ‘cy’ and ‘r’ define the largest (i.e., outermost) circle for the radial gradient. The gradient will be drawn such
   /* that the 100% gradient stop is mapped to the perimeter of this largest (i.e., outermost) circle. For radial gradients in canvas this is the value 'y1'. Takes a
   /* value between 0 and 1. */
    gradientCY?: Number
    /** The gradientEndOffset attribute is a number (ranging from 0 to 1) which indicates where the second gradient stop is placed, see the SVG specification for more
   /* information. For linear gradients, this attribute represents a location along the gradient vector. For radial gradients, it represents a percentage distance
   /* from (fx,fy) to the edge of the outermost/largest circle. */
    gradientEndOffset?: Number
    /** This attribute defines the radius of the start circle of the radial gradient. The gradient will be drawn such that the 0% &lt;stop&gt; is mapped to the
   /* perimeter of the start circle. For radial gradients in canvas this is the value 'r0'. Takes a value between 0 and 1. */
    gradientFR?: Number
    /** ‘fx’ and ‘fy’ define the focal point for the radial gradient. The gradient will be drawn such that the 0% gradient stop is mapped to (fx, fy). For
   /* radial gradients in canvas this is the value 'x0'. Takes a value between 0 and 1. */
    gradientFX?: Number
    /** y-coordinate of the circle center for the second color in case of gradient 'radial'. (The attribute fy in SVG) For radial gradients in canvas this is the value
   /* 'y0'. Takes a value between 0 and 1. */
    gradientFY?: Number
    /** From the SVG specification: ‘cx’, ‘cy’ and ‘r’ define the largest (i.e., outermost) circle for the radial gradient. The gradient will be drawn such
   /* that the 100% gradient stop is mapped to the perimeter of this largest (i.e., outermost) circle. For radial gradients in canvas this is the value 'r1'. Takes a
   /* value between 0 and 1. */
    gradientR?: Number
    /** Second color for gradient. */
    gradientSecondColor?: String
    /** Opacity of second gradient color. Takes a value between 0 and 1. */
    gradientSecondOpacity?: Number
    /** The gradientStartOffset attribute is a number (ranging from 0 to 1) which indicates where the first gradient stop is placed, see the SVG specification for more
   /* information. For linear gradients, this attribute represents a location along the gradient vector. For radial gradients, it represents a percentage distance
   /* from (fx,fy) to the edge of the outermost/largest circle. */
    gradientStartOffset?: Number
    /**  */
    highlight?: Boolean
    /** The fill color of the given geometry element when the mouse is pointed over it. */
    highlightFillColor?: String
    /** Opacity for fill color when the object is highlighted. */
    highlightFillOpacity?: Number
    /** The stroke color of the given geometry element when the user moves the mouse over it. */
    highlightStrokeColor?: String
    /** Opacity for stroke color when the object is highlighted. */
    highlightStrokeOpacity?: Number
    /** Width of the element's stroke when the mouse is pointed over it. */
    highlightStrokeWidth?: Number
    /** Display layer which will contain the element. */
    layer?: String
    /** Line endings (linecap) of a stroke element, i.e. line, circle, curve. Possible values are:'butt','round','square'.Not available for VML renderer. */
    lineCap?: String
    /** If this is set to true, the element is updated in every update call of the board. If set to false, the element is updated only after zoom events or more
   /* generally, when the bounding box has been changed. Examples for the latter behavior should be axes. */
    needsRegularUpdate?: Boolean
    /** Precision options for JSXGraph elements. This attributes takes either the value 'inherit' or an object of the form:precision: {touch: 30,mouse: 4,pen: 4 }In the
   /* first case, the global, JSXGraph-wide values of JXGraph.Options.precision are taken. */
    precision?: Object
    /** A private element will be inaccessible in certain environments, e.g. a graphical user interface. */
    priv?: Boolean
    /** Determines whether two-finger manipulation may rotate this object. If set to false, the object can only be scaled and translated.In case the element is a
   /* polygon or line and it has the attribute "rotatable:false", moving the element with two fingers results in a rotation or translation.If an element is set to be
   /* neither scalable nor rotatable, it can only be translated.In case of a polygon, scaling is only possible if no vertex has snapToGrid or snapToPoints enabled and
   /* no vertex is fixed by some other constraint. Also, the polygon itself has to have snapToGrid disabled. */
    rotatable?: Boolean
    /** Determines whether two-finger manipulation of this object may change its size. If set to false, the object is only rotated and translated.In case the element is
   /* a horizontal or vertical line having ticks, "scalable:true" enables zooming of the board by dragging ticks lines. This feature is enabled, for the ticks element
   /* of the line element the attribute "fixed" has to be false and the line element's scalable attribute has to be true.In case the element is a polygon or line and
   /* it has the attribute "scalable:false", moving the element with two fingers results in a rotation or translation.If an element is set to be neither scalable nor
   /* rotatable, it can only be translated.In case of a polygon, scaling is only possible if no vertex has snapToGrid or snapToPoints enabled and no vertex is fixed
   /* by some other constraint. Also, the polygon itself has to have snapToGrid disabled. */
    scalable?: Boolean
    /** If enabled:true the (stroke) element will get a customized shadow.Customize color and opacity: If the object's RGB stroke color is [r,g,b] and its opacity is
   /* op, and the shadow parameters color is given as [r', g', b'] and opacity as op' the shadow will receive the RGB color[blend*r + r', blend*g + g', blend*b +
   /* b']and its opacity will be equal to op * op'. Further, the parameters blur and offset can be adjusted.This attribute is only available with SVG, not with
   /* canvas. */
    shadow?: Object
    /** Snaps the element or its parents to the grid. Currently only relevant for points, circles, and lines. Points are snapped to grid directly, on circles and lines
   /* it's only the parent points that are snapped */
    snapToGrid?: Boolean
    /** The stroke color of the given geometry element. */
    strokeColor?: String
    /** Opacity for element's stroke color. */
    strokeOpacity?: Number
    /** Width of the element's stroke. */
    strokeWidth?: Number
    /** Controls if an element can get the focus with the tab key. tabindex corresponds to the HTML attribute of the same name. See descriptiona at MDN. The additional
   /* value "null" completely disables focus of an element. The value will be ignored if keyboard control of the board is not enabled or the element is fixed or not
   /* visible. */
    tabindex?: Number
    /** If true the element will be traced, i.e. on every movement the element will be copied to the background. Use JXG.GeometryElement#clearTrace to delete the trace
   /* elements.The calling of element.setAttribute({trace:false}) additionally deletes all traces of this element. By calling element.setAttribute({trace:'pause'})
   /* the removal of already existing traces can be prevented.The visual appearance of the trace can be influenced by JXG.GeometryElement#traceAttributes. */
    trace?: Boolean|String
    /** Extra visual properties for traces of an element */
    traceAttributes?: Object
    /** Transition duration (in milliseconds) for certain cahnges of properties like color and opacity. The properties can be set in the attribute transitionProperties
   /* Works in SVG renderer, only. */
    transitionDuration?: Number
    /** Properties which change smoothly in the time set in transitionDuration. Possible values are ['fill', 'fill-opacity', 'stroke', 'stroke-opacity', 'stroke-width',
   /* 'width', 'height', 'rx', 'ry'] (and maybe more) for geometry elements and ['color', 'opacity', 'all'] for HTML texts. */
    transitionProperties?: String[]
    /** If false the element won't be visible on the board, otherwise it is shown. */
    visible?: Boolean
    /** If true a label will display the element's name. */
    withLabel?: Boolean
    /**  */
    color?: String
    /**  */
    name?: String
    }



    /** Creates a new coords element object. Do not use this constructor to create an element. */
    interface CoordsElementAttributes extends GeometryElementAttributes  {
    }



    /** This element is used to provide a constructor for curve, which is just a wrapper for element Curve. A curve is a mapping from R to R^2. t mapsto (x(t),y(t)). The graph is drawn for t in the interval [a,b].The following types of curves can be plotted:parametric curves: t mapsto (x(t),y(t)), where x() and y() are univariate functions.polar curves: curves commonly written with polar equations like spirals and cardioids.data plots: plot line segments through a given list of coordinates. */
    interface CurveAttributes extends GeometryElementAttributes  {
    /** The curveType is set in JXG.Curve#generateTerm and used in JXG.Curve#updateCurve. Possible values are'none' 'plot': Data plot 'parameter': we can not
   /* distinguish function graphs and parameter curves 'functiongraph': function graph 'polar' 'implicit' (not yet) Only parameter and plot are set directly. Polar is
   /* set with JXG.GeometryElement#setAttribute only. */
    curveType?: String
    /** If true use a recursive bisection algorithm. It is slower, but usually the result is better. It tries to detect jumps and singularities. */
    doAdvancedPlot?: Boolean
    /** If true use the algorithm by Gillam and Hohenwarter, which was default until version 0.98. */
    doAdvancedPlotOld?: Boolean
    /** Configure arrow head at the start position for curve. Recommended arrow head type is 7. */
    firstArrow?: Boolean | Object
    /** The data points of the curve are not connected with straight lines but with bezier curves. */
    handDrawing?: Boolean
    /** Attributes for curve label. */
    label?: Label
    /** Configure arrow head at the end position for curve. Recommended arrow head type is 7. */
    lastArrow?: Boolean | Object
    /** Number of points used for plotting triggered by up events (i.e. high quality plotting) in case Curve#doAdvancedPlot is false. */
    numberPointsHigh?: Number
    /** Number of points used for plotting triggered by move events (i.e. lower quality plotting but fast) in case Curve#doAdvancedPlot is false. */
    numberPointsLow?: Number
    /** Select the version of the plot algorithm.Version 1 is very outdatedVersion 2 is the default version in JSXGraph v0.99.*, v1.0, and v1.1, v1.2.0Version 3 is an
   /* internal version that was never published ina stable version.Version 4 is available since JSXGraph v1.2.0Version 4 plots correctly logarithms if the function
   /* term is supplied as string (i.e. as JessieCode) */
    plotVersion?: Number
    /** Apply Ramer-Douglas-Peuker smoothing. */
    RDPsmoothing?: Boolean
    /** Recursion depth used for plotting triggered by up events (i.e. high quality plotting) in case Curve#doAdvancedPlot is true. */
    recursionDepthHigh?: Number
    /** Number of points used for plotting triggered by move events in case (i.e. lower quality plotting but fast) Curve#doAdvancedPlot is true. */
    recursionDepthLow?: Number
    }



    /** This element creates a 3D parametric curves. */
    interface Curve3DAttributes extends CurveAttributes  {
    }



    /**  */
    interface DumpAttributes  {
    }



    /**  */
    interface ForeignObjectAttributes  {
    /** List of attractor elements. If the distance of the foreignobject is less than attractorDistance the foreignobject is made to glider of this element. */
    attractors?: Element[]
    }



    /** This is the basic class for 3D geometry elements like Point3D and Line3D. */
    interface GeometryElement3DAttributes  {
    }



    /** This element combines a given set of JXG.Point elements to agroup. The elements of the group and dependent elements can be translated, rotated and scaled bydragging one of the group elements. */
    interface GroupAttributes  {
    }



    /** Displays an image. */
    interface ImageAttributes  {
    /** List of attractor elements. If the distance of the image is less than attractorDistance the image is made to glider of this element. */
    attractors?: Element[]
    /** Defines the CSS class used by the image. CSS attributes defined in this class will overwrite the corresponding JSXGraph attributes, e.g. opacity. The default
   /* CSS class is defined in jsxgraph.css. */
    cssClass?: String
    /** Defines the CSS class used by the image when highlighted. CSS attributes defined in this class will overwrite the corresponding JSXGraph attributes, e.g.
   /* highlightFillOpacity. The default CSS class is defined in jsxgraph.css. */
    highlightCssClass?: String
    /** Image rotation in degrees. */
    rotate?: Number
    /** Defines together with Image#snapSizeY the grid the image snaps on to. The image will only snap on user coordinates which are integer multiples to snapSizeX in x
   /* and snapSizeY in y direction. If this value is equal to or less than 0, it will use the grid displayed by the major ticks of the default ticks of the default x
   /* axes of the board. */
    snapSizeX?: Number
    /** Defines together with Image#snapSizeX the grid the image snaps on to. The image will only snap on integer multiples to snapSizeX in x and snapSizeY in y
   /* direction. If this value is equal to or less than 0, it will use the grid displayed by the major ticks of the default ticks of the default y axes of the board. */
    snapSizeY?: Number
    }



    /** The JXG.JSXGraph singleton stores all properties required to load, save, create and free a board. */
    interface JSXGraphAttributes  {
    }



    /** This element is used to provide a constructor for a chart legend. Parameter is a pair of coordinates. The label names andthe label colors are supplied in the attributes:labels (Array): array of strings containing label nameslabelArray (Array): alternative array for label names (has precedence over 'labels')colors (Array): array of color valuescolorArray (Array): alternative array for color values (has precedence over 'colors')legendStyle or style: at the time being only 'vertical' is supported.rowHeight. */
    interface LegendAttributes  {
    }



    /** This element is used to provide a constructor for a general line. A general line is given by two points. By setting additional properties a line can be used as an arrow and/or axis. */
    interface LineAttributes extends GeometryElementAttributes  {
    /** Configure the arrow head at the position of its first point or the corresponding intersection with the canvas borderIn case firstArrow is an object it has the
   /* sub-attributes:{type: 1, // possible values are 1, 2, ..., 7. Default value is 1.size: 6, // size of the arrow head. Default value is 6.// This value is
   /* multiplied with the strokeWidth of the line// Exception: for type=7 size is ignoredhighlightSize: 6, // size of the arrow head in case the element is
   /* highlighted. Default value }type=7 is the default for curves if firstArrow: true */
    firstArrow?: Boolean | Object
    /** Attributes for the line label. */
    label?: Object
    /** Configure the arrow head at the position of its second point or the corresponding intersection with the canvas border.In case lastArrow is an object it has the
   /* sub-attributes:{type: 1, // possible values are 1, 2, ..., 7. Default value is 1.size: 6, // size of the arrow head. Default value is 6.// This value is
   /* multiplied with the strokeWidth of the line.// Exception: for type=7 size is ignoredhighlightSize: 6, // size of the arrow head in case the element is
   /* highlighted. Default value is 6. }type=7 is the default for curves if lastArrow: true */
    lastArrow?: Boolean | Object
    /** This number (pixel value) controls where infinite lines end at the canvas border. If zero, the line ends exactly at the border, if negative there is a margin to
   /* the inside, if positive the line ends outside of the canvas (which is invisible). */
    margin?: Number
    /** Attributes for first defining point of the line. */
    point1?: Point
    /** Attributes for second defining point of the line. */
    point2?: Point
    /** Defines together with Point#snapSizeY the grid the point snaps on to. The point will only snap on integer multiples to snapSizeX in x and snapSizeY in y
   /* direction. If this value is equal to or less than 0, it will use the grid displayed by the major ticks of the default ticks of the default x axes of the board. */
    snapSizeX?: Number
    /** Defines together with Point#snapSizeX the grid the point snaps on to. The point will only snap on integer multiples to snapSizeX in x and snapSizeY in y
   /* direction. If this value is equal to or less than 0, it will use the grid displayed by the major ticks of the default ticks of the default y axes of the board. */
    snapSizeY?: Number
    /** If set to true, the point will snap to a grid defined by Point#snapSizeX and Point#snapSizeY. */
    snapToGrid?: Boolean
    /** If true, line stretches infinitely in direction of its first point. Otherwise it ends at point1. */
    straightFirst?: Boolean
    /** If true, line stretches infinitely in direction of its second point. Otherwise it ends at point2. */
    straightLast?: Boolean
    /** Attributes for ticks of the line. */
    ticks?: Object
    /** If set to true, Line#firstArrow is set to true and the point is visible, the arrow head will just touch the circle line of the start point of the line. */
    touchFirstPoint?: Boolean
    /** If set to true, Line#lastArrow is set to true and the point is visible, the arrow head will just touch the circle line of the start point of the line. */
    touchLastPoint?: Boolean
    }



    /** This element is used to provide a constructor for a 3D line. */
    interface Line3DAttributes extends GeometryElement3DAttributes  {
    }



    /** Creates a new 3D plane object. Do not use this constructor to create a 3D plane. Use JXG.Board#create with type Plane3D instead. */
    interface Plane3DAttributes extends GeometryElementAttributes  {
    }



    /** This element is used to provide a constructor for a general point. A free point is created if the given parent elements are all numbers and the property fixed is not set or set to false. If one or more parent elements is not a number but a string containing a GEONExT constraint or a function the point will be considered as constrained). That means that the user won't be able to change the point's position directly. */
    interface PointAttributes extends GeometryElementAttributes  {
    /** If the distance of the point to one of its attractors is less than this number the point will be a glider on this attracting element. If set to zero nothing
   /* happens. */
    attractorDistance?: Number
    /** List of attractor elements. If the distance of the point is less than attractorDistance the point is made to glider of this element. */
    attractors?: Element[]
    /** Unit for attractorDistance and snatchDistance, used for magnetized points and for snapToPoints. Possible values are 'screen' and 'user'. */
    attractorUnit?: String
    /** If set to true, the point will only snap to (possibly invisibly) grid points when within Point#attractorDistance of such a grid point.The coordinates of the
   /* grid points are either integer multiples of snapSizeX and snapSizeY (given in user coordinates, not pixels) or are the intersection points of the major ticks of
   /* the boards default axes in case that snapSizeX, snapSizeY are negative. */
    attractToGrid?: Boolean
    /** There are different point styles which differ in appearance. Posssible values are Value InputOutput crossx circleo square, [][] plus+ minus- divide|
   /* diamond&lt;&gt; triangleup^, a, A triangledownv triangleleft&lt; triangleright&gt; */
    face?: String
    /** List of elements which are ignored by snapToPoints. */
    ignoredSnapToPoints?: Element[]
    /** Truncating rule for the digits in the infobox.'auto': done automatically by JXG.autoDigits() 'none': no truncation number: truncate after "number digits" with
   /* JXG.toFixed() */
    infoboxDigits?: String| Number
    /** If true, the infobox is shown on mouse/pen over, if false not. If the value is 'inherit', the value of JXG.Board#showInfobox is taken. true | false | 'inherit' */
    showInfobox?: Boolean|String
    /** Size of a point, either in pixel or user coordinates. Means radius resp. half the width of a point (depending on the face). */
    size?: Number
    /** Unit for size. Possible values are 'screen' and 'user. */
    sizeUnit?: String
    /** Defines together with Point#snapSizeY the grid the point snaps on to. It is given in user coordinates, not in pixels. The point will only snap on integer
   /* multiples to snapSizeX in x and snapSizeY in y direction. If this value is equal to or less than 0, it will use the grid displayed by the major ticks of the
   /* default ticks of the default x axes of the board. */
    snapSizeX?: Number
    /** Defines together with Point#snapSizeX the grid the point snaps on to. It is given in user coordinates, not in pixels. The point will only snap on integer
   /* multiples to snapSizeX in x and snapSizeY in y direction. If this value is equal to or less than 0, it will use the grid displayed by the major ticks of the
   /* default ticks of the default y axes of the board. */
    snapSizeY?: Number
    /** If set to true, the point will snap to a grid of integer multiples of Point#snapSizeX and Point#snapSizeY (in user coordinates).The coordinates of the grid
   /* points are either integer multiples of snapSizeX and snapSizeY (given in user coordinates, not pixels) or are the intersection points of the major ticks of the
   /* boards default axes in case that snapSizeX, snapSizeY are negative. */
    snapToGrid?: Boolean
    /** If set to true, the point will snap to the nearest point in distance of Point#attractorDistance. */
    snapToPoints?: Boolean
    /** If the distance of the point to one of its attractors is at least this number the point will be released from being a glider on the attracting element. If set
   /* to zero nothing happens. */
    snatchDistance?: Number
    /** This attribute was used to determined the point layout. It was derived from GEONExT and was replaced by Point#face and Point#size. */
    style?: Number
    /** If true, the point size changes on zoom events. */
    zoom?: Boolean
    }



    /** This element is used to provide a constructor for a 3D Point. */
    interface Point3DAttributes  {
    }



    /** A polygon is an area enclosed by a set of border lines which are determined bya list of points or a list of coordinate arrays or a function returning a list of coordinate arrays.Each two consecutive points of the list define a line. */
    interface PolygonAttributes  {
    /** Attributes for the polygon border lines. */
    borders?: Line
    /** If true, moving the mouse over inner points triggers hasPoint. */
    hasInnerPoints?: Boolean
    /** By default, the strokewidths of the borders of a polygon are not changed during highlighting (only strokeColor and strokeOpacity are changed to
   /* highlightStrokeColor, and highlightStrokeOpacity). However, strokewidth is changed to highlightStrokewidth if an individual border gets the focus.With this
   /* attribute set to true, also the borders change strokeWidth if the polygon itself gets the focus. */
    highlightByStrokeWidth?: Boolean
    /** Attributes for the polygon label. */
    label?: Label
    /** Attributes for the polygon vertices. */
    vertices?: Point
    /** Is the polygon bordered by lines? */
    withLines?: Boolean
    }



    /** Creates a new 3D surface object. Do not use this constructor to create a 3D surface. Use JXG.View3D#create with type Surface3D instead. */
    interface Surface3DAttributes extends GeometryElementAttributes  {
    }



    /** Construct and handle texts.The coordinates can either be abslute (i.e. respective to the coordinate system of the board) or be relative to the coordinates of an element given in Text#anchor.HTML, MathJaX, KaTeX and GEONExT syntax can be handled.There are two ways to display texts:using the text element of the renderer (canvas or svg). In most cases this is the suitable approach if speed matters. However, advanced rendering like MathJax, KaTeX or HTML/CSS are not possible.using HTML &lt;div&gt;. This is the most flexible approach. The drawback is that HTML can only be display "above" the geometry elements. If HTML should be displayed in an inbetween layer, conder to use an element of type ForeignObject (available in svg renderer, only). */
    interface TextAttributes extends GeometryElementAttributes  {
    /** Anchor element Point, Text or Image of the text. If it exists, the coordinates of the text are relative to this anchor element. In this case, only numbers are
   /* possible coordinates, functions are not supported. */
    anchor?: Object
    /** The horizontal alignment of the text. Possible values include 'auto, 'left', 'middle', and 'right'. */
    anchorX?: String
    /** The vertical alignment of the text. Possible values include 'auto, 'top', 'middle', and 'bottom'. For MathJax or KaTeX, 'top' is recommended. */
    anchorY?: String
    /** List of attractor elements. If the distance of the text is less than attractorDistance the text is made to glider of this element. */
    attractors?: Element[]
    /** CSS class of the text in non-highlighted view. */
    cssClass?: String
    /** Default CSS properties of the HTML text element.The CSS properties which are set here, are handed over to the style property of the HTML text element. That
   /* means, they have higher property than any CSS class.If a property which is set here should be overruled by a CSS class then this property should be removed
   /* here.The reason, why this attribute should be kept to its default value at all, is that screen dumps of SVG boards with board.renderer.dumpToCanvas() will
   /* ignore the font-family if it is set in a CSS class. It has to be set explicitly as style attribute.In summary, the order of priorities from high to low
   /* isJXG.Options.text.cssStyleJXG.Options.text.cssDefaultStyleJXG.Options.text.cssClass */
    cssDefaultStyle?: String
    /** CSS properties of the HTML text element.The CSS properties which are set here, are handed over to the style property of the HTML text element. That means, they
   /* have higher property than any CSS class. */
    cssStyle?: String
    /** Used to round texts given by a number. */
    digits?: Number
    /** Determines the rendering method of the text. Possible values include 'html' and 'internal. */
    display?: String
    /** Sensitive area for dragging the text. Possible values are 'all', or something else. If set to 'small', a sensitivity margin at the right and left border is
   /* taken. This may be extended to left, right, ... in the future. */
    dragArea?: String
    /** The font size in pixels. */
    fontSize?: Number
    /** CSS unit for the font size of a text element. Usually, this will be the default value 'px' but for responsive application, also 'vw', 'vh', vmax', 'vmin' or
   /* 'rem' might be useful. */
    fontUnit?: String
    /** CSS class of the text in highlighted view. */
    highlightCssClass?: String
    /** Default CSS properties of the HTML text element in case of highlighting.The CSS properties which are set here, are handed over to the style property of the HTML
   /* text element. That means, they have higher property than any CSS class. */
    highlightCssDefaultStyle?: String
    /** CSS properties of the HTML text element in case of highlighting.The CSS properties which are set here, are handed over to the style property of the HTML text
   /* element. That means, they have higher property than any CSS class. */
    highlightCssStyle?: String
    /** Internationalization support for texts consisting of a number only.Setting the local overwrites the board-wide locale set in the board attributes. The JSXGraph
   /* attribute digits is overruled by the Intl attributes "minimumFractionDigits" and "maximumFractionDigits". See
   /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat for more information about possible options.See
   /* below for an example where the text is composed from a string and a locale formatted number. */
    intl?: object
    /** If enabled, the text will be handled as label. Intended for internal use. */
    isLabel?: Boolean
    /** Object or function returning an object that contains macros for KaTeX. */
    katexMacros?: Object
    /** If set to true, the text is parsed and evaluated. For labels parse==true results in converting names of the form k_a to subscripts. If the text is given by
   /* string and parse==true, the string is parsed as JessieCode expression. */
    parse?: Boolean
    /** Text rotation in degrees. Works for non-zero values only in combination with display=='internal'. */
    rotate?: Number
    /** Defines together with Text#snapSizeY the grid the text snaps on to. The text will only snap on integer multiples to snapSizeX in x and snapSizeY in y direction.
   /* If this value is equal to or less than 0, it will use the grid displayed by the major ticks of the default ticks of the default x axes of the board. */
    snapSizeX?: Number
    /** Defines together with Text#snapSizeX the grid the text snaps on to. The text will only snap on integer multiples to snapSizeX in x and snapSizeY in y direction.
   /* If this value is equal to or less than 0, it will use the grid displayed by the major ticks of the default ticks of the default y axes of the board. */
    snapSizeY?: Number
    /** If true, the input will be given to ASCIIMathML before rendering. */
    useASCIIMathML?: Boolean
    /** If set to true and caja's sanitizeHTML function can be found it will be used to sanitize text output. */
    useCaja?: Boolean
    /** If true, KaTeX will be used to render the input string. For this feature, katex.min.js and katex.min.css have to be included.The example below does not work,
   /* because there is a conflict with the MathJax library which is used below. */
    useKatex?: Boolean
    /** If true, MathJax will be used to render the input string. Supports MathJax 2 as well as Mathjax 3. It is recommended to use this option together with the option
   /* "parse: false". Otherwise, 4 backslashes (e.g. \\\\alpha) are needed instead of two (e.g. \\alpha). */
    useMathJax?: Boolean
    }



    /** Ticks are used as distance markers on a line or curve. They are mainly used for axis elements and slider elements. Ticks may stretch infinitely or finitely, which can be set with Ticks#majorHeight and Ticks#minorHeight.There are the following ways to position the tick lines:If an array is given as optional second parameter for the constructor like e.g. board.create('ticks', [line, [1, 4, 5]]), then there will be (fixed) ticks at position 1, 4 and 5 of the line.If there is only one parameter given, like e.g. board.create('ticks', [line]), the ticks will be set equidistant across the line element. There are two variants:Setting the attribute insertTicks:false: in this case the distance between two major ticksis determined by the attribute ticksDistance. This distance is given in user units.Setting the attribute insertTicks:true: in this case the distance between two major ticksis set automatically, depending on the size of the board,the attribute minTicksDistance,which is the minimum distance between two consecutive minor ticks (in pixel).The distance between two major ticks is a value of the form a 10i, where a is one of {1, 2, 5} and the number a 10i is maximized such that there are approximately 6 major ticks and there are at least "minTicksDistance" pixel between minor ticks.For arbitrary lines (and not axes) a "zero coordinate" is determined which defines where the first tick is positioned. This zero coordinate can be altered with the attribute anchor. Possible values are "left", "middle", "right" or a number. The default value is "left". */
    interface TicksAttributes extends GeometryElementAttributes  {
    /** Determine the position of the tick with value 0. 'left' means point1 of the line, 'right' means point2, and 'middle' is equivalent to the midpoint of the
   /* defining points. This attribute is ignored if the parent line is of type axis. */
    anchor?: String
    /** Format tick labels that were going to have scientific notation like 5.00e+6 to look like 5•10⁶. */
    beautifulScientificTickLabels?: Boolean
    /** If a label exceeds Ticks#maxLabelLength this determines the number of digits used to shorten the tick label. */
    digits?: Number
    /** Draw labels yes/no */
    drawLabels?: Boolean
    /** Draw the zero tick, that lies at line.point1? */
    drawZero?: Boolean
    /** Tick face for major ticks of finite length.By default (face: '|') this is a straight line. Possible other values are ''. These faces are used in JXG.Hatch for
   /* hatch marking parallel lines. */
    face?: String
    /** A function that expects two JXG.Coords, the first one representing the coordinates of the tick that is to be labeled, the second one the coordinates of the
   /* center (the tick with position 0). The third parameter is a null, number or a string. In the latter two cases, this value is taken. Returns a string. */
    generateLabelText?: Function
    /** A function that expects two JXG.Coords, the first one representing the coordinates of the tick that is to be labeled, the second one the coordinates of the
   /* center (the tick with position 0). */
    generateLabelValue?: Function
    /** If true, ignore the tick endings attribute for infinite (full height) ticks. This affects major and minor ticks. */
    ignoreInfiniteTickEndings?: Boolean
    /** Whether line boundaries should be included or not in the lower and upper bounds when creating ticks. In mathematical terms: if a segment considered as interval
   /* is open (includeBoundaries:false) or closed (includeBoundaries:true). In case of open interval, the interval is shortened by a small &epsilon;. */
    includeBoundaries?: Boolean
    /** Let JSXGraph determine the distance between ticks automatically. If true, the attribute ticksDistance is ignored. The distance between ticks is affected by the
   /* size of the board and the attribute minTicksDistance (in pixel). */
    insertTicks?: Boolean
    /** Internationalization support for ticks labels. */
    intl?: Object
    /** Attributes for the ticks labels */
    label?: Object
    /** User defined labels for special ticks. Instead of the i-th tick's position, the i-th string stored in this array is shown. If the number of strings in this
   /* array is less than the number of special ticks, the tick's position is shown as a fallback. */
    labels?: String[]
    /** Total height of a major tick. If negative the full height of the board is taken. */
    majorHeight?: Number
    /** Decides in which direction major ticks are visible. Possible values are either the constants 0=false or 1=true or a function returning 0 or 1.In case of [0,1]
   /* the tick is only visible to the right of the line. In case of [1,0] the tick is only visible to the left of the line. */
    majorTickEndings?: [Number,Number]
    /** The maximum number of characters a tick label can use. */
    maxLabelLength?: Number
    /** Total height of a minor tick. If negative the full height of the board is taken. */
    minorHeight?: Number
    /** The number of minor ticks between two major ticks. */
    minorTicks?: Number
    /** Minimum distance in pixel of equidistant ticks in case insertTicks==true. */
    minTicksDistance?: Number
    /** If a label exceeds Ticks#maxLabelLength this determines the precision used to shorten the tick label. Deprecated! Replaced by the attribute digits. */
    precision?: Number
    /** Scale the ticks but not the tick labels. */
    scale?: Number
    /** A string that is appended to every tick, used to represent the scale factor given in Ticks#scale. */
    scaleSymbol?: String
    /** Decides in which direction minor ticks are visible. Possible values are either the constants 0=false or 1=true or a function returning 0 or 1.In case of [0,1]
   /* the tick is only visible to the right of the line. In case of [1,0] the tick is only visible to the left of the line. */
    tickEndings?: [Number,Number]
    /** The default distance (in user coordinates, notpixels) between two ticks. Please be aware that this value does not have to be used if Ticks#insertTicks is set to
   /* true. */
    ticksDistance?: Number
    /** By default, i.e. if ticksPerLabel==false, labels are generated for major ticks, only. If ticksPerLabel is set to a(n integer) number, this denotes the number of
   /* minor ticks between two labels. */
    ticksPerLabel?: String
    /** Set the ticks type. Possible values are 'linear' or 'polar'. */
    type?: String
    /** Use the unicode character 0x2212, i.e. the HTML entity &amp;minus; as minus sign. That is &minus;1 instead of -1. */
    useUnicodeMinus?: Boolean
    }



    /** This element is used to provide projective transformations. */
    interface TransformAttributes  {
    }



    /** This element is used to provide a constructor for a turtle. */
    interface TurtleAttributes extends GeometryElementAttributes  {
    /** Attributes for the turtle arrow. */
    arrow?: Curve
    }



    /** This element creates a 3D view. */
    interface View3DAttributes extends GeometryElement3DAttributes  {
    /** Position of the main axes in a View3D element. Possible values are 'center' and 'border'. */
    axesPosition?: String
    /** Allow vertical dragging of objects, i.e. in direction of the z-axis. Subobjects areenabled: truekey: 'shift'Possible values for attribute key: 'shift' or
   /* 'ctrl'. */
    verticalDrag?: Object
    /** Attributes of the 3D x-axis. */
    xAxis?: Line3D
    /** Attributes of the 3D plane orthogonal to the x-axis at the "front" of the cube. */
    xPlaneFront?: Plane3D
    /** Attributes of the 3D y-axis on the 3D plane orthogonal to the x-axis at the "front" of the cube. */
    xPlaneFrontYAxis?: Plane3D
    /** Attributes of the 3D z-axis on the 3D plane orthogonal to the x-axis at the "front" of the cube. */
    xPlaneFrontZAxis?: Plane3D
    /** Attributes of the 3D plane orthogonal to the x-axis at the "rear" of the cube. */
    xPlaneRear?: Plane3D
    /** Attributes of the 3D y-axis on the 3D plane orthogonal to the x-axis at the "rear" of the cube. */
    xPlaneRearYAxis?: Plane3D
    /** Attributes of the 3D z-axis on the 3D plane orthogonal to the x-axis at the "rear" of the cube. */
    xPlaneRearZAxis?: Plane3D
    /** Attributes of the 3D y-axis. */
    yAxis?: Line3D
    /** Attributes of the 3D plane orthogonal to the y-axis at the "front" of the cube. */
    yPlaneFront?: Plane3D
    /** Attributes of the 3D x-axis on the 3D plane orthogonal to the y-axis at the "front" of the cube. */
    yPlaneFrontXAxis?: Plane3D
    /** Attributes of the 3D z-axis on the 3D plane orthogonal to the y-axis at the "front" of the cube. */
    yPlaneFrontZAxis?: Plane3D
    /** Attributes of the 3D plane orthogonal to the y-axis at the "rear" of the cube. */
    yPlaneRear?: Plane3D
    /** Attributes of the 3D x-axis on the 3D plane orthogonal to the y-axis at the "rear" of the cube. */
    yPlaneRearXAxis?: Plane3D
    /** Attributes of the 3D z-axis on the 3D plane orthogonal to the y-axis at the "rear" of the cube. */
    yPlaneRearZAxis?: Plane3D
    /** Attributes of the 3D z-axis. */
    zAxis?: Line3D
    /** Attributes of the 3D plane orthogonal to the z-axis at the "front" of the cube. */
    zPlaneFront?: Plane3D
    /** Attributes of the 3D x-axis on the 3D plane orthogonal to the z-axis at the "front" of the cube. */
    zPlaneFrontXAxis?: Plane3D
    /** Attributes of the 3D y-axis on the 3D plane orthogonal to the z-axis at the "front" of the cube. */
    zPlaneFrontYAxis?: Plane3D
    /** Attributes of the 3D plane orthogonal to the z-axis at the "rear" of the cube. */
    zPlaneRear?: Plane3D
    /** Attributes of the 3D x-axis on the 3D plane orthogonal to the z-axis at the "rear" of the cube. */
    zPlaneRearXAxis?: Plane3D
    /** Attributes of the 3D y-axis on the 3D plane orthogonal to the z-axis at the "rear" of the cube. */
    zPlaneRearYAxis?: Plane3D
    }



    /** A circular sector is a subarea of the area enclosed by a circle. It is enclosed by two radii and an arc. */
    interface SectorAttributes extends CurveAttributes  {
    /** Attributes for helper point anglepoint in case it is provided by coordinates. */
    anglePoint?: Point
    /** Attributes for sub-element arc. It is only available, if the sector is defined by three points. */
    arc?: Arc
    /** Attributes for helper point center in case it is provided by coordinates. */
    center?: Point
    /** Attributes for the sector label. */
    label?: Label
    /** Attributes for helper point radiuspoint in case it is provided by coordinates. */
    radiusPoint?: Point
    /** Type of sector. Possible values are 'minor', 'major', and 'auto'. */
    selection?: String
    }



    /** Vector field.Plot a vector field either given by two functions f1(x, y) and f2(x,y) or by a function f(x, y) returning an array of size 2. */
    interface VectorfieldAttributes extends CurveAttributes  {
    /** Customize arrow heads of vectors. Be careful! If enabled this will slow down the performance. Fields are:enabled: Booleansize: length of the arrow head legs (in
   /* pixel)angle: angle of the arrow head legs In radians. */
    arrowhead?: Object
    /** Scaling factor of the vectors. This in contrast to slope fields, where this attribute sets the vector to the given length. */
    scale?: Object
    }



    /** The angle element is used to denote an angle defined by three points. Visually it is just a Sector element with a radius not defined by the parent elements but by an attribute radius. As opposed to the sector, an angle has two angle points and no radius point. Sector is displayed if type=="sector". If type=="square", instead of a sector a parallelogram is displayed. In case of type=="auto", a square is displayed if the angle is near orthogonal. If no name is provided the angle label is automatically set to a lower greek letter. */
    interface AngleAttributes extends SectorAttributes  {
    /** Attributes for sub-element arc. In general, the arc will run through the first point and thus will not have the same radius as the angle sector. */
    arc?: Arc
    /** Attributes of the dot point marking right angles. */
    dot?: Object
    /** Sensitivity (in degrees) to declare an angle as right angle. If the angle measure is inside this distance from a rigth angle, the orthoType of the angle is used
   /* for display. */
    orthoSensitivity?: Number
    /** Display type of the angle field in case of a right angle. Possible values are 'sector' or 'sectordot' or 'square' or 'none'. */
    orthoType?: String
    /**  */
    pointsquare?: Object
    /** Radius of the sector, displaying the angle. The radius can be given as number (in user coordinates) or as string 'auto'. In the latter case, the angle is set to
   /* an value between 20 and 50 px. */
    radius?: Object
    /**  */
    radiuspoint?: Object
    /** Display type of the angle field. Possible values are 'sector' or 'sectordot' or 'square' or 'none'. */
    type?: String
    }



    /** An arc is a segment of the circumference of a circle. It is defined by a center, one point that defines the radius, and a third point that defines the angle of the arc. */
    interface ArcAttributes extends CurveAttributes  {
    /** Attributes for angle point. */
    anglePoint?: Point
    /** Attributes for center point. */
    center?: Point
    /** If true, moving the mouse over inner points triggers hasPoint. */
    hasInnerPoints?: Boolean
    /** Attributes for radius point. */
    radiusPoint?: Point
    /** Type of arc. Possible values are 'minor', 'major', and 'auto'. */
    selection?: String
    }



    /** This element is used to provide a constructor for arrow, which is just a wrapper for element Line with Line#straightFirst and Line#straightLast properties set to false and Line#lastArrow set to true. */
    interface ArrowAttributes extends LineAttributes  {
    }



    /** A parallel is a line through a given point with the same slope as a given line or the line through two given point.If original line is given as a JSXGraph line object, the resulting parallel line will be defined by the given point and an infinitely far away point (an ideal point). That means, the line can not be shortened to a segment.If the original line is given as two points, the resulting parallel line can be shortened to a a segment. */
    interface ParallelAttributes extends LineAttributes  {
    /** Attributes of helper point of normal. */
    point?: Point
    }



    /** An arrow parallel is a segment with an arrow attached which is parallel through a given segment, given by its defining two points, through a given point. */
    interface ArrowparallelAttributes extends ParallelAttributes  {
    }



    /** This element is used to provide a constructor for an axis. It's strictly spoken just a wrapper for element Line with Line#straightFirst and Line#straightLast properties set to true. Additionally Line#lastArrow is set to true and default Ticks will be created. */
    interface AxisAttributes extends LineAttributes  {
    /** Attributes for the axis label. */
    label?: Label
    /** Attributes for first point the axis. */
    point1?: Point
    /** Attributes for second point the axis. */
    point2?: Point
    /** Attributes for ticks of the axis. */
    ticks?: Ticks
    /** Show / hide ticks.Deprecated. Suggested alternative is "ticks: {visible: false}" */
    withTicks?: Boolean
    }



    /** A bisector is a line which divides an angle into two equal angles. It is given by three points A, B, and C and divides the angle ABC into two equal sized parts. */
    interface BisectorAttributes extends LineAttributes  {
    /** Attributes for the helper point of the bisector. */
    point?: Point
    }



    /** Bisector lines are similar to Bisector but take two lines as parent elements. The resulting element is a composition of two lines. */
    interface BisectorlinesAttributes extends CompositionAttributes  {
    /** Attributes for first line. */
    line1?: Line
    /** Attributes for second line. */
    line2?: Line
    }



    /** Box plot curve. The direction of the box plot can be either vertical or horizontal which is controlled by the attribute "dir". */
    interface BoxplotAttributes extends CurveAttributes  {
    /** Direction of the box plot: 'vertical' or 'horizontal' */
    dir?: String
    /** Relative width of the maximum and minimum quantile */
    smallWidth?: Number
    }



    /** This element is used to provide a constructor for special texts containing a form button element.For this element, the attribute "display" has to have the value 'html' (which is the default).The underlying HTML button element can be accessed through the sub-object 'rendNodeButton', e.g. to add event listeners. */
    interface ButtonAttributes extends TextAttributes  {
    /** Control the attribute "disabled" of the HTML button. */
    disabled?: Boolean
    }



    /** This element is used to provide a constructor for cardinal spline curves. Create a dynamic cardinal spline interpolated curve given by sample points p_1 to p_n. */
    interface CardinalsplineAttributes extends CurveAttributes  {
    /** Controls if the data points of the cardinal spline when given as arrays should be converted into JXG.Points. */
    createPoints?: Boolean
    /** If set to true, the supplied coordinates are interpreted as [[x_0, y_0], [x_1, y_1], p, ...]. Otherwise, if the data consists of two arrays of equal length, it
   /* is interpreted as [[x_o x_1, ..., x_n], [y_0, y_1, ..., y_n]] */
    isArrayOfCoordinates?: Boolean
    /** Attributes for the points generated by Cardinalspline in cases createPoints is set to true */
    points?: Object
    }



    /** This element is used to provide a constructor for special texts containing a form checkbox element.For this element, the attribute "display" has to have the value 'html' (which is the default).The underlying HTML checkbox element can be accessed through the sub-object 'rendNodeCheck', e.g. to add event listeners. */
    interface CheckboxAttributes extends TextAttributes  {
    /** Control the attribute "checked" of the HTML checkbox. */
    checked?: Boolean
    /** Control the attribute "disabled" of the HTML checkbox. */
    disabled?: Boolean
    }



    /** Constructs the midpoint of a Circumcircle. Like the circumcircle the circumcenter is constructed by providing three points. */
    interface CircumcenterAttributes extends PointAttributes  {
    }



    /** A circumcircle is given by three points which are all lying on the circle. */
    interface CircumcircleAttributes extends CircleAttributes  {
    /** Attributes for center point. */
    center?: Point
    }



    /** A circumcircle arc is an Arc defined by three points. All three points lie on the arc. */
    interface CircumcircleArcAttributes extends ArcAttributes  {
    /** Attributes for center point. */
    center?: Point
    }



    /** A circumcircle sector is different from a Sector mostly in the way the parent elements are interpreted. At first, the circum centre is determined from the three given points. Then the sector is drawn from p1 through p2 to p3. */
    interface CircumcircleSectorAttributes extends SectorAttributes  {
    }



    /** A comb to display domains of inequalities. */
    interface CombAttributes extends CurveAttributes  {
    /** Angle - given in radians - under which comb elements are positioned. */
    angle?: Number
    /** Frequency of comb elements. */
    frequency?: Number
    /** Attributes for first defining point of the comb. */
    point1?: Point
    /** Attributes for second defining point of the comb. */
    point2?: Point
    /** Should the comb go right to left instead of left to right. */
    reverse?: Boolean
    /** Width of the comb. */
    width?: Number
    }



    /**  */
    interface ConicAttributes extends CurveAttributes  {
    /** Attributes for center point. */
    center?: Point
    /** Attributes for foci points. */
    foci?: Point
    /** Attributes for parabola line in case the line is given by two points or coordinate pairs. */
    line?: Line
    /** Attributes for five points defining the conic, if some of them are given as coordinates. */
    point?: Point
    }



    /** Difference of two closed path elements. The elements may be of type curve, circle, polygon, inequality. If one element is a curve, it has to be closed. The resulting element is of type curve. */
    interface CurveDifferenceAttributes extends CurveAttributes  {
    }



    /** Intersection of two closed path elements. The elements may be of type curve, circle, polygon, inequality. If one element is a curve, it has to be closed. The resulting element is of type curve. */
    interface CurveIntersectionAttributes extends CurveAttributes  {
    }



    /** Union of two closed path elements. The elements may be of type curve, circle, polygon, inequality. If one element is a curve, it has to be closed. The resulting element is of type curve. */
    interface CurveUnionAttributes extends CurveAttributes  {
    }



    /** This element is used to provide a constructor for the graph showing the (numerical) derivative of a given curve. */
    interface DerivativeAttributes extends CurveAttributes  {
    }



    /** This element is used to provide a constructor for an ellipse. An ellipse is given by two points (the foci) and a third point on the ellipse or the length of the major axis. */
    interface EllipseAttributes extends ConicAttributes  {
    }



    /** This element is used to provide a constructor for functiongraph, which is just a wrapper for element Curve with JXG.Curve#X() set to x. The graph is drawn for x in the interval [a,b]. */
    interface FunctiongraphAttributes extends CurveAttributes  {
    }



    /** This element creates a 3D parametric surface. */
    interface ParametricSurface3DAttributes extends CurveAttributes  {
    /** Number of intervals the mesh is divided into in direction of parameter u. */
    stepsU?: Number
    /** Number of intervals the mesh is divided into in direction of parameter v. */
    stepsV?: Number
    }



    /** This element creates a 3D function graph. */
    interface Functiongraph3DAttributes extends ParametricSurface3DAttributes  {
    }



    /** This element is used to provide a constructor for a glider point. */
    interface GliderAttributes extends PointAttributes  {
    }



    /** Creates a grid to support the user with element placement. */
    interface GridAttributes extends CurveAttributes  {
    /**  */
    snapSizeX?: Boolean
    /**  */
    snapSizeY?: Boolean
    /**  */
    snapToGrid?: Boolean
    }



    /** Hatches can be used to mark congruent lines or curves. */
    interface HatchAttributes extends TicksAttributes  {
    }



    /** This element is used to provide a constructor for an hyperbola. An hyperbola is given by two points (the foci) and a third point on the hyperbola or the length of the major axis. */
    interface HyperbolaAttributes extends ConicAttributes  {
    }



    /** Constructs the incenter of the triangle described by the three given points. https://mathworld.wolfram.com/Incenter.html */
    interface IncenterAttributes extends PointAttributes  {
    }



    /** An incircle is given by three points. */
    interface IncircleAttributes extends CircleAttributes  {
    /** Attributes of circle center. */
    center?: Point
    }



    /** Creates an area indicating the solution of a linear inequality or an inequality of a function graph, i.e. an inequality of type y */
    interface InequalityAttributes extends CurveAttributes  {
    /** By default an inequality is less (or equal) than. Set inverse to true will consider the inequality greater (or equal) than. */
    inverse?: Boolean
    }



    /** This element is used to provide a constructor for special texts containing a HTML form input element.If the width of element is set with the attribute "cssStyle", the width of the label must be added.For this element, the attribute "display" has to have the value 'html' (which is the default).The underlying HTML input field can be accessed through the sub-object 'rendNodeInput', e.g. to add event listeners. */
    interface InputAttributes extends TextAttributes  {
    /** Control the attribute "disabled" of the HTML input field. */
    disabled?: Boolean
    /** Control the attribute "maxlength" of the HTML input field. */
    maxlength?: Number
    }



    /** This element is used to visualize the integral of a given curve over a given interval. */
    interface IntegralAttributes extends CurveAttributes  {
    /** Attributes of the (left) base point of the integral. */
    baseLeft?: Point
    /** Attributes of the (right) base point of the integral. */
    baseRight?: Point
    /** Attributes of the (left) starting point of the integral. */
    curveLeft?: Point
    /** Attributes of the (right) end point of the integral. */
    curveRight?: Point
    /** Attributes for integral label. */
    label?: Label
    }



    /** An intersection point is a point which lives on two JSXGraph elements, i.e. it is one point of the set consisting of the intersection points of the two elements. The following element types can be (mutually) intersected: line, circle, curve, polygon, polygonal chain. */
    interface IntersectionAttributes extends PointAttributes  {
    /**  */
    alwaysIntersect?: Boolean
    }



    /** Labels are text objects tied to other elements like points, lines and curves. Labels are handled internally by JSXGraph, only. There is NO constructor "board.create('label', ...)". */
    interface LabelAttributes extends TextAttributes  {
    /** Automatic position of label text. When called first, the positioning algorithm starts at the position defined by offset. The algorithm tries to find a position
   /* with the least number of overlappings with other elements, while retaining the distance to the anchor element. */
    autoPosition?: Boolean
    /** The auto position algorithm tries to put a label to a conflict-free position around it's anchor element. For this, the algorithm tests 12 positions around the
   /* anchor element up to a distance from the anchor defined here (in pixel). */
    autoPositionMaxDistance?: Number
    /** The auto position algorithm tries to put a label to a conflict-free position around it's anchor element. For this, the algorithm tests 12 positions around the
   /* anchor element starting at a distance from the anchor defined here (in pixel). */
    autoPositionMinDistance?: Number
    /** Label offset from label anchor.The label anchor is determined by Label#position */
    offset?: [Number,Number]
    /** Possible string values for the position of a label for label anchor points are:'first' (lines only)'last' (lines
   /* only)'lft''rt''top''bot''ulft''urt''llft''lrt'This is relevant for non-points: line, circle, curve.The names have been borrowed from MetaPost. */
    position?: String
    }



    /** This element is used to visualize the locus of a given dependent point. */
    interface LocusAttributes extends CurveAttributes  {
    }



    /** A major arc is a segment of the circumference of a circle having measure greater than or equal to 180 degrees (pi radians). It is defined by a center, one point that defines the radius, and a third point that defines the angle of the arc. */
    interface MajorArcAttributes extends CurveAttributes  {
    }



    /** A major sector is a sector of a circle having measure greater than or equal to 180 degrees (pi radians). It is defined by a center, one point that defines the radius, and a third point that defines the angle of the sector. */
    interface MajorSectorAttributes extends CurveAttributes  {
    }



    /** This element is used to provide a constructor for metapost spline curves. Create a dynamic metapost spline interpolated curve given by sample points p_1 to p_n. */
    interface MetapostsplineAttributes extends CurveAttributes  {
    /** Controls if the data points of the cardinal spline when given as arrays should be converted into JXG.Points. */
    createPoints?: Boolean
    /** If set to true, the supplied coordinates are interpreted as [[x_0, y_0], [x_1, y_1], p, ...]. Otherwise, if the data consists of two arrays of equal length, it
   /* is interpreted as [[x_o x_1, ..., x_n], [y_0, y_1, ..., y_n]] */
    isArrayOfCoordinates?: Boolean
    /** Attributes for the points generated by Metapost spline in cases createPoints is set to true */
    points?: Object
    }



    /** The midpoint element constructs a point in the middle of two given points. */
    interface MidpointAttributes extends PointAttributes  {
    }



    /** A minor arc is a segment of the circumference of a circle having measure less than or equal to 180 degrees (pi radians). It is defined by a center, one point that defines the radius, and a third point that defines the angle of the arc. */
    interface MinorArcAttributes extends CurveAttributes  {
    }



    /** A minor sector is a sector of a circle having measure less than or equal to 180 degrees (pi radians). It is defined by a center, one point that defines the radius, and a third point that defines the angle of the sector. */
    interface MinorSectorAttributes extends CurveAttributes  {
    }



    /** A mirror element of a point, line, circle, curve, polygon will be constructed. */
    interface mirrorelementAttributes extends GeometryElementAttributes  {
    /** Attributes of circle center, i.e. the center of the circle, if a circle is the mirror element and the transformation type is 'Euclidean' */
    center?: Point
    /** Attributes of mirror point, i.e. the point along which the element is mirrored. */
    point?: Point
    /** Type of transformation. Possible values are 'Euclidean', 'projective'.If the value is 'Euclidean', the mirror element of a circle is again a circle, otherwise
   /* it is a conic section. */
    type?: String
    }



    /** A mirror point will be constructed. */
    interface MirrorpointAttributes extends PointAttributes  {
    }



    /** A non-reflex angle is the acute or obtuse instance of an angle. It is defined by a center, one point that defines the radius, and a third point that defines the angle of the sector. */
    interface NonReflexAngleAttributes extends AngleAttributes  {
    }



    /** Constructs a normal. */
    interface NormalAttributes extends LineAttributes  {
    /** Attributes of helper point of normal. */
    point?: Point
    }



    /** This is used to construct a point that is the orthogonal projection of a point to a line. */
    interface OrthogonalprojectionAttributes extends PointAttributes  {
    }



    /** This element is used to provide a constructor for the "other" intersection point. */
    interface OtherIntersectionAttributes extends PointAttributes  {
    }



    /** This element is used to provide a constructor for a parabola. A parabola is given by one point (the focus) and a line (the directrix). */
    interface ParabolaAttributes extends ConicAttributes  {
    }



    /** This element is used to construct a parallel point. */
    interface ParallelpointAttributes extends PointAttributes  {
    }



    /** This element is used to provide a constructor for a segment. It's strictly spoken just a wrapper for element Line with Line#straightFirst and Line#straightLast properties set to false. If there is a third variable then the segment has a fixed length (which may be a function, too). */
    interface SegmentAttributes extends LineAttributes  {
    }



    /** This element is used to provide a constructor for a perpendicular. */
    interface PerpendicularAttributes extends SegmentAttributes  {
    }



    /** This is used to construct a perpendicular point. */
    interface PerpendicularPointAttributes extends PointAttributes  {
    }



    /** This element is used to provide a constructor for a perpendicular segment. */
    interface PerpendicularSegmentAttributes extends SegmentAttributes  {
    }



    /** This element is used to provide a constructor for the polar line of a point with respect to a conic or a circle. */
    interface PolarLineAttributes extends LineAttributes  {
    }



    /** This element is used to provide a constructor for the pole point of a line with respect to a conic or a circle. */
    interface PolePointAttributes extends PointAttributes  {
    }



    /** A polygonal chain is a connected series of line segments determined bya list of points or a list of coordinate arrays or a function returning a list of coordinate arrays.Each two consecutive points of the list define a line. In JSXGraph, a polygonal chain is simply realized as polygon without the last - closing - point. This may lead to unexpected results. Polygonal chains can be distinguished from polygons by the attribute 'elType' which is 'polygonalchain' for the first and 'polygon' for the latter. */
    interface PolygonalChainAttributes extends PolygonAttributes  {
    }



    /** This element is used to provide a constructor for the radical axis with respect to two circles with distinct centers. The angular bisector of the polar lines of the circle centers with respect to the other circle is always the radical axis. The radical axis passes through the intersection points when the circles intersect. When a circle about the midpoint of circle centers, passing through the circle centers, intersects the circles, the polar lines pass through those intersection points. */
    interface RadicalAxisAttributes extends LineAttributes  {
    }



    /** This element is used to construct reflected elements (points, lines, circles, curves, polygons). */
    interface ReflectionAttributes extends GeometryElementAttributes  {
    /** Type of transformation. Possible values are 'Euclidean', 'projective'.If the value is 'Euclidean', the reflected element of a circle is again a circle,
   /* otherwise it is a conic section. */
    type?: String
    }



    /** A reflex angle is the neither acute nor obtuse instance of an angle. It is defined by a center, one point that defines the radius, and a third point that defines the angle of the sector. */
    interface ReflexAngleAttributes extends AngleAttributes  {
    }



    /** Constructs a regular polygon. It needs two points which define the base line and the number of vertices. */
    interface RegularPolygonAttributes extends PolygonAttributes  {
    /** Attributes for the polygon border lines. */
    borders?: Line
    /** If true, moving the mouse over inner points triggers hasPoint. */
    hasInnerPoints?: Boolean
    /** Attributes for the polygon vertices. */
    vertices?: Point
    /** Is the polygon bordered by lines? */
    withLines?: Boolean
    }



    /** This element is used to provide a constructor for Riemann sums, which is realized as a special curve. The returned element has the method Value() which returns the sum of the areas of the bars.In case of type "simpson" and "trapezoidal", the horizontal line approximating the function value is replaced by a parabola or a secant. IN case of "simpson", the parabola is approximated visually by a polygonal chain of fixed step width. */
    interface RiemannsumAttributes extends CurveAttributes  {
    }



    /** A semicircle is a special arc defined by two points. The arc hits both points. */
    interface SemicircleAttributes extends ArcAttributes  {
    /** Attributes for center point of the semicircle. */
    center?: Point
    }



    /** A slider can be used to choose values from a given range of numbers. */
    interface SliderAttributes extends GliderAttributes  {
    /** Attributes for the base line of the slider. */
    baseline?: Line
    /** The number of digits of the slider value displayed in the optional text. */
    digits?: Number
    /** Attributes for the highlighting line of the slider. */
    highline?: Line
    /** Internationalization support for slider labels. */
    intl?: object
    /** Attributes for the slider label. */
    label?: Label
    /** If true, 'up' events on the baseline will trigger slider moves. */
    moveOnUp?: Boolean
    /** Attributes for first (left) helper point defining the slider position. */
    point1?: Point
    /** Attributes for second (right) helper point defining the slider position. */
    point2?: Point
    /** If not null, this is appended to the value and to unitLabel in the slider label. Possible types: string, number or function. */
    postLabel?: String
    /** The precision of the slider value displayed in the optional text. Replaced by the attribute "digits". */
    precision?: Number
    /** Size of slider point. */
    size?: Number
    /** If the difference between the slider value and one of the elements of snapValues is less than this number (in user coordinate units), the slider will snap to
   /* that value. */
    snapValueDistance?: Number
    /** List of values to snap to. If the glider is within snapValueDistance (in user coordinate units) of one of these points, then the glider snaps to that point. */
    snapValues?: [Number,Number]
    /** The slider only returns integer multiples of this value, e.g. for discrete values set this property to 1. For continuous results set this to -1. */
    snapWidth?: Number
    /** If not null, this replaces the part "name = " in the slider label. Possible types: string, number or function. */
    suffixLabel?: String
    /** Attributes for the ticks of the base line of the slider. */
    ticks?: Ticks
    /** If not null, this is appended to the value in the slider label. Possible types: string, number or function. */
    unitLabel?: String
    /** Show slider label. */
    withLabel?: Boolean
    /** Show slider ticks. */
    withTicks?: Boolean
    }



    /** Slope field.Plot a slope field given by a function f(x, y) returning a number. */
    interface SlopefieldAttributes extends VectorfieldAttributes  {
    /** Customize arrow heads of vectors. Be careful! If enabled this will slow down the performance. Fields are:enabled: Booleansize: length of the arrow head legs (in
   /* pixel)angle: angle of the arrow head legs In radians. */
    arrowhead?: Object
    /** Set length of the vectors in user coordinates. This in contrast to vector fields, where this attribute just scales the vector. */
    scale?: Object
    }



    /** Slope triangle for a point on a line. */
    interface SlopetriangleAttributes extends LineAttributes  {
    /** Attributes for the base line. */
    baseline?: Line
    /** Attributes for the base point. */
    basepoint?: Point
    /** Attributes for the gliding helper point. */
    glider?: Point
    /** Attributes for the slope triangle label. */
    label?: Label
    /** Attributes for the tangent. The tangent is constructed by slop triangle if the construction is based on a glider, solely. */
    tangent?: Line
    /** Attributes for the top point. */
    toppoint?: Point
    }



    /** Smart label. These are customized text elements for displaying measurements of JSXGraph elements, like length of a segment, perimeter or area of a circle or polygon (including polygonal chain), slope of a line, value of an angle, and coordinates of a point.If additionally a text, or a function is supplied and the content is not the empty string, that text is displayed instead of the measurement.Smartlabels use custom made CSS layouts defined in jsxgraph.css. Therefore, the inclusion of the file jsxgraph.css is mandatory or the CSS classes have to be replaced by other classes.The default attributes for smartlabels are defined for each type of measured element in the following sub-objects. This is a deviation from the usual JSXGraph attribute usage.JXG.Options.smartlabelangle for smartlabels of angle objectsJXG.Options.smartlabelcircle for smartlabels of circle objectsJXG.Options.smartlabelline for smartlabels of line objectsJXG.Options.smartlabelpoint for smartlabels of point objects.JXG.Options.smartlabelpolygon for smartlabels of polygon objects. */
    interface SmartlabelAttributes extends TextAttributes  {
    /** CSS classes for the smart label. Available classes are:'smart-label-solid''smart-label-outline''smart-label-pure'By default, an additional class is given
   /* specific for the element type. Available classes are 'smart-label-angle', 'smart-label-circle', 'smart-label-line', 'smart-label-point', 'smart-label-polygon'. */
    cssClass?: String
    /** Display of point coordinates either as row vector or column vector. Available values are 'row' or 'column'. */
    dir?: String
    /** CSS classes for the smart label when highlighted. */
    highlightCssClass?: String
    /** Type of measurement. Available values are: 'deg', 'rad' for angles'area', 'perimeter', 'radius' for circles'length', 'slope' for lines'area', 'perimeter' for
   /* polygonsDependent on this value, i.e. the type of measurement, the label is positioned differently on the object. */
    measure?: String
    /** Prefix text for the smartlabel. Comes before the measurement value. */
    prefix?: String
    /** Suffix text for the smartlabel. Comes after unit. */
    suffix?: String
    /** Measurement unit appended to the output text. For areas, the unit is squared automatically. Comes directly after the measurement value. */
    unit?: String
    }



    /** This element is used to provide a constructor for (natural) cubic spline curves. Create a dynamic spline interpolated curve given by sample points p_1 to p_n. */
    interface SplineAttributes extends CurveAttributes  {
    }



    /** This element is used to provide a constructor for step function, which is realized as a special curve.In case the data points should be updated after creation time, they can be accessed by curve.xterm and curve.yterm. */
    interface StepfunctionAttributes extends CurveAttributes  {
    }



    /** With the element tangent the slope of a line, circle, or curve in a certain point can be visualized. A tangent is always constructed by a glider on a line, circle, or curve and describes the tangent in the glider point on that line, circle, or curve. */
    interface TangentAttributes extends LineAttributes  {
    }



    /** A tape measure can be used to measure distances between points. */
    interface TapemeasureAttributes extends SegmentAttributes  {
    /** The precision of the tape measure value displayed in the optional text. */
    digits?: Number
    /** Attributes for the tape measure label. */
    label?: Label
    /** Attributes for first helper point defining the tape measure position. */
    point1?: Point
    /** Attributes for second helper point defining the tape measure position. */
    point2?: Point
    /** The precision of the tape measure value displayed in the optional text. Replaced by the attribute digits */
    precision?: Number
    /** Text rotation in degrees. */
    rotate?: Number
    /** Attributes for the ticks of the tape measure. */
    ticks?: Ticks
    /** Show tape measure label. */
    withLabel?: Boolean
    /** Show tape measure ticks. */
    withTicks?: Boolean
    }



    /** This element is used to provide a constructor for trace curve (simple locus curve), which is realized as a special curve. */
    interface TracecurveAttributes extends CurveAttributes  {
    /** The number of evaluated data points. */
    numberPoints?: Number
    }


           interface InitBoardAttributes {
              /** Time (in msec) between two animation steps. */
              animationDelay?: Number
              /** Show default axis. */
              axis?: Boolean
              /** Bounding box of the visible area in user coordinates. [left,top,right,bottom] */
              boundingbox?:[Number,Number,Number,Number]
              /** Enable browser scrolling on touch interfaces if the user double taps into an empty region of the board. */
              browserPan?: Boolean
              /** Attributes for the default axes in case of the attribute axis:true in JXG.JSXGraph#initBoard. */
              defaultAxes?: Object
              /** Description string for the board. */
              description?: String
              /** Supply the document object. */
              document?: String
              /** Control the possibilities for dragging objects. */
              drag?: Object
              /** Attribute(s) to control the fullscreen icon. */
              fullscreen?: Object
              /** If set true and hasPoint() is true for both an element and it's label, the element (and not the label) is taken as drag element. */
              ignoreLabels?: Boolean
              /** Support for internationalization of number formatting. */
              intl?: Object
              /** If set to true, the ratio between horizontal and vertical unit sizes stays constant - independent of size changes of the hosting HTML div element. */
              keepAspectRatio?: Number
              /** Control using the keyboard to change the construction. */
              keyboard?: Object
              /** If enabled, user activities are logged in array "board.userLog". */
              logging?: Boolean
              /** Maximal bounding box of the visible area in user coordinates. */
              maxBoundingBox?: [Number,Number,Number,Number]
              /** Maximum frame rate of the board, i.e. */
              maxFrameRate?: Number
              /** Maximum number of digits in automatic label generation. */
              maxNameLength?: Number
              /** Change redraw strategy in SVG rendering engine. */
              moveTarget?: Object
              /** A number that will be added to the absolute position of the board used in mouse coordinate calculations in JXG.Board#getCoordsTopLeftCorner. */
              offsetX?: Number
              /** A number that will be added to the absolute position of the board used in mouse coordinate calculations in JXG.Board#getCoordsTopLeftCorner. */
              offsetY?: Number
              /** Control the possibilities for panning interaction (i.e. */
              pan?: Object
              /** Allow user interaction by registering mouse, pointer, keyboard or touch events. */
              registerEvents?: Boolean
              /** Listen to fullscreen event. */
              registerFullscreenEvent?: Boolean
              /** Listen to resize events, i.e. */
              registerResizeEvent?: Boolean
              /** Control if JSXGraph reacts to resizing of the JSXGraph container element by the user / browser. */
              resize?: Boolean
              /** Attributes to control the screenshot function. */
              screenshot?: Object
              /** Control the possibilities for a selection rectangle. */
              selection?: Object
              /** Show a button which allows to clear all traces of a board. */
              showClearTraces?: Boolean
              /** Show copyright string in canvas. */
              showCopyright?: Boolean
              /** Show a button in the navigation bar to start fullscreen mode. */
              showFullscreen?: Boolean
              /** If true, the infobox is shown on mouse/pen over for all points which have set their attribute showInfobox to 'inherit'. */
              showInfobox?: Boolean
              /** Display of navigation arrows and zoom buttons in the navigation bar. */
              showNavigation?: Number
              /** Show a button in the navigation bar to force reload of a construction. */
              showReload?: Boolean
              /** Show a button in the navigation bar to enable screenshots. */
              showScreenshot?: Boolean
              /** Display of zoom buttons in the navigation bar. */
              showZoom?: Boolean
              /** If true the first element of the set JXG.board.objects having hasPoint==true is taken as drag element. */
              takeFirst?: Number
              /** If true, when read from a file or string - the size of the div can be changed by the construction text. */
              takeSizeFromFile?: Number
              /** Title string for the board. */
              title?: String
              /** Control the possibilities for zoom interaction. */
              zoom?: Object
              /** Zoom factor in horizontal direction. */
              zoomX?: Number
              /** Zoom factor in vertical direction. */
              zoomY?: Number
       }

           /** Initialize a new board. */

           export class JSXGraph{
               initBoard(html: string, attributes?:InitBoardAttributes): JSXBoard {
               const newBoard = new JSXBoard()
               newBoard.board = (window as any).JXG.JSXGraph.initBoard(html, attributes) as unknown as JSXBoard
               return newBoard
           }

            /** Delete a board and all its contents. */
            freeBoard(board: JSXBoard): void {
                (window as any).JXG.JSXGraph.freeBoard(board)
            }
               // /** Load a board from a file containing a construction made with either GEONExT, Intergeo, Geogebra, or Cinderella. */
               // export function loadBoardFromFile(html: string, file: string, format: string, attributes: Object, callback: Function) {
               //     (window as any).JXG.JSXGraph.loadBoardFromFile(html, file, format, attributes, callback)
               // }
               // /** Load a board from a base64 encoded string containing a construction made with either GEONExT, Intergeo, Geogebra, or Cinderella. */
               // export function loadBoardFromString(html: string, base64String: string, format: string, attributes: Object, callback: Function) {
               //     (window as any).JXG.JSXGraph.loadBoardFromString(html, base64String, format, attributes, callback)
               // }
           }



           export class GeometryElement {
               elValue: Object = {}
               constructor(elValue: any){
                   this.elValue = elValue
               }
               /** returns the X coordinate of this element */
               public X():number{
                  return(this.elValue as any).X() as number
               }
               /** returns the Y coordinate of this element */
               public Y():number{
                  return(this.elValue as any).Y() as number
               }
               /** returns the Z coordinate of this element */
               public Z():number{
                   return(this.elValue as any).Z() as number
                }
                /** returns the value of this element */
                public Value():number{
                    return(this.elValue as any).Value() as number
                 }
                }



           export class JSXBoard {
               board: JSXBoard | null
               constructor() {
                   this.board = null
               }

               /** Legacy method to create elements. */
               create(elType: string, params: any[] = [], attributes: Object = {}): GeometryElement {
                   let newObject = (this.board as any).create(elType, params, attributes)
                   let newElement = new GeometryElement(newObject as GeometryElement);
                   return newElement
               }

               // utility to dereference parameter- if they use TSXGraph objects then  use the JSXGraph objects instead
               private dereference(params: any[]): any[] {
                   let ret = params.map((x) => (typeof x == 'object' && x.hasOwnProperty('elValue')) ? x.elValue : x)
                   return ret
               }

               // /** Create a 2D Transform. */
               transform(dx:Number|Function|Point, dy:Number|[Number,Number]|Function|Point, ttype:'translate' | 'scale' | 'reflect' | 'rotate' | 'shear' | 'generic',attributes: Object = {}): Transform {
                   let newObject = (this.board as any).create('transform', this.dereference([dx,dy]), {type:ttype})
                   // let newObject = (window as any).JXG.Create('transform', this.dereference([dx,dy]),{type:ttype}) as Transform

                   let newElement = new Transform(newObject as Transform)
                   return newElement
               }


                       /////////////////////////////
                       /////////////////////////////
                       /////////////////////////////


    /** Angle defined with three points */
   angle(from:Point, around:Point, to:Point,  attributes?: AngleAttributes):Angle
    /** Angle defined with two lines and two directions */
   angle(line1:Line, line2:Line, direction1:[Number,Number], direction2:[Number,Number],  attributes?: AngleAttributes):Angle

               // implementation signature,  hidden from user
               angle(a?:any, b?:any, c?:any, d?:any,e?:any,f?:any):Angle{
               let newObject: Angle
               if (e == undefined) {
                   newObject = (this.board as any).create('Angle', this.dereference([a, b, c]), d) as unknown as Angle
               } else if (d == undefined) {
                   newObject = (this.board as any).create('Angle', this.dereference([a, b]), c) as unknown as Angle
               } else if (c == undefined) {
                   newObject = (this.board as any).create('Angle', this.dereference([a]), b) as unknown as Angle
               } else if (b == undefined) {
                   newObject = (this.board as any).create('Angle', [], a) as unknown as Angle
               } else {
                   newObject = (this.board as any).create('Angle', this.dereference([a, b, c, d]), e) as unknown as Angle
               }
               return new Angle(newObject as Angle)
           }


    /** Create an Arc with three points  An arc is a segment of the circumference of a circle. It is defined by a center, one point that
   defines the radius, and a third point that defines the angle of the arc.*/
   arc(p1:Point|[Number,Number], p2:Point|[Number,Number], p3:Point|[Number,Number],  attributes?: ArcAttributes):Arc {
    let newObject = (this.board as any).create('Arc', this.dereference([p1,p2,p3,]), attributes)
    return new Arc(newObject as Arc)
   }

    /** Arrow defined by two points (like a Line) */
   arrow(p1:Point, p2:Point,  attributes?: ArrowAttributes):Arrow
    /** Arrow defined by three numbers (like a Line) */
   arrow(a:Number, b:Number, c:Number,  attributes?: ArrowAttributes):Arrow

               // implementation signature,  hidden from user
               arrow(a?:any, b?:any, c?:any, d?:any,e?:any,f?:any):Arrow{
               let newObject: Arrow
               if (e == undefined) {
                   newObject = (this.board as any).create('Arrow', this.dereference([a, b, c]), d) as unknown as Arrow
               } else if (d == undefined) {
                   newObject = (this.board as any).create('Arrow', this.dereference([a, b]), c) as unknown as Arrow
               } else if (c == undefined) {
                   newObject = (this.board as any).create('Arrow', this.dereference([a]), b) as unknown as Arrow
               } else if (b == undefined) {
                   newObject = (this.board as any).create('Arrow', [], a) as unknown as Arrow
               } else {
                   newObject = (this.board as any).create('Arrow', this.dereference([a, b, c, d]), e) as unknown as Arrow
               }
               return new Arrow(newObject as Arrow)
           }


    /** Create an Arrow parallel to a segment. The constructed arrow contains p3 and has the same slope as the line through p1 and p2.  An arrow parallel is a segment with an arrow attached which is parallel through a given segment, given by its defining two points,
   through a given point.*/
   arrowparallel(p1:Point, p2:Point, p3:Point,  attributes?: ArrowparallelAttributes):Arrowparallel {
    let newObject = (this.board as any).create('Arrowparallel', this.dereference([p1,p2,p3,]), attributes)
    return new Arrowparallel(newObject as Arrowparallel)
   }

    /** Create an Axis with two points (like a Line) */
   axis(p1:Point, p2:Point,  attributes?: AxisAttributes):Axis
    /** Create an Axis with three number (like a Line) */
   axis(a:Number, b:Number, c:Number,  attributes?: AxisAttributes):Axis

               // implementation signature,  hidden from user
               axis(a?:any, b?:any, c?:any, d?:any,e?:any,f?:any):Axis{
               let newObject: Axis
               if (e == undefined) {
                   newObject = (this.board as any).create('Axis', this.dereference([a, b, c]), d) as unknown as Axis
               } else if (d == undefined) {
                   newObject = (this.board as any).create('Axis', this.dereference([a, b]), c) as unknown as Axis
               } else if (c == undefined) {
                   newObject = (this.board as any).create('Axis', this.dereference([a]), b) as unknown as Axis
               } else if (b == undefined) {
                   newObject = (this.board as any).create('Axis', [], a) as unknown as Axis
               } else {
                   newObject = (this.board as any).create('Axis', this.dereference([a, b, c, d]), e) as unknown as Axis
               }
               return new Axis(newObject as Axis)
           }


    /** Bisect an Angle defined with three points  A bisector is a line which divides an angle into two equal angles. It is given by three points A, B, and
   C and divides the angle ABC into two equal sized parts.*/
   bisector(p1:Point, p2:Point, p3:Point,  attributes?: BisectorAttributes):Bisector {
    let newObject = (this.board as any).create('Bisector', this.dereference([p1,p2,p3,]), attributes)
    return new Bisector(newObject as Bisector)
   }


    /** Bisect a Line defined with two points  Bisector lines are similar to Bisector but take two lines as parent elements. The resulting element is
   a composition of two lines.*/
   bisectorlines(p1:Point, p2:Point,  attributes?: BisectorlinesAttributes):Bisectorlines {
    let newObject = (this.board as any).create('Bisectorlines', this.dereference([p1,p2,]), attributes)
    return new Bisectorlines(newObject as Bisectorlines)
   }


    /** Quantiles(array with at least five elements Number|Function|String) plus axis, plus width  Box plot curve. The direction of the box plot can be either vertical or horizontal which
   is controlled by the attribute "dir".*/
   boxplot(q:any[], axis:Number|Function, width:Number|Function,  attributes?: BoxplotAttributes):Boxplot {
    let newObject = (this.board as any).create('Boxplot', this.dereference([q,axis,width,]), attributes)
    return new Boxplot(newObject as Boxplot)
   }


    /** create a button  This element is used to provide a constructor for special texts containing a
   form button element.

   For this element, the attribute "display" has to have the value 'html' (which is the default).

   The underlying HTML button element can be accessed through the sub-object 'rendNodeButton', e.g. to
   add event listeners.*/
   button(x:Number|Function, y:Number|Function, label:String|Function, handler:Function,  attributes?: ButtonAttributes):Button {
    let newObject = (this.board as any).create('Button', this.dereference([x,y,label,handler,]), attributes)
    return new Button(newObject as Button)
   }


    /** Curve  This element is used to provide a constructor for curve, which is just a wrapper for element Curve.
   A curve is a mapping from R to R^2. t mapsto (x(t),y(t)). The graph is drawn for t in the interval [a,b].

   The following types of curves can be plotted:

     parametric curves: t mapsto (x(t),y(t)), where x() and y() are univariate functions.
     polar curves: curves commonly written with polar equations like spirals and cardioids.
     data plots: plot line segments through a given list of coordinates.*/
   curve(x:Number|Function|Arc, y:Number|Function|Transform,  attributes?: CurveAttributes):Curve {
    let newObject = (this.board as any).create('Curve', this.dereference([x,y,]), attributes)
    return new Curve(newObject as Curve)
   }


    /**   This element is used to provide a constructor for a general line. A general line is given by two points. By setting additional properties
   a line can be used as an arrow and/or axis.*/
   line(p1:Point|[Number,Number]|Function, p2:Point|[Number,Number]|Function,  attributes?: LineAttributes):Line {
    let newObject = (this.board as any).create('Line', this.dereference([p1,p2,]), attributes)
    return new Line(newObject as Line)
   }


    /**   This element is used to provide a constructor for a general point. A free point is created if the given parent elements are all numbers
   and the property fixed is not set or set to false. If one or more parent elements is not a number but a string containing a GEONExT
   constraint or a function the point will be considered as constrained). That means that the user won't be able to change the point's
   position directly.*/
   point(x:Number|Function|Point, y:Number|Function|Transform,  attributes?: PointAttributes):Point {
    let newObject = (this.board as any).create('Point', this.dereference([x,y,]), attributes)
    return new Point(newObject as Point)
   }


    /**   Construct and handle texts.

   The coordinates can either be abslute (i.e. respective to the coordinate system of the board) or be relative to the coordinates of an element
   given in Text#anchor.

   HTML, MathJaX, KaTeX and GEONExT syntax can be handled.

   There are two ways to display texts:

    using the text element of the renderer (canvas or svg). In most cases this is the suitable approach if speed matters.
   However, advanced rendering like MathJax, KaTeX or HTML/CSS are not possible.
    using HTML &lt;div&gt;. This is the most flexible approach. The drawback is that HTML can only be display "above" the geometry elements.
   If HTML should be displayed in an inbetween layer, conder to use an element of type ForeignObject (available in svg renderer, only).*/
   text(x:Number|Function, y:Number|Function, string:String|Function,  attributes?: TextAttributes):Text {
    let newObject = (this.board as any).create('Text', this.dereference([x,y,string,]), attributes)
    return new Text(newObject as Text)
   }

   }


    export class Board {
    elValue: Object = {}
    constructor(elValue: any){
        this.elValue = elValue
    }
   }

    export class Infobox extends Board {
    constructor(elValues: Board){
      super(elValues)
   }
   }

    export class CA {
    elValue: Object = {}
    constructor(elValue: any){
        this.elValue = elValue
    }

    /** f = map (x) -> x*sin(x);
   Usages:
   h = D(f, x);
   h = map (x) -> D(f, x); */
    expandDerivatives(): any {
     return (this.elValue as any).expandDerivatives() as any
   }

    /** Declare all subnodes as math nodes,
   i.e recursively set node.isMath = true; */
    setMath(): any {
     return (this.elValue as any).setMath() as any
   }
   }

    export class Chart {
    elValue: Object = {}
    constructor(elValue: any){
        this.elValue = elValue
    }

    /** Contains pointers to the various subelements of the chart. */
    public get elements():Number[] {
     return this.elements as Number[]
   }

    /** Create bar chart defined by two data arrays. */
    drawBar(): Number[] {
     return (this.elValue as any).drawBar() as Number[]
   }

    /** Create line chart where the curve is given by a regression polynomial
   defined by two data arrays. */
    drawFit(): Curve {
     return (this.elValue as any).drawFit() as Curve
   }

    /** Create line chart defined by two data arrays. */
    drawLine(): Curve {
     return (this.elValue as any).drawLine() as Curve
   }

    /** Create pie chart. */
    drawPie(): Object {
     return (this.elValue as any).drawPie() as Object
   }

    /** Create chart consisting of JSXGraph points. */
    drawPoints(): Number[] {
     return (this.elValue as any).drawPoints() as Number[]
   }

    /** Create radar chart. */
    drawRadar(): Object {
     return (this.elValue as any).drawRadar() as Object
   }

    /** Create line chart that consists of a natural spline curve
   defined by two data arrays. */
    drawSpline(): Curve {
     return (this.elValue as any).drawSpline() as Curve
   }

    /** Template for dynamic charts update. */
    updateDataArray(): Chart {
     return (this.elValue as any).updateDataArray() as Chart
   }
   }

    export class Circle {
    elValue: Object = {}
    constructor(elValue: any){
        this.elValue = elValue
    }

    /** The circles center. */
    public get center():Point {
     return this.center as Point
   }

    /** Circle defining the radius of the circle given by the radius of the other circle
   only set if method equals 'pointLine'. */
    public get circle():Circle {
     return this.circle as Circle
   }

    /** Line defining the radius of the circle given by the distance from the startpoint and the endpoint of the line
   only set if method equals 'pointLine'. */
    public get line():Line {
     return this.line as Line
   }

    /** Stores the given method. */
    public get method():String {
     return this.method as String
   }

    /** Point on the circle only set if method equals 'twoPoints'. */
    public get point2():Point {
     return this.point2 as Point
   }

    /** Radius of the circle
   only set if method equals 'pointRadius' */
    public get radius():Number {
     return this.radius as Number
   }

    /** Add transformations to this circle. */
    addTransform(): Circle {
     return (this.elValue as any).addTransform() as Circle
   }

    /** Circle area */
    Area(): Number {
     return (this.elValue as any).Area() as Number
   }

    /** Get bounding box of the circle. */
    bounds(): Number[] {
     return (this.elValue as any).bounds() as Number[]
   }

    /** Get data to construct this element. */
    getParents(): Number[] {
     return (this.elValue as any).getParents() as Number[]
   }

    /** Use <a href="../symbols/JXG.Circle.html#Radius">JXG.Circle#Radius</a>. */
    getRadius(): Boolean {
     return (this.elValue as any).getRadius() as Boolean
   }

    /** Perimeter (circumference) of circle. */
    Perimeter(): Number {
     return (this.elValue as any).Perimeter() as Number
   }

    /** Calculates the radius of the circle. */
    Radius(): Number {
     return (this.elValue as any).Radius() as Number
   }

    /** Set a new radius, then update the board. */
    setRadius(): Circle {
     return (this.elValue as any).setRadius() as Circle
   }

    /** Uses the boards renderer to update the circle. */
    update(): Number {
     return (this.elValue as any).update() as Number
   }
   }

    export class Complex {
    elValue: Object = {}
    constructor(elValue: any){
        this.elValue = elValue
    }

    /** Absolute value in the polar form of the complex number. */
    public get absval():Number {
     return this.absval as Number
   }

    /** Angle value in the polar form of the complex number. */
    public get angle():Number {
     return this.angle as Number
   }

    /** Imaginary part of the complex number. */
    public get imaginary():Number {
     return this.imaginary as Number
   }

    /** This property is only to signalize that this object is of type JXG.Complex. */
    public get isComplex():Boolean {
     return this.isComplex as Boolean
   }

    /** Real part of the complex number. */
    public get real():Number {
     return this.real as Number
   }

    /** Add another complex number to this complex number. */
    add(): Complex {
     return (this.elValue as any).add() as Complex
   }

    /** Conjugate a complex number in place. */
    conj(): Complex {
     return (this.elValue as any).conj() as Complex
   }

    /** Divide this complex number by the given complex number. */
    div(): Complex {
     return (this.elValue as any).div() as Complex
   }

    /** Multiply another complex number to this complex number. */
    mult(): Complex {
     return (this.elValue as any).mult() as Complex
   }

    /** Subtract another complex number from this complex number. */
    sub(): Complex {
     return (this.elValue as any).sub() as Complex
   }

    /** Converts a complex number into a string. */
    toString(): String {
     return (this.elValue as any).toString() as String
   }
   }

    export class Composition {
    elValue: Object = {}
    constructor(elValue: any){
        this.elValue = elValue
    }

    /** Adds an element to the composition container. */
    add(): Boolean {
     return (this.elValue as any).add() as Boolean
   }

    /** Invokes fullUpdate for every stored element with a fullUpdate method and hands over the given arguments. */
    fullUpdate(): Boolean {
     return (this.elValue as any).fullUpdate() as Boolean
   }

    /** Invokes highlight for every stored element with a highlight method and hands over the given arguments. */
    highlight(): Boolean {
     return (this.elValue as any).highlight() as Boolean
   }

    /** Invokes noHighlight for every stored element with a noHighlight method and hands over the given arguments. */
    noHighlight(): Boolean {
     return (this.elValue as any).noHighlight() as Boolean
   }

    /** Invokes prepareUpdate for every stored element with a prepareUpdate method and hands over the given arguments. */
    prepareUpdate(): Boolean {
     return (this.elValue as any).prepareUpdate() as Boolean
   }

    /** Remove an element from the composition container. */
    remove(): Boolean {
     return (this.elValue as any).remove() as Boolean
   }

    /** Invokes setAttribute for every stored element with a setAttribute method and hands over the given arguments. */
    setAttribute(): any {
     return (this.elValue as any).setAttribute() as any
   }

    /** Invokes setParents for every stored element with a setParents method and hands over the given arguments. */
    setParents(): any {
     return (this.elValue as any).setParents() as any
   }

    /** Invokes update for every stored element with a update method and hands over the given arguments. */
    update(): any {
     return (this.elValue as any).update() as any
   }

    /** Invokes updateRenderer for every stored element with a updateRenderer method and hands over the given arguments. */
    updateRenderer(): any {
     return (this.elValue as any).updateRenderer() as any
   }
   }

    export class Coords {
    elValue: Object = {}
    constructor(elValue: any){
        this.elValue = elValue
    }

    /** Stores the board the object is used on. */
    public get board():Board {
     return this.board as Board
   }

    /** If true, this coordinates object will emit update events every time
   the coordinates are set. */
    public get emitter():boolean {
     return this.emitter as boolean
   }

    /** Stores coordinates for screen view as homogeneous coordinates. */
    public get scrCoords():Number[] {
     return this.scrCoords as Number[]
   }

    /** Stores coordinates for user view as homogeneous coordinates. */
    public get usrCoords():Number[] {
     return this.usrCoords as Number[]
   }

    /** Calculate distance of one point to another. */
    distance(): Number {
     return (this.elValue as any).distance() as Number
   }

    /** Test if one of the usrCoords is NaN or the coordinates are infinite. */
    isReal(): Boolean {
     return (this.elValue as any).isReal() as Boolean
   }

    /** Set coordinates by either user coordinates or screen coordinates and recalculate the other one. */
    setCoordinates(): Coords {
     return (this.elValue as any).setCoordinates() as Coords
   }
   }

    export class CoordsElement extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }

    /** Coordinates of the element. */
    public get coords():Coords {
     return this.coords as Coords
   }

    /** Stores the groups of this element in an array of Group. */
    public get groups():Number[] {
     return this.groups as Number[]
   }

    /** True if there the method this.updateConstraint() has been set. */
    public get isConstrained():Boolean {
     return this.isConstrained as Boolean
   }

    /** A <a href="../symbols/JXG.CoordsElement.html#updateGlider">JXG.CoordsElement#updateGlider</a> call is usually followed
   by a general <a href="../symbols/JXG.Board.html#update">JXG.Board#update</a> which calls
   <a href="../symbols/JXG.CoordsElement.html#updateGliderFromParent">JXG.CoordsElement#updateGliderFromParent</a>. */
    public get needsUpdateFromParent():Boolean {
     return this.needsUpdateFromParent as Boolean
   }

    /** Determines whether the element slides on a polygon if point is a glider. */
    public get onPolygon():Boolean {
     return this.onPolygon as Boolean
   }

    /** Relative position on a slide element (line, circle, curve) if element is a glider on this element. */
    public get position():Number {
     return this.position as Number
   }

    /** When used as a glider this member stores the object, where to glide on. */
    public get slideObject():GeometryElement {
     return this.slideObject as GeometryElement
   }

    /** List of elements the element is bound to, i.e. */
    public get slideObjects():CoordsElement {
     return this.slideObjects as CoordsElement
   }

    /** Convert the point to CAS point and call update(). */
    addConstraint(): CoordsElement {
     return (this.elValue as any).addConstraint() as CoordsElement
   }

    /** Add transformations to this element. */
    addTransform(): CoordsElement {
     return (this.elValue as any).addTransform() as CoordsElement
   }

    /** Generic method to create point, text or image. */
    create(): Coords {
     return (this.elValue as any).create() as Coords
   }

    /** Getter method for the distance to a second point, this is required for CAS-elements. */
    Dist(): Number {
     return (this.elValue as any).Dist() as Number
   }

    /** Converts a calculated element into a free element,
   i.e. */
    free(): Point {
     return (this.elValue as any).free() as Point
   }

    /** A point can change its type from free point to glider
   and vice versa. */
    handleAttractors(): Point {
     return (this.elValue as any).handleAttractors() as Point
   }

    /** Let a point snap to the nearest point in distance of
   JXG.Point#attractorDistance. */
    handleSnapToPoints(): Point {
     return (this.elValue as any).handleSnapToPoints() as Point
   }

    /** Convert the point to glider and update the construction. */
    makeGlider(): CoordsElement {
     return (this.elValue as any).makeGlider() as CoordsElement
   }

    /** Starts an animation which moves the point along a given path in given time. */
    moveAlong(): CoordsElement {
     return (this.elValue as any).moveAlong() as CoordsElement
   }

    /** Starts an animated point movement towards the given coordinates <tt>where</tt>. */
    moveTo(): CoordsElement {
     return (this.elValue as any).moveTo() as CoordsElement
   }

    /** Remove the last slideObject. */
    popSlideObject(): Point {
     return (this.elValue as any).popSlideObject() as Point
   }

    /** Sets the position of a glider relative to the defining elements
   of the JXG.Point#slideObject. */
    setGliderPosition(): Point {
     return (this.elValue as any).setGliderPosition() as Point
   }

    /** Sets coordinates and calls the point's update() method. */
    setPosition(): Point {
     return (this.elValue as any).setPosition() as Point
   }

    /** Translates the point by <tt>tv = (x, y)</tt>. */
    setPositionByTransform(): Point {
     return (this.elValue as any).setPositionByTransform() as Point
   }

    /** Sets coordinates and calls the point's update() method. */
    setPositionDirectly(): Point {
     return (this.elValue as any).setPositionDirectly() as Point
   }

    /** Alias for JXG.Element#handleSnapToGrid */
    snapToGrid(): CoordsElement {
     return (this.elValue as any).snapToGrid() as CoordsElement
   }

    /** Alias for <a href="../symbols/JXG.CoordsElement.html#handleSnapToPoints">JXG.CoordsElement#handleSnapToPoints</a>. */
    snapToPoints(): Point {
     return (this.elValue as any).snapToPoints() as Point
   }

    /** Applies the transformations of the element. */
    updateTransform(): CoordsElement {
     return (this.elValue as any).updateTransform() as CoordsElement
   }

    /** Starts an animated point movement towards the given coordinates <tt>where</tt>. */
    visit(): CoordsElement {
     return (this.elValue as any).visit() as CoordsElement
   }
   }

    export class Curve extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }

    /** Array holding the x-coordinates of a data plot. */
    public get dataX():Number[] {
     return this.dataX as Number[]
   }

    /** Array holding the y-coordinates of a data plot. */
    public get dataY():Number[] {
     return this.dataY as Number[]
   }

    /** Array of ticks storing all the ticks on this curve. */
    public get ticks():Number[] {
     return this.ticks as Number[]
   }

    /** Add transformations to this curve. */
    addTransform(): Curve {
     return (this.elValue as any).addTransform() as Curve
   }

    /** Allocate points in the Coords array this.points */
    allocatePoints(): Number[] {
     return (this.elValue as any).allocatePoints() as Number[]
   }

    /** Converts the JavaScript/JessieCode/GEONExT syntax of the defining function term into JavaScript. */
    generateTerm(): Number[] {
     return (this.elValue as any).generateTerm() as Number[]
   }

    /** Checks whether (x,y) is near the curve. */
    hasPoint(): Boolean {
     return (this.elValue as any).hasPoint() as Boolean
   }

    /** Gives the default value of the right bound for the curve. */
    maxX(): Number {
     return (this.elValue as any).maxX() as Number
   }

    /** Gives the default value of the left bound for the curve. */
    minX(): Number {
     return (this.elValue as any).minX() as Number
   }

    /** Shift the curve by the vector 'where'. */
    moveTo(): Curve {
     return (this.elValue as any).moveTo() as Curve
   }

    /** Finds dependencies in a given term and notifies the parents by adding the
   dependent object to the found objects child elements. */
    notifyParents(): Curve {
     return (this.elValue as any).notifyParents() as Curve
   }

    /** Computes for equidistant points on the x-axis the values of the function */
    update(): Curve {
     return (this.elValue as any).update() as Curve
   }

    /** Computes the curve path */
    updateCurve(): Curve {
     return (this.elValue as any).updateCurve() as Curve
   }

    /** For dynamic dataplots updateCurve can be used to compute new entries
   for the arrays <a href="../symbols/JXG.Curve.html#dataX">JXG.Curve#dataX</a> and <a href="../symbols/JXG.Curve.html#dataY">JXG.Curve#dataY</a>. */
    updateDataArray(): Curve {
     return (this.elValue as any).updateDataArray() as Curve
   }

    /** Updates the visual contents of the curve. */
    updateRenderer(): Curve {
     return (this.elValue as any).updateRenderer() as Curve
   }

    /** Applies the transformations of the curve to the given point <tt>p</tt>. */
    updateTransform(): Point {
     return (this.elValue as any).updateTransform() as Point
   }
   }

    export class Curve3D extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class Dump {
    elValue: Object = {}
    constructor(elValue: any){
        this.elValue = elValue
    }
   }

    export class ForeignObject {
    elValue: Object = {}
    constructor(elValue: any){
        this.elValue = elValue
    }

    /** 'href' of the foreignObject. */
    public get content():Number[] {
     return this.content as Number[]
   }

    /** Array of length two containing [width, height] of the foreignObject in pixel. */
    public get size():Number[] {
     return this.size as Number[]
   }

    /** Returns the height of the foreignObject in user coordinates. */
    H(): number {
     return (this.elValue as any).H() as number
   }

    /** Checks whether (x,y) is over or near the image; */
    hasPoint(): Boolean {
     return (this.elValue as any).hasPoint() as Boolean
   }

    /** Set the width and height of the foreignObject. */
    setSize(): ForeignObject {
     return (this.elValue as any).setSize() as ForeignObject
   }

    /** Returns the width of the foreignObject in user coordinates. */
    W(): number {
     return (this.elValue as any).W() as number
   }
   }

    export class GeometryElement3D {
    elValue: Object = {}
    constructor(elValue: any){
        this.elValue = elValue
    }
   }

    export class Group {
    elValue: Object = {}
    constructor(elValue: any){
        this.elValue = elValue
    }

    /** Cache coordinates of points. */
    public get coords():Object {
     return this.coords as Object
   }

    /** Adds all points in a group to this group. */
    addGroup(): Group {
     return (this.elValue as any).addGroup() as Group
   }

    /** Adds ids of elements to the array this.parents. */
    addParents(): Object {
     return (this.elValue as any).addParents() as Object
   }

    /** Adds an Point to this group. */
    addPoint(): Group {
     return (this.elValue as any).addPoint() as Group
   }

    /** Adds multiple points to this group. */
    addPoints(): Group {
     return (this.elValue as any).addPoints() as Group
   }

    /** Adds a point to the set of rotation points of the group. */
    addRotationPoint(): Group {
     return (this.elValue as any).addRotationPoint() as Group
   }

    /** Adds a point to the set of the scale points of the group. */
    addScalePoint(): Group {
     return (this.elValue as any).addScalePoint() as Group
   }

    /** Adds a point to the set of the translation points of the group. */
    addTranslationPoint(): Group {
     return (this.elValue as any).addTranslationPoint() as Group
   }

    /** List of the element ids resp. */
    getParents(): Number[] {
     return (this.elValue as any).getParents() as Number[]
   }

    /** Removes a point from the group. */
    removePoint(): Group {
     return (this.elValue as any).removePoint() as Group
   }

    /** Removes the rotation property from a point of the group. */
    removeRotationPoint(): Group {
     return (this.elValue as any).removeRotationPoint() as Group
   }

    /** Removes the scaling property from a point of the group. */
    removeScalePoint(): Group {
     return (this.elValue as any).removeScalePoint() as Group
   }

    /** Removes the translation property from a point of the group. */
    removeTranslationPoint(): Group {
     return (this.elValue as any).removeTranslationPoint() as Group
   }

    /** Sets ids of elements to the array this.parents. */
    setParents(): Object {
     return (this.elValue as any).setParents() as Object
   }

    /**  */
    setProperty(): Group {
     return (this.elValue as any).setProperty() as Group
   }

    /** Sets the center of rotation for the group. */
    setRotationCenter(): Group {
     return (this.elValue as any).setRotationCenter() as Group
   }

    /** Sets the rotation points of the group. */
    setRotationPoints(): Group {
     return (this.elValue as any).setRotationPoints() as Group
   }

    /** Sets the center of scaling for the group. */
    setScaleCenter(): Group {
     return (this.elValue as any).setScaleCenter() as Group
   }

    /** Sets the scale points of the group. */
    setScalePoints(): Group {
     return (this.elValue as any).setScalePoints() as Group
   }

    /** Sets the translation points of the group. */
    setTranslationPoints(): Group {
     return (this.elValue as any).setTranslationPoints() as Group
   }

    /** Releases all elements of this group. */
    ungroup(): Group {
     return (this.elValue as any).ungroup() as Group
   }

    /** Sends an update to all group members. */
    update(): Group {
     return (this.elValue as any).update() as Group
   }
   }

    export class Image {
    elValue: Object = {}
    constructor(elValue: any){
        this.elValue = elValue
    }

    /** Array of length two containing [width, height] of the image in pixel. */
    public get size():Number[] {
     return this.size as Number[]
   }

    /** 'href' of the image. */
    public get url():string {
     return this.url as string
   }

    /** Returns the height of the image in user coordinates. */
    H(): number {
     return (this.elValue as any).H() as number
   }

    /** Checks whether (x,y) is over or near the image; */
    hasPoint(): Boolean {
     return (this.elValue as any).hasPoint() as Boolean
   }

    /** Set the width and height of the image. */
    setSize(): GeometryElement {
     return (this.elValue as any).setSize() as GeometryElement
   }

    /** Returns the width of the image in user coordinates. */
    W(): number {
     return (this.elValue as any).W() as number
   }
   }

    export class Legend {
    elValue: Object = {}
    constructor(elValue: any){
        this.elValue = elValue
    }

    /** (Circular) array of label colors. */
    public get colors():Number[] {
     return this.colors as Number[]
   }

    /** Label names of a legend element. */
    public get labels():Number[] {
     return this.labels as Number[]
   }

    /** Height (in px) of one legend entry */
    public get rowHeight():Number {
     return this.rowHeight as Number
   }

    /** Default style of a legend element. */
    public get style():String {
     return this.style as String
   }
   }

    export class Line extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }

    /** Reference of the ticks created automatically when constructing an axis. */
    public get defaultTicks():Ticks {
     return this.defaultTicks as Ticks
   }

    /** If the line is the border of a polygon, the polygon object is stored, otherwise null. */
    public get parentPolygon():Polygon {
     return this.parentPolygon as Polygon
   }

    /** Startpoint of the line. */
    public get point1():Point {
     return this.point1 as Point
   }

    /** Endpoint of the line. */
    public get point2():Point {
     return this.point2 as Point
   }

    /** Array of ticks storing all the ticks on this line. */
    public get ticks():Number[] {
     return this.ticks as Number[]
   }

    /** Add transformations to this line. */
    addTransform(): Line {
     return (this.elValue as any).addTransform() as Line
   }

    /** Determines the angle between the positive x axis and the line. */
    getAngle(): Number {
     return (this.elValue as any).getAngle() as Number
   }

    /** Calculates the y intersect of the line. */
    getRise(): Number {
     return (this.elValue as any).getRise() as Number
   }

    /** Alias for line.Slope */
    getSlope(): Number {
     return (this.elValue as any).getSlope() as Number
   }

    /** Checks whether (x,y) is near the line. */
    hasPoint(): Boolean {
     return (this.elValue as any).hasPoint() as Boolean
   }

    /** The distance between the two points defining the line. */
    L(): Number {
     return (this.elValue as any).L() as Number
   }

    /** Calculates the slope of the line. */
    Slope(): Number {
     return (this.elValue as any).Slope() as Number
   }
   }

    export class Line3D extends GeometryElement3D {
    constructor(elValues: GeometryElement3D){
      super(elValues)
   }

    /** Direction which - together with a point - defines the line. */
    public get direction():Number[]|Function {
     return this.direction as Number[]|Function
   }

    /** 3D point which - together with a direction - defines the line. */
    public get point():Point3D {
     return this.point as Point3D
   }

    /** Starting point of the 3D line */
    public get point1():Point3D {
     return this.point1 as Point3D
   }

    /** End point of the 3D line */
    public get point2():Point3D {
     return this.point2 as Point3D
   }

    /** Range [r1, r2] of the line. */
    public get range():Number[] {
     return this.range as Number[]
   }
   }

    export class Plane3D extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }

    /** Right hand side of the Hesse normal form. */
    public get d():Number[] {
     return this.d as Number[]
   }

    /** Two linearly independent vectors - together with a point - define the plane. */
    public get direction1():Number[]|Function {
     return this.direction1 as Number[]|Function
   }

    /** Two linearly independent vectors - together with a point - define the plane. */
    public get direction2():Number[]|Function {
     return this.direction2 as Number[]|Function
   }

    /** Normal vector of the plane. */
    public get normal():Number[] {
     return this.normal as Number[]
   }

    /** 3D point which - together with two direction vectors - defines the plane. */
    public get point():Point3D {
     return this.point as Point3D
   }

    /** Range [r1, r2] of direction1. */
    public get range1():Number[] {
     return this.range1 as Number[]
   }

    /** Range [r1, r2] of direction2. */
    public get range2():Number[] {
     return this.range2 as Number[]
   }

    /** Direction vector 1 of the 3D plane. */
    public get vec1():Number[] {
     return this.vec1 as Number[]
   }

    /** Direction vector 2 of the 3D plane. */
    public get vec2():Number[] {
     return this.vec2 as Number[]
   }
   }

    export class Point extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }

    /** Test if the point is on (is incident with) element "el". */
    isOn(): Boolean {
     return (this.elValue as any).isOn() as Boolean
   }

    /** Convert the point to intersection point and update the construction. */
    makeIntersection(): Point {
     return (this.elValue as any).makeIntersection() as Point
   }

    /** Updates the position of the point. */
    update(): CoordsElement {
     return (this.elValue as any).update() as CoordsElement
   }

    /** Applies the transformations of the element to JXG.Point#baseElement. */
    updateTransform(): CoordsElement {
     return (this.elValue as any).updateTransform() as CoordsElement
   }
   }

    export class Point3D {
    elValue: Object = {}
    constructor(elValue: any){
        this.elValue = elValue
    }

    /** Homogeneous coordinates of a Point3D, i.e. */
    public get coords():Number[] {
     return this.coords as Number[]
   }

    /** Optional slide element, i.e. */
    public get slide():GeometryElement3D {
     return this.slide as GeometryElement3D
   }

    /** Set the position of a 3D point. */
    setPosition(): Number[] {
     return (this.elValue as any).setPosition() as Number[]
   }

    /** Get x-coordinate of a 3D point. */
    X(): Number[] {
     return (this.elValue as any).X() as Number[]
   }

    /** Get y-coordinate of a 3D point. */
    Y(): Number[] {
     return (this.elValue as any).Y() as Number[]
   }

    /** Get z-coordinate of a 3D point. */
    Z(): Number[] {
     return (this.elValue as any).Z() as Number[]
   }
   }

    export class Polygon {
    elValue: Object = {}
    constructor(elValue: any){
        this.elValue = elValue
    }

    /** References to the border lines of the polygon. */
    public get borders():Number[] {
     return this.borders as Number[]
   }

    /** References to the points defining the polygon. */
    public get vertices():Number[] {
     return this.vertices as Number[]
   }

    /** Add more points to the polygon. */
    addPoints(): Polygon {
     return (this.elValue as any).addPoints() as Polygon
   }

    /** Area of (not self-intersecting) polygon */
    Area(): Number {
     return (this.elValue as any).Area() as Number
   }

    /** Bounding box of a polygon. */
    boundingBox(): Number[] {
     return (this.elValue as any).boundingBox() as Number[]
   }

    /** Finds the index to a given point reference. */
    findPoint(): Number {
     return (this.elValue as any).findPoint() as Number
   }

    /** return TextAnchor */
    getTextAnchor(): Boolean {
     return (this.elValue as any).getTextAnchor() as Boolean
   }

    /** Checks whether (x,y) is near the polygon. */
    hasPoint(): Boolean {
     return (this.elValue as any).hasPoint() as Boolean
   }

    /** Hide the polygon including its border lines. */
    hideElement(): Polygon {
     return (this.elValue as any).hideElement() as Polygon
   }

    /** Insert points to the vertex list of the polygon after index <tt>idx</tt>. */
    insertPoints(): Polygon {
     return (this.elValue as any).insertPoints() as Polygon
   }

    /** Generic method for the intersection of this polygon with another polygon. */
    intersect(): Number[] {
     return (this.elValue as any).intersect() as Number[]
   }

    /** Alias for Perimeter. */
    L(): Number {
     return (this.elValue as any).L() as Number
   }

    /** Perimeter of polygon. */
    Perimeter(): Number {
     return (this.elValue as any).Perimeter() as Number
   }

    /** Wrapper for JXG.Math.Geometry.pnpoly. */
    pnpoly(): Boolean {
     return (this.elValue as any).pnpoly() as Boolean
   }

    /** Removes given set of vertices from the polygon */
    removePoints(): Polygon {
     return (this.elValue as any).removePoints() as Polygon
   }

    /** Moves the polygon by the difference of two coordinates. */
    setPositionDirectly(): Polygon {
     return (this.elValue as any).setPositionDirectly() as Polygon
   }

    /** Make the element visible. */
    showElement(): Number[] {
     return (this.elValue as any).showElement() as Number[]
   }

    /** Uses the boards renderer to update the polygon. */
    updateRenderer(): any {
     return (this.elValue as any).updateRenderer() as any
   }
   }

    export class Surface3D extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }

    /** Function which maps (u, v) to x; i.e. */
    X(): any {
     return (this.elValue as any).X() as any
   }

    /** Function which maps (u, v) to y; i.e. */
    Y(): any {
     return (this.elValue as any).Y() as any
   }

    /** Function which maps (u, v) to z; i.e. */
    Z(): any {
     return (this.elValue as any).Z() as any
   }
   }

    export class Text extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }

    /** Width and height of the text element in pixel. */
    public get size():Number[] {
     return this.size as Number[]
   }

    /** Returns the bounding box of the text element in user coordinates as an
   array of length 4: [upper left x, upper left y, lower right x, lower right y]. */
    bounds(): Number[] {
     return (this.elValue as any).bounds() as Number[]
   }

    /** A very crude estimation of the dimensions of the textbox in case nothing else is available. */
    crudeSizeEstimate(): Number[] {
     return (this.elValue as any).crudeSizeEstimate() as Number[]
   }

    /** Returns the value of the attribute "anchorX". */
    getAnchorX(): Number {
     return (this.elValue as any).getAnchorX() as Number
   }

    /** Returns the value of the attribute "anchorY". */
    getAnchorY(): Number {
     return (this.elValue as any).getAnchorY() as Number
   }

    /** Return the width of the text element. */
    getSize(): Number[] {
     return (this.elValue as any).getSize() as Number[]
   }

    /** Replace _{} by &lt;sub&gt; */
    replaceSub(): String {
     return (this.elValue as any).replaceSub() as String
   }

    /** Replace ^{} by &lt;sup&gt; */
    replaceSup(): String {
     return (this.elValue as any).replaceSup() as String
   }

    /** Sets the offset of a label element to the position with the least number
   of overlaps with other elements, while retaining the distance to its
   anchor element. */
    setAutoPosition(): Text {
     return (this.elValue as any).setAutoPosition() as Text
   }

    /** Move the text to new coordinates. */
    setCoords(x:Number,y:Number): object {
     return (this.elValue as any).setCoords(x,y) as object
   }

    /** Defines new content. */
    setText(newText:String): Text {
     return (this.elValue as any).setText(newText) as Text
   }

    /** Defines new content but converts &lt; and &gt; to HTML entities before updating the DOM. */
    setTextJessieCode(): this {
     return (this.elValue as any).setTextJessieCode() as this
   }

    /** Evaluates the text. */
    update(): this {
     return (this.elValue as any).update() as this
   }

    /** Recompute the width and the height of the text box. */
    updateSize(): this {
     return (this.elValue as any).updateSize() as this
   }

    /** Decode unicode entities into characters. */
    utf8_decode(): String {
     return (this.elValue as any).utf8_decode() as String
   }
   }

    export class Ticks extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }

    /** The board the ticks line is drawn on. */
    public get board():Board {
     return this.board as Board
   }

    /** Flag if the ticks are equidistant. */
    public get equidistant():Boolean {
     return this.equidistant as Boolean
   }

    /** Array of fixed ticks. */
    public get fixedTicks():Number[] {
     return this.fixedTicks as Number[]
   }

    /** Used to ensure the uniqueness of label ids this counter is used. */
    public get labelCounter():number {
     return this.labelCounter as number
   }

    /** Array where the labels are saved. */
    public get labels():Number[] {
     return this.labels as Number[]
   }

    /** A list of labels which have to be displayed in updateRenderer. */
    public get labelsData():Number[] {
     return this.labelsData as Number[]
   }

    /** The line the ticks belong to. */
    public get line():Line {
     return this.line as Line
   }

    /** Stores the ticks coordinates */
    public get ticks():Number[] {
     return this.ticks as Number[]
   }

    /** Formats label texts to make labels displayed in scientific notation look beautiful. */
    beautifyScientificNotationLabel(): String {
     return (this.elValue as any).beautifyScientificNotationLabel() as String
   }

    /** Checks whether (x,y) is near the line. */
    hasPoint(): Boolean {
     return (this.elValue as any).hasPoint() as Boolean
   }

    /** Sets x and y coordinate of the tick. */
    setPositionDirectly(): Ticks {
     return (this.elValue as any).setPositionDirectly() as Ticks
   }

    /** Recalculate the tick positions and the labels. */
    update(): Ticks {
     return (this.elValue as any).update() as Ticks
   }

    /** Uses the boards renderer to update the arc. */
    updateRenderer(): Ticks {
     return (this.elValue as any).updateRenderer() as Ticks
   }
   }

    export class Transform {
    elValue: Object = {}
    constructor(elValue: any){
        this.elValue = elValue
    }
   }

    export class Turtle extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }

    /** Move the turtle backwards. */
    back(): Turtle {
     return (this.elValue as any).back() as Turtle
   }

    /** Alias for <a href="../symbols/JXG.Turtle.html#back">JXG.Turtle#back</a> */
    bk(): Turtle {
     return (this.elValue as any).bk() as Turtle
   }

    /** Removes the turtle curve from the board. */
    clean(): Turtle {
     return (this.elValue as any).clean() as Turtle
   }

    /** Removes the turtle completely and resets it to its initial position and direction. */
    clearScreen(): Turtle {
     return (this.elValue as any).clearScreen() as Turtle
   }

    /** Alias for <a href="../symbols/JXG.Turtle.html#clearScreen">JXG.Turtle#clearScreen</a> */
    cs(): Number {
     return (this.elValue as any).cs() as Number
   }

    /** The "co"-coordinate of the turtle curve at position t is returned. */
    evalAt(): Number {
     return (this.elValue as any).evalAt() as Number
   }

    /** Alias for <a href="../symbols/JXG.Turtle.html#forward">JXG.Turtle#forward</a> */
    fd(): Turtle {
     return (this.elValue as any).fd() as Turtle
   }

    /** Move the turtle forward. */
    forward(): Turtle {
     return (this.elValue as any).forward() as Turtle
   }

    /** Get most recently set turtle color. */
    getHighlightPenColor(): Boolean {
     return (this.elValue as any).getHighlightPenColor() as Boolean
   }

    /** Get most recently set turtle color. */
    getPenColor(): Boolean {
     return (this.elValue as any).getPenColor() as Boolean
   }

    /** Get most recently set turtle size (in pixel). */
    getPenSize(): Boolean {
     return (this.elValue as any).getPenSize() as Boolean
   }

    /** Checks whether (x,y) is near the curve. */
    hasPoint(): Boolean {
     return (this.elValue as any).hasPoint() as Boolean
   }

    /** Sets the visibility of the turtle head to false, */
    hideTurtle(): Turtle {
     return (this.elValue as any).hideTurtle() as Turtle
   }

    /** Moves the turtle to position [0,0]. */
    home(): Turtle {
     return (this.elValue as any).home() as Turtle
   }

    /** Alias for <a href="../symbols/JXG.Turtle.html#hideTurtle">JXG.Turtle#hideTurtle</a> */
    ht(): Turtle {
     return (this.elValue as any).ht() as Turtle
   }

    /** Rotate the turtle direction to the right. */
    left(): Turtle {
     return (this.elValue as any).left() as Turtle
   }

    /** Rotates the turtle into a new direction. */
    lookTo(): Turtle {
     return (this.elValue as any).lookTo() as Turtle
   }

    /** Alias for <a href="../symbols/JXG.Turtle.html#left">JXG.Turtle#left</a> */
    lt(): Turtle {
     return (this.elValue as any).lt() as Turtle
   }

    /** Gives the upper bound of the parameter if the turtle is treated as parametric curve. */
    maxX(): Turtle {
     return (this.elValue as any).maxX() as Turtle
   }

    /** Gives the lower bound of the parameter if the turtle is treated as parametric curve. */
    minX(): Turtle {
     return (this.elValue as any).minX() as Turtle
   }

    /** Moves the turtle to a given coordinate pair. */
    moveTo(): Turtle {
     return (this.elValue as any).moveTo() as Turtle
   }

    /** Alias for <a href="../symbols/JXG.Turtle.html#penDown">JXG.Turtle#penDown</a> */
    pd(): Turtle {
     return (this.elValue as any).pd() as Turtle
   }

    /** Pen down, continues visible drawing */
    penDown(): Turtle {
     return (this.elValue as any).penDown() as Turtle
   }

    /** Pen up, stops visible drawing */
    penUp(): Turtle {
     return (this.elValue as any).penUp() as Turtle
   }

    /** Alias for <a href="../symbols/JXG.Turtle.html#popTurtle">JXG.Turtle#popTurtle</a> */
    pop(): Turtle {
     return (this.elValue as any).pop() as Turtle
   }

    /** Gets the last position of the turtle on the stack, sets the turtle to this position and removes this
   position from the stack. */
    popTurtle(): Turtle {
     return (this.elValue as any).popTurtle() as Turtle
   }

    /** Alias for <a href="../symbols/JXG.Turtle.html#penUp">JXG.Turtle#penUp</a> */
    pu(): Turtle {
     return (this.elValue as any).pu() as Turtle
   }

    /** Alias for <a href="../symbols/JXG.Turtle.html#pushTurtle">JXG.Turtle#pushTurtle</a> */
    push(): Turtle {
     return (this.elValue as any).push() as Turtle
   }

    /** Pushes the position of the turtle on the stack. */
    pushTurtle(): Turtle {
     return (this.elValue as any).pushTurtle() as Turtle
   }

    /** Rotate the turtle direction to the right */
    right(): Turtle {
     return (this.elValue as any).right() as Turtle
   }

    /** Alias for <a href="../symbols/JXG.Turtle.html#right">JXG.Turtle#right</a> */
    rt(): Turtle {
     return (this.elValue as any).rt() as Turtle
   }

    /** Sets properties of the turtle, see also <a href="../symbols/JXG.GeometryElement.html#setAttribute">JXG.GeometryElement#setAttribute</a>. */
    setAttribute(): Turtle {
     return (this.elValue as any).setAttribute() as Turtle
   }

    /** Sets the highlight pen color. */
    setHighlightPenColor(): Turtle {
     return (this.elValue as any).setHighlightPenColor() as Turtle
   }

    /** Sets the pen color. */
    setPenColor(): Turtle {
     return (this.elValue as any).setPenColor() as Turtle
   }

    /** Sets the pen size. */
    setPenSize(): Turtle {
     return (this.elValue as any).setPenSize() as Turtle
   }

    /** Moves the turtle without drawing to a new position */
    setPos(): Turtle {
     return (this.elValue as any).setPos() as Turtle
   }

    /** Sets the visibility of the turtle head to true, */
    showTurtle(): Turtle {
     return (this.elValue as any).showTurtle() as Turtle
   }

    /** Alias for <a href="../symbols/JXG.Turtle.html#showTurtle">JXG.Turtle#showTurtle</a> */
    st(): Number {
     return (this.elValue as any).st() as Number
   }
   }

    export class View3D extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }

    /** Slider to adapt azimuth angle */
    public get az_slide():Number[] {
     return this.az_slide as Number[]
   }

    /** Bounding box (cube) [[x1, x2], [y1,y2], [z1,z2]] of the 3D view */
    public get bbox3D():Number[] {
     return this.bbox3D as Number[]
   }

    /** Default axes of the 3D view, contains the axes of the view or null. */
    public get defaultAxes():Object {
     return this.defaultAxes as Object
   }

    /** Slider to adapt elevation angle */
    public get el_slide():Object {
     return this.el_slide as Object
   }

    /** An associative array / dictionary to store the objects of the board by name. */
    public get elementsByName():Object {
     return this.elementsByName as Object
   }

    /**  */
    public get llftCorner():Number[] {
     return this.llftCorner as Number[]
   }

    /**  */
    public get matrix3D():Object {
     return this.matrix3D as Object
   }

    /** An associative array containing all geometric objects belonging to the view. */
    public get objects():Object {
     return this.objects as Object
   }

    /** Distance of the view to the origin. */
    public get r():Number {
     return this.r as Number
   }

    /** Width and height [w, h] of the 3D view if elevation and azimuth are set to 0. */
    public get size():Number[] {
     return this.size as Number[]
   }

    /**  */
    animateAzimuth(): Object {
     return (this.elValue as any).animateAzimuth() as Object
   }

    /** Creates a new 3D element of type elementType. */
    create(): Object {
     return (this.elValue as any).create() as Object
   }

    /** Intersect a ray with the bounding cube of the 3D view. */
    intersectionLineCube(): Number[] {
     return (this.elValue as any).intersectionLineCube() as Number[]
   }

    /**  */
    intersectionPlanePlane(): Number[] {
     return (this.elValue as any).intersectionPlanePlane() as Number[]
   }

    /** Test if coordinates are inside of the bounding cube. */
    isInCube(): Number[] {
     return (this.elValue as any).isInCube() as Number[]
   }

    /** Project a 2D coordinate to the plane defined by the point foot
   and the normal vector `normal`. */
    project2DTo3DPlane(): Number[] {
     return (this.elValue as any).project2DTo3DPlane() as Number[]
   }

    /** Project a 2D coordinate to a new 3D position by keeping
   the 3D x, y coordinates and changing only the z coordinate. */
    project2DTo3DVertical(): Number[] {
     return (this.elValue as any).project2DTo3DVertical() as Number[]
   }

    /** Project 3D coordinates to 2D board coordinates
   The 3D coordinates are provides as three numbers x, y, z or one array of length 3. */
    project3DTo2D(): Number[] {
     return (this.elValue as any).project3DTo2D() as Number[]
   }

    /** Limit 3D coordinates to the bounding cube. */
    project3DToCube(): GeometryElement3D|Composition {
     return (this.elValue as any).project3DToCube() as GeometryElement3D|Composition
   }

    /** Select a single or multiple elements at once. */
    select(): GeometryElement3D|Composition {
     return (this.elValue as any).select() as GeometryElement3D|Composition
   }

    /**  */
    stopAzimuth(): any {
     return (this.elValue as any).stopAzimuth() as any
   }
   }

    export class Sector extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }

    /** Midpoint of the sector. */
    public get point1():Point {
     return this.point1 as Point
   }

    /** This point together with <a href="../symbols/Sector.html#point1">Sector#point1</a> defines the radius. */
    public get point2():Point {
     return this.point2 as Point
   }

    /** Defines the sector's angle. */
    public get point3():Point {
     return this.point3 as Point
   }

    /** Defines the sectors orientation in case of circumCircleSectors. */
    public get point4():Point {
     return this.point4 as Point
   }

    /** Checks whether (x,y) is within the area defined by the sector. */
    hasPointSector(): Boolean {
     return (this.elValue as any).hasPointSector() as Boolean
   }

    /** Returns the radius of the sector. */
    Radius(): Number {
     return (this.elValue as any).Radius() as Number
   }
   }

    export class Vectorfield extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }

    /** Set the defining functions of vector field. */
    setF(): Object {
     return (this.elValue as any).setF() as Object
   }
   }

    export class Angle extends Sector {
    constructor(elValues: Sector){
      super(elValues)
   }

    /** The point defining the radius of the angle element. */
    public get point():Point {
     return this.point as Point
   }

    /** Frees an angle from a prescribed value. */
    free(): Object {
     return (this.elValue as any).free() as Object
   }

    /** Set an angle to a prescribed value given in radians. */
    setAngle(): Object {
     return (this.elValue as any).setAngle() as Object
   }
   }

    export class Arc extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }

    /** The point defining the arc's angle. */
    public get anglepoint():Point {
     return this.anglepoint as Point
   }

    /** Point defining the arc's radius. */
    public get radiuspoint():Point {
     return this.radiuspoint as Point
   }

    /**  */
    getRadius(): Number {
     return (this.elValue as any).getRadius() as Number
   }

    /** Checks whether (x,y) is within the sector defined by the arc. */
    hasPointSector(): Boolean {
     return (this.elValue as any).hasPointSector() as Boolean
   }

    /** Determines the arc's current radius. */
    Radius(): Number {
     return (this.elValue as any).Radius() as Number
   }
   }

    export class Arrow extends Line {
    constructor(elValues: Line){
      super(elValues)
   }
   }

    export class Parallel extends Line {
    constructor(elValues: Line){
      super(elValues)
   }
   }

    export class Arrowparallel extends Parallel {
    constructor(elValues: Parallel){
      super(elValues)
   }
   }

    export class Axis extends Line {
    constructor(elValues: Line){
      super(elValues)
   }

    /** The ticks attached to the axis. */
    public get defaultTicks():Ticks {
     return this.defaultTicks as Ticks
   }
   }

    export class Bisector extends Line {
    constructor(elValues: Line){
      super(elValues)
   }
   }

    export class Bisectorlines extends Composition {
    constructor(elValues: Composition){
      super(elValues)
   }
   }

    export class Boxplot extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class Button extends Text {
    constructor(elValues: Text){
      super(elValues)
   }
   }

    export class Cardinalspline extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class Checkbox extends Text {
    constructor(elValues: Text){
      super(elValues)
   }

    /** Returns the value of the checkbox element */
    Value(): number {
     return (this.elValue as any).Value() as number
   }
   }

    export class Circumcenter extends Point {
    constructor(elValues: Point){
      super(elValues)
   }
   }

    export class Circumcircle extends Circle {
    constructor(elValues: Circle){
      super(elValues)
   }
   }

    export class CircumcircleArc extends Arc {
    constructor(elValues: Arc){
      super(elValues)
   }
   }

    export class CircumcircleSector extends Sector {
    constructor(elValues: Sector){
      super(elValues)
   }

    /** Center of the circumcirclesector */
    public get center():Circumcenter {
     return this.center as Circumcenter
   }
   }

    export class Comb extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class Conic extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class CurveDifference extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class CurveIntersection extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class CurveUnion extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class Derivative extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class Ellipse extends Conic {
    constructor(elValues: Conic){
      super(elValues)
   }
   }

    export class Functiongraph extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class ParametricSurface3D extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class Functiongraph3D extends ParametricSurface3D {
    constructor(elValues: ParametricSurface3D){
      super(elValues)
   }
   }

    export class Glider extends Point {
    constructor(elValues: Point){
      super(elValues)
   }

    /** Animate the point. */
    startAnimation(): CoordsElement {
     return (this.elValue as any).startAnimation() as CoordsElement
   }

    /** Stop animation. */
    stopAnimation(): CoordsElement {
     return (this.elValue as any).stopAnimation() as CoordsElement
   }
   }

    export class Grid extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class Hatch extends Ticks {
    constructor(elValues: Ticks){
      super(elValues)
   }

    /** The default distance (in user coordinates, not  pixels) between two hatch symbols. */
    public get ticksDistance():Number {
     return this.ticksDistance as Number
   }
   }

    export class Hyperbola extends Conic {
    constructor(elValues: Conic){
      super(elValues)
   }
   }

    export class Incenter extends Point {
    constructor(elValues: Point){
      super(elValues)
   }
   }

    export class Incircle extends Circle {
    constructor(elValues: Circle){
      super(elValues)
   }
   }

    export class Inequality extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class Input extends Text {
    constructor(elValues: Text){
      super(elValues)
   }

    /** Sets value of the input element. */
    set(): GeometryElement {
     return (this.elValue as any).set() as GeometryElement
   }

    /** Returns the value (content) of the input element */
    Value(): number {
     return (this.elValue as any).Value() as number
   }
   }

    export class Integral extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }

    /** The point on the axis initially corresponding to the lower value of the interval. */
    public get baseLeft():Point {
     return this.baseLeft as Point
   }

    /** The point on the axis initially corresponding to the higher value of the interval. */
    public get baseRight():Point {
     return this.baseRight as Point
   }

    /** The glider on the curve corresponding to the lower value of the interval. */
    public get curveLeft():Point {
     return this.curveLeft as Point
   }

    /** The glider on the axis corresponding to the higher value of the interval. */
    public get curveRight():Point {
     return this.curveRight as Point
   }

    /** Returns the current value of the integral. */
    Value(): number {
     return (this.elValue as any).Value() as number
   }
   }

    export class Intersection extends Point {
    constructor(elValues: Point){
      super(elValues)
   }
   }

    export class Label extends Text {
    constructor(elValues: Text){
      super(elValues)
   }
   }

    export class Locus extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }

    /** The time it took to calculate the locus */
    public get ctime():Number {
     return this.ctime as Number
   }

    /** The implicit definition of the locus. */
    public get eq():String {
     return this.eq as String
   }
   }

    export class MajorArc extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class MajorSector extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class Metapostspline extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class Midpoint extends Point {
    constructor(elValues: Point){
      super(elValues)
   }
   }

    export class MinorArc extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class MinorSector extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class mirrorelement extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class Mirrorpoint extends Point {
    constructor(elValues: Point){
      super(elValues)
   }
   }

    export class NonReflexAngle extends Angle {
    constructor(elValues: Angle){
      super(elValues)
   }
   }

    export class Normal extends Line {
    constructor(elValues: Line){
      super(elValues)
   }
   }

    export class Orthogonalprojection extends Point {
    constructor(elValues: Point){
      super(elValues)
   }
   }

    export class OtherIntersection extends Point {
    constructor(elValues: Point){
      super(elValues)
   }
   }

    export class Parabola extends Conic {
    constructor(elValues: Conic){
      super(elValues)
   }
   }

    export class Parallelpoint extends Point {
    constructor(elValues: Point){
      super(elValues)
   }
   }

    export class Segment extends Line {
    constructor(elValues: Line){
      super(elValues)
   }
   }

    export class Perpendicular extends Segment {
    constructor(elValues: Segment){
      super(elValues)
   }
   }

    export class PerpendicularPoint extends Point {
    constructor(elValues: Point){
      super(elValues)
   }
   }

    export class PerpendicularSegment extends Segment {
    constructor(elValues: Segment){
      super(elValues)
   }

    /** Helper point */
    public get point():PerpendicularPoint {
     return this.point as PerpendicularPoint
   }
   }

    export class PolarLine extends Line {
    constructor(elValues: Line){
      super(elValues)
   }
   }

    export class PolePoint extends Point {
    constructor(elValues: Point){
      super(elValues)
   }
   }

    export class PolygonalChain extends Polygon {
    constructor(elValues: Polygon){
      super(elValues)
   }
   }

    export class RadicalAxis extends Line {
    constructor(elValues: Line){
      super(elValues)
   }
   }

    export class Reflection extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class ReflexAngle extends Angle {
    constructor(elValues: Angle){
      super(elValues)
   }
   }

    export class RegularPolygon extends Polygon {
    constructor(elValues: Polygon){
      super(elValues)
   }
   }

    export class Riemannsum extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class Semicircle extends Arc {
    constructor(elValues: Arc){
      super(elValues)
   }

    /** The midpoint of the two defining points. */
    public get midpoint():Midpoint {
     return this.midpoint as Midpoint
   }
   }

    export class Slider extends Glider {
    constructor(elValues: Glider){
      super(elValues)
   }

    /** End value of the slider range. */
    public get _smax():Number {
     return this._smax as Number
   }

    /** Start value of the slider range. */
    public get _smin():Number {
     return this._smin as Number
   }

    /** Sets the maximum value of the slider. */
    setMax(): Object {
     return (this.elValue as any).setMax() as Object
   }

    /** Sets the minimum value of the slider. */
    setMin(): Object {
     return (this.elValue as any).setMin() as Object
   }

    /** Sets the value of the slider. */
    setValue(): Object {
     return (this.elValue as any).setValue() as Object
   }
   }

    export class Slopefield extends Vectorfield {
    constructor(elValues: Vectorfield){
      super(elValues)
   }

    /** Set the defining functions of slope field. */
    setF(): Object {
     return (this.elValue as any).setF() as Object
   }
   }

    export class Slopetriangle extends Line {
    constructor(elValues: Line){
      super(elValues)
   }
   }

    export class Smartlabel extends Text {
    constructor(elValues: Text){
      super(elValues)
   }
   }

    export class Spline extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class Stepfunction extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }

    export class Tangent extends Line {
    constructor(elValues: Line){
      super(elValues)
   }
   }

    export class Tapemeasure extends Segment {
    constructor(elValues: Segment){
      super(elValues)
   }
   }

    export class Tracecurve extends GeometryElement {
    constructor(elValues: GeometryElement){
      super(elValues)
   }
   }}