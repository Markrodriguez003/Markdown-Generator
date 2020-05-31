const inquirer = require("inquirer");
const api_caller = require("utils/api_caller.js");
const markdownGenerator = require("utils/markdownGenerator.js");

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

function init() {
    inquirer
        .prompt([
           console.log("Can you see me? Y/N")
        ])
        .then(answers => {
            // Use user feedback for... whatever!!
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });

}

init();



