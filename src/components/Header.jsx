export default function Header({
  setPagina,
  pagina
}) {





  return (
    <div className="mb-8">


     <div className="mb-6 text-center">
     
  <img
    src="/Logo-oratorio.png"
    alt="Logo Oratorio"
    className="h-20 w-30 mx-auto mb-4"
  />   

  <p className="
    text-lg
    text-slate-500
    font-medium
  ">
    Oratorio Parrocchiale di Marco
  </p>

  <h1 className="
    text-4xl
    font-bold
  ">
    Calendario Sale
  </h1>

</div>

      <div className="flex gap-4 flex-wrap justify-center">
        
      {/* Pulsante Dashboard*/}
        
        <button
  onClick={() =>
    setPagina("dashboard")
  }
  className={`
    px-6 py-3 rounded-xl
    transition-all duration-200
    hover:scale-105 hover:shadow-lg
    active:scale-95

    ${
      pagina === "dashboard"
        ? "bg-slate-700 text-white shadow-lg"
        : "bg-slate-300 text-slate-800"
    }
  `}
>
  🏠 Dashboard
</button>
        
        
       {/* Pulsante + prenota*/}
        
        <button
  onClick={() =>
    setPagina("prenotazione")
  }
  className={`
    px-6 py-3 rounded-xl
    transition-all duration-200
    hover:scale-105 hover:shadow-lg
    active:scale-95

    ${
      pagina === "prenotazione"
        ? "bg-blue-700 text-white shadow-lg"
        : "bg-blue-200 text-blue-900"
    }
  `}
>
  ➕ Prenota
</button>

{/* Pulsante Calendario*/}

<button
  onClick={() =>
    setPagina("calendario")
  }
  className={`
    px-6 py-3 rounded-xl
    transition-all duration-200
    hover:scale-105 hover:shadow-lg
    active:scale-95

    ${
      pagina === "calendario"
        ? "bg-blue-700 text-white shadow-lg"
        : "bg-blue-200 text-blue-900"
    }
  `}
>
  📅 Calendario
</button>

{/* Pulsante Lista prenotazioni*/}

<button
  onClick={() =>
    setPagina("lista")
  }
  className={`
    px-6 py-3 rounded-xl
    transition-all duration-200
    hover:scale-105 hover:shadow-lg
    active:scale-95

    ${
      pagina === "lista"
        ? "bg-blue-700 text-white shadow-lg"
        : "bg-blue-200 text-blue-900"
    }
  `}
>
  📋 Prenotazioni
</button>

<button
  onClick={() =>
    setPagina("statistiche")
  }
  className={`
    px-6 py-3 rounded-xl
    transition-all duration-200
    hover:scale-105 hover:shadow-lg
    active:scale-95

    ${
      pagina === "statistiche"
        ? "bg-blue-700 text-white shadow-lg"
        : "bg-blue-200 text-blue-900"
    }
  `}
>
  📊 Statistiche
</button>

      </div>

    </div>
  );
}