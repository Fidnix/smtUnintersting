import { useState } from "react";

interface InputPropps{
    index: number;
    value: number;
    setChildren: (value: number) => void;
}

function EquipoInput({ index, value, setChildren }: InputPropps) {

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if(isNaN(parseInt(e.target.value))){
            return;
        }
        setChildren(parseInt(e.target.value));
    }

  return (
    <div className="form__data--label__input d-flex gap-3">
        <label htmlFor={`form__data--equipos__${index+1}`} className="form-label">
            {`Equipo ${index+1}`}
        </label>
        <input
            type="number"
            className="form-control"
            name={`equipo-${index+1}`}
            onChange={(e)=>handleChange(e)}
            id={`form__data--equipos__${index+1}`}
            value={value}
            placeholder="Número de entidad"
        />
    </div>
  );
}

export default function EquiposList() { 
    const [equipos, setEquipos] = useState([0, 0, 0, 0]);

    function setChildren(index: number) {
        return (value: number)=>{
            setEquipos(equipos.map((equipo, i) => i === index ? value : equipo));
        }
    }
    return (
        <>
            {equipos.map( (equipo, index) => <EquipoInput key={index} index={index} setChildren={setChildren(index)} value={equipo}/>)}
        </>
    );
}