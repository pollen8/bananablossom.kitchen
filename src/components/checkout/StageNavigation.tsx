import React, { FC } from 'react';
import styled from 'styled-components';

const Circle = styled.div<{ active: boolean, completed: boolean }>`
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  line-height: 1rem;
  font-size: 0.6rem;
  text-align: center;
  background-color: ${(props) => props.active
    ? props.theme.colors.primary
    : props.completed ?
      props.theme.colors.green800 : props.theme.colors.white100};
  color:  ${(props) => props.active ? props.theme.colors.white100 : props.theme.colors.grey500};
  border: 1px solid;
  border-color: ${(props) => props.active ? 'transparent' : props.theme.colors.grey500};
  z-index: 10;
`;

const Bar = styled.div`
  display: none;
  @media (min-width: 640px){
    display: flex;
    padding: 0.1rem 0.5rem;
    justify-context: space-between;
    > div:first-child{
      &:before {
        left: 50%;
      }
    }
    > div:last-child{
      &:before {
        width: 50%;
      }
    }
  }
`;

interface ItemProps {
  disabled: boolean;
}

const Item = styled.div<ItemProps>`
  display: flex;
  padding: 0.1rem 0.5rem;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  cursor: ${(props) => props.disabled ? 'normal' : 'pointer'};
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 25%;
    left: 0;
    border-top: 1px solid ${(props) => props.theme.colors.grey500};
    width: 100%;
  }
`;

interface IProps {
  stages: string[],
  active: string,
  maxVisitedStage: number,
  setStage: (stage: string) => void;
}

const stageLabel = (i: string) => {
  switch (i) {
    case 'deliveryChoice': return 'Delivery method';
    case 'deliveryOptions': return 'Delivery options';
    case 'details': return 'Details';
    case 'info': return 'Confirm';
    default: return '';
  }
}
const Text = styled.div`
  font-size: 0.7rem;
`;

const StageNavigation: FC<IProps> = ({
  stages,
  active,
  setStage,
  maxVisitedStage,
}) => {
  const activeIndex = stages.findIndex((s) => s === active);
  return (
    <Bar>
      {
        stages.map((s, i) => <Item
          disabled={i > maxVisitedStage}
          onClick={() => {
            if (i <= maxVisitedStage) {
              setStage(s);
            }
          }}
          key={s}>
          <Circle
            completed={i < activeIndex}
            active={i === activeIndex}></Circle>
          <Text>
            {stageLabel(s)}
          </Text>
        </Item>)
      }
    </Bar>
  )
}

export default StageNavigation;
