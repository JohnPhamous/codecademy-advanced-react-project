import "./App.css";
import Header from "./components/Header/Header";
import Todos from "./components/Todos/Todos";
import ProfileProvider from "./providers/ProfileProvider";

function App() {
  return (
    <ProfileProvider>
      <Header />
      <main>
        <Todos />
      </main>
    </ProfileProvider>
  );
}

export default App;
