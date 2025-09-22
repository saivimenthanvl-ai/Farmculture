import React, { useState, useEffect } from "react";
import { Store, Phone, MapPin, Star, Clock, Truck } from "lucide-react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useLanguage } from "@/contexts/LanguageContext";

interface Restaurant {
  id: string;
  name: string;
  type: string;
  location: string;
  phone: string;
  rating: number;
  requirements: string[];
  priceRange: string;
  deliveryTime: string;
  image: string;
}

interface Order {
  restaurantId: string;
  farmerName: string;
  phone: string;
  produce: string;
  quantity: number;
  expectedPrice: number;
}

export const RestaurantConnect: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderForm, setOrderForm] = useState<Partial<Order>>({});
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      // In a real app, this would fetch from Firebase
      const mockRestaurants: Restaurant[] = [
        {
          id: "1",
          name: "Fruitline",
          type: "Fruit and Vegetable Supplier",
          location: "Grójec, Poland",
          phone: "+48 537 899 273",
          rating: 4.5,
          requirements: ["Fruits", "Vegetables", "Biotech"],
          priceRange: "€0.27/kg",
          deliveryTime: "5 days",
          image: "images/fruitline.png",
        },
        {
          id: "2",
          name: "HelloFresh",
          type: "Health Food Chain",
          location: "Berlin, Germany",
          phone: "+493056839568",
          rating: 3.9,
          requirements: ["Organic Vegetables", "Herbs", "Fruits"],
          priceRange: "€0.99/kg",
          deliveryTime: "5 weeks",
          image: "images/Hello fresh.png",
        },
        {
          id: "3",
          name: "ProNatura Provence",
          type: "Fruit and vegetable wholesaler",
          location: "Cavaillon, France",
          phone: "+33490787300",
          rating: 3.8,
          requirements: ["Spices", "Vegetables", "Grains"],
          priceRange: "€0.43/kg",
          deliveryTime: "3-4 weeks",
          image: "images/pronatura.jpg",
        },
      ];

      setRestaurants(mockRestaurants);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setLoading(false);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, this would save to Firebase
      console.log("Order submitted:", orderForm);
      alert("Order request sent successfully! The restaurant will contact you within 24 hours.");
      setShowOrderForm(false);
      setOrderForm({});
      setSelectedRestaurant(null);
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Error submitting order. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading restaurant partners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("restaurant.title")}</h2>
        <p className="text-gray-600">{t("restaurant.subtitle")}</p>
      </div>

      {!showOrderForm ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{restaurant.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{restaurant.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-green-600 font-medium mb-2">{restaurant.type}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{restaurant.location}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{restaurant.phone}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Delivery: {restaurant.deliveryTime}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-800 mb-2">
                    {t("restaurant.requirements")}:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {restaurant.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-800">{restaurant.priceRange}</span>
                  <button
                    onClick={() => {
                      setSelectedRestaurant(restaurant);
                      setShowOrderForm(true);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    {t("restaurant.connect")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => {
                setShowOrderForm(false);
                setSelectedRestaurant(null);
              }}
              className="text-green-600 hover:text-green-700 font-medium mb-4"
            >
              ← Back to Restaurants
            </button>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Connect with {selectedRestaurant?.name}
            </h3>
            <p className="text-gray-600">Fill out the form below to send your produce offer</p>
          </div>

          <form onSubmit={handleSubmitOrder} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={orderForm.farmerName || ""}
                  onChange={(e) => setOrderForm({ ...orderForm, farmerName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={orderForm.phone || ""}
                  onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Produce Type
              </label>
              <select
                required
                value={orderForm.produce || ""}
                onChange={(e) => setOrderForm({ ...orderForm, produce: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select produce</option>
                {selectedRestaurant?.requirements.map((req) => (
                  <option key={req} value={req}>
                    {req}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity (kg)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={orderForm.quantity || ""}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, quantity: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Price (€/kg)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={orderForm.expectedPrice || ""}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, expectedPrice: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Truck className="w-5 h-5" />
              <span>Send Offer</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RestaurantConnect;
