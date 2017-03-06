
FEATURE_LEVEL_SILHOUETTES = 1;
FEATURE_LEVEL_COLORS      = 2;
FEATURE_LEVEL_SHADING     = 3;
FEATURE_LEVEL_SPECULAR    = 4;

var flre = '(-?[0-9]+\\.?[0-9]*|-?\\.[0-9]+)';
var cre = '\\s*,\\s*';
var vre = '<' + flre + cre + flre + cre + flre + '>';

function applyXfm ( xfm, P, v )
{
    // applies the transformation xfm to the line P+tv
    // yielding a new P' and v' for the transformed line P'+tv',
    // which are returned as a pair [ P', v' ].
    var type = xfm[0];
    var x = xfm[1];
    var y = xfm[2];
    var z = xfm[3];
    if ( type == 'translate' ) {
        return [ { x : P.x+x, y : P.y+y, z : P.z+z }, v ];
    } else if ( type == 'rotate' ) {
        var c1 = Math.cos( x*Math.PI/180 );
        var s1 = Math.sin( x*Math.PI/180 );
        var c2 = Math.cos( y*Math.PI/180 );
        var s2 = Math.sin( y*Math.PI/180 );
        var c3 = Math.cos( z*Math.PI/180 );
        var s3 = Math.sin( z*Math.PI/180 );
        return [ { x : c2*c3*P.x - c2*s3*P.y + s2*P.z,
                   y : c1*s3*P.x + c1*c3*P.y + c3*s1*s2*P.x
                     - s1*s2*s3*P.y - c2*s1*P.z,
                   z : s1*s3*P.x + c3*s1*P.y - c1*c3*s2*P.x
                     + c1*s2*s3*P.y + c1*c2*P.z },
                 [ c2*c3*v[0] - c2*s3*v[1] + s2*v[2],
                   c1*s3*v[0] + c1*c3*v[1] + c3*s1*s2*v[0]
                     - s1*s2*s3*v[1] - c2*s1*v[2],
                   s1*s3*v[0] + c3*s1*v[1] - c1*c3*s2*v[0]
                     + c1*s2*s3*v[1] + c1*c2*v[2] ] ];
    } else if ( type == 'scale' ) {
        return [ { x : P.x*x, y : P.y*y, z : P.z*z },
                 [ v[0]*x, v[1]*y, v[2]*z ] ];
    }
    throw 'No known transform type: ' + type;
}

