import React, {useState, useEffect} from 'react';
import DataGrid from "react-data-grid";
import Pagination from "react-js-pagination";
import 'react-data-grid/dist/react-data-grid.css';
import {isMobile, isTablet} from 'react-device-detect';
import axios from 'axios';
import {GetImagePath} from '../../helperMethods/CommonMethods';


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

const DataGridComponent = () => {
     
    const rows = [
        { id: 1, title: 'row1', count: 20}, { id: 2, title: 'row2', count: 40 }, { id: 3, title: 'row3', count: 60 },
        { id: 4, title: 'row1', count: 20}, { id: 5, title: 'row2', count: 40 }, { id: 6, title: 'row3', count: 60 },
        { id: 7, title: 'row1', count: 20}, { id: 8, title: 'row2', count: 40 }, { id: 9, title: 'row3', count: 60 },
        { id: 10, title: 'row1', count: 20}, { id: 11, title: 'row2', count: 40 }, { id: 12, title: 'row3', count: 60 },
        { id: 13, title: 'row1', count: 20}, { id: 14, title: 'row2', count: 40 }, { id: 15, title: 'row3', count: 60 },
        { id: 16, title: 'row1', count: 20}, { id: 17, title: 'row2', count: 40 }, { id: 18, title: 'row3', count: 60 },
        { id: 19, title: 'row1', count: 20}, { id: 20, title: 'row2', count: 40 }, { id: 21, title: 'row3', count: 60 },
    ];

    const columns = [
        { key: 'id', name: 'ID',  resizable:true },
        {key:'thumbnailUrl', name:'Image', formatter: ImageHelper, resizable: true, width :300},
        {key: 'movieName', name: 'Movie Name', resizable: true},
        { key: 'movieSummary', name: 'Summary', editable:true, resizable:true },
        { key: 'launchDate', name: 'Launch Date', editable:true,  resizable:true }
    ];
    const [grid, setGrid] = useState({
        rows,
        activePage: 1,
        itemPerPage: 10,
        totalItemCount: 10,
        pageRangeDisplayed: 5,
        isLoaded: false
    });
    const getGridData = () => {
        axios.get(`movie/GetMoviePagination?pageNumber=${grid.activePage}&pageSize=${grid.itemPerPage}`)
            .then((res) => {
                let result = res?.data?.data;
                if(result){
                    console.log(result.data[1])
                    setGrid({
                        ...grid,
                        totalItemCount: result.totalItemCount,
                        rows: result.data,
                        isLoaded: true
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
        console.log(`active page is ${pageNumber}`);
        setGrid({
            ...grid,
            activePage: pageNumber
        });
        console.log(grid)
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