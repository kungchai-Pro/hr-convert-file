import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { Link } from 'react-router-dom';





const customStyles = {
    headRow: {
        style: {
            border: 'none',
            backgroundColor: '#28B463'
        },
    },
    headCells: {
        style: {
            color: '#ffff',
            fontSize: '14px',
        },
    },
    rows: {
        highlightOnHoverStyle: {
            backgroundColor: 'rgb(230, 244, 244)',
            borderBottomColor: '#FFFFFF',
            borderRadius: '25px',
            outline: '1px solid #FFFFFF',
        },
    },
    pagination: {
        style: {
            border: 'none',
        },
    },
};



const columns = [
    // {
    //     name: 'file',
    //     selector: row =><img src={row.partFile} width="50" height="50" /> ,
    //     sortable: true,
    // },
    {
        name: 'Number',
        selector: row => row.Number.toString(),
        sortable: true,
    },
    {
        name: 'Name',
        selector: row => row.Name,
        sortable: true,
    },
    {
        name: 'Department',
        selector: row => row.Department,
        sortable: true,
        grow: 1,
    },
    {
        name: 'LeaveType',
        selector: row => row.LeaveType,
        sortable: true,
    },
    {
        name: 'Status',
        selector: row => row.Status,
        sortable: true,
        grow: 2,
    },
    {
        name: 'AppliedDate',
        selector: row => row.AppliedDate,
        sortable: true,
    },
    {
        name: 'StartDate',
        selector: row => row.StartDate,
        sortable: true,
    },
    {
        name: 'EndDate',
        selector: row => row.EndDate,
        sortable: true,
    },
    {
        name: 'SessionTime',
        selector: row => row.SessionTime,
        sortable: true,
        grow: 1,
    },
    {
        name: 'NoOfDays',
        selector: row => row.NoOfDays,
        sortable: true,
        grow: 1,
    },
    {
        name: 'Remarks',
        selector: row => row.Remarks,
        sortable: true,
        grow: 1,
    },
    {
        name: 'AppComment',
        selector: row => row.AppComment,
        sortable: true,
        grow: 1,
    },



];





const TableListDatalist = (dataAll) => {
    // console.log(data.data)
    var data = dataAll.data;
    
    const tableData = {
        columns,
        data,
        exportHeaders: false,
        print: false,
        export: false
    };


    function convertArrayOfObjectsToCSV(array) {
        let result;
        // console.log(data[0])
        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(data[0]);


        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        array.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];

                ctr++;
            });
            result += lineDelimiter;
        });
        //console.log(result);
        return result;
    }

    // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
    function downloadCSV(array) {
        const link = document.createElement('a');
        let csv = convertArrayOfObjectsToCSV(array);
        if (csv == null) return;

        const filename = `export${+ (new Date()).getTime()}.csv`;

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }

        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }

    const Export = ({ onExport }) => <button onClick={(e) => onExport(e.target.value)}>Export Excel .CSV</button>;
    // const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);

    return (
        <div>
            <div style={{width:'100%',marginLeft:'90%',padding:10}}>
                {data[0] && <Export onExport={() => downloadCSV(data)} />}
            </div>
            <DataTableExtensions
                {...tableData}
            >

                <DataTable
                    //  title=""
                    columns={columns}
                    //  actions={actionsMemo}
                    // data={datalist} 
                    customStyles={customStyles}
                    pagination
                    highlightOnHover
                />
            </DataTableExtensions>
        </div>
    );
};
export default TableListDatalist;
