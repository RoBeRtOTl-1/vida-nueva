import { auth } from "../firebase";


const logIn = document.querySelector("#logIn");

// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation')

// Loop over them and prevent submission
Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }

        form.classList.add('was-validated')
    }, false)
})


if(logIn){
    logIn.addEventListener("submit", async (e) => {

        e.preventDefault()  //Quitamos lo de volver a cargar la pagina
        const email = logIn["logIn-email"].value    //Obtenemos el email
        const password = logIn["logIn-password"].value  //Obtenemos la contraseña
        console.log(email)
        console.log(password)
    
        try {
            const credentials = await signInWithEmailAndPassword(auth, email, password)
            window.alert("Registrado");
        } catch (error) {
            window.alert("Un-Registrado");
        }
    
    })
}
