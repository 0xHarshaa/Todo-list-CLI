const { Command } = require("commander");
const program = new Command();
const fs = require("fs");
const prompt = require("prompt-sync")();

program
    .name("todo")
    .description("create a todo list, add and delete stuff from it, etc.")
    .version("0.8.0");

program.command("todolist")
    .description("create todo list by adding and deleting todos")
    .argument("str", "string") 
    .option("-a, --add", "adding todo")  
    .option("-d, --delete", "delete todo")  
    .option("-m, --markdone", "mark todo as done")  
    .action((string, options) => {
        if (options.add){
            fs.readFile("a.txt", "utf-8", function(err,data){
                if (err){
                    console.log("there was an error reading the file: ", err);
                }
                else{
                    let toaddarr = data.split(/\s+/);
                    toaddarr.push(string);
                    let newtodo = toaddarr.join(" ");

                    fs.writeFile("a.txt", newtodo, (err) => {
                        if (err) throw err;
                    });
                }
            });
        }
        else if (options.delete){
            fs.readFile("a.txt", "utf-8", function(err,data){
                if (err){
                    console.log("there was an error reading the file: ", err);
                }
                else{
                    console.log("which todo to delete?: " ,data);
                    const todelete = parseInt(prompt("Enter todo no: "));

                    let afterdeleting = data.split(/\s+/).splice(todelete - 1, 1).join(" ");

                    fs.writeFile("a.txt", afterdeleting, (err) => {
                        if (err){
                            console.log("there was error writing your content to the file");
                        }
                    });
                }
            })
        }
        else if (options.markdone){
            fs.readFile("a.txt", "utf-8", function(err,data){
                if (err){
                    console.log("there was an error reading the file: ", err);
                }
                else{
                    console.log("which todo to markdone?: " ,data);
                    const tomarkdone = parseInt(prompt("Enter todo no: "));

                    let aftermarkdoing = data.split(/\s+/);
                    aftermarkdoing[tomarkdone - 1] += " (done)";
                    let aftermarkdone = aftermarkdoing.join(" ");

                    fs.writeFile("a.txt", aftermarkdone, (err) => {
                        if (err){
                            console.log("there was a problem writing to your file");
                        }
                    });
                }
            });    
        }
    });
    
program.parse();

