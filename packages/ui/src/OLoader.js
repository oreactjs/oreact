import React, {useState} from 'react';
import {Typography, LinearProgress} from '@material-ui/core';
import {useTimeout} from '@oreact/use';
import PropTypes from 'prop-types';

const OLoader = (props) => {
    const [showLoading, setShowLoading] = useState(!props.delay);

    useTimeout(() => {
        setShowLoading(true);
    }, props.delay);

    if ( !showLoading )
    {
        return null;
    }

    return (
        <div className="flex flex-1 flex-col items-center justify-center">
            <Typography className="text-20 mb-16" color="textSecondary">Loading...</Typography>
            <LinearProgress className="w-xs" color="secondary"/>
        </div>
    );
}

OLoader.propTypes = {
    delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

OLoader.defaultProps = {
    delay: false
};

export default OLoader;
