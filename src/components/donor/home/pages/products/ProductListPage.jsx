// Essentials
import * as React from 'react';
import { useState } from 'react';

// Components
import ListTitle from './components/ListTitle';
import LocationCard from './components/LocationCard';
import PostProductModal from './components/PostProductModal';
import CreateRequestModal from './components/CreateRequestModal';
import ProductList from './components/ProductList';

const ProductListPage = () => {
  // Product List
  const [minExpiredDate, setMinExpiredDate] = useState('');

  // Post Product Modal
  const [showAddFood, setShowAddFood] = useState(false);
  const onCloseAddFood = () => setShowAddFood(false);
  const onShowAddFood = () => setShowAddFood(true);

  // Create Request Modal
  const [showCreateRequest, setShowCreateRequest] = useState(false);
  const onCloseCreateRequest = () => setShowCreateRequest(false);
  const onShowCreateRequest = () => setShowCreateRequest(true);

  return (
    <>
      <div>
        <ListTitle onShowAddFood={onShowAddFood} onShowCreateRequest={onShowCreateRequest} />
        <LocationCard />
        <ProductList setMinExpiredDate={setMinExpiredDate}/>
      </div>
      <PostProductModal show={showAddFood} onClose={onCloseAddFood} />
      <CreateRequestModal show={showCreateRequest} onClose={onCloseCreateRequest} minExpiredDate={minExpiredDate}/>
    </>
  );
};

export default ProductListPage;
