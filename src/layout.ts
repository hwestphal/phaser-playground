// layout is jquery and flexbox
// import * as $ from "jquery";











// js

//  $(".panel-left").resizable({
//     handleSelector: ".splitter",
//     resizeHeight: false
//   });

//   $(".panel-top").resizable({
//     handleSelector: ".splitter-horizontal",
//     resizeWidth: false
//   });





//////////////////////css
// html,
// body {
//   height: 100%;
//   font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
//   padding: 0;
//   margin: 0;
//   overflow: auto;
// }

// .page-container {
//   margin: 20px;
// }


// /* horizontal panel*/

// .panel-container {
//     display: flex;
//     flex-direction: row;
//     border: 1px solid silver;
//     overflow: hidden;

//     /* avoid browser level touch actions */
//     xtouch-action: none;
//   }

//   .panel-left {
//     flex: 0 0 auto;
//     /* only manually resize */
//     padding: 10px;
//     width: 300px;
//     min-height: 200px;
//     min-width: 150px;
//     white-space: nowrap;
//     background: #838383;
//     color: white;
//   }

//   .splitter {
//     flex: 0 0 auto;
//     width: 18px;
//     background: url(https://raw.githubusercontent.com/RickStrahl/jquery-resizable/master/assets/vsizegrip.png) center center no-repeat #535353;
//     min-height: 200px;
//     cursor: col-resize;
//   }

//   .panel-right {
//     flex: 1 1 auto;
//     /* resizable */
//     padding: 10px;
//     width: 100%;
//     min-height: 200px;
//     min-width: 200px;
//     background: #eee;
//   }


//   /* vertical panel */

//   .panel-container-vertical {
//     display: flex;
//     flex-direction: column;
//     height: 500px;
//     border: 1px solid silver;
//     overflow: hidden;
//   }

//   .panel-top {
//     flex: 0 0 auto;
//     /* only manually resize */
//     padding: 10px;
//     height: 150px;
//     width: 100%;
//     white-space: nowrap;
//     background: #838383;
//     color: white;
//   }

//   .splitter-horizontal {
//     flex: 0 0 auto;
//     height: 18px;
//     background: url(https://raw.githubusercontent.com/RickStrahl/jquery-resizable/master/assets/hsizegrip.png) center center no-repeat #535353;
//     cursor: row-resize;
//   }

//   .panel-bottom {
//     flex: 1 1 auto;
//     /* resizable */
//     padding: 10px;
//     min-height: 200px;
//     background: #eee;
//   }

//   label {
//     font-size: 1.2em;
//     display: block;
//     font-weight: bold;
//     margin: 30px 0 10px;
//   }

//   pre {
//     margin: 20px;
//     padding: 10px;
//     background: #eee;
//     border: 1px solid silver;
//     border-radius: 4px;
//     overflow: auto;
//   }






/*
<html>
<head>
    <title>Simple Split Panels - jquery-resizable</title>
    <meta charset="utf-8"/>
</head>
<body style="">
    <div class="page-container">

        <h1>
           jquery-resizable - A simple splitter panel
        </h1>
        <hr />

        <p>
            Simple example that demonstrates how to create slidable two-pane layouts <a href="http://caniuse.com/#search=flexbox">using FlexBox</a> and the resizable plug-in.
            Note that Flexbox is not required, but used here to keep the layout simple.
        </p>

        <label>Horizontal Splitter Panes:</label>

        <div class="panel-container">

            <div class="panel-left">
                left panel
            </div>

            <div class="splitter">
            </div>

            <div class="panel-right">
        <label>Vertical Splitter Panes:</label>
        <div class="panel-container-vertical">

            <div class="panel-top">
                top panel
            </div>

            <div class="splitter-horizontal">
            </div>

            <div class="panel-bottom">
                bottom panel
            </div>
        </div>
            </div>
        </div>




        <hr />

        <p>
            This example creates two resizables for the horizontal and vertical splitter panes:
        </p>
<pre>
&lt;script src=&quot;//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;../src/jquery-resizable.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
    $(&quot;.panel-left&quot;).resizable({
        handleSelector: &quot;.splitter&quot;,
        resizeHeight: false
    });
    $(&quot;.panel-top&quot;).resizable({
        handleSelector: &quot;.splitter-horizontal&quot;,
        resizeWidth: false
    });
&lt;/script&gt;
</pre>
    </div>


</body>
</html>
*/