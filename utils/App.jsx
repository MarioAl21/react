import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Notificacion from "./components/Notification";
import { useState } from "react";

const App = () => {

  // Estados que controlan tanto la aparición de la alerta, como la información que muestra en pantalla
  const [notificacionOpen, setNotificacionOpen] = useState(false);
  /* eslint-disable */
  const [notificacionTipo, setNotificacionTipo] = useState("");
  const [notificacionMensaje, setNotificacionMensaje] = useState("");
  /* eslint-enabled */

  return (
    <BrowserRouter basename="/PokeTodo/">
      <Notificacion
        {...props}
        notificacionOpen={notificacionOpen}
        setNotificacionOpen={setNotificacionOpen}
        notificacionTipo={notificacionTipo}
        notificacionMensaje={notificacionMensaje}
      />
    </BrowserRouter>
  );
};

export default App;
