import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useSessionCheck() {
    const navigate = useNavigate();
    useEffect(() => {
        fetch("/session", { credentials: "include" })
            .then((res) => {
                if (res.status === 401) {
                    navigate("/login");
                }
            })
            .catch(() => {
                navigate("/login");
            });
    }, [navigate]);
}
