import React, { FC } from 'react';
import styled from 'styled-components';

import { Stage } from '../../pages/checkout';

const Circle = styled.div<{ active: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1.5rem;
  line-height: 1.5rem;
  font-size: 0.7rem;
  text-align: center;
  background-color: ${(props) => props.active ? props.theme.colors.primary : props.theme.colors.white100};
  color:  ${(props) => props.active ? props.theme.colors.white100 : props.theme.colors.grey500};
  border: 1px solid;
  border-color: ${(props) => props.active ? 'transparent' : props.theme.colors.grey500};
  `;

const Bar = styled.div`
  display: flex;
  padding: 0.1rem 0.5rem;
  justify-context: space-between;
  div {
    margin-right: 0.5rem;
  }
  `

interface ItemProps {
  disabled: boolean;
}

const Item = styled.div<ItemProps>`
  display: flex;
  padding: 0.1rem 0.5rem;
  flex-direction: column;
  align-items: center;
  cursor: ${(props) => props.disabled ? 'normal' : 'pointer'};
  `

interface IProps {
  active: Stage,
  maxVisitedStage: Stage,
  setStage: (stage: Stage) => void;
}

const stageLabel = (i: Stage) => {
  switch (i) {
    case Stage.deliveryChoice: return 'Delivery Choice';
    case Stage.deliveryOptions: return 'Delivery Option';
    case Stage.details: return 'Details';
    case Stage.info: return 'Info';
    default: return '';
  }
}

const StageNavigation: FC<IProps> = ({
  active,
  setStage,
  maxVisitedStage,
}) => {
  const stages = Object.values(Stage).filter((s) => typeof s === 'string');
  const activeIndex = stages.findIndex((s) => s === Stage[active]);
  return (
    <Bar>
      {
        stages.map((s, i) => <Item
          // outline
          disabled={i > maxVisitedStage}
          // text={i !== activeIndex}
          onClick={() => {
            if (i <= maxVisitedStage) {
              setStage(Stage[s]);
            }
          }}
          key={s}>
          <Circle active={i === active}>{i}</Circle>
          <div>
            {stageLabel(i)}
          </div>
        </Item>)
      }
    </Bar>
  )
}

export default StageNavigation;