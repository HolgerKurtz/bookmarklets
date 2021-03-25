let api_url = "";


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        console.log(request.url)
        fetch(request.url)
            .then(result => result.json())
            .then(data => console.log(data))
        return true;

    })


