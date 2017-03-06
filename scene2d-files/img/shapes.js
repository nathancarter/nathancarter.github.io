

// 
// 
// WARNING
// WARNING
// 
// 
// This file was auto-generated by build.sh in this folder.
// It is not meant to be edited by humans.
// See build.sh and source.asy.
// 
// 
// WARNING
// WARNING
// 
// 


var shapes = [ 'runner', 'cap', 'ball' ];


function drawShape ( name, transform )
{
    if ( typeof( transform ) == 'undefined' )
        transform = function ( x, y ) { return [x,y]; };
    var ctx = Crafty.canvas.context;
    ctx.save();
    ctx.lineJoin = 'round';
    ctx.beginPath();
    if ( name == 'runner' ) {
        var P = transform( -1.789443, 1.058061 );
        ctx.moveTo( P[0], P[1] );
        var P = transform( -1.674638, 0.780897 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( -1.674638, 0.780897 );
        ctx.moveTo( P[0], P[1] );
        var P = transform( -0.67559, 0.737277 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( -0.67559, 0.737277 );
        ctx.moveTo( P[0], P[1] );
        var P = transform( 0, 0 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0, 0 );
        ctx.moveTo( P[0], P[1] );
        var P = transform( 0.92388, 0.382683 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.92388, 0.382683 );
        ctx.moveTo( P[0], P[1] );
        var P = transform( 1.59947, 1.119961 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 1.59947, 1.119961 );
        ctx.moveTo( P[0], P[1] );
        var P = transform( 1.811602, 0.907829 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0, 0 );
        ctx.moveTo( P[0], P[1] );
        var P = transform( 0.476167, -2.147851 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( -1.219007, -0.998875 );
        ctx.moveTo( P[0], P[1] );
        var P = transform( -0.543417, -1.736152 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( -0.543417, -1.736152 );
        ctx.moveTo( P[0], P[1] );
        var P = transform( 0.432879, -1.952592 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.432879, -1.952592 );
        ctx.moveTo( P[0], P[1] );
        var P = transform( 1.356759, -1.569909 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 1.356759, -1.569909 );
        ctx.moveTo( P[0], P[1] );
        var P = transform( 2.280638, -1.952592 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.962743, -2.53837 );
        ctx.moveTo( P[0], P[1] );
        var P = transform( 0.961417, -2.571176 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.957508, -2.603252 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.951118, -2.634494 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.942351, -2.664801 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.931309, -2.694068 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.918096, -2.722193 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.902814, -2.749073 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.885566, -2.774604 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.866456, -2.798685 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.845586, -2.821212 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.823059, -2.842082 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.798978, -2.861193 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.773446, -2.87844 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.746566, -2.893722 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.718441, -2.906936 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.689174, -2.917977 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.658868, -2.926745 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.627625, -2.933134 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.595549, -2.937044 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.562743, -2.93837 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.529937, -2.937044 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.497861, -2.933134 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.466618, -2.926745 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.436312, -2.917977 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.407045, -2.906936 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.37892, -2.893722 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.35204, -2.87844 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.326508, -2.861193 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.302427, -2.842082 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.2799, -2.821212 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.25903, -2.798685 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.23992, -2.774604 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.222672, -2.749073 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.20739, -2.722193 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.194177, -2.694068 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.183135, -2.664801 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.174368, -2.634494 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.167978, -2.603252 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.164069, -2.571176 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.162743, -2.53837 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.164069, -2.505563 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.167978, -2.473488 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.174368, -2.442245 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.183135, -2.411939 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.194177, -2.382672 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.20739, -2.354547 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.222672, -2.327667 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.23992, -2.302135 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.25903, -2.278054 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.2799, -2.255527 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.302427, -2.234657 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.326508, -2.215546 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.35204, -2.198299 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.37892, -2.183017 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.407045, -2.169804 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.436312, -2.158762 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.466618, -2.149995 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.497861, -2.143605 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.529937, -2.139696 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.562743, -2.13837 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.595549, -2.139696 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.627625, -2.143605 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.658868, -2.149995 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.689174, -2.158762 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.718441, -2.169804 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.746566, -2.183017 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.773446, -2.198299 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.798978, -2.215546 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.823059, -2.234657 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.845586, -2.255527 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.866456, -2.278054 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.885566, -2.302135 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.902814, -2.327667 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.918096, -2.354547 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.931309, -2.382672 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.942351, -2.411939 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.951118, -2.442245 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.957508, -2.473488 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.961417, -2.505563 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.962743, -2.53837 );
        ctx.lineTo( P[0], P[1] );
    }
    if ( name == 'cap' ) {
        var P = transform( 0.8, 0 );
        ctx.moveTo( P[0], P[1] );
        var P = transform( 0.798674, -0.032806 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.794765, -0.064882 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.788375, -0.096125 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.779608, -0.126431 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.768566, -0.155698 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.755353, -0.183823 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.740071, -0.210703 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.722823, -0.236235 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.703713, -0.260316 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.682843, -0.282843 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.660316, -0.303713 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.636235, -0.322823 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.610703, -0.340071 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.583823, -0.355353 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.555698, -0.368566 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.526431, -0.379608 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.496125, -0.388375 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.464882, -0.394765 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.432806, -0.398674 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.4, -0.4 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.367194, -0.398674 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.335118, -0.394765 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.303875, -0.388375 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.273569, -0.379608 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.244302, -0.368566 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.216177, -0.355353 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.189297, -0.340071 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.163765, -0.322823 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.139684, -0.303713 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.117157, -0.282843 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.096287, -0.260316 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.077177, -0.236235 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.059929, -0.210703 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.044647, -0.183823 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.031434, -0.155698 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.020392, -0.126431 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.011625, -0.096125 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.005235, -0.064882 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.001326, -0.032806 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0, 0 );
        ctx.moveTo( P[0], P[1] );
        var P = transform( 1.2, 0 );
        ctx.lineTo( P[0], P[1] );
    }
    if ( name == 'ball' ) {
        var P = transform( 0.64, -0.32 );
        ctx.moveTo( P[0], P[1] );
        var P = transform( 0.638939, -0.346245 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.635812, -0.371906 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.6307, -0.3969 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.623686, -0.421145 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.614853, -0.444558 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.604282, -0.467058 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.592057, -0.488562 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.578259, -0.508988 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.56297, -0.528253 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.546274, -0.546274 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.528253, -0.56297 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.508988, -0.578259 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.488562, -0.592057 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.467058, -0.604282 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.444558, -0.614853 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.421145, -0.623686 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.3969, -0.6307 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.371906, -0.635812 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.346245, -0.638939 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.32, -0.64 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.293755, -0.638939 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.268094, -0.635812 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.2431, -0.6307 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.218855, -0.623686 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.195442, -0.614853 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.172942, -0.604282 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.151438, -0.592057 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.131012, -0.578259 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.111747, -0.56297 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.093726, -0.546274 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.07703, -0.528253 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.061741, -0.508988 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.047943, -0.488562 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.035718, -0.467058 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.025147, -0.444558 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.016314, -0.421145 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.0093, -0.3969 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.004188, -0.371906 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.001061, -0.346245 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0, -0.32 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.001061, -0.293755 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.004188, -0.268094 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.0093, -0.2431 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.016314, -0.218855 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.025147, -0.195442 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.035718, -0.172942 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.047943, -0.151438 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.061741, -0.131012 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.07703, -0.111747 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.093726, -0.093726 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.111747, -0.07703 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.131012, -0.061741 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.151438, -0.047943 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.172942, -0.035718 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.195442, -0.025147 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.218855, -0.016314 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.2431, -0.0093 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.268094, -0.004188 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.293755, -0.001061 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.32, 0 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.346245, -0.001061 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.371906, -0.004188 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.3969, -0.0093 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.421145, -0.016314 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.444558, -0.025147 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.467058, -0.035718 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.488562, -0.047943 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.508988, -0.061741 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.528253, -0.07703 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.546274, -0.093726 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.56297, -0.111747 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.578259, -0.131012 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.592057, -0.151438 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.604282, -0.172942 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.614853, -0.195442 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.623686, -0.218855 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.6307, -0.2431 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.635812, -0.268094 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.638939, -0.293755 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.64, -0.32 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.096, -0.091474 );
        ctx.moveTo( P[0], P[1] );
        var P = transform( 0.104716, -0.100355 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.113084, -0.109569 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.121094, -0.119104 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.128734, -0.128949 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.135993, -0.139095 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.142862, -0.149529 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.14933, -0.160243 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.155385, -0.171224 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.161018, -0.182462 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.166216, -0.193947 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.170971, -0.205668 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.17527, -0.217614 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.179104, -0.229774 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.182461, -0.242138 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.185331, -0.254695 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.187703, -0.267434 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.189567, -0.280345 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.190912, -0.293417 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.191726, -0.306639 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.192, -0.32 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.191726, -0.333361 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.190912, -0.346583 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.189567, -0.359655 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.187703, -0.372566 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.185331, -0.385305 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.182461, -0.397862 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.179104, -0.410226 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.17527, -0.422386 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.170971, -0.434332 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.166216, -0.446053 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.161018, -0.457538 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.155385, -0.468776 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.14933, -0.479757 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.142862, -0.490471 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.135993, -0.500905 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.128734, -0.511051 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.121094, -0.520896 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.113084, -0.530431 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.104716, -0.539645 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.544, -0.548526 );
        ctx.moveTo( P[0], P[1] );
        var P = transform( 0.535284, -0.539645 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.526916, -0.530431 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.518906, -0.520896 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.511266, -0.511051 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.504007, -0.500905 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.497138, -0.490471 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.49067, -0.479757 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.484615, -0.468776 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.478982, -0.457538 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.473784, -0.446053 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.469029, -0.434332 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.46473, -0.422386 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.460896, -0.410226 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.457539, -0.397862 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.454669, -0.385305 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.452297, -0.372566 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.450433, -0.359655 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.449088, -0.346583 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.448274, -0.333361 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.448, -0.32 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.448274, -0.306639 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.449088, -0.293417 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.450433, -0.280345 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.452297, -0.267434 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.454669, -0.254695 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.457539, -0.242138 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.460896, -0.229774 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.46473, -0.217614 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.469029, -0.205668 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.473784, -0.193947 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.478982, -0.182462 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.484615, -0.171224 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.49067, -0.160243 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.497138, -0.149529 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.504007, -0.139095 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.511266, -0.128949 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.518906, -0.119104 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.526916, -0.109569 );
        ctx.lineTo( P[0], P[1] );
        var P = transform( 0.535284, -0.100355 );
        ctx.lineTo( P[0], P[1] );
    }
    ctx.stroke();
}

