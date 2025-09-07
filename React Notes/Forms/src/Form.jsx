import { useState } from "react";

export function Form() {
  let [name, setName] = useState({ name: "", username: "", password: "" });
  let changeValues = (event) => {
    let field = event.target.name;
    let val = event.target.value;
    setName((currVal)=>{
        currVal[field] = val
        return{...currVal}
    });
  };
  let submitFunc = (events) => {
    events.preventDefault();
    setName({
        name: "",
        username: "",
        password: "",
    });
  }
  return (
    <form onSubmit={submitFunc}>
      <label htmlFor="Name">Your Name Plz</label>
      <br />
      <input
        type="text"
        id="Name"
        placeholder="Enter Your name"
        onChange={changeValues}
        name="name"
        value={name.name}
        />
      <br />
      <br />
      <label htmlFor="Username">Your Username Plz</label>
      <br />
      <input
        type="text"
        id="Username"
        placeholder="Enter Your Username"
        onChange={changeValues}
        name="username"
        value={name.username}
        />
      <br />
      <br />
      <label htmlFor="Password">Your Password Plz</label>
      <br />
      <input
        type="password"
        id="Password"
        placeholder="Enter Your nPassword"
        onChange={changeValues}
        name="password"
        value={name.password}
      />
      <br />
      <br />
      <button>Submit</button>
    </form>
  );
}
