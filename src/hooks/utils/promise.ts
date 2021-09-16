import { IPostmongerSession } from "../../interfaces/postmonger";
import { rejectTimer } from "./reject-timer";

export const postmongerPromise = (session: IPostmongerSession, trigger: string, event: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const t = rejectTimer(reject);

        session.trigger(trigger);
        session.on(event, (d) => {
            resolve(d);
            clearTimeout(t);
        });
    })
}