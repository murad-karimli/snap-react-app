import React, { useState } from "react";

function Pagination(props) {
  var [page, setPage] = useState(1);
  var pageNum = 1;
  const { total = 144, current = 1, perPage = 24 } = props;

  const prevBtnHandler = () => {
    setPage((page = page - 1));
    console.log(page);
    props.onPage(page);
  };
  const nextBtnHandler = () => {
    setPage((page = page + 1));
    console.log(page);
    props.onPage(page);
  };
  const pagesHandler = () => {
    setPage((page = pageNum));
    props.onPage(page);
  };

  var pagination = new Array(Math.ceil(total / perPage));
  pagination.fill(2);
 
  return (
    <div className="flex ">
      <button
        key={-1}
        onClick={prevBtnHandler}
        className="text-white m-2 border-solid font-mono font-medium border-[1px] p-[12px] bg-gray-800 px-[9px] rounded-xl"
      >
        Previous
      </button>

      {pagination.map((page, index) => {
        return (
          <button
            key={index + 1}
            onClick={() => {
              pageNum = index + 1;
              pagesHandler();
            }}
            className="text-white m-2 font-mono font-medium border-solid border-[1px] p-[8px] bg-gray-800 px-[9px] rounded-xl"
          >
            {index + 1}
          </button>
        );
      })}

      <button
        key={2}
        onClick={nextBtnHandler}
        className="text-white m-2 font-mono font-medium border-solid border-[1px] p-[12px] bg-gray-800 px-[9px] rounded-xl"
      >
        Next
      </button>
    </div>
  );
}
export default Pagination;
