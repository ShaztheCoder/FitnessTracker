import { 
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

export interface WorkoutData {
  id?: string;
  userId: string;
  name: string;
  type: 'strength' | 'cardio' | 'yoga' | 'hiit' | 'flexibility';
  duration: number;
  exercises: ExerciseData[];
  createdAt: Date;
  completedAt?: Date;
}

export interface ExerciseData {
  id: string;
  name: string;
  sets: SetData[];
  notes?: string;
}

export interface SetData {
  weight?: number;
  reps?: number;
  duration?: number;
  distance?: number;
}

export interface NutritionData {
  id?: string;
  userId: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity: number;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date: Date;
}

export interface ProgressData {
  id?: string;
  userId: string;
  type: 'weight' | 'measurement' | 'photo';
  value: number;
  unit: string;
  bodyPart?: string;
  photoUrl?: string;
  date: Date;
  notes?: string;
}

export const databaseService = {
  // Workouts
  async createWorkout(workout: Omit<WorkoutData, 'id'>): Promise<string> {
    const workoutData = {
      ...workout,
      createdAt: Timestamp.fromDate(workout.createdAt),
      completedAt: workout.completedAt ? Timestamp.fromDate(workout.completedAt) : null,
    };
    const docRef = await addDoc(collection(db, 'workouts'), workoutData);
    return docRef.id;
  },

  async getWorkouts(userId: string): Promise<WorkoutData[]> {
    const q = query(
      collection(db, 'workouts'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      completedAt: doc.data().completedAt?.toDate(),
    })) as WorkoutData[];
  },

  async getWorkout(id: string): Promise<WorkoutData | null> {
    const docRef = doc(db, 'workouts', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        completedAt: data.completedAt?.toDate(),
      } as WorkoutData;
    }
    return null;
  },

  async updateWorkout(id: string, updates: Partial<WorkoutData>): Promise<void> {
    const docRef = doc(db, 'workouts', id);
    const updateData = { ...updates };
    
    if (updates.completedAt) {
      updateData.completedAt = Timestamp.fromDate(updates.completedAt);
    }
    
    await updateDoc(docRef, updateData);
  },

  async deleteWorkout(id: string): Promise<void> {
    await deleteDoc(doc(db, 'workouts', id));
  },

  // Nutrition
  async addFoodEntry(entry: Omit<NutritionData, 'id'>): Promise<string> {
    const entryData = {
      ...entry,
      date: Timestamp.fromDate(entry.date),
    };
    const docRef = await addDoc(collection(db, 'nutrition'), entryData);
    return docRef.id;
  },

  async getNutritionEntries(userId: string, date?: Date): Promise<NutritionData[]> {
    let q = query(
      collection(db, 'nutrition'),
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      q = query(
        collection(db, 'nutrition'),
        where('userId', '==', userId),
        where('date', '>=', Timestamp.fromDate(startOfDay)),
        where('date', '<=', Timestamp.fromDate(endOfDay)),
        orderBy('date', 'desc')
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate(),
    })) as NutritionData[];
  },

  // Progress
  async addProgressEntry(entry: Omit<ProgressData, 'id'>): Promise<string> {
    const entryData = {
      ...entry,
      date: Timestamp.fromDate(entry.date),
    };
    const docRef = await addDoc(collection(db, 'progress'), entryData);
    return docRef.id;
  },

  async getProgressEntries(userId: string, type?: string): Promise<ProgressData[]> {
    let q = query(
      collection(db, 'progress'),
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );

    if (type) {
      q = query(
        collection(db, 'progress'),
        where('userId', '==', userId),
        where('type', '==', type),
        orderBy('date', 'desc')
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate(),
    })) as ProgressData[];
  },
};