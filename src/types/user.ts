export type User = {
  id: number;
  name: string;
  email: string;
  activated: boolean;
};

export type OutletContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};