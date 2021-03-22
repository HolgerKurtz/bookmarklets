(function () {
    let tag = ['h1', 'h2', 'h3', 'p', 'ul', 'ol', 'li'];
    console.log(tag);
    for (var i = 0; i < tag.length; i++) {
        var elts = document.getElementsByTagName(tag[i]);

        for (var x = 0; x < elts.length; x++) {
            elts[x].innerHTML += " (" + tag[i] + ")"
        }
    }

    var meta = document.getElementsByTagName("meta");
    var meta_info;
    for (var y = 0; y < 10; y++) {
        meta_info += meta[y].name + " : " + meta[y].content;
    }
    console.log(meta_info);
})();