import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
} from "@chakra-ui/react";

import { ITableParts } from "./interface";

function TableParts(params: ITableParts): JSX.Element {
    const { parts } = params;

    return (
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Type</Th>
                        <Th>Price</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {parts.map(({ name, type, price }) => {
                        return (
                            <Tr key={name}>
                                <Td>{name}</Td>
                                <Td>{type}</Td>
                                <Td>{price}</Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default TableParts;
