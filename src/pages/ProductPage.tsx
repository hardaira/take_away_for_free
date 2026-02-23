import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard/ProductCard';

interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  location_city: string;
  contact: string;
  image: string;
}

export const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  // const [showDetails, setShowDetails] = useState(true);
  useEffect(() => {
    const loadProduct = async () => {
      const response = await fetch('/api/products.json');
      const products: Product[] = await response.json();

      const foundProduct = products.find(item => item.id === Number(productId));

      setProduct(foundProduct || null);

    };
    // setShowDetails(true);
    loadProduct();
  }, [productId]);

  return (
    <div className="section">
      <div
        className="container centered"
        style={{ maxWidth: '300px', margin: '0 auto' }}
      >
        {product && (
          <ProductCard
            id={product.id}
            title={product.title}
            category={product.category}
            description={product.description}
            location_city={product.location_city}
            contact={product.contact}
            image={product.image}
            showFullDetails={true}
          />
        )}
      </div>
    </div>
  );
};
