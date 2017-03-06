
//OUTPUT_SHRINK = 30;
USE_TABLE = true;

// settings
Render = { };
function initSettings ()
{
    Render = {
        resolution : { x : 200, y : 150 },
        size       : { x :   2, y :   2 },
        camerapos  : { x :   5, y :   5, z :   5 },
        cameradir  : { x :  -1, y :  -1, z :  -1 },
        cameraup   : { x :   0, y :   1, z :   0 },
        cameradims : { w :   2, h : 1.5 },
        bgcolor    : { r : 0.0, g : 0.0, b : 0.0 },
        lightpos   : { x : -50, y :  50, z :  50 },
        lightcolor : { r : 1.0, g : 1.0, b : 1.0 },
        ambient    : { r : 0.1, g : 0.1, b : 0.1 }
    };
    if ( typeof( OUTPUT_SHRINK ) != 'undefined' ) {
        var oldx = Render.resolution.x;
        var oldy = Render.resolution.y;
        Render.resolution = { x : OUTPUT_SHRINK,
                              y : ( oldx*OUTPUT_SHRINK/oldy ) | 0 };
        var newx = Render.resolution.x;
        var newy = Render.resolution.y;
        Render.size       = { x : Render.size.x*( oldx/newx ) | 0,
                              y : Render.size.y*( oldy/newy ) | 0 };
    }
    if ( ( typeof( USE_TABLE ) != 'undefined' ) && USE_TABLE ) {
        document.getElementById( 'output' ).style.display = 'block';
        document.getElementById( 'canvas1' ).style.display = 'none';
    } else {
        document.getElementById( 'output' ).style.display = 'none';
        document.getElementById( 'canvas1' ).style.display = 'block';
    }
}

// utilities
function hexdigit ( d )
{
    return '0123456789abcdef'[d];
}
function int2hex ( i )
{
    if ( typeof( i ) != 'number' ) i = 0;
    i = Math.round( i );
    if ( i < 0 ) i = 0;
    if ( i > 255 ) i = 255;
    return hexdigit( ( i / 16 ) | 0 ) + hexdigit( i % 16 );
}

// creating output HTML structures
function colorCell ( r, g, b )
{
    var code = int2hex( r*256 ) + int2hex( g*256 ) + int2hex( b*256 );
    return '<td bgcolor="#' + code + '"'
         + '    width=' + Render.size.x
         + '    height=' + Render.size.y + '> </td>';
}
function colorTable ( data )
{
    var result = '<table border=0 cellpadding=0 cellspacing=0>';
    for ( var i = 0 ; i < data.length ; i++ ) {
        result += '<tr>';
        for ( var j = 0 ; j < data[i].length ; j++ )
            result += colorCell.apply( null, data[i][j] );
        result += '<tr>';
    }
    result += '</table>';
    return result;
}

// filling output elements
function setPixel ( imageData, x, y, r, g, b, a )
{
    var index = ( x + y*imageData.width ) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}
function setOutput ( table )
{
    if ( ( typeof( USE_TABLE ) != 'undefined' ) && USE_TABLE ) {
        var output = document.getElementById( 'output' );
        output.innerHTML = colorTable( table );
    } else {
        var output = document.getElementById( 'canvas1' );
        var w = Render.resolution.x;
        var h = Render.resolution.y;
        output.style.width = w + 'px';
        output.style.height = h + 'px';
        var context = output.getContext( '2d' );
        var imageData = context.createImageData( w, h );
        for ( var i = 0 ; i < table.length ; i++ ) {
            for ( var j = 0 ; j < table[i].length ; j++ ) {
                var r = ( table[i][j][0] * 256 ) | 0;
                var g = ( table[i][j][1] * 256 ) | 0;
                var b = ( table[i][j][2] * 256 ) | 0;
                setPixel( imageData, j, i, r, g, b, 255 );
            }
        }
        context.putImageData( imageData, 0, 0 );
    }
}
function blankTable ()
{
    var rx = Render.resolution.x;
    var ry = Render.resolution.y;
    var blank = [ Render.bgcolor.r, Render.bgcolor.g, Render.bgcolor.b ];
    var result = [];
    for ( var i = 0 ; i < ry ; i++ ) {
        var nextrow = [];
        for ( var j = 0 ; j < rx ; j++ )
            nextrow.push( blank.slice() );
        result.push( nextrow );
    }
    return result;
}

