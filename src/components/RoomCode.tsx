import { useState } from 'react';
import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  const [showBalloon, setShowBalloon] = useState(false);

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
    setShowBalloon(!showBalloon);
  }

  return (
    <>
      <button className={showBalloon ? 'room-code show-balloon': 'room-code'}  onClick={copyRoomCodeToClipboard}>
        <div className="div_successfull_copied">
          { showBalloon && (
            <p id="copy_text">Copiado com sucesso!</p>
          )}
          <img src={copyImg} alt="Copy room code" title="Copiar código sala"/>
        </div>
        <span>Sala #{props.code}</span>
      </button>
    </>
  )
}