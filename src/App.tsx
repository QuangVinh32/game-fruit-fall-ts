import { ChangeEvent, useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import { MainMenu } from './game/Scenes/MainMenu';

function App()

{

    console.log("Scene đã khởi tạo");

    // Lắng nghe tin nhắn từ React
    window.addEventListener("message", (event) => {
      console.log("Game nhận được tin nhắn từ React:", event.data);

      if (event.data.action === "START_GAME") {
        console.log("Bắt đầu game với thông điệp:", event.data.data);
        
      }
    });
        //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [insideOutMessage, setInsideOutMessage] = useState('');
    const [outsideInMessage, setOutsideInMessage] = useState('');

    const outsideIn = () => {

        if(phaserRef.current)
        {     
            const scene = phaserRef.current.scene as MainMenu;
            
            if (scene)
            {
                scene.outsideIn(outsideInMessage, (message) => {
                    setInsideOutMessage(message);
                });
            }
        }
    }

    function onMessageChange(e: any) {
        setOutsideInMessage(e.target.value);
    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {}

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            {/* <div>
                <div>
                    <input className='outside-in-message' type='text' placeholder='Message' onChange={onMessageChange}/>
                </div>

                <div>
                    <button className="button" onClick={outsideIn}>Outside In</button>
                </div>
                <div className="inside-out-message">Inside out: {insideOutMessage}
                </div>
            </div> */}
        </div>
    )
}

export default App
