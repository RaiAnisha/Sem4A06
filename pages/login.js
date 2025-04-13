import { Card, Button, Form, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai'; 
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';
import { useState } from "react";
import { authenticateUser } from "@/lib/authenticate"; 
//import { setToken } from "@/lib/authenticate";




export default function LoginCard() {
    const [userName, setUserName] = useState(''); 
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom); 
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); 

    async function updateAtoms() {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authenticateUser(userName, password); 
      window.dispatchEvent(new Event("tokenUpdated")); 
window.dispatchEvent(new Event("tokenUpdated"));
            router.push('/favourites');
            } catch (err) {
                setErrorMessage(err.message);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4">
                <Card.Body>
                    <h2 className="text-center">Login</h2>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label> 
                            <Form.Control
                                type="text"
                                placeholder="Enter your username" 
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-4">
                            Login
                        </Button>
                    </Form>
                    <div className="mt-3 text-center">
                        <small>Don&apos;t have an account? <a href="/register">Register here</a></small>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

