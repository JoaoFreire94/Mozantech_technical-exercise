import { Menu, Button, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import fetchParts from "../../../services/parts";
import { IMenuTypesInterface } from "./interface";

function MenuTypes(param: IMenuTypesInterface): JSX.Element {
    const {
        partTypes,
        setPartTypeSelected,
        setParts,
        setLoading,
        partTypeSelected,
        loading,
    } = param;

    const onChangeSearch: React.MouseEventHandler<HTMLButtonElement> = ({
        currentTarget,
    }) => {
        const type = currentTarget.firstChild?.textContent;
        console.log(type);
        if (!type) return;
        setLoading(true);
        fetchParts(type)
            .then((res) => res.json())
            .then((partsFetched) => setParts(partsFetched))
            .finally(() => setLoading(false));
        setPartTypeSelected(type);
    };

    // TO-DO IN LINE FUNCTION CALL
    return (
        <Menu>
            <MenuButton as={Button} disabled={loading}>
                {partTypeSelected === undefined ? "Type" : partTypeSelected}
            </MenuButton>
            <MenuList>
                {partTypes.map((type: string) => {
                    return (
                        <MenuItem onClick={onChangeSearch} key={type}>
                            {type}
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

export default MenuTypes;
