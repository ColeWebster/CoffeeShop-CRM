import React from "react";
import { useNavigate } from "react-router";

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: "",
    });
    const navigate = useNavigate();
}