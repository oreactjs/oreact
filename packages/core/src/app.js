import React, {useEffect} from 'react';
import Authorization from './auth/Authorization';
import Layout from './theme/Layout';
import 'styles/index.css';
export default () => {

    if (typeof window !== 'undefined') {
        useEffect(() => {
            const jssStyles = document.querySelector('#jss-server-side');
            if (jssStyles) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }, []);
    }

    return (
        <Authorization>
            <Layout/>
        </Authorization>
    );
};
