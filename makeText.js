/** Command-line tool to generate Markov text. */

const fs = require("fs")
const markov = require("./markov")
const axios = require('axios')
const process = require('process')

function generateText(text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText())
}

function makeText(){
    fs.readFile(path,"utf8", function callback(error,data){
        if (error){
            console.error('Cannot read file')
            process.exit(1)
        }
        else{
            generateText(data)
        }
    })
}

async function makeURLText(url){
    let res;

    try {
        res = await axios.get(url);
    }
    catch(error){
        console.error('cannot read URL')
        process.exit(1)
    }
    generateText(res.data)
}

let type = process.argv[2]
let path = process.argv[3] 

if (type === "file"){
    makeText(path)
}
else if (type === "url"){
    makeURLText(path)
}
else{
    console.error("type has to be file or url")
    process.exit(1)
}