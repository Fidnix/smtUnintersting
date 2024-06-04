import { useStore } from "@nanostores/react";
import { datosTablaStore } from "../Contexts/Datos.ts";
import type { ITablaRecord } from "../types/ITablaRecord.tsx";
import { Spinner } from "react-bootstrap";

export default function ColumnasTabla() {
    const datos_tabla: ITablaRecord = useStore(datosTablaStore);
    if(datos_tabla.length === 0){
      return (
        <>
          <Spinner animation="border" variant="primary" className="large-spinner" style={{position: "absolute", top: "calc(50% - 50px)", right: "calc(50% - 50px)"}}></Spinner>
        </>
      );
    }
    return (
      <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Propuesta para Equipo</th>
              <th>Entidad</th>
              <th>P.P.P.</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {
              datos_tabla.map((datos, index) => (
                <tr key={index}>
                  <td>{datos.equipo}</td>
                  <td>{datos.entidad}</td>
                  <td>{datos.ppp}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
    )
}