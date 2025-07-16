"use client";

export default function NotebookCard({ name, description }) {
    return (
        <div className="card bg-base-100 shadow-xl border border-gray-200">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className="text-gray-500">{description}</p>
            </div>
        </div>
    );
}