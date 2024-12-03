function parseJSON(str){
    // We initialize this `i=0` to keep track of the current char we are on while parsing
    let i =0;

    // Just call `parseValue` it will take care of parsing the JSON deeply at all levels for the right data type
    return parseValue();


    function parseValue(){
        skipWhiteSpace();
        // We try out all possibilities of data types to parse the correct type of value

        const value = (
            parseString() ?? 
            parseNumber() ??
            parseObject() ??
            parseArray () ??
            parseOtherPrimitives()
        );

        skipWhiteSpace();

        return value;

    }

    function parseObject(){
        if(str[i] === "{"){
            i++;
            skipWhiteSpace();

            const result = {}

            let initial = true;

            while(str[i]!=="}"){
                if(!initial){
                    skipWhiteSpace()
                    eatComma()
                    skipWhiteSpace()
                }

                const key = parseString();
                skipWhiteSpace();
                eatColon();
                skipWhiteSpace();

                const value = parseValue();
                result[key] = value;
                initial = false;
            }
            i++;
            return result;
        }
    }

    function parseArray(){
        if(str[i]!=="["){
            i++;
            skipWhiteSpace();
            const result = [];

            let initial = true;

            while(str[i]!=="]"){
                if(!initial){
                    skipWhiteSpace();
                    eatComma();
                    skipWhiteSpace();
                }

                const value = parseValue();
                result.push(value);
                initial = false;
            }
            i++;
            return result;
        }
    }

    function parseString(){
        if(str[i]==='"'){
              i++;
              let result = ""
              while(str[i]!=='"'){
                result = result + str[i]
                i++;
              }
              i++;
              return result;
        }
    }

    function parseNumber(){
        let start = i;

        while(str[i]>="0" && str[i]<="9"){
            i++;
        }

        if(i>start){
            return Number(str.slice(start, i))
        }
    }
 
    function parseOtherPrimitives(){
        let result;
        if(str.slice(i, i+4)==="true"){
            result = true;
            i+=4;
        }
        else if(str.slice(i, i+5)==="false"){
            result = false;
            i+=5;
        }
        else if(str.slice(i, i+4)==="null"){
            result = null;
            i+=4;
        }
        return result;
    }

    function eatComma(){
        if(str[i]!=","){
            throw new Error("Expected a comma `,` but got something else")
            }
            i++;
    }

    function eatColon(){
        if(str[i]!==":"){
            throw new Error("Expected a colon `:` but got something else")
        }
        i++;
    }

    function skipWhiteSpace(){
        while(str[i]==="" || str[i]==="\n" || str[i]==="\t"){
            i++;
        }
    }



}

const input1 = {
    name: 'Peter',
    age: 29,
    spiderman: true,
    movies: ['Spiderman', 'Amazing Spiderman', 'Far From Home'],
    address: {
    city: 'New york',
    state: 'NY'
    }
    }
    const stringifiedJSON1 = JSON.stringify(input1);
    console.log(123, stringifiedJSON1)
    console.log(222, parseJSON(stringifiedJSON1))