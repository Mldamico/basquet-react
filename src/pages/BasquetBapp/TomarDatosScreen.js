import React, { useState, useEffect } from 'react';
import { Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from '../../components/Layout';
import { getPlayers } from '../../store/actions/playersActions';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import Unknown from '../../assets/unknown.jpg';
const DatosContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--red);
  width: 80%;
  margin: 15rem auto;
  border-radius: 10px;
  border: 1px solid #fff;

  .column__container {
    display: flex;
    flex-direction: column;
    margin: 3rem;
    width: 100%;
  }

  .droppable__column {
    border: 1px solid #fff;
    border-radius: 10px;
  }

  .draggable {
    border-radius: 10px;
    border: 1px solid #fff;
    display: flex;

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
  const { players, loading, error, success } = useSelector(
    (state) => state.players
  );
  const [columns, setColumns] = useState({
    [uuid()]: {
      name: 'Plantel',
      items: players,
    },
    [uuid()]: {
      name: 'Convocados',
      items: [],
    },
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   // if (user && user.tipo !== 'asistente') {
  //   //   history.push('/');
  //   // } else {
  //   // }
  //   dispatch(getPlayers());
  // }, [dispatch]);

  const dragEnd = () => {};
  return (
    <Layout showGoBack>
      {loading ? (
        'Loading'
      ) : (
        <DatosContainer>
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
                            {column.items.map((item, index) => {
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
                                            ? '#ffc600'
                                            : '#ffc600',
                                          color: '#fff',
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        <div>
                                          <img
                                            src={
                                              item.urlFoto
                                                ? item.urlFoto
                                                : Unknown
                                            }
                                            alt={item.nombre}
                                            style={{ width: 40 }}
                                          />
                                        </div>
                                        <div className='description'>
                                          <p>
                                            {item.nombre} {item.apellido}
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
        </DatosContainer>
      )}
    </Layout>
  );
};
