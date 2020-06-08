const inquirer = require(`inquirer`);
/* const api_caller = require("utils/api_caller.js");*/
const api_caller = require(`./utils/api_caller.js`);

/* Ctrl + Shift + [ <-- collapsables    CTRL+K+C comments */

/*  App -> index.js psuedo-code
    app_init() -->> Intro + app instructions 
                             * inquirer checkbox 
                                - instructions
                                - run markdown generator
                                - exit

    markdown_intializer() -->> Question carousel to fill in .MD file
                            * .MD preference questions. . . .
                                - Project title
                                - Project description
                                - Github user email/ accnt - > Github prompt -->> call api_caller function to grab user acct (profile pic, main github URL, repo URL, contributors?)
                                - Github repo URL   - > " " < The questions above ask if user wants to include profile pic
                                - Usage
                                - Test file names
                                - Contributing
                                - Project License 
           
    markdown_validator() -->> App prints all .MD user prompts and asks to confirm/validate choices
                            * inquirer checkbox(?) to give user a way to change certain prompts
                            * inquirer choice box to restart/clear entire .MD process/
                                - submit form -> Calls markdown-generator(completed_user_data)
                                - Restart form 
                                - Abort and to main menu 
*/
ascii_art_generator = {
    astk: "*",
    pipe: "|",
    underl: "_",

    bar: function () {
        console.log(this.underl.repeat(55));
        console.log(this.astk.repeat(55));
    }
};

function init() {
    ascii_art_generator.bar();
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'main_menu_choice',
                message: 'Welcome to Markdown-Generator. Please pick from the choices below',
                choices: ['Instructions', 'Generate .MD', "Exit"]
            },
        ])
        .then((response) => {
            if (response.main_menu_choice === "Instructions") {
                instructions();
            } else if (response.main_menu_choice === "Generate .MD") {
                console.log("generating");
                markdown_config();
            } else {
                console.log("Exiting . . . ");
            }
        })
        .catch((err) => {
            console.log("Error -->> Main Menu choice error");
        })
}

function instructions() {
    console.log(`
    <What is a markdown file (.md) and why use it?>

    This CLI app will guide you to create your own project markdown file (.MD). Markdown files
    are files that contains "readme" style sections that help describe the many facets of your application/project, from
    use case scenarios, app instructions, app description, author information, external help/github links and more!
    Markdown files are created using plaintext, can be converted to HTML and can be read everywhere on any device.

    <Ok, I got you! So how do I use this CLI app to generate my own markdown file?>

    To get started, press "Generate .MD" in the main menu and answer the prompts to fill in your created markdown file.
    After finishing the prompts, a screen will display all of your inputs in which you can verify and accept to generate 
    your file. Likewise, if you want to go back and edit some of your inputs just click on the "Edit my inputs" and the app 
    will give you the opportunity to go back, by prompt, and re-enter your modified input. Once you revised and finalized your
    markdown file select "Generate markdown" and your markdown file will generate! Your file will generate in the same 
    directory as the CLI app.  

    If you have any questions, concerns or suggestions please contact me at <markrodriguez003@gmail.com> and thanks for
    using the markdown generator!
    `);

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'resp',
                choices: ['Main menu', "Exit"]
            },
        ])
        .then((response) => {
            console.log(` You picked: ${response.resp}`);
            if (response.resp === "Main menu") {
                init();
            } else if (response.resp === "Exit") {
                console.log("Exiting . . . ");
            } else {
                console.log("Error");
            }
        })
        .catch((err) => {
            console.log("Error -->> Instructions menu choice error");
        })
}

function markdown_config() {
    questions = [
        "Author [firstName lastName <user@email.com>]",
        "Project title [My Project]:",
        "Project description [Short Description here]:",
        "Github user email [github.com/userNameHere1234]:",
        "Github repo URL [github.com/yourProjectHere]:",
        "Installation [ npm - ???]",
        "Usage:",
        "Test file:",
        "Contributing:",
        "Project License [MIT, LGPL, Proprietary, ect]:",
    ];

    inquirer
        .prompt([
            {
                name: 'author',
                message: questions[0],
            },
            {
                name: 'title',
                message: questions[1],
            },
            {
                name: 'description',
                message: questions[2],
            },
            {
                name: 'githubEmail',
                message: questions[3],
            },
            {
                name: 'githubRepo',
                message: questions[4],
            },
            {
                name: 'installation',
                message: questions[5],
            },
            {
                name: 'usage',
                message: questions[6],
            },
            {
                name: 'test',
                message: questions[7],
                default: "test.js"
            },
            {
                name: 'contribution',
                message: questions[8],

            },
            {
                name: 'license',
                message: questions[9],
                default: "MIT"
            },
        ])
        .then(answers => {

            confirmation_prompt(answers);

        }).catch(err => {
            console.log(err);
        });


} // eof markdown_config
function confirmation_prompt(data) {

    console.log("Preconfig .md file:");
    console.log(data);
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'redo_menu_choice',
                choices: ['Re-do Markdown Config', "Generate .MD", "Exit"]
            },
        ])
        .then((response) => {
            if (response.redo_menu_choice === "Re-do Markdown Config") {
                md_check(data);
            } else if (response.redo_menu_choice === "Generate .MD") {
                console.log("generating");
                api_caller.api_request(data)
                 
            } else {
                console.log("Exiting . . . ");
            }
        })
        .catch((err) => {
            console.log(err);
            console.log("Error -->> Confirmation-Prompt Menu choice error");
        })
}


function md_check(data) {
    inquirer
        .prompt([
            {
                name: 'author',
                message: questions[0],
                default: String(data.author)
            },
            {
                name: 'title',
                message: questions[1],
                default: String(data.title)
            },
            {
                name: 'description',
                message: questions[2],
                default: String(data.description)
            },
            {
                name: 'githubEmail',
                message: questions[3],
                default: String(data.githubEmail)
            },
            {
                name: 'githubRepo',
                message: questions[4],
                default: String(data.githubRepo)
            },
            {
                name: 'installation',
                message: questions[5],
                default: String(data.installation)
            },
            {
                name: 'usage',
                message: questions[6],
                default: String(data.usage)
            },
            {
                name: 'test',
                message: questions[7],
                default: String(data.test)
            },
            {
                name: 'contribution',
                message: questions[8],
                default: String(data.contribution)
            },
            {
                name: 'license',
                message: questions[9],
                default: String(data.license)
            },
        ])
        .then(answers => {
            confirmation_prompt(answers);

        }).catch(err => {
            console.log(err);
        });
}

init(); // Start of CLI APP




