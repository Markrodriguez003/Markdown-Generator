let fs = require("fs")

/* GRABS ALL USER .MD PREFERENCES AND CREATES .MD FILE */

function generate (markdown_data){

    let x = formatter(markdown_data);
    fs.writeFile(`${markdown_data.title}-README.md`, x, (fail)=>{
        if(fail){
            throw ("ERROR GENERATING TEXT FILE!");
        } 

        console.log(`${markdown_data.title}.md has been generated!`);
    });

    
/*     console.log(markdown_data);
    console.log("-------------");
    console.log(markdown_data.author);
    console.log(markdown_data.title);
    console.log(markdown_data.description);
    console.log(markdown_data.githubEmail);
    console.log(markdown_data.githubRepo);
    console.log(markdown_data.usage);
    console.log(markdown_data.test);
    console.log(markdown_data.contribution);
    console.log(markdown_data.license); */

} // eof generate();

function formatter (obj){
    /* add mit copyright image here */
    let obj_formatted = 
`# ${String(obj.title)} 
### Project Details: 
* Author: ${String(obj.author)}  
* Github Author : ${String(obj.githubEmail)}
* Github Repo URL: ${String(obj.githubEmail)}

> Description: ${String(obj.description)} 
    
![Badge-Img](https://img.shields.io/static/v1?label=<Project>&message=<-Description>&color=<green>)
> License : ${String(obj.license)} 
`;

    return obj_formatted;
}

exports.generate = generate;