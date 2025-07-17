import React, { useEffect, useState } from "react";
import { formatCurrentDatetime } from "../utils/formatDatetime";

/**
 * props型定義
 */
type Props = {
    title: string;
};

/**
 * アプリ共通のヘッダーコンポーネント
 * @param props - タイトル文字列
 * @returns ヘッダーコンポーネント
 */
const Header: React.FC<Props> = ({ title }) => {
    const [currentTime, setCurrentTime] = useState(formatCurrentDatetime());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(formatCurrentDatetime());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
            <div className="container-fluid justify-content-between">
                <span id="screen-title" className="navbar-brand fw-bold">
                    {title}
                </span>
                <span className="text-white">{currentTime}</span>
            </div>
        </header>
    );
};

export default Header;
