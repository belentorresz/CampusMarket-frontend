function Notificacion({mensaje, tipo="success", cerrar}){


return(

<div className={`notificacion ${tipo}`}>


<span>
{
tipo==="success"
?
"✓"
:
"!"
}
</span>


<p>
{mensaje}
</p>


<button onClick={cerrar}>
×
</button>


</div>

);


}


export default Notificacion;