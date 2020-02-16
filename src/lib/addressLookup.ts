import { debounce } from 'lodash';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export default function useAddressPredictions(input) {
  const [predictions, setPredictions] = useState([]);

  const autocomplete = useRef<any>();

  if (!autocomplete.current) {
    autocomplete.current =
      new (window as any).google.maps.places.AutocompleteService();
  }

  function getPlacePredictions(input) {
    autocomplete.current.getPlacePredictions(
      { input },
      predictions => {
        setPredictions(
          predictions.map(prediction => prediction.description)
        );
      }
    );
  }

  const debouncedGetPlacePredictions = useCallback(
    debounce(getPlacePredictions, 500),
    []
  );

  useEffect(() => {
    debouncedGetPlacePredictions(input);
  }, [input]);

  return predictions;
}