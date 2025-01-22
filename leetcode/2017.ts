function gridGame(grid: number[][]): number {
	const COLS = grid[0].length;

	const MAX_DP = [];
	for (let i = 0; i < 3; i++) {
		MAX_DP.push(new Array(COLS + 1).fill(Number.NEGATIVE_INFINITY));
	}

	for (let i = 0; i < 3; i++) {
		MAX_DP[i][0] = 0;
	}

	for (let i = 0; i < COLS + 1; i++) {
		MAX_DP[0][i] = 0;
	}

	// dp[i][j] -> min cost leading up to this node
	// dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]

	for (let i = 1; i < 3; i++) {
		for (let j = 1; j < COLS + 1; j++) {
			MAX_DP[i][j] =
				Math.max(MAX_DP[i - 1][j], MAX_DP[i][j - 1]) + grid[i - 1][j - 1];
		}
	}

	// Figure out the second part for this later

	return 0;
}

export { gridGame };
