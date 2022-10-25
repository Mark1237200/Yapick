import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
// import { API_URI } from '../constants';

const fetchDetailFoodList = () => async () => {
  const response = await axios.get(`http://localhost:8080/menus`);
  return response;
};

function useDetailFoodList(id) {
  return useQuery(['detailfoodlist', id], fetchDetailFoodList(id));
}

export { useDetailFoodList };
