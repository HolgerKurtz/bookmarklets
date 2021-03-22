(function () {
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
})();