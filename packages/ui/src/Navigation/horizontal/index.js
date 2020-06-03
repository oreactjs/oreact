import React from 'react';
import {Divider, List} from '@material-ui/core';
import clsx from 'clsx';
import {default as NavigationGroup} from './NavigationGroup';
import {default as NavigationCollapse} from './NavigationCollapse';
import {default as NavigationItem} from './NavigationItem';
import {default as NavigationLink} from './NavigationLink';

export default ({navigation, layout, active, dense, className}) =>
{
    return (
        <List className={clsx("navigation whitespace-no-wrap flex p-0", className)}>
            {
                navigation.map((item) => (

                    <React.Fragment key={item.id}>

                        {item.type === 'group' && (
                            <NavigationGroup item={item} nestedLevel={0} dense={dense}/>
                        )}

                        {item.type === 'collapse' && (
                            <NavigationCollapse item={item} nestedLevel={0} dense={dense}/>
                        )}

                        {item.type === 'item' && (
                            <NavigationItem item={item} nestedLevel={0} dense={dense}/>
                        )}

                        {item.type === 'link' && (
                            <NavigationLink item={item} nestedLevel={0} dense={dense}/>
                        )}

                        {item.type === 'divider' && (
                            <Divider className="my-16"/>
                        )}
                    </React.Fragment>
                ))
            }
        </List>
    );
};

