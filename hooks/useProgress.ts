import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './useAuth';

export interface ProgressEntry {
  id: string;
  type: 'weight' | 'measurement' | 'photo';
  value: number;
  unit: string;
  bodyPart?: string;
  photoUrl?: string;
  date: Date;
  notes?: string;
}

export function useProgress() {
  const { user } = useAuth();
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const q = query(
      collection(db, 'progress'),
      where('userId', '==', user.uid),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const entries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
      })) as ProgressEntry[];
      
      setProgressEntries(entries);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  return { progressEntries, loading };
}