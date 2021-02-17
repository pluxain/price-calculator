export type Field = {
  label: string;
  price: number;
};

export type ActiveField = Field & {
  id: string;
};

export type Mode = "ghost" | "active";
