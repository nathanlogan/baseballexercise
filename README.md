# Baseball Coding Exercise

## Overview                                        

- This project is intended to explore prototyping and front end development in a sports analytics context.
- The project is open ended and intended to be a four to eight hour project. We're looking for a prototype, not production code, but we are looking for you to impress us.        

## Description                                        

- The goal of the project is to create an interactive tool that helps the user understand  an MLB batter's performance over time.
- Put yourself in the shoes of the user. Think of a task they might want to perform, or question they might want to answer and tailor your web application to that task. [REDACTED] users on the team side are often players, coaches, analytics staff, operations staff. [REDACTED] users on the media side are often researchers, sportswriters, broadcasters.
- Be open to doing something unique.
- Use the following API to retrieve game by game data for each of the 133 batting title qualified MLB batters from 2023. https://project.REDACTED.com/docs/static/index.html#/
- You’ll need to use your apiKey to generate a tempToken for the player data endpoints. Your apiKey will be provided separately. (See “General” Section for endpoint)
- While the project is generally open ended, we do require that you show us two derived rate stats (AVG and OPS) displayed over time for each batter. We are also interested in seeing some of the counting stats (many of which are used to calculate the rate stats) displayed in the UI as well. In the JSON data, we provide: PA, AB, H, HR, BB, K, HBP, SF, TB, and RBI.

## Output

You can choose to host the project yourself, or send us the files and we’ll host it.

### Self Hosted:

- You’re welcome to host your project yourself however you like (Heroku, static webpage, etc). If you do this, just send us the url to your project.  

### [REDACTED] Hosted:

- We're looking to receive a zipped folder of static web files that we can host and access on a static web server. Inside the folder, please provide an index.html file as the launch point for the project. Please note that your project will not be hosted at the root path of the web server, please make all paths relative.
- For either hosting choice, please send the source code for your project for review. Github or similar repositories are preferred, but other options are acceptable as well.
- We will review the source code as well as discuss the decisions you made on how to present the data during the technical interview.

---

# Implementation

## Known Issues (out of scope for the exercise, but would be addressed in a prod app)
1. The API key is being stored in the front-end code.  Huge "no-no" in a real app.
2. The temp token is being stored in global scope.  Again, not ideal.

## Possible Features
- Add/remove "top performer" modules
- Search players
- Clear selected players ("Select All" is probably just too intensive, unless we were to limit graphing)
- Store user selections in local storage to serve as future defaults
- Allow user to set desired number of days for rolling stats
- Add more explanation around the implications of using rolling stats

## TODO:
- tackle other TODOs
- fix "lower is better" stats sorting in "top rankings" (likely add a property indicating it's an "inverse" stat)
