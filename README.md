# teemo-tool-site

This is the website for the [Teemo Tool](https://github.com/michaelmdresser/teemo-tool) project. Uses data from the [API Server](https://github.com/michaelmdresser/teemo-tool-api).

## Developing

The `teemo.js` file is an artifact of the Typescript built but is included in the repo because the site is served from Github Pages. It should not be edited and should be treated purely as a build artifact necessary for serving the page.

`tsc -b` to compile the `teemo.ts` file to `teemo.js` with correct options.

If running the site locally, serve it from a local HTTP server to avoid CORS issues that crop up when accessing local files like the dependencies in the `js` folder. A simple way of doing this is with Python's SimpleHTTPServer. In the root directory of this project, run `python -m SimpleHTTPServer 8000` and then navigate to `localhost:8000` in your browser.

If you want to view updated frontend behavior without waiting for a new Salty Teemo match to start, check out the test endpoints exposed by the [API Server](https://github.com/michaelmdresser/teemo-tool-api).
