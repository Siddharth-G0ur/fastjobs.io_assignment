import { NextRouter, useRouter } from 'next/router'
import { useEffect, useState, useMemo,  } from 'react';
import Image from "next/image"
import { useSortBy, useTable, useGlobalFilter, useFilters } from "react-table"
import { BsTable, BsSearch } from "react-icons/bs";

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

  const { getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter,useFilters, useSortBy );
  
  const isEven = (idx: any) => idx % 2 === 0;

  const { globalFilter } = state;

    return (
        <div className='page-style'>
        <div className='list-title'>
          <div style={{ width: "317px", height: "40px", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",padding: "0px", gap: "8px",}}>
            <p className='title-font'> Graphic Designer</p>
            <Image src="/Memo.png" alt=""  width="40" height="40" />
          </div>
        </div> 
      
        <div className='page-style2' >
          <div className='page-style3 '>
            <div className='page-style3-1'>
              <BsTable />TableView
            </div>

            <div className='page-style3-2 '>
             
              <div className='some-text' style={{ paddingRight: "5px", paddingBottom:"2px"}}>
                Search
              </div>
              <div className='some-text' style={{ paddingRight: "30px", paddingBottom:"2px"}}>
                Filter
              </div>
             
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}  />
              {/* <BsSearch style={{ paddingBottom: "2px" }} /> */}
              <button style={{ width: "66px", height: "24px", background: "#6776FF", borderRadius: "4px 4px 4px 4px", outline:"none", border: "0px" , alignItems: "center", color: "#FFFFFF"}}>
                New
              </button>
            </div>
          </div>
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                {column.filterable ? (
                  <div>{column.render("Filter")}</div>
                  ) : null}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                    ? ' 🔽'
                    : ' 🔼'
                    : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
        </div>
    )
    
}

function GlobalFilter({ filter, setFilter }) {
  return (
  <div >
      
  <input
    value={filter || ""}
    onChange={(e) => {
      setFilter(e.target.value);
    }}
        placeholder="Type to search"
    />
  </div>
);
}