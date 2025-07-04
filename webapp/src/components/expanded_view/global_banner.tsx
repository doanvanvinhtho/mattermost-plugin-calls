// Copyright (c) 2020-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import {useIntl} from 'react-intl';
import CompassIcon from 'src/components/icons/compassIcon';
import styled from 'styled-components';

const colorMap = {
    error: 'var(--button-color)',
    warning: 'rgb(63, 67, 80)',
    info: 'var(--center-channel-color)',
};

const hoverMap = {
    error: 'rgba(var(--button-color-rgb), 0.08)',
    warning: 'rgba(63, 67, 80, 0.08)',
    info: 'rgba(var(--center-channel-color-rgb), 0.08)',
};

const bgMap = {
    error: 'var(--dnd-indicator)',
    warning: 'rgb(255, 188, 31)',
    info: 'var(--center-channel-bg)',
};

export type Props = {
    type: 'error' | 'warning' | 'info',
    icon: string,
    body: string | React.ReactNode,
    onClose?: () => void,
}

export default function GlobalBanner(props: Props) {
    const {formatMessage} = useIntl();

    const dismissLabel = formatMessage({defaultMessage: 'Dismiss'});

    return (
        <Banner
            $color={colorMap[props.type]}
            $bgColor={bgMap[props.type]}
        >
            <Icon>
                <CompassIcon icon={props.icon}/>
            </Icon>
            <Body>{props.body}</Body>
            {props.onClose &&
                <OverlayTrigger
                    placement='left'
                    key={'dismiss-banner'}
                    overlay={
                        <Tooltip id='dismiss-banner'>
                            {dismissLabel}
                        </Tooltip>
                    }
                >
                    <CloseButton
                        $bgHover={hoverMap[props.type]}
                        className='style--none'
                        onClick={props.onClose}
                        aria-label={dismissLabel}
                    >
                        <CompassIcon icon='close'/>
                    </CloseButton>
                </OverlayTrigger>
            }
            {!props.onClose &&
                <RightFiller/>
            }
        </Banner>
    );
}

const Banner = styled.div<{ $color: string, $bgColor: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: ${({$bgColor}) => $bgColor};
    font-size: 14px;
    gap: 4px;
    color: ${({$color}) => $color};

    a, a:hover, a:visited {
        color: ${({$color}) => $color};
    }
`;

const Body = styled.span`
    font-weight: 600;
    line-height: 20px;
`;

const CloseButton = styled.button<{ $bgHover: string }>`
    cursor: pointer;
    margin: 0 4px 0 auto;
    opacity: 0.56;
    padding: 3px;
    border-radius: 4px;

    &:hover {
        opacity: 0.72;
        background: ${({$bgHover}) => $bgHover};
    }
`;

const Icon = styled.div`
    margin-left: auto;
`;

const RightFiller = styled.div`
    margin-left: auto;
`;