function SceneNode ( type )
{
    this.type = type;
    this.data = '';
    this.color = [ 1, 1, 1 ];
    this.shininess = 0;
    this.children = [];
    this.inv_xfms = [];
    this.parent = null;
    return this;
}
SceneNode.prototype.dataToString = function ()
{
    return '"' + this.data.replace( RegExp( '\\\\', 'g' ), '\\\\' )
                          .replace( RegExp( '\n', 'g' ), '\\n' )
                          .replace( RegExp( '"', 'g' ), '\\"' ) + '"';
}
SceneNode.prototype.toString = function ()
{
    var result = this.type + ' / ' + this.dataToString();
    for ( var i = 0 ; i < this.children.length ; i++ )
        result += '\n' + this.children[i].toString();
    return result.replace( RegExp( '\n', 'g' ), '\n\t' );
}
SceneNode.prototype.addChild = function ( child )
{
    this.children.push( child );
    child.parent = this;
}
SceneNode.prototype.removeChild = function ( i )
{
    this.children[i].parent = null;
    this.children = this.children.slice( 0, i )
                                 .concat( this.children.slice( i + 1 ) );
}
SceneNode.prototype.applyAllTransforms = function ( src, dir )
{
    // apply the transformations that belong to this child, inverted,
    // onto the line src + t*dir
    var newsrc = src;
    var newdir = dir;
    if ( this.parent ) {
        var tmp = this.parent.applyAllTransforms( newsrc, newdir );
        newsrc = tmp[0];
        newdir = tmp[1];
    }
    for ( var i = this.inv_xfms.length - 1 ; i >= 0 ; i-- ) {
        var tmp = applyXfm( this.inv_xfms[i], newsrc, newdir );
        newsrc = tmp[0];
        newdir = tmp[1];
    }
    return [ newsrc, newdir ];
}
SceneNode.prototype.findRayIntersection = function ( src, dir )
{
    // src and dir are vectors, [x,y,z] form
    // they represent the ray (src.x,src.y,src.z) + t*<dir.x,dir.y,dir.z>
    // this function returns one of two values:
    //  - null if that ray does not intersect this scene node
    //  - an object with the following properties if there is an intersection:
    //     - start: the smallest t value for which the ray expression above
    //       intersects the object
    //     - snorm: the normal vector to the surface at the point of
    //       intersection with t=start
    //     - sobj: the SceneNode object with which the ray intersected here
    //     - end: the largest t value for which the ray expression above
    //       intersects the object
    //       (thus because the objects are convex, the ray is inside the
    //       object on the interval [start,end])
    //     - enorm: the normal vector to the surface at the point of
    //       intersection with t=end
    //     - sobj: the SceneNode object with which the ray intersected here
    if ( !SceneNode.subclasses.hasOwnProperty( this.type ) )
        return null;
    var subclass = SceneNode.subclasses[this.type];
    var tmp = this.applyAllTransforms( src, dir );
    src = tmp[0];
    dir = tmp[1];
    var result = subclass.hasOwnProperty( 'findRayIntersection' ) ?
                 subclass.findRayIntersection.apply( this, [ src, dir ] ) :
                 null;
    if ( result ) {
        if ( !result.sobj )
            result.sobj = this;
        if ( !result.eobj )
            result.eobj = this;
    }
    return result;
}

SceneNode.subclasses = { };
SceneNode.addSubclass = function ( type, prototype )
{
    prototype.__proto__ = SceneNode.prototype;
    SceneNode.subclasses[type] = prototype;
}
SceneNode.prototype.setup = function ( featureLevel )
{
    var xfmre = RegExp( '\\s+(translate|scale|rotate)\\s+' + vre );
    while ( true ) {
        var m = xfmre.exec( this.data );
        if ( m ) {
            var type = m[1];
            var x = parseFloat( m[2] );
            var y = parseFloat( m[3] );
            var z = parseFloat( m[4] );
            if ( ( type == 'translate' ) || ( type == 'rotate' ) ) {
                // not exactly an inverse for rotate, but there isn't one
                // in the POV sense, since it's all convoluted, but this
                // works for <x,0,0>, <0,y,0>, or <0,0,z>
                x = -x;
                y = -y;
                z = -z;
            } else {
                x = x ? 1/x : 0;
                y = y ? 1/y : 0;
                z = z ? 1/z : 0;
            }
            this.inv_xfms.push( [ type, x, y, z ] );
            this.data = this.data.substr( 0, m.index )
                      + this.data.substr( m.index + m[0].length );
        } else {
            break;
        }
    }
    if ( !SceneNode.subclasses.hasOwnProperty( this.type ) )
        return;
    var subclass = SceneNode.subclasses[this.type];
    if ( subclass.hasOwnProperty( 'setup' ) )
        subclass.setup.apply( this, [ featureLevel ] );
}

SceneNode.addSubclass( 'union', {
    findRayIntersection : function ( src, dir )
    {
        var best = { start: -1, end: -1 };
        for ( var i = 0 ; i < this.children.length ; i++ ) {
            var tmp = this.children[i].findRayIntersection( src, dir );
            if ( tmp == null )
                continue;
            if ( tmp.start > 0 ) {
                if ( ( best.start < 0 ) || ( tmp.start < best.start ) ) {
                    best.start = tmp.start;
                    best.snorm = tmp.snorm;
                    best.sobj = tmp.sobj;
                }
                if ( ( best.end < 0 ) || ( tmp.end > best.end ) ) {
                    best.end = tmp.end;
                    best.enorm = tmp.enorm;
                    best.eobj = tmp.eobj;
                }
            }
        }
        return ( best.start > 0 ) ? best : null;
    }
} );

