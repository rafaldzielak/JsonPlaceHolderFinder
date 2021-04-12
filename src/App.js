import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import UserProvider from "./context/UserProvider";

function App() {
  return (
    <div className='App container'>
      <UserProvider>
        <HomeScreen />
      </UserProvider>
    </div>
  );
}

export default App;
