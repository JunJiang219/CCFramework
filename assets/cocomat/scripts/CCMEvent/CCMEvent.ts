/**
 * 框架通用事件定义
 */

// 事件优先级（数值越大，优先级越高）
export enum CCMEventPriority {
    P0,
    P1,
    P2,
    P3,
    P4,
    P5,
    P6,
    P7,
    P8,
    P9,
}

// 框架通用事件
export enum CCMEvent {
    TEST = "test",
    ORIENTATION_CHANGE = "orientationChange",
    RESOLUTION_CHANGE = "resolutionChange",
}