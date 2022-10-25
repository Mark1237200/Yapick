// import React, { useRef, useCallback } from 'react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FoodListContainer, FoodListWrapper } from './styles';
// import { FoodTruck, Spinner } from '../../../components';
import { FoodTruck } from '../../../components';

// import { COLOR } from '../../../constants';
// import { useFoodList } from '../../../hooks';

function FoodTrucks() {
  //   // const { data, fetchNextPage, hasNextPage } = useFoodList();
  //   const observer = useRef(null);

  //   const lastItemRef = useCallback(
  //     (node) => {
  //       if (observer.current) observer.current.disconnect();
  //       observer.current = new IntersectionObserver(
  //         (entries) => {
  //           if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
  //         },
  //         { threshold: 1 },
  //       );
  //       if (node) observer.current.observe(node);
  //     },
  //     [fetchNextPage, hasNextPage],
  //   );

  const [truck, setTruck] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/store').then((res) => {
      setTruck(res.data[0].data);
      // console.log(res.data[0].data);
    });
  }, []);

  // const createFoodTruck = () => {
  // const result = [];
  // eslint-disable-next-line no-restricted-syntax
  // for (const page of data.pages) result.push(...page.data.data);
  // return result.map((item) => {
  // return <FoodTruck key={item.storeId} data={item} />;
  // });
  // };

  return (
    <FoodListContainer>
      <FoodListWrapper>
        <FoodTruck data={truck} />
      </FoodListWrapper>
      {/* {hasNextPage ? (
        <Spinner
          scroll
          color={COLOR.NAVY}
          size={50}
          lastItemRef={lastItemRef}
        />
      ) : null} */}
    </FoodListContainer>
  );
}

export default FoodTrucks;
