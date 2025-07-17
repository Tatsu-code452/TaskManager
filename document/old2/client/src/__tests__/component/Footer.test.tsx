import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "../../component/Footer";
import { MemoryRouter } from "react-router-dom";

describe("Footer コンポーネント", () => {
  const menuLinks = [
    { to: "/menu", label: "メニュー" },
    { to: "/task", label: "タスク" },
    { to: "/effort_list", label: "工数予実" },
    { to: "/gantt", label: "ガント" },
    { to: "/alarm_history", label: "アラーム" },
    { to: "/master", label: "マスタ" },
  ];

  it("すべてのボタンが表示される", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    menuLinks.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("現在のパスがアクティブになっていること", () => {
    render(
      <MemoryRouter initialEntries={["/gantt"]}>
        <Footer />
      </MemoryRouter>
    );

    const active = screen.getByText("ガント");
    expect(active.className).toContain("btn-warning");
  });

  it("非アクティブなボタンをクリックすると navigate が呼ばれる", () => {
    const navigateFn = jest.fn();

    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const target = screen.getByText("タスク");
    fireEvent.click(target);

    expect(navigateFn).toHaveBeenCalledWith("/task", { replace: true });
  });
});