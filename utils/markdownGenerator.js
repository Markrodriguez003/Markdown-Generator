let fs = require("fs")

/* GRABS ALL USER .MD PREFERENCES AND CREATES .MD FILE */

function generate(markdown_data) {

    let x = formatter(markdown_data);
    fs.writeFile(`${markdown_data.title}-README.md`, x, (fail) => {
        if (fail) {
            throw ("ERROR GENERATING TEXT FILE!");
        }

        console.log(`${markdown_data.title}.md has been generated!`);
    });


} // eof generate();
function formatter(obj) {
    const repo = String(obj.githubRepo).replace(/\s/g, '');
    const profile = String(obj.profileUrl).replace(/\s/g, '');
    let obj_formatted =
        `# ${String(obj.title)} 
### Project Details: 
![Github-Img](${obj.profilePic})
* Author: ${String(obj.author)}  
* Author Github account: ${profile}
* Github Repo URL: ${repo}

> Installation: npm install ${String(obj.installation)}

> Description: ${String(obj.description)} 

> Contribution: ${obj.contribution} 

> Usage: ${obj.usage}  

> Test file: ${obj.test} 

> ![Badge-Img](https://img.shields.io/static/v1?label=<License>&message=<${String(obj.license)}>&color=<green>)
`;

    return obj_formatted;
}

exports.generate = generate;