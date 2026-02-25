/**
 * 游戏开发通用的时间处理工具类
 */
export default class CCMTimeUtils {

    /**
     * 获取当前时间戳（毫秒）
     */
    public static now(): number {
        return Date.now();
    }

    /**
     * 获取当前时间戳（秒）
     */
    public static nowInSeconds(): number {
        return Math.floor(Date.now() / 1000);
    }

    /**
     * 格式化秒数为 时:分:秒
     * @param seconds 秒
     * @param alwaysShowHour 是否始终显示小时（如00:05:12）
     */
    public static formatSeconds(seconds: number, alwaysShowHour: boolean = false): string {
        seconds = Math.max(0, Math.floor(seconds));
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        if (h > 0 || alwaysShowHour) {
            return (
                CCMTimeUtils.padZero(h) +
                ":" +
                CCMTimeUtils.padZero(m) +
                ":" +
                CCMTimeUtils.padZero(s)
            );
        } else {
            return CCMTimeUtils.padZero(m) + ":" + CCMTimeUtils.padZero(s);
        }
    }

    /**
     * 格式化时间戳为日期字符串
     * @param timestamp 时间戳（毫秒）
     * @param showTime 是否显示时分秒
     * @returns yyyy-MM-dd [HH:mm:ss]
     */
    public static formatDate(timestamp: number, showTime: boolean = true): string {
        const date = new Date(timestamp);
        const y = date.getFullYear();
        const m = CCMTimeUtils.padZero(date.getMonth() + 1);
        const d = CCMTimeUtils.padZero(date.getDate());
        let res = `${y}-${m}-${d}`;

        if (showTime) {
            const hour = CCMTimeUtils.padZero(date.getHours());
            const min = CCMTimeUtils.padZero(date.getMinutes());
            const sec = CCMTimeUtils.padZero(date.getSeconds());
            res += ` ${hour}:${min}:${sec}`;
        }

        return res;
    }

    /**
     * 将一个"HH:mm:ss"字符串转为秒数
     * @param timeStr "HH:mm:ss" 格式
     * @returns 秒数
     */
    public static timeStrToSeconds(timeStr: string): number {
        const parts = timeStr.split(":").map(str => parseInt(str, 10));
        if (parts.length === 3) {
            return parts[0] * 3600 + parts[1] * 60 + (parts[2] || 0);
        } else if (parts.length === 2) {
            return parts[0] * 60 + (parts[1] || 0);
        } else if (parts.length === 1) {
            return parts[0];
        }
        return 0;
    }

    /**
     * 获取两个日期之间的天数差（只算日期部分）
     */
    public static daysBetween(t1: number, t2: number): number {
        const date1 = new Date(t1);
        const date2 = new Date(t2);
        date1.setHours(0, 0, 0, 0);
        date2.setHours(0, 0, 0, 0);
        const diff = Math.abs(date1.getTime() - date2.getTime());
        return Math.floor(diff / (24 * 3600 * 1000));
    }

    /**
     * 检查指定时间戳是否在今天
     */
    public static isToday(timestamp: number): boolean {
        const now = new Date();
        const date = new Date(timestamp);
        return (
            now.getFullYear() === date.getFullYear() &&
            now.getMonth() === date.getMonth() &&
            now.getDate() === date.getDate()
        );
    }

    /**
     * 检查两个时间戳是否为同一天
     */
    public static isSameDay(t1: number, t2: number): boolean {
        const date1 = new Date(t1);
        const date2 = new Date(t2);
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }

    /**
     * 零填充（个位数补0）
     */
    public static padZero(num: number): string {
        return num < 10 ? "0" + num : num.toString();
    }
}

