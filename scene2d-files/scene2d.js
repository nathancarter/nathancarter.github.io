
/*
 * Thanks to Larry Riddle for helpful improvements to this file,
 * December 2017.
 */

var winsize = { w : 1000, h : 500 };

var col1 = { x : 10, y : 20, w : 100, h : 40 };
var col2 = { x : 120, y : 20, w : 360, h : 40 };
var sm = col2.h/2;

var addButton;
var axes;
var editor;
/*
 * The following array is rather complicated and needs documentation.
 * Each entry in the array represents a row in the table below the axes.
 * The entries will have the following structure, as JS objects.
 * {
 *     element1   : the Crafty element that sits in column1 of that row
 *                  and contains the drop-down selector of shape names,
 *     select     : the HTML element that is the drop-down selector of
 *                  shape names (so select.value is the shape name),
 *     shape      : the Crafty image element showing the actual shape
 *                  at the top of the stage over the axes,
 *     addButton  : the + button to the left of all transformations in that row,
 *     transforms : an array of Crafty elements in order from left to right in
 *                  the row (thus the rightmost ones taking place first) that
 *                  sit in the "Transformations" column of the row to show the
 *                  names of the transformations to be applied to the shape,
 *     // more to come
 * }
 * Each transform in the transforms array also has these properties:
 * .type == a string containing the letter T, S, or R
 * .xfx == the x parameter of a T or S transform
 * .xfy == the y parameter of a T or S transform
 * .xft == the theta parameter of an R transform
 * .row == the index of the row in which the transform sits
 * .idx == the index of the transform within that row
 */
var rows = [];

