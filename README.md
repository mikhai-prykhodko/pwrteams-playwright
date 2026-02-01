# Playwright End-to-End Test Automation


## Technology Stack

| Technology | Purpose |
|-----------|---------|
| Playwright | Cross-browser end-to-end test automation |
| TypeScript | Type safety and maintainability |
| Node.js | Runtime environment |
| Github CI | Continuous Integration execution |

---

## Prerequisites

Ensure the following tools are installed before proceeding:

- **Node.js** version 18 or higher
- **npm** (or yarn)
- (Optional) Docker or Github Runner for CI execution

Verify Node.js installation:
```bash
node -v
```

---

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/mikhai-prykhodko/pwrteams-playwright.git
cd pwrteams-playwright
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Playwright browsers and system dependencies**
```bash
npx playwright install --with-deps
```

---


## Running Tests

### Run all (by defaul only with chrome)
```bash
yarn test
```

### Run sopecific tests
```bash
yarn test -g @test-tag
```

Browser projects:
- chromium (default)
- firefox
- webkit

---

## Test Reports

Playwright generates an HTML report after execution.

To open the report locally:
```bash
npx playwright show-report
```

Reports are stored in:
```
playwright-report/
```

---

## Configuration

The primary configuration file is:
```
playwright.config.ts
```

It defines:
- browser projects
- parallel execution and worker configuration
- retry strategy for CI environments
- screenshot, video, and trace collection
- base URL configuration

Example snippet:
```ts
use: {
  baseURL: process.env.BASE_URL,
  trace: 'on-first-retry',
}
```

---

## Environment Configuration

Environment-specific values should be provided via environment variables.

Example `.env` file:
```env
BASE_URL=https://www.tui.nl/
COUNTRY=NL
WAIT_TIMEOUT=20000
RETRY_TIME=3000
```
---

## References

- Playwright Documentation: https://playwright.dev/docs
- Playwright API Reference: https://playwright.dev/docs/api
