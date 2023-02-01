import moment from "moment/moment";

interface PoliticianCounter {
	[politician: string]: number
}

const politicianKeyName = "Speaker";

const getPoliticianWithMostSpeechesByKey = (data, keyName: string, expectedValue: string | number): string | null => {
	const politicianCounter: PoliticianCounter = {};

	data.forEach((urlElement) => {
		urlElement.forEach((el) => {
			if (moment(el[keyName], "YYYY-MM-DD", true).isValid()) {
				if (el[keyName].substring(0, 4) !== expectedValue) return;
			} else if (el[keyName] !== expectedValue) return;
			if (politicianCounter[el[politicianKeyName]] === undefined) {
				politicianCounter[el[politicianKeyName]] = 0;
			}
			politicianCounter[el[politicianKeyName]]++;
		});
	});

	const highestValue = Math.max(...Object.values(politicianCounter));
	const result = Object.keys(politicianCounter).filter(key => politicianCounter[key] === highestValue);

	if (result.length !== 1) return null;
	return result[0];
};

const getPoliticianWithLowestKeyValue = (data, keyName: string): string | null => {
	const politicianCounter: PoliticianCounter = {};
	data.forEach((urlElement) => {
		urlElement.forEach((el) => {
			if (politicianCounter[el[politicianKeyName]] === undefined) {
				politicianCounter[el[politicianKeyName]] = 0;
			}
			politicianCounter[el[politicianKeyName]] += Number(el[keyName]);
		});
	});

	const lowestValue = Math.min(...Object.values(politicianCounter));
	const result = Object.keys(politicianCounter).filter(key => politicianCounter[key] === lowestValue);

	if (result.length !== 1) return null;
	return result[0];
};

export default {getPoliticianWithMostSpeechesByKey, getPoliticianWithLowestKeyValue};