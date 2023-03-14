import React from 'react'
import { getByText, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App"
import userEvent from '@testing-library/user-event';

describe("app", () => {
    test("A user can search for Github users", async () => {
        const user = userEvent.setup();
        render(
            <App />
        )
        //screen.debug()
        const input = screen.getByLabelText("Github username");
        await user.type(input, "felipeatsix");
        await user.click(screen.getByText("GO"));
        const name = await waitFor(() => {
            return screen.getByText("Felipe de Souza Santos")
        });
        const username = screen.getByText("@felipeatsix");
        const img = screen.getByAltText("User avatar");
        console.log(img.src);

        expect(name).toBeInTheDocument();
        expect(username).toBeInTheDocument();
        expect(img).toBeInTheDocument();
        // Snapshot concept
        expect(img.src).toMatchInlineSnapshot('"https://avatars.githubusercontent.com/u/32182440?v=4"');
    })
})