import React, {useEffect, useState} from 'react';
import {Collapse, Icon, IconButton, ListItem, ListItemText} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {withRouter} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import NavigationGroup from './NavigationGroup';
import NavigationItem from './NavigationItem';
import NavigationBadge from './../NavigationBadge';
import NavigationLink from './NavigationLink';

const useStyles = makeStyles(theme => ({
    root: {
        padding : 0,
        '&.open': {
            backgroundColor: 'rgba(0,0,0,.08)'
        }
    },
    item: {
        height      : 40,
        width       : 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingRight: 12,
        color       : theme.palette.text.primary,
        '&.square'  : {
            width       : '100%',
            borderRadius: '0'
        }
    }
}));

function needsToBeOpened(location, item)
{
    return location && isUrlInChildren(item, location.pathname)
}

function isUrlInChildren(parent, url)
{
    if ( !parent.children )
    {
        return false;
    }

    for ( let i = 0; i < parent.children.length; i++ )
    {
        if ( parent.children[i].children )
        {
            if ( isUrlInChildren(parent.children[i], url) )
            {
                return true;
            }
        }

        if ( parent.children[i].url === url || url.includes(parent.children[i].url) )
        {
            return true;
        }
    }

    return false;
}

const NavigationCollapse = (props) =>
{
    const classes = useStyles(props);
    const [open, setOpen] = useState(() => needsToBeOpened(props.location, props.item));
    const {item, nestedLevel, active} = props;
    let paddingValue = 40 + (nestedLevel * 16);
    const listItemPadding = nestedLevel > 0 ? 'pl-' + (paddingValue > 80 ? 80 : paddingValue) : 'pl-24';

    useEffect(() => {
        if ( needsToBeOpened(props.location, props.item) )
        {
            setOpen(true);
        }
    }, [props.location, props.item]);

    function handleClick()
    {
        setOpen(!open);
    }

    return (
        <ul className={clsx(classes.root, open && "open")}>

            <ListItem
                button
                className={clsx(classes.item, listItemPadding, 'list-item', active)}
                onClick={handleClick}
            >
                {item.icon && (
                    <Icon color="action" className="text-16 flex-shrink-0 mr-16">{item.icon}</Icon>
                )}
                <ListItemText className="list-item-text" primary={item.title} classes={{primary: 'text-14'}}/>
                {item.badge && (
                    <NavigationBadge className="mr-4" badge={item.badge}/>
                )}
                <IconButton disableRipple className="w-16 h-16 p-0">
                    <Icon className="text-16 arrow-icon" color="inherit">
                        {open ? 'expand_less' : 'expand_more'}
                    </Icon>
                </IconButton>
            </ListItem>

            {item.children && (
                <Collapse in={open} className="collapse-children">
                    {
                        item.children.map((item) => (

                            <React.Fragment key={item.id}>

                                {item.type === 'group' && (
                                    <NavigationGroup item={item} nestedLevel={nestedLevel + 1} active={active}/>
                                )}

                                {item.type === 'collapse' && (
                                    <NavCollapse item={item} nestedLevel={nestedLevel + 1} active={active}/>
                                )}

                                {item.type === 'item' && (
                                    <NavigationItem item={item} nestedLevel={nestedLevel + 1} active={active}/>
                                )}

                                {item.type === 'link' && (
                                    <NavigationLink item={item} nestedLevel={nestedLevel + 1} active={active}/>
                                )}

                            </React.Fragment>
                        ))
                    }
                </Collapse>
            )}
        </ul>
    );
};

NavigationCollapse.propTypes = {
    item: PropTypes.shape(
        {
            id      : PropTypes.string.isRequired,
            title   : PropTypes.string,
            icon    : PropTypes.string,
            children: PropTypes.array
        })
};
NavigationCollapse.defaultProps = {};

const NavCollapse = withRouter(React.memo(NavigationCollapse));

export default NavCollapse;
