"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingCart,
  Star,
  Heart,
  Award,
  Filter,
  Eye,
  Search,
  Truck,
  RotateCcw,
  Clock
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const categories = [
  { id: "all", name: "All Products" },
  { id: "cleansers", name: "Cleansers" },
  { id: "serums", name: "Serums" },
];

const products = [
  {
    id: "gentle-foam-cleanser",
    category: "cleansers",
    name: "Gentle Foam Cleanser",
    subtitle: "Daily purifying cleanser",
    price: 32,
    originalPrice: null as number | null,
    rating: 4.8,
    reviews: 124,
    bestseller: true,
    newProduct: false,
    image: "/algae.jpg",
    description: "A gentle yet effective foam cleanser that removes impurities while maintaining skin's natural moisture barrier.",
    benefits: [
      "Removes makeup and impurities",
      "Maintains skin moisture",
      "Suitable for all skin types",
      "pH balanced formula"
    ],
    skinTypes: ["Normal", "Dry", "Sensitive"],
  },
  {
    id: "vitamin-c-serum",
    category: "serums", 
    name: "Vitamin C Brightening Serum",
    subtitle: "20% L-Ascorbic Acid",
    price: 68,
    originalPrice: 85,
    rating: 4.9,
    reviews: 298,
    bestseller: true,
    newProduct: false,
    image: "/algae2.jpg",
    description: "High-potency vitamin C serum that brightens, protects, and stimulates collagen production for radiant skin.",
    benefits: [
      "Brightens skin tone",
      "Reduces dark spots",
      "Antioxidant protection",
      "Stimulates collagen"
    ],
    skinTypes: ["Normal", "Dry", "Combination"],
  }
];

export default function ProductsPageOld() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const searchedProducts = filteredProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="pt-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-teal-600 bg-clip-text text-transparent">
                  Premium Skincare
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  Collection
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Discover our clinically-proven products formulated with premium ingredients for visible results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-6 rounded-2xl text-lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Shop Collection
                </Button>
                <Button variant="outline" className="border-2 border-emerald-200 text-emerald-700 px-8 py-6 rounded-2xl text-lg">
                  <Eye className="w-5 h-5 mr-2" />
                  View Products
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-video rounded-3xl bg-gradient-to-br from-white to-emerald-50 shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-12 bg-gradient-to-r from-gray-50 to-emerald-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products, ingredients, or skin concerns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 placeholder-gray-400 shadow"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow"
                    : "border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-white/80 backdrop-blur-sm"
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-emerald-600">{searchedProducts.length}</span> products
              {searchQuery && (
                <span> for &quot;<span className="font-semibold">{searchQuery}</span>&quot;</span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {selectedCategory === "all" ? "All Products" : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional-grade formulations trusted by skincare experts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {searchedProducts.map((product) => (
              <div key={product.id} className="group">
                <Card className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:scale-[1.02] group-hover:-translate-y-2">
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/400x400/10b981/ffffff?text=${encodeURIComponent(product.name)}`;
                        }}
                      />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 space-y-2">
                        {product.bestseller && (
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-emerald-500 text-white shadow">
                            <Award className="w-3 h-3 mr-1" />
                            Bestseller
                          </span>
                        )}
                        {product.newProduct && (
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-500 text-white shadow">
                            New
                          </span>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white shadow"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart 
                          className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`} 
                        />
                      </Button>

                      {/* Quick Actions */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white shadow">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6 space-y-4 bg-gradient-to-b from-white to-gray-50/50">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-emerald-600 text-sm font-semibold bg-emerald-50 px-2 py-1 rounded-lg inline-block">
                          {product.subtitle}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-500 fill-current" : "text-gray-300"}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {product.reviews} reviews
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {product.description}
                      </p>

                      {/* Price & Action */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-emerald-600">
                            R{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-red-500 line-through">
                              R{product.originalPrice}
                            </span>
                          )}
                        </div>
                        <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>

                      {/* Quick Info Tags */}
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <Truck className="w-3 h-3 mr-1" />
                            Free Shipping
                          </div>
                          <div className="flex items-center">
                            <RotateCcw className="w-3 h-3 mr-1" />
                            30-Day Return
                          </div>
                        </div>
                        <div className="flex items-center text-emerald-600">
                          <Clock className="w-3 h-3 mr-1" />
                          Fast Delivery
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Start Your Skincare Journey
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Not sure which products are right for you? Book a consultation with our 
            skincare experts for personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-lg px-12 py-6 rounded-full">
                Get Product Recommendations
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-lg px-12 py-6 rounded-full">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}