"use client";
import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = "info", duration = 3000) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, duration);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-5 right-5 z-[9999] space-y-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`alert ${
                            toast.type === "success"
                                ? "alert-success"
                                : toast.type === "error"
                                    ? "alert-error"
                                    : "alert-info"
                        } shadow-lg`}
                    >
                        <span>{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);