import { useState } from 'react'
import data from './data/data.json';

function App() {
    const [tableData, setTableData] = useState(data)
    const [sortDirection, setSortDirection] = useState('');

    const getColumns = (inputData) => {
        let keys = Object.keys(inputData[0]);
        inputData.forEach((obj) => {
            let objKeys = Object.keys(obj);
            if(objKeys.length > keys.length) {
                keys = objKeys
            }
        })
        return keys;
    }

    const sort = (key) => {
        let sortedData = [...tableData];
        let newSortDirection = 'asc';
        if(sortDirection === '') {
            setSortDirection(`${key};asc`)
        }
        else {
            const parts = sortDirection.split(';');
            if(parts.length === 2 && parts[0] === key && parts[1] === 'asc') newSortDirection = 'desc';
        }
        sortedData.sort((a,b) => {
            if(newSortDirection === 'asc') {
                return a[key] < b[key] ? -1: 1;
            } 
            else {
                return a[key] < b[key] ? 1 : -1;
            }
        })
        setTableData(sortedData);
        setSortDirection(`${key};${newSortDirection}`);
    }

    const getTableHeader = (keys) => {
        return <tr>
            {keys.map((key) => <th onClick={() => sort(key)}>
                {key}
            </th>)}
        </tr>
    }

    const getTableBody = (inputData, keys) => {
        const body = 
            inputData.map((element) => {
                return <tr>
                {keys.map((key) => {
                    return <td>
                        {element[key] ? element[key] : "-"}
                    </td>
                })}
                </tr>
            })
        return body;
    }

    const generateTable = (inputData) => {
        const keys = getColumns(inputData)
        return <table>
            <thead>
                {getTableHeader(keys)}    
            </thead>
            <tbody>
                {getTableBody(inputData, keys)}
            </tbody>
        </table>
    }
    

  return (
    <div className="table">
        {generateTable(tableData)}
    </div>
  );
}

export default App;
