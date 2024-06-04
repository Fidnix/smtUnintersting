import React, { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import { useStore } from "@nanostores/react";
import { datosTablaStore, defaultTablaRecord } from "../Contexts/Datos";
import "./FormSimulador.css";
import type { ITablaRecord } from "../types/ITablaRecord";
import { showToastsStore } from "../Contexts/ShowToasts";

interface InputPropps{
    index: number;
}

function EquipoInput({ index }: InputPropps) {

    // function handleChange(e: any) {
    //     if(isNaN(parseInt(e.target.value))){
    //         return;
    //     }
    // }

  return (
    <>
        <Form.Label> {`Equipo ${index+1}`} </Form.Label>
        <Form.Control size="sm" type="number" name="entidades" placeholder="Número de entidad"/>
    </>
  );
}

export default function FormSimulador() {
    const disableSubmitHanlder = useRef(false);
    function submitHandler(e: any){
        e.preventDefault();
        if(disableSubmitHanlder.current) return;
        disableSubmitHanlder.current = true;

        const form = e.target;
        const formData = new FormData(form);
        const sociedadesString: string = formData.get('sociedades') as string;
        formData.delete('sociedades');

        for(const sociedad of sociedadesString.split(/s*,s*/)){
            formData.append('sociedades', sociedad.toUpperCase());
        }

        const entidadesArray = formData.getAll('entidades');
        formData.delete("entidades");
        for(const entidad of entidadesArray){
            formData.append('entidades', entidad === "" ? "0" : entidad);
        }

        datosTablaStore.set([]);
        const obtencion_datos = new Promise<ITablaRecord>(async (resolve, reject) => {
            try {
                const response = await fetch('https://simulador-cpm-fe27d816b3a3.herokuapp.com/function/simulador-equipos', {
                    method: "POST",
                    body: formData
                })

                const data = await response.json();

                if(!response.ok){
                    showToastsStore.set( [...showToastsStore.get(), {"id": Date.now(), "tipo": response.status.toString(), "detalles": data.detail}] );
                    reject(defaultTablaRecord);
                }

                resolve(data);
            } catch (error) {
                showToastsStore.set( [...showToastsStore.get(), {"id": Date.now(), "tipo": "500", "detalles": "Algo sucedió en la solicitud"}] );
                reject(defaultTablaRecord);
            }
        });

        obtencion_datos
            .then((datos: ITablaRecord)=>{
                datosTablaStore.set(datos);
            })
            .catch((error)=>{
                datosTablaStore.set(error);
            })
            .finally(()=>{
                disableSubmitHanlder.current = false;
            });
    }

    const equipos = [];
    for(let i = 0; i < 4; i++){
        equipos.push( <EquipoInput key={i} index={i}/> );
    }

    return (
        <Form action="" method="post" onSubmit={(e)=>{submitHandler(e)}}>
            <Form.Group className="mb-3" controlId="formSimulador.sociedad">
                <h2>Sociedades</h2>
                <Form.Control type="text" name="sociedades" placeholder="Sociedad1, Sociedad2, ..."/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSimulador.entidad">
                <h2>Entidades</h2>
                {equipos}
            </Form.Group>

            <Form.Control type="submit" className="btn-simular" value="Simular"/>
        </Form>
    )
}