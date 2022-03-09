import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import Header from "./components/Header/Header";
import Todos from "./components/Todos/Todos";
import ProfileProvider from "./providers/ProfileProvider";

function App() {
  return (
    <ProfileProvider>
      <Header />
      <main>
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => {
            return (
              <div>
                <h2>An error occurred in todos!!</h2>
                <p>{error.name}</p>
                <p>{error.message}</p>
                <button onClick={resetErrorBoundary}>Restart</button>
              </div>
            );
          }}
        >
          <Todos />
        </ErrorBoundary>
      </main>
    </ProfileProvider>
  );
}

export default App;