// initialize input and output elements when page has finished loading
function setup ()
{
    initSettings();
    clearInput();
    setOutput( blankTable() );
};

// initializing, reading, and processing input in page elements
function getInput ()
{
    return document.getElementById( 'input' ).value;
}
function clearInput ()
{
    document.getElementById( 'input' ).value =
        '\nlight_source {\n\tlocation <0,50,100>\n\tcolor rgb <1,1,1>\n}\n'
      + '\nbackground { color rgb <0.5,0.5,0.5> }\n'
      + '\nglobal_settings { ambient color rgb <0.3,0.3,0.3> }\n'
      + '\nplane {\n\t<0,0,0>, <0,1,0>\n\tpigment { color rgb <1,0,0> }\n'
      + '\tshininess { 2 }\n}\n'
      + '\nbox { <0,0,0>, <5,3,-4> pigment { color rgb <0,0,1> } }\n'
      + '\nsphere {\n\t<-5,0,2>, 4\n\tpigment { color rgb <0,1,0> }\n'
      + '\tshininess { 20 }\n}\n'
      + '\nintersection {\n\tsphere { <0,-1,0>,5 '
      + 'pigment { color rgb <1,0.5,0> } }\n'
      + '\tsphere { <0,5,0>,5 '
      + 'pigment { color rgb <1,0.5,0> } }\n'
      + '\tbox { <-2,-1,-2>, <2,5,2> '
      + 'pigment { color rgb <1,0.5,0> } }\n'
      + '\tscale <0.9,0.9,0.9> translate <1,-0.5,1>\n}\n';
}
function parseInput ( featureLevel )
{
    // get input
    var text = getInput();
    // tokenize
    var tokens = [];
    var open = /([a-zA-Z_]+)\s*\{/;
    var close = /\}/;
    do {
        var nexto = open.exec( text );
        var nextc = close.exec( text );
        if ( nexto
          && ( ( nextc && ( nexto.index < nextc.index ) )
            || !nextc ) ) {
            tokens.push( { type : '...',
                           text : text.substr( 0, nexto.index ) } );
            tokens.push( { type : '{', text : nexto[1] } );
            text = text.substr( nexto.index + nexto[0].length );
        } else if ( nextc
                 && ( ( nexto && ( nextc.index < nexto.index ) )
                   || !nexto ) ) {
            tokens.push( { type : '...',
                           text : text.substr( 0, nextc.index ) } );
            tokens.push( { type : '}', text : '}' } );
            text = text.substr( nextc.index + nextc[0].length );
        } else {
            tokens.push( { type : '...', text : text } );
            text = '';
        }
    } while ( text );
    // parse
    var result = new SceneNode( 'union' );
    var current = result;
    for ( var i = 0 ; i < tokens.length ; i++ ) {
        if ( !( current instanceof SceneNode ) )
            throw 'Error: current became this: ' + current;
        if ( tokens[i].type == '{' ) {
            var nsn = new SceneNode( tokens[i].text );
            current.addChild( nsn );
            current = nsn;
        } else if ( tokens[i].type == '}' ) {
            current.setup( featureLevel );
            current = current.parent;
        } else if ( tokens[i].type == '...' ) {
            current.data += tokens[i].text;
        } // else unknown type, so ignore
    }
    // done
    return result;
}

// get feature level at which this render should happen
function getFeatureLevel ()
{
    return parseInt( document.getElementById( 'features' ).value );
}

