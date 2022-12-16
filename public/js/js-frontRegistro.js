window.addEventListener("load", function(){
    let formulario = document.querySelector("form.especialRegistro");

    formulario.addEventListener("submit", function(e){
        e.preventDefault();
        let contrasenia = document.querySelector("#floatingPassword");
        if (contrasenia.value.length < 4 ){
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error!',
                text: 'Debes completar los campos vacios y la contraseña no puede tener menos de 4 caracteres. Recorda subir una imagen',
              })
              
            return
        };
        formulario.submit()
    }); 
}) 

