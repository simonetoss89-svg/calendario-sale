export default function FormPrenotazione({
  gruppo,
  setGruppo,
  stanza,
  setStanza,
  dataPrenotazione,
  setDataPrenotazione,
  fasceSelezionate,
  setFasceSelezionate,
  gruppi,
  stanze,
  fasceOrarie,
  confermaPrenotazione,
  note,
  setNote,
  indiceModifica,
  ricorrente,
  setRicorrente,
  frequenza,
  setFrequenza,
  dataFineRicorrenza,
  setDataFineRicorrenza,
  erroreRicorrenza,
}) {

  // funzione descrizione ricorrenza mensile-giorno
  
  function descrizioneRicorrenzaMensile(
  data
) {

  if (!data) return "";

  const dataObj =
    new Date(data);

  const giornoSettimana = [
    "Domenica",
    "Lunedì",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
  ];

  const giorno =
    dataObj.getDay();

  const giornoMese =
    dataObj.getDate();

  const occorrenza =
    Math.ceil(
      giornoMese / 7
    );

  const ultimoGiornoMese =
    new Date(
      dataObj.getFullYear(),
      dataObj.getMonth() + 1,
      0
    ).getDate();

  const eUltimaOccorrenza =
    giornoMese + 7 >
    ultimoGiornoMese;

  if (eUltimaOccorrenza) {

    return `Ultimo/a ${giornoSettimana[giorno]} del mese`;

  }

  return `${occorrenza}ª ${giornoSettimana[giorno]} del mese`;

}

/// fine funzione descrizione ricorrenza mensile-giorno

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

          <div className="space-y-4">
            <h1 className="text-3xl font-bold">
        Form Prenotazione
      </h1>

            <div>
              <label className="block mb-2 font-semibold">
                Gruppo
              </label>

              <select
                value={gruppo}
                onChange={(e) =>
                  setGruppo(e.target.value)
                }
                className="w-full border rounded-xl p-3"
              >
                <option value="">
                  Seleziona un gruppo
                </option>

                {gruppi.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Stanza
              </label>

              <select
                value={stanza}
                onChange={(e) =>
                  setStanza(e.target.value)
                }
                className="w-full border rounded-xl p-3"
              >
                <option value="">
                  Seleziona una stanza
                </option>

                {stanze.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Data
              </label>

              <input
                type="date"
                value={dataPrenotazione}
                onChange={(e) =>
                  setDataPrenotazione(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <div className="mt-6 border rounded-xl p-4 bg-slate-50">

  <h3 className="font-semibold text-lg mb-4">
    Fasce orarie
  </h3>

  <div className="space-y-3">

    {fasceOrarie.map((fascia) => (

     <label
  key={fascia}
  className="
    flex items-center gap-3
    border rounded-xl p-3
    cursor-pointer
    hover:bg-slate-50
  "
>

  <input
  type="checkbox"
  checked={
    fasceSelezionate.includes(
      fascia
    )
  }
  onChange={() => {

    if (
      fasceSelezionate.includes(
        fascia
      )
    ) {

      setFasceSelezionate(
        fasceSelezionate.filter(
          (f) => f !== fascia
        )
      );

    } else {

      setFasceSelezionate([
        ...fasceSelezionate,
        fascia,
      ]);

    }

  }}
/>

  {fascia}

</label>

    ))}

  </div>

</div>
<label className="flex items-center gap-3 mt-6 font-semibold">

  <input
  type="checkbox"
  checked={ricorrente}
  onChange={(e) => {
    setRicorrente(
      e.target.checked
    );
  }}
/>


  Evento ricorrente

</label>
{ricorrente && (

  <div className="mt-6 border rounded-xl p-4 bg-slate-50">

    <h3 className="font-semibold text-lg mb-4">
      Configurazione ricorrenza
    </h3>

    <div className="mb-4">

      <label className="block mb-2 font-semibold">
        Frequenza
      </label>

      <select
        value={frequenza}
        onChange={(e) =>
          setFrequenza(
            e.target.value
          )
        }
        className="w-full border rounded-xl p-3"
      >
        <option value="giornaliera">
        Giornaliera
        </option>
        <option value="settimanale">
          Settimanale
        </option>

        <option value="quindicinale">
          Quindicinale
        </option>

        <option value="mensile">
          Mensile (Stessa data)
        </option>

        <option value="mensile-settimana">
          Mensile (Stesso giorno della settimana)
        </option>

      {/* finestra che avvisa che ricorrenza verrà generata da mensile stesso giorno*/} 
      
      </select>
      {frequenza ===
  "mensile-settimana" &&
  dataPrenotazione && (

  <div
    className="
      mt-3
      p-3
      rounded-xl
      bg-blue-50
      text-blue-700
      border
      border-blue-200
    "
  >
    💡 Verrà ripetuto ogni:

    <strong>
      {" "}
      {descrizioneRicorrenzaMensile(
        dataPrenotazione
      )}
    </strong>

  </div>

)}

 {/* fine finestra mensile stesso giorno*/}  

{/* inizio finestra mensile stessa data */}

{frequenza ===
  "mensile" &&
  dataPrenotazione && (

  <div
    className="
      mt-3
      p-3
      rounded-xl
      bg-green-50
      text-green-700
      border
      border-green-200
    "
  >
    💡 Verrà ripetuto ogni 

    <strong>
      {" "}
      {new Date(
        dataPrenotazione
      ).getDate()}
      {" "}
      del mese
    </strong>

  </div>

)}

 {/* fine finestra mensile stessa data*/}  

    </div>

    <div>

      <label className="block mb-2 font-semibold">
        Ripeti fino al
      </label>

      <input
        type="date"
        value={dataFineRicorrenza}
         min={dataPrenotazione}
        onChange={(e) =>
          setDataFineRicorrenza(
            e.target.value
          )
        }
        className="w-full border rounded-xl p-3"
      />

      {erroreRicorrenza && (
  <p className="
    text-red-600
    text-sm
    mt-1
  ">
    ⚠️ {erroreRicorrenza}
  </p>
)}

    </div>

  </div>

)}

              <div>
        <label className="font-bold">
         Note
          </label>

          <textarea
    value={note}
    onChange={(e) =>
      setNote(e.target.value)
    }
    placeholder="Inserisci eventuali note..."
    className="w-full border rounded p-2 mt-1"
    rows={3}
  />
</div>
            </div>

            <button
              onClick={confermaPrenotazione}
              className="w-full bg-blue-600 text-white py-3 rounded-xl transition-all
duration-200
hover:scale-105
hover:shadow-lg
active:scale-95"
            >
              {indiceModifica !== null
  ? "Salva modifiche"
  : "Prenota"}
            </button>

          </div>
        </div>

  );
}

