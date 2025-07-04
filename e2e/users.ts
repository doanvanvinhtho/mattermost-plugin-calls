// Copyright (c) 2020-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {expect} from '@playwright/test';
import {APIRequestContext} from 'playwright-core';

import {baseURL} from './constants';
import {getHTTPHeaders} from './utils';

export const apiPatchNotifyProps = async (request: APIRequestContext, newProps: Record<string, string>) => {
    let resp = await request.get(`${baseURL}/api/v4/users/me`);
    expect(resp.status()).toEqual(200);
    const notifyProps = (await resp.json()).notify_props;
    resp = await request.put(`${baseURL}/api/v4/users/me/patch`, {
        headers: await getHTTPHeaders(request),
        data: {
            notify_props: {
                ...notifyProps,
                ...newProps,
            },
        },
    });
    expect(resp.status()).toEqual(200);
};

export const apiPutStatus = async (request: APIRequestContext, status: string) => {
    let resp = await request.get(`${baseURL}/api/v4/users/me`);
    expect(resp.status()).toEqual(200);
    const id = (await resp.json()).id;
    resp = await request.put(`${baseURL}/api/v4/users/${id}/status`, {
        headers: await getHTTPHeaders(request),
        data: {
            user_id: id,
            status,
            dnd_end_time: 0,
            manual: true,
        },
    });
    expect(resp.status()).toEqual(200);
};

