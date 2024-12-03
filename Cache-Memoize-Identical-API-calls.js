function createAPICallCaching(){
    const cache = new Map();
    const CACHE_TIME_LIMIT = 1000;
    const CACHE_SIZE_LIMIT = 5;


    return function getApiWithCaching(path, config){
        // Get the hash using both path & config,
        const hash = getHashFromApi(path, config)


        if(cache.has(hash)){
            const apiEntry = cache.get(hash);
        }



    }

    function getHashFromApi(path, config){
              const keys = Object.keys(config);
              // We will construct the entire URL and use it as our
//unique hashkey, to identify identical APIs
// For path='/search', config={ key1: 'youtube', key2:
//'videos' }
// The hash is : '/search?key1=youtube&?key2=videos'
const hash = path + keys.map((key)=>`?${key}=${config[key]}`).join(`&`);
return hash;
    }
}