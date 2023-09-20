import React from 'react';
import { List, ListItem, Card } from '@material-tailwind/react';

export default function Categories({
  categories,
  setCategory,
  setCategories,
}) {
  const selectHandler = (e) => {
    const selectedName = e.target.innerText;
    setCategory(selectedName === 'All Categories' ? null : selectedName);
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.map((cat) => {
        if (cat.cat_name === selectedName) {
          return { ...cat, selected: true };
        }
        return { ...cat, selected: false };
      });
      return [...updatedCategories];
    });
  };

  return (
    <Card className="rounded-none rounded-l-xl" style={{ maxWidth: '250px', justifySelf: 'flex-end', backgroundImage: `url(${leftPanel})`, backgroundSize: 'auto', backgroundRepeat: 'round' }}>
      <span className="self-center pt-5 pb-3">Categories</span>
      <List className="min-w-[0]">
        {categories.map((categoryEntry) => (
          <ListItem
            style={{ background: categoryEntry.selected ? '#F4E3ED' : 'white' }}
            selected={categoryEntry.selected}
            name={categoryEntry.cat_name}
            key={categoryEntry.cat_name}
            onClick={selectHandler}
          >
            {categoryEntry.cat_name}
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

const leftPanel = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695243090/paperLeft_uz9wcj.png';
