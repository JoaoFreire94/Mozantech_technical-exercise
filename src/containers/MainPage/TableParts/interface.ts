import IParts from "../../../services/parts/interface";

export interface ITableParts {
    parts: Array<IParts>;
    ascendent?: boolean;
    searchTyped?: string;
    partsType?: string;
}
