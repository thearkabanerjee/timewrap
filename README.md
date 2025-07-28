# TimeWrap

* Philosophy:  Don't Let Your Life Slip By. *

"It is not that we have a short time to live, but that we waste much of it."
— Seneca

This tool isn’t about maximizing output.
It’s about facing your timeline with honesty — and choosing your path deliberately.

npm link: https://www.npmjs.com/package/timewrap

** the project was created as submission for the 2025 Boot.dev hackathon **
 link: https://blog.boot.dev/news/hackathon-2025/


**A minimalist CLI tool to reflect on your life in terms of time — lived, lost, and remaining.**


## Overview

`timewrap` is a terminal-based tool that visualizes your lifespan in days. It helps you see how much of your time has been spent on sleep and screens, how much is left, and how you might use it better.

This tool isn't about productivity hacks — it's about perspective.


## Quick Start

You can run `timewrap` directly with no installation:

```bash
npx timewrap


What You'll See
* Your current age in days and years
* How much time you’ve already spent sleeping and on screens
* An estimate of how many days you have left, assuming a 90-year lifespan
* Your actual "free" time
* A clean progress bar showing your life so far
* Regret estimators (e.g., "years lost to excess screen time")
* Encouragement messages if you're managing your time well



# AVAILABLE LIFE MODES:
| Mode    | Sleep/day    | Screen/day |
| ------- | ------------ | ---------- |
| student | 7 hours      | 4 hours    |
| hustler | 5 hours      | 2 hours    |
| monk    | 8 hours      | 0 hour     |
| custom  | user-defined |            |


Dependencies:

Node.js (ESM)
chalk for terminal styling
boxen for clean output formatting
dayjs for date and time math

