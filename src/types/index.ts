// Zattera Block Explorer Type Definitions

// Asset types
export interface Asset {
  amount: string;
  precision: number;
  nai: string;
}

// Block types
export interface Block {
  block_num?: number;
  block_id?: string;
  timestamp: string;
  witness: string;
  previous: string;
  transaction_merkle_root: string;
  transactions: Transaction[];
  extensions?: unknown[];
  signing_key?: string;
  witness_signature?: string;
}

export interface BlockResponse {
  block?: Block;
}

// Transaction types
export interface Operation {
  type: string;
  value: Record<string, unknown>;
}

export interface Transaction {
  ref_block_num?: number;
  ref_block_prefix?: number;
  expiration?: string;
  operations: (Operation | [string, Record<string, unknown>])[];
  extensions?: unknown[];
  signatures?: string[];
  transaction_id?: string;
  block_num?: number;
  transaction_num?: number;
}

// Account types
export interface AccountMetadataProfile {
  name?: string;
  location?: string;
  website?: string;
  about?: string;
}

export interface AccountMetadata {
  profile?: AccountMetadataProfile;
}

export interface Account {
  id: number;
  name: string;
  owner?: unknown;
  active?: unknown;
  posting?: unknown;
  memo_key: string;
  json_metadata: string;
  proxy: string;
  last_owner_update?: string;
  last_account_update?: string;
  created: string;
  mined?: boolean;
  recovery_account: string;
  last_account_recovery?: string;
  reset_account?: string;
  comment_count?: number;
  lifetime_vote_count?: number;
  post_count?: number;
  can_vote?: boolean;
  voting_manabar?: {
    current_mana: string;
    last_update_time: number;
  };
  voting_power: number;
  liquid_balance?: Asset | string;
  savings_liquid_balance?: Asset | string;
  dollar_balance?: Asset | string;
  savings_dollar_balance?: Asset | string;
  vesting_share_balance?: Asset | string;
  delegated_vesting_shares?: Asset | string;
  received_vesting_shares?: Asset | string;
  vesting_withdraw_rate?: Asset | string;
  reward_liquid_balance?: Asset | string;
  reward_dollar_balance?: Asset | string;
  reward_vesting_share_balance?: Asset | string;
  vesting_shares?: Asset | string;
  curation_rewards?: number;
  posting_rewards?: number;
  witnesses_voted_for: number;
  last_post: string;
  last_root_post?: string;
  last_vote_time?: string;
  post_bandwidth?: number;
  pending_claimed_accounts?: number;
  reputation?: string;
  following_count?: number;
  follower_count?: number;
}

// Witness types
export interface WitnessProps {
  account_creation_fee?: Asset | string;
  maximum_block_size?: number;
  account_subsidy_budget?: number;
  account_subsidy_decay?: number;
}

export interface Witness {
  id?: number;
  owner: string;
  created?: string;
  url?: string;
  votes: string;
  virtual_last_update?: string;
  virtual_position?: string;
  virtual_scheduled_time?: string;
  total_missed?: number;
  last_aslot?: number;
  last_confirmed_block_num?: number;
  pow_worker?: number;
  signing_key: string;
  props?: WitnessProps;
  dollar_exchange_rate?: {
    base?: Asset | string;
    quote?: Asset | string;
  };
  last_dollar_exchange_update?: string;
  running_version?: string;
  hardfork_version_vote?: string;
  hardfork_time_vote?: string;
  available_witness_account_subsidies?: number;
}

// Post/Comment types
export interface ActiveVote {
  voter: string;
  rshares: string | number;
  percent?: number;
  time?: string;
}

