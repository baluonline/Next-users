'use client';

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";

export default function UploadFile() {
    const fileInput = useRef<HTMLInputElement>(null);

    const submitFile = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const selectedFile = fileInput.current?.files?.[0];

        if (selectedFile) {
            alert(`Selected file - ${selectedFile.name}`);
        } else {
            alert("No file selected!");
        }
         fileInput.current.value = null
    };
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0); // You don't know real height yet

    useLayoutEffect(() => {
        const { height } = fileInput.current?.getBoundingClientRect();
        setTooltipHeight(height); // Re-render now that you know the real height
        console.log('height ', height)
    }, []);
    return (
        <form onSubmit={submitFile}>
            <label>
                Upload file:
                <input
                    className="mx-2 border border-gray-300 p-2"
                    type="file"
                    ref={fileInput}
                />
            </label>
            <button type="submit" className="bg-primary">Upload</button>
        </form>
    );
}