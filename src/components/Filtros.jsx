function Filtros({ filtrar }) {


    return (

        <div className="filtros-container">


            <div className="filtro-grupo">


                <span>
                    Estado
                </span>


                <button className="btn-filter"
                    onClick={() =>
                        filtrar({
                            estado:"DISPONIBLE"
                        })
                    }
                >
                    Disponible
                </button>


                <button className="btn-filter"
                    onClick={() =>
                        filtrar({
                            estado:"RESERVADO"
                        })
                    }
                >
                    Reservado
                </button>


                <button className="btn-filter"
                    onClick={() =>
                        filtrar({
                            estado:"VENDIDO"
                        })
                    }
                >
                    Vendido
                </button>


                <button className="btn-filter"
                    onClick={() =>
                        filtrar({})
                    }
                >
                    Todos
                </button>


            </div>




            <div className="filtro-grupo">


                <span>
                    Categoría
                </span>


                <button className="btn-filter"
                    onClick={() =>
                        filtrar({
                            categoriaId:1
                        })
                    }
                >
                    Tecnología
                </button>


                <button className="btn-filter"
                    onClick={() =>
                        filtrar({
                            categoriaId:2
                        })
                    }
                >
                    Libros
                </button>


                <button className="btn-filter"
                    onClick={() =>
                        filtrar({
                            categoriaId:3
                        })
                    }
                >
                    Ropa
                </button>


                <button className="btn-filter"
                    onClick={() =>
                        filtrar({
                            categoriaId:4
                        })
                    }
                >
                    Otros
                </button>


            </div>


        </div>

    );


}


export default Filtros;