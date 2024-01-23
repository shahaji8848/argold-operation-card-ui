interface IData {
  item: string;
  in_weight: number;
  in_gross_weight: number;
  in_fine_weight: number;
  in_fine_purity: number;
  in_gross_purity: number;
}

export const DummyTable: IData[] = [
  {
    item: 'Chain',
    in_weight: 10,
    in_gross_weight: 15,
    in_fine_weight: 20,
    in_fine_purity: 12.5,
    in_gross_purity: 15,
  },
  {
    item: 'Hook',
    in_weight: 10,
    in_gross_weight: 15,
    in_fine_weight: 20,
    in_fine_purity: 12.5,
    in_gross_purity: 15,
  },
  {
    item: 'Lobster',
    in_weight: 10,
    in_gross_weight: 15,
    in_fine_weight: 20,
    in_fine_purity: 12.5,
    in_gross_purity: 15,
  },
];
