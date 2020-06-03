import _ from '../lodash';
import {defaultThemes} from "./defaultSettings";
import appThemes from 'themes';

export default _.merge({}, defaultThemes, appThemes || {});
