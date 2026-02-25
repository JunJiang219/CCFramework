/*
*   事件管理器，事件的监听、触发、移除
*/

import CCMLogger from "../CCMLog/CCMLogger";

export type CCMEventManagerCallFunc = (eventName: string, eventData: any) => void;

interface CCMCallBackTarget {
    callBack: CCMEventManagerCallFunc,
    target: any,
    priority: number,   // 数值越大，优先级越高
}

// 消息执行顺序(降序排列)
function sortListener(a: CCMCallBackTarget, b: CCMCallBackTarget): number {
    return b.priority - a.priority;
}

export class CCMEventManager {
    private static _instance: CCMEventManager = null;
    private constructor() { }
    public static getInstance(): CCMEventManager {
        if (!this._instance) {
            this._instance = new CCMEventManager();
        }
        return this._instance;
    }

    private _eventListeners: { [key: string]: CCMCallBackTarget[] } = {};

    private getEventListenersIndex(eventName: string, callBack: CCMEventManagerCallFunc, target?: any): number {
        let index = -1;
        for (let i = 0, len = this._eventListeners[eventName].length; i < len; i++) {
            let iterator = this._eventListeners[eventName][i];
            if (iterator.callBack == callBack && (!target || iterator.target == target)) {
                index = i;
                break;
            }
        }
        return index;
    }

    public addEventListener(eventName: string, callBack: CCMEventManagerCallFunc, target?: any, priority: number = 0): boolean {
        if (!eventName) {
            CCMLogger.getInstance().log("eventName is empty" + eventName);
            return false;
        }

        if (null == callBack) {
            CCMLogger.getInstance().log('addEventListener callBack is nil');
            return false;
        }
        let callTarget: CCMCallBackTarget = { callBack: callBack, target: target, priority: priority };
        if (null == this._eventListeners[eventName]) {
            this._eventListeners[eventName] = [callTarget];
        } else {
            let index = this.getEventListenersIndex(eventName, callBack, target);
            if (-1 == index) {
                this._eventListeners[eventName].push(callTarget);
            }
            if (priority != 0) this._eventListeners[eventName].sort(sortListener);
        }

        return true;
    }

    public setEventListener(eventName: string, callBack: CCMEventManagerCallFunc, target?: any, priority: number = 0): boolean {
        if (!eventName) {
            CCMLogger.getInstance().log("eventName is empty" + eventName);
            return false;
        }

        if (null == callBack) {
            CCMLogger.getInstance().log('setEventListener callBack is nil');
            return false;
        }
        let callTarget: CCMCallBackTarget = { callBack: callBack, target: target, priority: priority };
        this._eventListeners[eventName] = [callTarget];
        return true;
    }

    public removeEventListener(eventName: string, callBack: CCMEventManagerCallFunc, target?: any) {
        if (null != this._eventListeners[eventName]) {
            let index = this.getEventListenersIndex(eventName, callBack, target);
            if (-1 != index) {
                this._eventListeners[eventName].splice(index, 1);
            }
        }
    }

    public raiseEvent(eventName: string, eventData?: any) {
        CCMLogger.getInstance().log(`==================== raiseEvent ${eventName} begin | ${JSON.stringify(eventData)}`);
        if (null != this._eventListeners[eventName]) {
            // 将所有回调提取出来，再调用，避免调用回调的时候操作了事件的删除
            let callbackList: CCMCallBackTarget[] = [];
            for (let i = 0, len = this._eventListeners[eventName].length; i < len; i++) {
                let iterator = this._eventListeners[eventName][i];
                callbackList.push({ callBack: iterator.callBack, target: iterator.target, priority: iterator.priority });
            }
            for (let i = 0, len = callbackList.length; i < len; i++) {
                let iterator = callbackList[i];
                if (iterator.target) {
                    iterator.callBack.call(iterator.target, eventName, eventData);
                } else {
                    iterator.callBack(eventName, eventData);
                }
            }
        }
        CCMLogger.getInstance().log(`==================== raiseEvent ${eventName} end`);
    }
}