# Voice Review — Margin Notes

Same format as before: mark ✅ / ✏️ / ❌ next to each suggestion.

Note: many margin notes are already fine — short, clipped, functional. I've only flagged the ones with genuine AI-voice issues. The interactive widget notes (ch02_1_frequentist, ch03_1_bayesian) are mostly good and I've left them alone unless something stood out.

---

## ch01_1_intro.html

---

**M1.**
> *"A cross-sectional study measures each person once. A longitudinal study measures the same people repeatedly. The distinction sounds simple — but it fundamentally changes what you can and cannot claim from your data."*

**Problem:** Same em dash pivot from the main review (this is the margin note version of issue #1). Already approved the fix in the prose — the margin note needs matching.

**Suggested:** "A cross-sectional study measures each person once. A longitudinal study measures the same people repeatedly. This fundamentally changes what you can and cannot claim from your data." ✅
 
---

**M2.**
> *"GLS, multilevel models, repeated-measures ANOVA, sandwich estimators, hierarchical Bayes — they are all attempts to solve the same underlying problem. They differ in which assumptions they relax and what they do with within-person information. A unified framework makes these differences legible."*

**Problem:** "A unified framework makes these differences legible" is a very textbook-y closing line. "Legible" in particular sounds written.

**Suggested:** "GLS, multilevel models, repeated-measures ANOVA, sandwich estimators, hierarchical Bayes are all attempts to solve the same underlying problem. They differ in which assumptions they relax and what they do with within-person information. A unified framework is how we make sense of them all." ✅

---

**M3.**
> *"These notes cover the core ideas. For a full treatment of any single method, the texts listed below are the field's standard references."*

**Problem:** "The field's standard references" is a bit stiff and impersonal for a margin note.

**Suggested:** "These notes cover the core ideas. If you want to go deeper on any single method, the texts below are where the field goes more in-depth!" ✅

---

## ch01_2_apces.html

---

**M4.**
> *"$\theta_{\text{true}}$ is read 'theta true' — the unknowable population value we are trying to approximate. $\hat\theta$ ('theta hat') is our estimate from the sample."*

**Problem:** "The unknowable population value we are trying to approximate" is a bit portentous for a notation note. Fine structurally, but could be warmer.

**Suggested:** "$\theta_{\text{true}}$ is read 'theta true', standing for the real population value which we can never directly observe. $\hat\theta$ ('theta hat') is our estimate from the sample. The hat is a reminder that it is a best guess, not the truth." ✅

---

**M5.**
> *"The <strong>DGP</strong> is not a description of reality — it is a deliberate simplification. A good DGP captures the features of the world that matter most for your research question."*

**Problem:** Fine and short. The em dash works here in the compressed margin note style. Leave it.

**Suggested:** *(leave as-is)* ✅

---

**M6.**
> *"In machine learning, the criterion is called a <strong>loss function</strong>. OLS's RSS is equivalent to mean squared error (MSE) — the most common loss in regression."*

**Problem:** Fine. Clean, informative, no issues.

**Suggested:** *(leave as-is)* ✅

---

**M7.**
> *"When the DGP assumptions hold, OLS is the <strong>Best Linear Unbiased Estimator (BLUE)</strong> — no other linear unbiased estimator has lower variance. This is the mathematical warranty for using OLS."*

**Problem:** "Mathematical warranty" is a slightly cute phrase — it works, but "warranty" is a metaphor that could land flat or feel like a line someone wrote trying to be clever.

**Suggested:** "When the DGP assumptions hold, OLS is the <strong>Best Linear Unbiased Estimator (BLUE)</strong> — no other linear unbiased estimator has lower variance. This is the theorem that justifies why OLS is widely used for cross-sectional data." ✅

---

**M8.**
> *"The Bayesian chapter uses <strong>MCMC</strong> (Markov Chain Monte Carlo) as its solver — a stochastic algorithm that explores the full posterior distribution rather than finding a single point estimate."*

**Problem:** "Rather than finding a single point estimate" is an AI contrast clause tacked on. The note was fine without it.

**Suggested:** "The Bayesian chapter uses <strong>MCMC</strong> (Markov Chain Monte Carlo) as its solver — a stochastic algorithm that explores the full posterior distribution by drawing samples from it, rather than optimising toward a single answer." ✅

---

## ch02_2_ols.html

---

**M9.**
> *"We call it <em>naïve</em> not as an insult. <em>Naïve</em> is a term used for when you are specifying a model that you know the assumptions are violated."*

**Problem:** "A term used for when you are specifying a model that you know the assumptions are violated" is grammatically a bit tangled.

**Suggested:** "We call it <em>naïve</em> not as an insult! It is a technical term for a model where you know going in that some assumptions are violated. For instance, there is a classifier model called Naïve Bayes which is surprisingly effective given its assumptions are always violated." ✅

---

**M10.**
> *"When the independence assumption genuinely holds — as it does when different children appear at each time point — the standard errors are also BLUE. P-values and confidence intervals can be trusted at face value."*

**Problem:** "At face value" is a slightly worn phrase. Otherwise fine.

**Suggested:** "When the independence assumption genuinely holds (as it does when different children appear at each time point) the standard errors are also BLUE. P-values and confidence intervals are reliable." ✅

*(Or just cut "at face value" entirely: "...P-values and confidence intervals are reliable.")*

---

**M11.**
> *"When the same children are measured twice but treated as independent, $\hat{\beta}_1$ remains BLUE, but the standard errors are not. OLS underestimates the true uncertainty — producing standard errors that are too small, p-values that are too low, and confidence intervals that are too narrow."*

**Problem:** Good cascade, but "OLS underestimates the true uncertainty" + em dash into the list is the AI pattern of stating a conclusion and then immediately unpacking it. The list is already self-explanatory.

**Suggested:** "When the same children are measured twice but treated as independent, $\hat{\beta}_1$ remains BLUE, but the standard errors are wrong. Sometimes, the standard errors are too small, and sometimes too large." ✅

---

## ch02_3_gls.html

---

**M12.**
> *"The <em>minimal fix</em> framing matters: GLS changes exactly one assumption. Everything else — the model equation, the criterion logic, the estimator shape — is preserved from OLS."*

**Problem:** "The minimal fix framing matters" is a very self-referential opener — it is talking about its own framing. Slightly meta.

**Suggested:** "GLS changes exactly one assumption — how errors behave. Everything else (the model equation, the criterion logic, the estimator shape) is preserved from OLS. That is why we call it the minimal fix!" ✅

---

**M13.**
> *"A matrix is a rectangular table of numbers. Where a single number $\sigma^2$ captures one fact about your errors, a matrix captures many facts at once — one per row–column pair. The $\Sigma$ matrix has one row and one column for every observation in the dataset."*

**Problem:** "One per row–column pair" is slightly clunky. Otherwise a solid note.

**Suggested:** "A matrix is a rectangular table of numbers. A single number like $\sigma^2$ captures one fact about your errors. $\Sigma$ captures many — there is one entry for every pair of observations in the dataset, describing how they relate to each other." ✅

---

**M14.**
> *"Most software will let you compare covariance structures using information criteria such as AIC or BIC. It is worth doing so rather than accepting the default."*

**Problem:** "It is worth doing so rather than accepting the default" is a very written hedge. Say it more directly.

**Suggested:** "Most software lets you compare covariance structures using AIC or BIC. Do not just accept the default!" ✅

---

**M15.**
> *"If two observations from the same child are very similar to each other, treating them as two independent pieces of evidence overstates how much you actually know. $\Sigma^{-1}$ corrects for that by down-weighting redundant information."*

**Problem:** Fine and clear. The logic flows naturally. Leave it.

**Suggested:** *(leave as-is)* ✅

---

**M16.**
> *"When $\Sigma$ is correctly specified, $\hat{\beta}_{GLS}$ is BLUE — the Best Linear Unbiased Estimator. The same guarantee OLS had, now restored for correlated data."*

**Problem:** "Now restored for correlated data" is a slightly triumphant closer that sounds like it was written for effect.

**Suggested:** "When $\Sigma$ is correctly specified, $\hat{\beta}_{GLS}$ returns to being BLUE." ✅

---

**M17.**
> *"Because $\Sigma$ must be estimated from the data alongside $\beta$, the version actually implemented in software is called <em>Feasible GLS</em> (FGLS). The EM algorithm cycles between estimating $\beta$ and updating $\Sigma$ until convergence."*

**Problem:** Fine and accurate. Leave it.

**Suggested:** *(leave as-is)* ✅

---

## ch02_4_multilevel.html

---

**M18.**
> *"'Follows automatically' is another way of saying that the covariance structure $\Sigma$ is implied from the data without having to specify it."*

**Problem:** "'X' is another way of saying Y" is a very AI explanatory pattern.

**Suggested:** "When we say the covariance structure 'follows automatically', we mean $\Sigma$ is implied by the model. We never have to specify it directly, although sometimes it can be helpful to do so for learning." ✅

---

**M19.**
> *"The correlation does not disappear; we explain it away."*

**Problem:** This is actually punchy and good. Leave it.

**Suggested:** *(leave as-is)* ✅

---

**M20.**
> *"ICC and ρ (in GLS) are basically the same thing, under compound symmetry assumptions."*

**Problem:** Fine, informal, accurate. Leave it.

**Suggested:** "ICC and ρ (in GLS) are basically the same thing, under compound symmetry assumptions." ✅

---

**M21.**
> *"If you want to compare two models with different fixed effects, you cannot use REML likelihoods directly. Switch to plain ML for that comparison. Most software handles this quietly if you ask for a likelihood ratio test."*

**Problem:** "Most software handles this quietly" is a bit vague — handles what quietly?

**Suggested:** "If you want to compare two models with different fixed effects, you cannot use REML likelihoods directly. We need to switch to 'normal' ML first. Most software does this automatically when you run a likelihood ratio test, but it is worth knowing why, and also knowing that we need to switch back to REML afterwards!"  ✅

---

## ch03_2_hb.html

---

**M22.**
> *"This hybrid approach — specifying a distribution over random effects but estimating its hyperparameters from the data — has a name: <strong>Empirical Bayes</strong>. In fact, multilevel models in <code>lme4</code> are estimated this way, using the James–Stein estimator."*

**Problem:** The double em dash around the definition is the sandwich pattern again. Also "has a name:" is a slightly dramatic reveal construction.

**Suggested:** "Specifying a distribution over random effects but estimating its hyperparameters from the data is called <strong>Empirical Bayes</strong>. Multilevel models in <code>lme4</code> are estimated this way, using the James–Stein estimator." ✅

---

**M23.**
> *"The <em>t</em>-distribution with $\nu$ degrees of freedom looks like a normal, but with heavier tails — more probability mass far from the centre. As $\nu \to \infty$ it becomes normal; as $\nu \to 1$ it becomes the Cauchy. A half-<em>t</em> keeps only the positive half, making it suitable as a prior for variance parameters that must be non-negative."*

**Problem:** Technical and accurate. "Making it suitable as a prior for variance parameters that must be non-negative" is a bit of a written clause at the end, but it is doing real work. Leave it.

**Suggested:** *(leave as-is)* ✅

---

**M24.**
> *"A 'closed form' solution is one you can write as a tidy formula — like the OLS estimator $(X^\top X)^{-1} X^\top y$. When no such formula exists, you need a numerical algorithm to approximate the answer instead."*

**Problem:** "To approximate the answer instead" — "instead" is unnecessary and slightly flat.

**Suggested:** "A 'closed form' solution is one you can write as a tidy formula (like the OLS estimator $(X^\top X)^{-1} X^\top y$). When no such formula exists, you need to approximate the answer instead using numerical algorithms." ✅

---

**M25.**
> *"The $\hat{R}$ statistic (pronounced 'R-hat') compares variance within chains to variance between chains. Values close to 1.0 indicate convergence; values above 1.05 are a warning sign. Trace plots — showing sampled values over iterations — should look like 'fuzzy caterpillars,' not drifting trends."*

**Problem:** Honestly this is good — the "fuzzy caterpillars" is exactly the kind of concrete image that sticks. Leave it.

**Suggested:** *(leave as-is)* ✅

---

## ch02_1_frequentist.html & ch03_1_bayesian.html (widget pages)

These margin notes are already tighter and more compressed than the prose chapters — they read like slide annotations rather than prose, which suits the interactive widget context. I would leave all of them as-is unless you want to revisit:

- *"θ_true is a single number — the real programme effect in the population. It never changes. We just can't see it directly."* — good, punchy ✅
- *"The sampling distribution only exists in theory. You never actually run the experiment 10,000 times — you imagine doing so."* — great ✅ 
- *"Frequentists only extract the peak of the likelihood (the MLE) and discard the rest — because treating θ as a random variable is philosophically off-limits."* — good ✅
- *"Bayesians reject sampling distributions entirely: with only one real experiment, hypothetical replications are metaphysical fiction."* — excellent, very voiced ✅

All fine. Leave as-is.
