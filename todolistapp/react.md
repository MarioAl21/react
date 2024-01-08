# Index
1. [REACT](#3-react)

   3.1 [¿Qué es un componente?](#31-¿qué-es-un-componente)

   [Axios](#axios)
   
   [GET](#41-making-a-get-request)

   POST

   DELETE

## 3.1 ¿Qué es un componente?
Es similar a un cubo de lego con sus propias funcionalidades y características.
Conforme los colocamos juntos, obtenemos más robustos y complejos **resultados**, sin sacrificar flexibilidad, pues los podemos remover, actualizar o añadir nuevos SIN afectar el resto de la aplicación.
### 3.1.1 Tipos de componentes
- Container
  
   También conocido como *"Smart Components"*, controla la interacción (la lógica) entre usuarios, navegador, solicitudes por API, etc. 
- Presencional

   También conocido como *"Dumb Components"*, se encarga de la estructura y estilos de la aplicación.

Esta división entre componentes facilita reusar código (**DRY**), ayuda a eliminar en cierta medida el código *spaghetti*, lo cual sucede cuando nuestros componentes son muy largos y díficil de manejar.

Ambos tipos de componente puede utilizar otros componentes para extender su funcionalidad (*Composition programming*).

### 3.1.2 Arrancar la applicación
Usamos el comando **npm start**, lo cual inicia un servidor y accesible desde nuestro navegador desde el puerto 3000.

### 3.1.3 Construir la aplicación para producción
Con el comando **npm run build** empaquetamos React en "modo" producción y optimiza el *build* .para una mejor ejecución.

### 3.1.4 Remover el build
Si no estamos satisfechos con la herramienta *build* y su configuración, podemos *ejectarlo* en cualquier momento. Esto lo hacemos con el comando **eject**. Este removerá la dependencia *build* de nuestro projecto.
Pero en su lugar podemos utilizar **npm run eject** para copiar todas las configuraciones de archivos y propiedades transitivas (webpack, Babel, ESLint, etc) justo dentro de nuestro projecto, teniendo mayor control sobre ellos.

### 3.1.5 Crear Componentes

>App.js
```     
function App() {
  return (
    <div className="App">
      <p>Hello World</p>
    </div>
  )
}
export default App
```

Tenemos un archivo App.js, nótese la extensión (lo cual indica que se trata de código JavaScript). Dentro tenemos una función llamada App. Es una función sí, y también un **componente**. Esta es la forma de crearlos en REACT.
Dentro de la función tenemos código HTML, o al menos es lo que parece, porque en realidad NO es HTML, es lo que se conoce como JSX (JavaScript XML), sintaxis que nos permite combinar JS con XML.

Algo que nos puede ayudar a diferenciar cuando es código XML y HTML, es por ejemplo el atributo "className" en lugar de "class". En el primer caso es XML y en el segundo HTML.

```
return (
  // -- Elemento --
  <div className="App">
    <p>Hello World</p>
  </div>
  // ---------------
)
```

Esta parte de acá es código JSX, pero que se va a traducir a HTML. De momento, así como está en nuestro código hace parte de lo que retorna nuestro componente REACT.

ℹNOTA: Este código necesita pasar por BABEL y otras herramientas para convertirse a su vez en código JS y, después, en un elemento HTML.

Por lo tanto, algo así:
```
  <h1>
    Completaste
    {props.completed} de
    {props.total} TODO's
  </h1>
```

En realidad tiene que ser algo como esto para ser entendido por JS:

```
  React.createElement (
    'h1',
    null,
    `Completaste
    ${props.completed} de
    ${props.total} TODO´s`        
  )
```
Esto sucede de forma interna. Es por esto que es más fácil trabajar con una sintaxis muy parecida a HTML (</>) que con JS puro y REACT.
[!NOTA]: *props* significa propiedad, y aunque es similar a un atributo, NO lo es.

### 3.1.6 Exportar y Renderizar Componentes 

Para renderizar nuestro componente:
```
  const root = ReactDOM.createRo(document.getElementById('root'));
  root.render(<App />);
```
Esta línea de aquí (que se encuentra en el archivo "index.js") renderiza nuestro componente

```
  default export App
```
Y esta línea de acá manda a exportarlo para se utilizado en el index.js.

Existen dos formas de renderizar nuestros componentes: 

   - Utilizando la instrucción **default export <módulo (componente) a exportar>**

⚠ Sólo se puede exportar un módulo a la vez, de lo contrario la dependencia *webpack* nos arrojará el error de dos módulos tratándose de compilar. Esto nos obliga a utlizar la segunda alternativa: insertar componentes dentro de otros componentes.
   
   - Dentro de la función APP (en el archivo App.js) insertamos el componente con la siguiente sintaxis: **&lt;nombre de componente/&gt;**

   Ejemplo:
``` 
    function App() {
      return (
 
        // Dentro de App insertamos OtroComponente
        <OtroComponente />

        <div className="App">
          <p>Hello World</p>
        </div>
      )
    }
    function OtroComponente() {
      return (
        <li>
          Un elemento nuevo
        </li>
      );
    }

    export default App
```

### 3.1.7 El Render de REACT
El concepto es similar al de una fábrica que recibe todos nuestros componentes, elementos y props; y pasan por los métodos de REACT y demás procesos que convierten el código en JS y HTML.

### 3.1.8 Props
Props viene de "Properties" (Propiedades), y son componentes *read-only*.
En específico hablamos de un objeto que guarda los atributos de una etiqueta, y que trabajan de forma similar a los atributos en HTML. <br />
Ofrecen una forma de pasar datos entre componentes. *Es parecido a los argumentos de una función*.

Ejemplo:
```
// TodoList es un componente que envuelve a tres componentes TodoItem  
<TodoList>
  <TodoItem /> // child 1
  <TodoItem /> // child 2
  <TodoItem /> // child 3
</TodoList>

// Componente TodoList
// el objeto props es recibido como parámentro 
function TodoList(props) {
  return (
    <ul>
     {props.children} // Dentro de props utilizamos el atributo children  
    </ul>
  );
}

// NOTA: REACT convierte el componente TodoItem en el atributo children de 
//       TodoList, y lo podemos utilizar gracias al objeto props.

// Componente TodoItem
function TodoItem() {
  return (
    <li>Elemento de la lista</lis>
  );
}
```

❗El objeto **props** lo crea automáticamente REACT, el cual es similar al objecto **envent** cuando creamos un evento *click, mouseover, keydown,* etc.

Para recordar cómo es que podemos utilizar el objeto *event*, veámos el siguiente *snipet*.

```
<input id="button-click" type="button" value="Click me!">
<script>
 let click_button = document.getElementById('button-click');
 click_button.addEventListener('click', e => {
  alert('Thanks for click me!');
  console.log(e); // Imprimirá todos las propiedades del evento click
 });
</script>
```  

### 3.1.9 Fragment
REACT **no** puede renderizar más de un elemento a la vez (un componente debe retornar sólo un elemento JSX). Para mantener esta regla y NO obligarnos a introducir todos los componentes que queremos retornar dentro de un **div**, o algo similar, REACT nos da la opción de utilizar **Fragments**. 

Ejemplo:
```
// Para utilizar Fragements, hay que importar su librería
import React from 'react';

function App() {
  return (
    <React.Fragment>

     <TodoCounter />
     <TodoSearch />

     <TodoList>
      <TodoItem />
      <TodoItem />
      <TodoItem />
     </TodoList>

     <CreateTodoButton/>

    <React.Fragment/>
  );
}
```
En lugar de
```
function App() {
  return (
    <div className="App">

     <TodoCounter />
     <TodoSearch />

     <TodoList>
      <TodoItem />
      <TodoItem />
      <TodoItem />
     </TodoList>

     <CreateTodoButton/>

    <div/>
  );
}
```
❗NOTA: Si utilizamos *Fragment*, no será un elemento HTML visible. Es más, NO será siquiera un elemento HTML; será sólo para respetar la regla de REACT de retornar sólo un elemento JSX, y al mismo tiempo retornar tantos componentes y otros elementos como queramos.

Una alternativa a utilizar *<React.Fragmente><React.Fragmente/>*, es <></> para abreviar al máximo el escribir todo el *Fragment*. 

Ejemplo:
```
<>
 <TodoCounter />
 <TodoSearch />

 <TodoList>
  <TodoItem />
  <TodoItem />
  <TodoItem />
 </TodoList>

 <CreateTodoButton/>
</>
```
### 3.1.10 Alternativas para Redenrizar
Además de tener Fragment, existe otras formas de renderizar: utilizando **arreglos**. <br />
```
// Creamos un arreglo con todas nuestras tareas por hacer
let tareas = [
  {descripcion: 'Tarea 1', completado: false},
  {descripcion: 'Tarea 2', completado: false},
  {descripcion: 'Tarea 3', completado: false}
];
// dentro de nuestro componente, iteramos
function App() {
  ...
  <TodoList>
   {
    tareas.map(tarea => (
      <TodoItem 
        key={tarea.descripcion}
        descripcion={tarea.descripcion}
      />
    ));
   }
  <TodoList />
}
// Modificamos el componente TodoItem para leer los datos que recibimos 
// de la iteración anterior
function TodoItem(props) {
  <li>
   Descripcion: {props.descripcion}
  </li>
}
```
❗NOTA: Cuando utilizamos arreglos, es necesario una clave única, y es por eso que usamos el atributo **key**. A este atributo, a esta **propiedad** le asigamos el valor de la descripción de la tarea, pues podemos tomarlo por único ya que no tiene sentido que el usuario repita una que ya haya maracado como hecha. Desde luego, el lector es libre de elegir un valor para key más sólido al momento de asegurar su *unicidad* y, garantizar así, que el campo no se repita.

## 3.2 Añadir estilos

# Axios

Many projects on the web need to interface with a REST API at some stage in their development. **Axios** is a lightweight HTTP client based on the *$http* service within Angular.js v1.x and is similar to the native JavaScript *Fetch* API.

Axios is promise-based, which gives us the ability to take advantage of JavaScript’s *async* and *await* for more readable asynchronous code.

We can also intercept and cancel requests, and there’s built-in client-side protection against cross-site request forgery.

## 4.1 Add Axios to the project

```
npm install axios
```

## 4.1 Making a GET request
We use axios and its get method.
```
axios.get(URL)
  .then(ans => {
        this.setState({  });
  })
```
Example:
```
axios.get(`https://jsonplaceholder.typicode.com/users`)
       .then(ans => {
        const people = ans.data;
        const status = ans.status;
        const request = ans.request;
        this.setState({ people, status, request });
       })
```

