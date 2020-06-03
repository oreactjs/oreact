import React, {useState} from 'react';
import {Grow, Paper, Icon, IconButton, ListItem, ListItemText} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useDebounce} from '@oreact/use';
import {withRouter} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Manager, Reference, Popper} from 'react-popper';
import * as ReactDOM from 'react-dom';
import NavigationCollapse from './NavigationCollapse';
import NavigationItem from './NavigationItem';
import NavigationLink from './NavigationLink';

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary,
        '& .list-item-text': {
            padding: '0 0 0 16px'
        },
        '&.level-0': {
            height: 48,
            borderRadius: 4,
            '&:hover': {
                background: 'transparent'
            },
        },
        '&.dense': {
            padding: '8px 12px 8px 12px',
            minHeight: 40,
            '&.level-0': {
                height: 44
            },
            '& .list-item-text': {
                padding: '0 0 0 8px'
            }
        }
    },
    children: {},
    popper: {
        zIndex: 999
    },
    popperClose: {
        pointerEvents: 'none'
    }
}));

const NavigationGroup = (props) => {

    const classes = useStyles(props);
    const [opened, setOpened] = useState(false);
    const {item, nestedLevel, dense} = props;

    const handleToggle = useDebounce((open) => {
        setOpened(open);
    }, 150);

    return (
        <Manager>
            <Reference>
                {({ref}) => (
                    <div ref={ref}>
                        <ListItem
                            button
                            className={clsx("list-item ", classes.root, "relative", "level-" + nestedLevel, dense && "dense")}
                            onMouseEnter={() => handleToggle(true)}
                            onMouseLeave={() => handleToggle(false)}
                            aria-owns={opened ? 'menu-list-grow' : null}
                            aria-haspopup="true"
                        >
                            {item.icon && (
                                <Icon color="action" className="text-16 flex-shrink-0">{item.icon}</Icon>
                            )}
                            <ListItemText className="list-item-text" primary={item.title}
                                          classes={{primary: 'text-14'}}/>
                            {nestedLevel > 0 && (
                                <IconButton disableRipple className="w-16 h-16 ml-4 p-0">
                                    <Icon className="text-16 arrow-icon">keyboard_arrow_right</Icon>
                                </IconButton>
                            )}
                        </ListItem>
                    </div>
                )}
            </Reference>
            {ReactDOM.createPortal(
                <Popper
                    placement={nestedLevel === 0 ? "bottom-start" : "right"}
                    eventsEnabled={opened}
                    positionFixed
                >
                    {({ref, style, placement, arrowProps}) => (
                        opened && (
                            <div
                                ref={ref}
                                style={{
                                    ...style,
                                    zIndex: 999 + nestedLevel
                                }}
                                data-placement={placement}
                                className={clsx(classes.popper, {[classes.popperClose]: !opened})}
                            >
                                <Grow in={opened} id="menu-list-grow" style={{transformOrigin: '0 0 0'}}>
                                    <Paper
                                        onMouseEnter={() => handleToggle(true)}
                                        onMouseLeave={() => handleToggle(false)}
                                    >
                                        {item.children && (
                                            <ul className={clsx(classes.children, "pl-0")}>
                                                {
                                                    item.children.map((item) => (
                                                        <React.Fragment key={item.id}>

                                                            {item.type === 'group' && (
                                                                <NavGroup item={item}
                                                                                    nestedLevel={nestedLevel}
                                                                                    dense={dense}/>
                                                            )}

                                                            {item.type === 'collapse' && (
                                                                <NavigationCollapse item={item}
                                                                                             nestedLevel={nestedLevel}
                                                                                             dense={dense}/>
                                                            )}

                                                            {item.type === 'item' && (
                                                                <NavigationItem item={item}
                                                                                         nestedLevel={nestedLevel}
                                                                                         dense={dense}/>
                                                            )}

                                                            {item.type === 'link' && (
                                                                <NavigationLink item={item} nestedLevel={nestedLevel}
                                                                                dense={dense}/>
                                                            )}
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </ul>
                                        )}
                                    </Paper>
                                </Grow>
                            </div>
                        )
                    )}
                </Popper>,
                document.querySelector('#root')
            )}
        </Manager>
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

const NavGroup = withRouter(React.memo(NavigationGroup));

export default NavGroup;
