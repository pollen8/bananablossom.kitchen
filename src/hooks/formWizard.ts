import { useState } from 'react';

interface IProps {
  stages: string[];
  defaultValue?: string;
}

const scrollTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

export const useFormWizard = (props: IProps) => {
  const {
    stages,
    defaultValue,
  } = props;
  const [stage, setStage] = useState(defaultValue || stages[0]);
  const [maxVisitedStage, setMaxVisitedStage] = useState(0);
  const changeStage = (stage: string) => {
    const currentIndex = stages.findIndex((s) => s === stage);
    if (currentIndex > maxVisitedStage) {
      setMaxVisitedStage(currentIndex);

    }
    scrollTop();
    setStage(stage);
  }

  const nextStage= () =>{
    const currentIndex = stages.findIndex((s) => s === stage);
    if (currentIndex > maxVisitedStage) {
      setMaxVisitedStage(currentIndex);
    }
    scrollTop();
    setStage(stages?.[currentIndex + 1] ?? stages[currentIndex]);
  }
  return {
    stage,
    maxVisitedStage,
    changeStage,
    nextStage,
  }
};
