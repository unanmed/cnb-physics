import { Analyzer } from "../analyzer/analyzer";

/** The interface of the config of the app */
export interface AppConfig {
    /** The refresh rate of the app. The app will analyze 
     *  the objects for the times you set in this property every frame. 
     */
    refreshRate: number;
}

/** The main application of the simulator */
export class App {
    /** The config of the app */
    config: AppConfig;
    /** The loop functions list */
    loopFuncs: Array<(loopTimes?: number, deltaTime?: number) => void>;
    /** The running status of the app */
    status: 'running' | 'paused' | 'stopped' = 'running';
    /** The analyzer */
    analyzer: Analyzer;
    /** The loop function in animation frame */
    loop: (loopTimes?: number, deltaTime?: number) => void

    constructor(config: AppConfig) {
        this.config = config;
        this.run();
        this.analyzer = new Analyzer();
    }

    /** Run the app */
    run(): void {
        this.createLoop();
        this.status = 'running';
    }

    /** Stop the app */
    stop(): void {
        this.status = 'stopped';
    }

    /** Pause the app */
    pause(): void {
        this.status = 'paused';
    }

    /** Resume the app */
    resume(): void {
        this.status = 'running';
    }

    /** Create the raf loop */
    createLoop(): void {
        let loopTimes = 0;
        let lastTime = 0;
        let self = this;
        this.loop = (time: number) => {
            if (self.status === 'paused') {
                return requestAnimationFrame(this.loop);
            } else if (self.status === 'running') {
                let deltaTime = time - lastTime;
                lastTime = time;
                loopTimes++;
                self.update();
                for (let func of self.loopFuncs) {
                    func(loopTimes, deltaTime);
                }
                requestAnimationFrame(this.loop);
            } else if (self.status === 'stopped') {
                this.loop = void 0;
                return;
            }
        }
        requestAnimationFrame(this.loop);
    }

    /** Update the app */
    update(): void {

    }

    /** Add loop function */
    addLoop(func: (loopTimes?: number, deltaTime?: number) => void): void {
        this.loopFuncs.push(func);
    }

    /** Remove loop function */
    removeLoop(func: (loopTimes?: number, deltaTime?: number) => void): void {
        this.loopFuncs.splice(this.loopFuncs.indexOf(func), 1);
    }
}