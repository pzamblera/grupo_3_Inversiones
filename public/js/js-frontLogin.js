window.addEventListener("load", function(){

    let formulario = document.querySelector("form.especialLogin");
    formulario.addEventListener("submit", function(e){
        e.preventDefault();

        let eMail = document.getElementById("floatingInputEmail");
        if (eMail.value ==""){
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error!',
                text: 'El mail no puede estar vacio y debe ser un mail válido',
              }) 
            return   
        };

        let contrasenia = document.getElementById("floatingPassword");
        if (contrasenia.value.length < 4 ){
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error!',
                text: 'la contraseña no puede tener menos de 4 caracteres',
              })
              
            return
        };
        formulario.submit()
    }); 
}) 

