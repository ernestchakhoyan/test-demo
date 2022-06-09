import { randomBetween } from "./index";

const randomSpy = jest.spyOn(Math, "random");

describe.skip("randomBetween", () => {
    beforeEach(() => {
        randomSpy.mockReturnValue(0.4);
    });

    it("should called with min=3 max=5 return 5", () => {
        expect(randomBetween(3, 5)).toBe(4);
    });
});
