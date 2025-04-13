import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import { Row, Col, Card, Pagination } from 'react-bootstrap';

import validObjectIDList from '@/public/data/validObjectIDList.json';
import ArtworkCard from '@/components/ArtworkCard';

const PER_PAGE = 12;

export default function Artwork() {
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);
    const [artworkList, setArtworkList] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (data?.objectIDs) {
            // Filter out invalid object IDs
            let filteredResults = validObjectIDList.objectIDs.filter((id) => data.objectIDs.includes(id));

            // Chunk results into pages
            let paginatedResults = [];
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                paginatedResults.push(filteredResults.slice(i, i + PER_PAGE));
            }

            setArtworkList(paginatedResults);
            setPage(1); // Reset to first page after filtering
        }
    }, [data]);

    const previousPage = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));
    const nextPage = () => setPage((prev) => (prev < artworkList.length ? prev + 1 : prev));

    if (error) return <Error statusCode={404} />;
    if (!artworkList) return null;

    return (
        <>
            {artworkList.length > 0 ? (
                <>
                    <Row className="gy-4">
                        {artworkList[page - 1]?.map((currentObjectID) => (
                            <Col lg={3} key={currentObjectID}>
                                <ArtworkCard objectID={currentObjectID} />
                            </Col>
                        ))}
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <Pagination>
                                <Pagination.Prev onClick={previousPage} disabled={page === 1} />
                                <Pagination.Item active>{page}</Pagination.Item>
                                <Pagination.Next onClick={nextPage} disabled={page === artworkList.length} />
                            </Pagination>
                        </Col>
                    </Row>
                </>
            ) : (
                <Card>
                    <Card.Body>
                        <h4>Nothing Here</h4>
                        Try searching for something else.
                    </Card.Body>
                </Card>
            )}
        </>
    );
}
