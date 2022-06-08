function stickynav(){
    let headerY = document.getElementById("name").offsetHeight;
    
    if (window.pageYOffset > headerY) {
        navBar.classList.add("sticky");
        document.getElementById("content").style.paddingTop = '40px';
      } else {
        navBar.classList.remove("sticky");
        document.getElementById("content").style.paddingTop = '0px';
      }
}

function loadAchievements(){
    dataLocation = '../Data/achievementsData.json';
    columns = Array("Year", "Award");
    tableID = "achievementTable";

    loadData(dataLocation, columns, tableID);
}

function loadNews(){
    dataLocation = '../Data/news.json';
    columns = Array("Date", "News");
    tableID = "newsTable";

    loadData(dataLocation, columns, tableID);
}

function loadJournalPublications(){
    dataLocation = '../Data/journalData.json';
    columns = Array("No.", "Title");
    tableID = "journalTable";

    loadPublicationData(dataLocation, columns, tableID);
}

function loadConferencePublications(){
    dataLocation = '../Data/conferenceData.json';
    columns = Array("No.", "Title");
    tableID = "conferenceTable";

    loadPublicationData(dataLocation, columns, tableID);
}

function loadSummaryPublications(){
    dataLocation = '../Data/journalData.json';
    columns = Array("Journal", "Count");
    tableID = "summaryTableJournal";

    loadSummaryData("Journal", dataLocation, columns, tableID);

    dataLocation = '../Data/conferenceData.json';
    columns = Array("Conference", "Count");
    tableID = "summaryTableConference";

    loadSummaryData("Conference", dataLocation, columns, tableID);
}

function loadSummaryData(type, dataLocation, columns, tableID){
    var pageRequest = new XMLHttpRequest();
    pageRequest.open('GET', dataLocation);
    
    pageRequest.onload = function () {
        var jsonTempContent = JSON.parse(pageRequest.responseText);
        var jsonContent = [];

        for(i=0; i < jsonTempContent.length; i++){
            ifOld = false;
            for(j=0; j < jsonContent.length; j++){
                if(jsonContent[j][type] == jsonTempContent[i]["Journal/Conference"]){
                    jsonContent[j]["Count"] += 1;
                    ifOld = true;
                    break;
                }
            }

            if (ifOld == false){
                if (type == "Journal"){
                    jsonContent.push(
                        {
                        "Journal": jsonTempContent[i]["Journal/Conference"], 
                        "Count": 1
                        }
                    );
                }
                if (type == "Conference"){
                    jsonContent.push(
                        {
                        "Conference": jsonTempContent[i]["Journal/Conference"], 
                        "Count": 1
                        }
                    );
                }

            }
        }

        htmlContent = makeHTMLTable(jsonContent, columns);
        document.getElementById(tableID).innerHTML = htmlContent;
    }

    pageRequest.send();
}

function loadPublicationData(dataLocation, columns, tableID){
    var pageRequest = new XMLHttpRequest();
    pageRequest.open('GET', dataLocation);
    
    pageRequest.onload = function () {
        var jsonContent = JSON.parse(pageRequest.responseText);

        for(i=0; i < jsonContent.length; i++){
            jsonContent[i]["Title"] = jsonContent[i]["Authors"] + ", \"<a href=" + jsonContent[i]["URL"] + " target=\"_blank\">" + jsonContent[i]["Title"] + "</a>\", <i>" + jsonContent[i]["Journal/Conference"] + "</i>, " + jsonContent[i]["Year"] + ".";
            jsonContent[i]["No."] = "["+ (i+1) + "]";
        }
        htmlContent = makeHTMLTable(jsonContent, columns);
        document.getElementById(tableID).innerHTML = htmlContent;
    }

    pageRequest.send();
}

function loadData(dataLocation, columns, tableID){
    var pageRequest = new XMLHttpRequest();
    pageRequest.open('GET', dataLocation);
    
    pageRequest.onload = function () {
        var jsonContent = JSON.parse(pageRequest.responseText);
        htmlContent = makeHTMLTable(jsonContent, columns);
        document.getElementById(tableID).innerHTML = htmlContent;
    }

    pageRequest.send();
}

function makeHTMLTable(jsonContent, columns){
    oddStyle = "style=\"background: #DDDDDD;\"";
    headStyle = "style=\"background: #DDDDDD;\""

    htmlTable = "<tr " + headStyle +  ">";
    for (j=0; j < columns.length; j++){
        htmlTable += "<th>" + columns[j] + "</th>";
    }  
    htmlTable += "</tr>";

    for (i=0; i < jsonContent.length; i++){
        if (i%2 == 0){
            htmlTable += "<tr>";
        } else {
            htmlTable += "<tr " + oddStyle + ">";
        }
        

        for (j=0; j < columns.length; j++){
            htmlTable += "<td>" + jsonContent[i][columns[j]] + "</td>";
        }        
        htmlTable += "</tr>";
    }

    return htmlTable;
}