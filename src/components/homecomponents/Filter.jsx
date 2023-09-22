import React, { useState } from 'react';
import { Select, Option } from '@material-tailwind/react';

export default function Filter({ setFilter }) {
  const [optionsState, setOptionsState] = useState('Top');

  const changeHandler = (e) => {
    setOptionsState(e);
    setFilter(e);
  };

  return (
    <div className="w-72">
      <Select
        value={optionsState}
        onChange={changeHandler}
        label="Filter"
        color="indigo"
      >
        <Option value="Top">Top</Option>
        <Option value="New">New</Option>
      </Select>
    </div>
  );
}
