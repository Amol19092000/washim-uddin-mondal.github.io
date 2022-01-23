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

function loadJournalPublications(){
    dataLocation = '../Data/journalData.json';
    columns = Array("Year", "Title");
    tableID = "journalTable";

    loadPublicationData(dataLocation, columns, tableID);
}

function loadConferencePublications(){
    dataLocation = '../Data/conferenceData.json';
    columns = Array("Year", "Title");
    tableID = "conferenceTable";

    loadPublicationData(dataLocation, columns, tableID);
}

function loadPublicationData(dataLocation, columns, tableID){
    var pageRequest = new XMLHttpRequest();
    pageRequest.open('GET', dataLocation);
    
    pageRequest.onload = function () {
        var jsonContent = JSON.parse(pageRequest.responseText);

        for(i=0; i < jsonContent.length; i++){
            jsonContent[i]["Title"] = jsonContent[i]["Authors"] + ", <a href=" + jsonContent[i]["URL"] + " target=\"_blank\">\"" + jsonContent[i]["Title"] + "</a>\", <i>" + jsonContent[i]["Journal/Conference"] + "</i>.";
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