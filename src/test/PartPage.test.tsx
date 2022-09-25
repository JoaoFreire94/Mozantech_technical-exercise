import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";

import PartPage from "../containers/PartPage";

const fakePartsResponse = [
    {
        name: "Mouse 1",
        price: "112.00$",
        type: "Mouse",
    },
];
const server = setupServer(
    rest.get("http://localhost:8081/store/parts", (req, res, ctx) => {
        return res(ctx.json(fakePartsResponse));
    })
);

beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
});
afterAll(() => server.close());

describe("Part Page", () => {
    test("shows a loading state", async () => {
        render(
            <MemoryRouter initialEntries={["/parts/mouse%201"]}>
                <PartPage />
            </MemoryRouter>
        );

        expect(screen.getByText("Loading...")).toBeVisible();
    });

    test("displays part name, price and type", async () => {
        render(
            <MemoryRouter initialEntries={["/parts/mouse%201"]}>
                <PartPage />
            </MemoryRouter>
        );

        expect(await screen.findByText("Mouse 1")).toBeVisible();
        expect(await screen.findByText("Mouse")).toBeVisible();
        expect(await screen.findByText("112.00$")).toBeVisible();
    });
});
