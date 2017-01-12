# SevenUp v1.0
Simple programming language...
## Installation (step-by-step)
1. git clone https://github.com/MaximKrylov/SevenUp
2. cd SevenUp
3. npm install
4. bower install
5. gulp build

> When the application is built you can use it by running **index.html**, which is located in **dist** folder. *npm*, *bower* and *gulp* should be installed globally before building.

## Grammar, LL(1)
### Expression
[expression] -> [logic] [expression_tail]

[expression] ->	"!" [logic] [expression_tail]

[expression_tail] -> "|" [logic] [expression_tail]

[expression_tail] -> EMPTY

[logic] -> [compare] [logic_tail]

[logic_tail] -> "&" [compare] [logic_tail]

[logic_tail] -> EMPTY

[compare] -> [math] [compare_tail]

[compare_tail] -> "!=" [math] [compare_tail] 

[compare_tail] -> "==" [math] [compare_tail]

[compare_tail] -> "<=" [math] [compare_tail]

[compare_tail] -> ">=" [math] [compare_tail]

[compare_tail] -> ">" [math] [compare_tail]

[compare_tail] -> "<" [math] [compare_tail]

[compare_tail] -> EMPTY

[math] -> [term] [math_tail]

[math] -> "-" [term] [math_tail]

[math_tail] -> "+" [term] [math_tail]

[math_tail] -> "-" [term] [math_tail]

[math_tail] -> EMPTY

[term] -> [factor] [term_tail]

[term_tail] -> "*" [factor] [term_tail]

[term_tail] -> "/" [factor] [term_tail]

[term_tail] -> EMTPY

[factor] -> "(" [expression] ")" 

[factor] -> [operative_object]
### Operative Object
[operative_object] -> [operative_user_word]

[operative_object] -> "Number"

[operative_object] -> "String"

[operative_object] -> "Boolean"

[operative_user_word] -> "UserWord" [operative_user_word_tail]

[operaive_user_word_tail] -> "[" [array_element_parameters_list] "]"

[operaive_user_word_tail] -> "(" [func_call_parameters_list] ")"

[operaive_user_word_tail] -> EMTPY

[array_element_parameters_list] -> [expression] [operative_parameters_list_tail]

[func_call_parameters_list] -> [expression] [operative_parameters_list_tail]

[func_call_parameters_list] -> EMPTY

[operative_parameters_list_tail] -> "," [expression] [operative_parameters_list_tail]

[operative_parameters_list_tail] -> EMPTY