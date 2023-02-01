import FetchAndPrepareUrlData from "./FetchUrlData";
import ProcessData from "./ProcessPoliticalData";
import express from "express";

const app = express();

app.listen(5000);

app.get("/evaluation", async (request, response) => {
	const requestArray = typeof request.query.url === "object" ? request.query.url : [request.query.url];
	const data = FetchAndPrepareUrlData.fetchCsvOverUrl(requestArray as string[]);

	const result = await Promise.all(data).then((data) => {
		const result = {};
		result["mostSpeeches"] = ProcessData.getPoliticianWithMostSpeechesByKey(data, "Date", "2013");
		result["mostSecure"] = ProcessData.getPoliticianWithMostSpeechesByKey(data, "Topic", "Internal Security");
		result["leastWordy"] = ProcessData.getPoliticianWithLowestKeyValue(data, "Words");
		return result;
	});
	response.json(result);
});

