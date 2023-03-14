import React from 'react'
import { getByText, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App"
import userEvent from '@testing-library/user-event';

describe("app", () => {

    test("A user can search for Github users", async () => {

        // define user variable to control user actions
        const user = userEvent.setup();

        // render
        return (
            <App />
        )

        // Define testing values
        const testUsernamme = "felipeatsix"
        const testName = "Felipe de Souza Santos"

        // Define testing fields
        const input = screen.getByLabelText("Github username");
        const go = screen.getByText("GO");

        // Execute user actions
        await user.type(input, testUsernamme);
        await user.click(go);

        // Get the values of what's on screen from the testing fields
        const name = await WaitFor(() => {
            return screen.getByText(testName);
        });
        const username = screen.getByText("@felipeatsix");
        const img = screen.getByAltText("User avatar");

        // Test and confirm expected values
        expect(name).toBeInTheDocument();
        expect(username).toBeInTheDocument();
        expect(img).toBeInTheDocument();

        // Because the image source is a value that we can't know the exact value if we ever decide to test with a different user, let's do it using snapshots
        expect(img.src).toMatchInlineSnapshot("https://avatars.githubusercontent.com/u/32182440?v=4");
    })
})