// core function
var GOING = false;
function render ()
{
    if ( GOING ) {
        // if the render is already happening, jump to the end of it,
        // to make it stop.
        i = Render.resolution.x + 2;
        return;
    } else {
        GOING = true;
    }
    // restore render settings to defaults
    initSettings();
    // fetch input: feature level as integer, scene as a union-type SceneNode
    var level = getFeatureLevel();
    var scene = parseInput( level );
    // compute all necessary camera vectors
    var src = Render.camerapos;
    var centerdir = Render.cameradir;
    var up = Render.cameraup;
    var right = cross( centerdir, up );
    up = cross( right, centerdir );
    centerdir = unit( centerdir );
    var fullh = scalar( Render.cameradims.w, unit( right ) );
    var fullv = scalar( -Render.cameradims.h, unit( up ) );
    var baseh = scalar( -1/2, fullh );
    var basev = scalar( -1/2, fullv );
    var steph = scalar( 1/Render.resolution.x, fullh );
    var stepv = scalar( 1/Render.resolution.y, fullv );
    // prepare empty table of black pixels
    var output = blankTable();
    // loop through all pixels, raytracing
    var total = Render.resolution.x*Render.resolution.y;
    var i = 0;
    var oldButton = document.getElementById( 'button' ).value;
    function oneRenderLine ()
    {
        if ( i == Render.resolution.x ) {
            document.getElementById( 'button' ).value =
                'Putting image into page (slow)...';
            i++;
            setTimeout( oneRenderLine, 0 );
        } else if ( i == Render.resolution.x + 1 ) {
            setOutput( output );
            document.getElementById( 'button' ).value = oldButton;
            i++;
            setTimeout( oneRenderLine, 0 );
        }
        if ( i >= Render.resolution.x ) {
            GOING = false;
            return;
        }
        for ( var j = 0 ; j < Render.resolution.y ; j++ ) {
            var pct = ((i*Render.resolution.y)+j)*100.0/total;
            document.getElementById( 'button' ).value =
                'Rendering image (' + ( pct | 0 ) + '%)...';
            var dir = centerdir;
            dir = add( add( dir, baseh ), scalar( i+0.5, steph ) );
            dir = add( add( dir, basev ), scalar( j+0.5, stepv ) );
            var intdata = scene.findRayIntersection( src, dir );
            if ( intdata == null )
                continue;
            if ( level == FEATURE_LEVEL_SILHOUETTES ) {
                output[j][i] = [ 1, 1, 1 ];
            } else {
                var r = intdata.sobj.color[0] * Render.lightcolor.r;
                var g = intdata.sobj.color[1] * Render.lightcolor.g;
                var b = intdata.sobj.color[2] * Render.lightcolor.b;
                if ( level >= FEATURE_LEVEL_SHADING ) {
                    var N = unit( intdata.snorm );
                    var P = add( src, scalar( intdata.start, dir ) );
                    var L = unit( add( Render.lightpos, scalar( -1, P ) ) );
                    var cos = dot( N, L );
                    if ( cos < 0 )
                        cos = 0;
                    r = r * ( cos + Render.ambient.r );
                    g = g * ( cos + Render.ambient.g );
                    b = b * ( cos + Render.ambient.b );
                    if ( ( level >= FEATURE_LEVEL_SPECULAR )
                      && ( intdata.sobj.shininess != 0 ) ) {
                        var C = unit( scalar( -1, dir ) );
                        var avg = unit( scalar( 1/2, add( C, L ) ) );
                        cos = dot( avg, N );
                        if ( cos > 0 ) {
                            cos = Math.pow( cos, intdata.sobj.shininess );
                            r += Render.lightcolor.r * cos;
                            g += Render.lightcolor.g * cos;
                            b += Render.lightcolor.b * cos;
                        }
                    }
                }
                output[j][i] = [ r, g, b ];
            }
        }
        i++;
        setTimeout( oneRenderLine, 0 );
    }
    oneRenderLine();
}

