import { render, screen } from "@testing-library/react";

import ErrorPage from "../containers/ErrorPage";

describe("Error Page", () => {
    test("renders error message", () => {
        render(<ErrorPage />);

        const errorMessage = screen.getByText("Error Page");

        expect(errorMessage).toBeInTheDocument();
    });
});
