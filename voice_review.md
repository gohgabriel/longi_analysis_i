# Voice Review — AI-sounding lines to fix

For each entry: **File**, the **original line**, the **problem**, and a **suggested rewrite** in your style.
Mark each one ✅ keep my suggestion / ✏️ rewrite yourself / ❌ leave as-is.

---

## ch01_1_intro.html

---

**1.**
> *"The distinction sounds simple — but it fundamentally changes what you can and cannot claim from your data."*

**Problem:** Classic AI em dash pivot. The second clause just restates the first more seriously, which makes it feel like a fanfare for a point that hasn't landed yet.

**Suggested:** "The distinction sounds simple enough. But it fundamentally changes what you can and cannot claim from your data." ✅

---

**2.**
> *"GLS, multilevel models, repeated-measures ANOVA, sandwich estimators, hierarchical Bayes — they are all attempts to solve the same underlying problem."*

**Problem:** The em dash list-then-summary is a very AI move. Nothing wrong with the sentiment, just the construction.

*(Change to "...you will have encountered a bewildering variety of approaches, such as GLS, multilevel models, repeated-measures ANOVA, sandwich estimators, hierarchical Bayes. They are all attempts to solve the same underlying problem, just with different assumptions about what that problem looks like.")* ✅

---

**3.**
> *"This proliferation is not arbitrary — each method is a different answer to a real question about how to handle the correlation structure in longitudinal data."*

**Problem:** This is exactly the line you flagged. The em dash flattens what should be an energetic point.

**Suggested:** "This proliferation is not arbitrary! Each method is a different answer to a real question about how to handle the correlation structure in longitudinal data, designed by different people for very different contexts."  ✅

---

**4.**
> *"These notes work through the main methods in this landscape — from naïve OLS through to Bayesian multilevel models — with a focus on building genuine understanding rather than procedural familiarity."*

**Problem:** Double em dash sandwich. Reads like a mission statement drafted in a committee meeting.

**Suggested:** "These notes work through the main methods in this landscape. The goal of this workshop is to help the reader gain genuine understanding of the methods. Ideally, by the end, you should be able to pick up a methods paper and form a view on whether the authors made the right call." ✅

---

## ch01_2_apces.html

---

**5.**
> *"The solver is the most invisible of the five components — it operates quietly in the background every time you hit 'run'. But it matters: a poorly chosen solver can fail to converge, get stuck, or give answers that look plausible but are subtly wrong."*

**Problem:** The em dash here is fine actually, but "but it matters" followed by a colon is a very AI escalation pattern. Reads like a suspense beat that was written rather than spoken.

**Suggested:** "The solver is the most invisible of the five components. It runs quietly in the background every time you hit 'run' and you never think about it. But as you (may?) learn, once you use more complex methods, sometimes the default solvers that the software uses will break! Solvers can fail to converge, get stuck, or give you answers that look fine but are quietly wrong." ✅

---

**6.**
> *"Bayesianism, which treats unknown parameters as probability distributions and updates them in light of data — and Modern ML / Empiricism, which sidesteps inference almost entirely and focuses on predictive performance."*

**Problem:** This is a list item mid-sentence and the em dash makes it feel incomplete. Grammatically a bit tangled.

