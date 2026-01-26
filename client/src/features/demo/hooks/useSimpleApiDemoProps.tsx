import { useStates } from "./useStates";
import { LoginProps } from "../components/Login";
import { TokenProps } from "../components/Token";
import { TableMaintenanceProps } from "../components/list/TableMaintenance";
import { DataCreateProps } from "../components/edit/DataCreate";
import DataCreatePreset, {
    DataCreatePresetProps,
} from "../components/edit/DataCreatePreset";
import DataCreateFormInput, {
    DataCreateFormInputProps,
} from "../components/edit/DataCreateFormInput";
import DataCreateForm, {
    DataCreateFormProps,
} from "../components/edit/DataCreateForm";
import { DataEditProps } from "../components/edit/DataEdit";
import { DataListProps } from "../components/list/DataList";

export const useSimpleApiDemoProps = () => {
    const { auth, api, crud } = useStates();

    const loginProps: LoginProps = {
        username: auth.username,
        password: auth.password,
        loginResult: auth.loginResult,
        setUsername: auth.setUsername,
        setPassword: auth.setPassword,
        setCsrfToken: auth.setCsrfToken,
        setLoginResult: auth.setLoginResult,
    };

    const tokenProps: TokenProps = {
        csrfToken: auth.csrfToken,
        setCsrfToken: auth.setCsrfToken,
        setLoginResult: auth.setLoginResult,
    };

    const tableMaintenanceProps: TableMaintenanceProps = {
        entity: crud.entity,
        setEntity: crud.setEntity,
        setItems: crud.setItems,
        setSelectedId: crud.setSelectedId,
        setPayloadJson: crud.setPayloadJson,
        setApiResult: api.setApiResult,
        isFetching: api.isFetching,
    };

    const dataCreatePresetProps: DataCreatePresetProps = {
        entity: crud.entity,
        payloadJson: crud.payloadJson,
        setPayloadJson: crud.setPayloadJson,
    };

    const dataCreateFormInputProps: DataCreateFormInputProps = {
        newId: crud.newId,
        newName: crud.newName,
        setNewId: crud.setNewId,
        setNewName: crud.setNewName,
    };

    const dataCreateFormProps: DataCreateFormProps = {
        newId: crud.newId,
        newName: crud.newName,
        payloadJson: crud.payloadJson,
        entity: crud.entity,
        setItems: crud.setItems,
        setSelectedId: crud.setSelectedId,
        setApiResult: api.setApiResult,
        isFetching: api.isFetching,
    };

    const dataCreateProps: DataCreateProps = {
        dataCreateFormInput: (
            <DataCreateFormInput {...dataCreateFormInputProps} />
        ),
        dataCreatePreset: <DataCreatePreset {...dataCreatePresetProps} />,
        dataCreateForm: <DataCreateForm {...dataCreateFormProps} />,
    };

    const dataEditProps: DataEditProps = {
        selectedId: crud.selectedId,
        newName: crud.newName,
        payloadJson: crud.payloadJson,
        entity: crud.entity,
        setItems: crud.setItems,
        setSelectedId: crud.setSelectedId,
        setApiResult: api.setApiResult,
        isFetching: api.isFetching,
    };

    const dataListProps: DataListProps = {
        entity: crud.entity,
        items: crud.items,
        selectedId: crud.selectedId,
        setItems: crud.setItems,
        setSelectedId: crud.setSelectedId,
        setApiResult: api.setApiResult,
        isFetching: api.isFetching,
    };

    return {
        loginProps,
        tokenProps,
        tableMaintenanceProps,
        dataCreateProps,
        dataEditProps,
        dataListProps,
        apiResult: api.apiResult,
    };
};
