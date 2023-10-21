import { Events } from "./Events";

export const Subscribe = (event: Events, callback: Function) => {
    window.addEventListener(event.toString(), () => {
        callback();
    });
}

export const Emit = (event: Events) => {
    dispatchEvent(new Event(event.toString()));
}