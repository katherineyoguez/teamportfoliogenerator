const Intern = require("../lib/intern.js");

describe("Intern class", () => {
    describe("getSchool", () => {
        it("It should return their school name", () =>{
            expect(new Intern("email","name", 1 , "school").getSchool()).toBe("school")
        })
    })
    describe("getRole", () => {
        it("It should their role", () =>{
            expect(new Intern("email", "name", 1 , "school").getRole()).toBe("Intern")
        })
    })
})