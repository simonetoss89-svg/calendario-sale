
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import FormPrenotazione from "./components/formprenotazione";
import ListaPrenotazioni from "./components/Prenotazioni";
import CalendarioSale from "./components/CalendarioSale";
import Statistiche from "./components/Statistiche";


export default function App() {

  
  const [ultimoNumeroPrenotazione,
  setUltimoNumeroPrenotazione] =
  useState(() => {

    const salvato =
      localStorage.getItem(
        "ultimoNumeroPrenotazione"
      );

    return salvato
      ? Number(salvato)
      : 0;
  });

const [pagina, setPagina] =
  useState("dashboard");

  const gruppi = [
    "Coro Happy song",
    "Coro parrocchiale",
    "Catechesi",
    "Catechesi 2E","Catechesi 3E","Catechesi 4E","Catechesi 5E","Catechesi 1M","Catechesi 2M","Catechesi 3M ",
    "Ass.MarcoNOI",
    "Giovani",
    "Gruppo Mercatino",
    "Attivita Parrocchia",
    "Uso esterno",
  ];

  const stanze = [
  "Sala S.Marco",
  "Sala Giovani",
  "Sala S.Martiri",
  "Sala S.Domenico",
  "Sala S.Vigilio",
  "Teatro",
];

const [erroreRicorrenza,
  setErroreRicorrenza] =
  useState("");

const [filtroSala, setFiltroSala] =
  useState("");

  const fasceOrarie = [
    "08:00 - 12:00",
    "12:00 - 16:00",
    "16:00 - 19:00",
    "19:00 - 24:00",
  ];
  const [mostraConferma, setMostraConferma] =
  useState(false);

const [datiConferma, setDatiConferma] =
  useState(null);
  const [
  indiceModifica,
  setIndiceModifica
] = useState(null);

  const [gruppo, setGruppo] = useState("");
  const [stanza, setStanza] = useState("");
  const [dataPrenotazione, setDataPrenotazione] = useState("");
  const [fasceSelezionate,setFasceSelezionate] =
  useState([]);
  const fasciaOraria =
  fasceSelezionate[0] || "";
  const [settimanaOffset, setSettimanaOffset] =
  useState(0);
  const [note, setNote] = useState("");

  const [ricorrente, setRicorrente] =
  useState(false);

const [frequenza, setFrequenza] =
  useState("settimanale");

const [dataFineRicorrenza,
  setDataFineRicorrenza] =
  useState("");

  const [prenotazioni, setPrenotazioni] = useState(() => {
    const datiSalvati =
    localStorage.getItem("prenotazioni");
  
    return datiSalvati
    ? JSON.parse(datiSalvati)
    : [];
});

  useEffect(() => {
    localStorage.setItem(
      "prenotazioni",
      JSON.stringify(prenotazioni)
    );
  }, [prenotazioni]);

  function giornoSettimana(data) {
    const giorni = [
      "Dom",
      "Lun",
      "Mar",
      "Mer",
      "Gio",
      "Ven",
      "Sab",
    ];
    return giorni[new Date(data).getDay()];
  }


// ==========================
// TROVA STESSA OCCORRENZA
// NEL MESE SUCCESSIVO
// ==========================

function trovaStessaOccorrenza(
  dataOriginale,
  mese,
  anno
) {

  const giornoSettimana =
    dataOriginale.getDay();

  const giornoMese =
    dataOriginale.getDate();

  const occorrenza =
    Math.ceil(
      giornoMese / 7
    );

  const ultimoGiornoOriginale =
    new Date(
      dataOriginale.getFullYear(),
      dataOriginale.getMonth() + 1,
      0
    ).getDate();

  const eUltimaOccorrenza =
    giornoMese + 7 >
    ultimoGiornoOriginale;

  const giorniCompatibili = [];

  const ultimoGiornoNuovoMese =
    new Date(
      anno,
      mese + 1,
      0
    ).getDate();

  for (
    let giorno = 1;
    giorno <= ultimoGiornoNuovoMese;
    giorno++
  ) {

    const data =
      new Date(
        anno,
        mese,
        giorno
      );

    if (
      data.getDay() ===
      giornoSettimana
    ) {

      giorniCompatibili.push(
        data
      );

    }

  }

  // se la data iniziale era
  // l'ultima occorrenza del mese

  if (eUltimaOccorrenza) {

    return giorniCompatibili[
      giorniCompatibili.length - 1
    ];

  }

  // 1ª, 2ª, 3ª, 4ª...

  return giorniCompatibili[
    occorrenza - 1
  ];

}


  function inizioSettimana() {
  const oggi = new Date();

  oggi.setDate(
    oggi.getDate() +
    settimanaOffset * 7
  );

  const giorno = oggi.getDay();

  const differenza =
    giorno === 0 ? -6 : 1 - giorno;

  oggi.setDate(
    oggi.getDate() + differenza
  );

  return oggi;
}

function fineSettimana() {
  const fine = new Date(
    inizioSettimana()
  );

  fine.setDate(
    fine.getDate() + 6
  );

  return fine;
}

{/* nuova funzione settimane giuste tabella */}

  function giorniSettimana() {
  const inizio = new Date(
    inizioSettimana()
  );

  const giorni = [];

  for (let i = 0; i < 7; i++) {
    const giorno = new Date(inizio);

    giorno.setDate(
      inizio.getDate() + i
    );

    giorni.push(giorno);
  }

  return giorni;
}

 function nuovaPrenotazione() {

  setIndiceModifica(null);

  setGruppo("");
  setStanza("");
  setDataPrenotazione("");
  setFasceSelezionate([]);
  setNote("");

  setPagina("prenotazione");
} 
  



  function confermaPrenotazione() {


    if (

      // ==========================
      // VALIDAZIONE
      // ==========================

      !gruppo ||
      !stanza ||
      !dataPrenotazione ||
      !fasciaOraria
    ) {
      alert("Compila tutti i campi");
      return;
    }
    // ==========================
    // CONTROLLO CONFLITTI
    // ==========================

    const esisteGia = prenotazioni.find(
    (p) =>
    p.stanza === stanza &&
    p.data === dataPrenotazione &&
    p.fasciaOraria === fasciaOraria &&
    p.id !== indiceModifica
);

    if (esisteGia) {
      alert(
        "Questa stanza è già prenotata"
      );
      return;
    }

    // ==========================
    // MODIFICA PRENOTAZIONE
    // ==========================

if (indiceModifica !== null) {

  const prenotazioniAggiornate =
    prenotazioni.map((p) => {

      if (p.id === indiceModifica) {

        return {
          ...p,
          gruppo,
          stanza,
          data: dataPrenotazione,
          fasciaOraria,
          note,
        };

      }

      return p;

    });

  setPrenotazioni(
    prenotazioniAggiornate
  );
  setDatiConferma({
  id: indiceModifica,
  gruppo,
  stanza,
  data: dataPrenotazione,
  fasciaOraria,
  note,
});

setMostraConferma(true);

  setIndiceModifica(null);

  setGruppo("");
  setStanza("");
  setDataPrenotazione("");
  setFasceSelezionate([]);
  setNote("");

  setPagina("lista");

  return;
}   

// ==========================
// BLOCCO RICORRENZA + MULTIFASCIA
// ==========================

/*  if (
  ricorrente &&
  fasceSelezionate.length > 1
) {

  alert(
    "Le prenotazioni ricorrenti possono essere create con una sola fascia oraria."
  );

  return;

} */
  
  // ==========================
  // PRENOTAZIONE RICORRENTE
  // ==========================

    if (
  ricorrente &&
  dataFineRicorrenza
) {

 const dataInizio =
  new Date(dataPrenotazione);

const dataFine =
  new Date(dataFineRicorrenza);

if (dataFine < dataInizio) {

  setErroreRicorrenza(
    "La data finale deve essere successiva alla data della prenotazione."
  );

  return;

  
}
 setErroreRicorrenza("");
 

  const nuovePrenotazioni = [];
  const conflitti = [];

  let dataCorrente =
    new Date(dataPrenotazione);

    const dataBase =
  new Date(dataPrenotazione);


  // inizio while per creare prenotazioni ricorrenti

  while (
  dataCorrente <= dataFine
) {

  const nuovoNumero =
    ultimoNumeroPrenotazione +
    nuovePrenotazioni.length +
    1;


  const anno =
  dataCorrente.getFullYear();

const mese =
  String(
    dataCorrente.getMonth() + 1
  ).padStart(2, "0");

const giorno =
  String(
    dataCorrente.getDate()
  ).padStart(2, "0");

const dataFormattata =
  `${anno}-${mese}-${giorno}`;

  const conflitto =
    prenotazioni.find(
      (p) =>
        p.stanza === stanza &&
        p.fasciaOraria === fasciaOraria &&
        p.data === dataFormattata
    );

  if (conflitto) {

    conflitti.push(
      dataCorrente.toLocaleDateString(
        "it-IT"
      )
    );

  } else {

    nuovePrenotazioni.push({
      id: nuovoNumero,
      gruppo,
      stanza,
      data: dataFormattata,
      fasciaOraria,
      note,
      ricorrente: true,
    });

  }
if (frequenza === "giornaliera") {

  dataCorrente.setDate(
    dataCorrente.getDate() + 1
  );

} else if (
  frequenza === "settimanale"
) {

  dataCorrente.setDate(
    dataCorrente.getDate() + 7
  );

} else if (
  frequenza === "quindicinale"
) {

  dataCorrente.setDate(
    dataCorrente.getDate() + 14
  );

} else if (
  frequenza === "mensile"
) {

  // Mensile stessa data

  dataCorrente.setMonth(
    dataCorrente.getMonth() + 1
  );

} else if (
  frequenza ===
  "mensile-settimana"
) {

  // Mensile stesso giorno della settimana

  const nuovoMese =
    dataCorrente.getMonth() + 1;

  const nuovoAnno =
    nuovoMese > 11
      ? dataCorrente.getFullYear() + 1
      : dataCorrente.getFullYear();

  const meseCorretto =
    nuovoMese > 11
      ? 0
      : nuovoMese;

  dataCorrente =
    trovaStessaOccorrenza(
      dataBase,
      meseCorretto,
      nuovoAnno
    );

}

}

if (conflitti.length > 0) {

  alert(
    "Impossibile creare la serie.\n\n" +
    "Date già occupate:\n\n" +
    conflitti.join("\n")
  );

  return;

}

setPrenotazioni([
  ...prenotazioni,
  ...nuovePrenotazioni,
]);

setUltimoNumeroPrenotazione(
  ultimoNumeroPrenotazione +
  nuovePrenotazioni.length
);

localStorage.setItem(
  "ultimoNumeroPrenotazione",
  ultimoNumeroPrenotazione +
  nuovePrenotazioni.length
);



// fine del while per creare prenotazioni ricorrenti
  
 setDatiConferma({
  id: nuovePrenotazioni[0].id,
  gruppo,
  stanza,
  fasciaOraria,
  note,

  ricorrente: true,

  numeroEventi:
    nuovePrenotazioni.length,

  elencoDate:
    nuovePrenotazioni.map(
      (p) => p.data
    ),
});

  setMostraConferma(true);
  setGruppo("");
  setStanza("");
  setDataPrenotazione("");
  setFasceSelezionate([]);
  setNote("");
  setRicorrente(false);
  setFrequenza("settimanale");
  setDataFineRicorrenza("");
  return;
}


 // ==========================
// PRENOTAZIONE SINGOLA / MULTIFASCIA
// ==========================

const nuovePrenotazioni =
  fasceSelezionate.map(
    (fascia, index) => ({

      id:
    ultimoNumeroPrenotazione +
    index +1,
  gruppo,
  stanza,
  data: dataPrenotazione,
  fasciaOraria: fascia,
  note,
  ricorrente: false,
  multifascia:
    fasceSelezionate.length > 1,

})
  );

setPrenotazioni([
  ...prenotazioni,
  ...nuovePrenotazioni,
]);


setUltimoNumeroPrenotazione(
  ultimoNumeroPrenotazione +
  nuovePrenotazioni.length
);

localStorage.setItem(
  "ultimoNumeroPrenotazione",
  ultimoNumeroPrenotazione +
  nuovePrenotazioni.length
);

setDatiConferma({
  id: nuovePrenotazioni[0].id,
  gruppo,
  stanza,
  data: dataPrenotazione,

  fasciaOraria:
    nuovePrenotazioni[0].fasciaOraria,

  note,

  tipo:
    nuovePrenotazioni.length > 1
      ? "multifascia"
      : "singola",

  numeroEventi:
    nuovePrenotazioni.length,

  elencoFasce:
    nuovePrenotazioni.map(
      (p) => p.fasciaOraria
    ),

});
    setMostraConferma(true);
    setGruppo("");
    setStanza("");
    setDataPrenotazione("");
    setFasceSelezionate([]);
    setNote("");
  }

  // ==========================
  // ELIMINA PRENOTAZIONE
  // ==========================


  function eliminaPrenotazione(
  idDaEliminare
) {

  const conferma =
    window.confirm(
      "Vuoi eliminare questa prenotazione?"
    );

  if (!conferma) return;

  const nuovePrenotazioni =
    prenotazioni.filter(
      (prenotazione) =>
        prenotazione.id !==
        idDaEliminare
    );

  setPrenotazioni(
    nuovePrenotazioni
  );

}
// ==========================
  // modifica PRENOTAZIONE
  // ==========================



    function modificaPrenotazione(prenotazione,) {

  setGruppo(
    prenotazione.gruppo
  );

  setStanza(
    prenotazione.stanza
  );

  setDataPrenotazione(
    prenotazione.data
  );

  setFasceSelezionate([
  prenotazione.fasciaOraria
]);


  setNote(
    prenotazione.note || ""
  );

  setIndiceModifica(prenotazione.id);

  setPagina(
    "prenotazione"
  );
}
  

  return (
    <div className="min-h-screen bg-slate-100 p-6">
     
      <div className="max-w-4xl mx-auto">
        

{/* Header menù testa */}

     <Header
  setPagina={setPagina}
  pagina={pagina}
/>

{/* dashboard */}

{pagina === "dashboard" && (

  <Dashboard
  setPagina={setPagina}
  prenotazioni={prenotazioni}
  nuovaPrenotazione={nuovaPrenotazione}
/>

)}
{pagina === "prenotazione" && (

  <>
  
    <FormPrenotazione
      gruppo={gruppo}
      setGruppo={setGruppo}
      stanza={stanza}
      setStanza={setStanza}
      dataPrenotazione={dataPrenotazione}
      setDataPrenotazione={setDataPrenotazione}
      fasceSelezionate={fasceSelezionate}
      setFasceSelezionate={setFasceSelezionate}
      gruppi={gruppi}
      stanze={stanze}
      fasceOrarie={fasceOrarie}
      note={note}
      setNote={setNote}
      confermaPrenotazione={confermaPrenotazione}
      indiceModifica={indiceModifica}
      ricorrente={ricorrente}
      setRicorrente={setRicorrente}
      frequenza={frequenza}
      setFrequenza={setFrequenza}
      dataFineRicorrenza={dataFineRicorrenza}
      setDataFineRicorrenza={setDataFineRicorrenza} 
      erroreRicorrenza={erroreRicorrenza}
    />
  </>

)}
{pagina === "lista" && (

  <>
   
    <ListaPrenotazioni
      prenotazioni={prenotazioni}
      giornoSettimana={giornoSettimana}
      eliminaPrenotazione={ eliminaPrenotazione}
      modificaPrenotazione={modificaPrenotazione}
      ultimoNumeroPrenotazione={ultimoNumeroPrenotazione}
    />
  </>

)}
{pagina === "calendario" && (

  <>
    <CalendarioSale
  prenotazioni={prenotazioni}
  giornoSettimana={giornoSettimana}
  modificaPrenotazione={modificaPrenotazione}
  eliminaPrenotazione={eliminaPrenotazione}
/>
  </>

)}

{pagina === "statistiche" && (
  <Statistiche
    prenotazioni={prenotazioni}
  />
)}

{/* ==========================
    POPUP CONFERMA PRENOTAZIONI
========================== */}

{mostraConferma && datiConferma && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">

      <h2 className="text-2xl font-bold mb-4">

        ✅ Operazione completata

      </h2>

      <p>
        <strong>N° Prenotazione:</strong>{" "}
        {String(datiConferma.id)
          .padStart(5, "0")}
      </p>

      <p>
        <strong>Gruppo:</strong>{" "}
        {datiConferma.gruppo}
      </p>

      <p>
        <strong>Stanza:</strong>{" "}
        {datiConferma.stanza}
      </p>

 {/* ==========================
    POPUP PRENOTAZIONE RICORRENTE
========================== */}

{datiConferma.ricorrente && (

  <div>

    <p className="text-blue-600 font-semibold">
      🔁 Serie ricorrente creata
    </p>

    <p>
      <strong>
        Prenotazioni create:
      </strong>{" "}
      {datiConferma.numeroEventi}
    </p>

    <div className="mt-2 max-h-40 overflow-y-auto">

      {datiConferma.elencoDate.map(
        (data) => (

          <div key={data}>
            • {new Date(data)
              .toLocaleDateString(
                "it-IT"
              )}
          </div>

        )
      )}

    </div>

    <p className="mt-3">
      <strong>Orario:</strong>{" "}
      {datiConferma.fasciaOraria}
    </p>

  </div>

)}

{/* ==========================
   POPUP PRENOTAZIONE MULTIFASCIA
========================== */}

{datiConferma.tipo ===
  "multifascia" && (

  <div>

    <p className="
  text-amber-600
  font-semibold
  mb-2
">
  🕒 Prenotazione multi-fascia
</p>


    <p>
  <strong>Data:</strong>{" "}
  {new Date(
    datiConferma.data
  ).toLocaleDateString("it-IT")}
  {" • "}
  {giornoSettimana(
    datiConferma.data
  )}
</p>

    <p className="mt-2">
      <strong>
        Prenotazioni create:
      </strong>{" "}
      {datiConferma.numeroEventi}
    </p>

    <div className="mt-2">

      {datiConferma.elencoFasce.map(
        (fascia) => (

          <div key={fascia}>
            • {fascia}
          </div>

        )
      )}

    </div>

  </div>

)}

{/* ==========================
   POPUP PRENOTAZIONE SINGOLA
========================== */}

{!datiConferma.ricorrente &&
 datiConferma.tipo !==
  "multifascia" && (

  <>

    <p>
      <strong>Data:</strong>{" "}
      {new Date(
        datiConferma.data
      ).toLocaleDateString("it-IT")}
    </p>

    <p>
      <strong>Giorno:</strong>{" "}
      {giornoSettimana(
        datiConferma.data
      )}
    </p>

    <p>
      <strong>Orario:</strong>{" "}
      {datiConferma.fasciaOraria}
    </p>

  </>

)}

      <div className="flex gap-3 mt-4">

  <button
    onClick={() => {

      setMostraConferma(false);

      setPagina("dashboard");

    }}
    className="flex-1 bg-green-600 text-white py-2 rounded-xl"
  >
    OK
  </button>

  <button
    onClick={() => {

      setMostraConferma(false);

      nuovaPrenotazione();

    }}
    className="flex-1 bg-blue-600 text-white py-2 rounded-xl"
  >
    OK + Nuova
    </button>

    </div>

    </div>

  </div>

)}

{/* Titolo finale pagina*/}

<footer
  className="
    mt-12
    pt-6
    border-t
    text-center
    text-slate-500
  "
>

  <div className="flex items-center justify-center gap-3 mb-2">

    
    <span className="font-semibold">
      Oratorio Parrocchiale di Marco
    </span>

  </div>

  <p className="text-sm">
    Calendario Sale
  </p>

  <p className="text-xs mt-2">
    © 2026 Associazione MarcoNoi Oratorio A.P.S.
  </p>

</footer>
            </div>
    </div>
    
  );
}
