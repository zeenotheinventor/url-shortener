import logo from "./logo.svg";
import "./App.css";
import UrlList from "./Widgets/UrlList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span className="App-title">Atomizer</span>
        <UrlList />
      </header>
    </div>
  );
}

export default App;
