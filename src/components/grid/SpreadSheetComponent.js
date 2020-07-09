import React, {useState, useEffect} from 'react';
import DataGrid from "react-data-grid";
import 'react-data-grid/dist/react-data-grid.css';
import {isMobile, isTablet} from 'react-device-detect';
import { Button, Grid } from '@material-ui/core';
import DropdownEditorComponent from '../helperComponents/DropdownEditorComponent';
import DatePickerEditorComponent from '../helperComponents/DatePickerEditorComponent';
import { ToastContainer } from 'react-toastify';
import toast from '../../axios.interceptor';

let count = 1;
const SpreadSheetComponent = (props) => {
    
    const [grid, setGrid] = useState({
        rows: [],
        activePage: 1,
        itemPerPage: 3,
        totalItemCount: 10,
        pageRangeDisplayed: 5,
        isLoaded: false
    });

    const rowConstant = {
        first: 1
    }

    const mockList = [
        {
            title: 'Select',
            value: undefined
        },
        {
            title: 'Buy',
            value: 1
        },
        {
            title: 'Sell',
            value: 2
        }
      ];

    const handleChange = (key, value, rowNumber) => {
        setGrid(state => {
            let rows = grid.rows.slice();
            rows[rowNumber-1] = { ...rows[rowNumber-1], [key] : value };
            return {
                ...grid,
                rows
            }
        });
    };
    const columns = [
        { key: 'rowNumber', name: 'S.No',  resizable:true },
        { key:'dateIn', name: 'Date In', resizable: true, editable: true,
            formatter: (props) =>  <DatePickerEditorComponent {...props}  handleChange={handleChange}/>},
        { key: 'entryPrice', name: 'Entry Price', resizable: true, editable: true},
        { key: 'buySell', name: 'Buy/Sell', editable: true, resizable: true,
            formatter:(props) => <DropdownEditorComponent {...props} options={mockList} handleChange={handleChange} />},
        { key: 'dateOut', name: 'Date Out', editable: true,  resizable: true,
            formatter: (props) =>  <DatePickerEditorComponent {...props}  handleChange={handleChange}/>},
        { key: 'exitPrice', name: 'Exit Price', editable: true, resizable: true},
        { key: 'quantity', name: 'Qty', editable: true, resizable: true},
        { key: 'profit', name: 'Profit/Loss', editable: true, resizable: true},
        { key: 'balance', name: 'Balance', editable: true, resizable: true}
    ];
   
    const addRow = () => {
        setGrid({
            ...grid,
            rows :[
                ...grid.rows,
                {
                    rowNumber: count++,
                    dateIn: '',
                    entryPrice: '',
                    buySell : undefined,
                    dateOut: '',
                    exitPrice: '',
                    profit: '',
                    quantity: '',
                    balance: '',
                },
            ]
        })
    };

    const updateBalance = (rowNumber, updatedValue) => {
        if(rowNumber == rowConstant.first){
            updatedValue.balance = Number(updatedValue.profit);
        }else if(rowNumber > rowConstant.first){
            updatedValue.balance = Number(updatedValue.profit) + Number(grid.rows[rowNumber-2].balance);
        }
        return updatedValue;
    }

    const convertToValidAmount = (number) => {
        if(!isNaN(number) && Number(number) > 0){
            return Math.round(number * 100) / 100;
        }
        toast.error("Please enter a valid price!!!!");
        return undefined;
    };
   
    const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        setGrid(state => {
            const rows = grid.rows.slice();
            for (let i = fromRow; i <= toRow; i++) {
                if((updated.entryPrice)){
                    updated.entryPrice = convertToValidAmount(updated.entryPrice);
                    if(!updated.entryPrice)
                        return{
                            ...grid
                        };
                    updated.profit = (rows[i].exitPrice-updated.entryPrice)*rows[i].quantity;
                    updated = updateBalance(i+1, updated);
                }else if((updated.exitPrice)){
                    updated.exitPrice = convertToValidAmount(updated.exitPrice);
                    if(!updated.exitPrice)
                    return{
                        ...grid
                    };
                    updated.profit =(updated.exitPrice-rows[i].entryPrice)*rows[i].quantity;
                    updated = updateBalance(i+1, updated);
                }else if((updated.quantity)){
                    updated.profit = (rows[i].exitPrice-rows[i].entryPrice)*updated.quantity;
                    updated = updateBalance(i+1, updated);
                }
                console.log(updated)
                rows[i] = { ...rows[i], ...updated };
            }
            return { 
                ...grid,
                rows
             };
        });
        console.log(grid)
      };
    
    return ( 
        <div className='text-align-center'>
        <h2 className="heading-constant">Spread Sheet Data</h2>
        <Grid container className="text-align-center" justify="center" alignItems="center">
            <Grid item xs={12} sm={12}  md={12}>
                <Button size="small" variant="contained" className="btn-add-row" color="primary" onClick={addRow}>
                    Add Row
            </Button>
            </Grid>
            <Grid item xs={12} sm={12}  md={12}>
                <DataGrid
                    columns={columns}
                    rows={grid.rows}
                    enableCellCopyPaste
                    onRowsUpdate={onGridRowsUpdated}
                    enableCellSelect
                    height={450}
                />
            </Grid>
        </Grid>
    </div>
       
    );
}
 
export default SpreadSheetComponent;