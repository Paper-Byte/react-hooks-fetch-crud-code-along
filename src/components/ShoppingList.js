import React, { useState, useEffect } from 'react';
import ItemForm from './ItemForm';
import Filter from './Filter';
import Item from './Item';

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItemList = async () => {
      const resp = await fetch('http://localhost:4000/items');
      const data = await resp.json();
      setItems(data);
    };
    fetchItemList();
    console.log(items);
  }, []);

  const handleItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleInCartItem = (cartItem) => {
    const updatedItems = items.map((item) => {
      if (item.id === cartItem.id) {
        return cartItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  };

  const handleDelete = (deletedItem) => {
    const updatedItems = items.filter((item) => {
      return item.id !== deletedItem.id;
    });
    setItems(updatedItems);
  };

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === 'All') return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm handleNewItem={handleItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleInCartItem={handleInCartItem}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
