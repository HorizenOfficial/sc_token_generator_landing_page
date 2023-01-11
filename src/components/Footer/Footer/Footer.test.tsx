/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { render, waitFor } from '@testing-library/react';
import { TestWrapper } from "../../../test/unit/Commons";
import Footer from "./Footer";
import { initialState } from "../../../store/reducer";
import { getSidechainId } from "../../../network/__mocks__/APIRepository";

import * as APIRepository from '../../../network/APIRepository';

beforeAll(() => {
    process.env = {
        ...process.env,
        REACT_APP_FEATURE_FLAGS: '[{"flag": "FOOTER_SIDECHAIN_ID", "enabled": false}]',
        REACT_APP_MAINCHAIN_URL: "https://explorer-testnet.horizen.io"
    };
});

test("<Footer /> renders without Sidechains ID", () => {
    const {getByText} = render(
            <TestWrapper>
                <Footer/>
            </TestWrapper>
    );

    // /TEXT/i Searchs for partial text
    expect(getByText(/TokenMint by Horizen/i)).toBeInTheDocument();
});

test("<Footer /> renders with Sidechains ID", async () => {
    process.env = {
        ...process.env,
        REACT_APP_FEATURE_FLAGS: '[{"flag": "FOOTER_SIDECHAIN_ID", "enabled": true}]',
    };

    jest.spyOn(APIRepository, 'getSidechainId').mockResolvedValue(getSidechainId());

    const {getByText} = render(
            <TestWrapper>
                <Footer/>
            </TestWrapper>
    );

    await waitFor(() => {
        expect(getByText(/312d210ab35cc9ccba61efa4816efcd581b349eea0dc9df6c4b1a51b23f32eb4/i)).toBeDefined();
    });

    expect(getByText(/TokenMint by Horizen/i)).toBeInTheDocument();
    expect(getByText(/TokenMint Chain ID:/i)).toBeInTheDocument();
});

test("<Footer /> renders without blurring", () => {
    const {getByTestId} = render(
            <TestWrapper>
                <Footer/>
            </TestWrapper>
    );

    expect(getByTestId("footer").classList.contains("blur-sm")).toBe(false)
});

test("<Footer /> render blur if needed", () => {
    const {getByTestId} = render(
            <TestWrapper preloadedState={ {...initialState, modalOpen: true} }>
                <Footer/>
            </TestWrapper>
    );

    expect(getByTestId("footer").classList.contains("blur-sm")).toBe(true)
});