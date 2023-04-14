1. What is a potential pitfall with using typeof bar === "object" to determine if bar is an object? How can this pitfall be avoided?

    The issue comes because it will return a false positive if null is passed through, because null is technically an object. To fix this,
    add a (bar!== null) condition.

2. What will the code below output to the console and why? 
    (function(){
        var a = b = 3;
    })();

    console.log("a defined? " + (typeof a !== 'undefined'));
    console.log("b defined? " + (typeof b !== 'undefined'));

    instead of the function assigning the value of 3 to both a and b, it assigns it only to b, so the actual assignment goes:
        var a = b;
        b = 3;
    because b doesn't have the keyword var before it, it makes it a global variable, which means it shows up outside the scope
    of the function. the console will read:
        "a defined? false
         b defined? true"

3. What will the code below output to the console and why?
    var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
    };
    myObject.func();

    The "this" keyword in the outer function refers correctly to myObject so it can properly reference and access the foo value. 
    however, in the inner function, the "this" keyword does not refer to myObject because it's nested within another function. It can still
    access the "self" variable though since that correctly references the object. so the console would read:
    "outer func: this.foo = bar
     outer func: self.foo = bar
     inner func: this.foo = undefined
     inner func: self.foo = bar

4. What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?

    It gives a bounding box around all the contents of the variable, avoiding issues regarding duplicate variable and function names from other 
    parts of the code. 

5. What is the significance, and what are the benefits, of including 'use strict' at the beginning of a JavaScript source file?

    strict mode enables a stricter error handler that will run alongside the code. Some things that technically work will pass if not using strict mode,
    but strict mode will raise an error to keep you from writing sloppy code. This makes it easier to debug since you won't be wasting time on trivial
    errors that strict mode can catch.

6. Consider the two functions below. Will they both return the same thing? Why or why not?

    function foo1()
    {
    return {
        bar: "hello"
    };
    }

    function foo2()
    {
    return
    {
        bar: "hello"
    };
    }

    No. This has to do with the way semicolons work in JS. If the code terminates a line and keeps going on another, the code will throw in an invisible semicolon 
    where it thinks it belongs, so foo2 acts as if there was a semicolon after the word return. As a result, foo1 returns "hello" and foo2 returns "undefined".

7. What will the code below output? Explain your answer.
        console.log(0.1 + 0.2);
        console.log(0.1 + 0.2 == 0.3);

    It's not guaranteed that it will always produce the same result. JS uses floating point numbers, and sometimes 0.1 + 0.2 will be 0.300000000000000000000000...,
    which is not technically equal to the less specific 0.3.

8. In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?

        (function() {
            console.log(1); 
            setTimeout(function(){console.log(2)}, 1000); 
            setTimeout(function(){console.log(3)}, 0); 
            console.log(4);
        })();

    1, 4, 3, 2. The first line runs first. Then it moves to the second line, starts a timer for 1000 milliseconds, then moves to the third line. Even though 
    the set interval is 0, it still gets added to the end of the queue since JS is doing that one in the background, and it prioritizes the main processes first,
    so the 4th line ends up firing with the 3rd coming immediately afterwards.

9. Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.

        function isPalindrome(str) {
            str = str.toLowerCase();
            return (str == str.split('').reverse().join(''));
        }

10. Write a sum method which will work properly when invoked using either syntax below.

            console.log(sum(2,3));   // Outputs 5
            console.log(sum(2)(3));  // Outputs 5

        function sum(num1, num2) {
            if (num2 !== undefined) {
                return num1 + num2;
            } else {
                return function(num2) {return num1 + num2};
            }
        }

11. Consider the following code snippet:

        for (var i = 0; i < 5; i++) {
        var btn = document.createElement('button');
        btn.appendChild(document.createTextNode('Button ' + i));
        btn.addEventListener('click', function(){ console.log(i); });
        document.body.appendChild(btn);
        }

    (a) What gets logged to the console when the user clicks on “Button 4” and why?

    (b) Provide one or more alternate implementations that will work as expected.

    a. The console will log 5 no matter what button is pressed. When onclick is called, the for loop has already finished
       so the iterable i is at its maximum value.

    b. you could avoid this by replacing the for loop with a forEach method that created the event listener/button for each element

12. Assuming d is an “empty” object in scope, say:

        var d = {};

    …what is accomplished using the following code?

        [ 'zebra', 'horse' ].forEach(function(k) {
	        d[k] = undefined;
        });

    This creates keys with the names 'zebra' and 'horse', each having a value of undefined. this initializes the object
    to have the desired keys.

