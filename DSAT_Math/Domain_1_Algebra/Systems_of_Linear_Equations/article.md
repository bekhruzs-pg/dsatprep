# Systems of Linear Equations

## 1. Overview
A system of linear equations consists of two or more linear equations with the same variables. Solving a system means finding the pair of values $(x, y)$ that makes **both** equations true simultaneously. On the DSAT, these questions range from simple calculations to conceptual questions about the number of solutions.

## 2. Key Concepts & Formulas
*   **Intersection Point**: The solution to a system is the point where the lines cross on a graph.
*   **Number of Solutions**:
    *   **One Solution**: Lines have **different slopes**. They intersect at exactly one point.
    *   **No Solution**: Lines are **parallel** (same slope, different y-intercept). They never touch.
    *   **Infinite Solutions**: Lines are **identical** (same slope, same y-intercept). Every point on the line is a solution.

## 3. Step-by-Step Strategy
1.  **Choose a Method**:
    *   **Substitution**: Best when one variable is already isolated (e.g., $y = 2x + 1$).
    *   **Elimination**: Best when equations are in standard form ($Ax + By = C$) and coefficients line up nicely.
    *   **Desmos (Graphing)**: The **fastest** method for most DSAT questions. Type both equations exactly as they appear and click the intersection point.
2.  **Solve**: Find the value of the first variable.
3.  **Back-Substitute**: Plug that value back into either equation to find the second variable.
4.  **Verify**: Check your answer in the *other* equation.

## 4. Common Pitfalls
*   **Stopping Early**: Finding $x$ and forgetting to find $y$ (or vice versa), especially when the question asks for $x + y$.
*   **Sign Errors**: When subtracting equations in elimination, remember to distribute the negative to *all* terms.
*   **"No Solution" vs "Infinite"**: Confusing the two conditions. Remember: Parallel = No Solution; Same Line = Infinite.

## 5. Example Walkthrough
**Problem**: Solve the system for $(x, y)$:
$2x + 3y = 12$
$4x - y = 10$

**Solution (Elimination)**:
1.  **Align**: Multiply the second equation by 3 to match the $y$ coefficients.
    *   $12x - 3y = 30$
2.  **Add Equations**:
    *   $(2x + 3y) + (12x - 3y) = 12 + 30$
    *   $14x = 42$
3.  **Solve for x**: $x = 3$.
4.  **Solve for y**: Plug $x=3$ into $4x - y = 10$:
    *   $4(3) - y = 10$
    *   $12 - y = 10$
    *   $-y = -2 \rightarrow y = 2$.
5.  **Answer**: $(3, 2)$.
