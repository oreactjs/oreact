import useStores from './useStores';

export default (cb) =>{
    return cb(useStores());
}
