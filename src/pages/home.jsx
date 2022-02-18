import * as React from "react";
import { useState } from 'react';

export default function IloPiSitelenPona() {
  const [input, setInput] = useState("toki a!");

  return (
    <>
      <h1 className="title">sina ken pali e sitelen pona</h1>
      <textarea class="input" value={input} onChange={ev => setInput(ev.target.value)}></textarea>
      <h3>~~~~~~~~~~~~~~~~~</h3>
      <p></p>
    </>
  );
}
