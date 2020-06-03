import React from 'react';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {observer} from 'mobx-react';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        '&.boxed': {
            maxWidth: 1280,
            margin: '0 auto',
            boxShadow: theme.shadows[3]
        },
        '&.scroll-body': {
            '& $wrapper': {
                height: 'auto',
                flex: '0 0 auto',
                overflow: 'auto'
            },
            '& $contentWrapper': {},
            '& $content': {}
        },
        '&.scroll-content': {
            '& $wrapper': {},
            '& $contentWrapper': {},
            '& $content': {}
        }
    },
    wrapper: {
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
        flex: '1 1 auto',
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 3,
        overflow: 'hidden',
        flex: '1 1 auto'
    },
    content: {
        position: 'relative',
        display: 'flex',
        overflow: 'auto',
        flex: '1 1 auto',
        flexDirection: 'column',
        width: '100%',
        '-webkit-overflow-scrolling': 'touch',
        zIndex: 2
    }
}));

export default observer((props) => {
    const {
        pageRoutes,
        config: {
            scroll,
            style,
        }
    } = props;
    const classes = useStyles(props);

    return (
        <div className={clsx(classes.root, style, 'scroll-' + scroll)}>
            <div className="flex flex-1 flex-col overflow-hidden relative">
                <div className={classes.wrapper}>
                    <div className={classes.contentWrapper}>
                        <div className={classes.content}>
                            {pageRoutes}
                        </div>
                    </div>
                </div>
            </div>
        </div>);

});


