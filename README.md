# MyAnimeCatalog

## Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Deployment Guide](#deployment-guide)

## Getting Started

- Install `docker` and `docker-compose`.
- Run `docker-compose up --build` to start the server and client processes.
- Create a user account at `http://localhost:3000/setup`.

## Project Structure

```
myanimecatalog
├─client/
└─server/
```

Each of the directories have a `README.md` of their own.

### [`client/`](./client/README.md) directory

Contains the React frontend code.

### [`server/`](./server/README.md) directory

Contains the Node.js Apollo server.

## Deployment Guide

Please refer to the individual READMEs in the client and server folders.
