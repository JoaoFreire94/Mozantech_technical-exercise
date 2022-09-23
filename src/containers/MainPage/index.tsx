import React, { useEffect, useState } from "react";

import fetchParts from "../../services/parts";
import PartsInterface from "../../services/parts/interface";

function MainPage(): JSX.Element {
    const [parts, setParts] = useState<Array<PartsInterface>>();
    useEffect(() => {
        fetchParts()
            .then((response) => response.json())
            .then((partsFetched) => {
                const tempArray: Array<PartsInterface> = [];
                partsFetched.forEach(
                    (element: {
                        name: string;
                        price: string;
                        type: string;
                    }) => {
                        tempArray.push({
                            name: element.name,
                            price: element.price,
                            type: element.type,
                        });
                        setParts(tempArray);
                    }
                );
            })
            // tratar este erro
            .catch((err) => console.log("error : ", err));
    }, []);
    if (parts !== undefined) {
        console.log("estou a ler isto: ", parts[1].price);
    }
    return <h1>Main Page</h1>;
}

export default MainPage;
