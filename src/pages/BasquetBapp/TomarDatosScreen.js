import React, { useState, useEffect } from 'react';
import { Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from '../../components/Layout';
import { getPlayers } from '../../store/actions/playersActions';
import { v4 as uuid } from 'uuid';

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
        <div
          style={{ display: 'flex', justifyContent: 'center', height: '100%' }}
        >
          <DragDropContext onDragEnd={(result) => console.log(result)}>
            {Object.entries(columns).map(([id, column]) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                  key={id}
                >
                  <h2>{column.name}</h2>
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={id} key={id}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? 'lightblue'
                                : 'lightgrey',
                              padding: 4,
                              margin: 250,
                              minHeight: 500,
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
                                        style={{
                                          userSelect: 'none',
                                          padding: 16,
                                          margin: '0 0 8px 0',
                                          minHeight: '50px',
                                          backgroundColor: snapshot.isDragging
                                            ? '#263b4A'
                                            : '#456C86',
                                          color: '#fff',
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {item.nombre}
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
        </div>
      )}
    </Layout>
  );
};
