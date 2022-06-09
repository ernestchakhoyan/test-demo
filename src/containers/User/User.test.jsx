import {
    render,
    screen,
    fireEvent,
} from "../../utils/test-utils";
import { User } from "./index";
import axios from "axios";

const setup = () => render(<User />);

jest.mock("axios");

const MOCKED_USER = {
    data: {
        login: "login-test",
        avatar_url: "avatar-test",
        location: "location-test",
        email: "email-test",
        name: "name-test",
        company: "company-test",
    }
};

describe("> Github User profile component", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render component with initial data", () => {
        setup();
        expect(screen.getByText(/get github user/i)).toBeInTheDocument();
        expect(screen.queryByText(/full name/i)).not.toBeInTheDocument();
    });

    it("should return 'User not found' when Invalid username was applied", async () => {
        setup();
        axios.get.mockRejectedValue({response: {status: 404}});
        const input = screen.getByLabelText(/user-input/i);
        const button = screen.getByText(/submit/i);

        fireEvent.change(input, { target: { value: "___" } });
        fireEvent.click(button);

        await screen.findByText(/user not found/i)
    });

    it("should render user data after clicking submit button with valid username", async () => {
        setup();
        axios.get.mockResolvedValue(MOCKED_USER);
        const input = screen.getByLabelText(/user-input/i);
        const button = screen.getByText(/submit/i);

        fireEvent.change(input, { target: { value: "test-user" } });
        fireEvent.click(button);

        await screen.findByText(/login-test/i);
    });

});
