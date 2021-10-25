import styles from "./App.module.css";
import Header from "./Components/Header";
import UrlShortener from "./Components/UrlShortener";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <UrlShortener />
      <ToastContainer />
    </div>
  );
}

export default App;
