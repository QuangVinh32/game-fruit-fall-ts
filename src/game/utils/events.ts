import { EventEmitter } from "events";
// import TypedEmitter from "typed-emitter";

export type MessageEvents = {
  exitGame: () => void;
  Loading: (isShow: boolean) => void;
};

// export const emitter = new EventEmitter() as TypedEmitter<MessageEvents>;
