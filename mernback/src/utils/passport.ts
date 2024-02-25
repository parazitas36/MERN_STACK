import passport from 'passport';
import {Strategy as GoogleStrategy, Profile, VerifyCallback, StrategyOptionsWithRequest} from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { Role } from '../enums/Role';
import { IUserOAuthPostDto } from '../DTOs/user/UserOAuthPostDto';
import { FindUserByOAuthId, RegisterOAuthUser } from '../logic/UsersLogic'
import { MapToExpressUser, MapToIUserGetDto } from '../mappers/UserMappers';
import express from 'express';
dotenv.config();

const options: StrategyOptionsWithRequest = {
    clientID: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
    callbackURL: process.env.GOOGLE_CALLBACK as string,
    scope: ['profile', 'email'],
    passReqToCallback: true,
}

const verifyCallback = async(req: express.Request, accessToken: string, refreshToken: string, profile: Profile, callback: VerifyCallback) => {
    const userDto: IUserOAuthPostDto = {
        name: profile.name?.givenName ?? '',
        surname: profile.name?.familyName ?? '',
        email: profile.emails?.find(x => x.value)?.value ?? '',
        role: Role.Regular,
        isOAuth: true,
        OAuthId: profile.id,
        OAuthProvider: 'google'
    };

    await RegisterOAuthUser(userDto);
    const foundUser = await FindUserByOAuthId(userDto.OAuthId!);
    const dto = MapToIUserGetDto(foundUser);

    return callback(null, MapToExpressUser(dto));
}

passport.use(new GoogleStrategy(options, verifyCallback));

passport.serializeUser((user, done) => {
    console.log('serialize:', user);
    return done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log('deserialize:', user);
    return done(null, user as Express.User);
});