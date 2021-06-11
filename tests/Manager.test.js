const Manager = require("../lib/manager.js");

describe("Manager class", () => {
    describe("getOfficeNumber", () => {
        it("It should return their office number", () =>{
            expect(new Manager("email", "name", 1 , 0).getOfficeNumber()).toBe(0)
        })
    })
    describe("getRole", () => {
        it("It should their role", () =>{
            expect(new Manager("email", "name", 1 , 0).getRole()).toBe("Manager")
        })
    })
})