SceneNode.addSubclass( 'intersection', {
    findRayIntersection : function ( src, dir )
    {
        var best = { start: -1, end: -1 };
        for ( var i = 0 ; i < this.children.length ; i++ ) {
            var tmp = this.children[i].findRayIntersection( src, dir );
            if ( tmp == null )
                return null;
            if ( tmp.start > 0 ) {
                if ( ( best.start < 0 ) || ( tmp.start > best.start ) ) {
                    best.start = tmp.start;
                    best.snorm = tmp.snorm;
                    best.sobj = tmp.sobj;
                }
                if ( ( best.end < 0 ) || ( tmp.end < best.end ) ) {
                    best.end = tmp.end;
                    best.enorm = tmp.enorm;
                    best.eobj = tmp.eobj;
                }
            }
            if ( best.start > best.end )
                return null;
        }
        return ( best.start > 0 ) ? best : null;
    }
} );

SceneNode.addSubclass( 'plane', {
    setup : function ()
    {
        var re = RegExp( '^\\s*' + vre + cre + vre );
        var m = re.exec( this.data );
        if ( m ) {
            this.point = [ parseFloat( m[1] ),
                           parseFloat( m[2] ),
                           parseFloat( m[3] ) ];
            this.normal = [ parseFloat( m[4] ),
                            parseFloat( m[5] ),
                            parseFloat( m[6] ) ];
        } else {
            this.point = null;
            this.normal = null;
        }
    },
    findRayIntersection : function ( src, dir )
    {
        if ( !this.normal || !this.point )
            return null;
        var A = this.normal[0];
        var B = this.normal[1];
        var C = this.normal[2];
        var D = -dot( A, B, C, this.point );
        var den = dot( A, B, C, dir );
        if ( den == 0 )
            return null;
        var num = dot( A, B, C, src ) + D;
        return { start : -num/den, snorm : this.normal.slice(),
                 end : -num/den, enorm : this.normal.slice() };
    }
} );

SceneNode.addSubclass( 'sphere', {
    setup : function ()
    {
        var re = RegExp( '^\\s*' + vre + cre + flre );
        var m = re.exec( this.data );
        if ( m ) {
            this.center = [ parseFloat( m[1] ),
                            parseFloat( m[2] ),
                            parseFloat( m[3] ) ];
            this.radius = parseFloat( m[4] );
        } else {
            this.center = null;
            this.radius = null;
        }
    },
    findRayIntersection : function ( src, dir )
    {
        if ( !this.center || !this.radius )
            return null;
        var A = dot( dir, dir );
        var minusc = scalar( -1, this.center );
        var pminusc = add( src, minusc );
        var B = 2*dot( dir, pminusc );
        var C = dot( pminusc, pminusc ) - this.radius*this.radius;
        var discrim = B*B - 4*A*C;
        if ( discrim < 0 )
            return null;
        if ( discrim == 0 ) {
            var t = -B/(2*A);
            var pt = add( src, scalar( t, dir ) );
            var norm = add( pt, minusc );
            return { start : t, snorm : norm, end : t, enorm : norm };
        }
        var t1 = (-B-Math.sqrt(discrim))/(2*A);
        var pt1 = add( src, scalar( t1, dir ) );
        var norm1 = add( pt1, minusc );
        var t2 = (-B+Math.sqrt(discrim))/(2*A);
        var pt2 = add( src, scalar( t2, dir ) );
        var norm2 = add( pt2, minusc );
        return { start : t1, snorm : norm1, end : t2, enorm : norm2 };
    }
} );

