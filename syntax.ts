
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

class Syntax_Highlighter {

	private parseRoutines : Parse_Routine[];

	constructor(routines : Parse_Routine[]) {
		this.parseRoutines = routines;
	}

	private parseSingleResult(s : string, r : RegExp, replacement : string) : Parse_Result[] {
		if(s.match(r) == null) {
			return [{value: s, grouped: false}];
		}
		
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
	private parseSnippet(results : Parse_Result[], r : RegExp, replacement : string) : Parse_Result[] {
		
		if(results.length == 1) {
			results = this.parseSingleResult(results[0].value, r, replacement);
		}
		
		for(let i : number = 0;i < results.length;i++) {
			if(results[i].grouped == false && results[i].value.search(r) != -1) {
				let new_results : Parse_Result[] = this.parseSingleResult(results[i].value, r, replacement);
				results.splice(i, 1, ...this.parseSnippet(new_results, r, replacement));
			}
		}
		
		return results;
	}

	private parseAllRoutines(s : string, routines : Parse_Routine[]) : string {
		let results : Parse_Result[] = [{value: s, grouped: false}];
		for(let i : number = 0;i < routines.length;i++) {
			results = this.parseSnippet(results, routines[i].reg, routines[i].replacement);
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
	private static entityMap = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#39;',
	  '/': '&#x2F;',
	  '`': '&#x60;',
	  '=': '&#x3D;'
	};

	private escapeHtml(string) : string {
		return String(string).replace(/[&<>"'`=\/]/g, function (s) {
			return Syntax_Highlighter.entityMap[s];
		});
	}

	public parseAllSnippets() {
		let code_snippets : HTMLCollectionOf<Element> = document.getElementsByClassName("code");

		for(let i = 0;i < code_snippets.length;i++) {
			let escaped : string = this.escapeHtml(code_snippets[i].innerHTML);
			let t : string = this.parseAllRoutines(escaped, this.parseRoutines);

			let pre = document.createElement("pre");

			pre.innerHTML = t;

			code_snippets[i].parentNode.appendChild(pre);
		}
		
		let len : number = code_snippets.length;
		
		for(let i = 0;i < len;i++) { // cleanup
			code_snippets[0].parentNode.removeChild(code_snippets[0]);
		}
	}

}