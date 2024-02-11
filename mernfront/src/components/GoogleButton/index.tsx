import { Button, Typography } from "@mui/material"
import React, { useMemo } from "react"
import { OAuthGoogle } from "../../helpers/OAuthGoogle"

const GoogleButton = () => {
    const Icon = () => useMemo(() => {
        return (
            <img width={24} height={24} src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
        )
    }, [])

    return (
        <Button
            variant="outlined"
            color="primary"
            size={'large'}
            onClick={OAuthGoogle}
            startIcon={<Icon/>}
        >
            <Typography
                variant="button"
                color="text"
            >
                Continue with Google
            </Typography>
        </Button>
    )
}

export default React.memo(GoogleButton);