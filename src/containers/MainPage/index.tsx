import { ArrowDownIcon, ArrowUpIcon, CloseIcon } from "@chakra-ui/icons";
import {
    Heading,
    Input,
    Center,
    Button,
    IconButton,
    Spinner,
} from "@chakra-ui/react";
import { debounce } from "debounce";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import fetchParts from "../../services/parts";
import IPartsInterface from "../../services/parts/interface";
import fetchPartTypes from "../../services/partTypes";
import MenuTypes from "./MenuTypes";
import TableParts from "./TableParts";

const parsePartsPriceToFloat = (priceS: string): number => {
    return parseFloat(priceS.replace("$", ""));
};

function MainPage(): JSX.Element {
    const [ascendentPressed, setAscendentPressed] = useState<boolean>();
    const [parts, setParts] = useState<Array<IPartsInterface>>();
    const [partsType, setPartsType] = useState<Array<string>>();
    const [searchType, setSearchType] = useState<string>();
    const [partTypeSelected, setPartTypeSelected] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [reset, setReset] = useState<boolean>(false);

    const debouncedFetchPart = useCallback(
        debounce((value: string) => {
            setLoading(true);
            fetchParts(undefined, value)
                .then((res) => res.json())
                .then((partsFetched) => setParts(partsFetched))
                .catch((err) => toast.error("Something went wrong: ", err))
                .finally(() => setLoading(false));
        }, 1000),
        []
    );
    const onChangeSearch = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            setSearchType(event.target.value);
            debouncedFetchPart(event.target.value);
        },
        [debouncedFetchPart]
    );

    const resetTableHandler = (): void => {
        setPartTypeSelected(undefined);
        setAscendentPressed(undefined);
        setSearchType(undefined);
        setReset((s) => !s);
    };
    useEffect(() => {
        setLoading(true);
        Promise.allSettled([fetchParts(), fetchPartTypes()])
            .then(([fetchPartsResult, fetchPartTypesResult]) => {
                if (fetchPartsResult.status === "fulfilled") {
                    fetchPartsResult.value
                        .json()
                        .then((partsFetched) => setParts(partsFetched));
                } else {
                    toast.error(
                        "Something went wrong: ",
                        fetchPartsResult.reason
                    );
                }
                if (fetchPartTypesResult.status === "fulfilled") {
                    fetchPartTypesResult.value
                        .json()
                        .then((partsTypeFetched) => {
                            const tempArray: Array<string> = [];
                            partsTypeFetched.forEach((element: string) => {
                                tempArray.push(element);
                            });
                            setPartsType(tempArray);
                        });
                } else {
                    toast.error(
                        "Something went wrong: ",
                        fetchPartTypesResult.reason
                    );
                }
            })
            .finally(() => setLoading(false));
    }, [reset]);

    const ascendentButtonHandler = useCallback(() => {
        setAscendentPressed((current) =>
            current === undefined ? false : !current
        );
    }, []);

    useEffect(() => {
        if (ascendentPressed === true) {
            setParts((current) => {
                if (current === undefined) {
                    return undefined;
                }
                return Array.from(current).sort(
                    (a, b) =>
                        parsePartsPriceToFloat(a.price) -
                        parsePartsPriceToFloat(b.price)
                );
            });
        } else if (ascendentPressed === false) {
            setParts((current) => {
                if (current === undefined) {
                    return undefined;
                }
                return Array.from(current).sort(
                    (a, b) =>
                        parsePartsPriceToFloat(b.price) -
                        parsePartsPriceToFloat(a.price)
                );
            });
        }
    }, [ascendentPressed]);

    const priceIcon = useMemo(() => {
        if (ascendentPressed === undefined) {
            return undefined;
        }
        if (ascendentPressed) {
            return <ArrowDownIcon />;
        }

        return <ArrowUpIcon />;
    }, [ascendentPressed]);
    return (
        <Center className="MainPage">
            <Heading color="teal" mt="10" mb="5">
                Store Parts
            </Heading>
            <Center w="40%" mb="10">
                <Input
                    placeholder="Search..."
                    value={searchType || ""}
                    onChange={onChangeSearch}
                    disabled={loading}
                    w="40%"
                />
                <MenuTypes
                    loading={loading}
                    setLoading={setLoading}
                    partTypes={partsType || []}
                    setPartTypeSelected={setPartTypeSelected}
                    setParts={setParts}
                    partTypeSelected={partTypeSelected}
                />
                <Button
                    rightIcon={priceIcon}
                    onClick={ascendentButtonHandler}
                    disabled={loading}
                >
                    Price
                </Button>
                <IconButton
                    variant="outline"
                    colorScheme="teal"
                    aria-label="Reset"
                    onClick={resetTableHandler}
                    icon={<CloseIcon />}
                    disabled={loading}
                />
            </Center>
            {loading && <Spinner size="xl" m="6" />}
            {parts !== undefined && !loading && (
                <TableParts
                    parts={parts}
                    ascendent={ascendentPressed}
                    partsType={partTypeSelected}
                    searchTyped={searchType}
                />
            )}
        </Center>
    );
}

export default MainPage;
