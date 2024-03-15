import React, { useState } from 'react';
import { generarRecetas } from '../services/RecomendacionesService';
import CalendarioSemanal from './CalendarioSemanal';
import { getUserId } from '../stores/AccessTokenStore';
import { confirmar } from "../services/PlanService";
import './DietForm.css';


function DietForm() {
    console.log("Epa");
    const [edad, setEdad] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [sexo, setSexo] = useState('hombre');
    const [estadoFisico, setEstadoFisico] = useState('sedentario');
    const [preferencias, setPreferencias] = useState('');
    const [alergias, setAlergias] = useState('');
    const [objetivo, setObjetivo] = useState('perder_peso');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const datos = {
                edad,
                peso,
                altura,
                sexo,
                estado_fisico: estadoFisico,
                preferencias_alimentarias: preferencias,
                alergias,
                objetivo
            };
            const response = await generarRecetas(datos);
            console.log('Dietas generadas: ', response);
            setLoading(false);
            setData(response);
        } catch (error) {
            console.error('Error al generar las dietas:', error);
            setLoading(false);
        }
    };

    if (data) {
        console.log(data.messageId);
        // console.log(data.data);

        return (
                <div className='calendar-title'>
                    <h1>Propuesta de Plan</h1>
                    <CalendarioSemanal diets={data.data} messageId={data.messageId} action={confirmPlan} actionName={"Confirmar receta"} />
                </div>);
    } else {
        return (
            <div className={`form-container ${loading ? 'loading' : ''}`}>
                <div className="container">
                    <h1 className='genera'>Genera tu dieta</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="edad">Edad:</label>
                            <input type="text" className="form-control" id="edad" value={edad} onChange={(e) => setEdad(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="peso">Peso (kg):</label>
                            <input type="text" className="form-control" id="peso" value={peso} onChange={(e) => setPeso(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="altura">Altura (cm):</label>
                            <input type="text" className="form-control" id="altura" value={altura} onChange={(e) => setAltura(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="sexo">Sexo:</label>
                            <select id="sexo" className="form-control" value={sexo} onChange={(e) => setSexo(e.target.value)} required>
                                <option value="hombre">Hombre</option>
                                <option value="mujer">Mujer</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="estadoFisico">Estado Físico:</label>
                            <select id="estadoFisico" className="form-control" value={estadoFisico} onChange={(e) => setEstadoFisico(e.target.value)} required>
                                <option value="sedentario">Sedentario</option>
                                <option value="ligero">Ligero</option>
                                <option value="moderado">Moderado</option>
                                <option value="activo">Activo</option>
                                <option value="muy_activo">Muy Activo</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="preferencias">Preferencias Alimentarias:</label>
                            <input type="text" className="form-control" id="preferencias" value={preferencias} onChange={(e) => setPreferencias(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="alergias">Alergias:</label>
                            <input type="text" className="form-control" id="alergias" value={alergias} onChange={(e) => setAlergias(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="objetivo">Objetivo:</label>
                            <select id="objetivo" className="form-control" value={objetivo} onChange={(e) => setObjetivo(e.target.value)} required>
                                <option value="perder_peso">Perder peso</option>
                                <option value="ganar_masa_muscular">Ganar masa muscular</option>
                                <option value="mantener_peso">Mantener peso</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="create-button" disabled={loading}>
                                {loading ? 'Generando...' : 'Generar Dietas'}
                                {loading && <span className="new-loader"></span>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function confirmPlan(messageId, navigate) {

    confirmar(getUserId(), messageId.messageId)
        .then(response => {
            console.log("Plan Confirmado");
            navigate('/profile');
        })
        .catch(error => console.log("Error guardando plan: " + error));
}

export default DietForm;
