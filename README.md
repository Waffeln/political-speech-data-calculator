# political-speech-data-calculator

A simple node coding challenge for calculating data from csv data about political speeches

### `yarn install`

Get all node module packages.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:5000/evaluation](http://localhost:5000/evaluation) to use it in the browser.

Data can be added by adding them as Url props "http://localhost:5000/evaluation?url=url1&url=url2"

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app.

## Challenge:

Environment
This exercise should be solved with Node.js >= 16 and its available features.\
TypeScript implementation is preferred over plain JavaScript, but no requirement. \
The solution should include the full source code and any script or instruction necessary
for executing/running the app. \
There are no restrictions regarding used libraries.

Exercise: Political Speeches
The goal of this exercise is to calculate some statistics from given input data about \
political speeches. The application should handle CSV files (UTF-8 encoded), structured \
as below:

Speaker, Topic, Date, Words \
Alexander Abel, Education Policy, 2012-10-30, 5310 \
Bernhard Belling, Coal Subsidies, 2012-11-05, 1210 \
Caesare Collins, Coal Subsidies, 2012-11-06, 1119 \
Alexander Abel, Internal Security, 2012-12-11, 911 \

The application should provide an HTTP endpoint which accepts one or more given
URLs (http and https) via query parameters at the path:

GET /evaluation?url=url1&url=url2 \
The provided CSV files at these URLs should be downloaded, processed and evaluated
to answer the following questions:

1. Which politician gave the most speeches in 2013?
2. Which politician gave the most speeches on the topic „Internal Security"?
3. Which politician used the fewest words (in total)?
   The answers should be provided as JSON. If a question cannot be answered or does not
   have an unambiguous solution the result for this field should be null. \
   As an example, for the given input above the expected result is:

```
{
   "mostSpeeches": null,
   "mostSecurity": "Alexander Abel",
   "leastWordy": "Caesare Collins"
}
```