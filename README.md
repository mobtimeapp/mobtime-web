# Mobtime Web UI
A simple front end for MobTime; a collaborative mobbing timer for desktop and mobile.

## Overview

Lightweight front end for MobTime. Built using [Hyperapp](https://github.com/jorgebucaran/hyperapp) & [Vite](https://vitejs.dev)

There are two main pages: the homepage and the timer page

- Homepage: `src/index.html`
![Landing page](https://imgur.com/L2LGR7G.jpg)
- Timer Page: `src/timer/index.html`
  ![Page for mob timer implementation](https://imgur.com/FVweaWL.jpg)

## Running Locally
Vite is used to run a development server locally. 

1. clone this repo &rarr; `git clone https://github.com/mobtimeapp/mobtime-web.git`
2. Install dependencies &rarr; `npm i`
3. Build CSS &rarr; `npm run tailwind`
4. Run Vite dev server &rarr; `npm run dev`

The app is now served at `http://localhost:5173` by default.

Visit `http://localhost:5173/timer/` for the timer page.

## Building for Production
Vite is used to build a bundle suitable to be served in production. 

1. clone this repo &rarr; `git clone https://github.com/mobtimeapp/mobtime-web.git`
2. Install dependencies &rarr; `npm i`
3. Build CSS &rarr; `npm run tailwind`
4. Run build command &rarr; `npm run build`

A bundle is produced and stored in the `dist/` directory.