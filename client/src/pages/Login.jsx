import { useState } from "react";

export default function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response =
      await fetch(
        "http://localhost:8080/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

    const data =
      await response.json();

    localStorage.setItem(
      "token",
      data.token
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button>
        Login
      </button>
    </form>
  );
}



const response = await fetch(
  "http://localhost:8080/login",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }
);

const data = await response.json();

localStorage.setItem(
  "token",
  data.token
);