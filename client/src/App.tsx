import "./App.css";
import Header from "./Components/Header";
import UrlShotener from "./Components/UrlShortener";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <UrlShotener />
        <ToastContainer />
      </header>
    </div>
  );
}

export default App;
