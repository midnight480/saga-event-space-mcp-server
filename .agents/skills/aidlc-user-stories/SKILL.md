---
name: aidlc-user-stories
description: Create user stories and personas from requirements using INVEST criteria. Use when converting business requirements into user-centered stories with acceptance criteria, defining user personas, or establishing shared understanding across teams.
---

# AI-DLC User Stories Skill

This skill converts requirements into user-centered stories with acceptance criteria.

## Activation

Use this skill when:
- Converting requirements into user stories
- Defining user personas and their needs
- Creating acceptance criteria for features
- Establishing shared understanding across teams
- Multiple user types or personas are involved

## Execution

Read `.aidlc-rule-details/inception/user-stories.md` for complete step-by-step instructions.

### Two-Part Process

#### Part 1 — Planning

1. Validate user stories are needed (intelligent assessment)
2. Create story plan with methodology questions
3. Generate context-appropriate questions using `[Answer]:` tags
4. Wait for user answers
5. Analyze answers for ambiguities (MANDATORY)
6. Create follow-up questions if needed
7. Get explicit approval of the plan

#### Part 2 — Generation

1. Execute the approved plan step by step
2. Generate `aidlc-docs/inception/user-stories/stories.md` (INVEST criteria)
3. Generate `aidlc-docs/inception/user-stories/personas.md`
4. Mark checkboxes `[x]` after each step
5. Present completion message and wait for approval

### Story Quality

All stories must be:
- **I**ndependent — Can be developed separately
- **N**egotiable — Details can be discussed
- **V**aluable — Delivers value to users
- **E**stimable — Can be sized
- **S**mall — Fits in one iteration
- **T**estable — Has clear acceptance criteria
