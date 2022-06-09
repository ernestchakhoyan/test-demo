import axios from "axios";
import { render, screen, fireEvent } from "../../utils/test-utils";
import { Repo } from "./index";

const setup = () => render(<Repo />);


jest.mock("axios");

const MOCKED_REPOS = {
    data: [
        {
            name: "test",
            url: "url-test",
            allow_forking: true,
            archive_url: "archive-url-test",
            archived: false,
            assignees_url: "assignees_test",
            blobs_url: "blobs-url-test",
            branches_url: "branches-url-test",
            clone_url: "clone-url-test",
        },
        {
            name: "test-2",
            url: "url-test-2",
            allow_forking: true,
            archive_url: "archive-url-test-2",
            archived: false,
            assignees_url: "assignees_test-2",
            blobs_url: "blobs-url-test-2",
            branches_url: "branches-url-test-2",
            clone_url: "clone-url-test-2",
        }
    ]
};

describe("Repo component", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render component with initial data", () => {
        setup();

        expect(screen.getByText(/Get user repos/i)).toBeInTheDocument();
    });


    it("should return 'Repo is not found' when Invalid username was applied or user has no repo", async () => {
        axios.get.mockRejectedValue({response: {status: 404}});

        setup();
        const input = screen.getByLabelText(/user-input/i);
        const button = screen.getByText(/submit/i);
        fireEvent.change(input, { target: { value: "___" } });
        fireEvent.click(button);

        await screen.findByText(/Repos are not found/i)
    });

    it("should render repos data after clicking submit button with valid username", async () => {
        axios.get.mockResolvedValue(MOCKED_REPOS);

        setup();

        const input = screen.getByLabelText(/user-input/i);
        const button = screen.getByText(/submit/i);
        fireEvent.change(input, { target: { value: "test-user" } });
        fireEvent.click(button);

        const repos = await screen.findAllByLabelText(/repo-item/i);


        expect(repos.length).toBe(MOCKED_REPOS.data.length);
    });

});
