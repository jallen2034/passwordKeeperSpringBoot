import React from 'react';

function RelativeInformation({url, name, category, id}){

  return (
    <>
      <div>
        <h4>{url}</h4>
        <h5>{category}</h5>
        <h5>{name}</h5>
      </div>
    </>
  );
}

export default RelativeInformation