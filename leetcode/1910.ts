function removeOccurrences(s: string, part: string): string {
	let mut = s

	while (mut.indexOf(part) !== -1) {
		mut = mut.replace(part, "")
	}

	return mut
}

export { removeOccurrences }
