import React from 'react';
import { Select, Option } from '@material-tailwind/react';

export default function Filter() {
  return (
    <div className="w-72">
      <Select label="Filter">
        <Option>Top</Option>
        <Option>New</Option>
      </Select>
    </div>
  );
}
