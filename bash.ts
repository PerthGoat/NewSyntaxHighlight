/// <reference path='syntax.ts'/>

let parseRoutines : Parse_Routine[] = new Array();

parseRoutines.push({reg : new RegExp("(^\\s*)(#.*)", "m"), replacement : "$1<span class='bash_comment'>$2</span>"});
parseRoutines.push({reg : new RegExp("\\$\\((.*)\\)"), replacement : "<span class='bash_shell'>$($1)</span>"});
parseRoutines.push({reg : new RegExp("\\$\\{(.*)\\}"), replacement : "<span class='bash_shell'>${$1}</span>"});
parseRoutines.push({reg : new RegExp("&quot;(.*)&quot;"), replacement : "<span class='bash_string'>&quot;$1&quot;</span>"});
parseRoutines.push({reg : new RegExp("(for)"), replacement : "<span class='bash_loop'>$1</span>"});
parseRoutines.push({reg : new RegExp("(in)"), replacement : "<span class='bash_in'>$1</span>"});
parseRoutines.push({reg : new RegExp("(done)"), replacement : "<span class='bash_done'>$1</span>"});
parseRoutines.push({reg : new RegExp("(do)"), replacement : "<span class='bash_do'>$1</span>"});
parseRoutines.push({reg : new RegExp("(cd|cp|rm|mkdir|shnsplit|ffmpeg|cowsay|lolcat)"), replacement : "<span class='bash_common_program'>$1</span>"});
parseRoutines.push({reg : new RegExp("(done)"), replacement : "<span class='bash_done'>$1</span>"});
parseRoutines.push({reg : new RegExp("\\b(\\d+)(?!;)\\b"), replacement : "<span class='bash_number'>$1</span>"});
parseRoutines.push({reg : new RegExp("\\.(\\d+)"), replacement : "<span>.</span><span class='bash_number'>$1</span>"});
parseRoutines.push({reg : new RegExp(" (-?)(\\d+)"), replacement : "<span> $1</span><span class='bash_number'>$2</span>"});

let highlighter : Syntax_Highlighter = new Syntax_Highlighter(parseRoutines);

highlighter.parseAllSnippets();