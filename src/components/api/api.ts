import { fetchData } from './fetchData';
import {DialogData, NyDialogMeldingData, OppfolgingData} from './dataTypes';

export const API_VEILARBDIALOG = process.env.PUBLIC_URL + '/veilarbdialog/api/dialog';
export const API_VEILARBVEDTAKINFO = process.env.PUBLIC_URL + '/veilarbvedtakinfo/api/motestotte';
export const API_VEILARBOPPFOLGING = process.env.PUBLIC_URL + '/veilarboppfolging/api/oppfolging';

function getCookie(name: string) {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
}

function getHeaders() {
    return new Headers({
        'Content-Type': 'application/json',
        'NAV_CSRF_PROTECTION': getCookie('NAV_CSRF_PROTECTION'),
    });
}

const CONFIG = {
    credentials: ('same-origin' as RequestCredentials),
    headers: getHeaders(),
};

export function postDialog(data: NyDialogMeldingData): Promise<DialogData> {
    return fetchData<DialogData>(API_VEILARBDIALOG, {method: 'post', body: JSON.stringify(data), ...CONFIG});
}

export function postMotestotte(): Promise<void> {
    return fetchData<void>(API_VEILARBVEDTAKINFO, {method: 'post', ...CONFIG});
}

export function getOppfolging(): Promise<OppfolgingData | undefined> {
    return fetchData<OppfolgingData>(API_VEILARBOPPFOLGING, {method: 'GET', ...CONFIG});
}