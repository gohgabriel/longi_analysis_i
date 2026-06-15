# 2.3 Generalised Least Squares

In the previous section, we learnt that naïve OLS gives us a 
reasonable estimate of the treatment effect — but when the same children 
are measured at multiple time points, its standard errors cannot be trusted. 
The problem is not that OLS is doing something wrong, exactly. It is that 
OLS is making an assumption — that all observations are independent of each 
other — that longitudinal data structurally violates. And when that 
assumption breaks, the uncertainty estimates break with it.

Generalised Least Squares, or GLS, is the big brother to OLS that is the minimal fix. It keeps everything 
about OLS that was working — the same equation, the same criterion, the same 
basic logic — and changes exactly one thing: the assumption about how errors 
behave. That single change is enough to restore honest standard errors, and 
to give us confidence intervals and p-values we can actually trust.

## Architecture

The model architecture stays the same:

$$y = \beta_0 + \beta_1 \cdot \text{time} + \epsilon$$

What changes is the data generating process regarding the error term. In OLS, we wrote:

$$\epsilon \sim \mathcal{N}(0, \sigma^2)$$

In GLS, we write:

$$\epsilon \sim \mathcal{N}(0, \Sigma)$$

The difference is that $\sigma^2$ is a single number, and $\Sigma$ is a matrix. To understand why that matters, it helps to think about what $\sigma^2$ was actually saying. When we write $\sigma^2$, we are claiming two things at once: that every child's noise has the same spread, and that no two children's observations are related to each other. One number captures both claims because, under OLS, there is nothing more to say.

> MARGIN NOTE: please explain what a matrix is

$\Sigma$ replaces that single number with a richer object — one that has a row and a column for every observation in the dataset. The entries along its diagonal play the same role $\sigma^2$ did: they describe how variable each observation is. But the off-diagonal entries say something new. They describe the relationship between pairs of observations. When two observations belong to different children, those entries are zero — one child's score tells us nothing about another's. When two observations belong to the same child, measured at t1 and t2, those entries can be positive — knowing a child scored high at t1 genuinely tells us something about their t2 score.

This is exactly the structure OLS had no language for. $\Sigma$ gives us that language.

<!-- An HTML object for 2.3.1

see widget_2_3_1_sigma.html -> can we integrate it into this gls.html?

-->

## Parameters
 
GLS estimates the same core parameters as OLS: $\beta_0$, the baseline score, and $\beta_1$, the average change attributable to the intervention. But it adds a new estimation task that OLS never had to face. Because $\Sigma$ is no longer a fixed assumption — it is now a claim about the world that needs to be estimated from the data — the covariance structure itself becomes a parameter.
 
In OLS, $\sigma^2$ was a single unknown: one number, one degree of freedom. $\Sigma$, in principle, could contain as many unknowns as there are entries in the matrix — which grows quickly as sample size increases. In practice, this is made tractable by choosing a specific *form* for $\Sigma$ in advance: a template that constrains how the correlations are structured, reducing the problem to estimating just a small number of values. The three forms most commonly used in practice — and available in the `nlme` package in R — are the following.

<!-- An HTML object for 2.3.2

Create a widget to demonstrate the 3 below. We can just use a simple case of 3 observations from a child (so a 3 x 3 matrix) and see the 3 different possible matrices.

-->
 
1. **Compound symmetry** assumes that every pair of observations from the same child is equally correlated, regardless of how far apart in time they are. A child's t1 and t2 scores are just as correlated as their t1 and t3 scores. This is the simplest possible structure, and it is often a reasonable first assumption when you have only two time points.
 
2. **AR(1)**, or first-order autoregressive, assumes that observations closer together in time are more correlated than observations further apart, with the correlation declining at a fixed rate as the time gap grows. For developmental data, this is often more realistic: a child's score this month is more predictive of their score next month than of their score a year from now.
 
3. **Unstructured** places no constraints on the off-diagonal entries at all — every within-child correlation is estimated freely from the data. This is the most flexible option, but it is also the most expensive: it uses the most degrees of freedom and requires a larger sample to estimate reliably.
 
Choosing between these structures is itself a modelling decision, and it matters. If you specify a covariance structure that is too simple — say, compound symmetry when the true correlations decay over time — your standard errors will still be somewhat off, just less dramatically than if you had ignored $\Sigma$ entirely. Most software will let you compare structures using information criteria such as AIC or BIC, and it is worth doing so rather than accepting the default.
 
---
 
## Criterion
 
OLS found its estimates by minimising the Residual Sum of Squares — the total squared distance between what the model predicted and what the data actually showed. GLS uses the same basic idea, but with a twist: not all residuals are treated equally.
 
Think about what the covariance structure $\Sigma$ is telling us. Some observations are noisier than others. Some pairs of observations are highly correlated. If we treat all of those equally when adding up our residuals, we are ignoring information we actually have. GLS instead minimises a *weighted* version of the RSS:
 
