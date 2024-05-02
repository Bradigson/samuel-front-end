import Swal from 'sweetalert2'

export const handleAlertSendEmail = ()=>{

    Swal.fire({
        color:"#000",
        icon: "success",
        title: "Canciones Enviadas",
        showConfirmButton: false,
        timer: 1800
      });
}