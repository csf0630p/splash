import {useEffect, useState} from 'react';
import axios from 'axios';
import {binShots, ribbonShots} from '@jackfletch/splash-vis-utils';

import {apiOrigin} from '../utils/config';

function useShotsApi(playerId, seasonId, maxDistance) {
  const [data, setData] = useState(undefined);
  const [ribbonedData, setRibbonedData] = useState([]);
  const [binnedData, setBinnedData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = new URL(apiOrigin);
      endpoint.pathname = `/api/shots/player/${playerId}/season/${seasonId}`;

      const res = await axios.get(endpoint);
      setData(res.data);
      setRibbonedData(ribbonShots(res.data, maxDistance));
      setBinnedData(binShots(res.data, maxDistance));
    };
    fetchData();
  }, [playerId, seasonId, maxDistance]);

  return [{data, ribbonedData, binnedData}];
}

export default useShotsApi;
