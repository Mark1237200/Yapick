import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
// import { API_URI } from '../constants';

const fetchFoodDetail = () => async () => {
  const response = await axios.get('http://localhost:8080/store');
  return response;
};

function useFoodDetail(id) {
  return useQuery(['foodDetail', id], fetchFoodDetail(id));
}

export { useFoodDetail };
