import React, {useState, useEffect} from 'react';
import DataGrid from "react-data-grid";
import Pagination from "react-js-pagination";
import 'react-data-grid/dist/react-data-grid.css';
import {isMobile, isTablet} from 'react-device-detect';
import axios from 'axios';
import {GetImagePath} from '../../helperMethods/CommonMethods';
import DropDownEditor from '../helperComponents/DropDownComponents';
import { GridOnSharp } from '@material-ui/icons';

const ImageHelper = (props) => {
    let url = props.row?.thumbnailUrl;
    if(url){
        return ( 
            <img src={GetImagePath(url)} alt="imagename"/>
         );
    }else{
        return ( 
            <img src="#" alt="imagename"/>
         );
    }
   
}

const DataGridComponent = (props) => {

    const [grid, setGrid] = useState({
        rows: [],
        activePage: 1,
        itemPerPage: 3,
        totalItemCount: 10,
        pageRangeDisplayed: 5,
        isLoaded: false
    });

    const changeDropdown = (val, rowItem) => {
        let rows = grid.rows.map(row => {
            if(row.id === rowItem.id){
                row.id = val
            }
            return row;
        });
        setGrid({
            ...grid,
            rows 
        })
    };

    const columns = [
        { key: 'id', name: 'ID',  resizable:true },
        { key:'thumbnailUrl', name:'Image', formatter: ImageHelper, resizable: true, width :300},
        { key: 'movieName', name: 'Movie Name', resizable: true},
        { key: 'movieSummary', name: 'Summary', editable:true, resizable:true },
        { key: 'launchDate', name: 'Launch Date', editable:true,  resizable:true },
        { key:'mediaUrls', name:'dropdown', editable:true, formatter:(props) => <DropDownEditor {...props} changeDropdown={changeDropdown} />},
    ];
   
    const getGridData = (pageNumber) => {
        axios.get(`movie/GetMoviePagination?pageNumber=${pageNumber||grid.activePage}&pageSize=${grid.itemPerPage}`)
            .then((res) => {
                let result = res?.data?.data;
                if(result){
                    setGrid({
                        ...grid,
                        totalItemCount: result.totalItemCount,
                        rows: result.data,
                        isLoaded: true,
                        activePage: pageNumber||grid.activePage
                    })
                }
            });
    }
    
    useEffect(() => {
        setGrid({
            ...grid,
            isLoaded: false
        });
        getGridData();
    }, [])

    const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        setGrid(state => {
            const rows = grid.rows.slice();
            updated.count = Number(updated.count)
            for (let i = fromRow; i <= toRow; i++) {
                rows[i] = { ...rows[i], ...updated };
            }
            return { 
                ...grid,
                rows
             };
        });
        console.log(grid)
      };

      const handlePageChange = (pageNumber) => {
        setGrid({
            ...grid,
            activePage: pageNumber
        });
        getGridData(pageNumber);
        console.log(grid);
      }
    
    return ( 
        <div className='text-align-center'>
        <h2 className="heading-constant">Data Module</h2>
        <div>
            <DataGrid
                columns={columns}
                rows={grid.rows}            
                enableCellCopyPaste
                onRowsUpdate={onGridRowsUpdated}
                enableCellSelect
                rowHeight={150}
                height={500}
                headerRowHeight={40}
            />
            <Pagination
                hideNavigation={isMobile? isTablet? false: true :false}
                activePage={grid.activePage}
                itemsCountPerPage={grid.itemPerPage}
                totalItemsCount={grid.totalItemCount}
                pageRangeDisplayed={isMobile? isTablet? 5: 3: 5}
                onChange={handlePageChange}
            />
      </div>
    </div>
       
    );
}
 
export default DataGridComponent;