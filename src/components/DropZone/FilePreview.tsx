import { FC, useEffect, useState } from "react";

const FilePreview: FC<{ file: File, width?: number, height?: number }> = ({
    file, width = 32, height = 32
}) => {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        // Free memory when component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    if (!preview) {
        return null;
    }

    const size = {
        width: width ? `${width}px` : '32px',
        height: height ? `${height}px` : '32px'
    }

    return (
        <div className="">
            {file.type.startsWith('image/') ? (
                <img
                    src={preview}
                    alt="File preview"
                    className={`object-cover rounded-md`}
                    style={size}
                />
            ) : (
                <div className={`flex items-center justify-center bg-gray-100 rounded-md`} style={size}>
                    <span className="text-sm font-semibold text-gray-500">{file.name.split('.').pop()?.toUpperCase()}</span>
                </div>
            )}
        </div>
    );
};

export default FilePreview;
