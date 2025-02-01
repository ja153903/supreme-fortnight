import { readInputToArray } from "@utils/advent-of-code"

const lines = await readInputToArray(`${import.meta.dir}/data.in`)
const reports = lines.map((line) =>
	line.split(" ").map((item) => Number.parseInt(item)),
)

function isMonotonic(report: number[]): boolean {
	function isMonotonicallyDecreasing(items: number[]) {
		for (let i = 1; i < items.length; i++) {
			if (items[i - 1] >= items[i]) {
				return false
			}
		}

		return true
	}

	function isMonotonicallyIncreasing(items: number[]) {
		for (let i = 1; i < items.length; i++) {
			if (items[i - 1] <= items[i]) {
				return false
			}
		}

		return true
	}

	return isMonotonicallyDecreasing(report) || isMonotonicallyIncreasing(report)
}

function isWithinEpsilon(report: number[]) {
	for (let i = 1; i < report.length; i++) {
		const absDiff = Math.abs(report[i - 1] - report[i])
		if (absDiff < 0 || absDiff > 3) {
			return false
		}
	}

	return true
}

function isReportValid(report: number[]): boolean {
	return isMonotonic(report) && isWithinEpsilon(report)
}

function part1() {
	return reports.reduce((acc, report) => {
		return isReportValid(report) ? acc + 1 : acc
	}, 0)
}

function part2() {
	let res = 0

	for (const report of reports) {
		if (isReportValid(report)) {
			res++
		} else {
			for (let i = 0; i < report.length; i++) {
				const omitSingleNumber = [...report.slice(0, i), ...report.slice(i + 1)]

				if (isReportValid(omitSingleNumber)) {
					res++
					break
				}
			}
		}
	}

	return res
}

console.log(`Part 1: ${part1()}`)
console.log(`Part 2: ${part2()}`)
