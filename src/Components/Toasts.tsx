import Toast from 'react-bootstrap/Toast';
import { useStore } from '@nanostores/react';
import { showToastsStore } from '../Contexts/ShowToasts';

export default function Toasts() {
    const showToasts = useStore(showToastsStore);
  return (
    <div style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        display: "flex",
        flexDirection: "column-reverse",
    }}>
        {showToasts.map((toast, index) => (
            <Toast key={index} onClose={()=>showToastsStore.set( showToasts.filter( (e) => e.id !== toast.id ) )} className="d-inline-block m-1" bg="danger" show={true} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Error: {toast.tipo}</strong>
                </Toast.Header>
                <Toast.Body>
                    {toast.id}
                    {toast.detalles}
                </Toast.Body>
            </Toast>
        ))}
    </div>
  );
}