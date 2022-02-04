/** The interface of the config of the app */
export interface AppConfig {
    /** The refresh rate of the app */
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

    constructor(config: AppConfig) {
        this.config = config;
        this.run();
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
        let loop = function (time: number) {
            if (self.status === 'paused') {
                return requestAnimationFrame(loop);
            } else if (self.status === 'running') {
                let deltaTime = time - lastTime;
                lastTime = time;
                loopTimes++;
                self.update();
                for (let func of self.loopFuncs) {
                    func(loopTimes, deltaTime);
                }
                requestAnimationFrame(loop);
            } else if (self.status === 'stopped') {
                return;
            }
        }
        requestAnimationFrame(loop);
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