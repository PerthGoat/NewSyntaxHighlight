/// <reference path='syntax.ts'/>

let parseRoutines : Parse_Routine[] = new Array();

parseRoutines.push({reg : new RegExp("(&#x2F;&#x2F;&#x2F;.*)"), replacement : "<span class='typescript_reference'>$1</span>"});
parseRoutines.push({reg : new RegExp("(&#x2F;&#x2F;.*)"), replacement : "<span class='typescript_comment'>$1</span>"});
parseRoutines.push({reg : new RegExp("(&#x2F;\\*[^*]*\\*+(?:[^&#x2F;*][^*]*\\*+)*&#x2F;)"), replacement : "<span class='typescript_multi_comment'>$1</span>"});
parseRoutines.push({reg : new RegExp("(number|string|any)"), replacement : "<span class='typescript_type'>$1</span>"});
parseRoutines.push({reg : new RegExp("(class)"), replacement : "<span class='typescript_class'>$1</span>"});
parseRoutines.push({reg : new RegExp("(return)"), replacement : "<span class='typescript_return'>$1</span>"});
parseRoutines.push({reg : new RegExp("(if)"), replacement : "<span class='typescript_condition'>$1</span>"});
parseRoutines.push({reg : new RegExp("(else)"), replacement : "<span class='typescript_condition'>$1</span>"});
parseRoutines.push({reg : new RegExp("(undefined)"), replacement : "<span class='typescript_undefined'>$1</span>"});
parseRoutines.push({reg : new RegExp("(interface)"), replacement : "<span class='typescript_interface'>$1</span>"});
parseRoutines.push({reg : new RegExp("(enum)"), replacement : "<span class='typescript_enum'>$1</span>"});
parseRoutines.push({reg : new RegExp("\\b(\\d+)(?!;)\\b"), replacement : "<span class='typescript_number'>$1</span>"});
parseRoutines.push({reg : new RegExp("\\.(\\d+)"), replacement : "<span>.</span><span class='typescript_number'>$1</span>"});
parseRoutines.push({reg : new RegExp(" (-?)(\\d+)"), replacement : "<span> $1</span><span class='typescript_number'>$2</span>"});
parseRoutines.push({reg : new RegExp("(static)"), replacement : "<span class='typescript_static'>$1</span>"});
parseRoutines.push({reg : new RegExp("(let)"), replacement : "<span class='typescript_variable'>$1</span>"});
parseRoutines.push({reg : new RegExp("(public)"), replacement : "<span class='typescript_public'>$1</span>"});
parseRoutines.push({reg : new RegExp("(constructor)"), replacement : "<span class='typescript_constructor'>$1</span>"});

let highlighter : Syntax_Highlighter = new Syntax_Highlighter(parseRoutines);

highlighter.parseAllSnippets();