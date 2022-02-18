import * as React from "react";
import { useState, useCallback } from 'react';

export default function IloPiSitelenPona() {
  const [input, setInput] = useState("toki a!");
  
  const tokenize = useCallback((tpString) => {
    const toks = tpString.split(/(\d)/)
    return toks
  }, [])

  return (
    <>
      <h1 className="title">sina ken pali e sitelen pona</h1>
      <div class="row">
        <h3 style={{marginRight: 2 + 'em'}}>Write your toki pona here:</h3>
        <h3>o sitelen e toki lon toki pona:</h3>
      </div>
      <textarea class="input" value={input} onChange={ev => setInput(ev.target.value)}></textarea>
      <h3>Copy your sitelen pona from here:</h3>
      <p class="output">{JSON.stringify(tokenize(input))}</p>
    </>
  );
}
