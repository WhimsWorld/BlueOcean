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
    <Card>
      <List className="min-w-[0]">
        {categories.map((categoryEntry) => (
          <ListItem
            style={{ background: categoryEntry.selected ? 'grey' : 'white' }}
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
