export const OAuthGoogle = () => {
    window.open(
        `${process.env.API_URL as string}/auth/google/callback`,
        "_self"
    );
}