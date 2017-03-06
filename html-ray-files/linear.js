
function vredirect ( f )
{
    var newargs = [];
    for ( var i = 1 ; i < arguments.length ; i++ ) {
        if ( arguments[i] instanceof Array ) {
            newargs.push( arguments[i][0] );
            newargs.push( arguments[i][1] );
            newargs.push( arguments[i][2] );
        } else if ( arguments[i] instanceof Object ) {
            newargs.push( arguments[i].x );
            newargs.push( arguments[i].y );
            newargs.push( arguments[i].z );
        } else if ( typeof( arguments[i] ) != 'undefined' ) {
            newargs.push( arguments[i] );
        }
    }
    return f.apply( null, newargs );
}
function add ( x1, y1, z1, x2, y2, z2 )
{
    return vredirect(
        function ( x1, y1, z1, x2, y2, z2 ) {
            return [ x1+x2, y1+y2, z1+z2 ];
        },
        x1, y1, z1, x2, y2, z2 );
}
function scalar ( s, x, y, z )
{
    return vredirect(
        function ( s, x, y, z ) { return [ s*x, s*y, s*z ]; },
        s, x, y, z );
}
function dot ( x1, y1, z1, x2, y2, z2 )
{
    return vredirect(
        function ( x1, y1, z1, x2, y2, z2 ) { return x1*x2 + y1*y2 + z1*z2; },
        x1, y1, z1, x2, y2, z2 );
}
function cross ( x1, y1, z1, x2, y2, z2 )
{
    return vredirect(
        function ( x1, y1, z1, x2, y2, z2 ) { return [ y1*z2-y2*z1,
                                                       x2*z1-x1*z2,
                                                       x1*y2-x2*y1 ]; },
        x1, y1, z1, x2, y2, z2 );
}
function length ( x, y, z )
{
    return vredirect(
        function ( x, y, z ) { return Math.sqrt( x*x + y*y + z*z ); },
        x, y, z );
}
function unit ( x, y, z )
{
    return vredirect(
        function ( x, y, z ) {
            var L = length( x, y, z );
            return ( L == 0 ) ? [ 0, 0, 0 ] : scalar( 1/L, x, y, z );
        },
        x, y, z );
}

