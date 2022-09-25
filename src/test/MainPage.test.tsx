import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";

import MainPage from "../containers/MainPage";

const fakePartsResponse = [
    {
        name: "Mouse 1",
        price: "112.00$",
        type: "Mouse",
    },
    {
        name: "Mouse 2",
        price: "35.99$",
        type: "Mouse",
    },
    {
        name: "Keyboard 1",
        price: "15.00$",
        type: "Keyboard",
    },
];
const filteredFakePartsResponse = [
    {
        name: "Keyboard 1",
        price: "15.00$",
        type: "Keyboard",
    },
];

const fakerPartTypesResponse = ["Mouse", "Mousepad", "Keyboard", "Monitor"];

const server = setupServer(
    rest.get("http://localhost:8081/store/parts", (req, res, ctx) => {
        const query = req.url.searchParams.get("query");
        return res(
            ctx.json(query ? filteredFakePartsResponse : fakePartsResponse)
        );
    }),
    rest.get("http://localhost:8081/store/part-types", (req, res, ctx) => {
        return res(ctx.json(fakerPartTypesResponse));
    })
);

beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
});
afterAll(() => server.close());

describe("Main Page", () => {
    test("shows a loading state", async () => {
        render(
            <MemoryRouter initialEntries={["/parts"]}>
                <MainPage />
            </MemoryRouter>
        );

        expect(screen.getByText("Loading...")).toBeVisible();
    });

    test("displays unfiltered list of parts", async () => {
        render(
            <MemoryRouter initialEntries={["/parts"]}>
                <MainPage />
            </MemoryRouter>
        );

        expect(await screen.findByText("Mouse 1")).toBeVisible();
        expect(await screen.findByText("112.00$")).toBeVisible();

        expect(await screen.findByText("Mouse 2")).toBeVisible();
        expect(await screen.findByText("35.99$")).toBeVisible();

        expect(await screen.findByText("Keyboard 1")).toBeVisible();
        expect(await screen.findByText("15.00$")).toBeVisible();
    });

    test("displays filtered parts", async () => {
        const utils = render(
            <MemoryRouter initialEntries={["/parts"]}>
                <MainPage />
            </MemoryRouter>
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const input: any = utils.getByPlaceholderText("Search...");

        // input Keyboard 1 to simulate fake typing
        fireEvent.change(input, { target: { value: "Keyboard 1" } });
        expect(input.value).toBe("Keyboard 1");

        const mouse1 = await screen.findByText("Mouse 1");
        expect(mouse1).toBeVisible();
        expect(await screen.findByText("112.00$")).toBeVisible();

        const mouse2 = await screen.findByText("Mouse 2");
        expect(mouse2).toBeVisible();
        expect(await screen.findByText("35.99$")).toBeVisible();

        await waitFor(() => {
            expect(mouse1).not.toBeInTheDocument();
            expect(mouse2).not.toBeInTheDocument();
        });

        expect(await screen.findByText("Keyboard 1")).toBeVisible();
        expect(await screen.findByText("15.00$")).toBeVisible();
    });
});
