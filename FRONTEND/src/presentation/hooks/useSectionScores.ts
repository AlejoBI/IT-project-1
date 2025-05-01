// src/hooks/useSectionScores.ts
import { useEffect, useState } from "react";
import { firestore } from "../../infrastructure/api/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export interface SectionScore {
  section: string;
  score: number;
  standard: string;
}

export const useSectionScores = (standard: string) => {
  const [data, setData] = useState<SectionScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(firestore, "sectionScores"), where("standard", "==", standard));
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map((doc) => doc.data() as SectionScore);
      setData(results);
      setLoading(false);
    };

    fetchData();
  }, [standard]);

  return { data, loading };
};
