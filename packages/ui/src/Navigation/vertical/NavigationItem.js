import React from 'react';
import {Icon, ListItem, ListItemText} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import NavLinkAdapter from '../NavLinkAdapter';
import {withRouter} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import NavigationBadge from './../NavigationBadge';
import {observer} from "mobx-react";
import {useStores} from '@oreact/core/store';

const useStyles = makeStyles(theme => ({
    item: {
        height: 40,
        width: 'calc(100% - 16px)',
        paddingRight: 5,
        '&.active': {
            position: 'relative',
            color: theme.palette.text.primary,
            pointerEvents: 'none',
            transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
            '&::before': {
                backgroundColor: theme.palette.secondary.main,
                position: 'absolute',
                content: "''",
                width: '5px',
                left: 0,
                height: '100%'
            },
            '& .list-item-text-primary': {
                color: 'inherit'
            },
            '& .list-item-icon': {
                color: 'inherit'
            }
        },
        '&.square, &.active.square': {
            width: '100%',
            borderRadius: '0'
        },
        '& .list-item-icon': {},
        '& .list-item-text': {},
        color: theme.palette.text.primary,
        cursor: 'pointer',
        textDecoration: 'none!important'
    }
}));

const NavigationItem = (props) => {
    const {themeStore} = useStores();
    const classes = useStyles(props);
    const {item, nestedLevel, active} = props;
    let paddingValue = 40 + (nestedLevel * 16);
    const listItemPadding = nestedLevel > 0 ? 'pl-' + (paddingValue > 80 ? 80 : paddingValue) : 'pl-24';

    return (
        <ListItem
            button
            component={NavLinkAdapter}
            to={item.url}
            activeClassName="active"
            className={clsx(classes.item, listItemPadding, 'list-item', active)}
            onClick={ev => themeStore.setNavbarState({mobileOpen: false})}
            exact={item.exact}
        >
            {item.icon && (
                <Icon className="list-item-icon text-16 flex-shrink-0 mr-16" color="action">{item.icon}</Icon>
            )}
            <ListItemText className="list-item-text" primary={item.title}
                          classes={{primary: 'text-14 list-item-text-primary'}}/>
            {item.badge && (
                <NavigationBadge badge={item.badge}/>
            )}
        </ListItem>
    );
};

NavigationItem.propTypes = {
    item: PropTypes.shape(
        {
            id: PropTypes.string.isRequired,
            title: PropTypes.string,
            icon: PropTypes.string,
            url: PropTypes.string
        })
};

NavigationItem.defaultProps = {};

export default withRouter(React.memo(observer(NavigationItem)));
