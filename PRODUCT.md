# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: hiring managers and technical recruiters filling Staff / Principal AI/ML engineering roles. They arrive from a LinkedIn message, a resume link, or a referral, usually with limited time, and need to judge quickly whether Hitesh's depth and seniority match the role. Their job on the site: verify the claims, gauge level and scope, then reach out or grab the resume.

Secondary (not a design target): engineers on the interview loop who click through to the arXiv paper, patent, and GitHub repos to check technical substance.

## Product Purpose

A personal portfolio for Hitesh Saai Mananchery Panneerselvam, an AI/ML engineer with 8+ years across travel, insurance, and cloud infrastructure. It exists to land a full-time Staff/Principal-level AI/ML role.

Success: a qualified hiring manager or recruiter emails Hitesh or downloads the resume after one visit.

## Positioning

An engineer who takes AI from prototype to production end to end: GPU-level inference work (KV caches, speculative decoding, quantization) on one side, platform design, team leadership, and business-metric outcomes on the other. The proof is specific and owned: a doubled 70B-LLM throughput, booking-conversion lifts at Expedia scale, an agentic root-cause platform at Oracle, a first-author arXiv paper, and a granted US patent.

## Operating Context

- Visitors evaluate on desktop between other candidate tabs, and on mobile from a LinkedIn or email link.
- The site sits alongside the resume PDF, LinkedIn, GitHub, and Hugging Face profiles; it should corroborate them, not repeat them.
- Content is edited in `src/content.js`; the page renders from it (Vite, vanilla JS, no framework).

## Capabilities and Constraints

- Single-page site: hero, about, experience, research, work (projects), skills, contact.
- Stack: Vite 5 + vanilla JS + one stylesheet (`src/style.css`). All copy lives in `src/content.js`.
- Availability: open to **full-time roles** (not consulting/contract). The status line should say so.
- Location: **Austin, TX**.
- Contact: email `hiteshsaaimananchery@gmail.com`.
- Open decisions (exist but not yet provided — do not invent URLs):
  - Resume PDF (to be added to `public/` or linked).

## Brand Commitments

- Name: "Hitesh Saai" (short), "Hitesh Saai Mananchery Panneerselvam" (full).
- Role title: "AI/ML Engineer".
- Tagline in current copy: "Nothing shipped by accident."
- Existing mark: an "H + cursor" monogram (two stems, crossbar replaced by a blinking cursor block), in `src/main.js` and `public/favicon.svg`.
- Voice in current copy: plain, first-person, metric-led, no hype.

## Evidence on Hand

All in `src/content.js`:

- Experience: Oracle (Principal AI Engineer, Jun–Sep 2026), Expedia Group (Senior MLE, 2022–2026), Verisk Analytics (Data Scientist / MLE, 2020–2022), Cognizant (Program Analyst, 2016–2017), each with quantified highlights.
- Research: arXiv 2406.19630 (pixel-shift video compression, 85% smaller files); US Patent 12,518,222 (ML search-query optimization).
- Projects: OptiPixel Video Encoder, AI Image Deblurring, PDF to Audiobook (GitHub links).
- Headline numbers: 8+ years in ML & data, 2× LLM throughput. Savings are stated per employer ($250K/yr at Expedia, $100K+/yr at Verisk), never summed.
- GitHub: https://github.com/HiteshSaaiNew
- Hugging Face: https://huggingface.co/HiteshSaai
- LinkedIn: https://www.linkedin.com/in/hiteshsaai-mananchery/

Absent and must not be fabricated: testimonials, references, employer logos used as endorsement, client names, talks/press, metrics beyond those listed.

## Product Principles

1. **Proof over adjectives.** Every claim ties to a number, a shipped system, a paper, or a patent the visitor can check.
2. **Respect the skim.** A recruiter should grasp level, specialty, and how to make contact within the first screen.
3. **Depth on demand.** Technical detail (stack, methods, links) is there for the interview loop without crowding the headline story.
4. **One clear next step.** Email or resume — the path to contact is never more than one action away.
5. **Content stays editable.** Copy changes happen in `content.js`, not in markup.
