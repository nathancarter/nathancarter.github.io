---
title: Affine Transformations in 2D
layout: page
permalink: /scene2d/
exclude_from_nav: true
---

See instructions below.

<div id='cr-stage'></div>

 * **To add a shape** to the affine plane on the right,
   click the green plus sign in the Shape column on the left.
   Then choose from the new drop-down list that was inserted
   which shape you want to use.
 * **To remove a shape**, click its name and choose the last
   option in the list, "(remove this)."
 * **To add an affine transformation** to a newly inserted shape,
   click the green plus sign in the Transformations column.
   New transformations are always added to the left of other
   transformations.  The rightmost transformation is applied
   first.
 * **To remove an affine transformation**, click it, and when the
   blue box appears, click Delete.
 * **To edit an affine transformation**, click it, and use the
   blue editing box that appears.
    * Choose T for translate, S for scale, and R for rotate.
    * After choosing T, S, or R, fill in the values below,
      which appear as subscripts on the transformation.<br>
      If the type is T, the x and y values are the
      components of the translation vector.<br>
      If the type is R, the angle value is how much to
      rotate, in degrees.
    * Click Close when finished editing, or just click the
      same transformation again.

<script type="text/javascript" src="{{ site.baseurl }}/scene2d-files/crafty.js"></script>
<script type="text/javascript" src="{{ site.baseurl }}/scene2d-files/img/shapes.js"></script>
<script type="text/javascript" src="{{ site.baseurl }}/scene2d-files/scene2d.js"></script>

