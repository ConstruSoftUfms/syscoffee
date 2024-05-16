
'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react';
import './style.css';

export default function ProductRegistration() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!image) {
      setErrors({ image: 'Selecione uma imagem do produto' });
      return;
    }

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('price', String(price));
    formData.append('image', image);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Produto registrado com sucesso!');
        setProductName('');
        setDescription('');
        setPrice(0);
        setImage(null);
        setErrors({});
      } else {
        const data = await response.json();
        setErrors(data.errors);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <div className="product-registration" style={{ marginTop: '100px' }}>
      <h1 className="text-center text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-50 to-blue-500">
        SysCoffe
      </h1>

      <form onSubmit={handleSubmit} className="form" style={{ position: 'relative' }}>
        <div className="form-group">
          <label htmlFor="productName">Nome do Produto:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="input"
          />
          {errors.productName && <span className="error">{errors.productName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="input"
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="price">Preço:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
            className="input"
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="image">Carregar Imagem:</label>
          <input type="file" id="image" onChange={handleImageChange} className="image-upload" />
          {errors.image && <span className="error">{errors.image}</span>}
        </div>
        <button type="submit" className="btn btn-primary">
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
}





