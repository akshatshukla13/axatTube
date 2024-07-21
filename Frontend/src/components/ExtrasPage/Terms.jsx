import React, { useEffect } from "react";


function Terms() {


  useEffect(() => {
    
    console.log("called");
  }, [])


  const state = null


  return (
    <>
      <div>hii akshat</div>
      <button
        onClick={(e) => {

        }}
      >
        click
      </button>

      {state.isLoading && <div>Loading...</div>}

      {state.isError && <div>Error...</div>}

      {state.data && <div>{JSON.stringify(state.data)}</div>}
    </>
  );
}

export default Terms;
