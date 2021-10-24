import "./App.css";
import Header from "./Components/Header";
import UrlList from "./Widgets/UrlList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <UrlList />
      </header>
    </div>
  );
}

export default App;
