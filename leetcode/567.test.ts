import { expect, test } from "bun:test"
import { checkInclusion } from "./567"

test("567. Check Inclusion", () => {
	expect(checkInclusion("ab", "eidbaooo")).toBeTrue()
	expect(checkInclusion("adc", "dcda")).toBeTrue()
})
