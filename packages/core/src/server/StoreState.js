import React from 'react';
import PropTypes from 'prop-types';
import {getStoreJSON} from "../store";

/**
 * Store state
 * @param nonce
 * @param stores
 * @returns {*}
 * @constructor
 */
function StoreState({nonce, stores}) {
    return (
        <script
            type="text/javascript"
            nonce={nonce}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: `window.__OREACT_DATA__=${JSON.stringify(getStoreJSON(stores))};`,
            }}
        />
    );
}

StoreState.propTypes = {
    nonce: PropTypes.string.isRequired,
    stores: PropTypes.object.isRequired
};

export default StoreState;
