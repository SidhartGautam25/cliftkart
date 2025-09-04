import CartC from "../comp/cart/CartC";
import Footer from "../comp/footer/Footer";
import Navbar from "../comp/navbar/Navbar";

const CartPage: React.FC = () => {
  return (
    <>
     <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <CartC />
      </div>
      <Footer />
    </div>
    </>
  );
};

export default CartPage;
