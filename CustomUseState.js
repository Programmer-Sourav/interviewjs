/**
 *  UseState is an object
 * const [currentObject, functionToChangeTheObject] = functionName(initialValue(number||{}||[]))
 * Object manipulation only.
 * 
 */

/**
 * State is stored inside an object (stateObject).
Updater function (setState) modifies currentState.
bind(stateObject) ensures this correctly refers to stateObject.
Returns an array [stateObject, setState], similar to useState.
 * 
 * 
 */

/**
 * 
 * 
 * 
In React's useState, we return a new state instead of mutating it directly.
 */


export const myUseState = ( initialValue) =>{
     //Will this currentMutableObject be determined based upon the type of InitialValue only?
     const stateObject = {
        currentState: initialValue,
        stateUpdater(newValue){
            this.currentState = newValue;
         }    
    };

    return [stateObject, stateObject.stateUpdater.bind(stateObject)]
}

const [state, setState] = myUseState({count: 0})
console.log(state.currentState)
setState({count: 5})
console.log(state.currentState)



