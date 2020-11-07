import React, { useEffect, useState } from 'react';
import { Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from '../../components/Layout';
import styled from 'styled-components';
import Unknown from '../../assets/unknown.jpg';
import { CenterLoading } from '../../components/CenterLoading';
import { Title } from '../../components/Title';
import { startMatch } from '../../store/actions/matchActions';
const DatosContainer = styled.form`
  padding-top: 5rem;
  background-color: var(--red);
  width: 80%;
  margin: 5rem auto;
  border-radius: 10px;
  border: 1px solid #fff;
  color: #fff;
  label {
    font-size: 2.5rem;
  }
  input {
    outline: none;
    border-radius: 5px;
    border: 0;
    display: block;
    margin: 1rem auto 0;
    width: 50%;
    padding: 1rem;
  }
  button {
    margin-top: 1rem;
    padding: 1.5rem;

    background-color: var(--yellow);

    &:disabled {
      background-color: #000;
    }
  }
`;

const DragAndDropStyles = styled.div`
  display: flex;
  justify-content: center;

  .column__container {
    display: flex;
    flex-direction: column;

    margin: 1rem 2rem;
    width: 100%;
  }

  .droppable__column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid #fff;
    border-radius: 10px;

    min-height: 200px;
  }

  .draggable {
    border-radius: 10px;
    border: 1px solid #fff;
    display: flex;
    margin: 0.5rem;
    .description {
      display: flex;
      align-items: center;
      margin: 0 auto;
    }
    p {
      margin: 0;
    }
  }
`;

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export const TomarDatosScreen = ({ history }) => {
  const { players, loading } = useSelector((state) => state.players);
  const { match } = useSelector((state) => state.match);
  const [rival, setRival] = useState('');
  const [columns, setColumns] = useState({
    plantel: {
      name: 'Plantel',
      items: players,
    },
    convocados: {
      name: 'Convocados',
      items: [],
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(match.id);
    if (match.id) {
      history.push(`/tomardatos/${match.id}`);
    }
  }, [match, history]);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(columns['convocados'].items);
    let jugadoresCitados = [];
    columns['convocados'].items.forEach((jugador) =>
      jugadoresCitados.push(jugador.id)
    );
    console.log(jugadoresCitados);
    dispatch(
      startMatch(rival, new Date().toISOString().slice(0, 10), jugadoresCitados)
    );
  };

  return (
    <Layout showGoBack>
      {loading ? (
        <CenterLoading />
      ) : (
        <>
          <Title size={6}>TOMAR DATOS</Title>
          {players ? (
            <DatosContainer onSubmit={onSubmit}>
              <div>
                <label htmlFor='rival'>Rival</label>
                <input
                  value={rival}
                  onChange={(e) => setRival(e.target.value)}
                  id='rival'
                  type='text'
                />
              </div>
              <div>
                <button
                  type='submit'
                  disabled={
                    columns['convocados'].items.length < 5 || rival.length < 3
                  }
                >
                  INICIAR PARTIDO
                </button>
              </div>
              <DragAndDropStyles>
                <DragDropContext
                  onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
                >
                  {Object.entries(columns).map(([id, column]) => {
                    return (
                      <div className='column__container' key={id}>
                        <h2>{column.name}</h2>
                        <div style={{ margin: 8 }}>
                          <Droppable droppableId={id} key={id}>
                            {(provided, snapshot) => {
                              return (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  className='droppable__column'
                                  style={{
                                    background: snapshot.isDraggingOver
                                      ? '#fff'
                                      : '#ffc600',
                                    padding: 4,
                                  }}
                                >
                                  {column.items &&
                                    column.items.map((item, index) => {
                                      return (
                                        <Draggable
                                          key={item.id}
                                          draggableId={item.id.toString()}
                                          index={index}
                                        >
                                          {(provided, snapshot) => {
                                            return (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className='draggable'
                                                style={{
                                                  userSelect: 'none',
                                                  padding: 16,
                                                  backgroundColor: snapshot.isDragging
                                                    ? '#d9534f'
                                                    : '#ffc600',
                                                  color: '#fff',
                                                  ...provided.draggableProps
                                                    .style,
                                                }}
                                              >
                                                <div className='description'>
                                                  <img
                                                    src={
                                                      item.urlFoto
                                                        ? item.urlFoto
                                                        : Unknown
                                                    }
                                                    alt={item.nombre}
                                                    style={{ width: 50 }}
                                                  />
                                                </div>
                                                <div className='description'>
                                                  <p>
                                                    {item.nombre}{' '}
                                                    {item.apellido}
                                                  </p>
                                                </div>
                                              </div>
                                            );
                                          }}
                                        </Draggable>
                                      );
                                    })}
                                  {provided.placeholder}
                                </div>
                              );
                            }}
                          </Droppable>
                        </div>
                      </div>
                    );
                  })}
                </DragDropContext>
              </DragAndDropStyles>
            </DatosContainer>
          ) : (
            ''
          )}
        </>
      )}
    </Layout>
  );
};
