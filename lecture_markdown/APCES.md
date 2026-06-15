# The APCES Framework for Statistical Analysis Methods

Before we begin looking at the various data analyses methods in proper, it can be helpful to first understand in general, the key components that any data analysis method is constructed out of. In this introductory chapter, we describe a unified lens for understanding any data analysis method by decomposing it into five components: **Architecture, Parameters, Criterion, Estimator, Solver**.

---

## The Five Components

### 1. Architecture

When evaluating a program, we typically start with a research question:

> **RQ:** After receiving intervention, how much will its recipients improve?

What we are actually saying is that, in the general population, there is some ground truth — a number out there that perfectly quantifies this effect. For instance, after receiving this program, children's developmental scores will improve by exactly X points. We call this ground truth $\theta_{\text{true}}$.

The catch is that $\theta_{\text{true}}$ is never directly observable. We cannot simply go out and measure it. Instead, all we ever have access to is the data we collect from our sample — and we have to work *backwards* from that data to make our best guess at what $\theta_{\text{true}}$ might be. In this sense, data analysis is always a reverse-engineering exercise.

However, any number of different $\theta_{\text{true}}$ values could have plausibly generated the data we observe. The reverse-engineering problem is, without further constraints, hopelessly underdetermined. This is where assumptions come in. By making explicit claims about *how* $\theta_{\text{true}}$ generates data, we dramatically narrow the search space and make the problem tractable.

We call these assumptions the **data-generating process (DGP)**. Here's what that looks like in practice. In a perfect world, every child who receives the program would improve by exactly the same amount. But in reality, some children improve by 2 points, others by 6. There is individual variability around the true average effect — and our assumptions need to account for that. We write those assumptions down as an equation:

$$y = \beta_0 + \beta_1 \cdot \text{time} + \epsilon$$

A child's developmental score ($y$) is determined by some baseline level ($\beta_0$), plus however much they improve over time ($\beta_1$), plus a little leftover noise ($\epsilon$) — that individual variability we just described. We further assume that this noise averages out to zero across children and has some characteristic spread $\sigma^2$:

$$\epsilon \sim \mathcal{N}(0, \sigma^2)$$

Together, these two lines are your working theory of how the world produced the data sitting in front of you. 

> Formally, the architecture defines a family of probability distributions $p(y \mid \theta)$, parameterised by $\theta_{\text{true}}$.  

Different architectural choices (essentially, different model specifications) what predicts what, how errors behave, whether observations are independent — lead to entirely different estimation strategies. That's what the rest of this chapter is about.

### 2. Parameters

Once we have written down our DGP, the next question is: what exactly are we trying to estimate? These are the **parameters** — the specific unknowns that, once pinned down, fully describe how the world is generating our data. Reality is often very complex, for e.g. a child's developmental trajectory is shaped by countless factors — family environment, school quality, individual temperament, what they had for breakfast. You can think of parameterisation as the act of boiling all of that complexity down into just a few key numbers that we believe capture the most important features of the story.
 
In our program evaluation example, the parameters fall out naturally from the equation we wrote down. We want to know $\beta_1$ — the average improvement in developmental scores attributable to the program. But we also need to know $\sigma^2$ — how widely individual children vary around that average. Both are unknown. Both need to be estimated from data.
 
This points to a distinction worth holding onto. There is the *true* parameter value out there in the population — $\theta_{\text{true}}$ — which we can never directly observe. And there is our *estimated* parameter value, $\hat{\theta}$ (pronounced "theta hat"), which we calculate from our sample. The hat is a reminder that this is our best guess, not the truth itself. The whole enterprise of statistical estimation is about making $\hat{\theta}$ as good a stand-in for $\theta_{\text{true}}$ as possible.
 
In practice, parameters come in a few flavours:
 
- **Point estimates** — our best single guess at each unknown (e.g. "the program improves scores by 4.2 points on average")
- **Uncertainty estimates** — how much that guess would vary if we collected a different sample (e.g. the standard error of $\hat{\beta}_1$)
- **Covariance structure** — how our estimates relate to one another (e.g. does a higher baseline $\hat{\beta}_0$ tend to go hand in hand with a smaller estimated effect $\hat{\beta}_1$?)

The parameters are, in short, the answer to the question your architecture was set up to ask. But knowing *what* we want to estimate is only half the battle — we still need a principled rule for *how* to estimate it. That's the job of the next component: the Criterion.


### 3. Criterion
 
Following from our DGP, we now know which parameters we want to estimate. But there are many possible values of $\hat{\beta}_1$ that could plausibly describe our data. How do we decide which one to go with? Statisticians need to come up with a rule, known as the **criterion**, that defines what "good" estimation looks like. 
 
Think of it like a scoring system. For any candidate value of $\hat{\beta}_1$, the criterion asks: how well does this estimate actually fit the data we collected? The better the fit, the better the estimate. (In the machine learning world, we also call the criterion the 'loss function'.)
 
Following our example from earlier, a very common criterion is the one used by Ordinary Least Squares (OLS). If our model says every child should improve by 4 points, but some children improved by 2 and others by 6, there are residuals — leftover discrepancies between what the model predicted and what we actually observed. OLS says: find the $\hat{\beta}_1$ that makes those residuals as small as possible. Formally:
 
$$\text{RSS} = \sum_{i=1}^n (y_i - \hat{y}_i)^2$$
 