13. What will the code below output to the console and why?

        var arr1 = "john".split('');
        var arr2 = arr1.reverse();
        var arr3 = "jones".split('');
        arr2.push(arr3);
        console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
        console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));

    The console will output:

        "array 1: length=5 last=j,o,n,e,s"
        "array 2: length=5 last=j,o,n,e,s"

    The .reverse() method reverses the original array, it doesn't just return a copy of the reversed array. Arr2, rather than being 
    assigned a value of a copy of array 1's letters reversed, is designated as a reference to arr1, so anything done to one will be applied
    to the other one.

14. What will the code below output to the console and why ?

        console.log(1 +  "2" + "2");
        console.log(1 +  +"2" + "2");
        console.log(1 +  -"1" + "2");
        console.log(+"1" +  "1" + "2");
        console.log( "A" - "B" + "2");
        console.log( "A" - "B" + 2);

    The console will read:

        "122"
        "32"
        "02"
        "112"
        "NaN2"
        NaN

    Javascript performs certain conversions between int and strings, resulting in different results

15. The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?

        var list = readHugeList();

        var nextListItem = function() {
            var item = list.pop();

            if (item) {
                // process the list item...
                nextListItem();
            }
        };

    In the if(item) statement, if you change the nextListItem() to a setTimeout(nextListItem, 0), so that way if item is not null, the next iteration
    of the function is added to the event queue and then the function exits, so the call stack is clear.

16. What is a “closure” in JavaScript? Provide an example.

    A closure is a function within another function that has access to the variables in the enclosing function's scope. An example:

            function outer(number) {

                var x = number + 1

                function inner(number2) {
                    var y = number2 + 1;

                    return x + y
                }
            }

17. What would the following lines of code output to the console? Explain your answer.
       
        console.log("0 || 1 = "+(0 || 1));
        console.log("1 || 2 = "+(1 || 2));
        console.log("0 && 1 = "+(0 && 1));
        console.log("1 && 2 = "+(1 && 2));

    The console would read:

        0 || 1 = 1
        1 || 2 = 1
        0 && 1 = 0
        1 && 2 = 2

    || and && behave differently - || is "or" and && is "and". 

    

18. What will be the output when the following code is executed? Explain.

        console.log(false == '0')
        console.log(false === '0')

    The console will read:

        true
        false

    == tries to coerce the values before evaluating them, so in the first example, it converts the string '0' to an integer before evaluating whether it is true
    or false, and === preserves the type, and since the string '0' is not a null value, it returns false.

19. What is the output out of the following code? Explain your answer.

        var a={},
            b={key:'b'},
            c={key:'c'};

        a[b]=123;
        a[c]=456;

        console.log(a[b]);

    The output would be:

            456

    JS stringifies the parameter value when setting an object property. Since both b and c are objects, they both become equivalent to a["object Object]"], and therefore the a[b] and a[c] values end up being the same, so when a[c] is set to 456, it sets both a[b] and a[c].

20. What will the following code output to the console:

        console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(10));

    Explain your answer.

    The output would be:

        3,628,800

    This is the value of 10 factorial (10!). The function calls itself recursively, so it ends up doing the same calculations of 10! as it cycles through the numbers
    n to 10.

21. Consider the code snippet below. What will the console output be and why?

        (function(x) {
            return (function(y) {
                console.log(x);
            })(2)
        })(1);

    The output would be:

        1

    This is an example of a closure, so the interior function is able to have access to x. 

22. What will the following code output to the console and why:

        var hero = {
            _name: 'John Doe',
            getSecretIdentity: function (){
                return this._name;
            }
        };

        var stoleSecretIdentity = hero.getSecretIdentity;

        console.log(stoleSecretIdentity());
        console.log(hero.getSecretIdentity());

    The code will output:

        undefined
        John Doe

    The first one is undefined because stoleSecretIdentity() is being invoked in the global context and so it doesn't have access to the _name value,
    which is John Doe. The second one is able to print correctly because it specifically specifies that it's looking within the scope of the hero object.

23. Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For 
    each element visited, the function should pass that element to a provided callback function.

    The arguments to the function should be:

        a DOM element
        a callback function (that takes a DOM element as its argument)

    This is a depth-first-search algorithm! 
    
        function traverse(element, callback) {
            callback(element);
            var list = element.children;
            for (var i = 0; i < list.length; i++) {
                traverse(list[i], callback);
            }
        }

