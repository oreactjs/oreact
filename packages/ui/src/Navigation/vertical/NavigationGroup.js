import React from 'react';
import {ListSubheader} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {withRouter} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import NavigationCollapse from './NavigationCollapse';
import NavigationItem from './NavigationItem';
import NavigationLink from './NavigationLink';

const useStyles = makeStyles({
    item: {
        height: 40,
        width: 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingRight: 12
    }
});

const NavigationGroup = (props) => {
    const classes = useStyles(props);
    const {item, nestedLevel, active} = props;
    let paddingValue = 40 + (nestedLevel * 16);
    const listItemPadding = nestedLevel > 0 ? 'pl-' + (paddingValue > 80 ? 80 : paddingValue) : 'pl-24';

    return (
        <React.Fragment>

            <ListSubheader disableSticky={true}
                           className={clsx(classes.item, listItemPadding, "list-subheader flex items-center")}>
                <span className="list-subheader-text uppercase text-12">
                    {item.title}
                </span>
            </ListSubheader>

            {item.children && (
                <React.Fragment>
                    {
                        item.children.map((item) => (

                            <React.Fragment key={item.id}>

                                {item.type === 'group' && (
                                    <NavVerticalGroup item={item} nestedLevel={nestedLevel} active={active}/>
                                )}

                                {item.type === 'collapse' && (
                                    <NavigationCollapse item={item} nestedLevel={nestedLevel} active={active}/>
                                )}

                                {item.type === 'item' && (
                                    <NavigationItem item={item} nestedLevel={nestedLevel} active={active}/>
                                )}

                                {item.type === 'link' && (
                                    <NavigationLink item={item} nestedLevel={nestedLevel} active={active}/>
                                )}

                            </React.Fragment>
                        ))
                    }
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

NavigationGroup.propTypes = {
    item: PropTypes.shape(
        {
            id: PropTypes.string.isRequired,
            title: PropTypes.string,
            children: PropTypes.array
        })
};

NavigationGroup.defaultProps = {};

const NavVerticalGroup = withRouter(React.memo(NavigationGroup));

export default NavVerticalGroup;
