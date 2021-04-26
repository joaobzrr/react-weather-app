import React, { useState, useEffect, useRef, ComponentType, SVGProps } from "react";

type PropsType = SVGProps<SVGSVGElement> & {
    fileName: string;
}

export default function Icon(props: PropsType) {
    const { fileName } = props;

    const iconRef = useRef<ComponentType<SVGProps<SVGSVGElement>>>();
    const [loading, setLoading] = useState(false)

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

    if (!loading && iconRef.current) {
        const { current: ImportedIcon } = iconRef;
        return <ImportedIcon className="Icon" />
    }

    return null
}
