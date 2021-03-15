
let request=require("request");
let cheerio=require("cheerio");

let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
request(url,cb);

function cb(err,response,html){
    if(err){
        console.log(err);
    }else{
       // console.log(html);
       extractData(html);
    }
}

function extractData(html){
    let selcTool=cheerio.load(html);
    let commentaryArr=selcTool(".col-14.col-md-15.col-lg-14 .match-comment-long-text");
    let lbc=selcTool(commentaryArr[0]).text();
    console.log(lbc);
    
}