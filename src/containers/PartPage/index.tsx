import { Center, Heading, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import fetchParts from "../../services/parts";
import { IPart } from "./interface";

function PartPage(): JSX.Element | null {
    const { partName } = useParams();
    const [part, setPart] = useState<Array<IPart>>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchParts(undefined, partName)
            .then((res) => res.json())
            .then((partFetched) => setPart(partFetched))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [partName]);
    console.log(part);
    if (loading) {
        return (
            <Center>
                <Spinner />
            </Center>
        );
    }
    if (!part) {
        return null;
    }
    return (
        <Center className="PartPage">
            <Heading>Store Parts</Heading>
            <Text>{part[0]?.name}</Text>
            <Text>{part[0]?.type}</Text>
            <Text>{part[0]?.price}</Text>
        </Center>
    );
}

export default PartPage;
