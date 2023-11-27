import Index from "./pages/Index/Index";
import Users from "./pages/Users/Users";
import Orders from "./pages/Orders/Orders";
import Comment from "./pages/Comments/Comments";
import Products from "./pages/Products/Products";
import Discounts from "./pages/Discounts/Discounts";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/users", element: <Users /> },
  { path: "/orders", element: <Orders /> },
  { path: "/comments", element: <Comment /> },
  { path: "/products", element: <Products /> },
  { path: "/discounts", element: <Discounts /> },
];

export default routes;
