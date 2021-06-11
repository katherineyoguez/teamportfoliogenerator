const Engineer = require("../lib/engineer.js");

describe("Engineer class", () => {
    describe("getGithub", () => {
        it("It should return their gitHub username", () =>{
            expect(new Engineer("email","name", 1 , "github").getGithub()).toBe("github")
        })
    })
    describe("getRole", () => {
        it("It should their role", () =>{
            expect(new Engineer("email", "name", 1 , "github").getRole()).toBe("Engineer")
        })
    })
})