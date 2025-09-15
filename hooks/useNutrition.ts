import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './useAuth';

export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity: number;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date: Date;
}

export function useNutrition() {
  const { user } = useAuth();
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const q = query(
      collection(db, 'nutrition'),
      where('userId', '==', user.uid),
      where('date', '>=', today),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const entries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
      })) as FoodEntry[];
      
      setFoodEntries(entries);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  return { foodEntries, loading };
}
