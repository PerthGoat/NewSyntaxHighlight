
interface Parse_Result {
	value : string;
	grouped : boolean;
}

/*
* Parse routine
* holds a regex and a replacement
*/
interface Parse_Routine {
	reg: RegExp;
	replacement : string;
}

function parseSingleResult(s : string, r : RegExp, replacement : string) : Parse_Result[] {
	let match_len : number = s.match(r)[0].length;

	let str1 : string = s.slice(0,s.search(r));
	let str2 : string = s.slice(s.search(r), s.search(r) + match_len).replace(r, replacement);
	let str3 : string = s.slice(s.search(r) + match_len);

	let strarr : Parse_Result[] = [{value: str1, grouped: false}, {value: str2, grouped: true}, {value: str3, grouped: false}];
	
	return strarr;
}

/*
* Takes a snippet
* Returns the snippet parsed
*/
function parseSnippet(results : Parse_Result[], r : RegExp, replacement : string) : Parse_Result[] {
	
	if(results.length == 1) {
		results = parseSingleResult(results[0].value, r, replacement);
	}
	
	for(let i : number = 0;i < results.length;i++) {
		if(results[i].grouped == false && results[i].value.search(r) != -1) {
			let new_results : Parse_Result[] = parseSingleResult(results[i].value, r, replacement);
			results = results.slice(0, 2);
			return results.concat(parseSnippet(new_results, r, replacement));
		}
	}
	
	return results;
}



//let code_snippets : HTMLCollectionOf<Element> = document.getElementsByClassName("code");

//parseSnippet(code_snippets[0].innerHTML);

//let r : RegExp = new RegExp("(class)");
//let r : RegExp = new RegExp("(public)");


//let results : Parse_Result[] = parseSnippet([{value: code_snippets[0].innerHTML, grouped: false}], r, "<span>$1</span>");

//console.log(results);