import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import {useNavigate} from 'react-router-dom'
const API_URL = process.env.REACT_APP_API_URL;


export default function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const navigate = useNavigate();
    const LoadCompanies = async () => {
        try {
            const response = await fetch(`${API_URL}/companies`);
            const data = await response.json();
            setCompanies(data);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    }

    const handleDelete = async (id) => {
        try {

            const res = await fetch(`${API_URL}/companies/${id}`, {
                method: 'DELETE'
            });
            console.log(res);
            setCompanies(companies.filter(company => company.id !== id));
        }
        catch (error) {
            console.error('Error deleting company:', error);
            return;
        }

    }

    useEffect(() => {

        LoadCompanies()
    }, []);


    return (
        <>
            <h1>Lista de Compañías</h1>
            {
                companies.map(company => (
                    <Card style={{
                        marginBottom: '.7rem',
                        backgroundColor: '#1e272e'

                    }}
                        key={company.id}
                    >
                        <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ color: 'white' }}>
                                <Typography>{company.name}</Typography>
                                <Typography>{company.legal_name}</Typography>
                                <Typography>{company.phone}</Typography>
                                <Typography>{company.city}</Typography>
                                <Typography>{company.rfc}</Typography>
                                <Typography>{company.email}</Typography>
                                <Typography>{company.suscription_plan}</Typography>
                            </div>

                            <div>
                                <Button
                                    variant="contained"
                                    color="inherit"
                                    onClick={() => navigate(`/companies/${company.id}/edit`)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={() => handleDelete(company.id)}
                                    style={{ marginLeft: '.5rem' }}
                                >
                                    Eliminar
                                </Button>
                            </div>

                        </CardContent>
                    </Card>
                ))
            }
        </>
    );
}


