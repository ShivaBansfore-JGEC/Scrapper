
let request=require("request");
let cheerio=require("cheerio");
request("https://www.google.com",cb);

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
    let ele=selcTool("#logo");
    console.log(ele.text());
    //console.log(ele.html());
}