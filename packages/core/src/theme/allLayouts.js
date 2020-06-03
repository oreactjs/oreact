import _ from '../lodash';
import appLayouts from 'layouts';
import defaultLayout from './defaultLayout/config';

export default _.merge({default: defaultLayout}, appLayouts || {});

