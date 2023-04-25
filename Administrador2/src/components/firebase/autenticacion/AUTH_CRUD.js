import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export default function IniciarSesion(user){
    signInWithEmailAndPassword(auth, user.EMAIL, user.CLAVE)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const MySwal = withReactContent(Swal)
      Swal.fire({
        icon: 'success',
        text: 'Logueo mamalon',
      })

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        icon: 'error',
        text: 'EMAIL O CONTRASEÑA INCORRECTOS',
    })
    });
}
