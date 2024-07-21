import React, { useEffect } from "react";

const PrivacyPolicy = () => {

 

  useEffect(() => {
    
  }, []);

  const { data, isLoading, isError } = null

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading channel details.</div>;
  }

  

  return (
    <div>
      <h1>Privacy Policy</h1>
      {data ? (
        <div>
          <p>{JSON.stringify(data)}</p>
        </div>
      ) : (
        <div>No data available</div>
      )}
      <h1>hii</h1>
     
    </div>
  );
};

export default PrivacyPolicy;
