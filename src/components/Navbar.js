import { AppBar, Box, Toolbar, Container, Typography, Button } from "@mui/material";
import { use } from "react";
import { Link, useNavigate } from 'react-router-dom';


export default function Navbar() {
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='transparent'>
                <Container>
                    <Toolbar>
                        <Typography variant = "h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to="/" style={{ textDecoration: 'none', color: '#eee' }}>
                                SYAgro
                            </Link>
                        </Typography>
                        <Button variant="contained" color="primary" onClick={() => navigate('/companies/new')}>
                            Agregar Compañía
                        </Button>
                    </Toolbar>


                </Container>
            </AppBar>

        </Box>
    );
}


