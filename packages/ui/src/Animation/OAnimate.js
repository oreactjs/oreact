import React from 'react';
import PropTypes from 'prop-types';
import {VelocityComponent} from 'velocity-react';

if (typeof window !== 'undefined') {
    require('velocity-animate');
    require('velocity-animate/velocity.ui');
}

const OAnimate = React.forwardRef((props, ref) => {
    return <VelocityComponent ref={ref} {...props} children={React.cloneElement(props.children, {
        style: {
            ...props.children.style,
            visibility: 'hidden'
        }
    })}/>
});

OAnimate.propTypes = {
    children: PropTypes.element.isRequired
};

OAnimate.defaultProps = {
    animation          : 'transition.fadeIn',
    runOnMount         : true,
    targetQuerySelector: null,
    interruptBehavior  : 'stop',
    visibility         : 'visible',
    duration           : 300,
    delay              : 50,
    easing             : [0.4, 0.0, 0.2, 1],
    display            : null,
    setRef             : undefined
};

export default React.memo(OAnimate);
