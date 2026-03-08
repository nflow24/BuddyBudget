import { createContext, useContext, useState } from "react";

const AppDataContext = createContext();

export function AppDataProvider({ children }) {
  const [userData, setUserData] = useState({
    userName: "Sam",
    goals: {
      budget: 500,
      save: 200,
      groceries: 250,
      entertainment: 50,
    },
    spending: {
      groceries: 198,
      entertainment: 42,
      transportation: 65,
      rent: 900,
    },
    character: {
      spendingHealth: 72,
    },
    friends: [
      { name: "Sam", code: "SAM482", goalCompleted: 78, moneySaved: 12, overBudget: 0, isUser: true },
      { name: "Nate", code: "NATE24", goalCompleted: 87, moneySaved: 18, overBudget: 0, isUser: false },
      { name: "John", code: "JOHN56", goalCompleted: 56, moneySaved: 5, overBudget: 18, isUser: false },
    ],
  });

  return (
    <AppDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  return useContext(AppDataContext);
}