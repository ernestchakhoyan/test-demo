import { render, screen } from "../../utils/test-utils";
import { Layout } from "./index";

const setup = (props) => render(<Layout {...props} />);

jest.mock("react-router-dom", () => {
   const originalModule = jest.requireActual("react-router-dom");
    return {
        ...originalModule,
        Link: ({children}) => <div>{children}</div>
    };
});

describe("> Layout container unit tests", () => {
    it("should render component with initial data", () => {
        const initialData = {
            children: <div>layout test</div>
        }
        setup(initialData);

        expect(screen.getByText(/layout test/i)).toBeInTheDocument();

    });
});