window.onload = function () {
    //start crafty
    Crafty.init(winsize.w,winsize.h).canvas.init();

    //define the loading scene and the main scene
    Crafty.scene("loading", function () {
        //black background with some loading text
        Crafty.background("#888");
        Crafty.e("2D, DOM, Text").attr({ w: 100, h: 20, x: 150, y: 120 })
              .text("Loading")
              .css({ "text-align": "center" });
        Crafty.load( [ "../scene2d-files/img/axes.png" ], function () {
            Crafty.scene("main");
        });
    });
    Crafty.scene("main", function () {
        //ensure we're centered within our parent
        var element = document.getElementById( 'cr-stage' );
        var desiredWidth = element.offsetWidth;
        var actualWidth = element.parentNode.offsetWidth;
        console.log( 'desired', desiredWidth, 'actual', actualWidth, 'adjust by', (actualWidth-desiredWidth)/2 );
        element.style.marginLeft = ( ( actualWidth - desiredWidth ) / 2 ) + 'px';

        Crafty.background("#FFF");
        axes = Crafty.e("2D, DOM, Image").image( "../scene2d-files/img/axes.png" );
        axes.attr({ x:(3*winsize.w/2-axes.w)/2, y:(winsize.h-axes.h)/2, z:-1 });
        Crafty.e("2D, DOM, Color")
              .attr({ w:winsize.w/2, h:winsize.h, x:0, y:0, z:-1 })
              .color( "#EEE" );
        Crafty.e("2D, DOM, Text")
              .attr({ w:col1.w, h:col1.h, x:col1.x, y:col1.y-2, z:2 })
              .css({ "text-align" : "center",
                     "border-bottom" : "solid 2px black",
                     "line-height" : col1.h+"px" })
              .text( "Shape" );
        Crafty.e("2D, DOM, Text")
              .attr({ w:col2.w, h:col2.h, x:col2.x, y:col2.y-2, z:2 })
              .css({ "text-align" : "center",
                     "border-bottom" : "solid 2px black",
                     "line-height" : col1.h+"px" })
              .text( "Transformations" );
        addButton = Crafty.e("2D, DOM, Text, Mouse")
              .attr({ w:sm, h:sm, x:col1.x+(col1.w-sm)/2,
                      y:col1.y+col1.h+(col1.h-sm)/2, z:1 })
              .css({ "background-color" : "#DFD",
                     "text-align" : "center", border : "solid 1px #0F0",
                     "line-height" : sm+"px" })
              .text( "+" )
              .bind( "Click", function ( e ) { addShape(); });
        Crafty.c( "Shape", {
            init : function ()
            {
                this.bind( "Draw", function ( e ) {
                    var i = this.rowIndex;
                    drawShape( rows[i].select.value, transformPipeline( i ) );
                });
            }
        });
        editor = Crafty.e("2D, DOM" )
                       .attr({ x:0, y:0, w:col2.w/2, h:150, z:10 })
                       .css({ "background-color" : "#DDF",
                              "font-size": "14px",
                              "text-align" : "center",
                              border : "solid 1px #00F" });
        editor._element.innerHTML =
            "<input type='radio' name='tsr' value='T' id='editT'"
          + "       onchange='updateFromEditor();'>T "
          + "<input type='radio' name='tsr' value='S' id='editS'"
          + "       onchange='updateFromEditor();'>S "
          + "<input type='radio' name='tsr' value='R' id='editR'"
          + "       onchange='updateFromEditor();'>R <br>&nbsp;"
          + "<span id='xy'>"
          + "x: <input type='text' name='x' id='editx' size='10'"
          + "          onkeyup='updateFromEditor();'"
          + "          onchange='updateFromEditor();'><br>"
          + "y: <input type='text' name='y' id='edity' size='10'"
          + "          onkeyup='updateFromEditor();'"
          + "          onchange='updateFromEditor();'></span><br>"
          + "<span id='angle'>"
          + "angle: <input type='text' name='t' id='editt' size='8'"
          + "              onkeyup='updateFromEditor();'"
          + "              onchange='updateFromEditor();'></span><br>"
          + "<input type='button' value='Delete'"
          + "       onclick='deleteTransform();'>"
          + "<input type='button' value='Close'"
          + "       onclick='closeEditor();'>";
        editor._edit_reset = function ()
        {
            document.getElementById( 'editT' ).checked = true;
            document.getElementById( 'editR' ).checked = false;
            document.getElementById( 'editS' ).checked = false;
            document.getElementById( 'editx' ).value = "0";
            document.getElementById( 'edity' ).value = "0";
            document.getElementById( 'editt' ).value = "0";
        };
        editor._edit_readFrom = function ( transform )
        {
            document.getElementById( 'editT' ).checked = ( transform.type == 'T' );
            document.getElementById( 'editR' ).checked = ( transform.type == 'R' );
            document.getElementById( 'editS' ).checked = ( transform.type == 'S' );
            document.getElementById( 'editx' ).value = transform.xfx;
            document.getElementById( 'edity' ).value = transform.xfy;
            document.getElementById( 'editt' ).value = transform.xft;
            if ( transform.type == 'R' ) {
                document.getElementById( 'xy' ).style.display = 'none';
                document.getElementById( 'angle' ).style.display = 'block';
            } else {
                document.getElementById( 'xy' ).style.display = 'block';
                document.getElementById( 'angle' ).style.display = 'none';
            }
        };
        editor._edit_writeTo = function ( transform )
        {
            if ( document.getElementById( 'editT' ).checked )
                transform.type = 'T';
            if ( document.getElementById( 'editR' ).checked )
                transform.type = 'R';
            if ( document.getElementById( 'editS' ).checked )
                transform.type = 'S';
            transform.xfx = Math.round( parseFloat( document.getElementById( 'editx' ).value ) * 100 ) / 100;
            transform.xfy = Math.round( parseFloat( document.getElementById( 'edity' ).value ) * 100 ) / 100;
            transform.xft = Math.round( parseFloat( document.getElementById( 'editt' ).value ) * 100 ) / 100;
            if ( transform.type == 'R' ) {
                transform._element.innerHTML =
                    "<i>R</i><sub>"+transform.xft+"&deg;</sub>";
                document.getElementById( 'xy' ).style.display = 'none';
                document.getElementById( 'angle' ).style.display = 'block';
            } else {
                transform._element.innerHTML =
                    "<i>"+transform.type+"</i><sub>"
                         +transform.xfx+","+transform.xfy+"</sub>";
                document.getElementById( 'xy' ).style.display = 'block';
                document.getElementById( 'angle' ).style.display = 'none';
            }
        };
        editor.visible = false;
    });

    //automatically play the loading scene
    Crafty.scene("loading");

};

