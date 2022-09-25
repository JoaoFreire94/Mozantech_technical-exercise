import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { ITableParts } from "./interface";

function TableParts(params: ITableParts): JSX.Element {
    const { parts } = params;

    const navigate = useNavigate();
    const handleClick: React.MouseEventHandler<HTMLTableRowElement> = ({
        currentTarget,
    }): void => {
        navigate(`/parts/${encodeURI(currentTarget.id.toLowerCase())}`);
    };

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
                            <Tr
                                key={name}
                                id={name}
                                onClick={handleClick}
                                _hover={{ cursor: "pointer" }}
                            >
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
