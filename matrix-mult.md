---
title: Matrix Multiplication Visualization
layout: page
permalink: /matrix-mult/
exclude_from_nav: true
---

Two random 4x4 matrices have been created below, and their
product is shown.  Highlighted in red are a column from the
first matrix and a row from the second matrix, whose product is
the red entry in the final matrix.

Drag the sliders to change which row and column are highlighted.
The red equations at the bottom show how the row and column were
multiplied to yield the final result.

Created by Kevin Cox at Bentley University

<div class="sage" id="sage-cell-0" style="min-width: 800px;"><pre>
def Mwithredrow (myMatrix, R):
     A00 = latex(myMatrix[0,0])
     A01 = latex(myMatrix[0,1])
     A02 = latex(myMatrix[0,2])
     A03 = latex(myMatrix[0,3])
     A10 = latex(myMatrix[1,0])
     A11 = latex(myMatrix[1,1])
     A12 = latex(myMatrix[1,2])
     A13 = latex(myMatrix[1,3])
     A20 = latex(myMatrix[2,0]) 
     A21 = latex(myMatrix[2,1])
     A22 = latex(myMatrix[2,2])
     A23 = latex(myMatrix[2,3])
     A30 = latex(myMatrix[3,0])
     A31 = latex(myMatrix[3,1])
     A32 = latex(myMatrix[3,2]) 
     A33 = latex(myMatrix[3,3])
     if (R == 1):
          A00 = "\\color{red}{" + A00 + "}" 
          A01 = "\\color{red}{" + A01 + "}" 
          A02 = "\\color{red}{" + A02 + "}" 
          A03 = "\\color{red}{" + A03 + "}" 
     if (R == 2):
          A10 = "\\color{red}{" + A10 + "}" 
          A11 = "\\color{red}{" + A11 + "}" 
          A12 = "\\color{red}{" + A12 + "}" 
          A13 = "\\color{red}{" + A13 + "}" 
     if (R == 3):
          A20 = "\\color{red}{" + A20 + "}" 
          A21 = "\\color{red}{" + A21 + "}" 
          A22 = "\\color{red}{" + A22 + "}" 
          A23 = "\\color{red}{" + A23 + "}" 
     if (R == 4):
          A30 = "\\color{red}{" + A30 + "}" 
          A31 = "\\color{red}{" + A31 + "}" 
          A32 = "\\color{red}{" + A32 + "}" 
          A33 = "\\color{red}{" + A33 + "}"
     return "\\left[\\begin{array}{rrrr}" + A00 + "&" + A01 + "&" + A02 + "&" + A03 + "\\\\" + A10 + "&" + A11 + "&" + A12 + "&" + A13 + "\\\\" + A20 + "&"  + A21  + "&" + A22 + "&" + A23 + "\\\\" + A30 + "&" + A31 + "&" + A32 + "&" + A33 + "\\end{array}\\right]"
def Mwithredcolumn (myMatrix, C):
     A00 = latex(myMatrix[0,0])
     A01 = latex(myMatrix[0,1])
     A02 = latex(myMatrix[0,2])
     A03 = latex(myMatrix[0,3])
     A10 = latex(myMatrix[1,0])
     A11 = latex(myMatrix[1,1])
     A12 = latex(myMatrix[1,2])
     A13 = latex(myMatrix[1,3])
     A20 = latex(myMatrix[2,0]) 
     A21 = latex(myMatrix[2,1])
     A22 = latex(myMatrix[2,2])
     A23 = latex(myMatrix[2,3])
     A30 = latex(myMatrix[3,0])
     A31 = latex(myMatrix[3,1])
     A32 = latex(myMatrix[3,2]) 
     A33 = latex(myMatrix[3,3])
     if (C == 1):
          A00 = "\\color{red}{" + A00 + "}" 
          A10 = "\\color{red}{" + A10 + "}" 
          A20 = "\\color{red}{" + A20 + "}" 
          A30 = "\\color{red}{" + A30 + "}" 
     if (C == 2):
          A01 = "\\color{red}{" + A01 + "}" 
          A11 = "\\color{red}{" + A11 + "}" 
          A21 = "\\color{red}{" + A21 + "}" 
          A31 = "\\color{red}{" + A31 + "}" 
     if (C == 3):
          A02 = "\\color{red}{" + A02 + "}" 
          A12 = "\\color{red}{" + A12 + "}" 
          A22 = "\\color{red}{" + A22 + "}" 
          A32 = "\\color{red}{" + A32 + "}" 
     if (C == 4):
          A03 = "\\color{red}{" + A03 + "}" 
          A13 = "\\color{red}{" + A13 + "}" 
          A23 = "\\color{red}{" + A23 + "}" 
          A33 = "\\color{red}{" + A33 + "}"
     return "\\left[\\begin{array}{rrrr}" + A00 + "&" + A01 + "&" + A02 + "&" + A03 + "\\\\" + A10 + "&" + A11 + "&" + A12 + "&" + A13 + "\\\\" + A20 + "&"  + A21  + "&" + A22 + "&" + A23 + "\\\\" + A30 + "&" + A31 + "&" + A32 + "&" + A33 + "\\end{array}\\right]"    
