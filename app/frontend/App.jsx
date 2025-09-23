import { useState, useEffect } from "react";
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from "@apollo/client";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SignIn from "./SignIn.jsx";

const httpLink = createHttpLink({
  uri: "/graphql",
  headers: {
    Authorization: localStorage.getItem("jwt") ? `Bearer ${localStorage.getItem("jwt")}` : ""
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


const Dashboard = ({ onSignOut }) => (
  <div>
    <div>Welcome to the dashboard!</div>
    <button onClick={onSignOut}>Sign Out</button>
  </div>
);

const App = () => {
  const [signedIn, setSignedIn] = useState(!!localStorage.getItem("jwt"));

  useEffect(() => {
    const checkAuth = () => {
      setSignedIn(!!localStorage.getItem("jwt"));
    };
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setSignedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signin"
          element={
            signedIn ? <Navigate to="/" replace /> : <SignIn onSignIn={() => setSignedIn(true)} />
          }
        />
        <Route
          path="/"
          element={
            signedIn ? <Dashboard onSignOut={handleSignOut} /> : <Navigate to="/signin" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};


const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Root;
