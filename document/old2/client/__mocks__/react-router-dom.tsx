// __mocks__/react-router-dom.ts
import React from "react";

// モック関数
export const useNavigate = jest.fn();
export const useLocation = jest.fn();

// JSX を返すコンポーネントのモック
export const MemoryRouter = ({ children }: { children: React.ReactNode }) => (
    <div>{children} </div>
);

// 必要に応じて追加
export const Link = ({
    to,
    children,
}: {
    to: string;
    children: React.ReactNode;
}) => <a href={to}> {children} </a>;
