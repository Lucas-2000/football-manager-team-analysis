interface PrismaEnumPlayerPositionBase {
  Goalkeeper: "Goalkeeper";
  Defenser: "Defenser";
  Midfielder: "Midfielder";
  Winger: "Winger";
  Striker: "Striker";
}

export type EnumPlayerPositionBase = keyof PrismaEnumPlayerPositionBase;
