import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 2.4rem 2.4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  border-radius: 20px;
  margin-left: 0.5em;

  @media (max-width: 768px) {
    height: 100%;
    margin: 0 auto;
  }
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const CabinRow = ({ cabin }) => {
  const [showForm, setShowForm] = useState(false);

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount !== 0 && discount !== null ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <ButtonContainer>
          <Button size="small" onClick={() => setShowForm(!showForm)}>
            Edit
          </Button>
          <Button
            size="small"
            onClick={() => deleteCabin(cabinId)}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </ButtonContainer>
      </TableRow>
      {showForm && (
        <CreateCabinForm
          cabinToEdit={cabin}
          onShowForm={setShowForm}
          showForm={showForm}
        />
      )}
    </>
  );
};

export default CabinRow;
