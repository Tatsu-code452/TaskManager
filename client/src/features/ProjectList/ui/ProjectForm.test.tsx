import { ProjectPayload } from "../../../api/tauri/projectApi";
import { ProjectStatus } from "../../../types/db/project";

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProjectForm as Component } from "./ProjectForm";

describe("Component: ProjectForm", () => {

  const form:ProjectPayload = {
  id: "1",
  name: "test",
  client: "client",
  status: ProjectStatus.Planned,
  start_date: "2026-01-01",
  end_date: "2026-01-01",
};
const mode = "create";
const onChange = vi.fn();
const onSubmit = vi.fn();
const onCancel = vi.fn();

  it("select[ステータス] の onChange で onChange が呼ばれる", () => {
    render(
      <Component
            form={ form }
            mode={ mode }
            onChange={ onChange }
            onSubmit={ onSubmit }
            onCancel={ onCancel }
      />
    );

      const el = screen.getAllByRole("combobox")[0];

    fireEvent.change(el, { target: { value: "test" } });

      expect(onChange).toHaveBeenCalled();
  });
  it("input[ID] の onChange で onChange が呼ばれる", () => {
    render(
      <Component
            form={ form }
            mode={ mode }
            onChange={ onChange }
            onSubmit={ onSubmit }
            onCancel={ onCancel }
      />
    );

      const el = screen.getAllByRole("textbox")[0];

    fireEvent.change(el, { target: { value: "test" } });

      expect(onChange).toHaveBeenCalled();
  });
  it("input[案件名] の onChange で onChange が呼ばれる", () => {
    render(
      <Component
            form={ form }
            mode={ mode }
            onChange={ onChange }
            onSubmit={ onSubmit }
            onCancel={ onCancel }
      />
    );

      const el = screen.getAllByRole("textbox")[1];

    fireEvent.change(el, { target: { value: "test" } });

      expect(onChange).toHaveBeenCalled();
  });
  it("input[顧客名] の onChange で onChange が呼ばれる", () => {
    render(
      <Component
            form={ form }
            mode={ mode }
            onChange={ onChange }
            onSubmit={ onSubmit }
            onCancel={ onCancel }
      />
    );

      const el = screen.getAllByRole("textbox")[2];

    fireEvent.change(el, { target: { value: "test" } });

      expect(onChange).toHaveBeenCalled();
  });
//   it("input[開始日] の onChange で onChange が呼ばれる", () => {
//     render(
//       <Component
//             form={ form }
//             mode={ mode }
//             onChange={ onChange }
//             onSubmit={ onSubmit }
//             onCancel={ onCancel }
//       />
//     );

//       const el = screen.getAllByRole("")[3];

//     fireEvent.change(el, { target: { value: "test" } });

//       expect(onChange).toHaveBeenCalled();
//   });
//   it("input[終了日] の onChange で onChange が呼ばれる", () => {
//     render(
//       <Component
//             form={ form }
//             mode={ mode }
//             onChange={ onChange }
//             onSubmit={ onSubmit }
//             onCancel={ onCancel }
//       />
//     );

//       const el = screen.getAllByRole("")[4];

//     fireEvent.change(el, { target: { value: "test" } });

//       expect(onChange).toHaveBeenCalled();
//   });

  it("ボタン 'キャンセル' を押すと onCancel が呼ばれる", () => {
    render(
      <Component
            form={ form }
            mode={ mode }
            onChange={ onChange }
            onSubmit={ onSubmit }
            onCancel={ onCancel }
      />
    );

    fireEvent.click(screen.getByText("キャンセル"));

      expect(onCancel).toHaveBeenCalled();
  });
//   it("ボタン '' を押すと onSubmit が呼ばれる", () => {
//     render(
//       <Component
//             form={ form }
//             mode={ mode }
//             onChange={ onChange }
//             onSubmit={ onSubmit }
//             onCancel={ onCancel }
//       />
//     );

//     fireEvent.click(screen.getByText(""));

//       expect(onSubmit).toHaveBeenCalled();
//   });

});
