/**
 * Reference: https://stackoverflow.com/questions/57171756/use-debounce-inside-a-custom-react-hook-for-input-change
 */
import {useRef} from 'react';
import _ from '@oreact/core/lodash';

function useDebounce(func, wait, options)
{
    return useRef(_.debounce(func, wait, options)).current;
}

export default useDebounce;
