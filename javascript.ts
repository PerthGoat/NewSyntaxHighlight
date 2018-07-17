/// <reference path='syntax.ts'/>

let parseRoutines : Parse_Routine[] = new Array();

parseRoutines.push({reg : new RegExp("(&#x2F;&#x2F;.*)"), replacement : "<span class='javascript_comment'>$1</span>"});
parseRoutines.push({reg : new RegExp("(&#x2F;\\*[^*]*\\*+(?:[^&#x2F;*][^*]*\\*+)*&#x2F;)"), replacement : "<span class='javascript_multi_comment'>$1</span>"});
parseRoutines.push({reg : new RegExp("(var)"), replacement : "<span class='javascript_type'>$1</span>"});
parseRoutines.push({reg : new RegExp("(return)"), replacement : "<span class='javascript_return'>$1</span>"});
parseRoutines.push({reg : new RegExp("(if|for|else)"), replacement : "<span class='javascript_condition'>$1</span>"});
parseRoutines.push({reg : new RegExp("(undefined)"), replacement : "<span class='javascript_undefined'>$1</span>"});
parseRoutines.push({reg : new RegExp("(case)"), replacement : "<span class='javascript_case'>$1</span>"});
parseRoutines.push({reg : new RegExp("(break)"), replacement : "<span class='javascript_break'>$1</span>"});
parseRoutines.push({reg : new RegExp("(function)"), replacement : "<span class='javascript_function'>$1</span>"});
parseRoutines.push({reg : new RegExp("\\b(\\d+)(?!;)\\b"), replacement : "<span class='javascript_number'>$1</span>"});
parseRoutines.push({reg : new RegExp("\\.(\\d+)"), replacement : "<span>.</span><span class='javascript_number'>$1</span>"});
parseRoutines.push({reg : new RegExp(" (-?)(\\d+)"), replacement : "<span> $1</span><span class='javascript_number'>$2</span>"});

let highlighter : Syntax_Highlighter = new Syntax_Highlighter(parseRoutines);

highlighter.parseAllSnippets();