**Suggested:** "Bayesianism, which treats unknown parameters as probability distributions and updates them in light of data; and modern ML / empiricism, which largely sidesteps inference and focuses on predictive performance instead." (✅ Let's just split the 3 into bullet points. Frequentism, Bayesianism, Empiricism)

---

## ch02_2_ols.html

---

**7.**
> *"In program evaluation terms, $\hat{\beta}_1$ is the estimate we care most about — it captures the average difference in developmental scores between the intervention and control conditions."*

**Problem:** Em dash explanation of something that didn't need explaining — the sentence was already complete.

**Suggested:** "In program evaluation terms, $\hat{\beta}_1$ is the one we actually care about. It captures the average difference in developmental scores between the intervention and control conditions (no matter if we are comparing t1 vs t2, or control vs intervention groups)." ✅

---

**8.**
> *"Naïve OLS mainly breaks down with situation 3 — when your data is truly longitudinal, but you do not account for it."*

**Problem:** Fine structurally, but "mainly breaks down" is a bit weak. The em dash clause is also a repetition of what was already established.

**Suggested:** "Naïve OLS really only breaks down in situation 3, when your data is truly longitudinal but you have not accounted for it." ✅

---

**9.**
> *"The problem is that the standard errors are wrong — and if the standard errors are wrong, so are the p-values, the confidence intervals, and any conclusions drawn from them."*

**Problem:** The em dash pivot to the cascade of consequences is very AI — it's a rhetorical structure that feels engineered. The cascade itself is good though.

**Suggested:** "The problem is that the standard errors are wrong. (And if the standard errors are wrong, so are the p-values, the confidence intervals, and every conclusion you draw from them.)" ✅

---

**10.**
> *"All longitudinal data analysis methods are, at their core, attempts to solve this problem. In the next sections, we introduce two methods — Generalised Least Squares and Multilevel Models — that explicitly model the within-person correlation structure, and in doing so, fix what naïve OLS gets wrong with truly longitudinal data."*

**Problem:** The double em dash sandwich again, plus "and in doing so" is a very written construction. The whole paragraph is a standard AI handoff sentence.

**Suggested:** "Every longitudinal data analysis method we cover in this workshop are basically attempts to fix this! In the next sections we introduce two of them (Generalised Least Squares and Multilevel Modelling). These methods deal with the within-person correlation problem in different ways, using different frameworks." ✅

---

## ch02_3_gls.html

---

**11.**
> *"In the previous section, we learnt that naïve OLS gives us a reasonable estimate of the treatment effect — but when the same children are measured at multiple time points, its standard errors cannot be trusted."*

**Problem:** The em dash "but" pivot is a very common AI softening move. Just use "but" or start a new sentence.

**Suggested:** "In the previous section we saw that naïve OLS gives us a reasonable estimate of the treatment effect. But when the same children are measured at multiple time points, its standard errors cannot be trusted." ✅

---

**12.**
> *"$\Sigma$ replaces that single number with a richer object — one that has a row and a column for every observation in the dataset."*

**Problem:** The appositive after the em dash is fine here actually, but "richer object" is abstract in a way that feels written.

**Suggested:** "$\Sigma$ replaces that single number with a full matrix, where we configure one row and one column for every observation in the dataset." ✅

---

**13.**
> *"When two observations belong to different children, those entries are zero — one child's score tells us nothing about another's."*

**Problem:** The em dash explanation is redundant — "zero" already said it.

**Suggested:** "When two observations belong to different children, those entries are zero. Essentially, one child's score tells us nothing about another's." ✅

---

**14.**
> *"GLS is a genuine improvement over naïve OLS for longitudinal data. By explicitly modelling the within-person correlation, it produces standard errors that are honest, and inference that can be trusted — provided the covariance structure is correctly specified."*

**Problem:** "honest" and "can be trusted" are the same thing said twice. The em dash proviso at the end is a classic AI hedge-softening move.

**Suggested:** "GLS is a genuine improvement over naïve OLS for longitudinal data. By explicitly modelling the within-person correlation, it produces standard errors we can actually trust. The catch is that you have to specify $\Sigma$ correctly first." ✅

---

**15.**
> *"That proviso is the method's main vulnerability. GLS requires you to commit to a specific form for $\Sigma$ before estimation, and the results are sensitive to that choice. In practice, researchers often try several structures and compare them using AIC or BIC, which helps — but it also adds a layer of modelling decisions that naïve OLS never asked you to make."*

**Problem:** "which helps — but it also adds" is a very AI balance-the-scales move. Also "that proviso is the method's main vulnerability" is a bit stiff.

**Suggested:** "This is the method's real vulnerability. We have to commit to a form for $\Sigma$ before estimation (i.e. in the architecture step), and the results are sensitive to that decision. In practice, most researchers try several structures and compare them with AIC or BIC. That is one viable solution, but it is a layer of modelling choices which widens 'researcher degrees of freedom'." ✅

---

**16.**
> *"The ideas covered in this section — OLS, GLS, and the difference their covariance assumptions make in practice — are brought together in a worked example."*

**Problem:** Em dash list-then-verb is a very AI sentence structure. Passive too.

**Suggested:** "The ideas from this section come together in a worked example. We fit both OLS and GLS models to the same dataset, so you can see how the results differ in practice." ✅

---

## ch02_4_multilevel.html

---

**17.**
> *"Multilevel models, sometimes called mixed-effects models or hierarchical models, pretty much do the same thing, but with a different model architecture. Rather than modelling the correlation structure directly, they model the reason the correlation exists in the first place. And once you do that, the covariance structure follows automatically."*

**Problem:** This is actually good! The "And once you do that" is exactly your voice. But "pretty much do the same thing" undersells the section intro. Minor.

**Suggested:** "Multilevel models (sometimes called mixed-effects models or hierarchical models) do the same job as GLS, but from a completely different angle. Rather than modelling the correlation structure directly, they model the reason it exists in the first place. And once you do that, the covariance structure follows automatically." ✅

---

**18.**
> *"Each orange is unique — some are sweeter, some more tart, some larger than others."*

**Problem:** This is fine and natural. Leave it.

**Suggested:** *(leave as-is)* ✅

---

**19.**
> *"Multilevel models are basically saying that if we can explicitly account for the fact that two observations come from the same child — i.e. label which orange each slice came from — the remaining variation between slices is effectively independent."*

**Problem:** "i.e." inside em dashes is quite written. The sentence is also very long.

**Suggested:** "Multilevel models are basically saying: if we label which orange each slice came from, the variation between slices within that orange is effectively independent. We have explained the correlation away." ✅

---

**20.**
> *"A large $\tau^2$ means children come into the program with very different baseline scores — some consistently high, some consistently low."*

**Problem:** The em dash examples are fine here actually. But "come into the program" is slightly clunky.

**Suggested:** "A large $\tau^2$ means children arrive with very different baselines — some consistently high, some consistently low." ✅

---

**21.**
> *"The BLUP for each child is a compromise between that child's own data and the population average. Children with more observations are trusted more and pulled closer to their own data; children with fewer observations are pulled back toward zero. This shrinkage is intentional — it guards against overfitting when you do not have much data on a particular child."*

**Problem:** "This shrinkage is intentional" + em dash explanation is a very AI reassurance pattern. The semicolons in the previous sentence are also a bit formal.

**Suggested:** "The BLUP for each child is a compromise between that child's own data and the population average. Children with lots of observations get trusted more and pulled toward their own data. Children with only a few observations get pulled back toward zero. That is intentional! You can think of it as how the model protects itself against overfitting on thin data." ✅

---

**22.**
> *"The situation where the solver starts to matter is when it fails to converge — when the optimiser cannot find a stable maximum and gives up, usually with a warning message that is easy to miss and important not to."*

**Problem:** "easy to miss and important not to" is a clever construction but slightly too cute. Also the whole sentence is very passive — "the situation where."

**Suggested:** "The solver really only becomes visible when it breaks. If the optimiser cannot find a stable maximum, it gives up and throws a warning. These warnings are very easy to miss if you don't know what you are looking out for." ✅

---

**23.**
> *"Finally, the equivalence with compound symmetry that we noted in the Estimator section is both a strength and a constraint."*

**Problem:** "is both a strength and a constraint" is a very AI balanced-assessment phrase.

**Suggested:** "The compound symmetry equivalence we noted above is useful to know, but it is also a real limitation." ✅

---

## ch03_2_hb.html

---

**24.**
> *"However, we treated $\beta_0$ and $\beta_1$ as fixed, unknowable quantities — points to be estimated — while only $u_j$ and $\epsilon_{ij}$ were allowed to be random."*

**Problem:** Double em dash sandwich again. "Fixed, unknowable quantities" is also slightly redundant (fixed = knowable from data, unknowable = needs estimating; the two words are doing different things).

**Suggested:** "But we still treated $\beta_0$ and $\beta_1$ as fixed quantities while only $u_j$ and $\epsilon_{ij}$ were allowed to be random." ✅

---

**25.**
> *"The difference was that the multilevel model then estimated $\tau^2$ from the data using frequentist tricks — maximising the REML likelihood — rather than putting a prior on $\tau^2$ itself and reasoning about it probabilistically."*

**Problem:** Double em dash again around the parenthetical.

**Suggested:** "The difference is that the multilevel model estimated $\tau^2$ from the data using frequentist methods (maximising the REML likelihood), rather than putting a prior on it and reasoning probabilistically all the way up." ✅

---

**26.**
> *"The prior only meaningfully pulls the estimate when it is genuinely informative — when theory or previous research gives us a real reason to believe the effect lies in a particular range."*

**Problem:** Fine structurally, but "genuinely informative" and "a real reason to believe" are both hedging the same point twice.

**Suggested:** "The prior only really moves the estimate when it is actually informative. Typically, this happens when you have theory or prior research (such as a meta-analysis) that tells you the effect should land in a particular range." ✅

---

**27.**
> *"These priors are weakly informative: they rule out negative variances, place most of their mass near zero, but have heavy enough tails to accommodate large variances if the data demand it."*

**Problem:** "if the data demand it" is a very AI finishing clause — slightly portentous.

**Suggested:** "These priors are weakly informative: they rule out negative variances, place most of their mass near zero, but have heavy enough tails to let large variances through if the data call for it." (See below)

*(Or just: "...but have fat enough tails that large variances can still happen.")* ✅

---

**28.**
> *"In OLS and GLS, the criterion was a quantity to minimise — the residual sum of squares, or a weighted version of it. In the frequentist multilevel model, it became a likelihood to maximise. In hierarchical Bayes, the goal is different again: we are no longer looking for a single best answer."*

**Problem:** This is actually quite good — the three-part progression is effective. But "the goal is different again" is a bit of a verbal shrug after the build-up.

**Suggested:** "In OLS and GLS, the criterion was something to minimise — the residual sum of squares, or a weighted version of it. In the frequentist multilevel model, it became a likelihood to maximise. In hierarchical Bayes, we are optimising the mixture between the data (likelihood) and the prior (our initial belief). We want the full picture." ✅

---

**29.**
> *"This is Bayes' theorem applied to the full hierarchical model — the same logic from Section 3.1, but now operating over a much richer parameter space."*

**Problem:** "but now operating over a much richer parameter space" is very AI wrap-up phrasing.

**Suggested:** "This is just Bayes' theorem applied to the full hierarchical model. In Section 3.1 we demonstrated it for a single parameter. Now, imagine that but for all the parameters in the model!" ✅

---

**30.**
> *"MCMC is exact in the limit — given enough samples, it will characterise the posterior arbitrarily well — but it is computationally expensive."*

**Problem:** Double em dash sandwich, and "exact in the limit" is a precise technical claim that immediately gets softened. The rhythm is awkward.

**Suggested:** "Contrary to popular belief, MCMC is actually an exact method. This means that given enough samples, it will map the posterior as precisely as you like. The catch is that it is very, *very* slow. For a hierarchical model with many data points, you are looking at minutes or hours! (In Case Study 4, with 600+ observations, it can take around five minutes. If we had 5000 children, it would probably take hours.)" ✅
 
---

**31.**
> *"Hierarchical Bayes is the most principled of the three approaches we have covered, but it asks the most of you in return."*

**Problem:** "asks the most of you in return" is a bit formal and written — it is the kind of phrase you would read in a textbook but not hear someone say.

**Suggested:** "Hierarchical Bayes is the most principled approach we have covered, but also the most difficult to use well given its complexity with many 'researcher degrees of freedom'." ✅

---

**32.**
> *"This is not unique to Bayes — frequentist estimates also depend on modelling assumptions — but in Bayes the dependence is explicit, which means you are expected to justify your choices and check how sensitive your conclusions are to them."*

**Problem:** Double em dash parenthetical again, and the sentence is doing too much at once.

**Suggested:** "This is not unique to Bayes. As we have seen with the APCES framework, frequentist estimates depend on modelling assumptions too in the DGP. The difference is that with frequentist methods, these assumptions are often implicit. For instance, you can sort of 'bluff your way through' for when your assumptions are untenable if your readers are not familiar with the methodology. You don't have this luxury when using Bayesian statistics, as you are expected to justify your prior choices and check how much your conclusions shift when you change them. In this way, with Bayesian models the dependence on your assumptions is more explicit. " ✅

---

## Patterns to watch across all files

These are recurring constructions that keep appearing — worth finding and replacing on feel:

- **`X — Y`** where Y just explains or restates X. Almost always better as two sentences.
- **`X — Y — Z`** (double em dash sandwich). Replace with parentheses, a comma, or restructure.
- **`This is [noun] — it [verb]`** (definition via em dash). Usually better split.
- **`X, which means Y`** as a sentence ender. Often the `which means Y` part can just become its own sentence and land harder.
- **`it asks the most of you` / `it rewards careful reading` / `it is worth understanding well`** — textbook valedictions. Cut or make concrete.
- **`In practice, [passive clause]`** — true but bloodless. Try "In practice, you will find..." or just drop the hedge.