def Mwithredentry (myMatrix, R, C):
     A00 = latex(myMatrix[0,0])
     A01 = latex(myMatrix[0,1])
     A02 = latex(myMatrix[0,2])
     A03 = latex(myMatrix[0,3])
     A10 = latex(myMatrix[1,0])
     A11 = latex(myMatrix[1,1])
     A12 = latex(myMatrix[1,2])
     A13 = latex(myMatrix[1,3])
     A20 = latex(myMatrix[2,0]) 
     A21 = latex(myMatrix[2,1])
     A22 = latex(myMatrix[2,2])
     A23 = latex(myMatrix[2,3])
     A30 = latex(myMatrix[3,0])
     A31 = latex(myMatrix[3,1])
     A32 = latex(myMatrix[3,2]) 
     A33 = latex(myMatrix[3,3])
     if (R == 1) and (C == 1):
          A00 = "\\color{red}{" + A00 + "}" 
     if (R == 1) and (C == 2):
          A01 = "\\color{red}{" + A01 + "}"
     if (R == 1) and (C == 3):      
          A02 = "\\color{red}{" + A02 + "}"
     if (R == 1) and (C == 4):      
          A03 = "\\color{red}{" + A03 + "}" 
     if (R == 2) and (C == 1):
          A10 = "\\color{red}{" + A10 + "}" 
     if (R == 2) and (C == 2):
          A11 = "\\color{red}{" + A11 + "}" 
     if (R == 2) and (C == 3):     
          A12 = "\\color{red}{" + A12 + "}" 
     if (R == 2) and (C == 4):     
          A13 = "\\color{red}{" + A13 + "}" 
     if (R == 3) and (C == 1):
          A20 = "\\color{red}{" + A20 + "}" 
     if (R == 3) and (C == 2):
          A21 = "\\color{red}{" + A21 + "}" 
     if (R == 3) and (C == 3):
          A22 = "\\color{red}{" + A22 + "}" 
     if (R == 3) and (C == 4):
          A23 = "\\color{red}{" + A23 + "}" 
     if (R == 4) and (C == 1):
          A30 = "\\color{red}{" + A30 + "}" 
     if (R == 4) and (C == 2):
          A31 = "\\color{red}{" + A31 + "}" 
     if (R == 4) and (C == 3):
          A32 = "\\color{red}{" + A32 + "}" 
     if (R == 4) and (C == 4):
          A33 = "\\color{red}{" + A33 + "}"
     return "\\left[\\begin{array}{rrrr}" + A00 + "&" + A01 + "&" + A02 + "&" + A03 + "\\\\" + A10 + "&" + A11 + "&" + A12 + "&" + A13 + "\\\\" + A20 + "&"  + A21  + "&" + A22 + "&" + A23 + "\\\\" + A30 + "&" + A31 + "&" + A32 + "&" + A33 + "\\end{array}\\right]" 
A = random_matrix(ZZ,4,4)
B = random_matrix(ZZ,4,4)
@interact
def f(row=slider([1,2,3,4]),column=slider([1,2,3,4])):
    global A,B
    C=A*B
    h = A.row(row-1)
    b = B.column(column-1)
    D=h*b
    hlatex = latex(matrix(h)).replace("(","[").replace(")","]")
    t = column_matrix(B.column(column-1))
    tlatex = latex(t).replace("(","[").replace(")","]")
    part0 = "("+latex(h[0])+")("+latex(b[0])+")"
    part0answer = latex(h[0] * b[0])
    part1 = "("+latex(h[1])+")("+latex(b[1])+")"
    part1answer = latex(h[1] * b[1])
    part2 = "("+latex(h[2])+")("+latex(b[2])+")"
    part2answer = latex(h[2] * b[2])
    part3 = "("+latex(h[3])+")("+latex(b[3])+")"
    part3answer = latex(h[3] * b[3]) 
    pretty_print(html("$" + Mwithredrow(A, row) + Mwithredcolumn(B, column) + "=" + Mwithredentry(C, row, column) + "$"))
    pretty_print(html("$"+"$"))
    pretty_print(html("$\\color{red}{"+hlatex+tlatex+"="+part0+"+"+part1+"+"+part2+"+"+part3+"="+part0answer+"+"+part1answer+"+"+part2answer+"+"+part3answer+"="+latex(D)+"}$"))
</pre></div>

<script src="https://sagecell.sagemath.org/static/jquery.min.js"></script>
<script src="https://sagecell.sagemath.org/static/embedded_sagecell.js"></script>
<script>
sagecell.makeSagecell({"autoeval":true,"evalButtonText":"Start","hide":["editor","editorToggle","language","permalink","evalButton","bookmarks"],"inputLocation":"#sage-cell-0"});
</script>

