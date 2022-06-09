import {
    render,
    fireEvent,
    screen
} from "../../utils/test-utils";
import { Counter } from "./index";

const setup = () => render(<Counter />);

describe("> Counter test component", () => {

    it("should render component with initial data", () => {
        setup();
        expect(screen.getByText(/counter/i)).toBeInTheDocument();
    });

    it("should increment by 1 on Increment button click", () => {
        setup();

        const button = screen.getByText(/increment/i);
        fireEvent.click(button);
        expect(screen.getByText(/1/i)).toBeInTheDocument();
    });

    it("should descrement by 1 on Decrement button click", () => {
        setup();

        const button = screen.getByText(/decrement/i);
        fireEvent.click(button);
        expect(screen.getByText(/0/i)).toBeInTheDocument();
    });
});
