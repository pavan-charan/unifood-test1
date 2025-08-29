import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Leaf, 
  Flame,
  Plus,
  Minus,
  Heart,
  ShoppingCart
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { MenuItem } from '../../types';

export const MenuBrowser: React.FC = () => {
  const { 
    menuItems, 
    addToCart, 
    cartItems,
    updateCartQuantity,
    searchTerm, 
    setSearchTerm,
    selectedCategory,
    setSelectedCategory 
  } = useApp();

  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [maxSpiceLevel, setMaxSpiceLevel] = useState(5);
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = ['', 'Breakfast', 'Main Course', 'Appetizer', 'Beverages', 'Desserts'];
  const cuisines = ['', 'Indian', 'South Indian', 'Chinese', 'Continental'];

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      const matchesPrice = item.price >= priceRange.min && item.price <= priceRange.max;
      const matchesVeg = !showVegOnly || item.isVeg;
      const matchesCuisine = !selectedCuisine || item.cuisine === selectedCuisine;
      const matchesSpice = item.spiceLevel <= maxSpiceLevel;
      const isAvailable = item.isAvailable;

      return matchesSearch && matchesCategory && matchesPrice && 
             matchesVeg && matchesCuisine && matchesSpice && isAvailable;
    });
  }, [menuItems, searchTerm, selectedCategory, priceRange, showVegOnly, selectedCuisine, maxSpiceLevel]);

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getCartItem = (itemId: string) => {
    return cartItems.find(item => item.id === itemId);
  };
  const renderSpiceLevel = (level: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Flame
            key={i}
            className={`w-3 h-3 ${
              i < level ? 'text-red-500' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderCartButton = (item: MenuItem) => {
    const cartItem = getCartItem(item.id);
    
    if (cartItem) {
      return (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
            <button
              onClick={() => updateCartQuantity(item.id, cartItem.quantity - 1)}
              className="w-6 h-6 rounded-full bg-white border border-blue-300 flex items-center justify-center hover:bg-blue-50 transition-colors"
            >
              <Minus className="w-3 h-3 text-blue-600" />
            </button>
            <span className="text-sm font-medium text-blue-800 w-8 text-center">{cartItem.quantity}</span>
            <button
              onClick={() => updateCartQuantity(item.id, cartItem.quantity + 1)}
              className="w-6 h-6 rounded-full bg-white border border-blue-300 flex items-center justify-center hover:bg-blue-50 transition-colors"
            >
              <Plus className="w-3 h-3 text-blue-600" />
            </button>
          </div>
          <span className="text-sm font-medium text-blue-600">In Cart</span>
        </div>
      );
    }

    return (
      <button
        onClick={() => addToCart(item)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
      >
        <ShoppingCart className="w-4 h-4" />
        <span>Add to Cart</span>
      </button>
    );
  };
  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for dishes, ingredients, or cuisine..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category || 'All Categories'}
                </option>
              ))}
            </select>
          </div>

          {/* Cuisine Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuisine
            </label>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>
                  {cuisine || 'All Cuisines'}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price: ₹{priceRange.max}
            </label>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>

          {/* Additional Filters */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showVegOnly}
                onChange={(e) => setShowVegOnly(e.target.checked)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">Vegetarian Only</span>
              <Leaf className="w-4 h-4 text-green-500" />
            </label>
            <div>
              <label className="block text-xs text-gray-600">Max Spice Level</label>
              <input
                type="range"
                min="0"
                max="5"
                value={maxSpiceLevel}
                onChange={(e) => setMaxSpiceLevel(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          const cartItem = getCartItem(item.id);
          const isInCart = !!cartItem;
          
          <div key={item.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <button
                onClick={() => toggleFavorite(item.id)}
                className={`absolute top-3 right-3 p-2 rounded-full ${
                  favorites.includes(item.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-600 hover:text-red-500'
                } transition-colors`}
              >
                <Heart className="w-4 h-4" />
              </button>
              {item.isVeg && (
                <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <div key={item.id} className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-all ${
              isInCart ? 'ring-2 ring-blue-200 bg-blue-50' : ''
            }`}>
                  <span>VEG</span>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <span className="text-lg font-bold text-blue-600">₹{item.price}</span>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">
                      {item.averageRating.toFixed(1)} ({item.reviewCount})
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{item.preparationTime}m</span>
                </div>
              </div>

              {item.spiceLevel > 0 && (
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs text-gray-600">Spice:</span>
                  {renderSpiceLevel(item.spiceLevel)}
                </div>
              )}
                <div className="mb-4">
              <div className="mb-3">
                  {item.allergens.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.allergens.map(allergen => (
                        <span
                          key={allergen}
                          className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
                {renderCartButton(item)}
              </button>
            </div>
          );
        })}
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or filters to find more items.
          </p>
        </div>
      )}
    </div>
  );
};