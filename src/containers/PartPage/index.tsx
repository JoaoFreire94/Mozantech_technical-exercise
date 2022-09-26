import {
    Center,
    Heading,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
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
            .catch((err) => toast.error("Something went wrong: ", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Center mt="40">
                <Spinner />
            </Center>
        );
    }
    if (!part) {
        return null;
    }
    return (
        <Center className="PartPage" mt="10">
            <Heading color="teal">Store Parts</Heading>
            <TableContainer mt="10">
                <Table variant="striped" colorScheme="teal">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Type</Th>
                            <Th>Price</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>{part[0].name}</Td>
                            <Td>{part[0].type}</Td>
                            <Td>{part[0].price}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Center>
    );
}

export default PartPage;
