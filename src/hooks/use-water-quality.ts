
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
    console.log("Initializing Firebase connection to WaterQuality node");
    const waterQualityRef = ref(db, 'WaterQuality');
    
    const unsubscribe = onValue(
      waterQualityRef, 
      (snapshot) => {
        const waterData = snapshot.val();
        console.log("Firebase data received:", waterData);
        setData(waterData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching water quality data:', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => {
      console.log("Unsubscribing from Firebase");
      unsubscribe();
    };
  }, []);

  return { data, loading, error };
};
