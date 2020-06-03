import {useLocation} from 'react-router-dom';

export default () => {
    let params = new URLSearchParams(useLocation().search);
    let paramObj = {};
    for (const [key, value] of params) {
        paramObj[key] = value;
    }
    return paramObj;
}
