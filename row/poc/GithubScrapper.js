let request = require("request");
let cheerio = require("cheerio");
let url = "https://github.com/topics";
let fs=require("fs");
let path=require("path");
const { createInflate } = require("zlib");
let PDFDocument = require('pdfkit');
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
   // console.log(selTool(topicName).text());

    //creating a folder
    createDir(topic_name);


    for(let i=0;i<repoArr.length;i++){
        let link=selTool(repoArr[i]).attr("href");
        let repo_name=link.split("/").pop();
        repo_name=repo_name.trim();
        //console.log(repo_name);
        let full_link="https://github.com/"+link;
       // createFile(repo_name,topic_name);
        go_to_issuePage(full_link,topic_name,repo_name);
        if(i==7){
            break;
        }
    }
   // console.log("----------------------------------------------");
    
}

function createDir(topic_name){
    let folder_path=path.join(__dirname,topic_name);
    if(fs.existsSync(folder_path)==false){
        fs.mkdirSync(folder_path);
    }
}


function createFile(repo_name,topic_name){
    let path_of_file=path.join(__dirname,topic_name,repo_name+".json");
    if(fs.existsSync(path_of_file)==false){
        let createStream = fs.createWriteStream(path_of_file);
        createStream.end();
    }
}


function go_to_issuePage(link,folder_name,file_name){
    request(link,cb);
    function cb(err,resp,html){
        if(err){
            console.log(err);
        }else{
            extractIssuesLink(html,folder_name,file_name);
        }
    }
}

function extractIssuesLink(html,folder_name,file_name){
    let selTool=cheerio.load(html);
    let issueArr=selTool(".js-selected-navigation-item.UnderlineNav-item.hx_underlinenav-item.no-wrap.js-responsive-underlinenav-item");
    let issue_link="https://github.com/"+selTool(issueArr[1]).attr("href");
    //console.log(issue_link);
    getIssues(issue_link,folder_name,file_name)
    
}


function getIssues(link,folder_name,file_name){
    request(link,cb);
    function cb(err,resp,html){
        if(err){
            console.log(err);
        }else{
            extraxtIssue(html,folder_name,file_name);
        }
    }
}

function extraxtIssue(html,folder_name,file_name){
    let selTool =cheerio.load(html);
    let Issues_AncrArr=selTool("a.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let issue_array=[];
    for(let i=0;i<Issues_AncrArr.length;i++){
        let issue_name=selTool(Issues_AncrArr[i]).text();
        let issue_link=selTool(Issues_AncrArr[i]).attr("href");
        issue_array.push({
            issuename:issue_name,
            issue_link:"https://github.com/"+issue_link
        });
    }

    let file_path=path.join(__dirname,folder_name,file_name+".pdf");
    //fs.writeFileSync(file_path,JSON.stringify(issue_array));
    let pdfDoc = new PDFDocument;
    pdfDoc.pipe(fs.createWriteStream(file_path));
    pdfDoc.text(JSON.stringify(issue_array),{align : 'center'});

    //pdfDoc.fillColor('red').fontSize(17).text("20%", 305, 150);

    pdfDoc.end();
}