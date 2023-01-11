import { getNextDate, getPreviousDate, minimumUnitsToFormattedString, toMinimumUnits } from "../../utils/Utils"

describe("Utils methods", () => {
    describe("Dates methods", () => {
        const inputDate = "2021-01-22"

        it("getPreviousDate returns correct date", () => {
            const previousDate = getPreviousDate(new Date(inputDate))
            expect(inputDate).not.toEqual(previousDate)
            expect(previousDate).toEqual("2021-01-21")
        })

        it("getNextDate returns correct date", () => {
            const nextDate = getNextDate(new Date(inputDate))
            expect(inputDate).not.toEqual(nextDate)
            expect(nextDate).toEqual("2021-01-23")
        })
    })

    describe("minimumUnitsToFormattedString", ()=> {
        it("converts minimum unit amounts and displays them correctly", ()=> {
            expect(minimumUnitsToFormattedString(123456, 2)).toEqual("1,234.56");
        })
        it("handles zero precision nicely", ()=> {
            expect(minimumUnitsToFormattedString("123456", 0)).toEqual("123,456");
        })
    })
    
    describe("toMinimumUnits",()=>{
        it("converts string of amount in decimal form to minimum units string", ()=>{
            expect(toMinimumUnits("1234.56",2)).toEqual("123456");
        })
    })
    
})
