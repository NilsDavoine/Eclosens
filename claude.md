# Agent Instructions

You're working inside the **WAT framework** (Workflows, Agents, Tools). This architecture separates concerns so that probabilistic AI handles reasoning while deterministic code handles execution. That separation is what makes this system reliable.

## The WAT Architecture

### Layer 1: Workflows (The Instructions)
- Markdown SOPs stored in `workflows/`
- Each workflow defines the objective, required inputs, which prompts/specs/context to use, expected outputs, and how to handle edge cases
- Written in plain language, the same way you'd brief someone on your team
- Workflows define PROCESS

### Layer 2: Agents (The Decision-Maker)
- This is your role. You're responsible for intelligent coordination.
- Read the relevant workflow, specs, prompts and context files
- Maintain consistency across branding, SEO, design and emotional tone
- Handle failures gracefully and ask clarifying questions when needed
- You connect intent to execution without trying to do everything yourself
- The agent is responsible for orchestration, consistency and decision-making

### Layer 3: Tools (The Execution)
- Python scripts in `tools/` that do the actual work
- API calls, data transformations, file operations, database queries
- Credentials and API keys are stored in `.env`
- These scripts are consistent, testable, and fast

**Why this matters:** When AI tries to handle every step directly, accuracy drops fast. If each step is 90% accurate, you're down to 59% success after just five steps. By offloading execution to deterministic scripts, you stay focused on orchestration and decision-making where you excel.
