import { useEffect, useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type FirebaseQuestions = Record<string, { // Estrutura para construção de tipos com chave valor.
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export function useRoom(roomId: string) { /* Hook para uso comum entre os diferentes privilégios de usuário */
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => { 
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on('value', room => { /*on recarrega tudo novamente */
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content, 
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0], 
        } 
      })

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    }) // Ver documentação do Firebase.

    return () => { 
      roomRef.off('value');
    }
  }, [roomId, user?.id]); // Prestar atenção aqui - toda vez que mudar o roomId executar o useeffect novamente. garante navegação entre salas.

    return { questions, title };
}