# 2.4 Multilevel Models

GLS was a genuine step forward. By replacing the single variance term $\sigma^2$ with a full covariance matrix $\Sigma$, it gave us a way to acknowledge that observations from the same child are correlated — and to produce standard errors that reflect that fact. But it asked something of us in return: a commitment, upfront, to a specific form for $\Sigma$. Compound symmetry, AR(1), unstructured — you had to pick one, and your results depended on getting it right.

Multilevel models, sometimes called mixed-effects models or hierarchical models, approach the same problem from a different direction. Rather than modelling the correlation structure directly, they model the reason the correlation exists in the first place. And once you do that, the covariance structure follows automatically — no template required.

---

## Architecture

Multilevel models start from a different question than GLS. Rather than asking "what shape should the covariance matrix take?", they ask something more intuitive: "why are observations from the same child correlated in the first place?"

The answer is obvious once you say it out loud. Children are different from each other. Some children come into the program with higher developmental scores than others. Some are naturally more variable. When you measure the same child twice, the two observations are similar not because of some abstract statistical correlation, but because they belong to the same child — and that child brought their own characteristics to both measurements.

Multilevel models take that seriously by building the individual child directly into the equation. Instead of one equation for everyone, we write:

$$y_{ij} = \beta_0 + u_j + \beta_1 \cdot \text{time}_{ij} + \epsilon_{ij}$$

The subscripts are new: $i$ indexes the observation, $j$ indexes the child. So $y_{ij}$ is the $i$th observation for child $j$. The equation now has two sources of randomness. $\epsilon_{ij}$ is the familiar within-child residual noise — the same leftover variation we had before. But $u_j$ is new: it is a child-specific deviation from the average baseline, capturing the fact that child $j$ starts out higher or lower than average. We assume:

$$u_j \sim \mathcal{N}(0, \tau^2) \quad \text{and} \quad \epsilon_{ij} \sim \mathcal{N}(0, \sigma^2)$$

In plain language: children vary around the average baseline with spread $\tau^2$, and each observation varies around that child's own baseline with spread $\sigma^2$. These two sources of noise are assumed to be independent of each other.

This is what gives the model its name. There are two levels: observations at the bottom, children at the top. The $u_j$ terms are called **random effects** — they are not fixed quantities to be estimated directly, but draws from a distribution, one per child.

---

## Parameters

<!-- DRAFT TO COME -->

---

## Criterion

<!-- DRAFT TO COME -->

---

## Estimator

<!-- DRAFT TO COME -->

---

## Solver

<!-- DRAFT TO COME -->

---

## The limitation

<!-- DRAFT TO COME -->

---

## APCES applied to Multilevel Models

<!-- DRAFT TO COME -->