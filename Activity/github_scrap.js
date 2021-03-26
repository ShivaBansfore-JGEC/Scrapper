let request = require("request");
let cheerio = require("cheerio");
let url = "https://github.com/topics";

request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractData(html);
    }
}
function extractData(html) {
    let selTool = cheerio.load(html);
    let topicsArr=selTool(".col-12.col-sm-6.col-md-4.mb-4 a");
    
    for(let i=0;i<topicsArr.length;i++){
        let link="https://github.com/"+selTool(topicsArr[i]).attr("href");
        processRepoPage(link);
    }
    
}

function  processRepoPage(url){
    request(url,cb);
    function cb(err,response,html){
        if(err){
            console.log(err);
        }else{
            getRepoLinks(html);
        }
    }
}

function getRepoLinks(html){
    let selTool=cheerio.load(html);
    let repoArr=selTool("a.text-bold");
    let topicName=selTool(".h1-mktg");
    let topic_name=selTool(topicName).text().trim();
    console.log(selTool(topicName).text());

    //creating a folder
    //createDir(topic_name);


    for(let i=0;i<repoArr.length;i++){
        let link=selTool(repoArr[i]).attr("href");
        console.log(link);
        if(i==7){
            break;
        }
    }
    console.log("----------------------------------------------");
    
}
