# Non-Linear Equations in One Variable

## 1. Overview
This topic focuses primarily on quadratic equations ($ax^2 + bx + c = 0$), but also includes radical, rational, and absolute value equations. The DSAT tests your ability to find solutions and understand the *nature* of those solutions (real vs. imaginary, distinct vs. repeated).

## 2. Key Concepts & Formulas
*   **Quadratic Formula**: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$
*   **Discriminant ($\Delta$)**: $\Delta = b^2 - 4ac$
    *   $\Delta > 0$: 2 distinct real solutions.
    *   $\Delta = 0$: 1 real solution (repeated root).
    *   $\Delta < 0$: 0 real solutions (2 imaginary).
*   **Factoring**: Finding two numbers that multiply to $ac$ and add to $b$.
*   **Extraneous Solutions**: Solutions that appear algebraically but do not satisfy the original equation (common in radical and rational equations).

## 3. Step-by-Step Strategy
1.  **Identify the Type**: Is it quadratic? Radical? Absolute value?
2.  **Quadratic Strategy**:
    *   Set to 0: Move everything to one side.
    *   Factor if easy.
    *   Use Quadratic Formula if factoring is hard.
    *   Use Desmos: Graph $y = ax^2 + bx + c$ and look for x-intercepts.
3.  **Radical Strategy**:
    *   Isolate the radical.
    *   Square both sides.
    *   **CHECK YOUR ANSWERS** (Crucial for extraneous solutions).

## 4. Common Pitfalls
*   **The $\pm$ Sign**: When taking the square root of both sides (e.g., $x^2 = 9$), remember $x = \pm 3$.
*   **Dividing by Variable**: Never divide by $x$ to solve $x^2 = 5x$. You lose the solution $x=0$. Factor instead: $x(x-5)=0$.
*   **Extraneous Solutions**: Forgetting to plug answers back into radical equations. $\sqrt{x} = -3$ has NO solution, but squaring gives $x=9$.

## 5. Example Walkthrough
**Problem**: Solve for $x$: $\sqrt{2x + 3} - x = 0$

**Solution**:
1.  **Isolate Radical**: $\sqrt{2x + 3} = x$
2.  **Square Both Sides**: $2x + 3 = x^2$
3.  **Set to 0**: $x^2 - 2x - 3 = 0$
4.  **Factor**: $(x - 3)(x + 1) = 0$
5.  **Potential Solutions**: $x = 3, x = -1$
6.  **Check**:
    *   $x=3$: $\sqrt{2(3)+3} - 3 = \sqrt{9} - 3 = 3 - 3 = 0$ (Valid)
    *   $x=-1$: $\sqrt{2(-1)+3} - (-1) = \sqrt{1} + 1 = 2 \neq 0$ (Invalid)
7.  **Answer**: $x = 3$ only.
