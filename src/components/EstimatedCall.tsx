import { FC, useRef, useState } from "react";
import styled from "styled-components";
import { IEstimatedCall } from "../types";
import { AiFillCaretDown } from "react-icons/ai";
import { arrivalDelayInMinutes, timeFormat, capitalize } from "../utils";

interface IEstimatedCallProps {
  id: string;
  estimatedCall: IEstimatedCall;
}

const Item = styled.li`
  border-bottom: 1px solid #dddddd;
  padding: 0.25rem 0;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  background-color: transparent;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.5rem;
    flex-shrink: 0;
  }
`;

const Details = styled.div`
  transition: max-height 0.5s ease;
  max-height: 0px;
  overflow: hidden;
`;

const DetailList = styled.ul`
  padding: 1rem 0 2rem 0;
  text-align: center;

  li {
    margin: 0.5rem 0;
  }

  @media (min-width: 500px) {
    padding: 1rem 0 2rem 7rem;
    text-align: left;
  }
  @media (min-width: 800px) {
    padding: 0 0 1rem 7rem;
  }
`;

const ArrivalTime = styled.span`
  margin-right: 2.5rem;
  position: relative;
  width: 40px;
  display: inline-block;
`;

const Delay = styled.span`
  font-weight: 400;
  font-size: 0.75rem;
  color: #b02e06;
  position: absolute;
  top: 3px;
  width: 1px;
  right: -6px;
  &[data-arrival="early"] {
    color: green;
  }
`;

const Wrapper = styled.span`
  margin-right: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const EstimatedCall: FC<IEstimatedCallProps> = ({
  estimatedCall,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // This can be both an earlier time or a delay, I just didn't know what to call it.
  // Maybe arrival flucations? Doesn't really matter, I'm going to leave it :)
  const delayStr = arrivalDelayInMinutes(
    estimatedCall.expectedArrivalTime,
    estimatedCall.aimedArrivalTime
  );

  return (
    <Item>
      <Button
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Wrapper>
          <ArrivalTime>
            {timeFormat(estimatedCall.aimedArrivalTime, "shortExpectedArrival")}
            <Delay data-arrival={delayStr.includes("-") && "early"}>
              {delayStr !== "-0" && delayStr}
            </Delay>
          </ArrivalTime>
          {estimatedCall.serviceJourney.journeyPattern.line.name}
        </Wrapper>
        <AiFillCaretDown
          aria-label="Caret"
          style={isOpen ? { transform: "rotate(180deg)" } : undefined}
        />
      </Button>

      <Details
        id={id}
        ref={ref}
        style={{ maxHeight: isOpen ? ref.current?.scrollHeight : 0 }}
        aria-hidden={!isOpen}
      >
        <DetailList>
          <li>
            Transport mode:{" "}
            {capitalize(
              estimatedCall.serviceJourney.journeyPattern.line.transportMode
            )}
          </li>
          <li>
            Expected arrival time:{" "}
            {timeFormat(
              estimatedCall.expectedArrivalTime,
              "shortExpectedArrival"
            )}
          </li>
          <li>Cancelled: {capitalize(`${estimatedCall.cancellation}`)}</li>
          <li>For boarding: {capitalize(`${estimatedCall.forBoarding}`)}</li>
          <li>For alighting: {capitalize(`${estimatedCall.forAlighting}`)}</li>
        </DetailList>
      </Details>
    </Item>
  );
};
