import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlockDetail from '../components/BlockDetail';
import DetailLayout from '../components/DetailLayout';
import { BlockDetailSkeleton } from '../components/SkeletonLoader';
import { getBlock, getDynamicGlobalProperties } from '../services/zatteraApi';
import type { Block } from '../types';

const BlockPage = () => {
  const { blockNum } = useParams<{ blockNum: string }>();
  const [block, setBlock] = useState<Block | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastIrreversibleBlockNum, setLastIrreversibleBlockNum] = useState<number | null>(null);

  useEffect(() => {
    const fetchBlock = async () => {
      setLoading(true);
      setError(null);

      const parsedBlockNum = parseInt(blockNum || '', 10);
      if (!blockNum || Number.isNaN(parsedBlockNum)) {
        setError('Invalid block number');
        setBlock(null);
        setLoading(false);
        return;
      }

      try {
        // Fetch block data and global properties in parallel
        const [blockData, globalProps] = await Promise.all([
          getBlock(parsedBlockNum),
          getDynamicGlobalProperties(),
        ]);

        const normalizedBlock = blockData?.block || (blockData as unknown as Block);

        if (!normalizedBlock) {
          setError('Block not found');
          setBlock(null);
        } else {
          setBlock(normalizedBlock);
          setLastIrreversibleBlockNum(globalProps.last_irreversible_block_num);
        }
      } catch (err) {
        setError((err as Error).message || 'Failed to fetch block');
        setBlock(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlock();
  }, [blockNum]);

  if (loading) {
    return (
      <div className="block-page">
        <BlockDetailSkeleton />
      </div>
    );
  }

  if (error || !block) {
    return (
      <div className="block-page">
        <DetailLayout className="block-detail" title={`Block #${blockNum}`} backTo="/blocks">
          <div className="error-container">
            <p className="error">Error: {error || 'Block not found'}</p>
            <Link to="/blocks" className="back-button">
              Back to Blocks
            </Link>
          </div>
        </DetailLayout>
      </div>
    );
  }

  return (
    <div className="block-page">
      <BlockDetail
        blockNum={blockNum}
        block={block}
        lastIrreversibleBlockNum={lastIrreversibleBlockNum}
      />
    </div>
  );
};

export default BlockPage;
