# SevenUp v1.0
Simple programming language...
## Installation (step-by-step)
1. git clone https://github.com/MaximKrylov/SevenUp
2. cd SevenUp
3. npm install
4. bower install
5. gulp build

] When the application is built you can use it by running **index.html**, which is located in **dist** folder. *npm*, *bower* and *gulp* should be installed globally before building.

## Grammar (LL(1))
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
