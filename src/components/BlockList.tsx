import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getLatestBlockNum, getBlocks } from '../services/zatteraApi';
import { BlockListSkeleton } from './SkeletonLoader';
import { useTranslation } from '../i18n';
import { formatTimestampWithLocale } from '../utils/format';
import type { Block } from '../types';
import './BlockList.css';

const BlockList = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [latestBlock, setLatestBlock] = useState<number | null>(null);
  const { t, language } = useTranslation();

  const loadBlocks = useCallback(async () => {
    try {
      const latest = await getLatestBlockNum();
      setLatestBlock(latest);
      const blockData = await getBlocks(latest, 20);
      setBlocks(blockData);
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }, []);

  // Fetch blocks on mount and keep refreshing
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    loadBlocks();
    // Refresh every 3 seconds (Zattera block time)
    const interval = setInterval(loadBlocks, 3000);
    return () => clearInterval(interval);
  }, [loadBlocks]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const formatTimestamp = (timestamp: string) => formatTimestampWithLocale(timestamp, language);

  if (loading) {
    return <BlockListSkeleton />;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="block-list">
      <div className="block-header">
        <h2>{t('blockList.title')}</h2>
        <div className="latest-block-info">
          {t('common.latestBlock')}: <span className="highlight">{latestBlock}</span>
        </div>
      </div>

      <table className="block-table">
        <thead>
          <tr>
            <th>{t('common.blockNumber')}</th>
            <th>{t('common.time')}</th>
            <th>{t('common.transactions')}</th>
            <th>{t('common.witness')}</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block, index) => (
            <tr key={index}>
              <td>
                <Link to={`/block/${(latestBlock || 0) - index}`} className="block-link">
                  {(latestBlock || 0) - index}
                </Link>
              </td>
              <td>{formatTimestamp(block.timestamp)}</td>
              <td>{block.transactions?.length || 0}</td>
              <td className="witness">
                <Link to={`/account/${block.witness}`} className="witness-link">
                  {block.witness}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlockList;
