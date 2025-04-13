// import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAtom } from 'jotai';  
import { searchHistoryAtom } from '@/store'; 
import { useState } from 'react';
import {addToHistory} from '@/lib/userData'; // ✅ ADDED: for persistent search history
import { useRouter } from 'next/router';


export default function AdvancedSearch() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [searchQuery, setSearchQuery] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const submitForm = async (data) => { // ✅ Made function async
        let queryString = `${data.searchBy}=true`;        
        if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
        if (data.medium) queryString += `&medium=${data.medium}`;
        
        if (data.isOnView) 
            queryString += `&isOnView=true`;
        else
            queryString += `&isOnView=false`;

        if (data.isHighlight) 
            queryString += `&isHighlight=true`;
        else
            queryString += `&isHighlight=false`;

        if (data.q) queryString += `&q=${data.q}`;

        const updatedHistory = await addToHistory(queryString); // ✅ REPLACED local push with DB call
        setSearchHistory(updatedHistory); // ✅ Update atom with result from DB
        router.push(`/artwork?${queryString}`);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(submitForm)}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Search Query</Form.Label>
                            <Form.Control 
                                type="text" 
                                {...register("q", { required: true })} 
                                className={errors.q ? "is-invalid" : ""} 
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Label>Search By</Form.Label>
                        <Form.Select {...register("searchBy")} className="mb-3">
                            <option value="title">Title</option>
                            <option value="tags">Tags</option>
                            <option value="artistOrCulture">Artist or Culture</option>
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Geo Location</Form.Label>
                            <Form.Control type="text" {...register("geoLocation")} />
                            <Form.Text className="text-muted">
                                Case-sensitive (e.g., "Europe", "France", "Paris", "China", "New York"), use | for multiple values.
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Medium</Form.Label>
                            <Form.Control type="text" {...register("medium")} />
                            <Form.Text className="text-muted">
                                Case-sensitive (e.g., "Ceramics", "Furniture", "Paintings", "Sculpture"), use | for multiple values.
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Highlighted" {...register("isHighlight")} />
                        <Form.Check type="checkbox" label="Currently on View" {...register("isOnView")} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
