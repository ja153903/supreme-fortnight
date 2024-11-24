import { transposeMatrix } from "@lib/algorithms/array";

function rotateTheBox(box: string[][]): string[][] {
	// To rotate 90 degrees:
	// first, we reverse the array
	// then we can create a new array with all the elements transposed
	// Then once we do that, we can determine which elements need to fall
	box.reverse();
	const t = transposeMatrix(box, "");

	// from the bottom row going up, look to see if we can allow items to drop
	// we can ignore the last row because that is the final state
	for (let i = t.length - 2; i >= 0; i--) {
		// go across the columns and figure out which values can fall down
		for (let j = 0; j < t[i].length; j++) {
			if (t[i][j] === "#") {
				// swap until we hit another stone, an obstacle, or the end
				let currentRow = i + 1;

				while (
					currentRow < t.length &&
					t[currentRow][j] !== "#" &&
					t[currentRow][j] !== "*"
				) {
					[t[currentRow][j], t[currentRow - 1][j]] = [
						t[currentRow - 1][j],
						t[currentRow][j],
					];
					currentRow++;
				}
			}
		}
	}

	return t;
}

export { rotateTheBox };
