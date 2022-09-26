import React from "react";

import IPartsInterface from "../../../services/parts/interface";

export interface IMenuTypesInterface {
    partTypes: Array<string>;
    setPartTypeSelected: React.Dispatch<
        React.SetStateAction<string | undefined>
    >;
    setParts: React.Dispatch<
        React.SetStateAction<IPartsInterface[] | undefined>
    >;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    partTypeSelected?: string;
    loading: boolean;
}
