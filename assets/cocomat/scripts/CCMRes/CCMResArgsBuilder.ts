import { Asset, js } from "cc";
import { CCMLoadResArgs, IRemoteOptions } from "./CCMResTypes";

/**
 * 仅负责构造 load/loadDir/loadRemote 的参数对象
 * 不依赖 CCMResKeeper，用于打破 CCMResUtil 与 CCMResKeeper 的循环引用
 */

export class CCMResArgsBuilder {
    /** 构造 CCMResLoader.load 的参数 */
    public static makeLoadResArgs<T extends Asset>(): CCMLoadResArgs<T> | null {
        const argLen = arguments.length;
        if (argLen <= 0) {
            console.error(`makeLoadResArgs error ${arguments}`);
            return null;
        }

        let resArgs: CCMLoadResArgs<T> = { type: null, onProgress: null, onComplete: null };
        if (argLen == 1) {
            if (typeof arguments[0] == "string") {
                resArgs.path = arguments[0];
            } else if (arguments[0] instanceof Array) {
                resArgs.paths = arguments[0];
            } else if (arguments[0] instanceof Object) {
                return arguments[0] as CCMLoadResArgs<T>;
            } else {
                console.error(`makeLoadResArgs error ${arguments}`);
                return null;
            }
        } else {
            let beginIndex = 1;
            if (typeof arguments[1] == "string") {
                beginIndex = 2;
                resArgs.bundleName = arguments[0];
                resArgs.path = arguments[1];
            } else if (arguments[1] instanceof Array) {
                beginIndex = 2;
                resArgs.bundleName = arguments[0];
                resArgs.paths = arguments[1];
            } else {
                if (typeof arguments[0] == "string") {
                    resArgs.path = arguments[0];
                } else if (arguments[0] instanceof Array) {
                    resArgs.paths = arguments[0];
                } else {
                    console.error(`makeLoadResArgs error ${arguments}`);
                    return null;
                }
            }

            for (let index = beginIndex; index < argLen; index++) {
                const element = arguments[index];
                if (js.isChildClassOf(element, Asset)) {
                    resArgs.type = element;
                } else if (typeof element == "function") {
                    if (index === argLen - 1) {
                        resArgs.onComplete = element;
                    } else {
                        resArgs.onProgress = element;
                    }
                }
            }
        }

        return resArgs;
    }

    /** 构造 CCMResLoader.loadDir 的参数 */
    public static makeLoadDirArgs<T extends Asset>(): CCMLoadResArgs<T> | null {
        const argLen = arguments.length;
        if (argLen <= 0) {
            console.error(`makeLoadDirArgs error ${arguments}`);
            return null;
        }

        let resArgs: CCMLoadResArgs<T> = { type: null, onProgress: null, onComplete: null };
        if (argLen == 1) {
            if (typeof arguments[0] == "string") {
                resArgs.dir = arguments[0];
            } else if (arguments[0] instanceof Object) {
                return arguments[0] as CCMLoadResArgs<T>;
            } else {
                console.error(`makeLoadDirArgs error ${arguments}`);
                return null;
            }
        } else {
            let beginIndex = 1;
            if (typeof arguments[1] == "string") {
                beginIndex = 2;
                resArgs.bundleName = arguments[0];
                resArgs.dir = arguments[1];
            } else {
                if (typeof arguments[0] == "string") {
                    resArgs.dir = arguments[0];
                } else {
                    console.error(`makeLoadDirArgs error ${arguments}`);
                    return null;
                }
            }

            for (let index = beginIndex; index < argLen; index++) {
                const element = arguments[index];
                if (js.isChildClassOf(element, Asset)) {
                    resArgs.type = element;
                } else if (typeof element == "function") {
                    if (index === argLen - 1) {
                        resArgs.onComplete = element;
                    } else {
                        resArgs.onProgress = element;
                    }
                }
            }
        }

        return resArgs;
    }

    /** 构造 CCMResLoader.loadRemote 的参数 */
    public static makeLoadRemoteArgs<T extends Asset>(): CCMLoadResArgs<T> | null {
        const argLen = arguments.length;
        if (argLen <= 0) {
            console.error(`makeLoadRemoteArgs error ${arguments}`);
            return null;
        }

        let resArgs: CCMLoadResArgs<T> = { options: null, onComplete: null };
        if (typeof arguments[0] == "string") {
            resArgs.url = arguments[0];
        } else if (arguments[0] instanceof Object) {
            return arguments[0] as CCMLoadResArgs<T>;
        } else {
            console.error(`makeLoadRemoteArgs error ${arguments}`);
            return null;
        }

        for (let index = 1; index < argLen; index++) {
            const element = arguments[index];
            if (typeof element == "function") {
                resArgs.onComplete = element;
            } else if (element instanceof Object) {
                resArgs.options = element as IRemoteOptions;
            }
        }

        return resArgs;
    }
}
