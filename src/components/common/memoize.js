export const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    if( args.toString() in cache ){
      console.log('from cache');
      return cache[args.toString()];
    }else{
      console.log('calc');
      const result = fn(...args);
      cache[args.toString()] = result;
      return result;
    }
  }
}