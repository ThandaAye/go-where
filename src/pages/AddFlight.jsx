import React, { useState } from 'react';

const AddFlight = (props) => {

  // react hooks
  const [sth, setSth] = useState(0);

  return (
    <div>
      <h1>Hello World: {sth}</h1>
    </div>
  );
};

export default AddFlight;