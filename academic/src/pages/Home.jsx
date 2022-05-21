import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColunaTumas } from '../componentes/ColunaTurmas';
import { Footer } from '../componentes/Footer';
import { db } from '../services/firebase-config';
import './../pages/RegistroStyle.css';


export const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [descrição, setDescrição] = useState("");
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "criar");

  async function criarDado() {
    try {
      const user = await addDoc(collection(db, "criar"), {
        name,
        descrição,
      });

      console.log("dados salvos com sucessos", user);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  async function deleteUser(id) {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }

  return (
    <div class="container">
      <div class="row">
        <ColunaTumas/>
        <main class="turma-card">
          <ul class="card">
            <li className="card-imagem"><a href="#"><img class="banner-imagem" src="https://st.depositphotos.com/1002326/5133/v/450/depositphotos_51331625-stock-illustration-open-book-with-summer-landscape.jpg" alt="" /></a></li>
            <li className="card-item">
              <button onClick={() => navigate('criar')}><a>Criar turma</a></button>
            </li>
          </ul>
         
            {users.map((user) => {
              return (
                <>
                  <ul class='card'>
                    <li><img class="banner-imagem" src="https://st.depositphotos.com/1002326/5133/v/450/depositphotos_51331625-stock-illustration-open-book-with-summer-landscape.jpg" /></li>
                    <li className="card-item" id="titulo-card">{user.nome}</li>
                    <li className="card-item" id="descricao-card">{user.descrição}</li>
                  </ul>

                </>
              );
            })}

          
        </main>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;