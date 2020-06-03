import React from 'react';
import PropTypes from 'prop-types';
import runtimeConfig from 'runtimeConfig';

/**
 * Runtime config component
 * @param nonce
 * @returns {*}
 * @constructor
 */
function RuntimeConfig({nonce}) {
    return (
        <script
            type="text/javascript"
            nonce={nonce}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: `window.env=${JSON.stringify(runtimeConfig)};`,
            }}
        />
    );
}

RuntimeConfig.propTypes = {
    nonce: PropTypes.string.isRequired,
};

export default RuntimeConfig;
