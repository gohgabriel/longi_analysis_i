# 2.4 Multilevel Models

GLS replaced the single variance term $\sigma^2$ with a full covariance matrix $\Sigma$. This gives us a way to acknowledge that observations from the same child are correlated, and to produce standard errors that reflect that fact. 

Multilevel models, sometimes called mixed-effects models or hierarchical models, pretty much do the same thing, but with a different model architecture. Rather than modelling the correlation structure directly, they model the reason the correlation exists in the first place. And once you do that, the covariance structure follows automatically.

> Margin note: 'Follows automatically' is another way of saying that the covariance structure $\Sigma$ is implied from the data without having to specify it.

---

## Architecture

Multilevel models start from a simple question: why are two observations from the same child more similar to each other than two observations from different children?

Think of it like oranges. Imagine our children are oranges from the same tree. Each orange is unique — some are sweeter, some more tart, some larger than others. But if you take two slices from the same orange, they will taste much more alike than two slices from different oranges. The slices are correlated not because of anything mysterious, but simply because they come from the same fruit.

The children in our sample work the same way. Each child arrives at the program with their own characteristics, such as their home environment, their natural aptitude, the countless things that make them who they are. Two measurements from the same child will be similar because they are both shaped by that child's underlying characteristics, in the same way that two slices share the flavour of their orange. Two measurements from different children have no such shared anchor.

Multilevel models are basically saying that if we can explicitly account for the fact that two observations come from the same child (i.e. label which orange each slice came from) the remaining variation between slices is effectively independent.

> Margin note: The correlation does not disappear; we explain it away.

Thus, multilevel models have the following model specification:

$$y_{ij} = \beta_0 + u_j + \beta_1 \cdot \text{time}_{ij} + \epsilon_{ij}$$

Effectively, multilevel models simply partition variance (i.e. slice-to-slice differences between different oranges) into two buckets - between-subjects (i.e. orange-to-orange differences) and within-subjects (i.e. slice-to-slice within orange differences). 

Children vary around the average baseline with spread $\tau^2$ (some oranges are sweeter than others). And each observation varies around that child's own baseline with spread $\sigma^2$ (even within the same orange, no two slices are identical). These two sources of noise are assumed to be independent of each other.

We assume both sources of variation are normally distributed:

$$u_j \sim \mathcal{N}(0, \tau^2) \quad \text{and} \quad \epsilon_{ij} \sim \mathcal{N}(0, \sigma^2)$$

> CALLOUT: Formally, we use new subscripts: $i$ indexes the observation, $j$ indexes the child. The term $u_j$ is new too — it is a child-specific offset, the thing that makes child $j$'s orange uniquely sweet or tart. It captures everything about that child that makes their scores consistently higher or lower than average, and it is the same for both of their measurements. The term $\epsilon_{ij}$, by contrast, is the residual noise that remains after you have accounted for which child you are looking at — the natural ripeness variation between two slices of the same orange, perhaps influenced by how ripe they were at t1 versus t2.

This is what gives the model its name. There are two levels: observations at the bottom, children at the top. The $u_j$ terms are called **random effects** — they are not fixed quantities to be estimated directly, but draws from a distribution, one per child.

<!-- FIGURE 2.4.1 add widget_2_4_1_decomposition.html -->

---

## Parameters

Once you have the orange tree picture in mind, the parameters fall out naturally. There are the things we care about — $\beta_0$, the average baseline score across all children, and $\beta_1$, the average improvement over time — and there are the things we need to account for in order to trust those estimates: the two variance components.

$\tau^2$ describes how different the oranges are from each other. A large $\tau^2$ means children come into the program with very different baseline scores — some consistently high, some consistently low. A small $\tau^2$ means children are fairly similar to each other at the start.

$\sigma^2$ describes how much a child's individual observations vary around their own trajectory — the slice-to-slice variation within a single orange. This is the residual noise that remains even after you have accounted for which child you are looking at.

Together, these two quantities tell you where the variability in your data is coming from. A useful way to summarise that is the **intraclass correlation coefficient**, or ICC:

$$\text{ICC} = \frac{\tau^2}{\tau^2 + \sigma^2}$$

The ICC is simply the proportion of total variability that sits between children rather than within them. An ICC of 0.6, for instance, means that 60% of the variation in developmental scores is down to stable differences between children — which orange you are — and only 40% is down to within-child fluctuation across time. In program evaluation with developmental outcomes, ICCs tend to be moderate to high.

> MARGIN NOTE: ICC and rho (in GLS) are basically the same thing, under compound symmetry assumptions.

---

## Criterion

Like GLS, multilevel models are fitted by maximising a likelihood — roughly speaking, finding the parameter values that make the data we observed as probable as possible. And like GLS, the preferred version is **REML**, or Restricted Maximum Likelihood.

