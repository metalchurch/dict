//Section 1
var x=1;
x;

var arr = [1,2,3,4];
arr;


//Section 2
//const
const PI = 3.14;
//PI =3;      //error cannot change it

//const pi;   //error syntax erro, need to assign a value when decalre it

const obj2 = {};   //
obj2['a'] =1;
obj2;

//let only declare varible once,not like var

let largestString;

function findLargestString(strings) {
    // set largestString to point to the 
    // longest string found in the strings array passed in
    largestString='';
    strings.forEach(function(string){
       largestString = largestString.length < string.length ? string : largestString; 
    });
}

findLargestString(['abc','a','bc','afwefwef']);
largestString;

//Section 3 scope
const userIds = [1, 2, 3];
const users = [];

// TODO: Fix this for loop by scoping the variable i.
// Do not use a IIFE to get to pass.
// HINT - remember how let and const work with block scope.
for (let i = 0; i < userIds.length; i++) {
    fun(function() {
        users.push({
            userId: userIds[i]
        });
    });

}

function fun(cb) { setTimeout(cb) }
users;