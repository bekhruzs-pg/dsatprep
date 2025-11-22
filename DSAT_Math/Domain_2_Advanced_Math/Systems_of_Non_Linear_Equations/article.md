# Systems of Non-Linear Equations

## 1. Overview
These systems usually involve one linear equation (a line) and one non-linear equation (a parabola, circle, or hyperbola). The solution is the set of points where the graphs intersect. You might find 0, 1, or 2 solutions.

## 2. Key Concepts & Formulas
*   **Substitution Method**: This is the primary algebraic method. Isolate a variable in the linear equation and plug it into the non-linear one.
*   **Resulting Equation**: After substitution, you usually get a **quadratic equation**.
    *   Solve for $x$ (or $y$).
    *   Plug back in to find the other coordinate.

## 3. Step-by-Step Strategy
1.  **Isolate**: Get $y$ or $x$ by itself in the **linear** equation (e.g., $y = 2x + 1$).
2.  **Substitute**: Replace $y$ in the **non-linear** equation with the expression from step 1.
3.  **Solve**: You now have an equation with one variable (usually quadratic). Solve it.
4.  **Find Pairs**: For each solution found, plug it back into the **linear** equation to find the corresponding coordinate.
5.  **Desmos**: Graph both equations. Click the intersection points. This is often much faster.

## 4. Common Pitfalls
*   **Mismatched Pairs**: If you find $x = 2$ and $x = -2$, make sure you pair them with the correct $y$ values. Don't mix them up.
*   **Missing Solutions**: If you divide by a variable, you might lose a solution. Factor instead.

## 5. Example Walkthrough
**Problem**: Solve the system:
$y = x^2$
$y = 2x + 3$

**Solution**:
1.  **Substitute**: Since both equal $y$, set them equal to each other:
    *   $x^2 = 2x + 3$
2.  **Set to 0**: $x^2 - 2x - 3 = 0$
3.  **Factor**: $(x - 3)(x + 1) = 0$
4.  **Solve for x**: $x = 3$ and $x = -1$.
5.  **Find y**:
    *   If $x = 3$, $y = 2(3) + 3 = 9$. Point: $(3, 9)$.
    *   If $x = -1$, $y = 2(-1) + 3 = 1$. Point: $(-1, 1)$.
6.  **Answer**: $(3, 9)$ and $(-1, 1)$.
