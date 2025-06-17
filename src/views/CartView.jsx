import { useStoreContext } from "../context";
import Header from "./components/Header.jsx";
import Footer from './components/Footer.jsx';
import { firestore } from "../firebase/index.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./CartView.css";
function CartView() {
  const { cart, setCart, fname } = useStoreContext();
  const checkout = async () => {
    if (!cart.size) {
      alert("Your cart is empty!");
      return;
    }
    try {
      const docRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(docRef);
      const userData = userDoc.data();
      const userCart = userData.cart || [];
      const updatedCart = [...userCart, ...Array.from(cart.values())];

      await setDoc(docRef, { cart: updatedCart }, { merge: true });
      setCart(new Map());
      localStorage.removeItem(user.uid);
      alert("Thank you for your purchase!"); //ty message ghere

    } catch (error) {
      console.error("Error during checkout:", error);
      alert("There was an error during checkout.");
    }
  };

  return (
    <div className="appcontainer">
      <div className="nbar">
        <Header />
      </div>
      <div className="cartview">
        <h1>{fname}'s Shopping Cart</h1>
        <div className="cartitems">
          {
            cart.entrySeq().map(([key, value]) => {
              return (
                <div className="cartitem" key={key}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${value.poster_path}`}
                    alt={value.title}
                  />
                  <h1>{value.title}</h1>
                  <button onClick={() => setCart((prevCart) => prevCart.delete(key))}>Remove</button>
                </div>
              );
            })
          }
        </div>
        <button className={"checkoutButton"} onClick={checkout}>
          Checkout
        </button>
      </div>
      <div className="foot">
        <Footer />
      </div>
    </div>
  );
}

export default CartView;  