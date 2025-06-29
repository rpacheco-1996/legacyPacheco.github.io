import './App.css';
import { useState } from "react";
import Dropdown from "./Dropdown";


function App() {
  const [userInput, setUserInput] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  // Database query for keyword to responses feature
  const handleSubmit = async () => {
    try {
      setApiResponse("Loading...");
      const query = encodeURIComponent(userInput);
      const url = `https://legacybackend-ei8g.onrender.com/legacy?input=${query}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const text = await res.text();  // since Flask is returning plain text
      setApiResponse(text);
    } catch (error) {
      console.error(error);
      setApiResponse("Failed to fetch data");
    }
  };
  return (
    <div>
      <h1>Ryan Pacheco Legacy POC</h1>
      <div class="navbar">
        <a href="#database">Database</a>
        <a href="#model">Random Forest</a>
      </div>
      <div>
        <h1 id="database">Database Keyword Tool</h1>
        Search a keyword such as 'suicide' or 'depression' to see a therapists response to a related session. Continue hitting "Submit" to cycle responses
        <br></br>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Search Keyword"
        />
        <button onClick={handleSubmit}>Submit</button>
        <p><strong>Response:</strong> {apiResponse}</p>
      </div>
      <div>
        <h1 id="model">Random Forest Response Evaluator</h1>
        Fill out information on your age, what clinic you are going to, and what doctor you are seeing to see if you will get an extensive answer based on past sessions.
        <Dropdown />
      </div>
    </div>
  );
}

export default App;