export interface Post {
  id?: number;
  author: string;
  permlink: string;
  category: string;
  parent_author?: string;
  parent_permlink?: string;
  title: string;
  body: string;
  json_metadata?: string;
  last_update?: string;
  created: string;
  active?: string;
  last_payout?: string;
  depth?: number;
  children: number;
  net_rshares?: string;
  abs_rshares?: string;
  vote_rshares?: string;
  children_abs_rshares?: string;
  cashout_time?: string;
  max_cashout_time?: string;
  total_vote_weight?: number;
  reward_weight?: number;
  total_payout_value?: string;
  curator_payout_value?: string;
  author_rewards?: number;
  net_votes?: number;
  root_author?: string;
  root_permlink?: string;
  max_accepted_payout?: string;
  percent_hbd?: number;
  allow_replies?: boolean;
  allow_votes?: boolean;
  allow_curation_rewards?: boolean;
  beneficiaries?: unknown[];
  url?: string;
  root_title?: string;
  pending_payout_value?: string;
  total_pending_payout_value?: string;
  active_votes?: ActiveVote[];
  replies?: unknown[];
  author_reputation?: string;
  promoted?: string;
  body_length?: number;
  reblogged_by?: string[];
}

// Dynamic Global Properties
export interface DynamicGlobalProperties {
  id?: number;
  head_block_number: number;
  head_block_id?: string;
  time?: string;
  current_witness?: string;
  total_pow?: number;
  num_pow_witnesses?: number;
  virtual_supply?: Asset | string;
  current_liquid_supply?: Asset | string;
  virtual_liquid_supply?: Asset | string;
  current_dollar_supply?: Asset | string;
  confidential_supply?: Asset | string;
  confidential_sbd_supply?: Asset | string;
  total_vesting_fund_liquid?: Asset | string;
  total_vesting_shares?: Asset | string;
  total_reward_fund_liquid?: Asset | string;
  total_reward_shares2?: string;
  pending_rewarded_vesting_shares?: Asset | string;
  pending_rewarded_vesting_liquid?: Asset | string;
  sbd_interest_rate?: number;
  dollar_interest_rate?: number;
  sbd_print_rate?: number;
  dollar_print_rate?: number;
  maximum_block_size?: number;
  required_actions_partition_percent?: number;
  current_aslot?: number;
  recent_slots_filled?: string;
  participation_count?: number;
  last_irreversible_block_num: number;
  vote_power_reserve_rate?: number;
  delegation_return_period?: number;
  reverse_auction_seconds?: number;
  available_account_subsidies?: number;
  sbd_stop_percent?: number;
  sbd_start_percent?: number;
  next_maintenance_time?: string;
  last_budget_time?: string;
  next_daily_maintenance_time?: string;
  content_reward_percent?: number;
  vesting_reward_percent?: number;
  sps_fund_percent?: number;
  sps_interval_ledger?: Asset | string;
  downvote_pool_percent?: number;
  current_remove_threshold?: number;
  early_voting_seconds?: number;
  mid_voting_seconds?: number;
  max_consecutive_recurrent_transfer_failures?: number;
  max_recurrent_transfer_end_date?: number;
  min_recurrent_transfers_recurrence?: number;
  max_open_recurrent_transfers?: number;
}

// Witness Schedule
export interface WitnessSchedule {
  id?: number;
  current_virtual_time?: string;
  next_shuffle_block_num?: number;
  current_shuffled_witnesses?: string[];
  num_scheduled_witnesses?: number;
  elected_weight?: number;
  timeshare_weight?: number;
  miner_weight?: number;
  witness_pay_normalization_factor?: number;
  median_props?: WitnessProps;
  majority_version?: string;
  max_voted_witnesses?: number;
  max_miner_witnesses?: number;
  max_runner_witnesses?: number;
  hardfork_required_witnesses?: number;
  account_subsidy_rd?: unknown;
  account_subsidy_witness_rd?: unknown;
  min_witness_account_subsidy_decay?: number;
}

// RPC Response types
export interface RPCResponse<T> {
  jsonrpc: string;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
  id: number;
}

// BlockTable Column type
export interface BlockTableColumn<T> {
  key: string;
  label: string;
  width?: string;
  className?: string;
  render: (row: T, rowIndex: number) => React.ReactNode;
}

// Language types
export type SupportedLanguage = 'en' | 'ko' | 'ja';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
}
