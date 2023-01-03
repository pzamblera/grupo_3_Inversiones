function ObtenerPelicula(nombrePelicula){
 

    axios.get("https://www.omdbapi.com/?apikey=f21e6a4b&t="+nombrePelicula)
                .then((datos) => {
                    console.log(datos);
                     res.json(datos.data);
                    })
                    .catch((e) => {
                        console.log(e);
                    });

}


module.exports = ObtenerPelicula;