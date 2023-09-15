import React from 'react';

function Item({ item, handleInCartItem, handleDelete }) {
  const handleAddClick = () => {
    const patchInCartStatus = async () => {
      const response = await fetch(
        `http://localhost:4000/items/${item.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isInCart: !item.isInCart,
          }),
        }
      );
      const data = await response.json();
      handleInCartItem(data);
    };
    patchInCartStatus();
  };

  const handleDeleteRequest = () => {
    const deleteRequest = async () => {
      const response = await fetch(
        `http://localhost:4000/items/${item.id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await response.json();
      handleDelete(item);
    };
    deleteRequest();
  };

  return (
    <li className={item.isInCart ? 'in-cart' : ''}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        onClick={handleAddClick}
        className={item.isInCart ? 'remove' : 'add'}
      >
        {item.isInCart ? 'Remove From' : 'Add to'} Cart
      </button>
      <button className="remove" onClick={handleDeleteRequest}>
        Delete
      </button>
    </li>
  );
}

export default Item;
