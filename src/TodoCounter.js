
function TodoCounter(props) {
 return(
    <h1>
        Completaste
        {props.completed} de
        {props.total} TODO's         
    </h1>
 );
}

export { TodoCounter };