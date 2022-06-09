import axios from "axios";
import { getGHRepos } from "./api";
import { configureTestStore } from "../../utils/test-utils";
import reducer, { getRepos } from "../../store/repo/slices";


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

describe("> Repo api / store unit tests", () => {
    it("should get user repos and return correct data", async () => {
        axios.get.mockResolvedValue(MOCKED_REPOS);

        const data = await getGHRepos("test");

        expect(data).toEqual([
            { name: 'test', url: 'url-test' },
            { name: 'test-2', url: 'url-test-2' }
        ]);
    });


    it("should get user repos and store data in the app main state", async () => {
        axios.get.mockResolvedValue(MOCKED_REPOS);
        const store = configureTestStore({
            repo: reducer
        });

        await store.dispatch(getRepos("test"));
        const state = store.getState();

        expect(state.repo.items).toEqual([
            { name: 'test', url: 'url-test' },
            { name: 'test-2', url: 'url-test-2' }
        ])
    })
});
