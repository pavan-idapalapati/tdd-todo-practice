import React, { useContext } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Todo } from "./Todo";
import {
  TodoListContext,
  TodoListProviderValue,
} from "../../contexts/useTodoContext";

const renderComponent = () => {
  render(<Todo />);
};

describe("Todo", () => {
  it("renders header", () => {
    renderComponent();
    const linkElement = screen.getByText("Todo");
    expect(linkElement).toBeInTheDocument();
  });

  it("renders input", () => {
    renderComponent();
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("renders todo footer", () => {
    renderComponent();
    const footerElements = screen.getAllByRole("radio");
    expect(footerElements.length === 3).toBeTruthy();
  });

  it("should update the context todo list, when enter is pressed with some content in it", () => {
    renderComponent();
    const inputElement: HTMLInputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "test" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });

    const todoListItems = screen.getAllByTestId("todo-list-item");
    const listItem = todoListItems[0];

    expect(listItem.textContent).toEqual("test");
  });
});