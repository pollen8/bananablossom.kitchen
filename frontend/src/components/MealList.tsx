import { gql } from 'apollo-boost';
import { Link } from 'gatsby';
import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';

import { formatter } from '../lib/formatter';
import AddItemForm from './AddItemForm';
import Alert from './Alert';
import Button from './Button';
import Card from './Card';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import Price from './Price';

export interface IMeal {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: {
    url: string;
  }
}

const Grid = styled.div`
  margin: 3rem 5rem 0 5rem;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  grid-column-gap: 4rem;
  grid-row-gap: 4rem;
`;

const GET_MEALS = gql`{
    meals(sort: "menu_category") {
      id
      title
      description
      price
      image {
        url
      }
      menu_category {
        title
      }
    }
  }`;

const MealCard = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > div {
    margin-left: 9rem;
  }
`;

const MealImage = styled.img`
  position: absolute;
  top: -2rem;
  left: -1rem;
  max-height: 10rem;
  max-width: 10rem;
`;

const MealList = () => {

  const { loading, error, data, fetchMore } = useQuery<{ meals: IMeal[] }>(GET_MEALS, {
    notifyOnNetworkStatusChange: true
  });
  const [isOpen, onToggle] = useState(false);
  const [activeMeal, setActiveMeal] = useState<IMeal>();


  if (error) return <Alert>Error loading menu</Alert>;

  if (loading) {
    return <h1>Loading</h1>;
  }
  console.log('data', data);

  if (data.meals && data.meals.length) {

    return (
      <>
        <Grid >
          {data.meals.map(res => (
            <MealCard
              key={res.id}
            >
              {
                res.image && <MealImage
                  src={`http://localhost:1337${res.image.url}`}
                />
              }

              <CardBody>
                <h3>
                  {res.title}
                </h3>
                <div>{res.description}</div>
              </CardBody>
              <CardFooter>
                <Price>
                  {formatter.format(res.price)}
                </Price>
                <Link
                  to={`/meals?id=${res.id}`}
                >
                  <>
                    <Button
                      color="primary"
                      onClick={() => {
                        setActiveMeal(res);
                        onToggle(true)
                      }}>Order now
                    </Button>
                  </>
                </Link>
              </CardFooter>
            </MealCard>
          ))}
        </Grid>
        <AddItemForm
          isOpen={isOpen}
          onToggle={onToggle}
          meal={activeMeal} />
      </>
    );
  } else {
    return <h1>No Meals Found</h1>;
  }

};

export default MealList;
