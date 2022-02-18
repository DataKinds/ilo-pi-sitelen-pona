import * as React from "react";
import { useState } from 'react';

export default function IloPiSitelenPona() {
  const [input, setInput] = useState("toki a!");

  return (
    <>
      <h1 className="title">sina ken pali e sitelen pona</h1>
      <h3>Write your toki pona here:</h3>
      <h3>o pali e toki lon toki pona </h3>
      <textarea class="input" value={input} onChange={ev => setInput(ev.target.value)}></textarea>
      <h3>Copy your sitelen pony from here:</h3>
      <p class="output"></p>
    </>
  );
}
