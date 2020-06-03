import _ from '../lodash';
export default (stores) =>{
    let storesData = {};
    _.forEach(stores, (store, key) => {
        if(_.isFunction(store.toJSON)){
            storesData[key] = store.toJSON()
        } else {
            throw new Error(`toJSON() function is missing in ${key}`);
        }
    });
    return storesData;
}
