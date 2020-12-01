import styled from 'styled-components';

export const ChronoStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: var(--red);
  margin: 10rem auto 0;
  width: 80%;
  border-radius: 10px;
  border: 1px solid #fff;
  color: #fff;
  position: relative;
  .button_container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 1rem;
  }

  button {
    outline: none;
    height: 5rem;
    width: 5rem;
    border-radius: 100%;
    background-color: var(--yellow);
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #fff;
  }

  button:active {
    background-color: var(--red);
  }
  button:disabled {
    background-color: var(--black);
    cursor: not-allowed;
  }
`;

export const ChangesStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--red);
  margin: 10rem auto;
  width: 80%;
  border-radius: 10px;
  border: 1px solid #fff;
  color: #fff;

  .selected {
    background-color: var(--yellow);
  }

  .players_list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #fff;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 1rem;
    p {
      margin: 0;
      margin-left: 1rem;
    }
  }

  .player {
    display: grid;
    grid-template-columns: 5rem 10rem;
    align-items: center;
    gap: 1rem;
    padding: 3rem;
  }

  button:disabled {
    color: #000;
    cursor: not-allowed;
  }
`;

export const PlayStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--red);
  margin: 10rem auto;
  width: 80%;
  border-radius: 10px;
  border: 1px solid #fff;
  color: #fff;

  select {
    width: 25rem;
    border-radius: 10px;
    overflow: hidden;
    font-size: 2rem;
    margin: 0 auto;
    display: block;
    text-align-last: center;
  }
  option {
    text-align: center;
  }
  input {
    width: 10rem;
    border-radius: 10px;
    text-align-last: center;
    border: 0.5rem;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: var(--yellow);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px var(--yellow);
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
  button {
    outline: none;
    background-color: var(--yellow);
    border: 1px solid #fff;
    border-radius: 10px;
    margin: 1rem;
    &:disabled {
      background-color: var(--black);
      cursor: not-allowed;
    }
  }
`;

export const ChronometterStyles = styled.div`
  display: flex;
  margin-top: 2rem;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  background-color: var(--yellow);
  border: 1px solid #fff;
`;
