class Tokenizer {
    operators  = ['+', '-', '/', '*', '(', ')','^']

    constructor(input){
        this.input = input;
        this.index = 0;
    }
    hasMoreTokens() {
        return this.index < this.input.length;
        }
        // Used to test the curr char in our `input` string with the
  //`charToBeMatched`
// If there's a successful match, it returns the match and
//moves the index position, so that next set of tokens can be processed

matchToken() {
    // Skip whitespaces
    while (this.hasMoreTokens() &&
    this.input.charAt(this.index) === ' ') {
    this.index++;
    }
    // Match pre-defined math expression tokens
    if (this.hasMoreTokens() &&
    this.operators.includes(this.input.charAt(this.index))) {
    const token = this.input.charAt(this.index);
    this.index += 1;
    return { type: 'operator', token };
    }
    // Match numbers from 0-9
    // Using `buffer` so that we can collect all the sequence
    //of a number (basically grouping the individual chars of number)
    let buffer = '';
    while (this.hasMoreTokens() &&
    this.input.charAt(this.index) >= '0' &&
    this.input.charAt(this.index) <= '9') {
    buffer += this.input.charAt(this.index);
    this.index++;
    }
    // If the content in the buffer, matches as a valid number
    if (buffer.length > 0 && !isNaN(Number(buffer))) {
     const token = Number(buffer);
     return { type: 'operand', token };
      }
       return null;
       }
    // Used to retrieve the next token from the `input` string
   getNextToken() {
    // If no tokens left to process, we just skip it
    if (!this.hasMoreTokens()) {
    return null;
    }
    const tokenValue = this.matchToken();
    return tokenValue;
    }
}


/************** */

const printAllTokens = (tokenizer) => {
    let token = tokenizer.getNextToken();
    while (token) {
    console.log(token);
    token = tokenizer.getNextToken();
    }
    }
    printAllTokens(new Tokenizer('10 + 20'));

    printAllTokens(new Tokenizer('10 + 20 * 30 - 40'));
    printAllTokens(new Tokenizer('100 + 20 * (301 - 40)'));
    printAllTokens(new Tokenizer(' 10 ^ 20 * 30-40 '));

    