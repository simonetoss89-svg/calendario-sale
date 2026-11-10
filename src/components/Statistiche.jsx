import { useState } from "react";

export default function Statistiche({
  prenotazioni,
}) {

  const annoCorrente =
  new Date().getFullYear();

const [annoSelezionato,
  setAnnoSelezionato] =
  useState(
    String(annoCorrente)
  );
  
    const anniDisponibili = [
  ...new Set(
    prenotazioni.map(
      (p) =>
        new Date(
          p.data
        ).getFullYear()
    )
  ),
].sort((a, b) => b - a);

const prenotazioniStatistiche =
  annoSelezionato === "tutte"
    ? prenotazioni
    : prenotazioni.filter(
        (p) =>
          new Date(
            p.data
          ).getFullYear() ===
          Number(
            annoSelezionato
          )
      );

      const totalePrenotazioni =
  prenotazioniStatistiche.length;

  // ==========================
  // GRUPPO PIÙ ATTIVO
  // ==========================

  const conteggioGruppi = {};

  prenotazioniStatistiche.forEach(
    (prenotazione) => {

      conteggioGruppi[
        prenotazione.gruppo
      ] =
        (conteggioGruppi[
          prenotazione.gruppo
        ] || 0) + 1;

    }
  );

  const gruppoTop =
    Object.entries(
      conteggioGruppi
    ).sort(
      (a, b) =>
        b[1] - a[1]
    )[0];

  // ==========================
  // SALA PIÙ UTILIZZATA
  // ==========================

  const conteggioSale = {};

  prenotazioniStatistiche.forEach(
    (prenotazione) => {

      conteggioSale[
        prenotazione.stanza
      ] =
        (conteggioSale[
          prenotazione.stanza
        ] || 0) + 1;

    }
  );

  const salaTop =
    Object.entries(
      conteggioSale
    ).sort(
      (a, b) =>
        b[1] - a[1]
    )[0];


    // ==========================
// GIORNO PIÙ RICHIESTO
// ==========================

const conteggioGiorni = {};

prenotazioniStatistiche.forEach(
  (prenotazione) => {

    const data =
      new Date(prenotazione.data);

    const giorno =
      data.toLocaleDateString(
        "it-IT",
        { weekday: "long" }
      );

    conteggioGiorni[giorno] =
      (conteggioGiorni[giorno] || 0) + 1;

  }
);

const giornoTop =
  Object.entries(
    conteggioGiorni
  ).sort(
    (a, b) =>
      b[1] - a[1]
  )[0];

// ==========================
// FASCIA PIÙ UTILIZZATA
// ==========================

const conteggioFasce = {};

prenotazioniStatistiche.forEach(
  (prenotazione) => {

    conteggioFasce[
      prenotazione.fasciaOraria
    ] =
      (
        conteggioFasce[
          prenotazione.fasciaOraria
        ] || 0
      ) + 1;

  }
);

const fasciaTop =
  Object.entries(
    conteggioFasce
  ).sort(
    (a, b) =>
      b[1] - a[1]
  )[0];

// ==========================
// MESE PIÙ UTILIZZATO
// ==========================

const conteggioMesi = {};

prenotazioniStatistiche.forEach(
  (prenotazione) => {

    const data =
      new Date(prenotazione.data);

    const mese =
      data.toLocaleDateString(
        "it-IT",
        {
          month: "long",
          year: "numeric",
        }
      );

    conteggioMesi[mese] =
      (conteggioMesi[mese] || 0) + 1;

  }
);

const meseTop =
  Object.entries(
    conteggioMesi
  ).sort(
    (a, b) =>
      b[1] - a[1]
  )[0];

// ==========================
// CLASSIFICA GRUPPI
// ==========================

const classificaGruppi =
  Object.entries(
    conteggioGruppi
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

// ==========================
// CLASSIFICA SALE
// ==========================

const classificaSale =
  Object.entries(
    conteggioSale
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);


// ==========================
// CLASSIFICA GIORNI
// ==========================

const classificaGiorni =
  Object.entries(
    conteggioGiorni
  )
    .sort((a, b) => b[1] - a[1]);

// ==========================
// CLASSIFICA FASCE
// ==========================

const classificaFasce =
  Object.entries(
    conteggioFasce
  )
    .sort((a, b) => b[1] - a[1]);

// ==========================
// CLASSIFICA MESI
// ==========================

const classificaMesi =
  Object.entries(
    conteggioMesi
  )
    .sort((a, b) => b[1] - a[1]);


  return (

    <div className="
      bg-white
      rounded-3xl
      shadow-lg
      p-6
      mt-6
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-6
      ">
        📊 Statistiche
      </h2>

<div className="mb-6">

  <label
    className="
      text-sm
      text-slate-500
      mr-2
    "
  >
    Anno statistiche
  </label>

  <select
    value={annoSelezionato}
    onChange={(e) =>
      setAnnoSelezionato(
        e.target.value
      )
    }
    className="
      border
      rounded-lg
      p-2
    "
  >

    {anniDisponibili.map(
      (anno) => (
        <option
          key={anno}
          value={anno}
        >
          {anno}
        </option>
      )
    )}

    <option value="tutte">
      Tutte
    </option>

  </select>

</div>


      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-4
      ">

        {/* Totale */}

        <div className="
          border
          rounded-2xl
          p-5
          text-center
          shadow-sm
        ">

          <div className="text-4xl">
            📋
          </div>

          <p className="
            text-slate-500
            mt-2
          ">
            Prenotazioni
          </p>

          <p className="
            text-3xl
            font-bold
            mt-2
          ">
            {totalePrenotazioni}
          </p>

        </div>

        {/* Gruppo Top */}

        <div className="
          border
          rounded-2xl
          p-5
          text-center
          shadow-sm
        ">

          <div className="text-4xl">
            👥
          </div>

          <p className="
            text-slate-500
            mt-2
          ">
            Gruppo più attivo
          </p>

          <p className="
            text-xl
            font-bold
            mt-2
          ">
            {gruppoTop?.[0] || "-"}
          </p>

          <p className="
            text-slate-600
          ">
            {gruppoTop?.[1] || 0}
            {" "}
            prenotazioni
          </p>

        </div>

        {/* Sala Top */}

        <div className="
          border
          rounded-2xl
          p-5
          text-center
          shadow-sm
        ">

          <div className="text-4xl">
            🏠
          </div>

          <p className="
            text-slate-500
            mt-2
          ">
            Sala più utilizzata
          </p>

          <p className="
            text-xl
            font-bold
            mt-2
          ">
            {salaTop?.[0] || "-"}
          </p>

          <p className="
            text-slate-600
          ">
            {salaTop?.[1] || 0}
            {" "}
            prenotazioni
          </p>

          

        </div>

        
        {/* Giorno Top */}

<div className="
  border
  rounded-2xl
  p-5
  text-center
  shadow-sm
">

  <div className="text-4xl">
    📅
  </div>

  <p className="
    text-slate-500
    mt-2
  ">
    Giorno più richiesto
  </p>

  <p className="
    text-xl
    font-bold
    mt-2
  ">
    {giornoTop?.[0] || "-"}
  </p>

  <p className="
    text-slate-600
  ">
    {giornoTop?.[1] || 0}
    {" "}
    prenotazioni
  </p>

</div>

{/* Fascia Top */}

<div className="
  border
  rounded-2xl
  p-5
  text-center
  shadow-sm
">

  <div className="text-4xl">
    🕒
  </div>

  <p className="
    text-slate-500
    mt-2
  ">
    Fascia più utilizzata
  </p>

  <p className="
    text-xl
    font-bold
    mt-2
  ">
    {fasciaTop?.[0] || "-"}
  </p>

  <p className="
    text-slate-600
  ">
    {fasciaTop?.[1] || 0}
    {" "}
    prenotazioni
  </p>

</div>

{/* Mese Top */}

<div className="
  border
  rounded-2xl
  p-5
  text-center
  shadow-sm
">

  <div className="text-4xl">
    📆
  </div>

  <p className="
    text-slate-500
    mt-2
  ">
    Mese più richiesto
  </p>

  <p className="
    text-xl
    font-bold
    mt-2
  ">
    {meseTop?.[0] || "-"}
  </p>

  <p className="
    text-slate-600
  ">
    {meseTop?.[1] || 0}
    {" "}
    prenotazioni
  </p>

</div>


      </div>
<div className="
  grid
  grid-cols-1
  md:grid-cols-3
  gap-4
  mt-6
">

  {/* TOP GRUPPI */}

  <div className="
    border
    rounded-2xl
    p-5
    shadow-sm
  ">

    <h3 className="
      text-xl
      font-bold
      mb-4
    ">
      🏆 Top Gruppi
    </h3>

    {classificaGruppi.map(
      ([gruppo, totale], index) => (
        <div
          key={gruppo}
          className="
            flex
            justify-between
            border-b
            py-2
          "
        >
          <span>
            {index + 1}. {gruppo}
          </span>

          <span className="
            font-semibold
          ">
            {totale}
          </span>
        </div>
      )
    )}

  </div>

  {/* TOP SALE */}

  <div className="
    border
    rounded-2xl
    p-5
    shadow-sm
  ">

    <h3 className="
      text-xl
      font-bold
      mb-4
    ">
      🏠 Top Sale
    </h3>

    {classificaSale.map(
      ([sala, totale], index) => (
        <div
          key={sala}
          className="
            flex
            justify-between
            border-b
            py-2
          "
        >
          <span>
            {index + 1}. {sala}
          </span>

          <span className="
            font-semibold
          ">
            {totale}
          </span>
        </div>
      )
    )}

  </div>

{/* TOP GIORNI */}

<div
  className="
    border
    rounded-2xl
    p-5
    shadow-sm
  "
>

  <h3
    className="
      text-xl
      font-bold
      mb-4
    "
  >
    📅 Top Giorni
  </h3>

  {classificaGiorni.map(
    ([giorno, totale], index) => (

      <div
        key={giorno}
        className="
          flex
          justify-between
          border-b
          py-2
        "
      >

        <span>
        {index + 1}. {giorno}
        </span>

        <span
          className="
            font-semibold
          "
        >
          {totale}
        </span>

      </div>

    )
  )}

</div>
<div className="
  border
  rounded-2xl
  p-5
  shadow-sm
">

  <h3 className="
    text-xl
    font-bold
    mb-4
  ">
    🕒 Top Fasce
  </h3>

  {classificaFasce.map(
    ([fascia, totale], index) => (

      <div
        key={fascia}
        className="
          flex
          justify-between
          border-b
          py-2
        "
      >

        <span>
          {index + 1}. {fascia}
        </span>

        <span className="
          font-semibold
        ">
          {totale}
        </span>

      </div>

    )
  )}

</div>

<div className="
  border
  rounded-2xl
  p-5
  shadow-sm
">

  <h3 className="
    text-xl
    font-bold
    mb-4
  ">
    📆 Top Mesi
  </h3>

  {classificaMesi.map(
    ([mese, totale], index) => (

      <div
        key={mese}
        className="
          flex
          justify-between
          border-b
          py-2
        "
      >

        <span>
          {index + 1}. {mese}
        </span>

        <span className="
          font-semibold
        ">
          {totale}
        </span>

      </div>

    )
  )}

</div>

</div>

    </div>
    

  );

}