The reason comes down to a subtle but important bias. When you estimate $\beta_0$ and $\beta_1$ first, you use up some of the information in the data — some degrees of freedom — before you even get to estimating $\tau^2$ and $\sigma^2$. Plain Maximum Likelihood ignores this and tends to underestimate the variance components as a result, particularly in small samples. REML corrects for it, giving you variance estimates that are less biased.

> CALLOUT: If you want to compare two models with different fixed effects — say, a model with just time versus a model with time and a child-level covariate — you cannot use REML likelihoods to do it directly. You need to temporarily switch to plain ML for that comparison. Most software handles this quietly if you ask for a likelihood ratio test, but it is worth knowing about.

---

## Estimator

The fixed effects $\beta_0$ and $\beta_1$ are estimated much as they were in GLS — a weighted regression that accounts for the correlation structure implied by the model. 

The random effects (the individual $u_j$ offsets for each child, the unique flavour of each orange) are handled differently. Rather than being estimated as free parameters, they are *predicted* using a technique called **BLUP**, or Best Linear Unbiased Prediction. The BLUP for each child is a compromise between that child's own data and the population average. Children with more observations are trusted more and pulled closer to their own data; children with fewer observations are pulled back toward zero. This shrinkage is intentional — it guards against overfitting when you do not have much data on a particular child.

---

## Solver

Different R packages (and software) will use different solvers.

In `nlme`, the fitting algorithm uses **EM** (Expectation-Maximisation) followed by **Newton-Raphson** to find the parameter values that maximise the REML likelihood. In `lme4`, the defaults are **BOBYQA** and **Nelder-Mead** — a different family of optimisers, but pursuing the same goal. Which package you use is largely a matter of preference and habit; both will give you the same answers on well-behaved data.

The situation where the solver starts to matter is when it fails to converge — when the optimiser cannot find a stable maximum and gives up, usually with a warning message that is easy to miss and important not to. One of the most common causes is variables with very large numeric values. If your time variable is coded as the actual calendar year — 2000, 2001, 2002 — the optimiser is working in a space where the numbers are large and the likelihood surface is poorly scaled, which makes convergence difficult. Recode time as 0, 1, 2 instead, and the problem usually disappears. It is a small thing, but it saves a lot of confusion.

The solvers in SPSS AMOS and MPlus are proprietary, so we will not go into them here.

---

## The limitation

Multilevel models are a natural fit for longitudinal program evaluation data, but they come with a few conditions worth knowing about.

The most important is that you need enough children to estimate $\tau^2$ reliably. The between-child variance is estimated from the variation across children, and if you only have a handful of them, that estimate will be unstable. There is no hard rule, but as a rough guide, fewer than 20 children at the higher level should give you pause.

The model also assumes that the random effects $u_j$ are normally distributed — that the oranges on the tree follow a bell curve of sweetness. This is usually reasonable for developmental scores, but worth checking if your sample includes children who are extreme outliers.

Finally, the equivalence with compound symmetry that we noted in the Estimator section is both a strength and a constraint. For two time points, it is a perfectly reasonable assumption. For longer studies with many waves, it becomes less plausible — a child's scores at t1 and t5 are probably less correlated than their scores at t1 and t2, and compound symmetry cannot capture that decay. In those settings, extending the model to include random slopes, or moving to a more flexible covariance structure, becomes necessary.

---

## APCES applied to Multilevel Models

| Component | What it means | Multilevel Model |
|---|---|---|
| **Architecture** | Assumptions about how the world generates data | $y_{ij} = \beta_0 + u_j + \beta_1 \cdot \text{time}_{ij} + \epsilon_{ij}$, with $u_j \sim \mathcal{N}(0, \tau^2)$ and $\epsilon_{ij} \sim \mathcal{N}(0, \sigma^2)$. Observations are nested within children; within-person correlation arises from shared random effects. |
| **Parameters** | The unknown quantities to estimate | $\beta_0$ (average baseline), $\beta_1$ (average treatment effect), $\tau^2$ (between-child variance), $\sigma^2$ (within-child residual variance). The ICC $= \tau^2 / (\tau^2 + \sigma^2)$ summarises how much of the total variability is attributable to stable differences between children. |
| **Criterion** | The scoring rule that defines "good" estimation | REML likelihood, defined over the two-level data structure. Preferred over plain ML for unbiased variance component estimates; plain ML needed when comparing models with different fixed effects. |
| **Estimator** | The formula that maps data to estimates | Fixed effects estimated via weighted regression, equivalent to GLS with compound symmetry. Random effects predicted via BLUP — a shrinkage estimator that balances each child's own data against the population average. |
| **Solver** | The computational procedure that finds the answer | Iterative optimisation: EM and Newton-Raphson in `nlme`; BOBYQA and Nelder-Mead in `lme4`. Convergence can fail when predictor variables are on a large numeric scale — rescaling time to start at 0 is the most common fix. |

---

## Case Study 2

<please help me create the html object for multilevel_2.html>