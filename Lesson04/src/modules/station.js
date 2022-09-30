import { Column } from './column';
import { RenderStation } from './renderStation';

export class Station {
    #queue = [];
    #filling = [];
    #ready = [];
    constructor(typeStation, renderApp = null) {
        this.typeStation = typeStation;
        this.renderApp = renderApp;
        this.renderStation = null;

    }

    get filling() {
        return this.#filling;
    }
    get queue() {
        return this.#queue;
    }
    setOptionStation() {
        const optionStation = this.typeStation;
        optionStation.forEach(element => {
            if (element.count == null) {
                element.count = 1;
                for (let i = 0; i < element.count; i++) {
                    this.#filling.push(new Column(element.type, element.speed))
                }
            } else {
                for (let i = 0; i < element.count; i++) {
                    this.#filling.push(new Column(element.type, element.speed))
                }
            }
        });
    } 
    setRenderStation() {
        if (this.renderApp) {
            this.renderStation = new RenderStation(this.renderApp, this);
        }
    }
    init () {
      this.setOptionStation();
      this.setRenderStation();

      setInterval(() => {
        console.log(this);
        this.checkQueueToFiling();
      }, 2000);
    }
    checkQueueToFiling() {
        if (this.#queue.length) {
            for (let i = 0; i < this.#queue.length; i++) {
                for (let j = 0; j < this.#filling.length; j++) {
                    if (!this.#filling[j].car && 
                        this.#queue[i].typeFuel === this.#filling[j].type) {
                            this.#filling[j].car = this.#queue.splice(i, 1)[0];
                            this.fillingGo(this.#filling[j]);
                            this.renderStation.renderStation();
                            break;
                        }
                }
            }
        }
    }
    fillingGo(column) {
        const car = column.car;
        const needPetrol = car.needPetrol;
        let nowTank = car.nowTank;
        const timerId = setInterval(() => {
            nowTank += column.speed;
            if (nowTank >= car.maxTank) {
                clearInterval(timerId);
                const total = car.nowTank - needPetrol;
                car.fillUp();
                column.car = null;
                this.leaveClient({car, total});
            }
        }, 1000);
        console.log(`заправляем ${JSON.stringify(column.car)}`);
    }
    leaveClient({car, total}) {
        this.#ready.push(car);
        this.renderStation.renderStation();
    }
    addCarQueue(car) {
        this.#queue.push(car);
        this.renderStation.renderStation();
    }
}