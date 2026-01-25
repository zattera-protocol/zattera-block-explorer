import type {
  Block,
  BlockResponse,
  Account,
  Transaction,
  Witness,
  Post,
  DynamicGlobalProperties,
  WitnessSchedule,
  RPCResponse,
} from '../types';

// Zattera RPC API endpoint
// Production: use direct URL from env variable
// Development: use proxy (/rpc)
const IS_PRODUCTION = import.meta.env.MODE === 'production';
const RPC_NODE = IS_PRODUCTION ? import.meta.env.VITE_ZATTERA_RPC_URL : '/rpc';

/**
 * Make RPC call to Zattera API using the new call format
 */
const rpcCall = async <T>(api: string, method: string, params: Record<string, unknown> = {}): Promise<T> => {
  const response = await fetch(RPC_NODE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'call',
      params: [api, method, params],
      id: 1,
    }),
  });

  const data = await response.json() as RPCResponse<T>;

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.result as T;
};

/**
 * Get dynamic global properties (includes latest block number)
 */
export const getDynamicGlobalProperties = async (): Promise<DynamicGlobalProperties> => {
  try {
    return await rpcCall<DynamicGlobalProperties>('database_api', 'get_dynamic_global_properties', {});
  } catch (error) {
    console.error('Failed to fetch dynamic global properties:', error);
    throw error;
  }
};

/**
 * Get latest block number
 */
export const getLatestBlockNum = async (): Promise<number> => {
  try {
    const props = await getDynamicGlobalProperties();
    return props.head_block_number;
  } catch (error) {
    console.error('Failed to fetch latest block number:', error);
    throw error;
  }
};

/**
 * Get block information by block number
 */
export const getBlock = async (blockNum: number): Promise<BlockResponse | null> => {
  try {
    return await rpcCall<BlockResponse>('block_api', 'get_block', { block_num: blockNum });
  } catch (error) {
    console.error(`Failed to fetch block ${blockNum}:`, error);
    return null;
  }
};

/**
 * Get multiple blocks
 */
export const getBlocks = async (startBlock: number, count: number = 20): Promise<Block[]> => {
  try {
    const promises: Promise<BlockResponse | null>[] = [];
    for (let i = 0; i < count; i++) {
      promises.push(getBlock(startBlock + i));
    }
    const blocks = await Promise.all(promises);

    const result = blocks
      .filter((block): block is BlockResponse => block !== null && block !== undefined)
      .map((block, index) => {
        // Handle different response formats
        let blockData: Block;
        if (block.block) {
          // API returns {block: {...}}
          blockData = { ...block.block };
        } else {
          // API returns flat block object
          blockData = { ...(block as unknown as Block) };
        }

        // Add block_num if it doesn't exist
        if (!blockData.block_num) {
          blockData.block_num = startBlock + index;
        }

        // Generate block_id if it doesn't exist
        if (!blockData.block_id) {
          blockData.block_id = `block_${startBlock + index}`;
        }

        return blockData;
      })
      .filter((block) => block && block.timestamp);

    return result;
  } catch (error) {
    console.error('Failed to fetch blocks:', error);
    return [];
  }
};

/**
 * Get account information
 */
export const getAccount = async (username: string): Promise<Account | null> => {
  try {
    const result = await rpcCall<{ accounts: Account[] }>('database_api', 'find_accounts', { accounts: [username] });
    return result.accounts?.[0] || null;
  } catch (error) {
    console.error(`Failed to fetch account ${username}:`, error);
    return null;
  }
};

/**
 * Get transaction from block
 */
export const getTransaction = async (blockNum: number, txIndex: number): Promise<Transaction | null> => {
  try {
    const result = await getBlock(blockNum);
    return result?.block?.transactions[txIndex] || null;
  } catch (error) {
    console.error(`Failed to fetch transaction ${txIndex} from block ${blockNum}:`, error);
    return null;
  }
};

/**
 * Get witness schedule (active witnesses)
 */
export const getWitnessSchedule = async (): Promise<WitnessSchedule> => {
  try {
    return await rpcCall<WitnessSchedule>('database_api', 'get_witness_schedule', {});
  } catch (error) {
    console.error('Failed to fetch witness schedule:', error);
    throw error;
  }
};

/**
 * Get witnesses by vote (top witnesses)
 */
export const getWitnessesByVote = async (limit: number = 100): Promise<Witness[]> => {
  try {
    // Use list_witnesses with by_vote_name order
    // start: [votes, account_name] - use very large number to start from top
    const result = await rpcCall<{ witnesses: Witness[] }>('database_api', 'list_witnesses', {
      start: ['999999999999', ''],
      limit,
      order: 'by_vote_name',
    });

    return result.witnesses || [];
  } catch (error) {
    console.error('Failed to fetch witnesses by vote:', error);
    return [];
  }
};

/**
 * Get discussions by created (latest posts)
 * Note: Using list_comments with database_api
 */
export const getLatestPosts = async (limit: number = 10): Promise<Post[]> => {
  try {
    const result = await rpcCall<{ comments: Post[] }>('database_api', 'list_comments', {
      start: [],
      limit,
      order: 'by_permlink',
    });
    return result.comments || [];
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
};

interface DiscussionQuery {
  limit?: number;
  tag?: string;
  truncate_body?: number;
  start_author?: string;
  start_permlink?: string;
}

/**
 * Get discussions by various sorting options
 * Using tags_api which includes pending_payout_value and other metadata
 */
export const getDiscussions = async (sortBy: string = 'trending', query: DiscussionQuery = {}): Promise<Post[]> => {
  try {
    const limit = query.limit || 20;

    // Map sortBy to tags_api method name (full method name including prefix)
    let method: string;
    switch (sortBy) {
      case 'trending':
        method = 'tags_api.get_discussions_by_trending';
        break;
      case 'created':
        method = 'tags_api.get_discussions_by_created';
        break;
      case 'hot':
        method = 'tags_api.get_discussions_by_hot';
        break;
      default:
        method = 'tags_api.get_discussions_by_trending';
    }

    // Build params object with pagination support
    const params: Record<string, unknown> = {
      tag: query.tag || '',
      limit,
      truncate_body: query.truncate_body || 0,
    };

    // Add pagination parameters if provided
    if (query.start_author) {
      params.start_author = query.start_author;
    }
    if (query.start_permlink) {
      params.start_permlink = query.start_permlink;
    }

    // Use direct method call format for tags_api
    const response = await fetch(RPC_NODE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: method,
        params: params,
        id: 1,
      }),
    });

    const data = (await response.json()) as RPCResponse<{ discussions?: Post[] } | Post[]>;

    if (data.error) {
      throw new Error(data.error.message);
    }

    if (Array.isArray(data.result)) {
      return data.result;
    }
    return data.result?.discussions || [];
  } catch (error) {
    console.error(`Failed to fetch ${sortBy} discussions:`, error);
    return [];
  }
};
