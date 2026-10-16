"use client";
import { useState } from "react";
import Image from "next/image";
import useUsersStore from "../actions/user-store";

export const CarouseleComponent = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

      const imagesUrls = useUsersStore((state) => state.imageUrls);
          
    // const imagesCollections = [
    //     "https://randomimageurl.com/assets/images/local/20260103_0518_Bold%20Abstract%20Composition_simple_compose_01ke204yvyf6pbx3ksw2cjcgkw_compressed_q80.jpeg",
    //     "https://images.unsplash.com/photo-1789677802125-ca4e0f676e05?ixid=M3w4MjcwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTE4MjM5OTh8&ixlib=rb-4.1.0&fit=max&q=80&auto=format",
    //     "https://images.unsplash.com/photo-1791149634999-4ea6eb1c4c5a?ixid=M3w4MjcwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTE4MjM5OTh8&ixlib=rb-4.1.0&fit=max&q=80&auto=format",
    // ];
    const previouseImage = () => {
        setCurrentImageIndex(
            currentImageIndex === 0
                ? imagesUrls.length - 1
                : currentImageIndex - 1,
        );
    };
    const nextImage = () => {
        if (currentImageIndex === imagesUrls.length - 1) {
            setCurrentImageIndex(0);
        } else setCurrentImageIndex(currentImageIndex + 1);
    };
    return (
        <div className="flex m-auto pl-2">
            <button
                onClick={previouseImage}
                className={`bg-primary p-2 rounded text-3xl`}
            >
               &#8592;
            </button>
         
            <Image
                src={imagesUrls[currentImageIndex]}
                alt="Landscape picture"
                width={400}
                height={400}
                className={`mx-2`}
            />

            <button onClick={nextImage} className={`bg-primary text-3xl`}>
               &#8594;
            </button>
        </div>
    );
};
