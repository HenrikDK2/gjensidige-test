import { render, screen } from "@testing-library/react";
import { App } from "./App";

test("Renders the page", () => {
  render(<App />);
  expect(screen.getByRole("heading")).toBeVisible();
  expect(screen.getByRole("button")).toBeVisible();
});
