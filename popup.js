
let seoButton = document.getElementById("seoButton");

chrome.storage.local.get(['key'], function (result) {
    createTable(result.key);
});

chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    url_txt = document.getElementById("url");
    url_txt.innerText = url;
    // use `url` here inside the callback because it's asynchronous!
});

seoButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: addSeoTags
    });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: sistrix
    });
});

function sistrix() {    // sistrix part

    // get url and api key
    var api_key = prompt("Your SISTRIX API KEY");
    var url = "&url=" + window.location.href;
    var query = "https://api.sistrix.com/keyword.domain.seo?api_key=";
    var search = "&date=now&num=5&format=json"
    var api_url = query + api_key + url + search;
    console.log(api_url);

    // handle cors needs klick on url
    let corsUrl = "https://cors-anywhere.herokuapp.com/" + api_url;
    console.log(corsUrl);

    // fetching data and preparing json
    async function fetchSistrixJSON() {
        const response = await fetch(corsUrl);
        const json = await response.json();
        console.log(json);
        const sisData = json.answer[0].result;
        return sisData;
    }

    fetchSistrixJSON()
        .then(sisData => {
            console.log(sisData);
            kwList = [];
            positionList = [];
            trafficList = [];
            sistrixObject = {};
            for (keyword of sisData) {
                kwList.push(keyword.kw);
                positionList.push(keyword.position);
                trafficList.push(keyword.traffic);
            }
            sistrixObject["keyword"] = kwList;
            sistrixObject["position"] = positionList;
            sistrixObject["traffic"] = trafficList;
            return sistrixObject;
        })
        .then(sistrixObject => {
            // show data in popup
            chrome.storage.local.set({ key: sistrixObject }, function () {
            });
        });
}

function addSeoTags() {
    console.log("SEO BUTTON CLICKED");
    var meta_info = {};
    let tag = ['title', 'h1', 'h2', 'h3', 'p', 'ul', 'ol', 'li'];

    for (var i = 0; i < tag.length; i++) {
        var elts = document.getElementsByTagName(tag[i]);
        var list = [];
        for (var x = 0; x < elts.length; x++) {
            list.push(elts[x].innerText);
            elts[x].innerHTML += " (" + tag[i] + ")";
        }
        meta_info[tag[i]] = list;
    }

    var meta = document.getElementsByTagName("meta");

    for (var y = 0; y < 10; y++) {
        if (typeof meta[y] !== "undefined") {
            meta_info[meta[y].name] = meta[y].content;
        }

    }
    console.log(meta_info);
};
function createTable(resultKey) {
    console.log(resultKey);
    let table = document.querySelector("table");
    console.log(table);
    // https://www.valentinog.com/blog/html-table/


    function createTableHead() {
        let row = table.insertRow();
        let keys = Object.keys(resultKey);

        for (let key of keys) {
            let tableHead = table.createTHead();
            let th = document.createElement('th');
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
            let seoData = resultKey[key];

            for (let data of seoData) {
                let cell = row.insertCell();
                let text = document.createTextNode(data);
                cell.appendChild(text);

            }
            row = table.insertRow();
        }
    }
    createTableHead();


}