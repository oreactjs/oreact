import React from 'react';
import {withFormsy} from 'formsy-react';
import _ from '@oreact/core/lodash';
import {FormControl, FormHelperText, FormLabel, RadioGroup} from '@material-ui/core';

export default React.memo(withFormsy((props) =>
{
    const importedProps = _.pick(props, [
        'children',
        'name',
        'onBlur',
        'onChange',
        'onKeyDown',
        'variant'
    ]);

    // An error message is returned only if the component is invalid
    const errorMessage = props.getErrorMessage();
    const value = props.getValue();

    function changeValue(event, value)
    {
        props.setValue(value);
        if ( props.onChange )
        {
            props.onChange(event);
        }
    }

    return (
        <FormControl error={Boolean(errorMessage)} className={props.className}>
            <FormControl component="fieldset" required={props.required} error={Boolean(errorMessage)}>
                {props.label && (
                    <FormLabel component="legend">{props.label}</FormLabel>
                )}
                <RadioGroup
                    {...importedProps}
                    value={value}
                    onChange={changeValue}
                />
                {Boolean(errorMessage) && (
                    <FormHelperText>{errorMessage}</FormHelperText>
                )}
            </FormControl>
        </FormControl>
    );
}));
