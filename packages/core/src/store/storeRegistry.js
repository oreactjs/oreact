export class StoreRegistry {
    constructor() {
        this._client = {};
        this._mobxState = {};
    }

    setMobXState(mobxState) {
        this._mobxState = mobxState;
    }

    getMobXState() {
        return this._mobxState;
    }
}

const storeRegistry = new StoreRegistry();
export default storeRegistry;
