interface PrepareDataByYearType {
	[year: number]: {
		[politician: string]: {
			[topic: string]: [topicCount: number]
		}
	}
}

const fetchCsvOverUrl = (urlArray: string[]) => {
	//TODO: get actual URL
	return urlArray.map((el) => fetch(el).then((response) => response.text()).then((data) => parseCsvToJson(data)));
};

const parseCsvToJson = (data: string) => {
	const dataByLine = data.split("\n");
	const keyNames = [];
	const result = [];
	for (let x = 0; x < dataByLine.length; x++) {
		const csvLineJsonData = {};
		dataByLine[x].split(",").forEach((el, idx) => {
			if (x === 0) {
				keyNames.push(el);
			} else {
				csvLineJsonData[keyNames[idx]] = el;
			}
		});
		if (x !== 0) result.push(csvLineJsonData);
	}//
	return result;
};

const prepareDataByYear = (data: PrepareDataByYearType[][]): PrepareDataByYearType => {
	const result = {};
	const keyName = "year";
	const personKeyName = "politician";
	data.forEach((urlElement) => {
		urlElement.forEach((el) => {
			if (el[keyName] === undefined) return;
			const year = el[keyName].substring(0, 4);
			if (result[year] === undefined) result[year] = {[result[year][personKeyName]]: {}};
			Object.keys(el).forEach((el2) => {
				if (result[year][personKeyName][el2] === undefined) result[year][personKeyName][el2] = 0;
				if (el2 !== keyName && el2 !== personKeyName) result[year][personKeyName][el2] += 1;
			});
		});
	});

	console.log(result);


	return result;
};

export default {fetchCsvOverUrl, prepareDataByYear};