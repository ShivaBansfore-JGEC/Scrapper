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

    let teamNameArr=selTool(".Collapsible h5.header-title.label")
    let teamNameArray=[];
    for(let i=0;i<teamNameArr.length;i++){
        let teamName=selTool(teamNameArr[i]).text();
        teamName=teamName.split("INNINGS")[0];
        teamNameArray.push(teamName);
    
    }
    let batsManTable = selTool(".table.batsman");

    for(let i=0;i<batsManTable.length;i++){
        let batsmanNameElem=selTool(batsManTable[i]).find("tbody tr .batsman-cell")
        for(let j=0;j<batsmanNameElem.length;j++){
            let playerName=selTool(batsmanNameElem[j]).text();
            console.log(playerName,"plays for",teamNameArray[i]);
        }
    }
    

}