# 2.2 Naïve OLS

## From frequentist inference to a real analysis

In the previous section, we built up the frequentist toolkit — sampling distributions, p-values, confidence intervals. Now it is time to put it to work. The simplest possible analysis we can run on longitudinal data is also the most familiar: Ordinary Least Squares regression. 

> MARGIN NOTE: We call it *naïve* not as an insult! *Naïve* is a term used for when you are specifying a model that you know the assumptions are violated.

---

## Three situations, one equation

In program evaluation, the between-groups OLS design turns up in several guises. You might have:

1. **Two separate cohorts at different time points** — one group of children measured before the intervention (t1), and a completely different group measured after (t2). The time effect is genuinely between-subjects; no child appears in both groups.
2. **Two groups at the same time point** — both groups are measured at t2, but one received the intervention and one did not. Here, group membership and time are essentially interchangeable — you cannot separate the effect of the intervention from the effect of time.
3. **One group measured twice, treated as independent** — the same children are measured at t1 and t2, but for whatever reason the repeated structure is ignored (e.g., you lost identifiers) and the two time points are treated as if they came from different children. Mathematically, this looks identical to situation 1.

Despite their surface differences, all three situations reduce to basically the same architecture:

$$y = \beta_0 + \beta_1 \cdot \text{time} + \epsilon$$

To keep things simple (for now), we use this as our catchall. If you are reading a study that is using situation 2, just imagine that the group effect is the time effect.

---

## APCES applied to Naïve OLS

We have already walked through this model in detail in Section 1.2. Here we simply collect the pieces in one place:

| Component | What it means | Naïve OLS |
|---|---|---|
| **Architecture** | Assumptions about how the world generates data | $y = \beta_0 + \beta_1 \cdot \text{time} + \epsilon$, with $\epsilon \overset{\text{iid}}{\sim} \mathcal{N}(0, \sigma^2)$. Errors are independent, identically distributed, and homoscedastic. |
| **Parameters** | The unknown quantities to estimate | $\beta_0$ (baseline), $\beta_1$ (treatment effect), $\sigma^2$ (spread); estimated as $\hat{\beta}_0$, $\hat{\beta}_1$, $\hat{\sigma}^2$ |
| **Criterion** | The scoring rule that defines "good" estimation | Minimise RSS: $\sum(y_i - \hat{y}_i)^2$ |
| **Estimator** | The formula that maps data to estimates | $\hat{\beta} = (X^\top X)^{-1} X^\top y$. Under Gauss-Markov, this is the Best Linear Unbiased Estimator (BLUE) — provided the key assumptions hold. |
| **Solver** | The computational procedure that finds the answer | Analytical: normal equations $(X^\top X)\hat{\beta} = X^\top y$, solved directly. No iteration required. |

In program evaluation terms, $\hat{\beta}_1$ is the estimate we care most about — it captures the average difference in developmental scores between the intervention and control conditions. Under the Gauss-Markov theorem, this estimate is BLUE across all three situations described above: it is the most precise unbiased estimate we can extract from the data, given the model we have specified.

> MARGIN NOTE (Cases 1 & 2): When the independence assumption genuinely holds — as it does when different children appear at each time point — the standard errors are also BLUE. This means p-values and confidence intervals can be trusted at face value.

> MARGIN NOTE (Case 3): When the same children are measured twice but treated as independent, $\hat{\beta}_1$ remains BLUE, but the standard errors are not. Because within-person observations are more similar to each other than the model assumes, OLS underestimates the true uncertainty around $\hat{\beta}_1$ — producing standard errors that are too small, p-values that are too low, and confidence intervals that are too narrow.

---

## The limitation

Naïve OLS works well when its assumptions are met. In certain cases (e.g. situations 1 and 2), you may not have any within-subjects data at all to work with to give you a longitudinal estimate of a programme effect. In such cases, your OLS estimates of the treatment effect (be it group or time) and its standard errors will still be BLUE and valid. The only limitation is that such estimates *cannot* be compared to models using true longitudinal designs (such as repeated measures ANOVA etc), because they are fundamentally estimands of different underlying phenomena.

Naïve OLS mainly breaks down with situation 3 - when your data is truly longitudinal, but you do not account for it. When the same child is measured at multiple time points, their observations are not independent — knowing that a child scored high at t1 tells you something about their score at t2. Children who start high tend to stay high; children who start low tend to stay low. This within-person correlation is not noise but actually signal, and naïve OLS has no way of accounting for it.

The consequence is not that the point estimate $\hat{\beta}_1$ is wrong. It may still be a reasonable approximation of the average treatment effect (in fact, it is still BLUE). The problem is that the standard errors are wrong — and if the standard errors are wrong, so are the p-values, the confidence intervals, and any conclusions drawn from them.

All longitudinal data analysis methods are, at their core, attempts to solve this problem. In the next sections, we introduce two methods — Generalised Least Squares and Multilevel Models — that explicitly model the within-person correlation structure, and in doing so, fix what naïve OLS gets wrong with truly longitudinal data.

---