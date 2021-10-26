import React, { useState } from 'react';
import './App.css';
import uniqid from 'uniqid';

const initialProductList = [
  { id: 1, name: 'produit 1', price: 50, quantity: 1 },
  { id: 2, name: 'produit 2', price: 75, quantity: 2 },
  { id: 3, name: 'produit 3', price: 20, quantity: 5 },
];

function App() {
  const [products, setProducts] = useState(initialProductList);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  const handleSubmitNewProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: uniqid(),
      name: newProductName,
      price: newProductPrice,
      quantity: 1,
    };
    setProducts([...products, newProduct]);
  };

  return (
    <div className='App'>
      <h1>Ma commande</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Prix total</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ name, price, quantity, id }) => {
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{price}</td>
                <td>
                  <input
                    value={quantity}
                    type='number'
                    min='0'
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value, 10);
                      if (isNaN(newQuantity)) return;

                      if (newQuantity === 0) {
                        const confirmDelete = window.confirm(
                          'Etes-vous sûr de bien vouloir retirer ce produit de la liste ?'
                        );

                        if (confirmDelete) {
                          setProducts(
                            products.filter((p) => {
                              return p.id !== id;
                            })
                          );
                        }
                      } else {
                        setProducts(
                          products.map((currentProduct) => {
                            if (currentProduct.id === id) {
                              return {
                                ...currentProduct,
                                quantity: newQuantity,
                              };
                            } else {
                              return currentProduct;
                            }
                          })
                        );
                        /*
                        const productsCopy = [...products];
                        const productToUpdate = productsCopy.find(
                          (p) => p.id === id
                        );
                        productToUpdate.quantity = newQuantity;
                        setProducts(productsCopy);
                        */
                      }
                    }}
                  />
                </td>
                <td>{price * quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        Montant total de la commande :{' '}
        {products.reduce((sum, { price, quantity }) => {
          return sum + price * quantity;
        }, 0)}{' '}
        euros
      </p>
      <form onSubmit={handleSubmitNewProduct}>
        <h2>Ajouter un produit</h2>

        <label htmlFor='newProductName'>
          Nom :
          <input
            id='newProductName'
            required
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
          />
        </label>

        <label htmlFor='newProductPrice'>
          Prix :
          <input
            type='number'
            min='0'
            required
            id='newProductPrice'
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(parseInt(e.target.value, 10))}
          />
        </label>
        <button type='submit'>Ajouter</button>
      </form>
    </div>
  );
}

export default App;
