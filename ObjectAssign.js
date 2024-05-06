// We collect all the source objects using the rest operator
function objectAssign(target, ...sources) {
    if (target === null || target === undefined) {
    throw new Error('target should not be null or undefined');
    }
    // Using the Object constructor to wrap and turn primitives
    // like number, boolean, string, BigInt, NaN into its wrapper
    // Object form
    target = Object(target);
    // loop through all source objects and assign properties to
    //target object
    for (let source of sources) {
    if (source === null || source === undefined) {
    continue; // skip if the source is not a valid object
    }
    // Using the Object constructor to wrap and turn
    // primitives like number, boolean, string, BigInt, NaN into its
    // wrapper Object form
    source = Object(source);
    // Reflect.ownKeys returns an array of own property keys
    //including string and symbol (both enumerable and non-enumerable)
    const keys = Reflect.ownKeys(source);
    const descriptors =
    Object.getOwnPropertyDescriptors(source);
    keys.forEach(key => {
        const targetDescriptor =
        Object.getOwnPropertyDescriptor(target, key);
        if (targetDescriptor && targetDescriptor.writable ===
        false) {
        throw new Error(`Property ${key} is not writable
        to target`);
        }
        // Remember the definition of Object.assign() method
        // We should assign only enumerable properties of the
        // source. So if the property on the source is enumerable, assign
        // it to target.
        if (descriptors[key].enumerable) {
        target[key] = source[key];
        }
        })
        }
        return target;
        }