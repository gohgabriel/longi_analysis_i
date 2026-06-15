# 3.2 Hierarchical Bayes

Welcome to the Bayesian world! It is not actually difficult to learn Hierarchical Bayes (HB) once you are familiar with multilevel models. Multilevel models account for within-person correlations that naïve OLS ignored to give us honest standard errors. However, we treated $\beta_0$ and $\beta_1$ as fixed, (un)knowable quantities — points to be estimated — while only $u_j$ and $\epsilon_{ij}$ were allowed to be random. 

From the Bayesian point of view, why should the average baseline and the treatment effect be any less uncertain than everything else? And what if we had some prior knowledge about programme effects that we wanted to incorporate into our modelling?



---

## Architecture

Hierarchical Bayes starts from the same equation as multilevel modelling:

$$y_{ij} = \beta_0 + u_j + \beta_1 \cdot \text{time}_{ij} + \epsilon_{ij}$$

What changes is what we are willing to call random. In the multilevel model, we wrote:

$$u_j \sim \mathcal{N}(0, \tau^2) \quad \text{and} \quad \epsilon_{ij} \sim \mathcal{N}(0, \sigma^2)$$

and left $\beta_0$, $\beta_1$, $\tau^2$, and $\sigma^2$ as fixed unknowns to be estimated. The randomness stopped at the level of the individual child.

In hierarchical Bayes, we keep those two lines exactly as they are — and then add priors on everything above them:

$$\beta_0 \sim \mathcal{N}(\mu_0, \sigma_{\beta_0}^2) \quad \beta_1 \sim \mathcal{N}(\mu_1, \sigma_{\beta_1}^2)$$
$$\tau \sim \text{Half-}t(\nu, s) \quad \sigma \sim \text{Half-}t(\nu, s)$$

Before moving on, it is worth pausing on something. Many statisticians argue that multilevel models are very 'Bayesian' in nature (e.g. Gelman). When we wrote $u_j \sim \mathcal{N}(0, \tau^2)$, we were specifying a prior on the random effects: a normal distribution centred at zero, with spread $\tau^2$. That is exactly what we are doing in Bayesian statistics as well! 

The difference was that the multilevel model then estimated $\tau^2$ from the data using frequentist tricks (maximising the REML likelihood) rather than putting a prior on $\tau^2$ itself and reasoning about it probabilistically. Full hierarchical Bayes resolves that awkwardness by placing priors on the variance components too, keeping the reasoning entirely probabilistic from top to bottom.

> MARGIN NOTE: This hybrid approach has a name: **Empirical Bayes**. In fact, multilevel models are *estimated* using empirical Bayes in lme4 (using R) with the James-Stein estimator.

---

## Parameters

In the multilevel model, the parameters were $\beta_0$, $\beta_1$, $\tau^2$, and $\sigma^2$ — four numbers to estimate. In hierarchical Bayes, those same quantities are still what we care about, but they are no longer point estimates (see Section 3.1). Each one is now a distribution — a posterior — summarising everything the data and our prior beliefs together tell us about that quantity.

Part of using the Bayesian approach is understanding that your choice of prior matters. Here we will talk about what is conventional today:

For the fixed effects $\beta_0$ and $\beta_1$, a normal prior is the natural choice. We centre it somewhere reasonable; for $\beta_1$, perhaps around zero, expressing mild scepticism that the intervention has a large effect. Then, we choose a standard deviation wide enough to let the data speak. As you saw in Section 3.1, a very wide prior contributes almost nothing, and the posterior converges on the likelihood alone, recovering the frequentist result. The prior only meaningfully pulls the estimate when it is genuinely informative — when theory or previous research gives us a real reason to believe the effect lies in a particular range.

For the variance components $\tau$ and $\sigma$, the situation is different: these quantities must be positive. A normal prior, which assigns probability to negative values, is not appropriate. The standard choices are the **half-Cauchy** or **half-$t$** distributions — normal-family distributions truncated at zero, so that all the probability mass sits on the positive side. These priors are weakly informative: they rule out negative variances, place most of their mass near zero, but have heavy enough tails to accommodate large variances if the data demand it. The half-$t$ with a small degrees-of-freedom parameter ($\nu = 3$ or $\nu = 4$) is a common default, offering a little more scepticism about very large variances than the half-Cauchy.

> MARGIN NOTE: explain waht Cauchy and t distributions are

---

## Criterion

In OLS and GLS, the criterion was a quantity to minimise — the residual sum of squares, or a weighted version of it. In the frequentist multilevel model, it became a likelihood to maximise. In hierarchical Bayes, the goal is different again: we are no longer looking for a single best answer. We want to characterise the full **joint posterior distribution** over all the parameters:

$$p(\beta_0, \beta_1, \tau, \sigma, u_1, \ldots, u_J \mid \text{data}) \propto p(\text{data} \mid \beta_0, \beta_1, \tau, \sigma, u_1, \ldots, u_J) \times p(\beta_0, \beta_1, \tau, \sigma)$$

In plain language: the posterior is proportional to the likelihood of the data given all the parameters, multiplied by the priors on those parameters. This is Bayes' theorem applied to the full hierarchical model — the same logic from Section 3.1, but now operating over a much richer parameter space.

---

## Estimator

