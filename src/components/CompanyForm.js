import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CompanyForm() {
    const [company, setCompany] = useState({
        name: "",
        legal_name: "",
        phone: "",
        city: "",
        rfc: "",
        email: "",
        suscription_plan: ""
    });
    const [editCompany, setEditCompany] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (editCompany) {
            const res = await fetch(`http://localhost:4000/companies/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(company)

            })
            console.log(JSON.stringify(company))
            const data = await res.json();
            console.log(data)
        } else {
            await fetch('http://localhost:4000/companies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(company)
            })
        }
        setLoading(false);
        navigate('/');
    }
    const handleChange = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value });
        console.log(company);
    }

    const loadCompany = async (id) => {
        try {
            const res = await fetch(`http://localhost:4000/companies/${id}`);
            const data = await res.json();
            setCompany({ name: data.name, legal_name: data.legal_name, phone: data.phone, city: data.city, rfc: data.rfc, email: data.email, suscription_plan: data.suscription_plan });
            setEditCompany(true);
        } catch (error) {
            console.error('Error fetching company:', error);
        }
    };

    useEffect(() => {
        if (params.id) {
            loadCompany(params.id);
        }
    }, [params.id]);

    return (
        <Grid container direction='column' alignItems="center" justifyContent="center" sx={{ width: '90%', maxWidth: '1000px' }}>
        <h1>{editCompany ? 'Editar Compañía' : 'Crear Compañía'}</h1>
            
            <Grid item xs={12} md={10}>
                <Card sx={{ mt: 5, width: '100%' }} style={{ background: '#1e272e', padding: '1rem' }}>
                    <Typography variant='5' textAlign='center' color='white'>
                        {'Información de la Compañía'}
                    </Typography>
                    <CardContent>
                        <form onSubmit={handlesubmit}>
                            <TextField
                                variant='filled'
                                label="Nombre de la Compañía"
                                sx={{ display: 'block', margin: '.5rem' }}
                                name="name"
                                value={company.name}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'lightblue' } }}

                            />
                            <TextField
                                variant='filled'
                                label="Nombre Legal"
                                sx={{ display: 'block', margin: '.5rem' }}
                                name="legal_name"
                                value={company.legal_name}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'lightblue' } }}
                            />
                            <TextField
                                variant='filled'
                                label="Teléfono"
                                sx={{ display: 'block', margin: '.5rem' }}
                                name="phone"
                                value={company.phone}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'lightblue' } }}
                            />
                            <TextField
                                variant='filled'
                                label="Ciudad"
                                sx={{ display: 'block', margin: '.5rem' }}
                                name="city"
                                value={company.city}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'lightblue' } }}
                            />
                            <TextField
                                variant='filled'
                                label="RFC"
                                sx={{ display: 'block', margin: '.5rem' }}
                                name="rfc"
                                value={company.rfc}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'lightblue' } }}
                            />
                            <TextField
                                variant='filled'
                                label="Correo Electrónico"
                                sx={{ display: 'block', margin: '.5rem' }}
                                name="email"
                                value={company.email}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'lightblue' } }}
                            />
                            <TextField
                                variant='filled'
                                label="Suscripción"
                                sx={{ display: 'block', margin: '.5rem' }}
                                name="suscription_plan"
                                value={company.suscription_plan}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'lightblue' } }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type='submit'
                                disabled={!company.name || !company.legal_name || !company.phone || !company.city || !company.rfc || !company.email || !company.suscription_plan}>
                                {loading ? <CircularProgress
                                    size={24}
                                    color="inherit"
                                /> : 'Guardar'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}


