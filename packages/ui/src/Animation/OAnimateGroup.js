import React from 'react';
import PropTypes from 'prop-types';
import {VelocityTransitionGroup} from 'velocity-react';
import _ from '@oreact/core/lodash';

if (typeof window !== 'undefined') {
    require('velocity-animate');
    require('velocity-animate/velocity.ui');
}

const enterAnimationDefaults = {
    animation : "transition.fadeIn",
    stagger   : 50,
    duration  : 200,
    display   : null,
    visibility: 'visible',
    delay     : 0
};

const leaveAnimationDefaults = {
    stagger   : 50,
    duration  : 200,
    display   : null,
    visibility: 'visible',
    delay     : 0
};

const OAnimateGroup = (props) => {
    const newProps = _.merge({}, {
        enter: enterAnimationDefaults,
        leave: leaveAnimationDefaults
    }, props);

    return <VelocityTransitionGroup {...newProps} children={props.children}/>

};

OAnimateGroup.propTypes = {
    children: PropTypes.any
};

OAnimateGroup.defaultProps = {
    enter         : enterAnimationDefaults,
    leave         : leaveAnimationDefaults,
    easing        : [0.4, 0.0, 0.2, 1],
    runOnMount    : true,
    enterHideStyle: {
        visibility: 'visible'
    },
    enterShowStyle: {
        visibility: 'hidden'
    }
};

export default React.memo(OAnimateGroup);
