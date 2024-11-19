import { Extensions } from "./extensions";

describe('Tests for Extensions', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('compareObj', () => {
    it('should return true, if objects are identical', () => {
        const objA = { a: 1, b: 2 };
        const objB = { a: 1, b: 2 };
        expect(Extensions.compareObj(objA, objB)).toBe(true);
    });

    it('should return true, if objects are references', () => {
        const objA = { a: 1, b: 2 };
        const objB = objA;
        expect(Extensions.compareObj(objA, objB)).toBe(true);
    });

    it('should return true, if objects have same keys but different order', () => {
        const objA = { a: 1, b: 2 };
        const objB = { b: 2, a: 1 };
        expect(Extensions.compareObj(objA, objB)).toBe(true);
    });

    it('should return false, if objects have different values', () => {
        const objA = { a: 1, b: 2 };
        const objB = { a: 1, b: 3 };
        expect(Extensions.compareObj(objA, objB)).toBe(false);
    });

    it('should return false, if objects have differnet keys', () => {
        const objA = { a: 1, b: 2 };
        const objB = { a: 1, c: 2 };
        expect(Extensions.compareObj(objA, objB)).toBe(false);
    });

    it('should return true, if objects are nested but identical', () => {
        const objA = { a: { b: { c: 3 } } };
        const objB = { a: { b: { c: 3 } } };
        expect(Extensions.compareObj(objA, objB)).toBe(true);
    });

    it('should return false, if objects are nested and not identical', () => {
        const objA = { a: { b: { c: 3 } } };
        const objB = { a: { b: { c: 4 } } };
        expect(Extensions.compareObj(objA, objB)).toBe(false);
    });

    it('should return true, if both objects are empty', () => {
        const objA = {};
        const objB = {};
        expect(Extensions.compareObj(objA, objB)).toBe(true);
    });

    it('should return false, if one object is null', () => {
        const objA = null;
        const objB = { a: 1 };
        expect(Extensions.compareObj(objA, objB)).toBe(false);
    });

    it('should return true, if both objects are null', () => {
        const objA = null;
        const objB = null;
        expect(Extensions.compareObj(objA, objB)).toBe(true);
    });

    it('should return true, if it contains same arrays', () => {
        const objA = { arr: [1, 2, 3] };
        const objB = { arr: [1, 2, 3] };
        expect(Extensions.compareObj(objA, objB)).toBe(true);
    });

    it('should return false, if it contains not equal arrays', () => {
        const objA = { arr: [1, 2, 3] };
        const objB = { arr: [3, 2, 1] };
        expect(Extensions.compareObj(objA, objB)).toBe(false);
    });

    it('should return true, if objects contain functions which are the same', () => {
        const func = () => 42;
        const objA = { a: func };
        const objB = { a: func };
        expect(Extensions.compareObj(objA, objB)).toBe(true);
    });

    it('should return false, if objects contain function which are not the same', () => {
        const objA = { a: () => 42 };
        const objB = { a: () => 42 };
        expect(Extensions.compareObj(objA, objB)).toBe(false);
    });

  });

});
