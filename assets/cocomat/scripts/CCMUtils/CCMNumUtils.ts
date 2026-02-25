/**
 * 游戏开发通用的数字处理工具类
 */
export default class CCMNumUtils {

    /**
     * 将数字限制在指定范围内
     * @param value 原始值
     * @param min 最小值
     * @param max 最大值
     * @returns 限制后的值
     */
    public static clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, value));
    }

    /**
     * 线性插值
     * @param start 起始值
     * @param end 结束值
     * @param t 插值因子 (0~1)
     * @returns 插值结果
     */
    public static lerp(start: number, end: number, t: number): number {
        return start + (end - start) * CCMNumUtils.clamp(t, 0, 1);
    }

    /**
     * 反向线性插值，计算 value 在 start 到 end 之间的比例
     * @param start 起始值
     * @param end 结束值
     * @param value 当前值
     * @returns 比例值 (0~1)
     */
    public static inverseLerp(start: number, end: number, value: number): number {
        if (start === end) return 0;
        return CCMNumUtils.clamp((value - start) / (end - start), 0, 1);
    }

    /**
     * 生成指定范围内的随机整数 [min, max]
     * @param min 最小值（包含）
     * @param max 最大值（包含）
     */
    public static randomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * 生成指定范围内的随机浮点数 [min, max)
     * @param min 最小值（包含）
     * @param max 最大值（不包含）
     */
    public static randomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    /**
     * 根据权重随机选择索引
     * @param weights 权重数组
     * @returns 被选中的索引
     */
    public static randomByWeight(weights: number[]): number {
        const total = weights.reduce((sum, w) => sum + w, 0);
        if (total <= 0) return 0;

        let rand = Math.random() * total;
        for (let i = 0; i < weights.length; i++) {
            rand -= weights[i];
            if (rand <= 0) return i;
        }
        return weights.length - 1;
    }

    /**
     * 格式化数字，添加千位分隔符
     * @param num 数字
     * @param separator 分隔符，默认逗号
     * @returns 格式化后的字符串
     */
    public static formatWithComma(num: number, separator: string = ","): string {
        const parts = num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        return parts.join(".");
    }

    /**
     * 大数字简写（如 1K, 1.5M, 2B）
     * @param num 数字
     * @param precision 小数精度，默认1位
     * @returns 简写字符串
     */
    public static formatShort(num: number, precision: number = 1): string {
        const absNum = Math.abs(num);
        const sign = num < 0 ? "-" : "";

        if (absNum >= 1e12) {
            return sign + CCMNumUtils.toFixed(absNum / 1e12, precision) + "T";
        } else if (absNum >= 1e9) {
            return sign + CCMNumUtils.toFixed(absNum / 1e9, precision) + "B";
        } else if (absNum >= 1e6) {
            return sign + CCMNumUtils.toFixed(absNum / 1e6, precision) + "M";
        } else if (absNum >= 1e3) {
            return sign + CCMNumUtils.toFixed(absNum / 1e3, precision) + "K";
        }
        return num.toString();
    }

    /**
     * 中文大数字简写（如 1万, 1.5亿）
     * @param num 数字
     * @param precision 小数精度，默认1位
     * @returns 简写字符串
     */
    public static formatShortCN(num: number, precision: number = 1): string {
        const absNum = Math.abs(num);
        const sign = num < 0 ? "-" : "";

        if (absNum >= 1e12) {
            return sign + CCMNumUtils.toFixed(absNum / 1e12, precision) + "万亿";
        } else if (absNum >= 1e8) {
            return sign + CCMNumUtils.toFixed(absNum / 1e8, precision) + "亿";
        } else if (absNum >= 1e4) {
            return sign + CCMNumUtils.toFixed(absNum / 1e4, precision) + "万";
        }
        return num.toString();
    }

    /**
     * 保留指定位数的小数（四舍五入），避免浮点数精度问题
     * @param num 数字
     * @param digits 小数位数
     * @returns 处理后的数字
     */
    public static toFixed(num: number, digits: number = 2): number {
        const factor = Math.pow(10, digits);
        return Math.round(num * factor) / factor;
    }

    /**
     * 向下保留指定位数小数
     * @param num 数字
     * @param digits 小数位数
     */
    public static floorTo(num: number, digits: number = 2): number {
        const factor = Math.pow(10, digits);
        return Math.floor(num * factor) / factor;
    }

    /**
     * 向上保留指定位数小数
     * @param num 数字
     * @param digits 小数位数
     */
    public static ceilTo(num: number, digits: number = 2): number {
        const factor = Math.pow(10, digits);
        return Math.ceil(num * factor) / factor;
    }

    /**
     * 计算百分比
     * @param current 当前值
     * @param total 总值
     * @param digits 小数位数，默认2位
     * @returns 百分比数值 (0~100)
     */
    public static percent(current: number, total: number, digits: number = 2): number {
        if (total === 0) return 0;
        return CCMNumUtils.toFixed((current / total) * 100, digits);
    }

    /**
     * 计算百分比并返回字符串（带%符号）
     * @param current 当前值
     * @param total 总值
     * @param digits 小数位数，默认0位
     */
    public static percentStr(current: number, total: number, digits: number = 0): string {
        return CCMNumUtils.percent(current, total, digits) + "%";
    }

    /**
     * 判断数字是否在指定范围内 [min, max]
     * @param value 检查的值
     * @param min 最小值
     * @param max 最大值
     */
    public static inRange(value: number, min: number, max: number): boolean {
        return value >= min && value <= max;
    }

    /**
     * 两个浮点数是否近似相等
     * @param a 数字a
     * @param b 数字b
     * @param epsilon 误差范围，默认 1e-6
     */
    public static approximately(a: number, b: number, epsilon: number = 1e-6): boolean {
        return Math.abs(a - b) < epsilon;
    }

    /**
     * 获取数字的符号 (-1, 0, 1)
     * @param num 数字
     */
    public static sign(num: number): number {
        if (num > 0) return 1;
        if (num < 0) return -1;
        return 0;
    }

    /**
     * 判断是否为有效数字（非NaN且有限）
     * @param num 数字
     */
    public static isValid(num: number): boolean {
        return typeof num === "number" && !isNaN(num) && isFinite(num);
    }

    /**
     * 安全除法，避免除以零
     * @param a 被除数
     * @param b 除数
     * @param defaultValue 除数为0时的默认值
     */
    public static safeDivide(a: number, b: number, defaultValue: number = 0): number {
        return b === 0 ? defaultValue : a / b;
    }

    /**
     * 数字补零（前导零）
     * @param num 数字
     * @param length 目标长度
     */
    public static padZero(num: number, length: number = 2): string {
        let str = Math.floor(num).toString();
        while (str.length < length) {
            str = "0" + str;
        }
        return str;
    }

    /**
     * 将罗马数字转为阿拉伯数字
     * @param roman 罗马数字字符串
     */
    public static romanToInt(roman: string): number {
        const map: { [key: string]: number } = {
            I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
        };
        let result = 0;
        const s = roman.toUpperCase();
        for (let i = 0; i < s.length; i++) {
            const current = map[s[i]] || 0;
            const next = map[s[i + 1]] || 0;
            result += current < next ? -current : current;
        }
        return result;
    }

    /**
     * 将阿拉伯数字转为罗马数字（1~3999）
     * @param num 阿拉伯数字
     */
    public static intToRoman(num: number): string {
        if (num < 1 || num > 3999) return "";
        const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
        let result = "";
        for (let i = 0; i < values.length; i++) {
            while (num >= values[i]) {
                result += symbols[i];
                num -= values[i];
            }
        }
        return result;
    }
}

