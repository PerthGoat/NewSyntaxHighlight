function parseSingleResult(s, r, replacement) {
    var match_len = s.match(r)[0].length;
    var str1 = s.slice(0, s.search(r));
    var str2 = s.slice(s.search(r), s.search(r) + match_len).replace(r, replacement);
    var str3 = s.slice(s.search(r) + match_len);
    var strarr = [{ value: str1, grouped: false }, { value: str2, grouped: true }, { value: str3, grouped: false }];
    return strarr;
}
/*
* Takes a snippet
* Returns the snippet parsed
*/
function parseSnippet(results, r, replacement) {
    if (results.length == 1) {
        results = parseSingleResult(results[0].value, r, replacement);
    }
    for (var i = 0; i < results.length; i++) {
        if (results[i].grouped == false && results[i].value.search(r) != -1) {
            var new_results = parseSingleResult(results[i].value, r, replacement);
            results = results.slice(0, 2);
            return results.concat(parseSnippet(new_results, r, replacement));
        }
    }
    return results;
}
var code_snippets = document.getElementsByClassName("code");
//parseSnippet(code_snippets[0].innerHTML);
//let r : RegExp = new RegExp("(class)");
var r = new RegExp("(public)");
var results = parseSnippet([{ value: code_snippets[0].innerHTML, grouped: false }], r, "<span>$1</span>");
console.log(results);
