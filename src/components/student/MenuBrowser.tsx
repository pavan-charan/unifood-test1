import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, Heart, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { MenuItem } from '../../types';

export const MenuBrowser: React.FC = () => {
  const { menuItems, addToCart, removeFromCart, cart, addToFavorites, removeFromFavorites, favorites } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];
  const cuisines = ['all', ...new Set(menuItems.map(item => item.cuisine))];

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesCuisine = selectedCuisine === 'all' || item.cuisine === selectedCuisine;
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesDietary = dietaryFilter === 'all' || 
                            (dietaryFilter === 'veg' && item.isVegetarian) ||
                            (dietaryFilter === 'non-veg' && !item.isVegetarian);
      
      return matchesSearch && matchesCategory && matchesCuisine && matchesPrice && matchesDietary && item.isAvailable;
    });
  }, [menuItems, searchTerm, selectedCategory, selectedCuisine, priceRange, dietaryFilter]);

  const getCartQuantity = (itemId: string) => {
    const cartItem = cart.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
  };

  const handleIncreaseQuantity = (item: MenuItem) => {
    addToCart(item);
  };

  const handleDecreaseQuantity = (itemId: string) => {
    removeFromCart(itemId);
  };

  const toggleFavorite = (item: MenuItem) => {
    if (favorites.some(fav => fav.id === item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  const renderQuantityControls = (item: MenuItem) => {
    const quantity = getCartQuantity(item.id);
    
    if (quantity === 0) {
      return (
        <button
          onClick={() => handleAddToCart(item)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      );
    }

    return (
      <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-2">
        <button
          onClick={() => handleDecreaseQuantity(item.id)}
          className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="font-medium text-blue-800 px-3">{quantity}</span>
        <button
          onClick={() => handleIncreaseQuantity(item)}
          className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Today's Menu</h1>
        <p className="text-blue-100">Fresh, delicious meals prepared daily</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for food items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine === 'all' ? 'All Cuisines' : cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dietary</label>
              <select
                value={dietaryFilter}
                onChange={(e) => setDietaryFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Items</option>
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => {
          const quantity = getCartQuantity(item.id);
          const isFavorite = favorites.some(fav => fav.id === item.id);
          
          return (
            <div key={item.id} className={`bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${quantity > 0 ? 'ring-2 ring-blue-200 bg-blue-50' : ''}`}>
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleFavorite(item)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                    isFavorite 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                      : 'bg-white text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                {quantity > 0 && (
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    In Cart
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-gray-900">₹{item.price}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.isVegetarian 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.isVegetarian ? 'Veg' : 'Non-Veg'}
                    </span>
                    <span className="text-xs text-gray-500">{item.preparationTime}m</span>
                  </div>
                </div>

                {/* Allergens */}
                {item.allergens && item.allergens.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Contains:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.allergens.map(allergen => (
                        <span key={allergen} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add to Cart / Quantity Controls */}
                <div className="mt-4">
                  {renderQuantityControls(item)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};