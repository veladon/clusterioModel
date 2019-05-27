"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("../../src/Model");
describe('constructor', () => {
    it('should construct Point(1,2)', () => {
        let point = new Model_1.Point(1, 2);
        expect(point.X).toBe(1);
        expect(point.Y).toBe(2);
        expect(point.X).toEqual(1);
    });
});
describe('fromString', () => {
    it('should construct (1,2)', () => {
        let point = Model_1.Point.FromString("(1,2)");
        expect(point.X).toBe(1);
        expect(point.Y).toBe(2);
    });
    it('should construct (-1,2)', () => {
        let point = Model_1.Point.FromString("(-1,2)");
        expect(point.X).toBe(-1);
        expect(point.Y).toBe(2);
    });
    it('should construct (1,-2)', () => {
        let point = Model_1.Point.FromString("(1,-2)");
        expect(point.X).toBe(1);
        expect(point.Y).toBe(-2);
    });
    it('should construct (-1,-2)', () => {
        let point = Model_1.Point.FromString("(-1,-2)");
        expect(point.X).toBe(-1);
        expect(point.Y).toBe(-2);
    });
    it('should fail constructing (1)', () => {
        expect(() => { Model_1.Point.FromString("(1)"); }).toThrowError("vectorAsString is an invalid format. Cannot find ','. fullString: (1)");
    });
    it('should fail constructing (1,,2)', () => {
        expect(() => { Model_1.Point.FromString("(1,,2)"); }).toThrowError("vectorAsString is an invalid format. Expecting string in format (x,y). fullString: (1,,2)");
    });
    it('should fail constructing (,2)', () => {
        expect(() => { Model_1.Point.FromString("(,2)"); }).toThrowError("x is NaN. Will not construct Point.");
    });
});
describe('equals', () => {
    it('should return true for (1,2) and (1,2)', () => {
        let a = new Model_1.Point(1, 2);
        let b = new Model_1.Point(1, 2);
        expect(a.equals(b)).toBe(true);
    });
    it('should return false for (1,2) and (1,3)', () => {
        let a = new Model_1.Point(1, 2);
        let b = new Model_1.Point(1, 3);
        expect(a.equals(b)).toBe(false);
    });
});
//# sourceMappingURL=Point.spec.js.map