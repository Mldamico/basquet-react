import styled from 'styled-components';
export const PizarraScreenStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    margin: 2rem;
  }
`;

export const FormStyle = styled.form`
  button {
    margin-top: 2rem;
    background-color: var(--yellow);
  }
  display: flex;
  flex-direction: column;
  fieldset {
    border: 1px solid #fff;
    background-color: var(--red);
    color: #fff;
    border-radius: 10px;
    display: flex;
    padding-right: 2.5rem;
    flex-direction: column;
    width: 40rem;
    legend {
      font-weight: bold;
    }
    input {
      width: 100%;
      border-radius: 5px;
      margin: 0.5rem 0;
      padding: 0.5rem 0.5rem 1rem;
      border: 0.5px solid var(--black);
    }
    div {
      display: flex;
    }
    div:first-child {
      flex-direction: column;
    }
  }
`;
