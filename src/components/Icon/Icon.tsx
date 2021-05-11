import React, { useState, useEffect, useRef, ComponentType, SVGProps } from "react";
import { popFromObject } from "$utils/common";
import { IconPropsType } from "$types/common";

export default function Icon(props: IconPropsType) {
    const { fileName, className: _className } = props;

    const iconRef = useRef<ComponentType<SVGProps<SVGSVGElement>>>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        (async () => {
            try {
                iconRef.current = (await import(`$assets/images/${fileName}.svg`)).default;
            } catch (err) {
                throw err;
            } finally {
                setLoading(false);
            }
        })();
    }, [fileName]);

    let ImportedIcon = null;
    if (!loading && iconRef.current) {
        const Component = iconRef.current;
        ImportedIcon = <Component className="Icon" />;
    }

    let className = "Icon";
    if (className !== undefined) {
        className = `${className} ${_className}`
    }

    return (
        <div className={className}>
            {ImportedIcon}
        </div>
    );
}
