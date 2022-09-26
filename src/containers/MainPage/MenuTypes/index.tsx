import { Menu, Button, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { toast } from "react-hot-toast";

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
        if (!type) return;
        setLoading(true);
        fetchParts(type)
            .then((res) => res.json())
            .then((partsFetched) => setParts(partsFetched))
            .catch((err) => toast.error("Something went wrong: ", err))
            .finally(() => setLoading(false));
        setPartTypeSelected(type);
    };

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
