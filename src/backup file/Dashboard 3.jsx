export default function Dashboard({
  setPagina,
  prenotazioni,
  nuovaPrenotazione,
}) {

const nomiGiorni = [
  "DOMENICA",
  "LUNEDÌ",
  "MARTEDÌ",
  "MERCOLEDÌ",
  "GIOVEDÌ",
  "VENERDÌ",
  "SABATO",
];

  const oggi = new Date();

  const dataInizio = new Date();

dataInizio.setHours(
  0,
  0,
  0,
  0
);

const dataFine = new Date();

dataFine.setDate(
  dataFine.getDate() + 7
);

dataFine.setHours(
  23,
  59,
  59,
  999
);

  const eventiSettimana =
    prenotazioni.filter(
      (prenotazione) => {

        const dataEvento =
          new Date(prenotazione.data);

        return (
  dataEvento >= dataInizio &&
  dataEvento <= dataFine
);
      }
    );

  const eventiOrdinati =
    [...eventiSettimana].sort(
      (a, b) =>
        new Date(a.data) -
        new Date(b.data)
    );
const dateSettimana = [];

for (let i = 0; i < 8; i++) {


  const data = new Date();

  data.setDate(
    data.getDate() + i
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

  if (
    nome.includes("marconoi") ||
    nome.includes("ass.marco")
  ) {
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

  return (
    <div className="space-y-4">

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <div className="flex gap-3 flex-wrap">

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6 mt-6">

        <h2 className="text-2xl font-bold mb-4">
          Eventi prossimi 8 giorni
        </h2>

        <p className="text-slate-500 mb-4">
         Dal {dataInizio.toLocaleDateString("it-IT")}
{" al "}
{dataFine.toLocaleDateString("it-IT")}
        </p>

        {eventiOrdinati.length === 0 ? (

          <p>
            Nessun evento previsto.
          </p>

        ) : (

          dateSettimana.map((giorno) => {

  const eventiGiorno =
    eventiOrdinati.filter(
      (evento) =>
        new Date(evento.data)
          .toDateString() ===
        giorno.toDateString()
    );
  const eOggi =
  giorno.toDateString() ===
  new Date().toDateString();
const domani = new Date();

domani.setDate(
  domani.getDate() + 1
);

const eDomani =
  giorno.toDateString() ===
  domani.toDateString();


  return (
    <div
      key={giorno.toISOString()}
      className="mb-6"
    >

      <h3
  className={
    eOggi
      ? "font-bold text-lg mb-2 border-b pb-1 bg-green-100 text-green-800 rounded p-2"
      : "font-bold text-lg mb-2 border-b pb-1"
  }
>
  {eOggi
  ? "OGGI"
  : eDomani
  ? "DOMANI"
  : nomiGiorni[giorno.getDay()]}

{" "}
{giorno.getDate()}
</h3>

      {eventiGiorno.length === 0 ? (

        <p className="text-slate-400">
          Nessun evento
        </p>

      ) : (

        eventiGiorno.map(
          (evento, indice) => (

            <div
  key={indice}
  className={`
    ${coloreGruppo(evento.gruppo)}
    rounded-lg p-3 mb-2
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
              <div className="text-sm text-slate-600 mt-2 italic">
               📝 {evento.note}
                </div>
                  )}

            </div>

          )
        )

      )}

    </div>
  );
})

        )}

      </div>

    </div>
  );
}