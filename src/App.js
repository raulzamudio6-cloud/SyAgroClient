import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CompanyList from './components/CompanyList';
import CompanyForm from './components/CompanyForm';
import Menu from './components/Navbar';
import { Container } from '@mui/material';

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path="/" element={<CompanyList />} />
          <Route path="/companies/new" element={<CompanyForm />} />
          <Route path="/companies/:id/edit" element={<CompanyForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

