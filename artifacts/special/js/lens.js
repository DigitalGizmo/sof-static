/**::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
@license DigitalGizmo Magic Lens, Copyright DigitalGizmo, 2018. All rights reserved. You may
use this file on private and public websites, for personal and commercial purposes, with or without modifications, so long as this
notice is included. Redistribution via other means is not permitted without prior permission.  www.digitalgizmo.com.
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/

/* Example usage in HTML:
<div id="lens-container"><!-- will be filled by lens-d3.js --></div> 

<script src="js/lens-d3.js" type="text/javascript"></script>
<script type="text/javascript">
  L.showLens("lens-container", "images/indenture-lens-image.jpg", "images/indenture-lens-text.jpg",
    900, 1400, "lensW=400&lensH=100&startX=400&startY=100");
</script>
*/

// Function called with params from HTML
function showLens (containerID, baseImagePath, revealedImagePath, width, height, optionalParams) { 
    var lensW = 400, lensH = 150;
    var startX = 50, startY = 25; 
    var yMovement = true;
    var newX = 10;
    var newY = 10;
    var clippy;
    var border;

    // Set lens size proportionally for default -- will be overridden if param is sent.
    lensW = width * .5;
    lensH = lensW * .4;

    // Process optional parameters.
    if (typeof optionalParams !== 'undefined') {
        if (typeof optionalParams === 'string') {
            parameters = parseParameters(optionalParams);
            // console.log(' --- parameters - startX: ' + parameters["startX"]);
            if ( typeof(parameters["lensW"]) !== 'undefined'){ 
                // console.log(' --- lensW not undefined (aka defined): ' + parameters["lensW"]);
                lensW = parameters["lensW"]; 
            }
            if (typeof(parameters["lensH"]) !== 'undefined'){ lensH = parameters["lensH"]; }
            if (typeof(parameters["startX"]) !== 'undefined'){ startX = parameters["startX"]; }
            if (typeof(parameters["startY"]) !== 'undefined'){ startY = parameters["startY"]; }
            if (typeof(parameters["fullHeight"]) !== 'undefined'){ 
                startY = 0;
                lensH = height;
                yMovement = false; 
            }
        }
    }

    // drag border and clip with it
    var drag = d3.drag()
        .on("drag", function() {
            clippy = d3.select('#clip rect');
            border = d3.select('#lens-border');
            // Figure x bumpers and move
            newX = parseFloat(clippy.attr('x')) + d3.event.dx;
            if (newX < 1){
                newX = 1;
            } else if (newX > width - lensW - 1) {
                newX = width - lensW - 1;
            }
            clippy.attr('x', + newX);
            border.attr('x', + + newX);
            // Y movement. Y is disables for sliding vertical bar.       
            if (yMovement) { 
                newY = parseFloat(clippy.attr('y')) + d3.event.dy;
                if (newY < 1){
                    newY = 1;
                } else if (newY > height - lensH - 1) {
                    newY = height - lensH - 1;
                }  
                clippy.attr('y', + newY); 
                border.attr('y', + newY);
            }         
        });

    // Append svg to container
    // (Don't know what the padding bottom was for.)
    var lensSvg = d3.select("#" + containerID)
            // .attr(
            //     "style",
            //     "padding-bottom: " + Math.ceil(height * 100 / width) + "%"
            // )
            .append("svg")
            .attr("viewBox", "0 0 " + width + " " + height);

    // append g and foreground image
    // lensSvg.append("svg:g")
    lensSvg
        // .attr("transform","translate(50,50)")
        .append("svg:image")
        .attr("x", 0)
        .attr("y", 0)
        .attr("xlink:href", baseImagePath)
        .attr("width", width)
        .attr("height", height)
        ;

    // append background image to existing g
    // d3.select("svg g").append("svg:image")
    lensSvg.append("svg:image")
        .attr("id", "lens-image")
        .attr("x", 0)
        .attr("y", 0)
        .attr("xlink:href", revealedImagePath)
        .attr("width", width)
        .attr("height", height)
        ;

    // add border 
    // d3.select("svg g").append("svg:rect")
    lensSvg.append("svg:rect")
        .attr("id", "lens-border")
        .attr('x', startX)
        .attr('y', startY)
        .attr('width', lensW)
        .attr('height', lensH)
        .attr('rx', 15)
        .attr('ry', 15)
        .style("fill-opacity", 0)
        .style("stroke", "#7d7664")
        .style("stroke-width", 2)
        .style('cursor', 'move')
        .call(drag);
        ;

    // add lens clip
    // var clip = d3.select("svg g").append("svg:clipPath")
    lensSvg.append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr('x', startX)
        .attr('y', startY)
        .attr('rx', 15)
        .attr('ry', 15)
        .attr('width', lensW)
        .attr('height', lensH)
        ;

    // add lens and drag to foreground image
    d3.select("#lens-image")
        .attr("clip-path", function(d,i) { return "url(#clip)"; });
    
} // end showLens

function parseParameters(params) { 
    var parsedParams = [];
    if (typeof params === 'object') {
        parsedParams = params;
    } else if (typeof params === 'string') {
        var splitParams = params.split('&');
        for (var i = 0, j = splitParams.length; i < j; i++) {
            var nameValuePair = splitParams[i];
            // console.log(' --- in parseParameters, nameValuePair ' + splitParams[i]);
            var sep = nameValuePair.indexOf('=');
            if (sep > 0) {
                var pName = nameValuePair.substring(0, sep)
                var pValue = nameValuePair.substring(sep + 1)
                parsedParams[pName] = pValue;
            }
        }
    }
    return parsedParams;
}
