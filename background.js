chrome.runtime.onStartup.addListener(function () {
    chrome.storage.local.clear(function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
})

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request)
    })


