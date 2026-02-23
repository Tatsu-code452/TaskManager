import { useState } from "react";

export const useLoginState = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return {
    username, setUsername,
    password, setPassword,
    error, setError
  };
};