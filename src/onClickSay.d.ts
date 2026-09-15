export declare class OnClickSay {
    synth: SpeechSynthesis;
    synthRunning: boolean;
    synthCancelled: boolean;
    voices: any[];
    englishVoices: any[];
    constructor();
    loadVoicesWhenAvailable(): void;
    onClickSay(utterance: string, voiceN?: number): void;
    sayit(selectedVoice?: number): SpeechSynthesisUtterance;
    speakResponse(text: string, voiceN: number): void;
}
