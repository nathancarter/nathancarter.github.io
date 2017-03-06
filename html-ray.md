---
title: HTML Ray Tracer
layout: page
permalink: /html-ray/
exclude_from_nav: true
---

Edit the code if you want, then click the Render button below.

Tested on Chrome and Firefox.

<div align='center'>
<textarea cols='80' rows='30' id='input' style='font-family: monospace;'>
this is not code
</textarea>
<br>
<input type='button' value='Render' onClick='render();' id='button'/> with <select id='features'>
<option value="1">silhouettes only</option>
<option value="2">colors</option>
<option value="3">colors and shading</option>
<option value="4" selected>colors, shading, and specular</option>
</select>
<br>
<div id='output' align='center'>Table will go here</div>
<div id='canvas' align='center'><canvas id="canvas1"></canvas></div>
</div>

<script src='{{ site.baseurl }}/html-ray-files/linear.js'></script>
<script src='{{ site.baseurl }}/html-ray-files/html-ray-classes.js'></script>
<script src='{{ site.baseurl }}/html-ray-files/html-ray.js'></script>
<script>window.onload = setup;</script>