The criterion is the bridge between your architectural assumptions and the actual estimation procedure. Change the criterion, and you change what your estimates are optimising for — which is why different methods can give different answers even when applied to the same data.


### 4. Estimator
 
The criterion tells us what we are optimising for. The **estimator** is the actual rule — a formula — that takes our data and spits out a concrete value for $\hat{\beta}_1$. In the case of OLS, that formula is:
 
$$\hat{\beta} = (X^\top X)^{-1} X^\top y$$
 
Don't worry too much about the mechanics of this equation. The important thing is what it represents: a precise, reproducible recipe that maps raw data to parameter estimates.
 
But here is where things get interesting. How do we know that this recipe is actually giving us something trustworthy? After all, we are estimating $\theta_{\text{true}}$ from just one sample — a different sample would give us a slightly different $\hat{\beta}_1$. So why should we believe our estimate? This is especially relevant in the context of programme evaluation - policy owners always want to know if the programme pilot is for e.g. scaled up to the whole population, what the effect is going to be.
 
This is where the estimator earns its keep. A good estimator comes with theoretical guarantees — mathematical proofs that tell us how our estimates behave across many hypothetical repeated samples. The key properties we care about are:
 
- **Unbiasedness** — on average, across many samples, our estimate lands on the truth. We might be off in any single sample, but we are not systematically wrong in any direction.
- **Consistency** — as our sample size grows, our estimate converges to $\theta_{\text{true}}$. More data means we get closer to the truth.
- **Efficiency** — among all estimators that are unbiased, ours has the smallest variability across samples. It is not just right on average — it is as precise as possible.

These guarantees do not come for free, however. They only hold if certain assumptions about our DGP are actually met:
 
- **Correct specification** — the functional form of your model actually reflects reality. In our example, this means that the relationship between time and developmental scores is genuinely linear.
- **Exogeneity** — the predictors are uncorrelated with the error term. In program evaluation terms, this means that who receives the intervention is unrelated to how noisy their outcomes are — there is no selection bias baked into the data.
- **Independence** — one child's residual tells us nothing about another child's residual. Knowing that one child improved by 6 points gives us no information about what another child will do.
- **Identical distribution** — all children's errors are drawn from the same distribution, the same $\mathcal{N}(0, \sigma^2)$ we wrote down earlier. No child is systematically noisier than another.
When these assumptions hold, the OLS estimator satisfies all three properties above. This result — known as the Gauss-Markov theorem — is the mathematical warranty that justifies using OLS in the first place.


### 5. Solver
 
Think of everything we have built so far as a maze. The architecture and parameters define the maze itself — its shape, its walls, its structure. The criterion tells you how far you are from the exit at any given point. The estimator, when its assumptions are met, guarantees that an exit actually exists.
 
But none of that tells you how to *find* it.
 
That is the job of the **solver** — the computational procedure that actually navigates the maze and finds the parameter values that satisfy your criterion. In simple cases, the maze has a direct path to the exit that can be calculated in one step. In more complex cases, you have to feel your way through iteratively, updating your position little by little until you arrive.
 
In our OLS example, we are lucky — the maze has a clean analytical solution. Given the RSS criterion, there is a closed-form formula that jumps straight to the answer:
 
$$(X^\top X)\hat{\beta} = X^\top y$$
 
No iteration required. But as models grow more complex — more parameters, more layers of hierarchy, non-Gaussian outcomes — closed-form solutions become unavailable, and solvers have to work harder. Common strategies include:
 
- **Iterative algorithms** — start with a guess, compute how far you are from the exit, take a step in the right direction, repeat until you converge (e.g. Newton-Raphson, EM algorithm)
- **Stochastic sampling** — rather than finding a single exit, explore the entire maze probabilistically and map out all the plausible regions (e.g. MCMC, used in Bayesian inference)
The solver is, in a sense, the most invisible of the five components — it operates quietly in the background every time you hit "run" in your statistical software. But it matters: a poorly chosen solver can fail to converge, get stuck in the wrong part of the maze, or give you answers that look plausible but are subtly wrong.


---

## Summary: APCES Applied to OLS
 
| Component | What it means | OLS |
|---|---|---|
| **Architecture** | Your assumptions about how the world generates data — the functional form of the model and the behaviour of the errors | $y = \beta_0 + \beta_1 \cdot \text{time} + \epsilon$, where $\epsilon \overset{\text{iid}}{\sim} \mathcal{N}(0, \sigma^2)$. Errors are independent, identically distributed, and homoscedastic. |
| **Parameters** | The unknown quantities you need to estimate — the key numbers that, once pinned down, fully describe your model | $\beta_0$ (baseline), $\beta_1$ (average treatment effect), $\sigma^2$ (spread of individual variation); estimated as $\hat{\beta}_0$, $\hat{\beta}_1$, $\hat{\sigma}^2$ |
| **Criterion** | The scoring rule that defines what "good" estimation looks like — how you measure the gap between your model and the data | Minimise the Residual Sum of Squares: $\text{RSS} = \sum(y_i - \hat{y}_i)^2$ |
| **Estimator** | The formula that maps your data to parameter estimates, with theoretical guarantees about its behaviour | $\hat{\beta} = (X^\top X)^{-1} X^\top y$. Under the Gauss-Markov theorem, this is the Best Linear Unbiased Estimator (BLUE) — provided the four key assumptions hold. |
| **Solver** | The computational procedure that actually finds the answer | Analytical: normal equations $(X^\top X)\hat{\beta} = X^\top y$, solved directly. No iteration required. |
