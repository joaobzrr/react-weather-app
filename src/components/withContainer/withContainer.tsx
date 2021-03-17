import React from "react";

export default function withLoading<P>(Component: React.ComponentType<P>) {
    const containerClassName = `${Component.displayName}_container`;
    return (props: P) => {
        return (
            <div className={containerClassName}>
                <Component {...props}/>;
            </div>
        );
    }
}
