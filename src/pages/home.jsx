import * as React from "react";
import { useState, useCallback, useMemo } from 'react';

// Sourced from: https://www.kreativekorp.com/ucsur/charts/sitelen.html
const TOKI_TABLE = {
  "A": String.fromCodePoint(0xF1900),
  "AKESI": String.fromCodePoint(0xF1901),
  "ALA": String.fromCodePoint(0xF1902),
  "ALASA": String.fromCodePoint(0xF1903),
  "ALI": String.fromCodePoint(0xF1904),
  "ALE": String.fromCodePoint(0xF1904),
  "ANPA": String.fromCodePoint(0xF1905),
  "ANTE": String.fromCodePoint(0xF1906),
  "ANU": String.fromCodePoint(0xF1907),
  "AWEN": String.fromCodePoint(0xF1908),
  "E": String.fromCodePoint(0xF1909),
  "EN": String.fromCodePoint(0xF190A),
  "ESUN": String.fromCodePoint(0xF190B),
  "IJO": String.fromCodePoint(0xF190C),
  "IKE": String.fromCodePoint(0xF190D),
  "ILO": String.fromCodePoint(0xF190E),
  "INSA": String.fromCodePoint(0xF190F),
  "JAKI": String.fromCodePoint(0xF1910),
  "JAN": String.fromCodePoint(0xF1911),
  "JELO": String.fromCodePoint(0xF1912),
  "JO": String.fromCodePoint(0xF1913),
  "KALA": String.fromCodePoint(0xF1914),
  "KALAMA": String.fromCodePoint(0xF1915),
  "KAMA": String.fromCodePoint(0xF1916),
  "KASI": String.fromCodePoint(0xF1917),
  "KEN": String.fromCodePoint(0xF1918),
  "KEPEKEN": String.fromCodePoint(0xF1919),
  "KILI": String.fromCodePoint(0xF191A),
  "KIWEN": String.fromCodePoint(0xF191B),
  "KO": String.fromCodePoint(0xF191C),
  "KON": String.fromCodePoint(0xF191D),
  "KULE": String.fromCodePoint(0xF191E),
  "KULUPU": String.fromCodePoint(0xF191F),
  "KUTE": String.fromCodePoint(0xF1920),
  "LA": String.fromCodePoint(0xF1921),
  "LAPE": String.fromCodePoint(0xF1922),
  "LASO": String.fromCodePoint(0xF1923),
  "LAWA": String.fromCodePoint(0xF1924),
  "LEN": String.fromCodePoint(0xF1925),
  "LETE": String.fromCodePoint(0xF1926),
  "LI": String.fromCodePoint(0xF1927),
  "LILI": String.fromCodePoint(0xF1928),
  "LINJA": String.fromCodePoint(0xF1929),
  "LIPU": String.fromCodePoint(0xF192A),
  "LOJE": String.fromCodePoint(0xF192B),
  "LON": String.fromCodePoint(0xF192C),
  "LUKA": String.fromCodePoint(0xF192D),
  "LUKIN": String.fromCodePoint(0xF192E),
  "LUPA": String.fromCodePoint(0xF192F),
  "MA": String.fromCodePoint(0xF1930),
  "MAMA": String.fromCodePoint(0xF1931),
  "MANI": String.fromCodePoint(0xF1932),
  "MELI": String.fromCodePoint(0xF1933),
  "MI": String.fromCodePoint(0xF1934),
  "MIJE": String.fromCodePoint(0xF1935),
  "MOKU": String.fromCodePoint(0xF1936),
  "MOLI": String.fromCodePoint(0xF1937),
  "MONSI": String.fromCodePoint(0xF1938),
  "MU": String.fromCodePoint(0xF1939),
  "MUN": String.fromCodePoint(0xF193A),
  "MUSI": String.fromCodePoint(0xF193B),
  "MUTE": String.fromCodePoint(0xF193C),
  "NANPA": String.fromCodePoint(0xF193D),
  "NASA": String.fromCodePoint(0xF193E),
  "NASIN": String.fromCodePoint(0xF193F),
  "NENA": String.fromCodePoint(0xF1940),
  "NI": String.fromCodePoint(0xF1941),
  "NIMI": String.fromCodePoint(0xF1942),
  "NOKA": String.fromCodePoint(0xF1943),
  "O": String.fromCodePoint(0xF1944),
  "OLIN": String.fromCodePoint(0xF1945),
  "ONA": String.fromCodePoint(0xF1946),
  "OPEN": String.fromCodePoint(0xF1947),
  "PAKALA": String.fromCodePoint(0xF1948),
  "PALI": String.fromCodePoint(0xF1949),
  "PALISA": String.fromCodePoint(0xF194A),
  "PAN": String.fromCodePoint(0xF194B),
  "PANA": String.fromCodePoint(0xF194C),
  "PI": String.fromCodePoint(0xF194D),
  "PILIN": String.fromCodePoint(0xF194E),
  "PIMEJA": String.fromCodePoint(0xF194F),
  "PINI": String.fromCodePoint(0xF1950),
  "PIPI": String.fromCodePoint(0xF1951),
  "POKA": String.fromCodePoint(0xF1952),
  "POKI": String.fromCodePoint(0xF1953),
  "PONA": String.fromCodePoint(0xF1954),
  "PU": String.fromCodePoint(0xF1955),
  "SAMA": String.fromCodePoint(0xF1956),
  "SELI": String.fromCodePoint(0xF1957),
  "SELO": String.fromCodePoint(0xF1958),
  "SEME": String.fromCodePoint(0xF1959),
  "SEWI": String.fromCodePoint(0xF195A),
  "SIJELO": String.fromCodePoint(0xF195B),
  "SIKE": String.fromCodePoint(0xF195C),
  "SIN": String.fromCodePoint(0xF195D),
  "SINA": String.fromCodePoint(0xF195E),
  "SINPIN": String.fromCodePoint(0xF195F),
  "SITELEN": String.fromCodePoint(0xF1960),
  "SONA": String.fromCodePoint(0xF1961),
  "SOWELI": String.fromCodePoint(0xF1962),
  "SULI": String.fromCodePoint(0xF1963),
  "SUNO": String.fromCodePoint(0xF1964),
  "SUPA": String.fromCodePoint(0xF1965),
  "SUWI": String.fromCodePoint(0xF1966),
  "TAN": String.fromCodePoint(0xF1967),
  "TASO": String.fromCodePoint(0xF1968),
  "TAWA": String.fromCodePoint(0xF1969),
  "TELO": String.fromCodePoint(0xF196A),
  "TENPO": String.fromCodePoint(0xF196B),
  "TOKI": String.fromCodePoint(0xF196C),
  "TOMO": String.fromCodePoint(0xF196D),
  "TU": String.fromCodePoint(0xF196E),
  "UNPA": String.fromCodePoint(0xF196F),
  "UTA": String.fromCodePoint(0xF1970),
  "UTALA": String.fromCodePoint(0xF1971),
  "WALO": String.fromCodePoint(0xF1972),
  "WAN": String.fromCodePoint(0xF1973),
  "WASO": String.fromCodePoint(0xF1974),
  "WAWA": String.fromCodePoint(0xF1975),
  "WEKA": String.fromCodePoint(0xF1976),
  "WILE": String.fromCodePoint(0xF1977),
  "NAMAKO": String.fromCodePoint(0xF1978),
  "KIN": String.fromCodePoint(0xF1979),
  "OKO": String.fromCodePoint(0xF197A),
  "KIPISI": String.fromCodePoint(0xF197B),
  "LEKO": String.fromCodePoint(0xF197C),
  "MONSUTA": String.fromCodePoint(0xF197D),
  "TONSI": String.fromCodePoint(0xF197E),
  "JASIMA": String.fromCodePoint(0xF197F),
  "KIJETESANTAKALU": String.fromCodePoint(0xF1980),
  "SOKO": String.fromCodePoint(0xF1981),
  "MESO": String.fromCodePoint(0xF1982),
  "EPIKU": String.fromCodePoint(0xF1983),
  "KOKOSILA": String.fromCodePoint(0xF1984),
  "LANPAN": String.fromCodePoint(0xF1985),
  "N": String.fromCodePoint(0xF1986),
  "MISIKEKE": String.fromCodePoint(0xF1987),
  "KU": String.fromCodePoint(0xF1988),
  "PAKE": String.fromCodePoint(0xF19A0),
  "APEJA": String.fromCodePoint(0xF19A1),
  "MAJUNA": String.fromCodePoint(0xF19A2),
  "POWE": String.fromCodePoint(0xF19A3),
  [String.fromCodePoint(0xF1900)]: "a",
  [String.fromCodePoint(0xF1901)]: "akesi",
  [String.fromCodePoint(0xF1902)]: "ala",
  [String.fromCodePoint(0xF1903)]: "alasa",
  [String.fromCodePoint(0xF1904)]: "ali",
  [String.fromCodePoint(0xF1904)]: "ale",
  [String.fromCodePoint(0xF1905)]: "anpa",
  [String.fromCodePoint(0xF1906)]: "ante",
  [String.fromCodePoint(0xF1907)]: "anu",
  [String.fromCodePoint(0xF1908)]: "awen",
  [String.fromCodePoint(0xF1909)]: "e",
  [String.fromCodePoint(0xF190A)]: "en",
  [String.fromCodePoint(0xF190B)]: "esun",
  [String.fromCodePoint(0xF190C)]: "ijo",
  [String.fromCodePoint(0xF190D)]: "ike",
  [String.fromCodePoint(0xF190E)]: "ilo",
  [String.fromCodePoint(0xF190F)]: "insa",
  [String.fromCodePoint(0xF1910)]: "jaki",
  [String.fromCodePoint(0xF1911)]: "jan",
  [String.fromCodePoint(0xF1912)]: "jelo",
  [String.fromCodePoint(0xF1913)]: "jo",
  [String.fromCodePoint(0xF1914)]: "kala",
  [String.fromCodePoint(0xF1915)]: "kalama",
  [String.fromCodePoint(0xF1916)]: "kama",
  [String.fromCodePoint(0xF1917)]: "kasi",
  [String.fromCodePoint(0xF1918)]: "ken",
  [String.fromCodePoint(0xF1919)]: "kepeken",
  [String.fromCodePoint(0xF191A)]: "kili",
  [String.fromCodePoint(0xF191B)]: "kiwen",
  [String.fromCodePoint(0xF191C)]: "ko",
  [String.fromCodePoint(0xF191D)]: "kon",
  [String.fromCodePoint(0xF191E)]: "kule",
  [String.fromCodePoint(0xF191F)]: "kulupu",
  [String.fromCodePoint(0xF1920)]: "kute",
  [String.fromCodePoint(0xF1921)]: "la",
  [String.fromCodePoint(0xF1922)]: "lape",
  [String.fromCodePoint(0xF1923)]: "laso",
  [String.fromCodePoint(0xF1924)]: "lawa",
  [String.fromCodePoint(0xF1925)]: "len",
  [String.fromCodePoint(0xF1926)]: "lete",
  [String.fromCodePoint(0xF1927)]: "li",
  [String.fromCodePoint(0xF1928)]: "lili",
  [String.fromCodePoint(0xF1929)]: "linja",
  [String.fromCodePoint(0xF192A)]: "lipu",
  [String.fromCodePoint(0xF192B)]: "loje",
  [String.fromCodePoint(0xF192C)]: "lon",
  [String.fromCodePoint(0xF192D)]: "luka",
  [String.fromCodePoint(0xF192E)]: "lukin",
  [String.fromCodePoint(0xF192F)]: "lupa",
  [String.fromCodePoint(0xF1930)]: "ma",
  [String.fromCodePoint(0xF1931)]: "mama",
  [String.fromCodePoint(0xF1932)]: "mani",
  [String.fromCodePoint(0xF1933)]: "meli",
  [String.fromCodePoint(0xF1934)]: "mi",
  [String.fromCodePoint(0xF1935)]: "mije",
  [String.fromCodePoint(0xF1936)]: "moku",
  [String.fromCodePoint(0xF1937)]: "moli",
  [String.fromCodePoint(0xF1938)]: "monsi",
  [String.fromCodePoint(0xF1939)]: "mu",
  [String.fromCodePoint(0xF193A)]: "mun",
  [String.fromCodePoint(0xF193B)]: "musi",
  [String.fromCodePoint(0xF193C)]: "mute",
  [String.fromCodePoint(0xF193D)]: "nanpa",
  [String.fromCodePoint(0xF193E)]: "nasa",
  [String.fromCodePoint(0xF193F)]: "nasin",
  [String.fromCodePoint(0xF1940)]: "nena",
  [String.fromCodePoint(0xF1941)]: "ni",
  [String.fromCodePoint(0xF1942)]: "nimi",
  [String.fromCodePoint(0xF1943)]: "noka",
  [String.fromCodePoint(0xF1944)]: "o",
  [String.fromCodePoint(0xF1945)]: "olin",
  [String.fromCodePoint(0xF1946)]: "ona",
  [String.fromCodePoint(0xF1947)]: "open",
  [String.fromCodePoint(0xF1948)]: "pakala",
  [String.fromCodePoint(0xF1949)]: "pali",
  [String.fromCodePoint(0xF194A)]: "palisa",
  [String.fromCodePoint(0xF194B)]: "pan",
  [String.fromCodePoint(0xF194C)]: "pana",
  [String.fromCodePoint(0xF194D)]: "pi",
  [String.fromCodePoint(0xF194E)]: "pilin",
  [String.fromCodePoint(0xF194F)]: "pimeja",
  [String.fromCodePoint(0xF1950)]: "pini",
  [String.fromCodePoint(0xF1951)]: "pipi",
  [String.fromCodePoint(0xF1952)]: "poka",
  [String.fromCodePoint(0xF1953)]: "poki",
  [String.fromCodePoint(0xF1954)]: "pona",
  [String.fromCodePoint(0xF1955)]: "pu",
  [String.fromCodePoint(0xF1956)]: "sama",
  [String.fromCodePoint(0xF1957)]: "seli",
  [String.fromCodePoint(0xF1958)]: "selo",
  [String.fromCodePoint(0xF1959)]: "seme",
  [String.fromCodePoint(0xF195A)]: "sewi",
  [String.fromCodePoint(0xF195B)]: "sijelo",
  [String.fromCodePoint(0xF195C)]: "sike",
  [String.fromCodePoint(0xF195D)]: "sin",
  [String.fromCodePoint(0xF195E)]: "sina",
  [String.fromCodePoint(0xF195F)]: "sinpin",
  [String.fromCodePoint(0xF1960)]: "sitelen",
  [String.fromCodePoint(0xF1961)]: "sona",
  [String.fromCodePoint(0xF1962)]: "soweli",
  [String.fromCodePoint(0xF1963)]: "suli",
  [String.fromCodePoint(0xF1964)]: "suno",
  [String.fromCodePoint(0xF1965)]: "supa",
  [String.fromCodePoint(0xF1966)]: "suwi",
  [String.fromCodePoint(0xF1967)]: "tan",
  [String.fromCodePoint(0xF1968)]: "taso",
  [String.fromCodePoint(0xF1969)]: "tawa",
  [String.fromCodePoint(0xF196A)]: "telo",
  [String.fromCodePoint(0xF196B)]: "tenpo",
  [String.fromCodePoint(0xF196C)]: "toki",
  [String.fromCodePoint(0xF196D)]: "tomo",
  [String.fromCodePoint(0xF196E)]: "tu",
  [String.fromCodePoint(0xF196F)]: "unpa",
  [String.fromCodePoint(0xF1970)]: "uta",
  [String.fromCodePoint(0xF1971)]: "utala",
  [String.fromCodePoint(0xF1972)]: "walo",
  [String.fromCodePoint(0xF1973)]: "wan",
  [String.fromCodePoint(0xF1974)]: "waso",
  [String.fromCodePoint(0xF1975)]: "wawa",
  [String.fromCodePoint(0xF1976)]: "weka",
  [String.fromCodePoint(0xF1977)]: "wile",
  [String.fromCodePoint(0xF1978)]: "namako",
  [String.fromCodePoint(0xF1979)]: "kin",
  [String.fromCodePoint(0xF197A)]: "oko",
  [String.fromCodePoint(0xF197B)]: "kipisi",
  [String.fromCodePoint(0xF197C)]: "leko",
  [String.fromCodePoint(0xF197D)]: "monsuta",
  [String.fromCodePoint(0xF197E)]: "tonsi",
  [String.fromCodePoint(0xF197F)]: "jasima",
  [String.fromCodePoint(0xF1980)]: "kijetesantakalu",
  [String.fromCodePoint(0xF1981)]: "soko",
  [String.fromCodePoint(0xF1982)]: "meso",
  [String.fromCodePoint(0xF1983)]: "epiku",
  [String.fromCodePoint(0xF1984)]: "kokosila",
  [String.fromCodePoint(0xF1985)]: "lanpan",
  [String.fromCodePoint(0xF1986)]: "n",
  [String.fromCodePoint(0xF1987)]: "misikeke",
  [String.fromCodePoint(0xF1988)]: "ku",
  [String.fromCodePoint(0xF19A0)]: "pake",
  [String.fromCodePoint(0xF19A1)]: "apeja",
  [String.fromCodePoint(0xF19A2)]: "majuna",
  [String.fromCodePoint(0xF19A3)]: "powe",
  "[": "BEGIN_LONG_PI",
  "]": "END_LONG_PI",
  "{": "BEGIN_PROPER_NOUN",
  "}": "END_PROPER_NOUN",
  "~": String.fromCodePoint(0xF1996),
  "`": String.fromCodePoint(0xF1995)
}

