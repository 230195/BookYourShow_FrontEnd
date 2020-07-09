import React from 'react';
import {TextField, FormControl} from '@material-ui/core';
import {useNoUnderLineStyles} from '../layout/Style';

const DatePickerEditorCompoent = (props) => {
    const {row, column, handleChange} = props;
    const onChange = (e) => {
        handleChange(column.key, e.target.value, row.rowNumber);
    };
    const classes = useNoUnderLineStyles();

    function setDefaultDate(){
        const dateNow = new Date(); // Creating a new date object with the current date and time
        const year = dateNow.getFullYear(); // Getting current year from the created Date object
        const monthWithOffset = dateNow.getMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
        const month = // Setting current Month number from current Date object
            monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
                ? `0${monthWithOffset}`
                : monthWithOffset;
        const date =
            dateNow.getDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
                ? `0${dateNow.getDate()}`
                : dateNow.getDate();

        const materialDateInput = `${year}-${month}-${date}`
        return materialDateInput;
    }

    return ( 
        <FormControl fullWidth >
            <TextField
                id="launchDate"
                type="date"
                className="no-underline"
                onChange={onChange}
                defaultValue={row[column.key]||setDefaultDate()}
                InputLabelProps={{
                    shrink: false,
                }}
                InputProps = {{classes}}
                variant="standard"
            />
        </FormControl>
     );
}
 
export default DatePickerEditorCompoent;