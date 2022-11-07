import StoreProvider from "./store/StoreProvider";
import ContentContainer from "./components/ContentContainer";

function App() {
  return (
    <StoreProvider>
      <div className="container">
        <h5>App</h5>
        <ContentContainer />
      </div>
    </StoreProvider>
  );
}

export default App;
