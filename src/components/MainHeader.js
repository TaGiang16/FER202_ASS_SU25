import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { useRegion } from "../context/RegionContext";

export default function MainHeader() {
  const { currencyMeta, exchangeRate } = useRegion();
  const navigate = useNavigate();
  // State to store the fetched products
  const [products, setProducts] = useState([]);
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // State cho category
  const [categories, setCategories] = useState([]); // Thêm state cho categories

  // Fetch products from the API when the component mounts
  useEffect(() => {
    fetch("http://localhost:9999/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  // Fetch categories from the API when the component mounts
  useEffect(() => {
    fetch("http://localhost:9999/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
    // Fetch categories
    fetch("http://localhost:9999/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Lọc sản phẩm theo search và category
  const filteredProducts = products.filter((product) => {
    const matchTitle = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory ? String(product.categoryId) === String(selectedCategory) : true;
    return matchTitle && matchCategory;
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    let url = `/search?query=${encodeURIComponent(searchQuery.trim())}`;
    if (selectedCategory) {
      url += `&category=${encodeURIComponent(selectedCategory)}`;
    }
    navigate(url);
  };

  return (
    <div id="MainHeader" className="border-b">
      <nav className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
        <div className="flex items-center w-full bg-white">
          <div className="flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-5 mx-auto">
            <a href="/">
              <img width="220" height="50" src="/images/logo5.png" alt="Logo" />
            </a>

            <div className="w-full">
              <div className="relative">
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center w-full"
                >
                  <div className="flex w-full">
                    <div className="flex w-full border-2 border-gray-900 rounded-full overflow-hidden bg-white">
                      <div className="flex items-center pl-3">
                        <Search size={22} className="text-gray-400" />
                      </div>
                      <input
                        className="w-full h-12 bg-white text-sm px-3 focus:outline-none border-none rounded-l-full"
                        placeholder="Search for anything"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ minWidth: 0 }}
                      />
                      <select
                        className="h-12 bg-white text-sm px-4 focus:outline-none border-l border-gray-200 rounded-none rounded-r-full"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{ minWidth: "150px" }}
                      >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="flex items-center bg-blue-600 text-sm font-semibold text-white h-12 ml-4 px-10 rounded-full"
                    >
                      Search
                    </button>
                  </div>
                  <a
                    href="#"
                    className="text-xs px-2 hover:text-blue-500 cursor-pointer"
                  >
                    Advanced
                  </a>
                </form>

                {/* Dropdown with search results */}
                {searchQuery.length > 0 && (
                  <div className="absolute bg-white max-w-[910px] h-auto w-full z-20 left-0 top-12 border p-1">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <div key={product.id} className="p-1">
                          <a
                            href={`/product/${product.id}`}
                            className="flex items-center justify-between w-full cursor-pointer hover:bg-gray-200 p-1 px-2"
                          >
                            <div className="flex items-center">
                              <div className="truncate ml-2">
                                {product.title}
                              </div>
                            </div>
                            <div className="truncate">
                              {formatCurrency(
                                product.price * exchangeRate,
                                currencyMeta.code,
                                currencyMeta.symbol
                              )}
                            </div>
                          </a>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">No products found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
