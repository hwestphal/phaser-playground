




// // Observers (subscribers) are functions
// export type Observer = (msg?: any) => void



export class Observable {

    // sysObservers are not reset every time
    static sysObservers: { [type: string]: Function[] }
    static userObservers: { [type: string]: Function[] }


    static resetUserObservers() {
        Observable.userObservers = {}
    }

    static addObserver(owner: 'sys' | 'user', type: string, observer: Function) {

        // observers not set up, set them up
        if (Observable.sysObservers == undefined) {
            Observable.sysObservers = {}
        }
        if (Observable.userObservers == undefined) {
            Observable.userObservers = {}
        }

        let thisObserver = (owner == 'sys') ? Observable.sysObservers : Observable.userObservers

        if (thisObserver[type] == undefined) {
            thisObserver[type] = []
        }
        thisObserver[type].push(observer)
    }


    static notifyObservers(type: string, msg?: any): void {
        // console.log('in Observables.notifyObserver', msg)

        // observers not set up, set them up
        if (Observable.sysObservers == undefined) {
            Observable.sysObservers = {}
        }
        if (Observable.userObservers == undefined) {
            Observable.userObservers = {}
        }

        // observers is set up, but doesn't have this type.  add it
        if (type in Observable.sysObservers) {
            // iterate all observers for that type (none if we just added, of course)
            Observable.sysObservers[type].forEach(element => {
                element(msg)
            });
        }
        if (type in Observable.userObservers) {
            // iterate all observers for that type (none if we just added, of course)
            Observable.userObservers[type].forEach(element => {
                element(msg)
            });
        }

            // for (let obs of Observable.observers[type]) {
            //     obs(msg)
            // }
        } // notifyObservers
    } // Observable

