import { ExitToApp } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { logout } from "../../auth/utils";

export default function ProfileHeader() {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="2rem">
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>
            <Button color="inherit" onClick={logout}>
                Logoout &nbsp; <ExitToApp />
            </Button>
        </Box>
    );
}
