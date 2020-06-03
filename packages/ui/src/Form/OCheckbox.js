import React from 'react';
import {withFormsy} from 'formsy-react';
import _ from '@oreact/core/lodash';
import {Checkbox, FormControl, FormControlLabel, FormHelperText} from '@material-ui/core';

export default React.memo(withFormsy((props) =>
{
    const importedProps = _.pick(props, [
        'checkedIcon',
        'classes',
        'color',
        'disabled',
        'disableRipple',
        'icon',
        'id',
        'indeterminate',
        'indeterminateIcon',
        'inputProps',
        'inputRef',
        'onChange',
        'variant'
    ]);

    // An error message is returned only if the component is invalid
    const errorMessage = props.getErrorMessage();
    const value = props.getValue();

    function changeValue(event)
    {
        props.setValue(event.target.checked);
        if ( props.onChange )
        {
            props.onChange(event);
        }
    }

    return (
        <FormControl error={Boolean(errorMessage)} className={props.className}>
            <FormControlLabel
                control={
                    <Checkbox
                        {...importedProps}
                        type='checkbox'
                        checked={value}
                        onChange={changeValue}
                    />
                }
                label={props.label}
            />
            {Boolean(errorMessage) && (
                <FormHelperText>{errorMessage}</FormHelperText>
            )}
        </FormControl>
    );
}));
