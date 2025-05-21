# Full-Stack Seed Application

## ❗ Requirements

| Package            | Version          |
|--------------------|------------------|
| **Docker Engine**  | 28.1.1 and above |
| **Docker Compose** | 2.35.1 and above |
| **node.js**        | 22.13.1 LTS/JOD |
| **npm**            | 11.2.0 and above |


## 🚀 Getting Started

Just few commands:

<ol>
<li>
Copy environment variables file

```shell
cp .env.example .env
```
</li>

<li>
Install dependency

```shell
npm install
```
</li>

<li>
Run frontend and backend server parallel

```shell
npm start
```
</li>
</ol>

All commands are executed in the root of the workspace

<br>
<br>

## 💻 Command Line interface

Tasks in the project are run from both `npm` and `nx`. Regular tasks, for simplify, are defined in the package.json is at the root of the workspace. These are commands such as `npm start`, `npm run lint`, `npm test`, etc.

For single-purpose tasks, the `nx` cli is used. For example `nx run database:up` starts the database server. This command does not need to be run directly. It is specified in the server dependencies and will be started automatically before starting the server.

### NPM Commands

#### Start development server

`npm start` - Run front-end vite server and backend API server parallel.

`npm run server` - Run backend API server. Server address [http://localhost:3000](http://localhost:3000).

`npm run front` - Run front-end vite dev-server. Can see [http://localhost:4200](http://localhost:4200). A proxy is configured on the dev server [http://localhost:4200/api](http://localhost:4200/api) ➜ [http://localhost:3000/api](http://localhost:3000/api).

#### Build docker containers for production

`build:docker:front` - Build front docker image

`build:docker:server` - Build server docker image

#### Build projects

`npm run build` - Assemble all project packages in `production` mode.

`npm run build:front` - Assemble front-end in `production` mode.

`npm run build:server` - Assemble backend server in `production` mode.

`npm run build:dev` - Assemble all project packages in `development` mode.

#### Lint

`npm run lint` - Run code linting in all packages.

`npm run lint:fix` - For autocorrection code (will be used stylelint and prettier).

`npm run lint:inspect --project=front` - A command for debugging lint rules. You can find out which files the rules apply to. The _--project_ parameter indicates which project needs to be inspected.

#### Test

`npm run test` - Run unit testing in each package/project.

> Before each `git commit`, the lint is run first, then the test. And the commit will be rejected if something fails.