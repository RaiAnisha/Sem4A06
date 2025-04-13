import { useAtom } from 'jotai';
import { Card, Col, Row } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import { favouritesAtom } from '@/store';
import { getFavourites } from '@/lib/userData';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/lib/authenticate';

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    async function loadData() {
      try {
        const data = await getFavourites();
        setFavouritesList(data);
      } catch (error) {
        console.error("Failed to load favourites:", error);
      }
    }

    loadData();
  }, [router, setFavouritesList]);

  if (!favouritesList) return null; 

  return (
    <>
      {favouritesList.length > 0 ? (
        <Row className="gy-4">
          {favouritesList.map(objID => (
            <Col lg={3} key={objID}>
              <ArtworkCard objectID={objID} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            Try adding some new artwork to the list.
          </Card.Body>
        </Card>
      )}
    </>
  );
}

