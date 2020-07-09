import React, {Component, useState} from 'react';
import {MenuItem, Select, FormControl} from '@material-ui/core';

const DropdownEitorComponent = (props) => {
    const {row, options, column, handleChange} = props;
    const onChange = (e) => {
        handleChange(column.key, e.target.value, row.rowNumber);
    };
    
    const disableStyle = () => {
        return {
            backgroundColor: '#A4A4A4',
            fontWeight: 600,
            color: '#FFF'
        }
    }

    const createOptions = () => {
        let optionsHtml = [];
        options.forEach( option => {
            optionsHtml.push( <MenuItem key={option.value||0} value={option.value} >{option.title}</MenuItem> );
        });
        return optionsHtml;    
    }


    return (  
        <FormControl fullWidth className='dropdown-data-grid-col'>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={row[column.key] || 0}
            onChange={onChange}
            disableUnderline
            >
            {createOptions()}
            </Select>
        </FormControl>
    );
}

// class DropdownEditorComponent1 extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//           buySell : props.value
//         }
//     }
    
//     getInputNode = () => {
//         return ReactDOM.findDOMNode(this);
//     }

//     onChange = evt => {
//         this.setState( 
//             { buySell : evt.target.value }, 
//             () => this.props.onCommit() 
//         );
//     }

//     getValue = () => {  
//         return { buySell: this.state.val };
//     }

//     getStyle = () => {
//         return {
//             width: '100%',
//             height: '100%'
//         }
//     }

//     disableStyle = () => {
//         return {
//             backgroundColor: '#A4A4A4',
//             fontWeight: 600,
//             color: '#FFF'
//         }
//     }

//     createOptions = () => {
//         let options = [];
//         this.props.options.forEach( group => {
//             options.push( <MenuItem key={group.category} style={this.disableStyle()} disabled>{group.category}</MenuItem> );
//             group.child.forEach( opt => {
//             options.push( <MenuItem key={opt.label} value={opt.value}>{opt.label}</MenuItem> )
//             });
//         });
//         return options;    
//     }

//     render() {
//     return (
//         <Select style={this.getStyle()} defaultValue={this.props.value} onBlur={this.props.onBlur} onChange={this.onChange} >
//             {this.createOptions()}
//         </Select>
//         );
//     }
// }

  export default DropdownEitorComponent;