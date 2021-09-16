
export interface IPostmongerSession {
    end: () => void;
    trigger: (e: string, data?: any)=> void;
    on: (e: string, cb: (data?: any) => void) => void;
    off:(e: string, cb: (data?: any) => void) => void;
}