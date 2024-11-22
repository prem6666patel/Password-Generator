import { useState, useCallback, useEffect, useRef } from "react";
import styles from "./components/App.module.css";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // ref hook

  const passwordRef = useRef(null);

  //copy password using COPY button

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // password generator function using usecallback

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    if (numberAllowed) str += "1234567890";

    if (charAllowed) str += "!@#$%^&*()[]{}/?<>:''";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // calling passwordGenerator functoin via useEffect

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className={styles.box}>
        <h1 className={styles.heading}>Password Generator</h1>

        <div>
          <input
            type="text"
            value={password}
            placeholder="password"
            readOnly
            className={styles.np}
            ref={passwordRef}
          />
          <button className={styles.btn} onClick={copyPasswordToClipboard}>
            copy
          </button>
        </div>

        <div className={styles.line2}>
          <pre> </pre>
          <div>
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label htmlFor="len">length : {length}</label>
          </div>

          <pre> </pre>

          <div>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />

            <label htmlFor="checknumber"> Number </label>
          </div>

          <pre> </pre>

          <div>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />

            <label htmlFor="checknumber"> Charcter </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
