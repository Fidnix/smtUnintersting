import type { ITablaRecord } from '../types/ITablaRecord';

async function obtener_datos_tabla(event: Event): Promise<ITablaRecord> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    
    const formData = new FormData(form);
    // formData.append('param1', 'value1');
    // formData.append('param2', 'value2');

    const response = await fetch('https://example.com/api', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        const datos: ITablaRecord = await response.json();
        return datos;
    } else {
        throw new Error('Failed to fetch data');
    }

}

export {obtener_datos_tabla};