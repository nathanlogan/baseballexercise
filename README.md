# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


CORE:
compare selected players
graph OBP over time as default
list player rank in HR, RBI, OBP, RUNS
include indication of switching teams mid season?
- percentage stats are most interesting in comparing players
- top players in a given cateogyr (e.g. HR) would be better to just list (graph wouldn't convey much)


DATAVIZ:
top players for relevant categories
graph OPB (or any other stat)



REQUIREMENTS:
1. User selects batters
2. User selects stat to graph
3. Stat is line graphed over time for selected batters
4. A variety of other stats are displayed, showing leaders in each (HR, RUNS, RBI, OBP, OPS, AVG)



TODO:
 - ? add/remove "top performer" modules
 - ? search players
 - tackle other TODOs
 - fix "lower is better" stats sorting in "top rankings"
