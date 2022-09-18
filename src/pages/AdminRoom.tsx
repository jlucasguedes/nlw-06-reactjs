import { useParams } from 'react-router-dom';
//import { useState, FormEvent } from 'react';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

import '../styles/room.scss';
//import { useAuth } from '../hooks/useAuth';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { getDatabase, ref, remove, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  let navigate = useNavigate();
  //const { user } = useAuth();
  const params = useParams<RoomParams>();
  // const [newQuestion, setNewQuestion] = useState('');
  const roomId = params.id || '';
  const { questions, title } = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que vocÊ deseja excluir esta pergunta?')) {
      const database = getDatabase();
      const questionRef = ref(database, `rooms/${roomId}/questions/${questionId}`);
      await remove(questionRef);
    }
  }

  async function handleEndRoom() {
    const database = getDatabase();
    const roomRef = ref(database, `rooms/${roomId}`);
    await update(roomRef, {
      endedtAt: new Date()
    });

    navigate('/');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list">
          {questions.map(question => {
            return (
              <Question key={question.id} content={question.content} author={question.author}>
                <button
                  type='button'
                  onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}