Because the posterior is a full distribution rather than a point, the "estimator" in hierarchical Bayes is better understood as a summary of that distribution. The posterior mean or median serves as the point estimate (the single number you would report if forced to) and the **credible interval** replaces the confidence interval as the measure of uncertainty. A 95% credible interval has a direct probabilistic interpretation: given the data and the priors, there is a 95% probability that the true parameter lies within that range.

For $\hat{\beta}_1$, the posterior distribution tells us not just where the treatment effect probably is, but how certain we are about it, and how that certainty was shaped by both the data and our prior beliefs. If the prior was weak and the data were informative, the posterior will be tight and centred on the likelihood. If the data were sparse, the prior will have pulled the posterior toward our prior expectations.

The child-level random effects $u_j$ also get full posteriors, not just BLUPs. The shrinkage behaviour is similar — children with less data are pulled toward zero — but the uncertainty in that shrinkage is now explicit and quantified, rather than being quietly absorbed into a point prediction.

---

## Solver

The joint posterior distribution in a hierarchical model is almost never available in closed form. With multiple parameters, multiple levels, and non-conjugate priors on variance components, there is no tidy formula that drops out. Instead, the solver's job is to *explore* the posterior — to map out its shape without being able to write it down analytically.

> MARGIN NOTE: explain what closed form is

Two strategies dominate in practice.

**Markov Chain Monte Carlo (MCMC)** works by drawing samples from the posterior. Rather than computing the posterior directly, the algorithm constructs a chain of random samples that, over time, converges to the correct posterior distribution. Once you have enough samples, you can summarise the posterior however you like: take the mean, compute the 2.5th and 97.5th percentiles for a credible interval, or plot the full distribution. The most widely used variant in modern Bayesian software is the **No-U-Turn Sampler (NUTS)**, which navigates the posterior efficiently even when it has complex geometry. MCMC is exact in the limit — given enough samples, it will characterise the posterior arbitrarily well — but it is computationally expensive. For a hierarchical model with many children, it can take minutes or hours to run.

**Variational Inference (VI)** takes a different approach. Rather than sampling from the posterior, it approximates the posterior with a simpler, tractable distribution — typically a normal — and then finds the approximation that is as close as possible to the true posterior. (Think of it as conducting surgery on a typical distribution until it looks like what you think the posterior should be.) This is much faster than MCMC, often by orders of magnitude, but the approximation introduces bias: if the true posterior is skewed or has heavy tails, the normal approximation will not capture that faithfully. VI is a practical choice when speed matters and approximate answers are acceptable; MCMC is preferred when precision is paramount.

In practice, most researchers start with MCMC to get trustworthy estimates, and turn to VI when computational constraints make MCMC impractical.

---

## The limitation

Hierarchical Bayes is the most principled of the three approaches we have covered, but it asks the most of you in return.

The most obvious cost is computational. Where GLS and MLM return results in seconds, MCMC can take considerably longer, and convergence is not guaranteed. A sampler that has not converged is silently producing garbage, which is why diagnostic checks (the $\hat{R}$ statistic, trace plots) are an essential part of any Bayesian workflow. We will visit this idea in Case Study 4.

The second cost is prior sensitivity. The priors on $\beta_0$, $\beta_1$, $\tau$, and $\sigma$ all influence the posterior, and with small samples that influence can be substantial. This is not unique to Bayes — frequentist estimates also depend on modelling assumptions — but in Bayes the dependence is explicit, which means you are expected to justify your choices and check how sensitive your conclusions are to them.

Finally, hierarchical Bayes inherits the same small-sample limitation as the multilevel model: if you have very few children, the posterior over $\tau$ will be wide and heavily influenced by the prior. More data at the higher level always helps.

---

## APCES applied to Hierarchical Bayes

| Component | What it means | Hierarchical Bayes |
|---|---|---|
| **Architecture** | Assumptions about how the world generates data | $y_{ij} = \beta_0 + u_j + \beta_1 \cdot \text{time}_{ij} + \epsilon_{ij}$, with priors on all parameters. $u_j \sim \mathcal{N}(0, \tau^2)$, $\epsilon_{ij} \sim \mathcal{N}(0, \sigma^2)$, $\beta_0, \beta_1 \sim \mathcal{N}$, $\tau, \sigma \sim \text{Half-}t$. Everything is random. |
| **Parameters** | The unknown quantities to estimate | $\beta_0$, $\beta_1$, $\tau$, $\sigma$, and the full set of child-level random effects $u_j$. Each is a posterior distribution, not a point estimate. |
| **Criterion** | The scoring rule that defines "good" estimation | The joint posterior $p(\beta_0, \beta_1, \tau, \sigma, u_j \mid \text{data}) \propto p(\text{data} \mid \ldots) \times p(\beta_0, \beta_1, \tau, \sigma)$. The goal is to characterise this surface, not optimise a scalar. |
| **Estimator** | The formula that maps data to estimates | Posterior means or medians as point estimates; 95% credible intervals for uncertainty. Child-level random effects have full posteriors, with shrinkage that is explicit and quantified. |
| **Solver** | The computational procedure that finds the answer | MCMC (typically NUTS) for exact posterior characterisation; Variational Inference for fast approximation. Both are available in `brms` in R. |

---

<create a stub to Case Study 4 (multilevel_4.html)>