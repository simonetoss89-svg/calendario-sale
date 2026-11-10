export default function
DettaglioPrenotazione({

  evento,

  mostra,

  onClose,

  onModifica,

  onElimina,

  giornoSettimana,

}) {

  if (!mostra || !evento)
    return null;

  return (

    <div className="
      fixed inset-0
      bg-black/50
      flex items-center
      justify-center
      z-50
    ">

      <div className="
        bg-white
        rounded-2xl
        shadow-xl
        p-6
        max-w-md
        w-full
      ">

        <h2 className="
          text-2xl
          font-bold
          mb-4
        ">
          📅 Dettaglio Prenotazione
        </h2>

        <p>
          <strong>
            N° Prenotazione:
          </strong>{" "}
          {String(evento.id)
            .padStart(5, "0")}
        </p>

        <div className="flex gap-2 mt-2 mb-2">

  {evento.ricorrente && (
    <span className="
      bg-blue-100
      text-blue-700
      px-2 py-1
      rounded-full
      text-xs
      font-bold
    ">
      🔁 Ricorrente
    </span>
  )}

  {evento.multifascia && (
    <span className="
      bg-amber-100
      text-amber-700
      px-2 py-1
      rounded-full
      text-xs
      font-bold
    ">
      🕒 Multi-fascia
    </span>
  )}

</div>


        <p>
          <strong>Gruppo:</strong>{" "}
          {evento.gruppo}
        </p>

        <p>
          <strong>Stanza:</strong>{" "}
          {evento.stanza}
        </p>

        <p>
          <strong>Data:</strong>{" "}
          {new Date(
            evento.data
          ).toLocaleDateString(
            "it-IT"
          )}
        </p>

        <p>
          <strong>Giorno:</strong>{" "}
          {giornoSettimana(
            evento.data
          )}
        </p>

        <p>
          <strong>Orario:</strong>{" "}
          {evento.fasciaOraria}
        </p>

        {evento.note && (
          <p>
            <strong>Note:</strong>{" "}
            {evento.note}
          </p>
        )}

        <div className="
          flex gap-3 mt-6
        ">

          <button
            onClick={() =>
              onModifica(evento)
            }
            className="
              flex-1
              bg-blue-600
              text-white
              py-2
              rounded-xl
            "
          >
            ✏ Modifica
          </button>

          <button
  onClick={() => {

    onElimina(evento.id);

    onClose();

  }}
  className="
    flex-1
    bg-red-600
    text-white
    py-2
    rounded-xl
  "
>
  🗑 Elimina
</button>

        </div>

        <button
          onClick={onClose}
          className="
            w-full
            mt-3
            bg-slate-300
            py-2
            rounded-xl
          "
        >
          Chiudi
        </button>

      </div>

    </div>

  );

}