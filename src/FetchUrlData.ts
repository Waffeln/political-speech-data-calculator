const fetchCsvOverUrl = (urlArray: string[]) => urlArray.map((el) => fetch(el)
	.then((response) => response.text()).then((data) => parseCsvToJson(data)));

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
	}
	return result;
};

export default {fetchCsvOverUrl};