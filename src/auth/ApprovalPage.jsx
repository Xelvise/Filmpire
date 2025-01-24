/* eslint-disable no-console */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Approved() {
    const navigate = useNavigate();

    useEffect(() => {
        const unapprovedToken = localStorage.getItem("unapproved_token");
        if (!unapprovedToken) {
            navigate("/");
            return;
        }
        // grab the query params from current URL and convert to key-value pairs
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("request_token");
        const approved = urlParams.get("approved");

        if (token === unapprovedToken && approved === "true") {
            localStorage.setItem("approved_token", token);
            localStorage.removeItem("unapproved_token");
            console.log("Token approved");
            navigate(-1);
        } else if (token === unapprovedToken && approved === "false") {
            console.log("Token denied");
            navigate("/");
        } else {
            console.log("Token error");
            navigate("/");
        }
    }, [navigate]);

    return <div>Redirecting...</div>;
}
