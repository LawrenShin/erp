class ApiRequestDefinerObject {
    requestFn = null;
    failFn = null;
    readyFn = null;

    request(clb) {
        this.requestFn = clb;
        return this;
    }

    fail(clb) {
        this.failFn = clb;
        return this;
    }

    ready(clb) {
        this.readyFn = clb;
        return this;
    }

    run() {
        const {payload, type} = this.action;
        if( payload.type === this.type &&
            payload.method === this.method) {
                const map = {
                    'API_REQUEST': () => this.requestFn ? this.requestFn("loading") : false,
                    'API_REQUEST_FAIL': () => this.failFn ? this.failFn(payload, "fail") : false,
                    'API_REQUEST_READY': () => this.readyFn ? this.readyFn(payload, "loaded") : false
                }
                return map[type] ? map[type]() : false;
        }

        return false;    
    }

    constructor(action, type, method) {
        this.action = action;
        this.type = type;
        this.method = method;
    }
}

export default class ApiRequestDefiner{

    objects = [];
    action = null;
    state = null;

    last() {
        return this.objects[this.objects.length - 1];
    }

    define(action, state, type, method) {
        this.action = action;
        this.state = state;
        const obj = new ApiRequestDefinerObject(action, type, method);
        this.objects.push(obj);
        return this;
    }

    request(clb) {
        this.last().request(clb);
        return this;
    }

    fail(clb) {
        this.last().fail(clb);
        return this;
    }

    ready(clb) {
        this.last().ready(clb);
        return this;
    }

    run() {    
        let r = false;
        for(let o of this.objects){
            if(r = o.run()){
                return r;
            }
        }
        return this.state;
    }
}      

export const getDefaultResponse = () => ({data: [], state: 'loading'});