function addShape ()
{
    var index = rows.length;
    var row = { };
    row.element1 = Crafty.e("2D, DOM")
                         .attr({ w:col1.w, h:col1.h,
                                 x:col1.x, y:col1.y+col1.h*(index+1) })
                         .css({ "text-align": "center",
                                "line-height" : col1.h+"px" });
    row.element1._element.innerHTML = "<select id='shapeSelect"+index+"' "
                                    + " onchange='changeShape(this);'>"
                                    + "<option>"
                                    + shapes.join( "</option><option>" )
                                    + "</option>"
                                    + "<option>(remove this)</option>"
                                    + "</select>";
    row.select = document.getElementById( "shapeSelect"+index );
    row.shape = Crafty.e("2D, DOM, Shape");
    row.shape.rowIndex = index;
    row.shape.attr({ x:0, y:-row.shape.h, z:5 });
    row.owrapper = Crafty.e("2D, DOM");
    row.owrapper.attach( row.shape );
    row.owrapper.attr({ x:winsize.w/2-3, y:winsize.w/2+3 });
    row.addButton = Crafty.e("2D, DOM, Text, Mouse")
                          .attr({ x: col2.x, y:addButton.y, w:sm, h:sm-2 })
                          .css({ "text-align" : "center",
                                 "line-height" : (sm-2)+"px",
                                 "background-color" : "#DFD",
                                 border : "solid 1px #0F0" })
                          .text( "+" )
                          .bind( "Click",
                                 function ( e ) { addTransform( row.shape.rowIndex ); });
    row.transforms = [];
    row.wrappers = [];
    addButton.y += col1.h;
    rows.push( row );
}

function removeShape ( index )
{
    var row = rows[index];
    row.element1.destroy();
    row.shape.destroy();
    row.addButton.destroy();
    row.owrapper.destroy();
    for ( var j = 0 ; j < row.transforms.length ; j++ )
        row.transforms[j].destroy();
    for ( var j = 0 ; j < row.wrappers.length ; j++ )
        row.wrappers[j].destroy();
    for ( var j = index + 1 ; j < rows.length ; j++ ) {
        rows[j].element1.y -= col1.h;
        rows[j].addButton.y -= col1.h;
        for ( var k = 0 ; k < rows[j].transforms.length ; k++ )
            rows[j].transforms[k].y -= col1.h;
        rows[j].select.id = "shapeSelect"+(j-1);
        rows[j].shape.rowIndex = j-1;
    }
    addButton.y -= col1.h;
    rows = rows.slice( 0, index ).concat( rows.slice( index+1 ) );
    refresh();
}

function changeShape ( select )
{
    var index = parseInt(select.id.substr(11));
    var name = select.value;
    if ( name == '(remove this)' ) {
        removeShape( index );
        return;
    }
    refresh();
}

function refresh ()
{
    for ( var i = 0 ; i < rows.length ; i++ ) {
        var ts = rows[i].transforms;
        var totlen = 0;
        for ( var j = 0 ; j < ts.length ; j++ )
            totlen += ts[j].w;
        var left = col2.x + sm + (col2.w-sm)/2 - totlen/2;
        totlen = 0;
        for ( var j = 0 ; j < ts.length ; j++ ) {
            ts[j].x = left + totlen;
            totlen += ts[j].w;
        }
        rows[i].shape.trigger( "Change" );
    }
    Crafty.DrawManager.drawAll();
}