SceneNode.addSubclass( 'box', {
    setup : function ()
    {
        var re = RegExp( '^\\s*' + vre + cre + vre );
        var m = re.exec( this.data );
        if ( m ) {
            var x1 = parseFloat( m[1] );
            var y1 = parseFloat( m[2] );
            var z1 = parseFloat( m[3] );
            var x2 = parseFloat( m[4] );
            var y2 = parseFloat( m[5] );
            var z2 = parseFloat( m[6] );
            this.corner1 = [ Math.min( x1, x2 ),
                             Math.min( y1, y2 ),
                             Math.min( z1, z2 ) ];
            this.corner2 = [ Math.max( x1, x2 ),
                             Math.max( y1, y2 ),
                             Math.max( z1, z2 ) ];
        } else {
            this.corner1 = null;
            this.corner2 = null;
        }
    },
    findRayIntersection : function ( src, dir )
    {
        if ( !this.corner1 || !this.corner2 )
            return null;
        var result = { start : -1, snorm : [ 0, 0, 0 ],
                       end : -1, enorm : [ 0, 0, 0 ] };
        var c1 = { x : this.corner1[0],
                   y : this.corner1[1],
                   z : this.corner1[2] };
        var c2 = { x : this.corner2[0],
                   y : this.corner2[1],
                   z : this.corner2[2] };
        var p = src;
        var v = { x : dir[0], y : dir[1], z : dir[2] };
        var t;
        var x, y, z;
        if ( v.x != 0 ) {
            t = ( c1.x - p.x ) / v.x;
            y = p.y + t*v.y;
            z = p.z + t*v.z;
            if ( ( c1.y <= y ) && ( y <= c2.y )
              && ( c1.z <= z ) && ( z <= c2.z ) ) {
                if ( ( result.start == -1 ) || ( result.start >= t ) ) {
                    result.start = t;
                    result.snorm = [ -1, 0, 0 ];
                }
                if ( ( result.end == -1 ) || ( result.end <= t ) ) {
                    result.end = t;
                    result.enorm = [ -1, 0, 0 ];
                }
            }
            t = ( c2.x - p.x ) / v.x;
            y = p.y + t*v.y;
            z = p.z + t*v.z;
            if ( ( c1.y <= y ) && ( y <= c2.y )
              && ( c1.z <= z ) && ( z <= c2.z ) ) {
                if ( ( result.start == -1 ) || ( result.start >= t ) ) {
                    result.start = t;
                    result.snorm = [ 1, 0, 0 ];
                }
                if ( ( result.end == -1 ) || ( result.end <= t ) ) {
                    result.end = t;
                    result.enorm = [ 1, 0, 0 ];
                }
            }
        }
        if ( v.y != 0 ) {
            t = ( c1.y - p.y ) / v.y;
            x = p.x + t*v.x;
            z = p.z + t*v.z;
            if ( ( c1.x <= x ) && ( x <= c2.x )
              && ( c1.z <= z ) && ( z <= c2.z ) ) {
                if ( ( result.start == -1 ) || ( result.start >= t ) ) {
                    result.start = t;
                    result.snorm = [ 0, -1, 0 ];
                }
                if ( ( result.end == -1 ) || ( result.end <= t ) ) {
                    result.end = t;
                    result.enorm = [ 0, -1, 0 ];
                }
            }
            t = ( c2.y - p.y ) / v.y;
            x = p.x + t*v.x;
            z = p.z + t*v.z;
            if ( ( c1.x <= x ) && ( x <= c2.x )
              && ( c1.z <= z ) && ( z <= c2.z ) ) {
                if ( ( result.start == -1 ) || ( result.start >= t ) ) {
                    result.start = t;
                    result.snorm = [ 0, 1, 0 ];
                }
                if ( ( result.end == -1 ) || ( result.end <= t ) ) {
                    result.end = t;
                    result.enorm = [ 0, 1, 0 ];
                }
            }
        }
        if ( v.z != 0 ) {
            t = ( c1.z - p.z ) / v.z;
            x = p.x + t*v.x;
            y = p.y + t*v.y;
            if ( ( c1.x <= x ) && ( x <= c2.x )
              && ( c1.y <= y ) && ( y <= c2.y ) ) {
                if ( ( result.start == -1 ) || ( result.start >= t ) ) {
                    result.start = t;
                    result.snorm = [ 0, 0, -1 ];
                }
                if ( ( result.end == -1 ) || ( result.end <= t ) ) {
                    result.end = t;
                    result.enorm = [ 0, 0, -1 ];
                }
            }
            t = ( c2.z - p.z ) / v.z;
            x = p.x + t*v.x;
            y = p.y + t*v.y;
            if ( ( c1.x <= x ) && ( x <= c2.x )
              && ( c1.y <= y ) && ( y <= c2.y ) ) {
                if ( ( result.start == -1 ) || ( result.start >= t ) ) {
                    result.start = t;
                    result.snorm = [ 0, 0, 1 ];
                }
                if ( ( result.end == -1 ) || ( result.end <= t ) ) {
                    result.end = t;
                    result.enorm = [ 0, 0, 1 ];
                }
            }
        }
        return ( ( result.start != -1 ) || ( result.end != -1 ) ) ? result
                                                                  : null;
    }
} );

