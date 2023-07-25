import "./App.css";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import { UserProvider } from "./context/userContext";
import ListProperty from "./pages/properties/ListProperty";
import { ListingProvider } from "./context/listingContext";
import { RoomProvider } from "./context/roomContext";
import RoomProperty from "./pages/rooms/RoomProperty";
import Home from "./pages/home/Home";

import Listings from "./pages/properties/Listings";
import UpdateListing from "./pages/properties/update/UpdateListing";
import Viewpropertydetails from "./pages/properties/Viewpropertydetails";
import SearchProperty from "./pages/properties/searchProperties/SearchProperty";

import MyListings from "./pages/dashboard/components/MyListings";
import Rentings from "./pages/dashboard/components/Rentings";

import ResetPasswordLink from "./pages/login/ResetPasswordLink";
import ResetPassword from "./pages/login/ResetPassword";
import Footer from "./components/Footer";
import Bookings from "./pages/dashboard/components/Bookings";
import Map from "./pages/properties/Map";
import Category from "./pages/home/Category";
import Bookingmy from "./pages/dashboard/components/Bookingmy";
import Buy from "./pages/dashboard/components/Buy";
import { NotificationProvider } from "./context/Notificationcontext";
import Contact from "./pages/Contact";
import { CompareProvider } from "./context/Compare";
function App() {
  const ProtectedAdmin = () => {
    function parseJwt(token) {
      if (!token) {
        return;
      }
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    }
    const token = localStorage.getItem("token");
    const user = parseJwt(token);
    return user?.user?.admin ? (
      <Outlet></Outlet>
    ) : (
      <Navigate to="/login"></Navigate>
    );
  };
  return (
    <div className="main">
      <UserProvider>
        <NotificationProvider>
          <ToastContainer className="mt-5"></ToastContainer>
          <Router>
            {/* Make Routes Here */}
            <Routes>
              <Route
                exact
                path="/profile"
                element={<Profile></Profile>}
              ></Route>
              <Route
                exact
                path="/register"
                element={<Register></Register>}
              ></Route>
              <Route exact path="/login" element={<Login></Login>}></Route>
              <Route
                exact
                path="/dashboard"
                element={<Dashboard></Dashboard>}
              ></Route>
              <Route
                exact
                path="/contact"
                element={<Contact></Contact>}
              ></Route>

              <Route
                exact
                path="/my-listings"
                element={<MyListings></MyListings>}
              ></Route>
              <Route
                exact
                path="/view-details/:propertyId"
                element={<Viewpropertydetails></Viewpropertydetails>}
              ></Route>
              <Route
                exact
                path="/list-property/:section"
                element={
                  <ListingProvider>
                    <ListProperty></ListProperty>
                  </ListingProvider>
                }
              ></Route>
              <Route
                exact
                path="/list-property-summary/:propertyId/:section"
                element={
                  <ListingProvider>
                    <ListProperty></ListProperty>
                  </ListingProvider>
                }
              ></Route>
              <Route
                exact
                path="/list-property/:propertyId/update/:section"
                element={
                  <ListingProvider>
                    <UpdateListing></UpdateListing>
                  </ListingProvider>
                }
              ></Route>
              <Route
                exact
                path="/add-room/:propertyId/:section"
                element={
                  <RoomProvider>
                    <RoomProperty></RoomProperty>
                  </RoomProvider>
                }
              ></Route>

              <Route
                exact
                path="/my-listing"
                element={<Listings></Listings>}
              ></Route>
              <Route
                exact
                path="/rentings/:type"
                element={<Rentings></Rentings>}
              ></Route>
              <Route
                exact
                path="/bookings/:type"
                element={<Bookings></Bookings>}
              ></Route>
              <Route
                exact
                path="/booking"
                element={<Bookingmy></Bookingmy>}
              ></Route>
              <Route exact path="/bookings" element={<Buy></Buy>}></Route>

              <Route
                exact
                path="/search-property/:query"
                element={<SearchProperty></SearchProperty>}
              ></Route>
              <Route exact path="/" element={<Home></Home>}></Route>

              <Route
                path="/reset-password-link"
                element={<ResetPasswordLink></ResetPasswordLink>}
              ></Route>
              <Route
                path="/reset-password/:token"
                element={<ResetPassword></ResetPassword>}
              ></Route>
              <Route path="/map" element={<Map></Map>}></Route>

              <Route
                path="/properties-category"
                element={
                  <CompareProvider>
                    <Category></Category>
                  </CompareProvider>
                }
              ></Route>
            </Routes>
          </Router>
        </NotificationProvider>
      </UserProvider>
      <Footer></Footer>
    </div>
  );
}

export default App;
