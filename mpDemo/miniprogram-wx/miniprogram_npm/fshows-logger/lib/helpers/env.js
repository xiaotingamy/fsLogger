"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inMy = exports.inWx = exports.inBrowser = void 0;
exports.inBrowser = typeof window !== 'undefined';
exports.inWx = typeof wx !== 'undefined' && !!wx.getSystemInfoSync();
exports.inMy = typeof my !== 'undefined' && !!my.getSystemInfoSync();
//# sourceMappingURL=env.js.map