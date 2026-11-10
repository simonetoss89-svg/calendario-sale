import { Fragment, useState } from "react";
import { useSwipeable } from "react-swipeable";
import DettaglioPrenotazione from "./DettaglioPrenotazione";

export default function CalendarioSale({
  prenotazioni,
  giornoSettimana,
  modificaPrenotazione,
  eliminaPrenotazione,
}) {

    const [settimanaOffset, setSettimanaOffset] =
  useState(0);

  const [salaSelezionata, setSalaSelezionata] =
  useState("tutte");
  
  const oggi = new Date();

  oggi.setDate(
    oggi.getDate() +
    settimanaOffset * 7
  );

  const giornoAttuale =
    oggi.getDay();

  const differenza =
    giornoAttuale === 0
      ? -6
      : 1 - giornoAttuale;

  const lunedi = new Date(oggi);

  lunedi.setDate(
    oggi.getDate() + differenza
  );

  const domenica = new Date(lunedi);

  domenica.setDate(
    lunedi.getDate() + 6
  );
  const stanze = [
    "Sala S.Marco",
    "Sala Giovani",
    "Sala S.Domenico",
    "Sala S.Martiri",
    "Sala S.Vigilio",
    "Teatro",
  ];

  const fasceOrarie = [
    "08:00 - 12:00",
    "12:00 - 16:00",
    "16:00 - 19:00",
    "19:00 - 24:00",
  ];

  const giorni = [
  "Lun",
  "Mar",
  "Mer",
  "Gio",
  "Ven",
  "Sab",
  "Dom",
];



const dateSettimana = [];

for (let i = 0; i < 7; i++) {
  const data = new Date(lunedi);

  data.setDate(
    lunedi.getDate() + i
  );

  dateSettimana.push(data);
}

function coloreGruppo(gruppo) {

  const nome =
    gruppo.toLowerCase();

  if (nome.includes("coro")) {
    return "bg-orange-100 text-orange-800";
  }

  if (nome.includes("catechesi")) {
    return "bg-purple-100 text-purple-800";
  }

  if (nome.includes("giovani")) {
    return "bg-blue-100 text-blue-800";
  }

  if (nome.includes("ass.marconoi")) {
    return "bg-cyan-100 text-cyan-800";
  }

  if (nome.includes("mercatino")) {
    return "bg-emerald-100 text-emerald-800";
  }

  if (
    nome.includes("parrocchia") ||
    nome.includes("attivita")
  ) {
    return "bg-slate-200 text-slate-800";
  }

  if (nome.includes("esterno")) {
    return "bg-red-100 text-red-800";
  }

  return "bg-slate-100 text-slate-800";
}
const nomiGiorni = [
  "LUNEDÌ",
  "MARTEDÌ",
  "MERCOLEDÌ",
  "GIOVEDÌ",
  "VENERDÌ",
  "SABATO",
  "DOMENICA",
];

//codice spostamento touch

const handlers =
  useSwipeable({

    onSwipedLeft: () =>
      cambiaSettimana(1),

    onSwipedRight: () =>
      cambiaSettimana(-1),

  });
const [fade, setFade] =
  useState(false);

  function cambiaSettimana(
  direzione
) {

  setFade(true);

  setTimeout(() => {

    setSettimanaOffset(
      (prev) => prev + direzione
    );

    setFade(false);

  }, 150);

}
// Popup selezione evento

const [
  eventoSelezionato,
  setEventoSelezionato
] = useState(null);

const [
  mostraDettaglio,
  setMostraDettaglio
] = useState(false);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mt-6">

      <h2 className="text-2xl font-bold mb-4">
        Calendario Sale
      </h2>

<div className="flex justify-between items-center mb-4">

  <button
    onClick={() =>
      cambiaSettimana(-1)
    }
    className="
      bg-slate-200
      px-4 py-2
      rounded-xl
      transition-all
      duration-200
      hover:scale-105
      hover:shadow-lg
      active:scale-95
    "
  >
    ◀
  </button>

  <button
    onClick={() =>
      setSettimanaOffset(0)
    }
   className="
  bg-green-600
  text-white
  px-6 py-2
  rounded-full
  font-semibold
  shadow-md
  transition-all
  duration-200
  hover:scale-105
  hover:bg-green-700
"
  >
    Oggi
  </button>

  <button
    onClick={() =>
      cambiaSettimana(+1)
    }
    className="
      bg-slate-200
      px-4 py-2
      rounded-xl
      transition-all
      duration-200
      hover:scale-105
      hover:shadow-lg
      active:scale-95
    "
  >
    ▶
  </button>

</div>

<h2 className="text-4xl font-bold text-center uppercase">
  {lunedi.toLocaleDateString(
    "it-IT",
    {
      month: "long",
      year: "numeric",
    }
  )}


</h2>
<p className="text-center text-slate-600 mb-4">
  Dal {lunedi.toLocaleDateString("it-IT")}
  {" al "}
  {domenica.toLocaleDateString("it-IT")}
</p>


<select
  value={salaSelezionata}
  onChange={(e) =>
    setSalaSelezionata(
      e.target.value
    )
  }
  className="border rounded p-2 mb-4"
>
  <option value="tutte">
    Tutte le sale
  </option>

  {stanze.map((stanza) =>(

    <option
      key={stanza}
      value={stanza}
    >
      {stanza}
    </option>
  ))}
</select>

{/* DESKTOP */}

<div className="hidden md:block">

  <table className="w-full border-collapse border">
    <thead>
      <tr className="bg-slate-200">
        <th className="border p-2">
          Sala / Fascia
        </th>

        {dateSettimana.map((data) => (
          <th
            key={data.toISOString()}
            className="border p-2"
          >
            <div>
              {data.toLocaleDateString("it-IT", {
                weekday: "short",
              })}
            </div>

            <div>
              {data.getDate()}
            </div>
          </th>
        ))}
      </tr>
    </thead>

    <tbody>

      {stanze
        .filter(
          (stanza) =>
            salaSelezionata === "tutte" ||
            stanza === salaSelezionata
        )
        .map((stanza) => (

          <Fragment key={stanza}>

            {fasceOrarie.map((fascia) => (

              <tr
                key={`${stanza}-${fascia}`}
                className={
                  fascia === "08:00 - 12:00"
                    ? "border-t-4 border-slate-500"
                    : ""
                }
              >

                <td className="border p-2">

                  <div className="font-bold">
                    {stanza}
                  </div>

                  <div className="text-sm text-slate-500">
                    {fascia}
                  </div>

                </td>

                {dateSettimana.map((data) => {

                  const prenotazione =
                    prenotazioni.find((p) => {

                      const dataPrenotazione =
                        new Date(p.data);

                      return (
                        p.stanza === stanza &&
                        p.fasciaOraria === fascia &&
                        dataPrenotazione.toDateString() ===
                        data.toDateString()
                      );
                    });

                  return (
                    <td
                      key={`${stanza}-${fascia}-${data.toISOString()}`}
                      className="border h-16 p-2 align-top bg-white"
                    >

                      {prenotazione && (
                        <div
                          onClick={() => {
                            setEventoSelezionato(
                              prenotazione
                            );
                            setMostraDettaglio(true);
                          }}
                          className={`
                            ${coloreGruppo(
                              prenotazione.gruppo
                            )}
                            rounded
                            p-1
                            text-sm
                            font-bold
                            cursor-pointer
                            hover:scale-105
                            transition-all
                          `}
                        >
                          {prenotazione.gruppo}
                        </div>
                      )}

                    </td>
                  );
                })}

              </tr>

            ))}

          </Fragment>

        ))}

    </tbody>
  </table>

</div>

{/* MOBILE */}

<div
  className={`
    md:hidden
    transition-opacity
    duration-200
    ${
      fade
        ? "opacity-0"
        : "opacity-100"
    }
  `}
  {...handlers}
>
  {dateSettimana.map((giorno) => {

    const eventiGiorno =
  prenotazioni
    .filter((prenotazione) => {

      const dataEvento =
        new Date(prenotazione.data);

      return (
        dataEvento.toDateString() ===
          giorno.toDateString() &&
        (
          salaSelezionata ===
            "tutte" ||
          prenotazione.stanza ===
            salaSelezionata
        )
      );
    })
    .sort((a, b) => {

  const confrontoSala =
    a.stanza.localeCompare(
      b.stanza
    );

  if (confrontoSala !== 0) {
    return confrontoSala;
  }

  const inizioA =
    a.fasciaOraria.split(" - ")[0];

  const inizioB =
    b.fasciaOraria.split(" - ")[0];

  return inizioA.localeCompare(
    inizioB
  );

});


    return (

      <div
        key={giorno.toISOString()}
        className="mb-6"
      >

        <h3 className="font-bold text-lg border-b pb-2 mb-3">

          {nomiGiorni[
            giorno.getDay() === 0
              ? 6
              : giorno.getDay() - 1
          ]}

          {" "}

          {giorno.getDate()}

        </h3>

        {eventiGiorno.length === 0 ? (

          <p className="text-slate-400">
            Nessuna prenotazione
          </p>

        ) : (

          eventiGiorno.map((evento) => (

            <div
  key={evento.id}
  onClick={() => {

    setEventoSelezionato(
      evento
    );

    setMostraDettaglio(
      true
    );

  }}
  className={`
  ${coloreGruppo(
    evento.gruppo
  )}
  rounded-lg
  p-3
  mb-2
  cursor-pointer
  border-2
  border-slate-300
  shadow-sm
  transition-all
  duration-200
  hover:scale-105
  hover:shadow-lg
  active:scale-95
  
`}
>

              <div className="font-bold">
                {evento.gruppo}
              </div>

              <div>
                {evento.stanza}
              </div>

              <div>
                {evento.fasciaOraria}
              </div>

              {evento.note && (

                <div className="mt-2 text-sm italic">

                  📝 {evento.note}

                </div>

              )}

            </div>

          ))

        )}

      </div>

    );

  })}

</div>

{/* fine mobile */}

<DettaglioPrenotazione
  evento={eventoSelezionato}
  mostra={mostraDettaglio}
  giornoSettimana={giornoSettimana}
  onClose={() =>
    setMostraDettaglio(false)
  }
  onModifica={modificaPrenotazione}
  onElimina={eliminaPrenotazione}
/>
      

</div>
    
  );
}