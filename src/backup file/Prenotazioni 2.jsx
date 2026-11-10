import { useState } from "react";

export default function ListaPrenotazioni({
  prenotazioni,
  giornoSettimana,
  eliminaPrenotazione,
  modificaPrenotazione,
  ultimoNumeroPrenotazione,
}) {


// State ordinamento per

const [campoOrdinamento,
  setCampoOrdinamento] =
  useState("data");

const [direzioneOrdinamento,
  setDirezioneOrdinamento] =
  useState("desc");

 
// State mostra storico

const [mostraStorico, setMostraStorico] =
  useState(false);


  // State filtri 

const [filtroGruppo, setFiltroGruppo] =
  useState("");

const [filtroSala, setFiltroSala] =
  useState("");

  const gruppi = [
  ...new Set(
    prenotazioni.map(
      (p) => p.gruppo
    )
  ),
];

const sale = [
  ...new Set(
    prenotazioni.map(
      (p) => p.stanza
    )
  ),
];

const [dataDa, setDataDa] =
  useState("");

const [dataA, setDataA] =
  useState("");

  const prenotazioniFiltrate =
  prenotazioni.filter(
    (prenotazione) => {
const oggi = new Date();

oggi.setHours(
  0,
  0,
  0,
  0
);

const dataEvento =
  new Date(prenotazione.data);

const gruppoValido =
  filtroGruppo === "" ||
  prenotazione.gruppo ===
    filtroGruppo;

const salaValida =
  filtroSala === "" ||
  prenotazione.stanza ===
    filtroSala;

const filtroDataDaValido =
  !dataDa ||
  dataEvento >=
    new Date(dataDa);

const filtroDataAValido =
  !dataA ||
  dataEvento <=
    new Date(dataA);

const visibile =
  mostraStorico
    ? true
    : dataEvento >= oggi;

return (
  gruppoValido &&
  salaValida &&
  filtroDataDaValido &&
  filtroDataAValido &&
  visibile
);

    }
  );

  // ==========================
// ORDINAMENTO
// ==========================

const prenotazioniOrdinate =
  [...prenotazioniFiltrate].sort(
    (a, b) => {

      let confronto = 0;

      if (
        campoOrdinamento === "id"
      ) {

        confronto = a.id - b.id;

      } else {

        confronto =
          new Date(a.data) -
          new Date(b.data);

      }

      return direzioneOrdinamento ===
        "asc"
        ? confronto
        : -confronto;

    }
  );

  return (

<div className="bg-white rounded-3xl shadow-lg p-6 mt-6">

          <h2 className="text-2xl font-bold mb-4">
            Lista Completa Prenotazioni
          </h2>
          


  {/* ==========================
    FINESTRA FILTRI
========================== */}

<div className="
  border
  rounded-3xl
  p-4
  mb-4
  relative
">

  <div className="
    absolute
    -top-3
    left-4
    bg-white
    px-2
    text-slate-700
    font-semibold text-slate-600
  ">
    🔍 Filtri
  </div>

  <div className="
    flex gap-3 flex-wrap items-center
  ">

    <div className="flex flex-col">
  <label className="
    text-xs
    text-slate-500
    mb-1
  ">
    Gruppo
  </label>

  <select
    value={filtroGruppo}
    onChange={(e) =>
      setFiltroGruppo(
        e.target.value
      )
    }
    className="
      border rounded p-2
    "
  >
    <option value="">
      Tutti i gruppi
    </option>

    {gruppi.map(
      (gruppo) => (
        <option
          key={gruppo}
          value={gruppo}
        >
          {gruppo}
        </option>
      )
    )}
  </select>

</div>

    <div className="flex flex-col">
  <label className="
    text-xs
    text-slate-500
    mb-1
  ">
    Sala
  </label>

  <select
    value={filtroSala}
    onChange={(e) =>
      setFiltroSala(
        e.target.value
      )
    }
    className="
      border rounded p-2
    "
  >
    <option value="">
      Tutte le sale
    </option>

    {sale.map((sala) => (
      <option
        key={sala}
        value={sala}
      >
        {sala}
      </option>
    ))}
  </select>

</div>

    <div className="flex flex-col">
  <label className="
    text-xs
    text-slate-500
    mb-1
  ">
    Data Da
  </label>

  <input
    type="date"
    value={dataDa}
    onChange={(e) =>
      setDataDa(
        e.target.value
      )
    }
    className="
      border rounded p-2
    "
  />
</div>

<div className="flex flex-col">
  <label className="
    text-xs
    text-slate-500
    mb-1
  ">
    Data A:
  </label>

  <input
    type="date"
    value={dataA}
    onChange={(e) =>
      setDataA(
        e.target.value
      )
    }
    className="
      border rounded p-2
    "
  />
</div>

    <div className="flex flex-col">
  <label className="
    text-xs
    text-slate-500
    mb-1
  ">
    Azzera filtri
  </label>

  <button
    onClick={() => {
      setFiltroGruppo("");
      setFiltroSala("");
      setDataDa("");
      setDataA("");
    }}
    className="
  bg-amber-400
  hover:bg-amber-600
  border-2
  border-amber-600
  text-white
  px-4
  py-2
  rounded-xl
  transition-all
  duration-200
  hover:scale-105
  hover:shadow-lg
  active:scale-95
"
  >
<span className="text-3xl">
  🧹
</span>
  </button>
</div>

    <label className="
      flex items-center gap-2
    ">
      <input
        type="checkbox"
        checked={mostraStorico}
        onChange={(e) =>
          setMostraStorico(
            e.target.checked
          )
        }
      />

      Mostra storico
    </label>

  </div>

</div>

{/* ==========================
    FINESTRA ORDINAMENTO
========================== */}

<div className="
  border
  rounded-3xl
  p-4
  mb-4
  relative
">

  <div className="
    absolute
    -top-3
    left-4
    bg-white
    px-2
    text-slate-700
    font-semibold text-slate-600
  ">
    ↕ Ordinamento
  </div>

  <div className="
    flex gap-3 flex-wrap
  ">

    <select
      value={campoOrdinamento}
      onChange={(e) =>
        setCampoOrdinamento(
          e.target.value
        )
      }
      className="
        border rounded p-2
      "
    >
      <option value="data">
        Data
      </option>

      <option value="id">
        ID
      </option>
    </select>

    <select
      value={direzioneOrdinamento}
      onChange={(e) =>
        setDirezioneOrdinamento(
          e.target.value
        )
      }
      className="
        border rounded p-2
      "
    >
      <option value="desc">
        Decrescente
      </option>

      <option value="asc">
        Crescente
      </option>
    </select>

  </div>

</div>

<div className="
  flex
  gap-8
  mb-4
  text-slate-600
  text-sm
  font-medium
">

  <span>
    Prenotazioni Visualizzate:
    {prenotazioniFiltrate.length}
  </span>

  <span>
    Prenotazioni Totali:
    {ultimoNumeroPrenotazione}
  </span>

</div>


{/* Lista prenotazioni */}


          {prenotazioniOrdinate.map(
            (prenotazione, indice) => (
              <div
                key={prenotazione.id}
                className="border rounded-xl p-4 mb-3"
              >
                <p>
                <strong>N° Prenotazione:</strong>{" "}
                 {String(prenotazione.id)
                 .padStart(5, "0")}

                {prenotazione.ricorrente && (
                 <span
                className="ml-2 text-blue-600 font-bold "title="Evento ricorrente"> 🔁
                </span>
                 )}

                  {prenotazione.multifascia && (
                  <span
                   className="ml-2 text-amber-600 font-bold"
                   title="Prenotazione multi-fascia"
                   >
                  🕒
                  </span>
                    )}

                </p>
                <p>
                  <strong>Gruppo:</strong>{" "}
                  {prenotazione.gruppo}
                </p>

                <p>
                  <strong>Stanza:</strong>{" "}
                  {prenotazione.stanza}
                </p>

                <p>
                <strong>Data:</strong>{" "}
                {new Date(prenotazione.data)
                 .toLocaleDateString("it-IT")}
                  </p>

                <p>
                  <strong>Giorno:</strong>{" "}
                  {giornoSettimana(
                    prenotazione.data
                  )}
                </p>

                <p>
                <strong>Orario:</strong>
                   {prenotazione.fasciaOraria}
                </p>

                {prenotazione.note && (
                 <p>
                <strong>Note:</strong>{" "}
                {prenotazione.note}
                  </p>
)}
<button
  onClick={() =>
    modificaPrenotazione(
      prenotazione,
    )
  }
  className="mt-2 mr-2 bg-blue-600 text-white px-3 py-1 rounded transition-all
duration-200
hover:scale-105
hover:shadow-lg
active:scale-95"
>
  ✏️ Modifica
</button>

<button
  onClick={() =>
    eliminaPrenotazione(prenotazione.id)
  }
  className="mt-2 bg-red-600 text-white px-3 py-1 rounded transition-all
duration-200
hover:scale-105
hover:shadow-lg
active:scale-95"
>
  🗑 Elimina
</button>
              
              </div>
            )
          )}
        </div>
  );
  }