$$\sum (y_i - \hat{y}_i)^\top \Sigma^{-1} (y_i - \hat{y}_i)$$
 
The $\Sigma^{-1}$ — the inverse of the covariance matrix — is doing the weighting. Observations that are more uncertain get down-weighted; observations that are highly correlated with others are adjusted so they do not effectively get counted twice. The result is a scoring rule that is better calibrated to the actual structure of the data than the flat, unweighted RSS that OLS used.
 
If that feels abstract, here is the intuition: if two observations from the same child are very similar to each other, treating them as two independent pieces of evidence overstates how much you actually know. GLS corrects for that.
 
---
 
## Estimator
 
The GLS estimator follows the same shape as the OLS estimator, with one modification:
 
$$\hat{\beta}_{GLS} = (X^\top \Sigma^{-1} X)^{-1} X^\top \Sigma^{-1} y$$
 
Compare this to the OLS version:
 
$$\hat{\beta}_{OLS} = (X^\top X)^{-1} X^\top y$$
 
The only difference is that $\Sigma^{-1}$ has been inserted in two places. Everything else — the structure of the formula, the logic of how data gets mapped to estimates — is identical. GLS is OLS, but with the data pre-adjusted to account for the correlation structure.
 
The theoretical payoff is the same one OLS enjoyed under Gauss-Markov: when $\Sigma$ is correctly specified, $\hat{\beta}_{GLS}$ is the Best Linear Unbiased Estimator. It is as efficient as any linear unbiased estimator can be, given the data and the model. Crucially, unlike OLS applied to correlated data, the standard errors are now honest — they reflect the true uncertainty around $\hat{\beta}_1$, which means the confidence intervals and p-values can be trusted.
 
The catch, as always, is that "correctly specified" is doing a lot of work in that sentence. We return to this below.
 
---
 
## Solver
 
In OLS, the solver is very simple: one formula, no iteration, done. GLS is a little more involved, because $\Sigma$ is not known in advance — it has to be estimated from the data at the same time as $\beta$.
 
In practice, this is handled iteratively using the Expectation-Maximisation (EM) algorithm. The algorithm starts with an initial guess for $\Sigma$, uses it to estimate $\hat{\beta}_{GLS}$, then uses the residuals from that estimate to update $\Sigma$, then re-estimates $\hat{\beta}_{GLS}$, and so on — cycling back and forth until the estimates stop changing. This is sometimes called Feasible GLS (FGLS), to distinguish it from the idealised case where $\Sigma$ is somehow known ahead of time.
 
Most statistical software — including `nlme` in R — handles all of this quietly in the background. You specify the covariance structure you want, hit run, and the solver does the rest. The iteration typically converges quickly for well-behaved data, and you will rarely need to think about it explicitly. What you do need to think about is the structure you chose for $\Sigma$ — because if that choice is wrong, no amount of careful iteration will save you.
 
---

## Case Study 1

Link to Case Study 1.

---

## Summary

| Component | What it means | GLS |
|---|---|---|
| **Architecture** | Assumptions about how the world generates data | $y = \beta_0 + \beta_1 \cdot \text{time} + \epsilon$, with $\epsilon \sim \mathcal{N}(0, \Sigma)$. Errors can be correlated across observations from the same child. |
| **Parameters** | The unknown quantities to estimate | $\beta_0$ (baseline), $\beta_1$ (treatment effect), and $\Sigma$ — the covariance structure of the errors, typically constrained to compound symmetry, AR(1), or unstructured form |
| **Criterion** | The scoring rule that defines "good" estimation | Minimise the weighted residual sum of squares: $\sum (y_i - \hat{y}_i)^\top \Sigma^{-1} (y_i - \hat{y}_i)$; in practice, maximise the REML likelihood |
| **Estimator** | The formula that maps data to estimates | $\hat{\beta}_{GLS} = (X^\top \Sigma^{-1} X)^{-1} X^\top \Sigma^{-1} y$. BLUE when $\Sigma$ is correctly specified. |
| **Solver** | The computational procedure that finds the answer | Iterative: EM algorithm and/or Newton-Raphson, optimising the REML criterion. $\Sigma$ and $\beta$ are estimated in alternating steps until convergence. |

GLS is a genuine improvement over naïve OLS for longitudinal data. By explicitly modelling the within-person correlation, it produces standard errors that are honest, and inference that can be trusted — provided the covariance structure is correctly specified.

That proviso is the method's main vulnerability. GLS requires you to commit to a specific form for $\Sigma$ before estimation, and the results are sensitive to that choice. In practice, researchers often try several structures and compare them using AIC or BIC, which helps — but it also adds a layer of modelling decisions that naïve OLS never asked you to make.