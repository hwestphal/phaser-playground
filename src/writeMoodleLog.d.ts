export interface HostMsg {
    datacode: string;
    id: number;
    textbook: string;
    paragraph?: string;
    step?: string;
    data01?: string;
    data02?: string;
    data03?: string;
    data04?: string;
    data05?: string;
    data06?: string;
    data07?: string;
}
export declare function writeMoodleLog(payload: HostMsg): void;
