let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        extractData(html);
    }
}
function extractData(html) {
    let selTool = cheerio.load(html);

    let batsManTable = selTool(".col-md-8.col-16");
    for(let i=0;i<batsManTable.length;i++){
        let cardBtn=selTool(batsManTable[i]).find(".btn.btn-sm.btn-outline-dark.match-cta");
        let link="https://www.espncricinfo.com" +selTool(cardBtn[2]).attr("href");
        
        printBirthDay(link)
    }
}

function printBirthDay(link){
    request(link,cb);

    function cb(err,response,html){
        if(err){
            console.log(err);
        }else{
            extractBirthDay(html);
        }
    }
}
function extractBirthDay(html){
    let selTool=cheerio.load(html);
    let name=selTool(".best-player-name").text();
    let team=selTool(".best-player-team-name").text();
    console.log(name+" : "+team);

}