24. Testing your this knowledge in JavaScript: What is the output of the following code?

        var length = 10;
        function fn() {
            console.log(this.length);
        }

        var obj = {
        length: 5,
        method: function(fn) {
            fn();
            arguments[0]();
        }
        };

        obj.method(fn, 1);

    The output would be:

        10
        2

25. Consider the following code. What will the output be, and why?

        (function () {
            try {
                throw new Error();
            } catch (x) {
                var x = 1, y = 2;
                console.log(x);
            }
            console.log(x);
            console.log(y);
        })();

    The ouput would be: 

    1
    undefined
    2

    Because var statements get hoisted to the scope of the function it belongs to, but the error's identifier is only visible within the catch block, so when
    the console.log(x) is called outside of the catch block, it does not have access to the variable x. 

26. What will be the output of this code?

        var x = 21;
        var girl = function () {
            console.log(x);
            var x = 20;
        };
        girl ();

    The output would be:

        undefined

    When the console.log is called, the code is able to see that there is a local x variable within the function, so it does not replace that with the global
    variable x. 

27. for (let i = 0; i < 5; i++) {
        setTimeout(function() { console.log(i); }, i * 1000 );
    }

    What will this code print?

    It will ouput:

        0 1 2 3 4

28. What do the following lines output, and why?

        console.log(1 < 2 < 3);
        console.log(3 > 2 > 1);

    The first statement returns true, but the second statement returns false. The way that JavaScript reads this line is by going left to right, evaluating
    the first comparison and converting it to a boolean. So in the first example, it evaluates 1 < 2, which is true. Then evaluates true < 3, which is true since
    true is equivalent to 1 in this context. But in the second example, it evaluates 3 > 2, which is also true, but since that becomes 1, the expression 1 > 1
    returns false.

29. How do you add an element at the begining of an array? How do you add one at the end?

    For appending to the end, use the array method push, and for appending to the beginning, use the method unshift. Though in ES6, you can use a spread 
    operator like this:
    
    array = ['newvalue', ...array] <- adds to the beginning
    array = [...array, 'newvalue'] <- adds to the end

30. Imagine you have this code:

        var a = [1, 2, 3];

    a) Will this result in a crash?

        a[10] = 99;

    b) What will this output?

        console.log(a[6]);

    a. No, it won't crash. Javascript will assumne array slots 3-9 are empty.

    b. It will output undefined, because even though the slot is there and empty, it does not actually have a value. 

31. What is the value of typeof undefined == typeof NULL?

    True, since NULL gets treated the same as any other undefined variable.

32. What would following code return?

        console.log(typeof typeof 1);
    
    It would return:

        string

33. What will be the output of the following code:

        for (var i = 0; i < 5; i++) {
            setTimeout(function() { console.log(i); }, i * 1000 );
        }

    Explain your answer. How could the use of closures help here?

    The code would output:

        5
        5
        5
        5
        5

    The timeout sets the function aside into the queue, during which time, the rest of the loop completes, making the value of i 5.
    Closures would help by creating a specific scope for each iteration so that way the i value is unchanged by each subsequent iteration.

34. What is NaN? What is its type? How can you reliably test if a value is equal to NaN?

    NaN stands for Not a Number. This appears when an operation can't complete because one of the operands is non-numeric. 
    It's type, though, is number. Isn't that funny! A way you could test with NaN is the built in function isNaN() or
    using value !== value, which would only produce true if the value is equal to NaN, since NaN isn't equal to itself.

35. What will the following code output and why?

        var b = 1;
        function outer(){
            var b = 2
            function inner(){
                b++;
                var b = 3;
                console.log(b)
            }
            inner();
        }
        outer();

    The console output would be:

        3

    Since the inner function has its own b variable, it uses that instead of the higher scoped one.

36. Discuss possible ways to write a function isInteger(x) that determines if x is an integer.

    ES6 has an .isInteger() method, which is what you'd probably use, but if you had to implement it before ES6, here's a way:

        function isInteger(x) {
            return (typeof x === 'number') && (x % 1 === 0);
        }

    This returns true only if the number has a type of number and has a remainder 0 when divided by 1.

37. How do you clone an object?

    One way to do it would be:

        var obj = {key1: val1, key2: val2}
        var clone = Object.assign({},obj)


















