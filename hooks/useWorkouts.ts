import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './useAuth';

export interface Workout {
  id: string;
  name: string;
  type: string;
  duration: number;
  exercises: Exercise[];
  createdAt: Date;
  completedAt?: Date;
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
  notes?: string;
}

export interface Set {
  weight?: number;
  reps?: number;
  duration?: number;
  distance?: number;
}

export function useWorkouts() {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const q = query(
      collection(db, 'workouts'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const workoutList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        completedAt: doc.data().completedAt?.toDate(),
      })) as Workout[];
      
      setWorkouts(workoutList);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const refreshWorkouts = () => {
    // Workouts are automatically refreshed via onSnapshot
  };

  return { workouts, loading, refreshWorkouts };
}