import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, Card } from '@material-tailwind/react';

export default function ListWithSelectedItem({
  categories,
  styleSel,
  setCategory,
  setCategories,
}) {
  const selectHandler = (e) => {
    const selectedName = e.target.innerText;
    if (e.target.name === 'All Categories') {
      setCategory(null);
    } else {
      setCategory(e.target.name);
    }
    const tempCategories = categories;
    for (let i = 0; i < tempCategories.length; i += 1) {
      if (tempCategories[i].name === selectedName) {
        tempCategories[i].selected = true;
        tempCategories[i].style = 'red';
      } else {
        tempCategories[i].selected = false;
        tempCategories[i].style = 'white';
      }
    }
    tempCategories.push({name: 'test'});
    setCategories(tempCategories);
    console.log(categories);
  };

  return (
    <Card className="w-96">
      <List>
        {categories.map((categoryEntry) => (
          <ListItem
            style={{ background: categoryEntry.style }}
            selected={categoryEntry.selected}
            name={categoryEntry.name}
            key={categoryEntry.name}
            onClick={selectHandler}
          >
            {categoryEntry.name}
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

// const function ListWithSelectedItem({
//   categories,
//   setStories,
//   filter,
//   myStories,
// }) {
//   const [selected, setSelected] = React.useState(1);
//   const setSelectedItem = (value) => setSelected(value);

//   const selectHandler = () => {
//     if ()
//   }

//   return (
//     <Card className="w-96">
//       <List>
//         {categories.map((categoryEntry) => (
//           <ListItem
//             selected={selected === 1}
//             onClick={() => {selectHandler} setSelectedItem(1)}
//           >
//             {categoryEntry.name}
//           </ListItem>
//         ))}
//       </List>
//     </Card>
//   );
// }
