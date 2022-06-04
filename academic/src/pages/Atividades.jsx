import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../componentes/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/firebase-config';
import './../pages/RegistroStyle.css';

export function Atividades(){
    const navigate = useNavigate()
    const {id } = useParams()
    const {user} = useAuth()
    const [atividades, setAtividades] = useState([])
    const [admin, setAdmin] = useState([])
    const [pessoas, setPessoas] = useState([])
    
    useEffect(() => {
        onSnapshot(doc(db, 'turma', `${id}` ), (doc) => {
            setAtividades(doc.data()?.atividades)
            setPessoas(doc.data()?.users)
        })
    }, [user?.id])

    


    return(
        <div className='container'> 
            <Navbar/>
            <div className='atividades-turma'>
                <nav class="main-nav">
                    <Link to={`/home/turma/${id}`}>Comunicados</Link>
                    <Link to={`/home/turma/${id}/pessoas`}>Pessoas</Link>
                    <Link to={`/home/turma/${id}/atividades`}>Atividades</Link>
                </nav>
                <div className='botao-criar'>
                    <Link className='botao' to={`/home/turma/${id}/atividades/criar`}>+</Link>
                </div>
                <div className='atividades'>
                    <h2 className='atividades-titulo'>Atividades</h2>
                    {atividades.map((item, id) => {
                        return(
                            <ul className='atividades-objeto' key={id} >
                                <li>{item.titulo}</li>
                                <li>Data de entrega: {item.dataEntrege}</li>
                            </ul>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}