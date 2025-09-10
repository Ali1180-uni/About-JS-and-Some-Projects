import { useEffect, useState } from "react";

export default function Joke() {
  const URL = "https://official-joke-api.appspot.com/random_joke";
  const [joke, setJoke] = useState({ setup: "", punchline: "" });
  const ranJoke = async () => {
    let response = await fetch(URL);
    let jsonResponse = await response.json();
    setJoke({
      setup: jsonResponse.setup,
      punchline: jsonResponse.punchline,
    });
  };
  useEffect(() => {
    ranJoke();
  }, []);
  return (
    <div>
      <h1>Random Joke!</h1>
      <h3>
        <u>Setup:</u> {joke.setup}
      </h3>
      <h3>
        <u>PunchLine:</u> {joke.punchline}
      </h3>
      <button onClick={ranJoke}>Get a New Joke</button>
    </div>
  );
}
