import FetchUrlData from "./FetchUrlData";
import ProcessData from "./ProcessPoliticalData";
import express from "express";

const app = express();
app.listen(5000);

app.get("/evaluation", async (request, response) => {
	const requestArray = typeof request.query.url === "object" ? request.query.url : [request.query.url];
	const data = FetchUrlData.fetchCsvOverUrl(requestArray as string[]);

	const result = await Promise.all(data).then((data) => ({
		mostSpeeches: ProcessData.getPoliticianWithMostSpeechesByKey(data, "Date", "2013"),
		mostSecure: ProcessData.getPoliticianWithMostSpeechesByKey(data, "Topic", "Internal Security"),
		leastWordy: ProcessData.getPoliticianWithLowestKeyValue(data, "Words")
	}));
	response.json(result);
});

