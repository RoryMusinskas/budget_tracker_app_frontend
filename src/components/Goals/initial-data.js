const initialData = {
  goals: {
    "goal-1": { id: "goal-1", content: "Minimise spending" },
    "goal-2": { id: "goal-2", content: "Change banks" },
    "goal-3": { id: "goal-3", content: "Learn about shares" },
    "goal-4": { id: "goal-4", content: "Invest in shares" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      goalIds: ["goal-1", "goal-2", "goal-3", "goal-4"],
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      goalIds: [],
    },
  },
  // facilitate reordering of the columns
  columnOrder: ["column-1", "column-2"],
};

export default initialData;