SceneNode.addSubclass( 'background', {
    setup : function ( featureLevel )
    {
        if ( featureLevel < FEATURE_LEVEL_COLORS )
            return;
        var re = RegExp( '^\\s*color\\s+rgb\\s+' + vre );
        var m = re.exec( this.data );
        if ( m ) {
            Render.bgcolor.r = parseFloat( m[1] );
            Render.bgcolor.g = parseFloat( m[2] );
            Render.bgcolor.b = parseFloat( m[3] );
        }
    }
} );

SceneNode.addSubclass( 'pigment', {
    setup : function ( featureLevel )
    {
        if ( featureLevel < FEATURE_LEVEL_COLORS )
            return;
        var re = RegExp( '^\\s*color\\s+rgb\\s+' + vre );
        var m = re.exec( this.data );
        if ( m ) {
            this.parent.color[0] = parseFloat( m[1] );
            this.parent.color[1] = parseFloat( m[2] );
            this.parent.color[2] = parseFloat( m[3] );
        }
    }
} );

SceneNode.addSubclass( 'light_source', {
    setup : function ( featureLevel )
    {
        if ( featureLevel < FEATURE_LEVEL_COLORS )
            return;
        var re = RegExp( '^\\s*location\\s+' + vre
                       + '\\s+color\\s+rgb\\s+' + vre );
        var m = re.exec( this.data );
        if ( m ) {
            Render.lightpos.x = parseFloat( m[1] );
            Render.lightpos.y = parseFloat( m[2] );
            Render.lightpos.z = parseFloat( m[3] );
            Render.lightcolor.r = parseFloat( m[4] );
            Render.lightcolor.g = parseFloat( m[5] );
            Render.lightcolor.b = parseFloat( m[6] );
        }
    }
} );

SceneNode.addSubclass( 'global_settings', {
    setup : function ( featureLevel )
    {
        if ( featureLevel < FEATURE_LEVEL_COLORS )
            return;
        var re = RegExp( '^\\s*ambient\\s+color\\s+rgb\\s+' + vre );
        var m = re.exec( this.data );
        if ( m ) {
            Render.ambient.r = parseFloat( m[1] );
            Render.ambient.g = parseFloat( m[2] );
            Render.ambient.b = parseFloat( m[3] );
        }
    }
} );

SceneNode.addSubclass( 'shininess', {
    setup : function ( featureLevel )
    {
        if ( featureLevel < FEATURE_LEVEL_COLORS )
            return;
        var re = RegExp( '^\\s*' + flre );
        var m = re.exec( this.data );
        if ( m )
            this.parent.shininess = parseFloat( m[1] );
    }
} );

