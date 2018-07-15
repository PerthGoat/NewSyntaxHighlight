
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
			results.splice(i, 1, ...parseSnippet(new_results, r, replacement));
		}
	}
	
	return results;
}

function parseAllRoutines(s : string, routines : Parse_Routine[]) : string {
	let results : Parse_Result[] = [{value: s, grouped: false}];
	for(let i : number = 0;i < routines.length;i++) {
		results = parseSnippet(results, routines[i].reg, routines[i].replacement);
	}
	
	// join all of the results into a friendly routine
	
	let str : string = "";
	
	for(let i : number = 0;i < results.length;i++) {
		str += results[i].value;
	}
	
	return str;
}

/*
* Function to escape html brackets so it doesn't interfere with the pre tag
*/
var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml(string) : string {
	return String(string).replace(/[&<>"'`=\/]/g, function (s) {
		return entityMap[s];
	});
}

function parseAllSnippets() {
	let code_snippets : HTMLCollectionOf<Element> = document.getElementsByClassName("code");

	for(let i = 0;i < code_snippets.length;i++) {
		let escaped : string = escapeHtml(code_snippets[i].innerHTML);
		let t : string = parseAllRoutines(escaped, parseRoutines);

		let pre = document.createElement("pre");

		pre.innerHTML = t;

		code_snippets[i].parentNode.appendChild(pre);
		code_snippets[i].parentNode.removeChild(code_snippets[i]);
	}
}

let parseRoutines : Parse_Routine[] = new Array();

parseRoutines.push({reg : new RegExp("(&#x2F;&#x2F;&#x2F;.*)"), replacement : "<span class='typescript_reference'>$1</span>"});
parseRoutines.push({reg : new RegExp("(&#x2F;&#x2F;.*)"), replacement : "<span class='typescript_comment'>$1</span>"});
parseRoutines.push({reg : new RegExp("(&#x2F;\\*[^*]*\\*+(?:[^&#x2F;*][^*]*\\*+)*&#x2F;)"), replacement : "<span class='typescript_multi_comment'>$1</span>"});
parseRoutines.push({reg : new RegExp("(Vector3|number)"), replacement : "<span class='typescript_type'>$1</span>"});
parseRoutines.push({reg : new RegExp("(class)"), replacement : "<span class='typescript_class'>$1</span>"});
parseRoutines.push({reg : new RegExp("(return)"), replacement : "<span class='typescript_return'>$1</span>"});
parseRoutines.push({reg : new RegExp("(if)"), replacement : "<span class='typescript_condition'>$1</span>"});
parseRoutines.push({reg : new RegExp("(else)"), replacement : "<span class='typescript_condition'>$1</span>"});
parseRoutines.push({reg : new RegExp("(undefined)"), replacement : "<span class='typescript_undefined'>$1</span>"});
parseRoutines.push({reg : new RegExp("(interface)"), replacement : "<span class='typescript_interface'>$1</span>"});
parseRoutines.push({reg : new RegExp("(enum)"), replacement : "<span class='typescript_enum'>$1</span>"});
parseRoutines.push({reg : new RegExp("(\\b(?<![A-Za-z])\\d+([.]\\d+)?)"), replacement : "<span class='typescript_number'>$1</span>"});
parseRoutines.push({reg : new RegExp("(static)"), replacement : "<span class='typescript_static'>$1</span>"});
parseRoutines.push({reg : new RegExp("(let)"), replacement : "<span class='typescript_variable'>$1</span>"});
parseRoutines.push({reg : new RegExp("(public)"), replacement : "<span class='typescript_public'>$1</span>"});
parseRoutines.push({reg : new RegExp("(constructor)"), replacement : "<span class='typescript_constructor'>$1</span>"});

parseAllSnippets();