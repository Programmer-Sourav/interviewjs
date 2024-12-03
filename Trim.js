
 function trim(str){
 let start = 0;
 let end = str.length - 1;

 const isWhiteSpace = (ch) => ch === '' || ch === ' ' || ch === '\t' || ch ==='\n' || ch === '\s';

 // Increment start until no leading whitespace
 while(start<=end && isWhiteSpace(str.charAt(start))){
    start++;
 }
 // Decrement end until no trailing whitespace
 while(end>=start && isWhiteSpace(str.charAt(end))){
    end--;
 }
 // Slice the string from start to end indices
return str.substring(start, end+1)
}




trim(' hello world');
// hello world
trim(' hello world ');
// hello world
trim(' hello world\t ');
// hello world
trim(` hello
world `);
/*
hello
world
*/
trim(`\n hello\tworld \t\t`);
// hello world
trim(`\t hello\nworld \s`);
