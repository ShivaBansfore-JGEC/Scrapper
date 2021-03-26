let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
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

    let batsManTable = selTool(".table.batsman");

    for(let i=0;i<batsManTable.length;i++){
        let batsmanNameElem=selTool(batsManTable[i]).find("tbody tr .batsman-cell")
        for(let j=0;j<batsmanNameElem.length;j++){
            let link=selTool(batsmanNameElem[j]).attr("href");
            let name=selTool(batsmanNameElem[j]).text();
            printBirthDay(name,link);
        }
    }
    

}

function printBirthDay(name,link){
    request(link,cb);

    function cb(err,response,html){
        if(err){
            console.log(err);
        }else{
            extractBirthDay(name,html);
        }
    }
}
function extractBirthDay(name,html){
    let selTool=cheerio.load(html);
    let birthDayelem=selTool(".ciPlayerinformationtxt span");
    let birthday=selTool(birthDayelem[1]).text();
    console.log(name+" was born on "+birthday);
}