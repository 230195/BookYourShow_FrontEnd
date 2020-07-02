import React from 'react';
import {MenuItem, Select, FormControl} from '@material-ui/core'

const DropdownComponent = (props) => {
    const {changeDropdown, row} = props;
    let handleChange = (e) => {
        changeDropdown(e.target.value, row)
    }
    return ( 
        <FormControl fullWidth className='dropdown-data-grid-col'>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={row?.id || 0}
            onChange={handleChange}
            >
                <MenuItem value={1}>One</MenuItem>
                <MenuItem value={2}>Two</MenuItem>
                <MenuItem value={3}>Three</MenuItem>
                <MenuItem value={4}>four</MenuItem>
                <MenuItem value={5}>five</MenuItem>
                <MenuItem value={6}>six</MenuItem>
            </Select>
        </FormControl>
     );
}
 
export default DropdownComponent;