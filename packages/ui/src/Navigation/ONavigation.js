import React from 'react';
import PropTypes from 'prop-types';
import VerticalNavigation from './vertical';
import HorizontalNavigation from './horizontal';

const ONavigation = (props) =>
{
    const {navigation, layout, active, dense, className} = props;
    if ( navigation.length > 0 )
    {
        switch ( layout )
        {
            case 'horizontal':
            {
                return <HorizontalNavigation {...props} />;
            }
            case 'vertical':
            default:
            {
                return <VerticalNavigation {...props} />;
            }
        }
    }
    else
    {
        return null;
    }
};

ONavigation.propTypes = {
    navigation: PropTypes.array.isRequired
};

ONavigation.defaultProps = {
    layout: "vertical"
};

export default React.memo(ONavigation);
