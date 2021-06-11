const Employee = require("../lib/employee.js");

describe("Employee class", () => {
    describe("getName", () => {
        it("It should return the name", () =>{
            expect(new Employee("name", 1 , "email").getName()).toBe("name")
        })
    })
    describe("getId", () => {
        it("It should return the id", () =>{
            expect(new Employee("name", 1 , "email").getId()).toBe(1)
        })
    })
    describe("getEmail", () => {
        it("It should return their email", () =>{
            expect(new Employee("name", 1 , "email").getEmail()).toBe("email")
        })
    })
    describe("getRole", () => {
        it("It should their role", () =>{
            expect(new Employee("name", 1 , "email").getRole()).toBe("Employee")
        })
    })
})