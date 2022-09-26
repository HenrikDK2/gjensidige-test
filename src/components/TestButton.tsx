import { FC } from "react";
import styled from "styled-components";
import { RAILWAY_QUERY } from "../queries";
import { queueFetch } from "../utils";
import { endpoint, headers } from "../index";

const fetchLoop = () => {
  for (let i = 0; i < 10; i++) {
    queueFetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: RAILWAY_QUERY,
        variables: {
          id: "NSR:StopPlace:4000",
        },
      }),
    });
  }
};

const Button = styled.button`
  padding: 1rem 2rem;
  transition: all 0.15s ease;
  background-color: var(--primary-color);
  color: #fff;
  font-weight: bold;
  border: none;
  margin: 0 auto;
  display: block;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
  &:active {
    transform: scale(0.95);
  }
`;

export const TestButton: FC = () => (
  <Button onClick={() => fetchLoop()}>
    Send 10 request to API (Test queueFetch)
  </Button>
);
