# AI-DLC Conditional Stage Execution Criteria

## Reverse Engineering — Execute IF:
- Existing codebase detected AND no previous reverse engineering artifacts found

## User Stories — Execute IF:
- New user-facing features, multiple user types, complex business requirements
- Skip for: pure refactoring, simple bug fixes, infrastructure-only changes

## Application Design — Execute IF:
- New components or services needed, service layer design required

## Units Generation — Execute IF:
- System needs decomposition into multiple units of work

## Functional Design — Execute IF:
- New data models, complex business logic, business rules need detailed design

## NFR Requirements — Execute IF:
- Performance, security, scalability concerns, tech stack selection required

## NFR Design — Execute IF:
- NFR Requirements was executed and patterns need incorporation

## Infrastructure Design — Execute IF:
- Infrastructure services need mapping, deployment architecture required
