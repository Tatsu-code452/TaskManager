import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../../component/Header";

describe("Header コンポーネント", () => {
    test("タイトルが表示されること", () => {
        render(<Header title="テストタイトル" />);
        expect(screen.getByText("テストタイトル")).toBeInTheDocument();
    });

    test("現在時刻が表示されること", () => {
        render(<Header title="時計テスト" />);
        const timeText = screen.getByText(
            /\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}/
        );
        expect(timeText).toBeInTheDocument();
    });
});
