import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Coins, TrendingUp, Database, DollarSign } from 'lucide-react';
import { getLatestBlockNum, getBlocks, getDynamicGlobalProperties } from '../services/zatteraApi';
import BlockTable from '../components/BlockTable';
import { DashboardSkeleton } from '../components/SkeletonLoader';
import { useTranslation } from '../i18n';
import { formatCompactNumber } from '../utils/format';
import type { Block, Asset } from '../types';
import './DashboardPage.css';

interface DashboardStats {
  headBlockNumber: number;
  totalAccounts: string;
  currentLiquidSupply: string;
  virtualLiquidSupply: string;
  liquidPerVests: string;
  recentBlocks: Block[];
}

// Helper function to format asset objects
const formatAsset = (asset: Asset | string | undefined): string => {
  if (typeof asset === 'string') return asset;
  if (asset && typeof asset === 'object' && 'amount' in asset) {
    const amount = parseInt(asset.amount) / Math.pow(10, asset.precision);
    return `${formatCompactNumber(amount)} ZTR`;
  }
  return 'N/A';
};

// Helper function to format vesting shares
const formatVestingShares = (shares: Asset | string | undefined): string => {
  if (typeof shares === 'string') return shares;
  if (shares && typeof shares === 'object' && 'amount' in shares) {
    const amount = parseInt(shares.amount) / Math.pow(10, shares.precision);
    return `${formatCompactNumber(amount)} VESTS`;
  }
  return 'N/A';
};

// Helper function to calculate Liquid per VESTS
const calculateLiquidPerVests = (
  totalVestingFund: Asset | string | undefined,
  totalVestingShares: Asset | string | undefined
): string => {
  if (!totalVestingFund || !totalVestingShares) return 'N/A';

  const vestingFundAmount =
    typeof totalVestingFund === 'object'
      ? parseInt(totalVestingFund.amount) / Math.pow(10, totalVestingFund.precision)
      : parseFloat(totalVestingFund);

  const vestingSharesAmount =
    typeof totalVestingShares === 'object'
      ? parseInt(totalVestingShares.amount) / Math.pow(10, totalVestingShares.precision)
      : parseFloat(totalVestingShares);

  if (vestingSharesAmount === 0) return 'N/A';

  const liquidPerVests = vestingFundAmount / vestingSharesAmount;
  return liquidPerVests.toFixed(6);
};

function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    headBlockNumber: 0,
    totalAccounts: '',
    currentLiquidSupply: '',
    virtualLiquidSupply: '',
    liquidPerVests: 'N/A',
    recentBlocks: [],
  });
  const [loading, setLoading] = useState(true);
  const { t, language } = useTranslation();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const props = await getDynamicGlobalProperties();
        const latestBlockNum = await getLatestBlockNum();
        const blocks = await getBlocks(latestBlockNum - 9, 10);

        setStats({
          headBlockNumber: latestBlockNum,
          totalAccounts: formatVestingShares(props.total_vesting_shares),
          currentLiquidSupply: formatAsset(props.current_liquid_supply),
          virtualLiquidSupply: formatAsset(props.virtual_liquid_supply),
          liquidPerVests: calculateLiquidPerVests(
            props.total_vesting_fund_liquid,
            props.total_vesting_shares
          ),
          recentBlocks: blocks.reverse(),
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">{t('dashboard.title')}</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Box size={32} strokeWidth={2} />
          </div>
          <div className="stat-content">
            <div className="stat-label">{t('dashboard.stats.latestBlock')}</div>
            <div className="stat-value">{stats.headBlockNumber}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Coins size={32} strokeWidth={2} />
          </div>
          <div className="stat-content">
            <div className="stat-label">{t('dashboard.stats.currentLiquidSupply')}</div>
            <div className="stat-value">{stats.currentLiquidSupply}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={32} strokeWidth={2} />
          </div>
          <div className="stat-content">
            <div className="stat-label">{t('dashboard.stats.virtualLiquidSupply')}</div>
            <div className="stat-value">{stats.virtualLiquidSupply}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Database size={32} strokeWidth={2} />
          </div>
          <div className="stat-content">
            <div className="stat-label">{t('dashboard.stats.totalVesting')}</div>
            <div className="stat-value">{stats.totalAccounts}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={32} strokeWidth={2} />
          </div>
          <div className="stat-content">
            <div className="stat-label">{t('dashboard.stats.liquidPerVests')}</div>
            <div className="stat-value">{stats.liquidPerVests} ZTR</div>
          </div>
        </div>
      </div>

      <div className="recent-blocks-section">
        <h2 className="section-title">{t('dashboard.recentBlocks')}</h2>
        <BlockTable
          columns={[
            {
              key: 'number',
              label: t('common.blockNumber'),
              width: '150px',
              className: 'block-number',
              render: (block: Block) => `#${block.block_num}`,
            },
            {
              key: 'time',
              label: t('common.time'),
              width: '220px',
              className: 'block-time',
              render: (block: Block) =>
                new Date(block.timestamp + 'Z').toLocaleString(
                  language === 'ko' ? 'ko-KR' : language === 'ja' ? 'ja-JP' : undefined
                ),
            },
            {
              key: 'witness',
              label: t('common.witness'),
              className: 'block-witness',
              render: (block: Block) => {
                if (!block.witness) return 'N/A';
                return (
                  <Link
                    to={`/account/${block.witness}`}
                    className="block-witness"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {block.witness}
                  </Link>
                );
              },
            },
            {
              key: 'tx',
              label: t('common.transactions'),
              width: '140px',
              className: 'block-tx-count',
              render: (block: Block) => (
                <span className="badge">{block.transactions?.length || 0}</span>
              ),
            },
          ]}
          rows={stats.recentBlocks.filter((block) => block && block.block_num)}
          rowKey={(block: Block) => String(block.block_id || block.block_num)}
          rowLink={(block: Block) => `/block/${block.block_num}`}
          emptyMessage={t('dashboard.emptyBlocks')}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
