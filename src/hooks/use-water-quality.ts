
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';

export type WaterQualityData = {
  Condition: string;
  pH: number;
  TDS: number;
  Temperature: number;
};

export const useWaterQuality = () => {
  const [data, setData] = useState<WaterQualityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const waterQualityRef = ref(db, 'WaterQuality');
    
    const unsubscribe = onValue(
      waterQualityRef, 
      (snapshot) => {
        const waterData = snapshot.val();
        setData(waterData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching water quality data:', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { data, loading, error };
};
