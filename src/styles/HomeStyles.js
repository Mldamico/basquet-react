import styled from 'styled-components';

export const HomeStyles = styled.div`
  height: 100vh;

  .centered {
    position: fixed;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      transition: 1s all ease-in-out;
      width: 50%;
    }

    img:hover {
      transform: rotate(360deg);
    }
  }
  .user-data {
    position: absolute;
    background-color: var(--red);
    top: 30%;
    left: 5%;
    width: 25%;
    border-radius: 10px;
    border: 1px solid #fff;
    img {
      width: 80%;
      margin-top: 2rem;
    }
    h4,
    p {
      color: #fff;
    }
  }

  a {
    color: var(--red);
    text-decoration: none;
    font-size: 2.5rem;
  }

  .first p,
  .second p,
  .third p,
  .fourth p {
    padding-left: 1rem;
    color: #fff;
    display: inline-block;
    opacity: 0;
    animation-name: out;
    animation-duration: 1s;
  }

  .first,
  .second,
  .third,
  .fourth {
    &:hover {
      p {
        animation-name: in;
        animation-duration: 1s;
      }
    }
  }

  @keyframes in {
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes out {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  i {
    font-size: 5rem;
  }

  .first {
    position: fixed;
    top: 32%;
    left: 63%;
  }
  .second {
    position: fixed;
    top: 46%;
    left: 68%;
  }

  .third {
    position: fixed;
    top: 59%;
    left: 68%;
  }

  .fourth {
    position: fixed;
    top: 71%;
    left: 63%;
  }
`;
