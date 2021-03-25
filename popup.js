
let seoButton = document.getElementById("seoButton");

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
    var api_key = prompt("Your SISTRIX API KEY");
    var url = "&url=" + window.location.href;
    var query = "https://api.sistrix.com/keyword.domain.seo?api_key=";
    var search = "&date=now&num=5&format=json"
    var api_url = query + api_key + url + search;
    console.log(api_url);
    chrome.runtime.sendMessage({ url: api_url }, function (response) {
        console.log(response);
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