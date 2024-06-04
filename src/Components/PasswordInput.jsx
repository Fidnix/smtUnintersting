import { useState } from 'react';
import './PasswordInput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

export default function PasswordInput() {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
        <input
            id="password"
            name="password"
            placeholder="Ingrese la contraseña..."
            required
            type={hiddenPassword ? 'password' : 'text'}
            value={password}
            onChange={handleChange}
            style={{
                "padding": "0.5rem 1.5rem",
                "border": "0px solid transparent",
                "border-bottom": "1.4px solid #ffd951",
                "font-size": "18px"
            }}
        />
        <button onClick={()=>setHiddenPassword(!hiddenPassword)}>
            <FontAwesomeIcon icon={hiddenPassword ? faEye : faEyeSlash} style={{color: "#007bff"}}/>
        </button>
    </div>
  );
}