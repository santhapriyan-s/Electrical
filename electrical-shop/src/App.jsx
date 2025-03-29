// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ManageAddress from "./pages/ManageAddress";
import PanCard from "./pages/PanCard";
import GiftCards from "./pages/GiftCards";
import SavedUPI from "./pages/SavedUPI";
import SavedCards from "./pages/SavedCards";
import Coupons from "./pages/Coupons";
import Reviews from "./pages/Reviews";
import Notifications from "./pages/Notifications";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import "./App.css";

const RouterWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    console.log("App: Current URL:", location.pathname);
  }, [location]);

  return children;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || "User",
          photoURL: firebaseUser.photoURL
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addToCart = (product) => {
    if (!cart.find((item) => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const addToFavourites = (product) => {
    setFavourites((prevFavourites) => {
      const isAlreadyFavorited = prevFavourites.find((item) => item.id === product.id);
      if (isAlreadyFavorited) {
        return prevFavourites.filter((item) => item.id !== product.id);
      } else {
        return [...prevFavourites, { ...product, isFavorite: true }];
      }
    });
  };

  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div className="loading-screen">Loading...</div>;
    }
    return user ? children : <Navigate to="/login" replace />;
  };

  const AuthRoute = ({ children }) => {
    if (loading) {
      return <div className="loading-screen">Loading...</div>;
    }
    return !user ? children : <Navigate to="/main" replace />;
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <Router>
      <RouterWrapper>
        <div className="app-container">
          {user && <Navbar user={user} setUser={setUser} cartCount={cart.length} />}
          <main>
            <Routes>
              <Route
                path="/login"
                element={
                  <AuthRoute>
                    <Login setUser={setUser} />
                  </AuthRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <AuthRoute>
                    <Signup setUser={setUser} />
                  </AuthRoute>
                }
              />
              <Route
                path="/main"
                element={
                  <ProtectedRoute>
                    <MainPage user={user} />
                  </ProtectedRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <ProductList 
                      addToCart={addToCart} 
                      addToFavourites={addToFavourites} 
                      user={user}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <ProtectedRoute>
                    <ProductDetails 
                      addToCart={addToCart} 
                      addToFavourites={addToFavourites} 
                      user={user}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart
                      cart={cart}
                      setCart={setCart}
                      favourites={favourites}
                      setFavourites={setFavourites}
                      user={user}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/*"
                element={
                  <ProtectedRoute>
                    <div className="profile-page">
                      <div className="profile-container">
                        <Sidebar user={user} setUser={setUser} />
                        <div className="profile-content">
                          <Routes>
                            <Route path="/" element={<Profile user={user} setUser={setUser} />} />
                            <Route path="orders" element={<Orders user={user} />} />
                            <Route path="manage-address" element={<ManageAddress user={user} />} />
                            <Route path="pan-card" element={<PanCard user={user} />} />
                            <Route path="gift-cards" element={<GiftCards user={user} />} />
                            <Route path="saved-upi" element={<SavedUPI user={user} />} />
                            <Route path="saved-cards" element={<SavedCards user={user} />} />
                            <Route path="coupons" element={<Coupons user={user} />} />
                            <Route path="reviews" element={<Reviews user={user} />} />
                            <Route path="notifications" element={<Notifications user={user} />} />
                            <Route 
                              path="wishlist" 
                              element={
                                <Wishlist 
                                  user={user} 
                                  favourites={favourites} 
                                  setFavourites={setFavourites} 
                                />
                              } 
                            />
                            <Route path="*" element={<div>Profile Section: Page Not Found</div>} />
                          </Routes>
                        </div>
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout cart={cart} user={user} />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to={user ? "/main" : "/login"} replace />} />
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </main>
          {user && <Footer />}
        </div>
      </RouterWrapper>
    </Router>
  );
};

export default App;