const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');
const filePathHtmlGenerate = './dist/TeamProfile.html'

let teamMembers = [];
inquirer
  .prompt([
      {
        name:"managerName",
        type:"input",
        message:"What is the team manager's name?",
      },
      {
        name:"managerID",
        type:"input",
        message:"WHat is the team manager's employee ID?",
      },
      {
        name:"managerEmail",
        type:"input",
        message:"What is the team manager's email?",
      },
      {
        name:"managerOfficeNumber",
        type:"input",
        message:"What is the team manager's office number?",
      },
      {
          name:"additionalTeamMember",
          type:"list",
          message: "Select team members to add",
          choices:["Engineer", "Intern"]
      },
  ])
  .then(answers => {
    //create manager
    let manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOfficeNumber);
    //add manager to global team members object
    teamMembers.push(manager);
    //evaluate additional team members options
    addedTeamMembers(answers.additionalTeamMember);
  })
  .catch(error => {
      //boiler plate error handling from inquire
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });


function addEngineer()
{
inquirer
.prompt([
    //declaring my list of questions here
    {
        name:"engineerName",
        type:"input",
        message:"What is the engineer's name?",
    },
    {
        name:"engineerID",
        type:"input",
        message:"What is the engineer's employee ID?",
    },
    {
        name:"engineerEmail",
        type:"input",
        message:"What is the engineer's email?",
    },
    {
        name:"engineerGithub",
        type:"input",
        message:"What is the engineer's github username?",
    },
    {
        name:"additionalTeamMember",
        type:"list",
        message: "Select team members to add or choose Create Team when you are completed.",
        choices:["Engineer", "Intern", "Create Team"]
    },
])
.then(answers => {
    //create new intern
    let engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
    //add to global array
    teamMembers.push(engineer);
    //evaluate additional team member
    addedTeamMembers(answers.additionalTeamMember);
})
.catch(error => {
    //boiler plate error handling from inquire
    if(error.isTtyError) {
    // Prompt couldn't be rendered in the current environment
    } else {
    // Something else went wrong
    }
});
}

//call this as many times as interns need to be added
function addIntern()
{
inquirer
.prompt([
    //declaring my list of questions here
    {
        name:"internName",
        type:"input",
        message:"What is the intern's name?",
    },
    {
        name:"internID",
        type:"input",
        message:"What is the intern's employee ID?",
    },
    {
        name:"internEmail",
        type:"input",
        message:"What is the intern's email?",
    },
    {
        name:"internSchool",
        type:"input",
        message:"What school did/does the intern attend?",
    },
    {
        name:"additionalTeamMember",
        type:"list",
        message: "Select team members to add or choose Create Team when you are completed.",
        choices:["Engineer", "Intern", "Create Team"]
    },
])
.then(answers => {
    //create new intern
    let intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
    //add to global array
    teamMembers.push(intern);
    //evaluate additional team member
    addedTeamMembers(answers.additionalTeamMember);

})
.catch(error => {
    //boiler plate error handling from inquire
    if(error.isTtyError) {
    // Prompt couldn't be rendered in the current environment
    } else {
    // Something else went wrong
    }
});
}

function addedTeamMembers(result)
{
    if(result === "Engineer")
    {
        //call add engineer prompts
        addEngineer();
    }else if(result === "Intern")
    {
        //call add intern prompts
        addIntern();
    }else
    {
        //finish with asking prompts and generate html
        generateHTML();
    }
}

function generateInitialHTML()
{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile</title>
        <link rel="stylesheet" href="./teamProfile.css">
    </head>
    <body>
        <div class="teamNavBar">
            <h1 class="navBarTitle">My Team</h2>
        </div>
        <div class="cardBody">`
}

function generateTeamMemberHtml(teamMember)
{
    return `        <div class="teamMemberCard">
    <div class="teamMemberTitle">
        <h3>${teamMember.getName()} - ${teamMember.getRole()}</h3>
    </div>
    <div class="teamMemberBody">
        <ul>
            <li>ID:${teamMember.getId()}</li>
            <li>Email: <a href="mailto:${teamMember.getEmail()}">${teamMember.getEmail()}</a></li>
            ${teamMember.getRoleHtml()}
        </ul>
    </div>
</div>`;
}

function generateFinalHtml()
{
    return `    </div>
    </body>
    </html>`;
}

//loop through team members array and generate html
function generateHTML()
{
    //first create new file (overwrite existing if file exists)
    fs.writeFileSync(filePathHtmlGenerate,"");
    //setup string to hold generated html
    let htmlData = generateInitialHTML();
    //loop through team members
    for(var a in teamMembers)
    {
        htmlData += generateTeamMemberHtml(teamMembers[a]);
    }
    //add final html to data
    htmlData += generateFinalHtml();
    //write data to file
    fs.writeFileSync(filePathHtmlGenerate,htmlData);
}