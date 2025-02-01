import { expect, test } from "bun:test"
import { MyCalendar } from "./729"

// TODO: Skipping these tests for now because we haven't worked on this yet
test.skip("729. My Calendar 1", () => {
	const myCalendar = new MyCalendar()
	expect(myCalendar.book(10, 20)).toBeTrue()
	expect(myCalendar.book(15, 25)).toBeFalse()
	expect(myCalendar.book(20, 30)).toBeTrue()

	const anotherCalendar = new MyCalendar()
	expect(anotherCalendar.book(47, 50)).toBeTrue()
	expect(anotherCalendar.book(33, 41)).toBeTrue()
})
