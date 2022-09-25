import React, { useEffect, useState } from "react";

import fetchPartTypes from "../../services/partTypes";

function PartPage(): JSX.Element {
    const [partsType, setPartsType] = useState<Array<string>>();
    useEffect(() => {
        fetchPartTypes()
            .then((response) => response.json())
            .then((partsTypeFetched) => {
                const tempArray: Array<string> = [];
                partsTypeFetched.forEach((element: string) => {
                    tempArray.push(element);
                });
                setPartsType(tempArray);
            })
            // tratar este erro
            .catch((err) => console.log("error : ", err));
    }, []);
    if (partsType !== undefined) {
        // loading spiner
    }
    return <h1>Parts Page</h1>;
}

export default PartPage;