const LEX_TABLE = {
  "BEGIN_LONG_PI": String.fromCodePoint(0xF1993),
  "IN_LONG_PI": String.fromCodePoint(0xF1994),
  "END_LONG_PI": "",
  "BEGIN_PROPER_NOUN": String.fromCodePoint(0xF1990),
  "IN_PROPER_NOUN": String.fromCodePoint(0xF1992),
  "END_PROPER_NOUN": String.fromCodePoint(0xF1991),
}

export default function IloPiSitelenPona() {
  const [input, setInput] = useState("toki a!");
                                                                                           
  const tokens = useMemo(() => input.split(/([\u{F1900}-\u{F19A3}])/u).flatMap(i => i.split(/(\W+|\[|\]|\{|\})/u)).filter(word => word != " ").map(word => word.toUpperCase()), [input])
  const lexes = useMemo(() => tokens.map(tok => TOKI_TABLE[tok] || tok), [tokens])

  const outputList = useMemo(() => {
    const out = [];
    let inLongPi = false;
    let inProperNoun = false;
    for (const lexId in lexes) {
      const lex = lexes[lexId]
      if (inLongPi) { 
        if (lexes[lexId - 1] !== 'BEGIN_LONG_PI') {
          out.push(LEX_TABLE.IN_LONG_PI) 
        }
      }
      if (inProperNoun) { 
        if (lexes[lexId - 1] !== 'BEGIN_PROPER_NOUN') {
          out.push(LEX_TABLE.IN_PROPER_NOUN)
        }
      }
      if (lex === 'BEGIN_LONG_PI') {
        inLongPi = true;
      } else if (lex === 'END_LONG_PI') {
        inLongPi = false;
      } else if (lex === 'BEGIN_PROPER_NOUN') {
        inProperNoun = true;
      } else if (lex === 'END_PROPER_NOUN') {
        inProperNoun = false;
      }
      
      out.push(LEX_TABLE[lex] === undefined ? lex : LEX_TABLE[lex])
    }
    return out;
  }, [lexes])
  
  const output = useMemo(() => outputList.join("").toLowerCase(), [outputList])
  
  const [showCopiedPopup, setShowCopiedPopup] = useState(false)
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(output).then(function() {
      setShowCopiedPopup(true);
      setTimeout(() => setShowCopiedPopup(false), 1500);
    }, function(err) {
      alert("Your browser does not support the Clipboard API.");
    });
  }, [output, setShowCopiedPopup])

  return (
    <>
      <h1 className="title">sina ken pali e sitelen pona</h1>
      <div>
        A few instructions // nasin kepeken lili
        <ul>
          <li>
            You may use <kbd>&#123;</kbd> and <kbd>&#125;</kbd> to insert a cartouche for writing proper nouns.
          </li>
        </ul>
        <ul>
          <li>
            You may use <kbd>&#91;</kbd> and <kbd>&#93;</kbd> to insert a long pi.
          </li>
        </ul>
        <ul>
          <li>
            You may insert a stacking joiner with <kbd>`</kbd> and a scaling joiner with <kbd>~</kbd>. The current font doesn't seem to do anything with them, but in the future fun things are possible.
          </li>
        </ul>
      </div>
      <div class="row">
        <h3 style={{marginRight: 2 + 'em'}}>Write your toki pona here:</h3>
        <h3>o sitelen e toki kepeken toki pona:</h3>
      </div>
      <textarea class="input" value={input} onChange={ev => setInput(ev.target.value)}></textarea>
      <div class="row">
        <h3 style={{marginRight: 2 + 'em'}}>Copy your sitelen pona from here:</h3>
        <h3>poki anpa li pana e sitelen pona sina:</h3>
      </div>
      {showCopiedPopup ? (
        <div>
          <p class="output w-100 copied-popup">
            Copied!
          </p>
          <div class="col-auto">
            <button class="copy-button" onClick={copyToClipboard}>Copy to clipboard!</button>
          </div>
        </div>
      ) : (
        <div>
          <p class="output w-100">
              {output}
          </p>
          <div class="col-auto">
            <button class="copy-button" onClick={copyToClipboard}>Copy to clipboard!</button>
          </div>
        </div>
      )}
      <footer>
        <p class="credits">
          Font from <a href="https://www.kreativekorp.com/software/fonts/fairfaxhd.shtml">https://www.kreativekorp.com/software/fonts/fairfaxhd.shtml</a>.
          // nasin sitelen tan <a href="https://www.kreativekorp.com/software/fonts/fairfaxhd.shtml">https://www.kreativekorp.com/software/fonts/fairfaxhd.shtml</a>.
        </p>
        <p class="credits">
          Unicode proposal at <a href="https://www.kreativekorp.com/ucsur/charts/sitelen.html">https://www.kreativekorp.com/ucsur/charts/sitelen.html</a>, tracked at <a href="https://www.kreativekorp.com/ucsur/">https://www.kreativekorp.com/ucsur/</a>.
        </p>
        <p class="credits">
          Read installation instructions for writing in sitelen pona on your computer here: <a href="https://github.com/neroist/sitelen-pona-ucsur-guide/blob/main/README.md">https://github.com/neroist/sitelen-pona-ucsur-guide/blob/main/README.md</a>. 
        </p>
        <p class="credits">
          See more info about <a href="https://sona.pona.la/wiki/sitelen_pona">sitelen pona</a> and <a href="https://sona.pona.la/wiki/Fonts">other fonts</a>.
        </p>
        <p class="credits">
          See my other projects at <a href="https://github.com/DataKinds">https://github.com/DataKinds</a> and read my blog :3 <a href="https://datakinds.github.io">https://datakinds.github.io</a>
        </p>
        <p class="credits">
          Contribute to this project at <a href="https://github.com/DataKinds/ilo-pi-sitelen-pona">https://github.com/DataKinds/ilo-pi-sitelen-pona</a>
        </p>
      </footer>
    </>
  );
}
