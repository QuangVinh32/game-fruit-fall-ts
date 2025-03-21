export type SDKMessage = {
  eventType: string;
  eventData?: unknown;
};

interface AndroidYoTechSDK {
  onMessage: (message: string, origin: string) => void;
}

interface IOSYoTechSDK {
  postMessage: (message: string, origin: string) => void;
}

declare global {
  interface Window {
    YoTechSDK?: AndroidYoTechSDK;
    webkit?: { messageHandlers?: { YoTechSDK?: IOSYoTechSDK } };
  }
}

let messageHandler = (message: SDKMessage) => {
  console.log('Unhandled Message', JSON.stringify(message, null, 2));
};

window.addEventListener(
  'message',
  event => {
    try {
      let message: SDKMessage = JSON.parse(event.data);
      messageHandler(message);
    } catch (e) {
      messageHandler({ eventType: "ERROR", eventData: event.data });
    }
  },
  false
);

const yoTechSDK = {
  postMessage: (message: SDKMessage, origin: string) => {
    if (window.YoTechSDK) {
      window.YoTechSDK.onMessage(JSON.stringify(message), origin);
    } 
    else if (window.webkit?.messageHandlers?.YoTechSDK) {
      window.webkit.messageHandlers.YoTechSDK.postMessage(JSON.stringify(message), origin);
    }
    else {
      window.postMessage(message, origin);
    }
  },

  registerHandler: (handler: (message: SDKMessage) => void) => {
    messageHandler = handler;
  }

};

export default yoTechSDK;
