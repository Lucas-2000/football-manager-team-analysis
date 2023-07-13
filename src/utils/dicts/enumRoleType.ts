interface PrismaEnumRoleType {
  Attack: "Attack";
  Support: "Support";
  Defend: "Defend";
  Stopper: "Stopper";
  Cover: "Cover";
  Automatic: "Automatic";
}

export type EnumRoleType = keyof PrismaEnumRoleType;
