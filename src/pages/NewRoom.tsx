import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import IllustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
//import { useContext } from 'react'  
//import { AuthContext } from '../contexts/AuthContext'
import '../styles/auth.scss';

export function NewRoom() {
  const { user } = useAuth(); // Contexto permite compartilhar informações entre componentes e também funções que podem modificar esses valores.
  const history = useHistory();
  const [NewRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    console.log(NewRoom);

    if(NewRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: NewRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }
 
  return (
    <div id="page-auth"> 
      <aside>
        <img src={IllustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo </strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">  
          <img src={logoImg} alt="Letmeask" /> 
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
             type="text" 
             placeholder="Nome da sala"
             onChange={event => setNewRoom(event.target.value)}
             value={NewRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}