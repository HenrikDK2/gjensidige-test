import { FC } from "react";
import styled from "styled-components";
import { RAILWAY_QUERY } from "../queries";
import { queueFetch } from "../utils";

const endpoint = "https://api.entur.io/journey-planner/v3/graphql";
const headers = {
  "Content-Type": "application/json",
  "ET-Client-Name": "henrik-gjensidige_test",
};

const fetchLoop = () => {
  queueFetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: RAILWAY_QUERY,
    }),
  });
  queueFetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: RAILWAY_QUERY,
    }),
  });
  queueFetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: RAILWAY_QUERY,
    }),
  });
  queueFetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: RAILWAY_QUERY,
    }),
  });
  queueFetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: RAILWAY_QUERY,
    }),
  });
  queueFetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: RAILWAY_QUERY,
    }),
  });
  queueFetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: RAILWAY_QUERY,
    }),
  });
  queueFetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: RAILWAY_QUERY,
    }),
  });
  queueFetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: RAILWAY_QUERY,
    }),
  });
  queueFetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: RAILWAY_QUERY,
    }),
  });
};

const TestingButton = styled.button`
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
  <TestingButton onClick={() => fetchLoop()}>
    Make 10 request to API (Test queueFetch)
  </TestingButton>
);
