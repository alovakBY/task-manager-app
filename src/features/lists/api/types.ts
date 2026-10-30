export type ListDTO = {
   id: string;
   name: string;
   total: number;
   counters: ListCountersDTO;
   progress: number;
   indicator: ListIndicatorDTO;
};

export type ListIndicatorDTO = 'overdue' | 'urgent' | null;
export type ListCountersDTO = {
   overdue: number;
   done: number;
   new: number;
   in_progress: number;
};
