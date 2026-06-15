---
title: "Chapter Title Here"
chapter: 1
description: "One-sentence description shown in the nav tooltip and index page."
prerequisites:
  - "Some prior chapter title"
learning_objectives:
  - "First thing the reader will understand"
  - "Second thing the reader will be able to do"
case_studies:
  - file: "case_study/multilevel_1.html"
    label: "Case Study 1: Comparing OLS and GLS"
---

## Overview

Write your introduction here. Standard Markdown works throughout: **bold**, *italic*,
`inline code`, and [links](https://example.com).

## Section Heading

Regular prose paragraphs. You can use any standard Markdown syntax.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua.

### Subsection

A subsection under the section above.

- Bullet point one
- Bullet point two
- Bullet point three

> **Key idea:** Use blockquotes for definitions or callouts you want to highlight.

## Another Section

You can include code blocks:

```r
# R code example
library(lme4)
model <- lmer(y ~ time + (1 | id), data = df)
summary(model)
```

```python
# Python example
import pandas as pd
df = pd.read_csv("data.csv")
```

## Summary

Wrap up the chapter here.
