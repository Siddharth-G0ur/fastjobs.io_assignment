import { NextRouter, useRouter } from 'next/router'
import { useEffect, useState, useMemo,  } from 'react';
import Image from "next/image"
import { useGlobalFilter, useSortBy, useTable } from "react-table"


export default function protactedRoute() {

  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
    ],
    []
  );
  
  useEffect(() => {
    const auth = async () => {
      try {
        const resAuth = await fetch("https://frontendtestapi.staging.fastjobs.io/auth/me", {
        method: "GET",
        credentials: 'include',
        });
        if (!resAuth.ok) router.push("/");
      } catch (error) {
        console.log("error", error);
      }

      try {
        const resData = await fetch("https://frontendtestapi.staging.fastjobs.io/data", {
        method: "GET",
        credentials: 'include',
        });
        const resJSON = await resData.json();
        setData(resJSON);
        console.log(resJSON[0]);
      } catch (error) {
        console.log("error", error);
      }
    };

    auth();

  },[]);
    
  const router = useRouter()

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data}, useGlobalFilter, useSortBy);
  
  const isEven = (idx:any) => idx % 2 === 0;

    return (
        <>
        <div className='list-title'>
          <div style={{ width: "317px", height: "40px", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",padding: "0px", gap: "8px",}}>
            <p className='title-font'> Graphic Designer</p>
            <Image src="/Memo.png" alt=""  width="40" height="40" />
          </div>
        </div>
        
        
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
        </>
    )
    
}