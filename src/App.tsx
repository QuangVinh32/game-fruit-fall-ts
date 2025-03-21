// import { useEffect, useState } from "react";
// import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
// import yoTechSDK from "./game/utils/yoTechSDK";



// function App() {
//   const [receivedData, setReceivedData] = useState<any>(null);

//   useEffect(() => {
//     yoTechSDK.registerHandler((message) => {
//       console.log("[B] Nhận tin nhắn từ A:", message);
//       try { 
//         if (message.eventType === "START") {
//           console.log("[B] Dữ liệu hợp lệ:", message.eventData);
//           setReceivedData(message.eventData );
//         } else {
//           console.warn("Tin nhắn không hợp lệ:", message);
//         }
//       } catch (error) {
//         console.error("Lỗi khi xử lý tin nhắn:", error);
//       }
//     });
  
//     return () => {
//       yoTechSDK.registerHandler(() => {});
//     };
//   }, []);
  

//   return (
//     <div id="app">
//       {/* <PhaserGame />
//       <h2>Dữ liệu nhận từ A:</h2>
//       <pre>{JSON.stringify(receivedData, null, 2)}</pre> */}
//     </div>
//   );
// }

// export default App;



import { ChangeEvent, useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import MainMenu from './game/Scenes/MainMenu';

function App()
{
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