function addTransform ( index )
{
    var clicked = rows[index].addButton;
    // how wide is the transformation row now, and is it too wide to add more?
    var totlen = 0;
    for ( var i = 0 ; i < rows[index].transforms.length ; i++ )
        totlen += rows[index].transforms[i].w;
    if ( ( rows[index].transforms.length > 0 )
      && ( totlen + sm + rows[index].transforms[0].w > col2.w ) )
        return;
    // it's not too wide, so add another
    var tidx = rows[index].transforms.length;
    var T = Crafty.e("2D, DOM, Mouse")
                  .attr({ w:col2.h+43, h:col2.h,
                          x:col2.x+col2.w-totlen-col2.h,
                          y:rows[index].element1.y })
                  .css({ "text-align": "center",
                         "line-height" : col2.h+"px" })
                  .bind( "Click",
                         function ( e ) { editTransform( this ); });
    T._element.innerHTML = "<i>T</i><sub>1,2</sub>";
    T.type = 'T';
    T.xfx = 1;
    T.xfy = 2;
    T.xft = 45;
    T.row = index;
    T.idx = 0;
    rows[index].transforms.unshift( T );
    for ( var i = 1 ; i < rows[index].transforms.length ; i++ )
        rows[index].transforms[i].idx++;
    refresh();
}

function removeTransform ( rowIndex, tIndex )
{
    var row = rows[rowIndex];
    var w = row.transforms[tIndex].w;
    row.transforms[tIndex].destroy();
    row.transforms = row.transforms.slice( 0, tIndex )
                        .concat( row.transforms.slice( tIndex + 1 ) );
    for ( var i = 0 ; i < row.transforms.length ; i++ )
        if ( i < tIndex )
            row.transforms[i].x += w;
        else
            row.transforms[i].idx--;
    refresh();
}

function transformFunction ( transform )
{
    var a = transform.xfx;
    var b = transform.xfy;
    var s = Math.sin(-transform.xft*3.14159/180);
    var c = Math.cos(-transform.xft*3.14159/180);
    return ( transform.type == 'T' ) ? function ( x, y ) { return [x+a*22,y+b*-22]; } :
           ( transform.type == 'S' ) ? function ( x, y ) { return [x*a,y*b]; } :
           ( transform.type == 'R' ) ? function ( x, y ) { return [x*c-y*s,x*s+y*c]; } :
                                       function ( x, y ) { return [x,y]; };
}

function compose ( tf1, tf2 )
{
    return function ( x, y ) {
        var intermediate = tf2( x, y );
        return tf1( intermediate[0], intermediate[1] );
    };
}

function transformPipeline ( index )
{
    var toSize = function ( x, y ) { return [x*25,y*25]; };
    var toOrigin = function ( x, y ) { return [x+747,y+251]; };
    var result = toSize;
    var list = rows[index].transforms;
    for ( var i = list.length - 1 ; i >= 0 ; i-- )
        result = compose( transformFunction( list[i] ), result );
    return compose( toOrigin, result );
}

var editingThis = null;
function editTransform ( transform )
{
    var wasET = editingThis;
    closeEditor();
    if ( wasET == transform )
        return;
    editingThis = transform;
    editor._edit_readFrom( editingThis );
    editor.x = col2.x+col2.w; // editingThis.x+editingThis.w;
    editor.y = editingThis.y;
    if ( editor.y+editor.h > winsize.h )
        editor.y -= editor.y+editor.h - winsize.h;
    editor.visible = true;
    transform.css({ "background-color" : "#DDF", border : "solid 1px #00F" });
}

function updateFromEditor ()
{
    editor._edit_writeTo( editingThis );
    refresh();
}

function deleteTransform ()
{
    removeTransform( editingThis.row, editingThis.idx );
    closeEditor();
}

function closeEditor ()
{
    if ( editingThis == null )
        return;
    editor.visible = false;
    editingThis.css({ "background-color" : "", border : "" });
    editingThis = null;
}

