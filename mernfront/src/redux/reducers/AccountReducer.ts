import { createReducer } from "@reduxjs/toolkit";
import { AccountState } from "../types/AccountState";
import { LoggedOut, LoggedIn } from "../actions/AccountActions";
import { IUserGetDto } from "../../data/DTOs/user/IUserGetDto";
import { Action } from "../types/Action";

const initialState: AccountState = {
    accountInfo: null,
}

export const AccountReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(LoggedIn, (state, action) => {
            LoggedInAction(state, action);
        })
        .addCase(LoggedOut, (state, action) => {
            LoggedOutAction(state, action);
        });
});

function LoggedInAction(state: AccountState, action: Action<IUserGetDto>): void {
    if (action.payload != undefined) {
        state.accountInfo = action.payload;
    }
}

function LoggedOutAction(state: AccountState, action: Action<void>) {
    state.accountInfo = null;
    window.location.reload();
}