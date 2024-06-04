import { useStore } from "@nanostores/react";
import {showToastsStore} from "../Contexts/ShowToasts";

export default function CreateToast() {
    const showToasts = useStore(showToastsStore);

    return (
        <>
            <button onClick={()=>{console.log(showToasts);showToastsStore.set( [...showToasts, {"id": Date.now(), "tipo": "503", "detalles": "Este es un error de prueba"}] )}}>
                Cuack
            </button>
        </>
    );
}