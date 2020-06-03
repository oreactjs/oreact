import React from 'react';
import {NavLink} from 'react-router-dom';

export default React.forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);

