interface PoliticalSpeechDataType {
	[keyName: string]: string | number
}

const fetchCsvOverUrl = (urlArray: string[]): Promise<PoliticalSpeechDataType[]>[] => urlArray.map((el) => fetch(el)
	.then((response) => response.text()).then((data) => parseCsvToJson(data)));

const parseCsvToJson = (data: string): PoliticalSpeechDataType[] => {
	const dataByLine = data.split("\n");
	const keyNames: string[] = [];
	const result: PoliticalSpeechDataType[] = [];
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