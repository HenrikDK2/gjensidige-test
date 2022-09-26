import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { RAILWAY_QUERY } from "./queries";
import { IRailway } from "./types/index";
import { EstimatedCall } from "./components/EstimatedCall";
import { queueFetch } from "./utils";
import { TestButton } from "./components/TestButton";
import { endpoint, headers } from "./index";

const Section = styled.section`
  padding: 2rem;
  box-sizing: border-box;
`;

const Heading = styled.h1`
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  @media (min-width: 800px) {
    font-size: 2.5rem;
    text-align: left;
  }
`;

const EstimatedCallList = styled.ol`
  padding: 0;
  list-style: none;
  border-top: 1px solid #dddddd;
  min-height: 651px;
`;

export const App: FC = () => {
  const [data, setData] = useState<IRailway>();

  useEffect(() => {
    (async () => {
      try {
        const res = await queueFetch(endpoint, {
          method: "POST",
          headers,
          body: JSON.stringify({
            query: RAILWAY_QUERY,
            variables: {
              id: "NSR:StopPlace:4000",
            },
          }),
        });

        if (res?.status === 200) {
          const newData = await res.json();
          setData(newData["data"]);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <main>
      <Section>
        <Heading>Stop place details - {data?.stopPlace.name}</Heading>
        <EstimatedCallList>
          {data?.stopPlace.estimatedCalls.map((call) => {
            const id = uuidv4();
            return <EstimatedCall key={id} id={id} estimatedCall={call} />;
          })}
        </EstimatedCallList>
      </Section>
      <TestButton />
    </main>
  );
};
