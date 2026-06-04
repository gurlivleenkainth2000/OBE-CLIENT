# OBE Platform — Client

> Status: Archived (2021-2022). Kept public for portfolio review. Not maintained.

The Angular frontend for the OBE (Outcome-Based Education) Platform: a tool that helps engineering faculty measure how well a course's assessments map to its declared outcomes, for accreditation reporting (NBA / Washington Accord).

This is one half of a two-repo project:

- Client (this repo): the Angular app.
- Server: the Node/Express/MongoDB API and attainment engine, at [OBE-SERVER](https://github.com/gurlivleenkainth2000/OBE-SERVER).

It was my final-year project at Guru Nanak Dev Engineering College, built to meet a real accreditation reporting requirement for the college.

## What it does

- Define courses, Course Outcomes (COs), and assessments.
- Map COs to Program Outcomes and Program Specific Outcomes (PO / PSO).
- Import student marks from Excel.
- Compute direct and indirect attainment, with attainment-gap reporting.
- Export accreditation-ready reports as PDF.
- Role-aware screens (for example HoD vs faculty) and institutional login.

## Tech stack

- Angular 12 with feature-folder structure and lazy-loaded modules
- ng-bootstrap and Bootstrap 4 for UI
- ngx-toastr for notifications, ngx-cookie-service for token storage
- pdfmake for PDF report generation
- xlsx and file-saver for Excel import and file export

## How it is put together

- Lazy-loaded modules for the admin and auth areas, with nested sub-modules for the attainment and curriculum sections.
- An HTTP interceptor attaches credentials and handles expired sessions globally (a 401 routes the user back to login).
- Route guards combine cookie and local-storage checks before allowing access.
- Services cache shared data (curriculums, courses, terms) behind RxJS subjects so components do not re-fetch.
- A dedicated PDF service builds the accreditation report from a typed payload.

## Running it locally

This app needs the [OBE-SERVER](https://github.com/gurlivleenkainth2000/OBE-SERVER) backend running.

```bash
npm install
ng serve
```

Then open `http://localhost:4200`. Point the app at your running API base URL in the environment config before signing in.

## Authors

Built by Gurlivleen Singh Kainth and Manjot Singh.

## License

Source-available for review only. See [LICENSE](./LICENSE). This is not open-source software: you may read and clone it to evaluate it, but reuse, redistribution, or submission as your own work is not permitted without written permission.
