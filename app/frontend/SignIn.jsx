import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        email
      }
      errors
    }
  }
`;

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, { data, loading, error }] = useMutation(SIGN_IN_MUTATION);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    try {
      const result = await signIn({ variables: { email, password } });
      const { token, errors } = result.data.signIn;
      if (token) {
        localStorage.setItem("jwt", token);
        onSignIn();
      } else {
        setFormError(errors.join(", "));
      }
    } catch (err) {
      setFormError("Sign in failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>Sign In</button>
      {formError && <div style={{ color: "red" }}>{formError}</div>}
      {error && <div style={{ color: "red" }}>{error.message}</div>}
    </form>
  );
};

export default SignIn;
