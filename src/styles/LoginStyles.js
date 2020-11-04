import styled from 'styled-components';
export const LoginStyles = styled.div`
  height: 100vh;

  background-image: url('/ball.webp');
  z-index: 10;
  background-size: 40rem;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  display: flex;
  .heading {
    width: 50%;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    h1 {
      font-size: 5rem;
      margin-top: 12rem;
    }

    h2 {
      background-color: var(--red);
      text-align: center;
      color: #fff;
      display: inline-block;
      margin: 8rem auto;
      padding: 0 5rem;
    }
    ul {
      list-style: none;

      li {
        padding: 1.5rem;
        font-size: 2rem;
      }
    }
  }

  form {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;

    a:hover {
      color: var(--yellow);
    }

    fieldset {
      background-color: var(--red);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 6rem;
      align-items: center;
      margin: 0 15% 0 35%;
      border: 1px solid var(--white);
      border-radius: 10px;
      legend {
        text-align: left;
        font-size: 2rem;
        font-weight: bold;
      }
      input {
        width: 100%;
        border-radius: 5px;
        margin: 1rem 0;
        padding: 0.5rem 0.5rem 0.5rem;
        border: 0;
        background-color: var(--white);
      }

      label {
        margin: 1rem 0;
      }

      .buttonContainer {
        padding: 1rem;
        display: flex;
        justify-content: flex-end;

        button {
          margin: 1rem;
          padding: 1rem 5rem;
          background-color: var(--yellow);
          border: 1px solid var(--white);
        }

        button:disabled {
          background-color: #000;
        }
      }
    }
  }
`;
