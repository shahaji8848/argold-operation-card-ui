interface OperationCardDocDetail {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  naming_lot: string;
  parent_melting_lot: string;
  input_type: string;
  product_purity: number;
  accessories_purity: number;
  transfer_to_next_department: number;
  is_repeat: number;
  product: string;
  product_process: string;
  product_process_department: string;
  operation_department: string;
  next_product_process: string;
  next_product_process_department: string;
  total_wastage_issue_percentage: string;
  factory: string;
  created_by: string;
  posting_date: string;
  karigar: string;
  expected_out_weight: string;
  tounch_no: string;
  fire_tounch_no: string;
  is_hcl_process: string;
  process_sequence: number;
  department_sequence: number;
  resolder: string;
  line_number: number;
  tounch_purity: number;
  fire_tounch_purity: number;
  quantity: number;
  filing_process: string;
  report_side_1: number;
  report_side_2: number;
  average_purity: number;
  net_gold: number;
  net_fe: number;
  gold_percent: number;
  chain_cut_in_inches: number;
  weight_of_the_chain_cut: number;
  no_of_chains_that_can_be_made: number;
  pure_gold_per_chain_cut: number;
  pure_gold_per_inch_in_the_chain_cut: number;
  total_inches: number;
  gold_from_bb_and_wire_drawing_process: number;
  gold_from_machine_process: number;
  net_gold_used: number;
  expected_issue: number;
  in_weight: number;
  in_gross_purity: number;
  in_gross_weight: number;
  in_fine_purity: number;
  in_fine_weight: number;
  out_weight: number;
  out_gross_purity: number;
  out_gross_weight: number;
  out_fine_purity: number;
  out_fine_weight: number;
  expected_fire_tounch_fine: number;
  balance_weight: number;
  balance_gross_purity: number;
  balance_gross_weight: number;
  balance_fine_purity: number;
  balance_fine_weight: number;
  doctype: string;
}
