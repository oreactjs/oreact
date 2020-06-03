import React from 'react';
import {Icon, ListItem, ListItemText} from '@material-ui/core';
import NavLinkAdapter from '../NavLinkAdapter';
import {withRouter} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import NavigationBadge from './../NavigationBadge';
import {makeStyles} from '@material-ui/styles';
import {observer} from "mobx-react";
import {useStores} from '@oreact/core/store';

const useStyles = makeStyles(theme => ({
    root: {
        minHeight          : 48,
        '&.active'         : {
            backgroundColor            : theme.palette.secondary.main,
            color                      : theme.palette.secondary.contrastText + '!important',
            pointerEvents              : 'none',
            '& .list-item-text-primary': {
                color: 'inherit'
            },
            '& .list-item-icon'        : {
                color: 'inherit'
            }
        },
        '& .list-item-icon': {},
        '& .list-item-text': {
            padding: '0 0 0 16px'
        },
        color              : theme.palette.text.primary,
        textDecoration     : 'none!important',
        '&.dense'          : {
            padding            : '8px 12px 8px 12px',
            minHeight          : 40,
            '& .list-item-text': {
                padding: '0 0 0 8px'
            }
        }
    }
}));

const NavigationItem = (props) =>
{
    const {themeStore} = useStores();
    const classes = useStyles(props);
    const {item, dense} = props;

    return (
        <ListItem
            button
            component={NavLinkAdapter}
            to={item.url}
            activeClassName="active"
            className={clsx("list-item", classes.root, dense && "dense")}
            onClick={ev => themeStore.setNavbarState({mobileOpen: false})}
            exact={item.exact}
        >
            {item.icon && (
                <Icon className="list-item-icon text-16 flex-shrink-0" color="action">{item.icon}</Icon>
            )}
            <ListItemText className="list-item-text" primary={item.title} classes={{primary: 'text-14 list-item-text-primary'}}/>
            {item.badge && (
                <NavigationBadge className="ml-8" badge={item.badge}/>
            )}
        </ListItem>
    );
};

NavigationItem.propTypes = {
    item: PropTypes.shape(
        {
            id   : PropTypes.string.isRequired,
            title: PropTypes.string,
            icon : PropTypes.string,
            url  : PropTypes.string
        })
};

NavigationItem.defaultProps = {};

export default withRouter(React.memo(observer(NavigationItem)));

