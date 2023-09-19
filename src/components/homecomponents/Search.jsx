import React from 'react';
import { Input, Button } from '@material-tailwind/react';
import axios from 'axios';

export default function Search({
  category, filter, setStories, setNoCheck,
}) {
  const [search, setSearch] = React.useState('');
  const onChange = ({ target }) => {
    setNoCheck(true);
    setSearch(target.value);
  };
  const submitHandler = () => {
    const dataParams = {
      params: {
        category,
        filter,
        search,
      },
    };

    axios.get('/api/search', dataParams)
      .then((response) => {
        setStories(response.data);
        setNoCheck(false);
        setSearch('');
      });
  };

  return (
    <div className="relative flex w-full max-w-[24rem]">
      <Input
        type="Search"
        label="Search"
        value={search}
        onChange={onChange}
        className="pr-20"
        containerProps={{
          className: 'min-w-0',
        }}
      />
      <Button
        size="sm"
        color={search ? 'gray' : 'blue-gray'}
        disabled={!search}
        onClick={submitHandler}
        className="!absolute right-1 top-1 rounded"
      >
        Search
      </Button>
    </div>
  );
}
